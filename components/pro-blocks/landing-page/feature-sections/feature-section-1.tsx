"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import Link from "next/link";

export function FeatureSection1() {
  return (
    <section className="bg-background section-padding-y">
      <div className="container-padding-x container mx-auto flex flex-col items-center gap-12 md:gap-16 lg:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          <div className="section-title-gap-lg flex flex-col items-start">
            <Tagline>우리는 누구인가</Tagline>
            <h2 className="heading-lg text-foreground">
              창의성과 진정한 목적의 만남
            </h2>
            <p className="text-muted-foreground">
              인스피로는 디자인이 영감을 주고, 브랜드가 연결되며, 마케팅이 결과를 제공해야 한다는
              믿음으로 설립되었습니다. 재능 있는 크리에이티브, 전략가, 그리고 몽상가들로 구성된
              팀과 함께 아이디어를 현실로 만듭니다. 모든 프로젝트는 하나의 여정이며,
              우리는 매 순간 여러분과 함께합니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact">
              <Button>
                문의하기
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full flex-1">
          <AspectRatio ratio={4 / 3}>
            <Image
              src="https://shadcndesign-agency-template.vercel.app/home_feature-section_image.png"
              alt="Creativity meets real purpose"
              fill
              className="rounded-xl object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
}
