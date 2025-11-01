"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";

const testimonials = [
  {
    quote:
      "인스피로가 우리 브랜드를 완전히 변화시켰습니다. 신선한 아이디어와 세심한 디테일이 게임 체인저였어요!",
    author: "아이바 라이언",
    role: "마케팅 매니저 @ 트렌디파이",
    avatar:
      "https://shadcndesign-agency-template.vercel.app/home_testimonial-section_iva_ryan.png",
  },
  {
    quote:
      "그들이 만든 웹사이트는 멋질 뿐만 아니라 성능도 뛰어납니다. 적극 추천합니다!",
    author: "제리 헬퍼",
    role: "CEO @ 테크비전",
    avatar:
      "https://shadcndesign-agency-template.vercel.app/home_testimonial-section_jerry-helfer.png",
  },
  {
    quote:
      "인스피로 덕분에 우리의 소셜 미디어 전략이 마침내 고객의 공감을 얻었고, 참여도가 급증했습니다!",
    author: "메리 프로인트",
    role: "소셜 미디어 리드 @ 그린그로스",
    avatar:
      "https://shadcndesign-agency-template.vercel.app/home_testimonial-section_marry-freund.png",
  },
];

export function TestimonialsSection4() {
  return (
    <section
      className="bg-muted/50 section-padding-y border-t border-border border-dashed"
      aria-labelledby="testimonial-title"
    >
      {/* Main Content Container */}
      <div className="container-padding-x container mx-auto">
        {/* Content Wrapper */}
        <div className="flex flex-col items-center gap-10 md:gap-12">
          {/* Section Header */}
          <div className="section-title-gap-lg flex max-w-xl flex-col items-center text-center">
            {/* Category Tag */}
            <Tagline>행복한 고객들</Tagline>
            {/* Main Title */}
            <h2 id="testimonial-title" className="heading-lg text-foreground">
              고객들이 말하는 인스피로
            </h2>
            {/* Section Description */}
            <p className="text-muted-foreground text-base">
              우리는 고객의 성공에 함께할 수 있어 자랑스럽습니다.
              고객들이 우리와 함께한 경험을 들어보세요:
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="flex flex-col justify-between gap-6 p-6 shadow-sm md:p-8 text-center"
              >
                {/* Testimonial Quote */}
                <p className="text-foreground text-base">
                  &quot;{testimonial.quote}&quot;
                </p>

                {/* Author Information */}
                <div className="flex flex-col items-center gap-4 ">
                  {/* Author Avatar */}
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.author}
                    />
                  </Avatar>
                  {/* Author Details */}
                  <div className="flex flex-col">
                    <p className="text-foreground text-base font-medium">
                      {testimonial.author}
                    </p>
                    <p className="text-muted-foreground text-base">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
