import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BlogPost, Author } from './mdx-handler';
import { notion } from './notion';
import { fetchPageById } from './notion';

/**
 * Notion 페이지 속성에서 값을 안전하게 추출하는 헬퍼 함수들
 */

// Title 속성 추출
function extractTitle(property: any): string {
  if (property?.type === 'title' && Array.isArray(property.title)) {
    return property.title[0]?.plain_text || '';
  }
  return '';
}

// Rich Text 속성 추출
function extractRichText(property: any): string {
  if (!property) return '';
  
  // Rich Text 타입
  if (property.type === 'rich_text' && Array.isArray(property.rich_text)) {
    if (property.rich_text.length === 0) return '';
    // 모든 rich_text 항목의 plain_text를 합치기
    return property.rich_text
      .map((item: any) => item?.plain_text || '')
      .filter(Boolean)
      .join('') || '';
  }
  
  // Title 타입도 처리 (혹시 모를 경우)
  if (property.type === 'title' && Array.isArray(property.title)) {
    if (property.title.length === 0) return '';
    return property.title
      .map((item: any) => item?.plain_text || '')
      .filter(Boolean)
      .join('') || '';
  }
  
  // Select 타입도 처리
  if (property.type === 'select' && property.select) {
    return property.select.name || '';
  }
  
  return '';
}

// Date 속성 추출
function extractDate(property: any): string {
  if (property?.type === 'date' && property.date) {
    return property.date.start || '';
  }
  return '';
}

// Select 속성 추출
function extractSelect(property: any, defaultValue = ''): string {
  if (property?.type === 'select' && property.select) {
    return property.select.name || defaultValue;
  }
  return defaultValue;
}

// Files 속성 추출 (이미지 URL)
function extractImage(property: any): string {
  if (property?.type === 'files' && Array.isArray(property.files) && property.files.length > 0) {
    const file = property.files[0];
    // Notion 내부 파일 또는 외부 URL 지원
    if (file.type === 'file' && file.file) {
      return file.file.url || '';
    } else if (file.type === 'external' && file.external) {
      return file.external.url || '';
    }
  }
  return '';
}

// Rollup 속성 추출 (이미지 URL)
function extractRollup(property: any): string {
  if (property?.type === 'rollup' && property.rollup) {
    // rollup.type이 'array'인 경우
    if (property.rollup.type === 'array' && Array.isArray(property.rollup.array) && property.rollup.array.length > 0) {
      const firstItem = property.rollup.array[0];
      // 첫 번째 항목이 files 타입인 경우
      if (firstItem?.type === 'files' && Array.isArray(firstItem.files) && firstItem.files.length > 0) {
        const file = firstItem.files[0];
        // Notion 내부 파일 또는 외부 URL 지원
        if (file.type === 'file' && file.file) {
          return file.file.url || '';
        } else if (file.type === 'external' && file.external) {
          return file.external.url || '';
        }
      }
    }
  }
  return '';
}

// URL 속성 추출
function extractUrl(property: any): string {
  if (property?.type === 'url' && property.url) {
    return property.url;
  }
  return '';
}

// Multi-select 속성 추출
function extractMultiSelect(property: any): string[] {
  if (property?.type === 'multi_select' && Array.isArray(property.multi_select)) {
    return property.multi_select.map((item: any) => item.name || '').filter(Boolean);
  }
  return [];
}

// Formula 속성 추출
function extractFormula(property: any): string {
  if (property?.type === 'formula' && property.formula) {
    // Formula 타입에 따라 다르게 처리
    if (property.formula.type === 'string') {
      return property.formula.string || '';
    } else if (property.formula.type === 'number') {
      return String(property.formula.number || '');
    } else if (property.formula.type === 'boolean') {
      return String(property.formula.boolean || '');
    } else if (property.formula.type === 'date' && property.formula.date) {
      return property.formula.date.start || '';
    }
  }
  return '';
}

// Relation 속성 추출 (Author용)
async function extractRelation(property: any): Promise<string> {
  if (property?.type === 'relation' && Array.isArray(property.relation) && property.relation.length > 0) {
    // Relation ID 반환 (추후 페이지 정보를 가져와야 함)
    return property.relation[0].id || '';
  }
  return '';
}

// Relation 속성에서 첫 번째 관계의 ID 추출
function extractRelationId(property: any): string | null {
  if (property?.type === 'relation' && Array.isArray(property.relation) && property.relation.length > 0) {
    return property.relation[0].id || null;
  }
  return null;
}

// Relation된 페이지에서 Name 속성 추출
async function extractRelationName(property: any): Promise<string> {
  const relationId = extractRelationId(property);
  if (!relationId) {
    return '';
  }

  try {
    const relatedPage = await fetchPageById(relationId);
    if (relatedPage && relatedPage.properties.Name) {
      return extractTitle(relatedPage.properties.Name);
    }
  } catch (error) {
    console.error('[extractRelationName] Relation 페이지 조회 실패:', error);
  }

  return '';
}

// Relation으로 연결된 Author 페이지에서 정보 추출
async function fetchAuthorFromRelation(relationId: string, notion: any): Promise<Author> {
  if (!relationId) {
    return {
      name: '',
      role: '',
      avatarSrc: '',
    };
  }

  try {
    const authorPage = await notion.pages.retrieve({ page_id: relationId }) as PageObjectResponse;
    const props = authorPage.properties;

    // Profile-Img에서 이미지 추출 (rollup 타입 지원)
    const profileImg = extractRollup(props['Profile-Img'] || props['profile-img']) || 
                       extractImage(props['Profile-Img'] || props['profile-img']) || '';

    return {
      name: extractTitle(props.Name || props.name) || extractRichText(props.Name || props.name),
      role: extractRichText(props.Role || props.role) || '',
      avatarSrc: profileImg,
    };
  } catch (error) {
    console.error('Author Relation 페이지 조회 실패:', error);
    return {
      name: '',
      role: '',
      avatarSrc: '',
    };
  }
}

/**
 * Notion PageObjectResponse를 BlogPost 인터페이스로 변환 (Sermon용)
 * @param page - Notion 페이지 객체
 * @returns BlogPost 객체
 */
export async function notionPageToBlogPost(page: PageObjectResponse): Promise<BlogPost> {
  const properties = page.properties;

  // 프로퍼티 키 목록 (재사용)
  const propertyKeys = Object.keys(properties);
  
  // 디버깅: 모든 프로퍼티 정보 출력
  console.log('\n========== Notion 프로퍼티 디버깅 ==========');
  console.log('[Notion Sermon Adapter] 모든 프로퍼티 키:', propertyKeys);
  
  // 모든 프로퍼티의 타입과 값 출력
  propertyKeys.forEach(key => {
    const prop = properties[key];
    if (!prop) return;
    
    let valuePreview = '';
    if (prop.type === 'rich_text' && Array.isArray(prop.rich_text)) {
      valuePreview = prop.rich_text.map((t: any) => t.plain_text).join('').substring(0, 50);
    } else if (prop.type === 'title' && Array.isArray(prop.title)) {
      valuePreview = prop.title.map((t: any) => t.plain_text).join('').substring(0, 50);
    } else if (prop.type === 'select' && prop.select) {
      valuePreview = prop.select.name;
    } else if (prop.type === 'files' && Array.isArray(prop.files)) {
      valuePreview = `${prop.files.length} files`;
    } else if (prop.type === 'url' && prop.url) {
      valuePreview = prop.url.substring(0, 50);
    } else if (prop.type === 'formula' && prop.formula) {
      if (prop.formula.type === 'string') {
        valuePreview = prop.formula.string?.substring(0, 50) || '';
      }
    }
    
    console.log(`  "${key}" (${prop.type}): ${valuePreview || '(empty)'}`);
  });
  
  const authorRelatedKeys = propertyKeys.filter(key => 
    key.toLowerCase().includes('author') || 
    key.toLowerCase().includes('profile') ||
    key.toLowerCase().includes('bible') ||
    key.toLowerCase().includes('verse') ||
    key.toLowerCase().includes('img') ||
    key.toLowerCase().includes('image')
  );
  
  console.log('[Notion Sermon Adapter] Author/Profile 관련 프로퍼티:', authorRelatedKeys);
  console.log('==========================================\n');

  // 필수 속성 추출 (실제 Notion 데이터베이스 속성 이름 사용)
  const title = extractTitle(properties.Name); // Name (한글 제목)
  const titleEn = extractRichText(properties['Title(en)']); // Title(en) (영문 제목)
  const slug = extractFormula(properties.slug); // slug (Formula 타입)
  const description = extractRichText(properties.SundayName || properties.description); // SundayName 또는 description
  const date = extractDate(properties.Date); // Date (대문자 D)
  const category = extractSelect(properties.Tag, '아티클'); // Tag를 category로 사용
  const sundayName = extractRichText(properties.SundayName); // SundayName

  // 이미지 추출: 페이지 cover, properties.Cover, properties.cover, properties.image 순서로 확인
  let image = '';
  if (page.cover) {
    if (page.cover.type === 'external' && page.cover.external) {
      image = page.cover.external.url;
    } else if (page.cover.type === 'file' && page.cover.file) {
      image = page.cover.file.url;
    }
  }
  if (!image) {
    // Cover 프로퍼티를 우선적으로 확인 (대문자, 소문자 모두)
    image = extractImage(properties.Cover || properties.cover || properties.image);
  }

  // Author 처리: Relation 타입인 경우 Author 페이지에서 정보 가져오기
  let author: Author = {
    name: '',
    role: '',
    avatarSrc: '',
  };
  
  // 프로퍼티 키를 동적으로 찾기 (대소문자 구분 없이)
  const findProperty = (possibleNames: string[]): any => {
    
    // 1. 정확한 매칭 시도
    for (const name of possibleNames) {
      if (properties[name] && properties[name].type) {
        return properties[name];
      }
    }
    
    // 2. 대소문자 무시 매칭 시도
    for (const name of possibleNames) {
      const found = propertyKeys.find(key => key.toLowerCase() === name.toLowerCase());
      if (found && properties[found] && properties[found].type) {
        return properties[found];
      }
    }
    
    // 3. 부분 매칭 시도 (마지막 수단)
    for (const name of possibleNames) {
      const found = propertyKeys.find(key => 
        key.toLowerCase().includes(name.toLowerCase()) || 
        name.toLowerCase().includes(key.toLowerCase())
      );
      if (found && properties[found] && properties[found].type) {
        console.log(`[Notion Sermon Adapter] 부분 매칭 발견: "${found}" (찾던 이름: "${name}")`);
        return properties[found];
      }
    }
    
    return null;
  };

  // Author Relation 확인 (프로필 이미지는 항상 경로 1 사용)
  const authorProperty = findProperty(['Author', 'author']);
  let profileImgFromRelation = '';
  if (authorProperty?.type === 'relation' && Array.isArray(authorProperty.relation) && authorProperty.relation.length > 0) {
    // Author Relation이 있으면 프로필 이미지를 Relation에서 가져오기 (경로 1)
    const authorId = authorProperty.relation[0].id;
    try {
      const authorPage = await notion.pages.retrieve({ page_id: authorId }) as PageObjectResponse;
      const props = authorPage.properties;
      
      // Author 페이지에서 Profile-Img 추출 (rollup 타입 지원)
      const authorProfileImgProperty = props['Profile-Img'] || props['profile-img'] || props['Profile'] || props['profile'];
      if (authorProfileImgProperty) {
        profileImgFromRelation = extractRollup(authorProfileImgProperty) || extractImage(authorProfileImgProperty);
        if (!profileImgFromRelation) {
          profileImgFromRelation = extractUrl(authorProfileImgProperty);
        }
      }
    } catch (error) {
      console.error('[Notion Sermon Adapter] Author Relation에서 프로필 이미지 추출 실패:', error);
    }
  }

  // Author-Name 프로퍼티 우선 사용 (경로 2)
  let authorNameProperty = findProperty([
    'Author-Name', 'author-name', 'Author Name', 'author name',
    'AuthorName', 'authorName', 'Bible', 'bible'
  ]);
  
  // 더 넓은 검색: author가 포함된 모든 프로퍼티 확인
  if (!authorNameProperty) {
    const authorKeys = propertyKeys.filter(key => 
      key.toLowerCase().includes('author') && 
      !key.toLowerCase().includes('role')
    );
    if (authorKeys.length > 0) {
      authorNameProperty = properties[authorKeys[0]];
        console.log(`[Notion Sermon Adapter] Author 이름 프로퍼티 발견: "${authorKeys[0]}"`);
    }
  }
  
  // Author-Name 프로퍼티에서 이름 추출 (Formula 또는 Rich Text 타입 지원)
  let authorName = '';
  if (authorNameProperty) {
    // Formula 타입인 경우
    if (authorNameProperty.type === 'formula') {
      authorName = extractFormula(authorNameProperty);
    } else {
      // Rich Text 또는 기타 타입
      authorName = extractRichText(authorNameProperty);
    }
  }
  
  // Author-Name이 있으면 프로퍼티에서 추출, 없으면 Relation 사용 (경로 1)
  if (authorName) {
    // Author-Name 프로퍼티 사용 (경로 2 우선)
    const authorRoleProperty = findProperty([
      'Verse', 'verse', 'Role', 'role', 
      'Author-Role', 'author-role', 'Author Role', 'author role',
      'Bible', 'bible'
    ]);
    const authorRole = authorRoleProperty ? extractRichText(authorRoleProperty) : '';

    // 프로필 이미지는 항상 Author Relation에서 가져오기 (경로 1)
    author = {
      name: authorName,
      role: authorRole,
      avatarSrc: profileImgFromRelation, // Author Relation에서 가져온 프로필 이미지 사용
    };
    
    // 디버깅: 추출된 Author 정보 확인
    console.log('\n========== Author 정보 추출 결과 (Author-Name 프로퍼티 사용) ==========');
    console.log('[Notion Sermon Adapter] 최종 Author 정보:', {
      name: authorName || '(비어있음)',
      role: authorRole || '(비어있음)',
      avatarSrc: profileImgFromRelation || '(비어있음)',
      source: 'Author-Name 프로퍼티 (이름), Author Relation (프로필 이미지)',
    });
    console.log('==========================================\n');
  } else {
    // Author-Name이 없으면 Author Relation 사용 (경로 1 - Fallback)
    if (authorProperty?.type === 'relation' && Array.isArray(authorProperty.relation) && authorProperty.relation.length > 0) {
      // Relation 타입: Author 페이지에서 정보 가져오기
      const authorId = authorProperty.relation[0].id;
      author = await fetchAuthorFromRelation(authorId, notion);
      // 프로필 이미지는 이미 fetchAuthorFromRelation에서 가져왔지만, Relation에서 가져온 것으로 덮어쓰기
      author.avatarSrc = profileImgFromRelation || author.avatarSrc;
      
      console.log('\n========== Author 정보 추출 결과 (Author Relation 사용) ==========');
      console.log('[Notion Sermon Adapter] 최종 Author 정보:', {
        name: author.name || '(비어있음)',
        role: author.role || '(비어있음)',
        avatarSrc: author.avatarSrc || '(비어있음)',
        source: 'Author Relation',
      });
      console.log('==========================================\n');
    } else {
      // 둘 다 없는 경우
      author = {
        name: '',
        role: '',
        avatarSrc: profileImgFromRelation, // Author Relation에서 가져온 프로필 이미지 (없으면 빈 문자열)
      };
      
      console.log('\n⚠️ 경고: Author-Name과 Author Relation을 찾을 수 없습니다!');
      console.log('다음 프로퍼티들을 확인했습니다:');
      propertyKeys.forEach(key => {
        const prop = properties[key];
        if (prop) {
          console.log(`  - "${key}" (${prop.type})`);
        }
      });
      console.log('==========================================\n');
    }
  }

  // 선택적 속성
  const tags = extractMultiSelect(properties.tags || properties.Tag);

  return {
    slug,
    title,
    titleEn,
    description,
    date,
    category,
    image,
    author,
    content: '', // 블록 렌더링 후 채워질 예정
    tags,
    sundayName,
  };
}

/**
 * Notion 페이지 배열을 BlogPost 배열로 변환 (Sermon용)
 * @param pages - Notion 페이지 배열
 * @returns BlogPost 배열
 */
export async function notionPagesToBlogPosts(pages: any[]): Promise<BlogPost[]> {
  const filteredPages = pages.filter((page) => page.object === 'page' && 'properties' in page);

  // 모든 페이지를 병렬로 변환
  return Promise.all(
    filteredPages.map((page) => notionPageToBlogPost(page as PageObjectResponse))
  );
}
