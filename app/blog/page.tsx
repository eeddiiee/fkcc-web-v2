import { LpNavbar5 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-5";
import { SermonSection } from "@/components/pro-blocks/landing-page/blog-sections/sermon-section";
import { ContactSection6 } from "@/components/pro-blocks/landing-page/contact-sections/contact-section-6";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { fetchPages } from "@/lib/notion";
import { notionPagesToBlogPosts } from "@/lib/notion-blog-adapter";

export default async function BlogPage() {
  const response = await fetchPages();
  const posts = await notionPagesToBlogPosts(response.results);

  return (
    <>
      <LpNavbar5 />
      <SermonSection posts={posts} />
      <ContactSection6 />
      <Footer1 />
    </>
  );
}
