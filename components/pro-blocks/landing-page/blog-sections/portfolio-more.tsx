"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export function PortfolioMore() {
  return (
    <section
      className="bg-muted/50 section-padding-y border-b border-dashed border-border"
      aria-labelledby="blog-section-heading"
    >
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col items-start gap-10 md:gap-12">
          {/* Section Title */}
          <div className="section-title-gap-lg mx-auto flex max-w-xl flex-col items-center text-center">
            {/* Main Heading */}
            <h2 id="blog-section-heading" className="heading-lg">
              More Projects
            </h2>
          </div>

          {/* Blog Grid */}
          <div
            className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-6"
            role="list"
          >
            <Link href="/portfolio/portfolio-item">
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
                  <p className="text-muted-foreground">
                    Shortly describe what this project is about and what you did
                    for the client. Make sure to highlight the benefits and
                    results achieved.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/portfolio/portfolio-item">
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
                  <p className="text-muted-foreground">
                    Shortly describe what this project is about and what you did
                    for the client. Make sure to highlight the benefits and
                    results achieved.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/portfolio/portfolio-item">
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
                  <p className="text-muted-foreground">
                    Shortly describe what this project is about and what you did
                    for the client. Make sure to highlight the benefits and
                    results achieved.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
