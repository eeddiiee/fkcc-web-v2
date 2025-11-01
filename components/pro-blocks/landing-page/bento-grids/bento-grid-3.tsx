"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";

export function BentoGrid3() {
  return (
    <section className="bg-muted/50 section-padding-y border-b border-dashed border-border">
      <div className="container-padding-x container mx-auto flex flex-col gap-10 md:gap-12">
        {/* Section Title */}
        <div className="section-title-gap-xl mx-auto flex max-w-xl flex-col items-center text-center">
          {/* Tagline */}
          <Tagline>Portfolio</Tagline>
          {/* Main Heading */}
          <h1 className="heading-xl">See what we've created</h1>
          {/* Description */}
          <p className="text-muted-foreground min-h-12">
            Inspiro has helped brands across industries elevate their presence
            with creative and strategic design. Take a look at some of our
            standout projects.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
          {/* Wide Feature Card - Top Left */}
          <Link href="/portfolio/portfolio-item" className="lg:col-span-3">
            <Card className="overflow-hidden rounded-xl p-0 ">
              <Image
                src="https://shadcndesign-agency-template.vercel.app/portfolio_placeholder-image.png"
                alt="Placeholder"
                width={1000}
                height={1000}
                className="aspect-[16/8] min-h-[280px] w-full object-cover"
              />
              <CardContent className="flex flex-col gap-2 pb-6">
                <h3 className="text-foreground text-lg font-semibold">
                  Elegant Escape
                </h3>
                <p className="text-muted-foreground min-h-12">
                  A luxurious website designed to captivate guests and offer an
                  easy booking experience.
                </p>
              </CardContent>
            </Card>
          </Link>
          {/* Wide Feature Card - Top Right */}
          <Link href="/portfolio/portfolio-item" className="lg:col-span-3">
            <Card className="overflow-hidden rounded-xl p-0 ">
              <Image
                src="https://shadcndesign-agency-template.vercel.app/portfolio_placeholder-image.png"
                alt="Placeholder"
                width={1000}
                height={1000}
                className="aspect-[16/8] min-h-[280px] w-full object-cover"
              />
              <CardContent className="flex flex-col gap-2 pb-6">
                <h3 className="text-foreground text-lg font-semibold">
                  Project name
                </h3>
                <p className="text-muted-foreground min-h-12">
                  Shortly describe what this project is about and what you did
                  for the client. Make sure to highlight the benefits and
                  results achieved.
                </p>
              </CardContent>
            </Card>
          </Link>
          {/* Regular Feature Card - Bottom Left */}
          <Link href="/portfolio/portfolio-item" className="lg:col-span-2">
            <Card className="overflow-hidden rounded-xl p-0 ">
              <Image
                src="https://shadcndesign-agency-template.vercel.app/portfolio_placeholder-image.png"
                alt="Placeholder"
                width={1000}
                height={1000}
                className="aspect-[16/8] min-h-[280px] w-full object-cover"
              />
              <CardContent className="flex flex-col gap-2 pb-6">
                <h3 className="text-foreground text-lg font-semibold">
                  Project name
                </h3>
                <p className="text-muted-foreground min-h-12">
                  Shortly describe what this project is about and what you did
                  for the client. Make sure to highlight the benefits and
                  results achieved.
                </p>
              </CardContent>
            </Card>
          </Link>
          {/* Regular Feature Card - Bottom Center */}
          <Link href="/portfolio/portfolio-item" className="lg:col-span-2">
            <Card className="overflow-hidden rounded-xl p-0 ">
              <Image
                src="https://shadcndesign-agency-template.vercel.app/portfolio_placeholder-image.png"
                alt="Placeholder"
                width={1000}
                height={1000}
                className="aspect-[16/8] min-h-[280px] w-full object-cover"
              />
              <CardContent className="flex flex-col gap-2 pb-6">
                <h3 className="text-foreground text-lg font-semibold">
                  Project name
                </h3>
                <p className="text-muted-foreground min-h-12">
                  Shortly describe what this project is about and what you did
                  for the client. Make sure to highlight the benefits and
                  results achieved.
                </p>
              </CardContent>
            </Card>
          </Link>
          {/* Regular Feature Card - Bottom Right */}
          <Link href="/portfolio/portfolio-item" className="lg:col-span-2">
            <Card className="overflow-hidden rounded-xl p-0 ">
              <Image
                src="https://shadcndesign-agency-template.vercel.app/portfolio_placeholder-image.png"
                alt="Placeholder"
                width={1000}
                height={1000}
                className="aspect-[16/8] min-h-[280px] w-full object-cover"
              />
              <CardContent className="flex flex-col gap-2 pb-6">
                <h3 className="text-foreground text-lg font-semibold">
                  Project name
                </h3>
                <p className="text-muted-foreground min-h-12">
                  Shortly describe what this project is about and what you did
                  for the client. Make sure to highlight the benefits and
                  results achieved.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
