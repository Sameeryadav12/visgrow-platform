import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AudiencePopup from "@/components/AudiencePopup";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import StickyCta from "@/components/StickyCta";
import PublicChrome from "@/components/PublicChrome";
import { getNavigation, getSiteSettings } from "@/lib/cms";

const bebas = localFont({
  src: "../../fonts/BebasNeue-Regular.ttf",
  variable: "--font-heading",
  weight: "400",
  display: "swap",
});

const raleway = localFont({
  src: "../../fonts/Raleway-Variable.ttf",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
});

// Pages are pre-rendered for speed, then refreshed in the background every
// minute. That means an edit in /admin appears on the live site within about
// 60 seconds without anyone having to rebuild or redeploy.
export const revalidate = 60;

// Belt and braces alongside robots.txt: some crawlers ignore robots.txt but
// honour the meta tag. Staging stays out of Google either way.
const IS_LIVE = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
  ...(IS_LIVE ? {} : { robots: { index: false, follow: false } }),
  title: "Visgrow | Career Coaching, Internships & Workforce Development",
  description:
    "Visgrow helps students and graduates become job-ready, and helps employers build capable, confident teams. Career coaching, hosted internships and workshops in Adelaide.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nav, settings] = await Promise.all([getNavigation(), getSiteSettings()]);

  return (
    <html
      lang="en-AU"
      className={`${bebas.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Keyboard users would otherwise tab through the entire menu on
            every single page before reaching the content. */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <PublicChrome>
          <Header
            nav={nav?.items ?? undefined}
            ctaLabel={nav?.ctaLabel ?? undefined}
            ctaHref={nav?.ctaHref ?? undefined}
            phone={settings?.phone ?? undefined}
          />
        </PublicChrome>
        <main id="main" className="flex-1 flex flex-col">
          {children}
        </main>
        <PublicChrome>
          <Footer />
          <AudiencePopup
            enabled={settings?.audiencePopupEnabled ?? true}
            heading={settings?.audiencePopupHeading ?? undefined}
            subheading={settings?.audiencePopupSubheading ?? undefined}
          />
          <StickyCta
            enabled={settings?.stickyCtaEnabled ?? true}
            text={settings?.stickyCtaText ?? undefined}
          />
        </PublicChrome>
        <BackToTop />
        <ScrollReveal />
      </body>
    </html>
  );
}
