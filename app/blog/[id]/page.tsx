"use client";

import { BLOG_POSTS } from "@/lib/blog-data";
import { use } from "react";
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
    id: string;
  }>;
}

export default function BlogPage({ params }: BlogPageProps) {
  const resolvedParams = use(params);
  const postId = parseInt(resolvedParams.id, 10);
  const post = BLOG_POSTS.find((p) => p.id === postId);

  if (!post) {
    notFound();
  }

  return (
    <>
      <LpNavbar1 />
      <section
        className="bg-background section-padding-y"
        aria-labelledby="article-title"
      >
        <div className="mx-auto max-w-3xl px-6">
          <article className="flex flex-col gap-12 md:gap-16">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 md:gap-5">
                <div
                  className="flex items-center gap-2"
                  aria-label="Article metadata"
                >
                  <p className="text-muted-foreground text-sm">{post.date}</p>
                  <span
                    className="text-muted-foreground text-sm"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                  <p className="text-muted-foreground text-sm">
                    {post.category}
                  </p>
                </div>
                <h1 id="article-title" className="heading-xl">
                  {post.title}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {post.description}
                </p>
              </div>
              <div
                className="flex items-center gap-4"
                aria-label="Article author"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={post.author.avatarSrc}
                    alt={post.author.name}
                  />
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {post.author.role}
                  </p>
                </div>
              </div>
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
            <div
              className="flex flex-col gap-6 prose lg:prose-xl max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </section>
      <BlogMoreArticles />
      <ContactSection6 />
      <Footer1 />
    </>
  );
}
