import { fetchWorshipPages } from "@/lib/notion";
import { notionPagesToWorships } from "@/lib/notion-worship-adapter";
import { Metadata } from "next";
import { LpNavbar5 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-5";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { WorshipSection } from "@/components/pro-blocks/landing-page/worship-sections/worship-section";
import { ContactSection6 } from "@/components/pro-blocks/landing-page/contact-sections/contact-section-6";

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
      <WorshipSection worships={worships} />
      <ContactSection6 />
      <Footer1 />
    </>
  );
}
