import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const postsDirectory = path.join(process.cwd(), "posts");

export interface Author {
  name: string;
  role: string;
  avatarSrc: string;
}

export interface BlogPost {
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

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

/**
 * posts 디렉토리에서 모든 .md 파일 이름을 가져옵니다
 */
export function getMarkdownFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const files = fs.readdirSync(postsDirectory);
  return files.filter((file) => file.endsWith(".md"));
}

/**
 * 단일 Markdown 파일을 파싱하여 BlogPost 객체를 반환합니다
 */
export function parseMdFile(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  // Markdown을 HTML로 변환
  const htmlContent = md.render(content);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    category: data.category || "아티클",
    image: data.image || "",
    author: {
      name: data.author || "",
      role: data.authorRole || "",
      avatarSrc: data.authorAvatar || "",
    },
    content: htmlContent,
    tags: data.tags || [],
  };
}

/**
 * 모든 블로그 포스트를 가져옵니다 (날짜순 정렬)
 */
export function getAllPosts(): BlogPost[] {
  const filenames = getMarkdownFiles();
  const posts = filenames.map((filename) => parseMdFile(filename));

  // 날짜순 정렬 (최신순)
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * slug로 특정 포스트를 조회합니다
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filename = `${slug}.md`;
  const fullPath = path.join(postsDirectory, filename);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return parseMdFile(filename);
}

/**
 * 모든 포스트의 slug를 반환합니다 (정적 생성용)
 */
export function getAllPostSlugs(): string[] {
  const filenames = getMarkdownFiles();
  return filenames.map((filename) => filename.replace(/\.md$/, ""));
}
