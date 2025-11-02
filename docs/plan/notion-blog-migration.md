# Notion 데이터베이스 기반 블로그 마이그레이션 계획 (고도화)

> **버전**: 2.0.0 (Ultrathink Edition)
> **작성일**: 2025-11-01
> **업데이트**: 기존 lib/notion.ts 분석 완료 및 상세 마이그레이션 전략 수립

## 📋 개요

현재 MDX 기반 블로그 시스템을 Notion 데이터베이스 기반으로 마이그레이션하는 계획서입니다.

**마이그레이션 목표:**
- MDX 파일 시스템에서 Notion 데이터베이스로 콘텐츠 소스 변경
- `@notionhq/client` (v5.3.0)와 `@notion-render/client`를 활용한 동적 렌더링
- 기존 UI/UX 유지하면서 백엔드만 변경
- **타입 안정성**, **에러 처리**, **성능 최적화** 강화

**현재 프로젝트 상태:**
- ✅ `@notionhq/client` v5.3.0 설치 완료
- ✅ `@notion-render/client`, `@notion-render/hljs-plugin`, `@notion-render/bookmark-plugin` 설치 완료
- ✅ `lib/notion.ts` 기본 구조 존재 (API 수정 필요)
- ⚠️ **치명적 이슈**: `notion.dataSources.query()` API 사용 중 (존재하지 않는 API)

---

## 🔍 현재 상태 분석

### 1. 기존 MDX 기반 구조

**파일 구조:**
```
posts/               # Markdown 파일 저장
lib/
  ├── mdx-handler.ts # MDX 파싱 및 처리
  └── blog-data.ts   # (삭제됨)
app/
  └── blog/
      └── [slug]/
          └── page.tsx  # 블로그 상세 페이지
```

**데이터 흐름:**
```
posts/*.md → mdx-handler.ts → BlogPost 인터페이스 → page.tsx 렌더링
```

**현재 BlogPost 인터페이스:**
```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  author: Author;
  content: string;
  tags?: string[];
}

interface Author {
  name: string;
  role: string;
  avatarSrc: string;
}
```

### 2. 기존 lib/notion.ts 상세 분석

**파일 위치**: `lib/notion.ts`

**현재 코드 구조:**
```typescript
import { Client } from '@notionhq/client';
import { PageObjectResponse, BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { cache } from 'react';
import 'server-only';

export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export const fetchPages = cache(async () => {
    return notion.dataSources.query({  // ❌ 잘못된 API
        data_source_id: process.env.NOTION_DATABASE_ID!,
        filter: {
            property: "Status",
            select: {
                equals: "Live",
            },
        },
    });
});

export const fetchBySlug = cache(async (slug: string) => {
    const response = await notion.dataSources.query({  // ❌ 잘못된 API
        data_source_id: process.env.NOTION_DATABASE_ID!,
        filter: {
            property: "slug",
            rich_text: {
                equals: slug,
            },
        },
    });

    return response.results[0] as PageObjectResponse | undefined;
});

export const fetchPageBlocks = cache(async (pageId: string) => {
    const response = await notion.blocks.children.list({  // ✅ 정상
        block_id: pageId,
    });

    return response.results as BlockObjectResponse[];
});
```

**🚨 치명적 문제점 분석:**

1. **존재하지 않는 API 사용**
   - `notion.dataSources.query()` → Notion SDK v5.3.0에 존재하지 않는 API
   - 올바른 API: `notion.databases.query()`
   - 파라미터명도 변경: `data_source_id` → `database_id`

2. **타입 안정성 부족**
   - 반환 타입이 `any`로 추론됨
   - 속성 접근 시 런타임 에러 가능성

3. **에러 처리 부재**
   - API 호출 실패 시 처리 로직 없음
   - 네트워크 오류, 권한 문제 등 대응 불가

4. **필터 구조 검증 필요**
   - `rich_text.equals` 필터는 정확히 일치해야 함
   - 대소문자 구분, 공백 등 주의

**✅ 정상 작동하는 부분:**
- `fetchPageBlocks()`: `notion.blocks.children.list()` API는 정상
- `cache()` 래퍼 사용: React 캐싱 전략 올바름
- `'server-only'` import: 클라이언트 사이드 노출 방지

**렌더링 방식 (스크린샷 참고):**
```typescript
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";

// Notion Renderer 설정
const renderer = new NotionRenderer({
  client: notion,
});
renderer.use(hljsPlugin({}));
renderer.use(bookmarkPlugin(undefined));

// 블록을 HTML로 렌더링
const html = await renderer.render(...blocks);
```

---

## 🎯 마이그레이션 전략

### Phase 1: Notion 데이터 구조 설계

#### Notion 데이터베이스 필수 속성

| 속성명 | 타입 | 설명 | 필수 여부 |
|--------|------|------|-----------|
| Name (Title) | Title | 블로그 제목 | ✅ 필수 |
| slug | Rich Text | URL 슬러그 (고유값) | ✅ 필수 |
| Status | Select | 게시 상태 (Live, Draft 등) | ✅ 필수 |
| description | Rich Text | 블로그 설명/요약 | ✅ 필수 |
| date | Date | 게시 날짜 | ✅ 필수 |
| category | Select | 카테고리 (아티클, 튜토리얼 등) | ✅ 필수 |
| image | Files & media | 대표 이미지 | ✅ 필수 |
| author_name | Rich Text | 작성자 이름 | ✅ 필수 |
| author_role | Rich Text | 작성자 역할 | ✅ 필수 |
| author_avatar | URL | 작성자 아바tar URL | ✅ 필수 |
| tags | Multi-select | 태그 목록 | ⭕ 선택 |

**환경 변수 요구사항:**
```env
NOTION_TOKEN=secret_xxx...
NOTION_DATABASE_ID=xxx-xxx-xxx...
```

### Phase 2: lib 파일 수정 및 생성

#### 2.1 `lib/notion.ts` 전면 수정 (최우선)

**수정 파일**: `lib/notion.ts` (lib/notion.ts:11, lib/notion.ts:23)

**🔧 상세 수정 사항:**

```typescript
import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  BlockObjectResponse,
  QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints';
import { cache } from 'react';
import 'server-only';

// Notion Client 초기화
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Live 상태인 모든 블로그 페이지 조회
 * @returns Notion 데이터베이스의 Live 페이지 목록
 */
export const fetchPages = cache(async (): Promise<QueryDatabaseResponse> => {
  try {
    // ✅ 수정: dataSources.query → databases.query
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,  // ✅ 수정: data_source_id → database_id
      filter: {
        property: "Status",
        select: {
          equals: "Live",
        },
      },
      sorts: [
        {
          property: "date",
          direction: "descending",  // 최신순 정렬
        },
      ],
    });

    return response;
  } catch (error) {
    console.error('[fetchPages] Notion API 에러:', error);
    throw new Error('블로그 목록을 가져오는데 실패했습니다.');
  }
});

/**
 * slug로 특정 블로그 페이지 조회
 * @param slug - URL slug (예: "my-blog-post")
 * @returns 해당 slug의 Notion 페이지 또는 undefined
 */
export const fetchBySlug = cache(async (slug: string): Promise<PageObjectResponse | undefined> => {
  try {
    // ✅ 수정: dataSources.query → databases.query
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,  // ✅ 수정: data_source_id → database_id
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    // 결과가 없으면 undefined 반환
    if (response.results.length === 0) {
      return undefined;
    }

    // 첫 번째 결과 반환 (slug는 고유값이어야 함)
    const page = response.results[0];

    // PageObjectResponse 타입 가드
    if (page.object === 'page' && 'properties' in page) {
      return page as PageObjectResponse;
    }

    return undefined;
  } catch (error) {
    console.error(`[fetchBySlug] slug="${slug}" 조회 실패:`, error);
    return undefined;  // 에러 발생 시 undefined 반환 (404 처리)
  }
});

/**
 * 페이지의 블록 콘텐츠 조회
 * @param pageId - Notion 페이지 ID
 * @returns 페이지의 블록 목록
 */
export const fetchPageBlocks = cache(async (pageId: string): Promise<BlockObjectResponse[]> => {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,  // 한 번에 가져올 블록 수
    });

    return response.results as BlockObjectResponse[];
  } catch (error) {
    console.error(`[fetchPageBlocks] pageId="${pageId}" 블록 조회 실패:`, error);
    throw new Error('블로그 콘텐츠를 가져오는데 실패했습니다.');
  }
});

/**
 * 페이지의 모든 블록 조회 (페이지네이션 처리)
 * 100개 이상의 블록이 있는 경우 자동으로 다음 페이지 로드
 */
export const fetchAllPageBlocks = cache(async (pageId: string): Promise<BlockObjectResponse[]> => {
  try {
    let allBlocks: BlockObjectResponse[] = [];
    let cursor: string | undefined = undefined;
    let hasMore = true;

    while (hasMore) {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
        start_cursor: cursor,
      });

      allBlocks = allBlocks.concat(response.results as BlockObjectResponse[]);
      hasMore = response.has_more;
      cursor = response.next_cursor || undefined;
    }

    return allBlocks;
  } catch (error) {
    console.error(`[fetchAllPageBlocks] pageId="${pageId}" 전체 블록 조회 실패:`, error);
    throw new Error('블로그 콘텐츠를 가져오는데 실패했습니다.');
  }
});
```

**🔑 주요 변경사항:**

| 항목 | 기존 | 수정 후 |
|------|------|---------|
| API 메서드 | `notion.dataSources.query()` | `notion.databases.query()` |
| 파라미터명 | `data_source_id` | `database_id` |
| 반환 타입 | 암시적 `any` | 명시적 `QueryDatabaseResponse`, `PageObjectResponse` |
| 에러 처리 | 없음 | `try-catch` 블록 추가 |
| 정렬 | 없음 | 날짜 기준 내림차순 정렬 추가 |
| 페이지네이션 | 없음 | `fetchAllPageBlocks()` 함수 추가 |
| JSDoc | 없음 | 함수별 설명 주석 추가 |

**🧪 테스트 방법:**

```typescript
// lib/notion.ts 수정 후 개발 서버에서 테스트
// app/test/page.tsx (임시 테스트 페이지)
import { fetchPages, fetchBySlug } from '@/lib/notion';

export default async function TestPage() {
  try {
    const pages = await fetchPages();
    console.log('✅ fetchPages 성공:', pages.results.length, '개');

    if (pages.results.length > 0) {
      const firstPage = pages.results[0] as any;
      const slug = firstPage.properties.slug?.rich_text[0]?.plain_text;

      if (slug) {
        const page = await fetchBySlug(slug);
        console.log('✅ fetchBySlug 성공:', page?.id);
      }
    }
  } catch (error) {
    console.error('❌ 테스트 실패:', error);
  }

  return <div>Notion API 테스트 완료 (콘솔 확인)</div>;
}
```

#### 2.2 `lib/notion-blog-adapter.ts` 생성 (신규)

Notion 데이터를 기존 BlogPost 인터페이스로 변환하는 어댑터:

```typescript
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BlogPost, Author } from './mdx-handler';

export function notionPageToBlogPost(page: PageObjectResponse): BlogPost {
  const properties = page.properties;

  // Title 추출
  const title = properties.Name?.type === 'title'
    ? properties.Name.title[0]?.plain_text || ''
    : '';

  // Rich Text 추출
  const description = properties.description?.type === 'rich_text'
    ? properties.description.rich_text[0]?.plain_text || ''
    : '';

  // Date 추출
  const date = properties.date?.type === 'date'
    ? properties.date.date?.start || ''
    : '';

  // Select 추출
  const category = properties.category?.type === 'select'
    ? properties.category.select?.name || '아티클'
    : '아티클';

  // Files 추출
  const image = properties.image?.type === 'files'
    ? properties.image.files[0]?.file?.url || properties.image.files[0]?.external?.url || ''
    : '';

  // Author 정보
  const author: Author = {
    name: properties.author_name?.type === 'rich_text'
      ? properties.author_name.rich_text[0]?.plain_text || ''
      : '',
    role: properties.author_role?.type === 'rich_text'
      ? properties.author_role.rich_text[0]?.plain_text || ''
      : '',
    avatarSrc: properties.author_avatar?.type === 'url'
      ? properties.author_avatar.url || ''
      : '',
  };

  // Tags 추출
  const tags = properties.tags?.type === 'multi_select'
    ? properties.tags.multi_select.map(tag => tag.name)
    : [];

  // Slug 추출
  const slug = properties.slug?.type === 'rich_text'
    ? properties.slug.rich_text[0]?.plain_text || ''
    : '';

  return {
    slug,
    title,
    description,
    date,
    category,
    image,
    author,
    content: '', // 블록 렌더링 후 채워짐
    tags,
  };
}
```

#### 2.3 `lib/notion-renderer.ts` 생성 (신규)

Notion 블록을 HTML로 렌더링:

```typescript
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { notion } from "./notion";

// Singleton 패턴으로 renderer 생성
let rendererInstance: NotionRenderer | null = null;

export function getNotionRenderer(): NotionRenderer {
  if (!rendererInstance) {
    rendererInstance = new NotionRenderer({
      client: notion,
    });

    // 플러그인 등록
    rendererInstance.use(hljsPlugin({}));
    rendererInstance.use(bookmarkPlugin(undefined));
  }

  return rendererInstance;
}

export async function renderNotionBlocks(blocks: any[]): Promise<string> {
  const renderer = getNotionRenderer();
  return await renderer.render(...blocks);
}
```

### Phase 3: `app/blog/[slug]/page.tsx` 수정

#### 3.1 수정 전후 비교

**현재 코드:**
```typescript
import { getPostBySlug, getAllPostSlugs } from "@/lib/mdx-handler";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    // ... JSX
    <div dangerouslySetInnerHTML={{ __html: post.content }} />
  );
}
```

**수정 후 코드:**
```typescript
import { fetchPages, fetchBySlug, fetchPageBlocks } from "@/lib/notion";
import { notionPageToBlogPost } from "@/lib/notion-blog-adapter";
import { renderNotionBlocks } from "@/lib/notion-renderer";

export async function generateStaticParams() {
  const response = await fetchPages();

  return response.results.map((page: any) => ({
    slug: page.properties.slug?.rich_text[0]?.plain_text || '',
  }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const resolvedParams = await params;
  const notionPage = await fetchBySlug(resolvedParams.slug);

  if (!notionPage) {
    notFound();
  }

  // Notion 페이지를 BlogPost로 변환
  const post = notionPageToBlogPost(notionPage);

  // 블록 콘텐츠 가져오기 및 렌더링
  const blocks = await fetchPageBlocks(notionPage.id);
  const htmlContent = await renderNotionBlocks(blocks);

  post.content = htmlContent;

  return (
    // ... 기존 JSX 유지 (변경 없음)
    <div dangerouslySetInnerHTML={{ __html: post.content }} />
  );
}
```

### Phase 4: 블로그 목록 페이지 대응

`BlogMoreArticles`, `BlogSection1` 등 블로그 목록을 표시하는 컴포넌트도 수정 필요:

**수정 예시:**
```typescript
// 기존: getAllPosts() from mdx-handler
import { getAllPosts } from "@/lib/mdx-handler";

// 변경: Notion에서 가져오기
import { fetchPages } from "@/lib/notion";
import { notionPageToBlogPost } from "@/lib/notion-blog-adapter";

export async function BlogSection() {
  const response = await fetchPages();
  const posts = response.results.map(notionPageToBlogPost);

  // ...
}
```

---

## 📦 의존성 패키지

### ✅ 이미 설치된 패키지 (설치 불필요)

```json
{
  "@notionhq/client": "^5.3.0",
  "@notion-render/client": "^0.0.2",
  "@notion-render/hljs-plugin": "^0.0.2",
  "@notion-render/bookmark-plugin": "^0.0.2"
}
```

**✨ 모든 필수 패키지가 이미 설치되어 있습니다!**
- `@notionhq/client`: Notion API 클라이언트 (최신 v5.3.0)
- `@notion-render/client`: Notion 블록을 HTML로 렌더링
- `@notion-render/hljs-plugin`: 코드 블록 신택스 하이라이팅
- `@notion-render/bookmark-plugin`: 북마크 블록 렌더링

**⚠️ 추가 패키지 권장사항:**

```bash
# Markdown 처리 (기존 MDX와 호환성 유지)
pnpm add gray-matter markdown-it  # 이미 설치되어 있을 가능성 높음

# hljs 테마 (선택사항)
pnpm add highlight.js
```

---

## 🔄 마이그레이션 단계별 체크리스트

### Step 1: 환경 설정
- [ ] Notion Integration 생성 (https://www.notion.so/my-integrations)
- [ ] Notion Database 생성 및 필수 속성 추가
- [ ] Database를 Integration에 연결
- [ ] `.env.local` 파일에 환경 변수 추가
  ```env
  NOTION_TOKEN=secret_xxx
  NOTION_DATABASE_ID=xxx-xxx-xxx
  ```

### Step 2: 패키지 설치
- [x] ~~`pnpm add @notion-render/client @notion-render/hljs-plugin @notion-render/bookmark-plugin`~~ (이미 설치됨)
- [ ] (선택) `pnpm add highlight.js` - hljs 테마용

### Step 3: 라이브러리 파일 수정/생성
- [ ] `lib/notion.ts` 수정 (`dataSources` → `databases` API 변경)
- [ ] `lib/notion-blog-adapter.ts` 생성
- [ ] `lib/notion-renderer.ts` 생성

### Step 4: 페이지 컴포넌트 수정
- [ ] `app/blog/[slug]/page.tsx` 수정
- [ ] `components/pro-blocks/landing-page/blog-sections/blog-more-articles.tsx` 수정
- [ ] `components/pro-blocks/landing-page/blog-sections/blog-section-1.tsx` 수정

### Step 5: 테스트 데이터 준비
- [ ] Notion Database에 테스트 블로그 글 1-2개 작성
- [ ] Status를 "Live"로 설정
- [ ] 모든 필수 속성 입력 확인

### Step 6: 로컬 테스트
- [ ] `pnpm dev` 실행
- [ ] 블로그 목록 페이지 확인
- [ ] 블로그 상세 페이지 확인
- [ ] 이미지 로딩 확인
- [ ] 코드 블록 하이라이팅 확인

### Step 7: 빌드 및 배포
- [ ] `pnpm build` 성공 확인
- [ ] 정적 생성된 페이지 확인
- [ ] 프로덕션 환경에 환경 변수 설정
- [ ] 배포

---

## ⚠️ 주의사항 및 고려사항

### 1. 이미지 처리
- Notion에서 업로드한 이미지는 만료되는 URL 사용
- 해결 방법:
  - Option A: Notion 이미지를 외부 스토리지(S3, Cloudinary)에 저장
  - Option B: Next.js Image Optimization 활용하여 프록시
  - Option C: Notion 이미지 URL 주기적으로 갱신 (ISR 사용)

### 2. 캐싱 전략
```typescript
// lib/notion.ts에 이미 cache() 적용되어 있음
import { cache } from 'react';

export const fetchPages = cache(async () => { ... });
export const fetchBySlug = cache(async (slug: string) => { ... });
```

**추가 권장사항:**
- ISR (Incremental Static Regeneration) 설정
- `app/blog/[slug]/page.tsx`에 revalidate 추가:
  ```typescript
  export const revalidate = 3600; // 1시간마다 재생성
  ```

### 3. 에러 처리
```typescript
try {
  const notionPage = await fetchBySlug(slug);
  if (!notionPage) {
    notFound();
  }
} catch (error) {
  console.error('Notion API 에러:', error);
  notFound();
}
```

### 4. 타입 안정성
- `PageObjectResponse` 타입 활용
- 속성 접근 시 type guard 사용
- null/undefined 체크 철저히

### 5. 성능 최적화
- `generateStaticParams()`로 빌드 타임에 페이지 생성
- Notion API 호출 최소화 (캐싱 활용)
- 이미지 lazy loading

---

## 🎨 스타일링 고려사항

### Notion 렌더링 CSS
`@notion-render/client`가 생성하는 HTML에 맞는 CSS 필요:

**app/globals.css에 추가:**
```css
/* Notion 렌더링 스타일 */
.notion-text {
  /* 텍스트 스타일 */
}

.notion-heading-1,
.notion-heading-2,
.notion-heading-3 {
  /* 헤딩 스타일 */
}

.notion-code {
  /* 인라인 코드 스타일 */
}

.notion-quote {
  /* 인용구 스타일 */
}

/* hljs 코드 블록 스타일 */
.hljs {
  /* 코드 블록 배경, 패딩 등 */
}
```

---

## 📊 롤백 계획

마이그레이션 중 문제 발생 시:

1. **기존 MDX 파일 보존**: `posts/` 디렉토리 삭제하지 않음
2. **Git 브랜치 전략**: `feature/notion-migration` 브랜치에서 작업
3. **환경 변수 분리**: Notion 관련 변수 추가만 하고 기존 설정 유지
4. **점진적 마이그레이션**:
   - Phase 1: Notion 연동만 테스트
   - Phase 2: 일부 페이지만 Notion으로 전환
   - Phase 3: 전체 마이그레이션

---

## 🚀 향후 개선 사항

1. **Webhook 연동**: Notion DB 업데이트 시 자동 재빌드
2. **CMS 관리자 페이지**: Notion 외 자체 관리 UI 추가
3. **검색 기능**: Algolia 또는 Meilisearch 연동
4. **댓글 시스템**: Giscus 또는 Utterances 통합
5. **조회수 트래킹**: Vercel Analytics 연동
6. **SEO 최적화**:
   - Open Graph 메타 태그
   - JSON-LD 구조화 데이터
   - Sitemap 자동 생성

---

## 🔧 트러블슈팅 가이드

### 문제 1: `notion.dataSources is not a function`

**증상:**
```
TypeError: notion.dataSources.query is not a function
```

**원인:**
- Notion SDK v5.x에서 `dataSources` API가 존재하지 않음
- 잘못된 API 사용

**해결 방법:**
1. `lib/notion.ts` 파일을 Phase 2.1의 수정 코드로 교체
2. `notion.dataSources.query` → `notion.databases.query` 변경
3. `data_source_id` → `database_id` 파라미터명 변경

### 문제 2: `APIResponseError: path failed validation`

**증상:**
```
@notionhq/client APIResponseError: body failed validation:
body.database_id should be defined
```

**원인:**
- `NOTION_DATABASE_ID` 환경 변수가 설정되지 않았거나 잘못됨

**해결 방법:**
1. `.env.local` 파일 확인:
   ```env
   NOTION_TOKEN=secret_xxxxx
   NOTION_DATABASE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```
2. Database ID 형식: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` (UUID 형식)
3. Notion에서 Database ID 찾는 방법:
   - Notion 데이터베이스 페이지 URL 확인
   - URL 형식: `https://www.notion.so/{workspace}/{database_id}?v={view_id}`
   - `database_id` 부분을 복사 (하이픈 포함 32자리)

### 문제 3: `APIResponseError: Unauthorized`

**증상:**
```
@notionhq/client APIResponseError: Unauthorized
```

**원인:**
- Notion Integration Token이 잘못되었거나 만료됨
- Integration이 Database에 접근 권한이 없음

**해결 방법:**
1. Notion Integration 확인: https://www.notion.so/my-integrations
2. 새 Token 생성 또는 기존 Token 복사
3. `.env.local`에 올바른 Token 입력
4. **중요**: Notion Database 페이지에서 Integration 연결
   - Database 페이지 우측 상단 `...` 클릭
   - `Add connections` → 생성한 Integration 선택
   - 연결 승인

### 문제 4: 속성(Property) 타입 에러

**증상:**
```
Cannot read property 'rich_text' of undefined
TypeError: properties.slug.rich_text[0] is undefined
```

**원인:**
- Notion Database 속성명이 코드와 일치하지 않음
- 속성 타입이 예상과 다름

**해결 방법:**
1. Notion Database 속성 확인:
   - 속성명이 정확히 일치하는지 확인 (대소문자 구분)
   - 예: `slug` vs `Slug` vs `SLUG`
2. Phase 1의 속성 테이블대로 Database 설정
3. `lib/notion-blog-adapter.ts`에서 타입 가드 사용:
   ```typescript
   const slug = properties.slug?.type === 'rich_text'
     ? properties.slug.rich_text[0]?.plain_text || ''
     : '';
   ```

### 문제 5: 이미지가 표시되지 않음

**증상:**
- 블로그 목록/상세 페이지에서 이미지가 깨짐
- `403 Forbidden` 또는 `404 Not Found` 에러

**원인:**
- Notion 이미지 URL이 만료됨 (약 1시간 유효)

**해결 방법:**
1. **단기 해결책**: ISR 설정
   ```typescript
   // app/blog/[slug]/page.tsx
   export const revalidate = 3600; // 1시간마다 재생성
   ```

2. **장기 해결책**: Next.js Image Proxy 사용
   ```typescript
   // next.config.ts
   const config: NextConfig = {
     images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: '*.amazonaws.com',  // Notion S3
         },
         {
           protocol: 'https',
           hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
         },
       ],
     },
   };
   ```

3. **최선 해결책**: 외부 이미지 호스팅 사용 (Cloudinary, Imgix 등)

### 문제 6: 빌드 시 타임아웃

**증상:**
```
Error: Page exceeded the timeout of 60 seconds
```

**원인:**
- Notion API 호출이 너무 많음
- 블로그 페이지가 너무 많아 빌드 시간 초과

**해결 방법:**
1. `next.config.ts`에서 타임아웃 증가:
   ```typescript
   const config: NextConfig = {
     staticPageGenerationTimeout: 120,  // 120초로 증가
   };
   ```

2. 빌드 시 페이지 수 제한:
   ```typescript
   // app/blog/[slug]/page.tsx
   export async function generateStaticParams() {
     const response = await fetchPages();

     // 개발/빌드 환경에 따라 제한
     const limit = process.env.NODE_ENV === 'development' ? 5 : 100;

     return response.results
       .slice(0, limit)
       .map((page: any) => ({
         slug: page.properties.slug?.rich_text[0]?.plain_text || '',
       }));
   }
   ```

### 문제 7: 코드 블록 하이라이팅이 작동하지 않음

**증상:**
- 코드 블록에 색상이 없음
- 모노톤으로만 표시됨

**해결 방법:**
1. hljs CSS 테마 import:
   ```typescript
   // app/layout.tsx
   import 'highlight.js/styles/github-dark.css';  // 또는 원하는 테마
   ```

2. 또는 CDN 사용:
   ```typescript
   // app/layout.tsx
   export default function RootLayout({ children }) {
     return (
       <html>
         <head>
           <link
             rel="stylesheet"
             href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
           />
         </head>
         <body>{children}</body>
       </html>
     );
   }
   ```

### 문제 8: 캐시가 업데이트되지 않음

**증상:**
- Notion에서 콘텐츠를 수정했는데 웹사이트에 반영되지 않음

**원인:**
- React `cache()` 함수가 개발 서버에서 캐싱됨

**해결 방법:**
1. 개발 서버 재시작: `pnpm dev`를 종료 후 재실행
2. ISR 설정으로 자동 갱신:
   ```typescript
   export const revalidate = 3600; // 1시간
   ```
3. On-Demand ISR 구현:
   ```typescript
   // app/api/revalidate/route.ts
   import { revalidatePath } from 'next/cache';
   import { NextRequest } from 'next/server';

   export async function POST(request: NextRequest) {
     const secret = request.nextUrl.searchParams.get('secret');

     if (secret !== process.env.REVALIDATE_SECRET) {
       return Response.json({ message: 'Invalid secret' }, { status: 401 });
     }

     revalidatePath('/blog');
     revalidatePath('/blog/[slug]');

     return Response.json({ revalidated: true, now: Date.now() });
   }
   ```

### 문제 9: TypeScript 타입 에러

**증상:**
```
Type 'any' is not assignable to type 'PageObjectResponse'
```

**해결 방법:**
- Phase 2.1의 타입 정의를 정확히 따르기
- 타입 가드 사용:
  ```typescript
  if (page.object === 'page' && 'properties' in page) {
    return page as PageObjectResponse;
  }
  ```

### 문제 10: Notion 블록 렌더링 오류

**증상:**
```
Error: Unable to render block type: xxx
```

**원인:**
- `@notion-render/client`가 지원하지 않는 블록 타입

**해결 방법:**
1. 지원되지 않는 블록 타입 확인 및 회피
2. 커스텀 렌더러 작성:
   ```typescript
   // lib/notion-renderer.ts
   renderer.use((block) => {
     if (block.type === 'unsupported_block_type') {
       return '<div class="unsupported-block">이 블록은 지원되지 않습니다</div>';
     }
   });
   ```

---

## 📚 참고 자료

- [Notion API 공식 문서](https://developers.notion.com/)
- [@notionhq/client 패키지](https://github.com/makenotion/notion-sdk-js)
- [@notion-render/client 문서](https://github.com/notion-render/notion-render)
- [Next.js App Router 데이터 페칭](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js ISR (Incremental Static Regeneration)](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

---

## 📝 Notion 데이터베이스 설정 가이드

### 1. Notion Integration 생성

1. https://www.notion.so/my-integrations 접속
2. `+ New integration` 클릭
3. 설정:
   - **Name**: `fkcc-blog` (또는 원하는 이름)
   - **Associated workspace**: 본인의 워크스페이스 선택
   - **Capabilities**:
     - ✅ Read content
     - ✅ Read user information
     - ❌ Update content (선택)
     - ❌ Insert content (선택)
4. `Submit` 클릭
5. **Integration Token 복사** → `.env.local`에 저장

### 2. Notion Database 생성 및 설정

#### 2.1 Database 생성

1. Notion에서 새 페이지 생성
2. `/database` 입력 → `Table - Inline` 선택
3. Database 이름: `블로그 포스트` (또는 원하는 이름)

#### 2.2 필수 속성 추가

**기본 속성 (Name)은 이미 존재합니다. 아래 속성들을 추가하세요:**

| 순서 | 속성명 | 타입 | 설정 |
|-----|--------|------|------|
| 1 | **Name** (기본) | Title | - |
| 2 | **slug** | Text | - |
| 3 | **Status** | Select | 옵션: `Live`, `Draft`, `Archived` |
| 4 | **description** | Text | - |
| 5 | **date** | Date | - |
| 6 | **category** | Select | 옵션: `아티클`, `튜토리얼`, `가이드` 등 |
| 7 | **image** | Files & media | - |
| 8 | **author_name** | Text | - |
| 9 | **author_role** | Text | - |
| 10 | **author_avatar** | URL | - |
| 11 | **tags** | Multi-select | 옵션: 자유롭게 추가 |

**⚠️ 주의사항:**
- 속성명은 **정확히** 일치해야 합니다 (대소문자 구분)
- `Name` 속성은 Notion이 자동으로 생성하므로 추가하지 않습니다
- `slug`는 URL에 사용되므로 고유해야 합니다 (예: `my-first-post`)

#### 2.3 Database ID 복사

1. Database 페이지 우측 상단 `...` → `Copy link` 클릭
2. URL 형식: `https://www.notion.so/{workspace}/{database_id}?v={view_id}`
3. `database_id` 부분만 복사 (하이픈 포함 32자리)
   - 예: `12345678-1234-1234-1234-123456789abc`
4. `.env.local`에 저장

#### 2.4 Integration 연결

1. Database 페이지 우측 상단 `...` 클릭
2. `Add connections` 선택
3. 생성한 Integration(`fkcc-blog`) 선택
4. `Confirm` 클릭

### 3. 테스트 데이터 작성

**첫 번째 블로그 글 예시:**

| 속성 | 값 |
|------|-----|
| Name | Next.js 16 시작하기 |
| slug | nextjs-16-getting-started |
| Status | Live |
| description | Next.js 16의 새로운 기능과 시작하는 방법을 알아봅니다 |
| date | 2025-11-01 |
| category | 튜토리얼 |
| image | (이미지 업로드 또는 외부 URL) |
| author_name | 홍길동 |
| author_role | Frontend Developer |
| author_avatar | https://i.pravatar.cc/150?img=1 |
| tags | Next.js, React, Tutorial |

**페이지 콘텐츠:**
- Database 행을 클릭하여 페이지 열기
- 본문에 Notion 블록 추가:
  - Heading 1, 2, 3
  - Paragraph
  - Code block
  - Image
  - Quote
  - Bulleted list / Numbered list
  - 등

### 4. 환경 변수 설정

`.env.local` 파일 생성 (프로젝트 루트):

```env
# Notion Integration
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=12345678-1234-1234-1234-123456789abc

# (선택) On-Demand ISR용
REVALIDATE_SECRET=your-secret-key-here
```

---

## 📝 변경 이력

| 날짜 | 버전 | 변경 내용 |
|------|------|-----------|
| 2025-11-01 | 1.0.0 | 초안 작성 |
| 2025-11-01 | 2.0.0 | 고도화 (Ultrathink Edition)<br>- 기존 lib/notion.ts 분석 완료<br>- API 수정 사항 상세화<br>- 트러블슈팅 가이드 추가<br>- Notion Database 설정 가이드 추가<br>- 패키지 정보 업데이트<br>- 실제 작동하는 코드 예시 제공 |

---

## ✅ 최종 체크리스트

마이그레이션 완료 전 확인사항:

- [ ] lib/notion.ts의 API가 `databases.query()`로 수정됨
- [ ] Notion Integration 생성 및 Token 발급 완료
- [ ] Notion Database 생성 및 11개 필수 속성 추가 완료
- [ ] Database에 Integration 연결 완료
- [ ] `.env.local`에 환경 변수 설정 완료
- [ ] 테스트 블로그 글 1개 이상 작성 (Status: Live)
- [ ] `lib/notion-blog-adapter.ts` 파일 생성
- [ ] `lib/notion-renderer.ts` 파일 생성
- [ ] `app/blog/[slug]/page.tsx` Notion 연동으로 수정
- [ ] 블로그 목록 컴포넌트 수정 (BlogMoreArticles, BlogSection1)
- [ ] 로컬 테스트 (`pnpm dev`) 성공
- [ ] 빌드 테스트 (`pnpm build`) 성공
- [ ] 이미지 로딩 확인
- [ ] 코드 블록 하이라이팅 확인
- [ ] 404 페이지 정상 작동 확인
- [ ] ISR 설정 (`revalidate`) 추가
- [ ] 프로덕션 배포 및 환경 변수 설정

**🎉 모든 체크리스트 완료 시 마이그레이션 성공!**
