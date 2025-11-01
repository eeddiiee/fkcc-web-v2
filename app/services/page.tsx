import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { TestimonialsSection4 } from "@/components/pro-blocks/landing-page/testimonials-sections/testimonials-section-4";
import { LogoSection7 } from "@/components/pro-blocks/landing-page/logo-sections/logo-section-7";
import { ContactSection6 } from "@/components/pro-blocks/landing-page/contact-sections/contact-section-6";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { FeatureSection9 } from "@/components/pro-blocks/landing-page/feature-sections/feature-section-9";
import { HeroSection1 } from "@/components/pro-blocks/landing-page/hero-sections/hero-section-1";
import { FeatureSection2 } from "@/components/pro-blocks/landing-page/feature-sections/feature-section-2";
import { FeatureSection4 } from "@/components/pro-blocks/landing-page/feature-sections/feature-section-4";

export default function ServicesPage() {
  return (
    <>
      <LpNavbar1 />
      <HeroSection1 />
      <FeatureSection9 />
      <FeatureSection2 />
      <FeatureSection4 />
      <TestimonialsSection4 />
      <LogoSection7 />
      <ContactSection6 />
      <Footer1 />
    </>
  );
}
