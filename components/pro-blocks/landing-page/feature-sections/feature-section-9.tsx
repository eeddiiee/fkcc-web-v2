"use client";

import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import Image from "next/image";

export function FeatureSection9() {
  return (
    <section className="bg-background section-padding-y border-b border-dashed border-border">
      <div className="container-padding-x container mx-auto flex flex-col gap-10 md:gap-12">
        <div className="section-title-gap-lg mx-auto flex max-w-xl flex-col items-center text-center">
          <Tagline>우리가 하는 일</Tagline>
          <h2 className="heading-lg text-foreground">
            현대적이고 혁신적인 브랜드를 위한 창의적인 솔루션
          </h2>
          <p className="text-muted-foreground text-base">
            우리의 전문성은 창의성과 전략을 연결합니다. 인스피로가 어떻게
            여러분을 돋보이게 하고, 고객과 연결하며, 목표를 달성하도록 돕는지 알아보세요.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="bg-background flex h-20 w-20 shrink-0 items-center justify-center relative">
              <Image
                src="https://shadcndesign-agency-template.vercel.app/home_feature-section_beautifully-functional.png"
                alt="Beautifully functional"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                아름답고 기능적인
              </h3>
              <p className="text-muted-foreground">
                사용자 중심의 직관적인 디자인으로 온라인 존재감을 생생하게 만들어
                고객을 사로잡고 전환시킵니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="bg-background flex h-20 w-20 shrink-0 items-center justify-center relative">
              <Image
                src="https://shadcndesign-agency-template.vercel.app/home_feature-section_your-identity.png"
                alt="Your identity"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">당신의 정체성</h3>
              <p className="text-muted-foreground">
                돋보이고 공감을 얻는 브랜드를 만들어 신뢰와 인지도를 구축합니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="bg-background flex h-20 w-20 shrink-0 items-center justify-center relative">
              <Image
                src="https://shadcndesign-agency-template.vercel.app/home_feature-section_engage-and-connect.png"
                alt="Engage and connect"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                참여와 연결
              </h3>
              <p className="text-muted-foreground">
                맞춤형 소셜 미디어 전략으로 브랜드를 적절한 고객과 연결하여
                참여도를 높입니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="bg-background flex h-20 w-20 shrink-0 items-center justify-center relative">
              <Image
                src="https://shadcndesign-agency-template.vercel.app/home_feature-section_results-driven.png"
                alt="Results-driven"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">결과 중심</h3>
              <p className="text-muted-foreground">
                데이터 기반 전략으로 가시성을 높이고 ROI를 극대화하는
                마케팅 캠페인을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
