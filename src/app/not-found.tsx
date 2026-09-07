import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";

/**
 * The 404 for URLs that match no route at all.
 *
 * This has to live at the root, not inside (frontend). A not-found.tsx inside
 * a route group only catches not-found errors raised within that group's own
 * segments — a completely unmatched URL never enters the group, so Next was
 * falling back to its own bare "404" page.
 *
 * It must NOT render its own <html>/<body>: because the app has two root
 * layouts (site and admin), Next supplies a default shell for this page, and
 * adding our own produced a hydration mismatch. The font variables go on a
 * wrapper div instead.
 */

const bebas = localFont({
  src: "../fonts/BebasNeue-Regular.ttf",
  variable: "--font-heading",
  weight: "400",
  display: "swap",
});

const raleway = localFont({
  src: "../fonts/Raleway-Variable.ttf",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Page not found | Visgrow",
  robots: { index: false, follow: true },
};

const routes = [
  {
    href: "/#overview",
    title: "I'm a student or graduate",
    body: "Coaching, internships and workshops",
  },
  {
    href: "/employers",
    title: "I'm an employer",
    body: "Build capability in your team",
  },
  {
    href: "/education-partners",
    title: "I'm an education institution",
    body: "Partner on graduate outcomes",
  },
];

export default function NotFound() {
  return (
    <div
      className={`${bebas.variable} ${raleway.variable} antialiased`}
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <div className="h-[3px] bg-brand-gradient" />

      <section className="bg-brand-gradient py-20 text-white lg:py-24">
        <div className="mx-auto max-w-[760px] px-6 text-center lg:px-10">
          <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[2px] text-white/80">
            Page not found
          </p>
          <h1 className="mb-5 text-[clamp(32px,4.6vw,54px)] leading-[1.04]">
            We couldn&apos;t find that page.
          </h1>
          <p className="mx-auto max-w-[520px] text-[16.5px] leading-[1.65] text-white/90">
            The link was probably old or mistyped. Nothing you did wrong —
            let&apos;s get you where you were actually going.
          </p>
        </div>
      </section>

      <section className="bg-brand-lavender py-16 lg:py-20">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <p className="mb-6 text-center text-[15px] font-bold text-[var(--color-ink)]">
            Which one are you?
          </p>

          <ul className="grid gap-4 sm:grid-cols-3">
            {routes.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="flex h-full flex-col rounded-[16px] border-2 border-[var(--color-line)] bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-purple"
                >
                  <span className="mb-1.5 text-[15.5px] font-extrabold text-[var(--color-ink)]">
                    {r.title}
                  </span>
                  <span className="text-[13.5px] leading-snug text-brand-sub">
                    {r.body}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-full bg-brand-gradient px-7 py-3.5 text-[14.5px] font-extrabold text-white"
            >
              Back to the home page
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-[var(--color-line)] bg-white px-7 py-3.5 text-[14.5px] font-bold text-[var(--color-ink)] transition-colors hover:border-brand-purple"
            >
              Tell us what you were looking for
            </Link>
          </div>

          <p className="mt-10 text-center text-[13px] text-brand-sub">
            Or call{" "}
            <a href="tel:1300891365" className="font-semibold text-brand-purple">
              1300 891 365
            </a>{" "}
            and we&apos;ll point you the right way.
          </p>
        </div>
      </section>
    </div>
  );
}
