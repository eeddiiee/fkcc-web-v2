"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

export function FeatureSection2() {
  return (
    <section className="bg-background section-padding-y">
      <div className="container-padding-x container mx-auto flex flex-col items-center gap-12 md:gap-16 lg:flex-row">
        <div className="order-2 w-full flex-1 lg:order-1">
          <AspectRatio ratio={4 / 3}>
            <Image
              src="https://shadcndesign-agency-template.vercel.app/services_feature-section.png"
              alt="Feature section image"
              fill
              className="rounded-xl object-cover"
            />
          </AspectRatio>
        </div>
        <div className="order-1 flex flex-1 flex-col gap-8 lg:order-2">
          <div className="section-title-gap-lg flex flex-col items-start">
            <h2 className="heading-lg text-foreground">
              Everything you need for a truly standout brand
            </h2>
            <p className="text-muted-foreground">
              We combine strategy, design, and technology to create solutions
              that elevate your business.
              <br></br>
              <br></br>
              Every project is tailored to your unique needs—whether it's a
              high-performing website, a strong brand identity, or a marketing
              campaign that drives real results. From concept to execution, we
              ensure that every detail works seamlessly to enhance your brand's
              presence and impact.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact">
              <Button>Contact us</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
