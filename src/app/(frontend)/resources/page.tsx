import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";
import { audienceMeta } from "@/lib/resources-data";
import { getPageCopy, t } from "@/lib/page-copy";

export const metadata: Metadata = {
  title: "Career Resources for Students, Employers & Educators | Visgrow",
  description:
    "Practical guides on job searching, resumes, interviews, internships, networking and workplace capability — written by Visgrow for students, graduates, employers and education partners.",
  alternates: { canonical: "/resources" },
};

const groups = ["students", "employers", "education-partners"] as const;

export default async function ResourcesPage() {
  const copy = await getPageCopy("/resources");
  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Resources</span>
          </nav>

          <h1 className="mb-5 max-w-[760px] text-[clamp(32px,4.6vw,54px)] leading-[1.04]">
            {t(copy?.hero?.heading, "Everything we'd tell you in a session — written down, free.")}
          </h1>
          <p className="max-w-[600px] text-[16.5px] leading-[1.65] text-white/90">
            {t(copy?.hero?.body, "Practical guides on job searching, resumes, interviews, internships and building capability. No sign-up, no gate.")}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {groups.map((g) => (
              <a
                key={g}
                href={`#${g}`}
                className="rounded-full border-2 border-white/40 bg-white/10 px-5 py-2.5 text-[13.5px] font-bold backdrop-blur transition-colors hover:bg-white/20"
              >
                {audienceMeta[g].label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {groups.map((g, i) => {
        const items = guides.filter((r) => r.audience === g);
        const meta = audienceMeta[g];
        return (
          <section
            key={g}
            id={g}
            className={`scroll-mt-24 py-20 reveal ${i % 2 === 0 ? "bg-white" : "bg-brand-lavender"}`}
            aria-labelledby={`${g}-heading`}
          >
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
              <div className="mb-10 max-w-[660px]">
                <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
                  {meta.label}
                </span>
                <h2 id={`${g}-heading`} className="mb-4 text-[clamp(28px,3.4vw,40px)] text-[var(--color-ink)]">
                  {meta.heading}
                </h2>
                <p className="text-[16px] leading-[1.7] text-brand-sub">{meta.blurb}</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {items.map((r) => (
                  <article
                    key={r.title}
                    className="flex flex-col rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift"
                  >
                    <div className="mb-3 flex items-center gap-2.5">
                      <span className="rounded-full bg-brand-lavender px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-purple">
                        Guide
                      </span>
                      <span className="text-[12px] font-semibold text-brand-sub">{r.readTime} read</span>
                    </div>
                    <h3 className="mb-2.5 text-[17px] font-extrabold leading-snug text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
                      {r.title}
                    </h3>
                    <p className="mb-5 flex-1 text-[13.5px] leading-[1.6] text-brand-sub">{r.blurb}</p>
                    {r.body?.length ? (
                      <Link
                        href={`/resources/${r.slug}`}
                        className="text-[13px] font-extrabold text-brand-purple underline-offset-4 hover:underline"
                      >
                        Read the guide →
                      </Link>
                    ) : (
                      <span className="text-[12.5px] font-bold text-brand-sub">
                        Publishing soon
                      </span>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-brand-deep py-24 text-white reveal">
        <div className="mx-auto max-w-[760px] px-6 text-center lg:px-10">
          <h2 className="mb-5 text-[clamp(28px,3.6vw,42px)]">
            Would you rather just be told?
          </h2>
          <p className="mb-10 text-[16.5px] leading-[1.7] text-white/85">
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
