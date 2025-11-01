"use client";

import { Button } from "@/components/ui/button";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export function HeroSection1() {
  return (
    <section
      className="bg-secondary section-padding-y"
      aria-labelledby="hero-heading"
    >
      <div className="container-padding-x container mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left Column */}
        <div className="flex flex-1 flex-col gap-6 lg:gap-8">
          {/* Section Title */}
          <div className="section-title-gap-xl flex flex-col">
            {/* Tagline */}
            <Tagline>우리의 서비스</Tagline>
            {/* Main Heading */}
            <h1 id="hero-heading" className="heading-xl">
              디자인, 브랜딩, 마케팅—제대로 하다
            </h1>
            {/* Description */}
            <p className="text-muted-foreground text-base lg:text-lg">
              인스피로는 전략적 디자인과 마케팅으로 비즈니스를 돋보이게 만듭니다.
              멋진 웹사이트부터 강력한 브랜드 아이덴티티까지, 지속적인 영향을 남기는
              경험을 만들어냅니다.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact">
              <Button>문의하기</Button>
            </Link>
            <Link href="/services">
              <Button variant="ghost">서비스 둘러보기</Button>
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full flex-1">
          <AspectRatio ratio={5 / 4}>
            <Image
              src="https://shadcndesign-agency-template.vercel.app/services_hero-section_image.png"
              alt="Hero section visual"
              fill
              priority
              className="h-full w-full rounded-xl object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
}
