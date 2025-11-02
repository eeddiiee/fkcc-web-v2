# 블로그 CMS 업로드 솔루션 종합 분석

> **작성일**: 2025년 1월 1일
> **목적**: 비개발자도 쉽게 블로그 글과 이미지를 업로드할 수 있는 최적의 솔루션 찾기

---

## 📋 목차

1. [프로젝트 현황 분석](#프로젝트-현황-분석)
2. [솔루션 카테고리 개요](#솔루션-카테고리-개요)
3. [상세 솔루션 분석](#상세-솔루션-분석)
4. [비교표](#비교표)
5. [TOP 3 추천 솔루션](#top-3-추천-솔루션)
6. [부록](#부록)

---

## 프로젝트 현황 분석

### 현재 시스템
- **프레임워크**: Next.js 16 (App Router)
- **블로그 시스템**: Markdown 기반 파일 시스템
- **콘텐츠 위치**: `posts/` 디렉토리
- **파싱 라이브러리**: gray-matter + markdown-it
- **배포**: GitHub 저장소 (추정)
- **렌더링**: 서버 컴포넌트 (빌드타임)

### 현재의 문제점
1. **비개발자 접근성**: Git 및 Markdown 문법 지식 필요
2. **이미지 관리**: 수동으로 이미지 파일 관리 필요
3. **미리보기**: 로컬 환경 없이는 결과 확인 어려움
4. **협업**: 여러 명이 동시에 작성하기 어려움
5. **버전 관리**: Git을 모르면 히스토리 추적 불가

### 요구사항
✅ 비개발자도 사용 가능한 UI
✅ 이미지 드래그 앤 드롭 업로드
✅ 실시간 미리보기
✅ Markdown 또는 WYSIWYG 에디터
✅ 기존 Next.js 시스템과 호환
✅ 비용 효율적

---

## 솔루션 카테고리 개요

### 1. Headless CMS
외부 서비스에서 콘텐츠를 관리하고 API로 가져오는 방식

### 2. Git-based CMS
GitHub 저장소를 그대로 사용하되, 친화적인 UI 제공

### 3. GitHub 네이티브 솔루션
GitHub의 기능을 직접 활용

### 4. 커스텀 관리자 페이지
프로젝트 내부에 관리자 페이지 구축

### 5. No-Code/Low-Code
Notion, Airtable 등 기존 도구 활용

---

## 상세 솔루션 분석

## 1. Headless CMS 솔루션

### 1.1 Tina CMS ⭐️⭐️⭐️⭐️⭐️

**개요**: Git 기반 Headless CMS로 Next.js에 최적화됨

**비개발자 친화성**: ⭐️⭐️⭐️⭐️⭐️ (5/5)

#### 주요 특징
- ✅ Visual Editor: 실시간 미리보기
- ✅ Markdown 지원 (MDX 포함)
- ✅ 이미지 업로드: 자동 최적화
- ✅ Git Workflow: 자동 커밋
- ✅ Self-hosted 또는 Cloud

#### 가격
- **무료 티어**: 1 사용자, 무제한 콘텐츠
- **Starter**: $29/월 (5 사용자)
- **Team**: $99/월 (무제한 사용자)

#### 장점
- Next.js와 완벽한 통합
- 실시간 미리보기
- 로컬에서도 작동 (self-hosted)
- GraphQL API
- Markdown 파일을 그대로 사용

#### 단점
- 초기 설정 필요 (개발자 작업)
- 무료 버전은 1명 제한
- 복잡한 워크플로우에는 한계

#### 구현 난이도
**중간** (⏱ 4-6시간)

---

### 1.2 Sanity ⭐️⭐️⭐️⭐️

**개요**: 강력하고 유연한 Headless CMS

**비개발자 친화성**: ⭐️⭐️⭐️⭐️ (4/5)

#### 주요 특징
- ✅ Studio: 커스터마이징 가능한 에디터
- ✅ Real-time 협업
- ✅ Asset Pipeline: 이미지 자동 최적화
- ✅ GROQ: 강력한 쿼리 언어
- ✅ Portable Text: 구조화된 콘텐츠

#### 가격
- **무료**: 10k requests/월, 5GB bandwidth
- **Growth**: $99/월
- **Team**: $299/월
- **Enterprise**: 커스텀

#### 장점
- 매우 유연하고 확장 가능
- 훌륭한 개발자 경험
- 실시간 협업
- CDN으로 이미지 자동 최적화
- 풍부한 플러그인 생태계

#### 단점
- Markdown 파일로 내보내기 어려움
- 기존 posts/ 구조 대체 필요
- 학습 곡선 존재
- API 요청 기반 과금

#### 구현 난이도
**어려움** (⏱ 8-12시간)

---

### 1.3 Contentful ⭐️⭐️⭐️

**개요**: 엔터프라이즈급 Headless CMS

**비개발자 친화성**: ⭐️⭐️⭐️ (3/5)

#### 주요 특징
- ✅ Content Model: 구조화된 콘텐츠
- ✅ Media Library: 이미지 관리
- ✅ RESTful & GraphQL API
- ✅ 다국어 지원
- ✅ Workflow 및 권한 관리

#### 가격
- **Free**: 25k records, 5 users
- **Basic**: $300/월
- **Premium**: $2,000/월

#### 장점
- 안정적이고 성숙한 플랫폼
- 엔터프라이즈 기능 (권한, 워크플로우)
- 훌륭한 이미지 처리

#### 단점
- 비싼 가격
- Markdown 중심 블로그에는 과한 기능
- 기존 구조 완전히 대체 필요
- 복잡한 UI

#### 구현 난이도
**어려움** (⏱ 10-15시간)

---

### 1.4 Payload CMS ⭐️⭐️⭐️⭐️

**개요**: 오픈소스 Headless CMS (self-hosted)

**비개발자 친화성**: ⭐️⭐️⭐️⭐️ (4/5)

#### 주요 특징
- ✅ Self-hosted: 완전 무료
- ✅ TypeScript 네이티브
- ✅ 커스터마이징 가능
- ✅ Access Control
- ✅ File Upload: 로컬 또는 S3

#### 가격
- **Self-hosted**: 무료
- **Payload Cloud**: $25/월~

#### 장점
- 완전 무료 (self-hosted)
- Next.js와 잘 통합
- 유연한 커스터마이징
- 오픈소스

#### 단점
- 자체 호스팅 필요
- 개발자의 초기 설정 필수
- Markdown 파일 직접 사용 불가

#### 구현 난이도
**어려움** (⏱ 12-16시간)

---

## 2. Git-based CMS

### 2.1 Decap CMS (구 Netlify CMS) ⭐️⭐️⭐️⭐️

**개요**: Git 저장소를 UI로 관리하는 오픈소스 CMS

**비개발자 친화성**: ⭐️⭐️⭐️⭐️ (4/5)

#### 주요 특징
- ✅ Git Workflow: PR 자동 생성
- ✅ Markdown 에디터
- ✅ 이미지 업로드: Git에 자동 커밋
- ✅ 완전 무료
- ✅ 기존 파일 구조 유지

#### 가격
**완전 무료** (오픈소스)

#### 장점
- 무료
- 기존 Markdown 파일 그대로 사용
- Git 히스토리 유지
- 설치 간단 (`/admin` 경로에 추가)
- 로컬 또는 Git Gateway 인증

#### 단점
- 실시간 미리보기 제한적
- UI가 다소 오래됨
- 복잡한 콘텐츠 구조에는 한계
- 최근 업데이트 느림 (커뮤니티 유지)

#### 구현 난이도
**쉬움** (⏱ 2-3시간)

---

### 2.2 Forestry.io / TinaCMS ⭐️⭐️⭐️⭐️⭐️

> Forestry는 Tina CMS로 마이그레이션됨 (위 1.1 참고)

---

## 3. GitHub 네이티브 솔루션

### 3.1 GitHub Web UI ⭐️⭐️

**개요**: GitHub 웹 인터페이스에서 직접 파일 편집

**비개발자 친화성**: ⭐️⭐️ (2/5)

#### 장점
- 완전 무료
- 추가 설치 불필요
- Git 히스토리 자동 관리

#### 단점
- 미리보기 없음
- Markdown 문법 익숙해야 함
- 이미지 업로드 불편
- 에디터 기능 제한적

#### 구현 난이도
**없음** (설정 불필요)

---

### 3.2 GitHub Actions + Issues ⭐️⭐️⭐️

**개요**: GitHub Issues를 작성 인터페이스로 활용

**비개발자 친화성**: ⭐️⭐️⭐️ (3/5)

#### 작동 방식
1. 특정 라벨의 Issue 생성
2. GitHub Actions가 트리거
3. Issue 내용을 Markdown 파일로 변환
4. posts/ 폴더에 자동 커밋

#### 장점
- 무료
- 익숙한 Issue 인터페이스
- 자동화 가능

#### 단점
- Actions 설정 필요 (개발자 작업)
- 미리보기 제한적
- 이미지 링크 수동 관리

#### 구현 난이도
**중간** (⏱ 4-6시간)

---

## 4. 커스텀 관리자 페이지

### 4.1 Next.js Admin Panel ⭐️⭐️⭐️⭐️⭐️

**개요**: 프로젝트 내부에 `/admin` 페이지 구축

**비개발자 친화성**: ⭐️⭐️⭐️⭐️⭐️ (5/5)

#### 주요 컴포넌트
- **에디터**: TipTap, Slate, Quill
- **인증**: NextAuth.js
- **이미지**: Cloudinary, Vercel Blob, S3
- **파일 저장**: Git API 또는 직접 저장

#### 장점
- 완전한 커스터마이징
- 프로젝트에 완전히 통합
- 원하는 기능만 추가
- 비용 효율적 (무료 티어 활용)

#### 단점
- 개발 시간 필요
- 유지보수 부담
- 보안 고려사항 많음

#### 구현 난이도
**어려움** (⏱ 20-40시간)

#### 필요한 패키지
```json
{
  "next-auth": "^5.0.0",
  "@tiptap/react": "^2.1.0",
  "@tiptap/starter-kit": "^2.1.0",
  "react-dropzone": "^14.2.0",
  "cloudinary": "^1.41.0"
}
```

---

## 5. No-Code/Low-Code 솔루션

### 5.1 Notion API ⭐️⭐️⭐️⭐️

**개요**: Notion을 CMS로 사용, API로 동기화

**비개발자 친화성**: ⭐️⭐️⭐️⭐️⭐️ (5/5)

#### 작동 방식
1. Notion 데이터베이스에 글 작성
2. Next.js가 Notion API로 데이터 fetch
3. 빌드타임 또는 ISR로 렌더링

#### 장점
- 비개발자에게 가장 익숙한 UI
- 무료 (개인 플랜)
- 협업 기능 뛰어남
- 이미지 호스팅 자동

#### 단점
- API 응답 속도 느림
- Markdown 변환 필요
- Notion 의존성
- Git 히스토리 없음

#### 구현 난이도
**중간** (⏱ 6-8시간)

#### 필요한 패키지
```bash
pnpm add @notionhq/client notion-to-md
```

---

### 5.2 Airtable + Zapier/Make ⭐️⭐️⭐️

**개요**: Airtable을 CMS로 사용

**비개발자 친화성**: ⭐️⭐️⭐️⭐️ (4/5)

#### 장점
- 스프레드시트 형태
- 무료 티어 넉넉
- 자동화 도구 풍부

#### 단점
- 이미지 관리 제한적
- API 호출 제한
- Markdown 변환 필요

#### 구현 난이도
**중간** (⏱ 5-7시간)

---

## 비교표

### 가격 비교

| 솔루션 | 무료 티어 | 유료 시작 | 추천 대상 |
|--------|-----------|-----------|-----------|
| Tina CMS | 1 사용자 | $29/월 | 소규모 팀 |
| Decap CMS | 완전 무료 | - | 예산 제한 |
| Sanity | 10k req/월 | $99/월 | 확장 예정 |
| Payload CMS | Self-hosted 무료 | $25/월 (Cloud) | 완전한 제어 |
| Notion API | 무료 | - | 비개발자 위주 |
| 커스텀 Admin | 무료* | - | 맞춤형 필요 |

*이미지 호스팅 비용 별도

### 난이도 비교

| 솔루션 | 구현 시간 | 난이도 | 유지보수 |
|--------|-----------|--------|----------|
| Decap CMS | 2-3시간 | ⭐️ 쉬움 | 낮음 |
| Tina CMS | 4-6시간 | ⭐️⭐️ 중간 | 낮음 |
| Notion API | 6-8시간 | ⭐️⭐️ 중간 | 중간 |
| Sanity | 8-12시간 | ⭐️⭐️⭐️ 어려움 | 중간 |
| Payload CMS | 12-16시간 | ⭐️⭐️⭐️ 어려움 | 높음 |
| 커스텀 Admin | 20-40시간 | ⭐️⭐️⭐️⭐️ 매우 어려움 | 매우 높음 |

### 기능 비교

| 기능 | Tina | Decap | Sanity | Payload | Notion | 커스텀 |
|------|------|-------|--------|---------|--------|--------|
| 실시간 미리보기 | ✅ | ⚠️ | ✅ | ✅ | ❌ | ✅ |
| Markdown 파일 유지 | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| 이미지 최적화 | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| Git 통합 | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| 협업 기능 | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| 모바일 지원 | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ |

---

## TOP 3 추천 솔루션

## 🥇 1위: Tina CMS

### 추천 이유
- ✅ Next.js에 최적화
- ✅ 실시간 Visual Editor
- ✅ 기존 Markdown 파일 구조 유지
- ✅ Git Workflow 자동화
- ✅ 합리적인 가격 (무료 티어 제공)
- ✅ 설정 난이도 적절

### 적합한 경우
- 1-5명의 컨텐츠 작성자
- Git 기반 워크플로우 유지
- 빠른 구현 필요
- Markdown 파일을 계속 사용

### 단계별 구현 가이드

#### Step 1: 패키지 설치
```bash
pnpm add tinacms @tinacms/cli
```

#### Step 2: Tina 설정 파일 생성
`tina/config.ts`:
```typescript
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "posts/images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "string",
            name: "authorRole",
            label: "Author Role",
          },
          {
            type: "string",
            name: "authorAvatar",
            label: "Author Avatar URL",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
```

#### Step 3: 환경 변수 설정
`.env.local`:
```
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

#### Step 4: package.json 스크립트 추가
```json
{
  "scripts": {
    "dev": "tinacms dev -c \"next dev\"",
    "build": "tinacms build && next build"
  }
}
```

#### Step 5: 관리자 페이지 접근
```
http://localhost:3000/admin
```

### 예상 소요 시간
- 초기 설정: 2-3시간
- 커스터마이징: 1-2시간
- **총**: 4-6시간

### 비용
- 1 사용자: 무료
- 2-5 사용자: $29/월
- 무제한 사용자: $99/월

---

## 🥈 2위: Decap CMS

### 추천 이유
- ✅ 완전 무료
- ✅ 설정 매우 간단
- ✅ 기존 Git 워크플로우 유지
- ✅ Markdown 파일 그대로 사용
- ✅ 오픈소스

### 적합한 경우
- 예산 제한
- 간단한 블로그
- Git 기반 워크플로우
- 1-3명의 작성자

### 단계별 구현 가이드

#### Step 1: 패키지 설치
```bash
pnpm add netlify-cms-app
```

#### Step 2: 설정 파일 생성
`public/admin/config.yml`:
```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "posts/images"
public_folder: "/images"

collections:
  - name: "blog"
    label: "Blog"
    folder: "posts"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Slug", name: "slug", widget: "string"}
      - {label: "Description", name: "description", widget: "text"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Author", name: "author", widget: "string"}
      - {label: "Author Role", name: "authorRole", widget: "string"}
      - {label: "Author Avatar", name: "authorAvatar", widget: "string"}
      - {label: "Category", name: "category", widget: "string"}
      - {label: "Image", name: "image", widget: "image"}
      - {label: "Tags", name: "tags", widget: "list"}
      - {label: "Body", name: "body", widget: "markdown"}
```

#### Step 3: HTML 페이지 생성
`public/admin/index.html`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
  </head>
  <body>
    <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  </body>
</html>
```

#### Step 4: Git Gateway 설정 (GitHub)
Netlify Identity 또는 GitHub OAuth 앱 설정

#### Step 5: 접근
```
http://localhost:3000/admin
```

### 예상 소요 시간
- 초기 설정: 1-2시간
- Git Gateway 설정: 30분-1시간
- **총**: 2-3시간

### 비용
**완전 무료**

---

## 🥉 3위: Notion API

### 추천 이유
- ✅ 비개발자에게 가장 친숙
- ✅ 협업 기능 뛰어남
- ✅ 무료
- ✅ 이미지 호스팅 자동
- ✅ 모바일 앱 지원

### 적합한 경우
- 비개발자 중심 팀
- Notion을 이미 사용 중
- 협업이 많은 환경
- Git 워크플로우 불필요

### 단계별 구현 가이드

#### Step 1: 패키지 설치
```bash
pnpm add @notionhq/client notion-to-md
```

#### Step 2: Notion 데이터베이스 생성
Notion에서 블로그 데이터베이스 생성:
- Title (제목)
- Slug (텍스트)
- Description (텍스트)
- Date (날짜)
- Author (텍스트)
- Category (선택)
- Image (파일)
- Tags (다중 선택)
- Content (페이지 내용)

#### Step 3: Notion Integration 생성
1. https://www.notion.so/my-integrations
2. New Integration 생성
3. API Key 복사

#### Step 4: 데이터 Fetch 유틸리티
`lib/notion.ts`:
```typescript
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getAllPosts() {
  const database = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return Promise.all(
    database.results.map(async (page: any) => {
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const content = n2m.toMarkdownString(mdBlocks);

      return {
        slug: page.properties.Slug.rich_text[0].plain_text,
        title: page.properties.Title.title[0].plain_text,
        description: page.properties.Description.rich_text[0]?.plain_text || "",
        date: page.properties.Date.date.start,
        author: page.properties.Author.rich_text[0]?.plain_text || "",
        category: page.properties.Category.select?.name || "",
        image: page.properties.Image.files[0]?.file.url || "",
        tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
        content: content.parent,
      };
    })
  );
}

export async function getPostBySlug(slug: string) {
  const database = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  if (database.results.length === 0) return null;

  const page = database.results[0];
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const content = n2m.toMarkdownString(mdBlocks);

  return {
    slug: page.properties.Slug.rich_text[0].plain_text,
    title: page.properties.Title.title[0].plain_text,
    // ... (위와 동일)
  };
}
```

#### Step 5: 환경 변수
`.env.local`:
```
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxx
```

#### Step 6: 기존 mdx-handler.ts 대체
기존 파일 시스템 대신 Notion API 사용

### 예상 소요 시간
- Notion 설정: 1-2시간
- API 통합: 3-4시간
- 테스트 및 최적화: 2-3시간
- **총**: 6-8시간

### 비용
**무료** (Notion 개인 플랜)

---

## 부록

### A. WYSIWYG 에디터 비교

#### TipTap ⭐️⭐️⭐️⭐️⭐️
- **장점**: 모던, 확장 가능, Markdown 지원
- **단점**: 초기 설정 필요
- **추천**: 커스텀 Admin에 최적

#### Slate ⭐️⭐️⭐️⭐️
- **장점**: 완전한 커스터마이징
- **단점**: 복잡함, 학습 곡선
- **추천**: 특수한 요구사항 있을 때

#### Quill ⭐️⭐️⭐️
- **장점**: 간단, 안정적
- **단점**: 확장성 제한
- **추천**: 간단한 에디터 필요할 때

### B. 이미지 호스팅 옵션

#### Cloudinary
- **무료 티어**: 25 credits/월 (약 25GB)
- **장점**: 자동 최적화, 변환 API
- **단점**: 복잡한 가격 체계

#### Vercel Blob
- **무료 티어**: 500MB
- **장점**: Vercel과 완벽 통합
- **단점**: 용량 제한

#### AWS S3
- **가격**: 사용량 기반 (매우 저렴)
- **장점**: 무제한 확장
- **단점**: 설정 복잡

#### GitHub (추천)
- **무료**: Git LFS 1GB
- **장점**: 코드와 함께 관리
- **단점**: 속도 제한

### C. 보안 체크리스트

#### 인증
- ✅ NextAuth.js 사용
- ✅ 환경 변수로 비밀키 관리
- ✅ HTTPS 강제

#### 권한 관리
- ✅ 역할 기반 접근 제어 (RBAC)
- ✅ API Route 보호
- ✅ Rate Limiting

#### 파일 업로드
- ✅ 파일 타입 검증
- ✅ 파일 크기 제한
- ✅ 이미지 최적화
- ✅ 악성 코드 스캔

---

## 최종 추천

### 빠른 시작 (1주일 내)
**Decap CMS** - 2-3시간 설정, 완전 무료

### 최상의 사용자 경험
**Tina CMS** - 4-6시간 설정, 무료 티어 제공

### 가장 익숙한 UI
**Notion API** - 6-8시간 설정, 무료

### 장기적 확장성
**Sanity** 또는 **커스텀 Admin** - 높은 초기 투자, 무한한 가능성

---

## 다음 단계

1. **요구사항 재정리**
   - 사용자 수
   - 예산
   - 기술 역량
   - 타임라인

2. **솔루션 선택**
   - TOP 3 중 선택
   - POC (Proof of Concept) 구축

3. **구현**
   - 단계별 가이드 따라 구현
   - 테스트 및 피드백

4. **배포 및 교육**
   - 사용자 매뉴얼 작성
   - 팀 교육 세션

---

**작성자**: Claude (AI Assistant)
**최종 수정**: 2025-01-01
**버전**: 1.0
