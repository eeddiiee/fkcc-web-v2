import { fetchPages, fetchBySlug, fetchPageBlocks } from "@/lib/notion";
import { notionPageToBlogPost } from "@/lib/notion-blog-adapter";
import { NotionBlogContentRenderer } from "@/lib/notion-blog-content-renderer";
import Image from "next/image";
import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { notFound } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ContactSection6 } from "@/components/pro-blocks/landing-page/contact-sections/contact-section-6";
import { BlogMoreArticles } from "@/components/pro-blocks/landing-page/blog-sections/blog-more-articles";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ISR 설정: 1시간마다 재생성
export const revalidate = 3600;

// 정적 생성을 위한 함수
export async function generateStaticParams() {
  try {
    const response = await fetchPages();

    return response.results
      .filter((page: any) => page.object === 'page' && 'properties' in page)
      .map((page: any) => {
        const slug = page.properties.slug?.rich_text?.[0]?.plain_text || '';
        return { slug };
      })
      .filter((item: any) => item.slug); // 빈 slug 제외
  } catch (error) {
    console.error('[generateStaticParams] 에러:', error);
    return [];
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const resolvedParams = await params;

  // Notion에서 페이지 조회
  const notionPage = await fetchBySlug(resolvedParams.slug);

  if (!notionPage) {
    notFound();
  }

  // Notion 페이지를 BlogPost로 변환
  const post = notionPageToBlogPost(notionPage);

  // 블록 콘텐츠 가져오기
  const blocks = await fetchPageBlocks(notionPage.id);

  return (
    <>
      <LpNavbar1 />
      <section
        className="bg-background py-16 md:py-24"
        aria-labelledby="article-title"
      >
        <div className="container mx-auto px-6">
          <article className="flex flex-col gap-12 md:gap-24" aria-labelledby="article-title">
            {/* Header Section */}
            <div className="items-top flex flex-col gap-8 lg:flex-row lg:gap-12">
              <div className="flex flex-1 flex-col justify-between gap-6">
                <div className="flex flex-col gap-4 md:gap-5">
                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground text-sm leading-5">
                      {post.date}
                    </p>
                    <span className="text-muted-foreground text-sm leading-5">
                      ·
                    </span>
                    <p className="text-muted-foreground text-sm leading-5">
                      {post.category}
                    </p>
                  </div>

                  <h1 id="article-title" className="heading-xl">
                    {post.title}
                  </h1>

                  <p className="text-muted-foreground text-lg leading-7">
                    {post.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={post.author.avatarSrc}
                      alt={post.author.name}
                    />
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-foreground text-sm leading-5 font-medium">
                      {post.author.name}
                    </p>
                    <p className="text-muted-foreground text-sm leading-5">
                      {post.author.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-full flex-1">
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src={post.image}
                    alt={`${post.title} thumbnail`}
                    fill
                    className="h-full w-full rounded-xl object-cover"
                    priority
                  />
                </AspectRatio>
              </div>
            </div>

            {/* Content Section - Notion Blocks */}
            <NotionBlogContentRenderer blocks={blocks} />
          </article>
        </div>
      </section>
      <BlogMoreArticles />
      <ContactSection6 />
      <Footer1 />
    </>
  );
}
