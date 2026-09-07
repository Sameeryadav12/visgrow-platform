import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guideBySlug, publishedGuides } from "@/lib/guides";

/** Only the guides that actually have content get a page. */
export function generateStaticParams() {
  return publishedGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | Visgrow`,
    description: guide.standfirst ?? guide.blurb,
    alternates: { canonical: `/resources/${guide.slug}` },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide?.body?.length) notFound();

  const more = publishedGuides()
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 3);

  return (
    <>
      <section className="bg-brand-gradient text-white">
        <div className="mx-auto max-w-[820px] px-6 py-16 lg:px-10 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/resources" className="hover:text-white">Resources</Link>
          </nav>
          <span className="mb-5 inline-flex rounded-full border border-white/35 bg-white/15 px-3.5 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[1.4px]">
            Guide · {guide.readTime} read
          </span>
          <h1 className="mb-5 text-[clamp(30px,4.4vw,50px)] leading-[1.05]">
            {guide.title}
          </h1>
          {guide.standfirst && (
            <p className="max-w-[620px] text-[17px] leading-[1.6] text-white/90">
              {guide.standfirst}
            </p>
          )}
        </div>
      </section>

      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[720px] px-6 lg:px-10">
          {guide.body.map((block, i) => {
            if ("h" in block) {
              return (
                <h2
                  key={i}
                  className="mb-4 mt-11 text-[clamp(22px,2.6vw,28px)] text-[var(--color-ink)] first:mt-0"
                >
                  {block.h}
                </h2>
              );
            }
            if ("ul" in block) {
              return (
                <ul key={i} className="mb-6 flex flex-col gap-3">
                  {block.ul.map((li) => (
                    <li
                      key={li}
                      className="flex gap-3 text-[16px] leading-[1.7] text-brand-sub"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink"
                      />
                      {li}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mb-5 text-[16.5px] leading-[1.75] text-brand-sub">
                {block.p}
              </p>
            );
          })}

          {/* The guide is genuinely useful on its own. The offer sits at the
              end, after the value, rather than gating it at the top. */}
          <div className="mt-14 rounded-[20px] border-2 border-brand-purple bg-brand-lavender p-8">
            <h2 className="mb-3 text-[22px] text-[var(--color-ink)]">
              Rather have someone look at yours?
            </h2>
            <p className="mb-6 text-[15px] leading-[1.7] text-brand-sub">
              Reading about it helps. Having someone read your actual resume and
              tell you what&apos;s wrong with it is faster — and we&apos;ll tell
              you honestly if you don&apos;t need us.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/students-graduates/career-strategy-gap-analysis"
                className="rounded-xl bg-brand-gradient px-7 py-3.5 text-[14.5px] font-extrabold text-white transition-opacity hover:opacity-90"
              >
                Book a Gap Analysis
              </Link>
              <Link
                href="/masterclass"
                className="rounded-xl border-2 border-brand-purple px-7 py-3.5 text-[14.5px] font-extrabold text-brand-purple transition-colors hover:bg-brand-purple hover:text-white"
              >
                Watch the free masterclass
              </Link>
            </div>
          </div>

          {more.length > 0 && (
            <div className="mt-14 border-t border-[var(--color-line)] pt-10">
              <h2 className="mb-6 text-[20px] text-[var(--color-ink)]">
                Read next
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {more.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/resources/${g.slug}`}
                    className="rounded-[14px] border border-[var(--color-line)] p-5 transition-all hover:-translate-y-0.5 hover:border-brand-purple"
                  >
                    <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[1.2px] text-brand-pink">
                      {g.readTime} read
                    </span>
                    <span className="block text-[15px] font-extrabold leading-snug text-[var(--color-ink)]">
                      {g.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
