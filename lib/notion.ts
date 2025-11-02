import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  BlockObjectResponse,
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
export const fetchPages = cache(async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Status",
        select: {
          equals: "Live",
        },
      },
      sorts: [
        {
          property: "Date",  // Notion 데이터베이스의 실제 속성 이름
          direction: "descending",
        },
      ],
    });

    console.log('[fetchPages] 성공! 페이지 수:', response.results.length);

    // 디버깅: 첫 번째 페이지의 속성 구조 확인
    if (response.results.length > 0) {
      const firstPage = response.results[0] as any;
      console.log('[fetchPages] 첫 번째 페이지 속성 이름들:', Object.keys(firstPage.properties));
    }

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
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
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