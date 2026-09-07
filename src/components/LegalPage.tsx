import Link from "next/link";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export default function LegalPage({
  title,
  intro,
  updated,
  sections,
  pending,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  pending: string[];
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[900px] px-6 py-14 lg:px-10 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-5 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">{title}</span>
          </nav>
          <h1 className="mb-4 text-[clamp(30px,4vw,46px)]">{title}</h1>
          <p className="max-w-[620px] text-[15.5px] leading-[1.65] text-white/90">{intro}</p>
          <p className="mt-5 text-[12.5px] text-white/65">Last updated: {updated}</p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          {pending.length > 0 && (
            <div className="mb-12 rounded-[16px] border-2 border-dashed border-brand-orange bg-[#fffaf2] p-6">
              <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[1.2px] text-brand-orange">
                Awaiting final details before publication
              </p>
              <p className="mb-3 text-[14px] leading-relaxed text-[var(--color-ink)]">
                This page is drafted but not yet legally finalised. The
                following details need to be confirmed by Visgrow before it
                goes live:
              </p>
              <ul className="flex flex-col gap-2">
                {pending.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[13.5px] text-brand-sub">
                    <span className="font-black text-brand-orange" aria-hidden="true">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-10">
            {sections.map((s, i) => (
              <div key={s.heading}>
                <h2 className="mb-4 text-[22px] text-[var(--color-ink)]">
                  <span className="mr-2 text-brand-purple">{i + 1}.</span>
                  {s.heading}
                </h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mb-3.5 text-[14.5px] leading-[1.75] text-brand-sub">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {s.list.map((l) => (
                      <li key={l} className="flex gap-2.5 text-[14.5px] leading-[1.65] text-brand-sub">
                        <span className="mt-0.5 font-black text-brand-purple" aria-hidden="true">•</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-[16px] border border-[var(--color-line)] bg-brand-lavender p-7">
            <h2 className="mb-2.5 text-[19px] text-[var(--color-ink)]">Questions about this?</h2>
            <p className="mb-4 text-[14px] leading-relaxed text-brand-sub">
              If anything here is unclear, or you&apos;d like to know what
              information we hold about you, get in touch and we&apos;ll
              answer directly.
            </p>
            <a
              href="mailto:hello@visgrowinternships.com.au"
              className="inline-block rounded-[10px] bg-brand-gradient px-5 py-3 text-[13.5px] font-extrabold text-white transition-transform hover:-translate-y-0.5"
            >
              hello@visgrowinternships.com.au
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
