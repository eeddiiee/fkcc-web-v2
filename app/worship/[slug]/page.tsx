import { fetchWorshipPages, fetchWorshipBySlug } from "@/lib/notion";
import { notionPageToWorship, notionPagesToWorships } from "@/lib/notion-worship-adapter";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { LpNavbar5 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-5";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";

interface WorshipPageProps {
  params: Promise<{ slug: string }>;
}

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

  return (
    <>
      <LpNavbar5 />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back Button */}
      <Link
        href="/worship"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        목록으로 돌아가기
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {worship.type}
          </span>
          <time className="text-sm text-muted-foreground">
            {new Date(worship.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        <h1 className="text-4xl font-bold mb-2">{worship.title}</h1>
        {worship.titleEn && (
          <p className="text-xl text-muted-foreground">{worship.titleEn}</p>
        )}
      </header>

      {/* YouTube Video */}
      {youtubeId && (
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={worship.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Details */}
      <div className="bg-muted/30 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-4">찬양 정보</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {worship.choirOrchestra && (
            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                연주자/단체
              </dt>
              <dd className="text-base">{worship.choirOrchestra}</dd>
            </div>
          )}

          {worship.composer && (
            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                작곡/편곡자
              </dt>
              <dd className="text-base">{worship.composer}</dd>
            </div>
          )}

          {worship.conductor && (
            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                지휘자
              </dt>
              <dd className="text-base">{worship.conductor}</dd>
            </div>
          )}

          <div>
            <dt className="text-sm font-medium text-muted-foreground mb-1">
              날짜
            </dt>
            <dd className="text-base">
              {new Date(worship.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </dd>
          </div>
        </div>

        {/* YouTube Link */}
        {worship.youtubeLink && (
          <div className="pt-4 border-t border-border">
            <a
              href={worship.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              유튜브에서 보기
            </a>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-border">
        <Link
          href="/worship"
          className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
        >
          전체 찬양 목록 보기
        </Link>
      </div>
    </main>
    <Footer1 />
    </>
  );
}
