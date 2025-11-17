import { fetchWorshipPages, fetchWorshipBySlug, fetchAllPageBlocks } from "@/lib/notion";
import { notionPageToWorship, notionPagesToWorships } from "@/lib/notion-worship-adapter";
import { NotionBlogContentRenderer } from "@/lib/notion-blog-content-renderer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LpNavbar5 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-5";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";

interface WorshipPageProps {
  params: Promise<{ slug: string }>;
}

// ISR 설정: 1시간마다 재생성
export const revalidate = 3600;

// ISR을 위한 정적 params 생성
export async function generateStaticParams() {
  try {
    const response = await fetchWorshipPages();
    const worships = notionPagesToWorships(response.results);

    return worships.map((worship) => ({
      slug: worship.slug,
    }));
  } catch (error) {
    console.error('[generateStaticParams] 찬양 페이지 생성 실패:', error);
    return [];
  }
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: WorshipPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const notionPage = await fetchWorshipBySlug(resolvedParams.slug);

  if (!notionPage) {
    return {
      title: "찬양을 찾을 수 없습니다 | FKCC",
    };
  }

  const worship = notionPageToWorship(notionPage);

  return {
    title: `${worship.title} | FKCC 찬양`,
    description: worship.titleEn || worship.title,
  };
}

// 유튜브 ID 추출 함수
function getYoutubeVideoId(url: string): string | null {
  if (!url) return null;

  // https://www.youtube.com/watch?v=VIDEO_ID
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

export default async function WorshipDetailPage({ params }: WorshipPageProps) {
  const resolvedParams = await params;
  const notionPage = await fetchWorshipBySlug(resolvedParams.slug);

  if (!notionPage) {
    notFound();
  }

  const worship = notionPageToWorship(notionPage);
  const youtubeId = getYoutubeVideoId(worship.youtubeLink);

  // 날짜 포맷팅
  const formattedDate = new Date(worship.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 노션 페이지의 블록 콘텐츠 가져오기 (가사용)
  const blocks = await fetchAllPageBlocks(notionPage.id);

  return (
    <>
      <LpNavbar5 />
      <section
        className="bg-background py-16 md:py-24"
        aria-labelledby="worship-title"
      >
        {/* Content Container - Centered with max width */}
        <div className="mx-auto max-w-3xl px-6">
          {/* Article Container with Vertical Layout */}
          <article className="flex flex-col gap-12 md:gap-16">
            {/* Back Button */}
            <div>
              <Button variant="outline" asChild>
                <Link href="/worship">
                  <ArrowLeft className="size-4" />
                  찬양 목록으로
                </Link>
              </Button>
            </div>

            {/* Article Header Section */}
            <div className="flex flex-col gap-8">
              {/* Title and Meta Information Block */}
              <div className="flex flex-col gap-4 md:gap-5">
                {/* Article Meta Information - Date and Type */}
                <div
                  className="flex items-center gap-2"
                  aria-label="찬양 메타데이터"
                >
                  <p className="text-muted-foreground text-sm">{formattedDate}</p>
                  <span
                    className="text-muted-foreground text-sm"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                  <p className="text-muted-foreground text-sm">{worship.type}</p>
                </div>

                {/* Article Main Title */}
                <h1 id="worship-title" className="heading-xl">
                  {worship.title}
                </h1>

                {/* Article Description/Summary */}
                {worship.titleEn && (
                  <p className="text-muted-foreground text-lg leading-7">
                    {worship.titleEn}
                  </p>
                )}
              </div>

              {/* YouTube Video Container */}
              {youtubeId && (
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    className="h-full w-full rounded-xl"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={worship.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </AspectRatio>
              )}
            </div>

            {/* Article Content Section */}
            <div className="flex flex-col gap-10">
              {/* 찬양 정보 섹션 */}
              <h3
                className="border-b pb-2 text-2xl font-semibold"
                id="worship-info"
              >
                찬양 정보
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {worship.choirOrchestra && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground mb-2">
                      연주자/단체
                    </dt>
                    <dd className="text-base leading-7">{worship.choirOrchestra}</dd>
                  </div>
                )}

                {worship.composer && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground mb-2">
                      작곡/편곡자
                    </dt>
                    <dd className="text-base leading-7">{worship.composer}</dd>
                  </div>
                )}

                {worship.conductor && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground mb-2">
                      지휘자
                    </dt>
                    <dd className="text-base leading-7">{worship.conductor}</dd>
                  </div>
                )}
              </div>

              {/* 가사 섹션 */}
              {blocks.length > 0 && (
                <>
                  <h3
                    className="border-b pb-2 text-2xl font-semibold"
                    id="lyrics"
                  >
                    가사
                  </h3>
                  <div className="flex flex-col gap-6">
                    <NotionBlogContentRenderer blocks={blocks} />
                  </div>
                </>
              )}
            </div>

            {/* Navigation */}
            <div className="pt-8 border-t border-border">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/worship">
                  전체 찬양 목록 보기
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
