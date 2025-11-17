import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Worship } from './types/worship';

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

// URL 속성 추출
function extractUrl(property: any): string {
  if (property?.type === 'url' && property.url) {
    return property.url;
  }
  return '';
}

// Formula 속성 추출 (slug용)
function extractFormula(property: any): string {
  if (property?.type === 'formula' && property.formula) {
    if (property.formula.type === 'string') {
      return property.formula.string || '';
    }
  }
  return '';
}

/**
 * Notion PageObjectResponse를 Worship 인터페이스로 변환
 * @param page - Notion 페이지 객체
 * @returns Worship 객체
 */
export function notionPageToWorship(page: PageObjectResponse): Worship {
  const properties = page.properties;

  // 찬양 데이터베이스 속성 매핑
  const slug = extractFormula(properties.slug);
  const title = extractTitle(properties.Name);                          // Name (한글 제목)
  const titleEn = extractRichText(properties['Title(en)']);             // Title(en)
  const choirOrchestra = extractRichText(properties['Choir/Orchestra']); // Choir/Orchestra
  const composer = extractRichText(properties['Composer/Arranger']);     // Composer/Arranger
  const conductor = extractRichText(properties.Conductor);               // Conductor
  const date = extractDate(properties.Date);                             // Date
  const type = extractSelect(properties.Type, '일반찬양');               // Type
  const youtubeLink = extractUrl(properties.YoutubeLink);                // YoutubeLink

  return {
    slug,
    title,
    titleEn,
    choirOrchestra,
    composer,
    conductor,
    date,
    type,
    youtubeLink,
  };
}

/**
 * Notion 페이지 배열을 Worship 배열로 변환
 * @param pages - Notion 페이지 배열
 * @returns Worship 배열
 */
export function notionPagesToWorships(pages: any[]): Worship[] {
  return pages
    .filter((page) => page.object === 'page' && 'properties' in page)
    .map((page) => notionPageToWorship(page as PageObjectResponse));
}
