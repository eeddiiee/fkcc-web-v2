import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

// Google Fonts를 통해 Asta Sans 로드
// next/font/google에서 지원하지 않는 경우를 대비해 직접 CSS import 사용

export const metadata: Metadata = {
  title: "Inspiro - Agency Template built with shadcn/ui",
  description:
    "Inspiro is a modern and clean agency template built with shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="ko" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Asta+Sans:wght@300..800&family=Hahmlet:wght@100..900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="relative antialiased" style={{ fontFamily: '"Asta Sans", sans-serif' }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ModeToggle />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
