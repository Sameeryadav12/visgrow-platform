import type { Metadata } from "next";
import Link from "next/link";
import MasterclassGate from "@/components/MasterclassGate";
import { getSiteSettings } from "@/lib/cms";
import { getPageCopy, t } from "@/lib/page-copy";

export const metadata: Metadata = {
  title: "Free Masterclass — How to Successfully Land a Job | Visgrow",
  description:
    "Mustafa Kadir's full masterclass on landing a job in the Australian market — the hidden job market, resume mistakes, LinkedIn, interviews and getting hired as an international student. Free, no payment, no catch.",
  alternates: { canonical: "/masterclass" },
};

export default async function MasterclassPage() {
  const copy = await getPageCopy("/masterclass");
  const settings = await getSiteSettings();
  const chapters =
    settings?.masterclassChapters?.map((c) => c.title).filter(Boolean) ?? [];

  // Only state a running time once someone has actually checked it. A wrong
  // number here is the same category of problem as an invented statistic.
  const duration = settings?.masterclassDuration?.trim();
  const lengthPhrase = duration ? `${duration} with` : "A full session with";

  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Free Masterclass</span>
          </nav>

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[1.5px]">
            Free · No payment · No catch
          </span>

          <h1 className="mb-5 max-w-[800px] text-[clamp(32px,4.6vw,56px)] leading-[1.04]">
            {t(copy?.hero?.heading, "The masterclass on actually landing a job in this market.")}
          </h1>

          <p className="max-w-[620px] text-[17px] leading-[1.65] text-white/90">
            {t(copy?.hero?.body, `${lengthPhrase} Mustafa Kadir — the same material Visgrow runs as a paid workshop, given away because it genuinely helps people. Watch it, apply it yourself, and if you never speak to us again, that's fine.`)}
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <MasterclassGate
            duration={duration ?? ""}
            youtubeId={settings?.masterclassYoutubeId ?? ""}
            chapters={chapters}
          />
        </div>
      </section>

      {/* Conversion sits AFTER the value, not before it */}
      <section className="bg-brand-lavender py-24 reveal">
        <div className="mx-auto max-w-[900px] px-6 text-center lg:px-10">
          <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
            Finished watching?
          </span>
          <h2 className="mb-5 text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
            Knowing what to do and doing it are two different things.
          </h2>
          <p className="mx-auto mb-10 max-w-[640px] text-[16px] leading-[1.7] text-brand-sub">
            Most people watch something like this, feel motivated for three
            days, then drift back to sending the same resume. If you&apos;d
            rather have someone work through it with you — properly, with
            deadlines and honest feedback — that&apos;s exactly what we do.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-started"
              className="rounded-xl bg-brand-gradient px-9 py-4 text-[15px] font-extrabold text-white shadow-[0_16px_36px_rgba(105,24,220,0.35)] transition-transform hover:-translate-y-1"
            >
              Get started with Visgrow
            </Link>
            <Link
              href="/#pricing"
              className="rounded-xl border-2 border-brand-purple px-9 py-4 text-[15px] font-extrabold text-brand-purple transition-colors hover:bg-brand-purple hover:text-white"
            >
              See programs &amp; pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
