import { HeroSection10 } from "@/components/pro-blocks/landing-page/hero-sections/hero-section-10";
import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { FeatureSection9 } from "@/components/pro-blocks/landing-page/feature-sections/feature-section-9";
import { FeatureSection1 } from "@/components/pro-blocks/landing-page/feature-sections/feature-section-1";
import { TestimonialsSection4 } from "@/components/pro-blocks/landing-page/testimonials-sections/testimonials-section-4";
import { BlogSection1 } from "@/components/pro-blocks/landing-page/blog-sections/blog-section-1";
import { ContactSection6 } from "@/components/pro-blocks/landing-page/contact-sections/contact-section-6";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";

export default function Home() {
  return (
    <>
      <LpNavbar1 />
      <HeroSection10 />
      <FeatureSection9 />
      <FeatureSection1 />
      <TestimonialsSection4 />
      <BlogSection1 />
      <ContactSection6 />
      <Footer1 />
    </>
  );
}
