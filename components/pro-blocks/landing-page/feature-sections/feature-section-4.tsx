"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export function FeatureSection4() {
  return (
    <section className="bg-background section-padding-y border-t border-border border-dashed">
      <div className="container-padding-x container mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col gap-8">
          <div className="section-title-gap-lg flex flex-col">
            <h2 className="heading-lg text-foreground">From idea to impact</h2>
            <p className="text-muted-foreground">
              Every project starts with understanding your needs and ends with a
              solution that delivers results. Here's how we make it happen:
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

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact">
              <Button>Contact us</Button>
            </Link>
          </div>
        </div>

        <div className="w-full flex-1">
          <AspectRatio ratio={5 / 4}>
            <Image
              src="https://shadcndesign-agency-template.vercel.app/services_how-we-work.png"
              alt="Feature section image"
              fill
              className="rounded-xl object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
}
