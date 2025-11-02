import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { fetchPages } from "@/lib/notion";
import { notionPagesToBlogPosts } from "@/lib/notion-blog-adapter";

export async function BlogPageSection() {
  // Notion에서 블로그 포스트 가져오기
  const response = await fetchPages();
  const posts = notionPagesToBlogPosts(response.results);

  return (
    <section
      className="bg-background section-padding-y border-b border-dashed border-border"
      aria-labelledby="blog-section-heading"
    >
      <div className="container-padding-x container mx-auto gap-10 md:gap-12">
        <div className="flex flex-col items-center gap-10 md:gap-12">
          {/* Section Title */}
          <div className="section-title-gap-lg mx-auto flex max-w-xl flex-col items-center text-center">
            {/* Tagline */}
            <Tagline>Blog</Tagline>
            {/* Main Heading */}
            <h1 id="blog-section-heading" className="heading-xl">
              Articles and updates
            </h1>
            {/* Description */}
            <p className="text-muted-foreground">
              Learn about the latest trends in web design, branding, social
              media, and marketing.
            </p>
          </div>

          {/* Blog Grid */}
          <div
            className="grid grid-cols-1 md:gap-x-6 md:gap-y-12 gap-y-8 lg:grid-cols-3"
            role="list"
          >
            {posts.map((post) => (
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
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={`${post.title} thumbnail`}
                        fill
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">이미지 없음</span>
                      </div>
                    )}
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
