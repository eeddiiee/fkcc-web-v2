# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 16 기반의 웹 애플리케이션으로, App Router 구조를 사용합니다. shadcn/ui 컴포넌트 라이브러리와 Tailwind CSS 4를 활용하여 구축되었습니다.

## 주요 기술 스택

- **프레임워크**: Next.js 16.0.1 (App Router)
- **UI 라이브러리**: React 19.2.0
- **스타일링**: Tailwind CSS 4 (@tailwindcss/postcss)
- **컴포넌트**: shadcn/ui (New York 스타일)
- **아이콘**: lucide-react
- **패키지 매니저**: pnpm
- **타입스크립트**: TypeScript 5

## 개발 명령어

### 필수 명령어
- `pnpm dev` - 개발 서버 실행 (http://localhost:3000)
- `pnpm build` - 프로덕션 빌드
- `pnpm start` - 프로덕션 서버 실행
- `pnpm lint` - ESLint 실행

## 프로젝트 구조

```
app/                    # Next.js App Router 디렉토리
  ├── layout.tsx       # 루트 레이아웃 (Geist Sans, Geist Mono 폰트 설정)
  ├── page.tsx         # 홈 페이지
  └── globals.css      # 전역 CSS 스타일
lib/
  └── utils.ts         # cn() 유틸리티 함수 (clsx + tailwind-merge)
```

## 아키텍처 및 패턴

### 경로 별칭 (Path Aliases)
tsconfig.json에 `@/*` 별칭이 설정되어 있어 루트에서 절대 경로 import 가능:
```typescript
import { cn } from "@/lib/utils"
```

### shadcn/ui 설정
- 스타일: `new-york`
- 베이스 컬러: `neutral`
- CSS 변수 사용
- 컴포넌트 경로: `@/components`
- UI 컴포넌트: `@/components/ui`
- 훅: `@/hooks`

### 폰트 구성
- Geist Sans: 본문용 가변 폰트 (`--font-geist-sans`)
- Geist Mono: 코드용 모노스페이스 폰트 (`--font-geist-mono`)

### 스타일링 유틸리티
`lib/utils.ts`의 `cn()` 함수를 사용하여 조건부 및 충돌하는 Tailwind 클래스를 병합합니다.

## TypeScript 설정
- Target: ES2017
- Strict mode 활성화
- JSX: react-jsx
- Module resolution: bundler

## ESLint 설정
- Next.js Core Web Vitals 룰 적용
- TypeScript 지원
- 무시 디렉토리: `.next/`, `out/`, `build/`
