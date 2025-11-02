"use client";

import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { useState, useEffect } from 'react';

/**
 * Notion 블록에서 plain text 추출
 */
function getPlainText(richText: any[]): string {
  if (!Array.isArray(richText)) return '';
  return richText.map((text: any) => text.plain_text || '').join('');
}

/**
 * Notion Rich Text를 React 요소로 변환 (볼드, 이탤릭, 코드 등)
 */
function renderRichText(richText: any[]): React.ReactNode[] {
  if (!Array.isArray(richText)) return [];

  return richText.map((text: any, index: number) => {
    let content: React.ReactNode = text.plain_text || '';

    // 스타일 적용
    if (text.annotations?.bold) {
      content = <strong key={index}>{content}</strong>;
    }
    if (text.annotations?.italic) {
      content = <em key={index}>{content}</em>;
    }
    if (text.annotations?.code) {
      content = <code key={index} className="rounded bg-muted px-1 py-0.5 text-sm">{content}</code>;
    }
    if (text.annotations?.strikethrough) {
      content = <del key={index}>{content}</del>;
    }
    if (text.annotations?.underline) {
      content = <u key={index}>{content}</u>;
    }

    // 링크
    if (text.href) {
      return (
        <a
          key={index}
          href={text.href}
          className="text-primary underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    return <span key={index}>{content}</span>;
  });
}

/**
 * 헤딩에서 ID 생성 (TOC용)
 */
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Table of Contents 아이템 인터페이스
 */
interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * 단일 Notion 블록을 렌더링
 */
function renderBlock(block: BlockObjectResponse, index: number): React.ReactNode {
  const { type } = block;
  const blockData = (block as any)[type];

  switch (type) {
    case 'heading_1': {
      const text = getPlainText(blockData.rich_text);
      const id = generateId(text);
      return (
        <h1
          key={block.id}
          id={id}
          className="scroll-mt-16 border-b pb-2 text-4xl font-bold mt-12 first:mt-0"
        >
          {renderRichText(blockData.rich_text)}
        </h1>
      );
    }

    case 'heading_2': {
      const text = getPlainText(blockData.rich_text);
      const id = generateId(text);
      return (
        <h2
          key={block.id}
          id={id}
          className="scroll-mt-16 border-b pb-2 text-3xl font-semibold mt-10 first:mt-0"
        >
          {renderRichText(blockData.rich_text)}
        </h2>
      );
    }

    case 'heading_3': {
      const text = getPlainText(blockData.rich_text);
      const id = generateId(text);
      return (
        <h3
          key={block.id}
          id={id}
          className="mt-8 scroll-mt-16 text-2xl font-semibold first:mt-0"
        >
          {renderRichText(blockData.rich_text)}
        </h3>
      );
    }

    case 'paragraph': {
      const text = getPlainText(blockData.rich_text);
      if (!text.trim()) return <div key={block.id} className="h-4" />; // 빈 줄

      return (
        <p key={block.id} className="leading-7">
          {renderRichText(blockData.rich_text)}
        </p>
      );
    }

    case 'quote': {
      return (
        <blockquote key={block.id} className="border-l-2 pl-6 italic text-muted-foreground">
          {renderRichText(blockData.rich_text)}
        </blockquote>
      );
    }

    case 'bulleted_list_item': {
      return (
        <li key={block.id} className="leading-7">
          {renderRichText(blockData.rich_text)}
        </li>
      );
    }

    case 'numbered_list_item': {
      return (
        <li key={block.id} className="leading-7">
          {renderRichText(blockData.rich_text)}
        </li>
      );
    }

    case 'code': {
      const language = blockData.language || 'plaintext';
      const code = getPlainText(blockData.rich_text);

      return (
        <pre key={block.id} className="rounded-lg bg-muted p-4 overflow-x-auto">
          <code className={`language-${language} text-sm`}>
            {code}
          </code>
        </pre>
      );
    }

    case 'divider': {
      return <hr key={block.id} className="my-8 border-border" />;
    }

    case 'image': {
      const imageData = blockData.type === 'external'
        ? blockData.external
        : blockData.file;
      const imageUrl = imageData?.url || '';
      const caption = getPlainText(blockData.caption || []);

      return (
        <figure key={block.id} className="my-6">
          <img
            src={imageUrl}
            alt={caption || 'Blog image'}
            className="rounded-lg w-full"
          />
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    default: {
      // 지원하지 않는 블록 타입
      console.warn(`Unsupported block type: ${type}`);
      return null;
    }
  }
}

/**
 * 블록 리스트를 그룹화 (ul, ol 처리)
 */
function groupBlocks(blocks: BlockObjectResponse[]): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: BlockObjectResponse[] } | null = null;

  blocks.forEach((block, index) => {
    const { type } = block;

    if (type === 'bulleted_list_item') {
      if (!currentList || currentList.type !== 'ul') {
        if (currentList) {
          // 이전 리스트 완료
          result.push(
            currentList.type === 'ul' ? (
              <ul key={`list-${index}`} className="ml-6 list-disc space-y-2 my-4">
                {currentList.items.map((item, i) => renderBlock(item, i))}
              </ul>
            ) : (
              <ol key={`list-${index}`} className="ml-6 list-decimal space-y-2 my-4">
                {currentList.items.map((item, i) => renderBlock(item, i))}
              </ol>
            )
          );
        }
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(block);
    } else if (type === 'numbered_list_item') {
      if (!currentList || currentList.type !== 'ol') {
        if (currentList) {
          result.push(
            currentList.type === 'ul' ? (
              <ul key={`list-${index}`} className="ml-6 list-disc space-y-2 my-4">
                {currentList.items.map((item, i) => renderBlock(item, i))}
              </ul>
            ) : (
              <ol key={`list-${index}`} className="ml-6 list-decimal space-y-2 my-4">
                {currentList.items.map((item, i) => renderBlock(item, i))}
              </ol>
            )
          );
        }
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(block);
    } else {
      // 리스트가 아닌 블록
      if (currentList) {
        result.push(
          currentList.type === 'ul' ? (
            <ul key={`list-${index}`} className="ml-6 list-disc space-y-2 my-4">
              {currentList.items.map((item, i) => renderBlock(item, i))}
            </ul>
          ) : (
            <ol key={`list-${index}`} className="ml-6 list-decimal space-y-2 my-4">
              {currentList.items.map((item, i) => renderBlock(item, i))}
            </ol>
          )
        );
        currentList = null;
      }
      result.push(renderBlock(block, index));
    }
  });

  // 마지막 리스트 처리
  if (currentList) {
    result.push(
      currentList.type === 'ul' ? (
        <ul key="list-final" className="ml-6 list-disc space-y-2 my-4">
          {currentList.items.map((item, i) => renderBlock(item, i))}
        </ul>
      ) : (
        <ol key="list-final" className="ml-6 list-decimal space-y-2 my-4">
          {currentList.items.map((item, i) => renderBlock(item, i))}
        </ol>
      )
    );
  }

  return result;
}

/**
 * TOC (Table of Contents) 추출
 */
function extractToc(blocks: BlockObjectResponse[]): TocItem[] {
  const toc: TocItem[] = [];

  blocks.forEach((block) => {
    const { type } = block;
    if (type === 'heading_1' || type === 'heading_2' || type === 'heading_3') {
      const blockData = (block as any)[type];
      const text = getPlainText(blockData.rich_text);
      const level = parseInt(type.replace('heading_', ''));
      const id = generateId(text);

      if (text.trim()) {
        toc.push({ id, text, level });
      }
    }
  });

  return toc;
}

/**
 * Notion 블로그 콘텐츠 렌더러 컴포넌트
 */
interface NotionBlogContentRendererProps {
  blocks: BlockObjectResponse[];
}

export function NotionBlogContentRenderer({ blocks }: NotionBlogContentRendererProps) {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    setToc(extractToc(blocks));
  }, [blocks]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderedContent = groupBlocks(blocks);

  return (
    <div className="flex flex-row gap-12">
      {/* Main Content */}
      <div className="flex max-w-3xl flex-col gap-6">
        {renderedContent}
      </div>

      {/* Table of Contents (Sidebar) */}
      {toc.length > 0 && (
        <aside className="hidden flex-col gap-5 lg:flex sticky top-24 self-start">
          <span className="text-foreground text-sm font-medium">
            On this page
          </span>
          <nav className="flex flex-col gap-3">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, `#${item.id}`)}
                className={`text-muted-foreground hover:text-foreground text-sm ${
                  item.level === 3 ? 'pl-4' : item.level === 2 ? 'pl-2' : ''
                }`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}
