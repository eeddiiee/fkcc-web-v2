"use client";

import { Logo } from "@/components/pro-blocks/logo";
import Link from "next/link";

export function Footer1() {
  return (
    <footer
      className="bg-background section-padding-y border-t border-dashed border-border"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container-padding-x container mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Top Section */}
        <div className="flex w-full flex-col items-center gap-12 text-center">
          {/* Logo Section */}
          <Link href="/" aria-label="Go to homepage">
            <Logo />
          </Link>

          {/* Main Navigation */}
          <nav
            className="flex flex-col items-center gap-6 md:flex-row md:gap-8"
            aria-label="Footer navigation"
          >
            <Link
              href="/services"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              서비스
            </Link>
            <Link
              href="/portfolio"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              포트폴리오
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              소개
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              블로그
            </Link>
          </nav>
        </div>

        {/* Section Divider */}
        <div className="border-t border-dashed border-border h-px"></div>

        {/* Bottom Section */}
        <div className="flex w-full flex-col-reverse items-center gap-12 lg:flex-row lg:justify-between lg:gap-6">
          {/* Copyright Text */}
          <p className="text-muted-foreground text-center lg:text-left">
            <span>Copyright 2048 ©</span>{" "}
            <Link
              href="https://shadcndesign.com"
              className="hover:underline"
              target="_blank"
            >
              shadcndesign.com
            </Link>
          </p>

          {/* Legal Navigation */}
          <nav
            className="flex flex-col items-center gap-6 md:flex-row md:gap-8"
            aria-label="Legal links"
          >
            <Link
              href="/legal-page"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              개인정보 처리방침
            </Link>
            <Link
              href="/legal-page"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              이용약관
            </Link>
            <Link
              href="/legal-page"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              쿠키 설정
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
