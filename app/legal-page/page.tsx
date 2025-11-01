"use client";

import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";

export default function LegalPage() {
  return (
    <>
      <LpNavbar1 />

      <section
        className="bg-background py-16 md:py-24 border-b border-dashed border-border"
        aria-labelledby="article-title"
      >
        <div className="mx-auto max-w-3xl px-6">
          <article className="flex flex-col gap-12 md:gap-16">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 md:gap-5">
                <h1 id="article-title" className="heading-xl">
                  Privacy Policy
                </h1>

                {/* Article Description/Summary */}
                <p className="text-muted-foreground text-lg">
                  Your privacy is important to us at Inspiro. This Privacy
                  Policy explains how we collect, use, and protect your
                  information when you use our website and services.
                </p>
              </div>
            </div>

            {/* Article Content Section */}
            <div className="flex flex-col gap-6">
              {/* Section 1: Information We Collect */}
              <h2
                className="border-b pb-2 text-3xl font-semibold"
                id="information-we-collect"
              >
                1. Information We Collect
              </h2>
              <p className="leading-7 text-muted-foreground">
                We collect the following types of information to provide and
                improve our services:
              </p>
              <ul
                className="ml-6 list-disc space-y-2"
                aria-label="Types of information collected"
              >
                <li>
                  Personal information (e.g., name, email, phone number)
                  provided by you.
                </li>
                <li>
                  Browsing information, such as cookies and IP addresses, to
                  enhance your experience on our site.
                </li>
                <li>
                  Any other information shared with us during communication.
                </li>
              </ul>

              {/* Section 2: How We Use Your Information */}
              <h2
                className="border-b pb-2 text-3xl font-semibold mt-8"
                id="how-we-use-your-information"
              >
                2. How We Use Your Information
              </h2>
              <p className="leading-7 text-muted-foreground">
                We use your data for the following purposes:
              </p>
              <ul
                className="ml-6 list-disc space-y-2"
                aria-label="Purposes for using data"
              >
                <li>To provide and improve our services.</li>
                <li>
                  To communicate with you regarding your inquiries or projects.
                </li>
                <li>
                  To analyze user activity and improve our website performance.
                </li>
              </ul>

              {/* Section 3: How We Protect Your Information */}
              <h2
                className="border-b pb-2 text-3xl font-semibold mt-8"
                id="how-we-protect-your-information"
              >
                3. How We Protect Your Information
              </h2>
              <p className="leading-7 text-muted-foreground">
                We implement various security measures to safeguard your
                information:
              </p>
              <ul
                className="ml-6 list-disc space-y-2"
                aria-label="Security measures"
              >
                <li>Secure servers and encrypted data.</li>
                <li>Regular monitoring to prevent unauthorized access.</li>
                <li>Limited access to personal data within our team.</li>
              </ul>

              {/* Section 4: Your Rights */}
              <h2
                className="border-b pb-2 text-3xl font-semibold mt-8"
                id="your-rights"
              >
                4. Your Rights
              </h2>
              <p className="leading-7 text-muted-foreground">
                You have the right to:
              </p>
              <ul className="ml-6 list-disc space-y-2" aria-label="User rights">
                <li>Access, update, or delete your personal data.</li>
                <li>Opt-out of marketing communications.</li>
                <li>
                  Contact us with questions or concerns about your privacy.
                </li>
              </ul>

              {/* Contact Us Section */}
              <h2
                className="border-b pb-2 text-3xl font-semibold mt-8"
                id="contact-us"
              >
                Contact Us
              </h2>
              <p className="leading-7 text-muted-foreground">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p className="leading-7 text-muted-foreground">
                Email: privacy@inspiro.com
              </p>
              <p className="leading-7 text-muted-foreground">
                Phone: +48 123 456 789
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer1 />
    </>
  );
}
