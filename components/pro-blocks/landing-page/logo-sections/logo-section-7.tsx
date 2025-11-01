"use client";

import Image from "next/image";

const logosData = [
  {
    id: 1,
    src: "https://shadcndesign-agency-template.vercel.app/logo-01.svg",
    alt: "Logo 1",
  },
  {
    id: 2,
    src: "https://shadcndesign-agency-template.vercel.app/logo-02.svg",
    alt: "Logo 2",
  },
  {
    id: 3,
    src: "https://shadcndesign-agency-template.vercel.app/logo-03.svg",
    alt: "Logo 3",
  },
  {
    id: 4,
    src: "https://shadcndesign-agency-template.vercel.app/logo-04.svg",
    alt: "Logo 4",
  },
  {
    id: 5,
    src: "https://shadcndesign-agency-template.vercel.app/logo-05.svg",
    alt: "Logo 5",
  },
  {
    id: 6,
    src: "https://shadcndesign-agency-template.vercel.app/logo-01.svg",
    alt: "Logo 1",
  },
  {
    id: 7,
    src: "https://shadcndesign-agency-template.vercel.app/logo-02.svg",
    alt: "Logo 2",
  },
  {
    id: 8,
    src: "https://shadcndesign-agency-template.vercel.app/logo-03.svg",
    alt: "Logo 3",
  },
  {
    id: 9,
    src: "https://shadcndesign-agency-template.vercel.app/logo-04.svg",
    alt: "Logo 4",
  },
  {
    id: 10,
    src: "https://shadcndesign-agency-template.vercel.app/logo-05.svg",
    alt: "Logo 5",
  },
];

export function LogoSection7() {
  return (
    <section className="bg-background section-padding-y border-y border-border border-dashed">
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col items-center gap-12 md:gap-16">
          <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent_0%,black_12.5%,black_87.5%,transparent_100%)]">
            <div className="animate-infinite-scroll flex w-max items-center">
              {[...logosData, ...logosData].map((logoItem, index) => {
                const uniqueKey = `logo-wrapper-${logoItem.id}-${index}`;
                return (
                  <div
                    key={uniqueKey}
                    className="w-48 flex-shrink-0 place-items-center px-4"
                  >
                    <Image
                      src={logoItem.src}
                      alt={logoItem.alt}
                      width={144}
                      height={48}
                      className="object-contain dark:invert dark:grayscale dark:brightness-0 dark:opacity-70"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50%));
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
