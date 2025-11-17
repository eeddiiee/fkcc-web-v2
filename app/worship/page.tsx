import { fetchWorshipPages } from "@/lib/notion";
import { notionPagesToWorships } from "@/lib/notion-worship-adapter";
import { Metadata } from "next";
import { LpNavbar5 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-5";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { ContactSection6 } from "@/components/pro-blocks/landing-page/contact-sections/contact-section-6";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import Link from "next/link";

export const metadata: Metadata = {
  title: "찬양 목록 | FKCC",
  description: "FKCC 교회의 찬양 목록입니다.",
};

export default async function WorshipPage() {
  const response = await fetchWorshipPages();
  const worships = notionPagesToWorships(response.results);

  return (
    <>
      <LpNavbar5 />
      <section
        className="bg-background section-padding-y"
        aria-labelledby="worship-section-heading"
      >
        <div className="container-padding-x container mx-auto">
          <div className="flex flex-col items-start gap-10 md:gap-12">
            {/* Section Title */}
            <div className="section-title-gap-lg flex max-w-xl flex-col">
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

            {/* Worship Grid */}
            <div
              className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-10"
              role="list"
            >
              {worships.map((worship, index) => {
                const formattedDate = new Date(worship.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <Link
                    key={worship.slug}
                    href={`/worship/${worship.slug}`}
                  >
                    <Card
                      className="group flex cursor-pointer flex-col justify-between gap-4 rounded-none border-none bg-transparent p-0 shadow-none h-full"
                      role="listitem"
                    >
                      {/* Worship Content */}
                      <CardContent className="flex flex-col gap-3 p-0">
                        {/* Worship Meta */}
                        <div className="flex items-center gap-2 text-left">
                          <span className="text-muted-foreground text-sm">
                            {formattedDate}
                          </span>
                          <span className="text-muted-foreground text-sm">·</span>
                          <span className="text-muted-foreground text-sm">
                            {worship.type}
                          </span>
                        </div>

                        {/* Worship Title */}
                        <h3 className="text-foreground text-xl font-semibold hover:underline">
                          {worship.title}
                        </h3>

                        {/* Worship Summary */}
                        {worship.titleEn && (
                          <p className="text-muted-foreground text-sm leading-normal">
                            {worship.titleEn}
                          </p>
                        )}
                        {!worship.titleEn && worship.composer && (
                          <p className="text-muted-foreground text-sm leading-normal">
                            {worship.composer}
                          </p>
                        )}
                      </CardContent>

                      {/* Performer Info */}
                      {worship.choirOrchestra && (
                        <CardFooter className="flex items-center gap-2 p-0">
                          {/* Performer Details */}
                          <div className="flex flex-1 flex-col items-start gap-0">
                            <p className="text-foreground text-sm font-medium">
                              {worship.choirOrchestra}
                              {worship.conductor && `, Conductor ${worship.conductor}`}
                            </p>
                          </div>
                        </CardFooter>
                      )}
                    </Card>
                    {index < worships.length - 1 && (
                      <Separator className="lg:hidden mt-6" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <ContactSection6 />
      <Footer1 />
    </>
  );
}
