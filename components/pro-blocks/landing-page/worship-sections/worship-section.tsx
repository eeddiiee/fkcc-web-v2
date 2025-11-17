"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import Link from "next/link";
import { Worship } from "@/lib/types/worship";

interface WorshipSectionProps {
  worships: Worship[];
}

export function WorshipSection({ worships }: WorshipSectionProps) {
  return (
    <section
      className="bg-background section-padding-y"
      aria-labelledby="worship-section-heading"
    >
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex flex-col items-start gap-10 md:gap-12">
          {/* Section Title */}
          <div className="section-title-gap-lg flex flex-col">
            {/* Tagline */}
            <Tagline>찬양</Tagline>
            {/* Main Heading */}
            <h1 id="worship-section-heading" className="heading-lg">
              찬양 목록
            </h1>
            {/* Description */}
            <p className="text-muted-foreground">
              FKCC 교회의 아름다운 찬양을 만나보세요.
              성가대와 오케스트라의 은혜로운 찬양으로 하나님께 영광 돌립니다.
            </p>
          </div>

          {/* Worship List */}
          <div className="flex w-full flex-col gap-10 md:gap-8" role="list">
            {worships.map((worship) => (
              <Link
                key={worship.slug}
                href={`/worship/${worship.slug}`}
                className="group flex cursor-pointer flex-col gap-6 p-0 md:flex-row"
                role="listitem"
              >
                {/* YouTube Thumbnail or Placeholder */}
                <div className="w-full md:w-[200px]">
                  <AspectRatio
                    ratio={1 / 1}
                    className="overflow-hidden rounded-xl bg-muted flex items-center justify-center"
                  >
                    <svg className="w-12 h-12 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </AspectRatio>
                </div>

                {/* Worship Content */}
                <div className="flex flex-1 flex-col justify-between p-0">
                  {/* Worship Info */}
                  <div className="flex flex-col gap-3">
                    {/* Worship Meta */}
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground text-sm">
                        {new Date(worship.date).toLocaleDateString('ko-KR')}
                      </p>
                      <span className="text-muted-foreground text-sm">·</span>
                      <p className="text-muted-foreground text-sm">
                        {worship.type}
                      </p>
                    </div>

                    {/* Worship Title */}
                    <h3 className="text-foreground text-base font-semibold group-hover:underline">
                      {worship.title}
                    </h3>
                    {worship.titleEn && (
                      <p className="text-muted-foreground text-sm">
                        {worship.titleEn}
                      </p>
                    )}

                    {/* Composer */}
                    {worship.composer && (
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {worship.composer}
                      </p>
                    )}
                  </div>

                  {/* Performer Info */}
                  <div className="mt-6 flex flex-col gap-2 md:mt-0">
                    {worship.choirOrchestra && (
                      <div className="flex flex-col">
                        <p className="text-foreground text-sm font-medium">
                          {worship.choirOrchestra}
                        </p>
                        {worship.conductor && (
                          <p className="text-muted-foreground text-sm">
                            지휘: {worship.conductor}
                          </p>
                        )}
                      </div>
                    )}
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
