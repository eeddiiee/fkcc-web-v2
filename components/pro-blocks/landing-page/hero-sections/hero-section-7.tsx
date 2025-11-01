"use client";

import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export function HeroSection7() {
  return (
    <section
      className="bg-secondary section-padding-y"
      aria-labelledby="hero-heading"
    >
      <div className="container-padding-x container mx-auto flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex gap-12 lg:gap-16 w-full">
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-12 w-full">
            <h1 id="hero-heading" className="heading-xl flex-1">
              목적을 가진 창의성을 만들다
            </h1>
            <div className="flex w-full flex-1 flex-col gap-8">
              <p className="text-muted-foreground text-base lg:text-lg">
                인스피로는 훌륭한 디자인이 행동을 이끈다고 믿습니다. 우리의 미션은
                아이디어를 영향력 있고 결과 중심의 솔루션으로 변환하여
                브랜드가 디지털 시대에 번창하도록 돕는 것입니다.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/#contact">
                  <Button>문의하기</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <AspectRatio ratio={16 / 10}>
          <Image
            src="https://shadcndesign-agency-template.vercel.app/about_hero-section_image.png"
            alt="Hero section visual"
            fill
            priority
            className="h-full w-full rounded-xl object-cover"
          />
        </AspectRatio>
      </div>
    </section>
  );
}
