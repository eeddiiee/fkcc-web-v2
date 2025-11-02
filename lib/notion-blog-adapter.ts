import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BlogPost, Author } from './mdx-handler';

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
  if (property?.type === 'rich_text' && Array.isArray(property.rich_text)) {
    return property.rich_text[0]?.plain_text || '';
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

/**
 * Notion PageObjectResponse를 BlogPost 인터페이스로 변환
 * @param page - Notion 페이지 객체
 * @returns BlogPost 객체
 */
export function notionPageToBlogPost(page: PageObjectResponse): BlogPost {
  const properties = page.properties;

  // 필수 속성 추출 (실제 Notion 데이터베이스 속성 이름 사용)
  const title = extractTitle(properties.Name); // Name (한글 제목)
  const slug = extractFormula(properties.slug); // slug (Formula 타입)
  const description = extractRichText(properties.SundayName || properties.description); // SundayName 또는 description
  const date = extractDate(properties.Date); // Date (대문자 D)
  const category = extractSelect(properties.Tag, '아티클'); // Tag를 category로 사용
  const image = extractImage(properties.image); // image

  // Author 정보 추출
  const author: Author = {
    name: extractRichText(properties.Author), // Author
    role: extractRichText(properties.author_role || properties.Verse), // Verse를 role로 사용 (임시)
    avatarSrc: extractUrl(properties.author_avatar),
  };

  // 선택적 속성
  const tags = extractMultiSelect(properties.tags || properties.Tag);

  return {
    slug,
    title,
    description,
    date,
    category,
    image,
    author,
    content: '', // 블록 렌더링 후 채워질 예정
    tags,
  };
}

/**
 * Notion 페이지 배열을 BlogPost 배열로 변환
 * @param pages - Notion 페이지 배열
 * @returns BlogPost 배열
 */
export function notionPagesToBlogPosts(pages: any[]): BlogPost[] {
  return pages
    .filter((page) => page.object === 'page' && 'properties' in page)
    .map((page) => notionPageToBlogPost(page as PageObjectResponse));
}
