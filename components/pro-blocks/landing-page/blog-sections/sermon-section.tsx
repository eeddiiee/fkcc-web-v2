"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/mdx-handler";

interface SermonSectionProps {
  posts: BlogPost[];
}

export function SermonSection({ posts }: SermonSectionProps) {
  return (
    <section
      className="bg-background section-padding-y"
      aria-labelledby="sermon-section-heading"
    >
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex flex-col items-start gap-10 md:gap-12">
          {/* Section Title */}
          <div className="section-title-gap-lg flex flex-col">
            {/* Main Heading */}
            <h1 id="sermon-section-heading" className="heading-lg">
              주일 설교 말씀
            </h1>
            {/* Description */}
            <p className="text-muted-foreground">
              FKCC 교회의 주일 설교 말씀을 만나보세요.
              하나님의 말씀으로 은혜받고 성장하는 시간이 되시기를 바랍니다.
            </p>
          </div>

          {/* Blog List */}
          <div className="flex w-full flex-col gap-10 md:gap-8" role="list">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/sermon/${post.slug}`}
                className="group flex cursor-pointer flex-col gap-6 p-0 md:flex-row"
                role="listitem"
              >
                {/* Image Container */}
                <div className="w-full md:w-[200px]">
                  <AspectRatio
                    ratio={3 / 2}
                    className="overflow-hidden rounded-xl"
                  >
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={`${post.title} thumbnail`}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">이미지 없음</span>
                      </div>
                    )}
                  </AspectRatio>
                </div>

                {/* Post Content */}
                <div className="flex flex-1 flex-col justify-between p-0">
                  {/* Post Info */}
                  <div className="flex flex-col gap-3">
                    {/* Post Meta */}
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground text-sm">
                        {post.date}
                      </p>
                      <span className="text-muted-foreground text-sm">·</span>
                      <p className="text-muted-foreground text-sm">
                        {post.description}
                      </p>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-foreground text-xl font-semibold group-hover:underline">
                      {post.title}
                    </h3>

                    {/* English Title */}
                    {post.titleEn && (
                      <p className="text-muted-foreground text-sm">
                        {post.titleEn}
                      </p>
                    )}
                  </div>

                  {/* Bible Info */}
                  <div className="mt-6 flex flex-col gap-1 md:mt-0">
                    <p className="text-foreground text-sm font-medium">
                      {post.author.name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {post.author.role}
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
