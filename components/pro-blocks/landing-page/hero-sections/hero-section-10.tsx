"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/pro-blocks/logo";

export function HeroSection10() {
  return (
    <section
      className="bg-secondary section-padding-y"
      aria-labelledby="hero-heading"
    >
      <div className="container-padding-x container m-auto flex flex-col items-center gap-12 lg:gap-16">
        {/* Hero Content */}
        <div className="mx-auto flex max-w-2xl flex-1 flex-col items-center gap-6 text-center lg:gap-8">
          {/* Section Title */}
          <div className="section-title-gap-xl flex flex-col items-center text-center">
            {/* Tagline */}
            <Tagline>목적을 가진 디자인</Tagline>
            {/* Main Heading */}
            <h1 id="hero-heading" className="heading-xl">
              멋진 디자인, 진짜 브랜드, 눈에 보이는 결과
            </h1>
            {/* Description */}
            <p className="text-muted-foreground text-base lg:text-lg">
              인스피로에서는 여러분의 아이디어를 놀라운 디지털 경험으로 만들어냅니다.
              세련된 웹 디자인, 눈길을 사로잡는 브랜딩, 맞춤형 마케팅 전략까지,
              효과적인 결과를 만들어냅니다. 여러분의 이야기를 함께 만들어가요!
            </p>
          </div>
          {/* CTA Button */}
          <Link href="/#contact">
            <Button className="md:flex-1" aria-label="문의하기">
              문의하기
              <ArrowRight />
            </Button>
          </Link>
        </div>

        {/* Video Section */}
        <AspectRatio ratio={16 / 9}>
          <Image
            src="https://shadcndesign-agency-template.vercel.app/home_hero-section.png"
            alt="Hero Section"
            fill
            className="h-full w-full object-cover"
          />
        </AspectRatio>
        <div className="flex flex-col items-center gap-6">
          <p className="text-muted-foreground text-center">
            함께하는 파트너사:
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Logo
              className="dark:invert dark:grayscale dark:brightness-0 dark:opacity-70"
              src="https://shadcndesign-agency-template.vercel.app/logo-01.svg"
              width={140}
              height={35}
            />
            <Logo
              className="dark:invert dark:grayscale dark:brightness-0 dark:opacity-70"
              src="https://shadcndesign-agency-template.vercel.app/logo-02.svg"
              width={140}
              height={35}
            />
            <Logo
              className="dark:invert dark:grayscale dark:brightness-0 dark:opacity-70"
              src="https://shadcndesign-agency-template.vercel.app/logo-03.svg"
              width={140}
              height={35}
            />
            <Logo
              className="dark:invert dark:grayscale dark:brightness-0 dark:opacity-70"
              src="https://shadcndesign-agency-template.vercel.app/logo-04.svg"
              width={140}
              height={35}
            />
            <Logo
              className="dark:invert dark:grayscale dark:brightness-0 dark:opacity-70"
              src="https://shadcndesign-agency-template.vercel.app/logo-05.svg"
              width={100}
              height={35}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
