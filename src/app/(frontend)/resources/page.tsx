import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { publishedGuides } from "@/lib/guides";
import GuideGrid from "@/components/GuideGrid";
import { getPageCopy, t } from "@/lib/page-copy";

export const metadata: Metadata = {
  title: "Career Resources for Students, Employers & Educators | Visgrow",
  description:
    "Practical guides on job searching, resumes, interviews, internships, networking and workplace capability — written by Visgrow for students, graduates, employers and education partners.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesPage() {
  const copy = await getPageCopy("/resources");

  // Newest first, the way a reader expects a library of articles to be ordered.
  const all = publishedGuides().sort((a, b) =>
    b.published.localeCompare(a.published),
  );
  // The newest guide is highlighted at the top, but it stays in the grid too —
  // otherwise filtering to its audience would hide it entirely.
  const lead = all[0];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-16 text-center lg:px-10 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-left text-[12.5px] font-semibold text-white/70"
          >
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Resources</span>
          </nav>

          <span
            aria-hidden="true"
            className="mx-auto mb-7 block h-1 w-14 rounded-full bg-white/70"
          />
          <h1 className="mx-auto mb-5 max-w-[820px] text-[clamp(32px,4.8vw,56px)] leading-[1.04]">
            {t(copy?.hero?.heading, "Everything we'd tell you in a session — written down, free.")}
          </h1>
          <p className="mx-auto max-w-[640px] text-[16.5px] leading-[1.65] text-white/90">
            {t(copy?.hero?.body, "Practical guides on job searching, resumes, interviews, internships and building capability. No sign-up, no gate.")}
          </p>
        </div>
      </section>

      {/* ============ FEATURED ============ */}
      {lead && (
        <section className="bg-white pt-16 lg:pt-20">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <Link
              href={`/resources/${lead.slug}`}
              className="group grid gap-8 rounded-[22px] border border-[var(--color-line)] bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(105,24,220,0.14)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-9"
            >
              <div className="relative flex h-[240px] items-center justify-center overflow-hidden rounded-[16px] bg-brand-gradient">
                <span className="absolute -left-10 -top-12 h-44 w-44 rounded-full bg-white/10" />
                <span className="absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-white/10" />
                <span
                  className="relative px-8 text-center text-[26px] leading-tight text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {lead.topic}
                </span>
              </div>
              <div>
                <span className="mb-3 inline-block rounded-full bg-brand-lavender px-3 py-1 text-[11px] font-extrabold uppercase tracking-[1.2px] text-brand-purple">
                  Latest
                </span>
                <h2 className="mb-3 text-[clamp(24px,3vw,34px)] leading-[1.12] text-[var(--color-ink)]">
                  {lead.title}
                </h2>
                <p className="mb-5 max-w-[560px] text-[15.5px] leading-[1.7] text-brand-sub">
                  {lead.standfirst ?? lead.blurb}
                </p>
                <span className="text-[13.5px] font-extrabold text-brand-purple underline-offset-4 group-hover:underline">
                  Read the guide →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ============ ALL GUIDES ============ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-9 max-w-[640px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Every guide
            </span>
            <h2 className="text-[clamp(26px,3.4vw,38px)] text-[var(--color-ink)]">
              Pick the thing that&apos;s actually stopping you.
            </h2>
          </div>

          {/* GuideGrid reads ?for= to preselect a filter, so it needs a
              Suspense boundary or the page can't be prerendered. */}
          <Suspense fallback={null}>
            <GuideGrid guides={all} />
          </Suspense>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-brand-deep py-20 text-white reveal">
        <div className="mx-auto max-w-[760px] px-6 text-center lg:px-10">
          <h2 className="mb-5 text-[clamp(28px,3.6vw,42px)]">
            Would you rather just be told?
          </h2>
          <p className="mb-9 text-[16.5px] leading-[1.7] text-white/85">
            Reading about it is useful. Having someone look at your actual
            resume and tell you what&apos;s wrong with it is faster.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/masterclass"
              className="rounded-xl bg-white px-9 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_16px_36px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1"
            >
              Watch the free masterclass
            </Link>
            <Link
              href="/get-started"
              className="rounded-xl border-2 border-white/60 px-9 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
            >
              Get started with Visgrow
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
