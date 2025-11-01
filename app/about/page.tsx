import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { TeamSection2 } from "@/components/pro-blocks/landing-page/team-sections/team-section-2";
import { TestimonialsSection4 } from "@/components/pro-blocks/landing-page/testimonials-sections/testimonials-section-4";
import { LogoSection7 } from "@/components/pro-blocks/landing-page/logo-sections/logo-section-7";
import { ContactSection6 } from "@/components/pro-blocks/landing-page/contact-sections/contact-section-6";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { HeroSection7 } from "@/components/pro-blocks/landing-page/hero-sections/hero-section-7";

export default function AboutPage() {
  return (
    <>
      <LpNavbar1 />
      <HeroSection7 />
      <TeamSection2 />
      <TestimonialsSection4 />
      <LogoSection7 />
      <ContactSection6 />
      <Footer1 />
    </>
  );
}
