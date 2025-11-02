import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { fetchPages } from "@/lib/notion";
import { notionPagesToBlogPosts } from "@/lib/notion-blog-adapter";

export async function BlogSection1() {
  // Notion에서 블로그 포스트 가져오기
  const response = await fetchPages();
  const posts = notionPagesToBlogPosts(response.results);

  // 디버깅: 포스트 데이터 확인
  console.log('[BlogSection1] 포스트 데이터:', JSON.stringify(posts, null, 2));

  return (
    <section
      className="bg-background section-padding-y border-y border-dashed border-border"
      aria-labelledby="blog-section-heading"
    >
      <div className="container-padding-x container mx-auto gap-10 md:gap-12">
        <div className="flex flex-col items-center gap-10 md:gap-12">
          {/* Section Title */}
          <div className="section-title-gap-lg mx-auto flex max-w-xl flex-col items-center text-center">
            {/* Tagline */}
            <Tagline>아이디어와 인사이트</Tagline>
            {/* Main Heading */}
            <h2 id="blog-section-heading" className="heading-lg">
              블로그 둘러보기
            </h2>
            {/* Description */}
            <p className="text-muted-foreground">
              디자인, 브랜딩, 마케팅의 최신 트렌드를 확인하세요.
              업계 전문가로부터 배우고 전략을 한 단계 높여보세요.
            </p>
          </div>

          {/* Blog Grid */}
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-4"
            role="list"
          >
            {posts.slice(0, 4).map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="group block"
              >
                {/* Blog Card */}
                <div className="flex flex-col gap-4 rounded-xl transition-all duration-200">
                  {/* Image Wrapper */}
                  <AspectRatio
                    ratio={4 / 3}
                    className="overflow-hidden rounded-xl"
                  >
                    <Image
                      src={post.image}
                      alt={`${post.title} thumbnail`}
                      fill
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </AspectRatio>

                  {/* Post Content */}
                  <div className="flex flex-col gap-3">
                    {/* Post Meta */}
                    <div className="flex items-center gap-2 text-left">
                      <span className="text-muted-foreground text-sm">
                        {post.date}
                      </span>
                      <span className="text-muted-foreground text-sm">·</span>
                      <span className="text-muted-foreground text-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-base leading-normal font-semibold group-hover:underline">
                      {post.title}
                    </h3>

                    {/* Post Summary */}
                    <p className="text-muted-foreground text-sm leading-normal">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
