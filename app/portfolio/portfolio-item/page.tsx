"use client";

import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { ContactSection6 } from "@/components/pro-blocks/landing-page/contact-sections/contact-section-6";
import { Check } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { PortfolioMore } from "@/components/pro-blocks/landing-page/blog-sections/portfolio-more";

export default function PortfolioItemPage() {
  return (
    <>
      <LpNavbar1 />
      <section
        className="bg-background section-padding-y"
        aria-labelledby="hero-heading"
      >
        <div className="container-padding-x container mx-auto flex flex-col items-center gap-12 lg:gap-16">
          <div className="flex gap-12 lg:gap-16 w-full">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-12 w-full">
              <h1 id="hero-heading" className="heading-xl flex-1">
                Elegant Escape
              </h1>
              <div className="flex w-full flex-1 flex-col gap-8">
                <p className="text-muted-foreground text-base lg:text-lg">
                  A luxurious website designed to captivate guests and offer an
                  easy booking experience. The elegant design reflects the
                  tranquil ambiance of the hotel, with a focus on showcasing spa
                  services.
                </p>
              </div>
            </div>
          </div>
          <AspectRatio ratio={16 / 10}>
            <Image
              src="https://shadcndesign-agency-template.vercel.app/portfolio_placeholder-image.png"
              alt="Hero section visual"
              fill
              priority
              className="h-full w-full rounded-xl object-cover"
            />
          </AspectRatio>
        </div>
      </section>
      <section className="bg-background section-padding-y border-t border-border border-dashed">
        <div className="container-padding-x container mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col gap-8">
            <div className="section-title-gap-lg flex flex-col">
              <Tagline>About the project</Tagline>
              <h2 className="heading-lg text-foreground">
                Seamless Booking & Exclusive Experiences
              </h2>
              <p className="text-muted-foreground">
                The website seamlessly integrates a simple, intuitive booking
                system, ensuring a smooth process from start to finish. Paired
                with visually stunning images of the spa and special offers, it
                creates an irresistible invitation for guests to unwind and
                rejuvenate.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="pt-0.5">
                  <Check className="text-primary h-5 w-5" />
                </div>
                <p className="text-muted-foreground text-base leading-6">
                  <span className="font-medium text-foreground">
                    Discovery & Strategy
                  </span>{" "}
                  – We dive into your brand, audience, and goals to create a
                  tailored plan.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="pt-0.5">
                  <Check className="text-primary h-5 w-5" />
                </div>
                <p className="text-muted-foreground text-base leading-6">
                  <span className="font-medium text-foreground">
                    Design & Development
                  </span>{" "}
                  – Whether it's a website, branding, or marketing campaign, we
                  craft every detail with precision.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="pt-0.5">
                  <Check className="text-primary h-5 w-5" />
                </div>
                <p className="text-muted-foreground text-base leading-6">
                  <span className="font-medium text-foreground">
                    Testing & Optimization
                  </span>{" "}
                  – Before launch, we fine-tune everything for performance and
                  usability.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex-1">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="https://shadcndesign-agency-template.vercel.app/portfolio_placeholder-image.png"
                alt="Feature section image"
                fill
                className="rounded-xl object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </section>
      <section className="bg-background section-padding-y border-y border-border border-dashed">
        <div className="container-padding-x container mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Image
              src="https://shadcndesign-agency-template.vercel.app/portfolio_placeholder-image.png"
              alt="Feature section image"
              width={1200}
              height={1200}
              className="rounded-xl object-cover"
            />
            <Image
              src="https://shadcndesign-agency-template.vercel.app/portfolio_placeholder-image.png"
              alt="Feature section image"
              width={1200}
              height={1200}
              className="rounded-xl object-cover"
            />
            <Image
              src="https://shadcndesign-agency-template.vercel.app/portfolio_placeholder-image.png"
              alt="Feature section image"
              width={1200}
              height={1200}
              className="rounded-xl object-cover"
            />
          </div>
        </div>
      </section>
      <PortfolioMore />
      <ContactSection6 />
      <Footer1 />
    </>
  );
}
