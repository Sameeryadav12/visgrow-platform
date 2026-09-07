import type { Metadata } from "next";
import Link from "next/link";
import SignupFlow from "@/components/SignupFlow";
import { contact } from "@/lib/site-config";
import { getPageCopy, t } from "@/lib/page-copy";
import { getPrograms } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Get Started with Visgrow | Career Coaching & Internships",
  description:
    "Choose your program and get started with Visgrow. Career Strategy & Gap Analysis, the 14-Day Career Accelerator, ongoing coaching or a Visgrow-Hosted Internship.",
  alternates: { canonical: "/get-started" },
};

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const copy = await getPageCopy("/get-started");
  const { program } = await searchParams;
  const valid = ["gap", "accelerator", "coaching", "internship", "unsure"];
  const preselect = program && valid.includes(program) ? program : undefined;

  // Prices were hard-coded in the form, so a price Mustafa set in the admin
  // panel would never have reached the one page where people choose what to
  // buy. They come from the CMS now.
  const programs = await getPrograms("student");
  const priceBySlug: Record<string, string> = {};
  for (const p of programs ?? []) {
    if (p?.slug) priceBySlug[p.slug] = (p.price ?? "").trim();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-14 lg:px-10 lg:py-18">
          <nav aria-label="Breadcrumb" className="mb-5 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Get started</span>
          </nav>
          <h1 className="mb-4 max-w-[720px] text-[clamp(30px,4.2vw,50px)] leading-[1.04]">
            {t(copy?.hero?.heading, "Let's get you moving.")}
          </h1>
          <p className="max-w-[560px] text-[16.5px] leading-[1.65] text-white/90">
            {t(copy?.hero?.body, "Two quick steps. No payment taken here — we confirm everything with you before anything happens.")}
          </p>
        </div>
      </section>

      <section className="bg-brand-lavender py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-start lg:px-10">
          <SignupFlow preselect={preselect} prices={priceBySlug} />

          <aside className="flex flex-col gap-5">
            <div className="rounded-[18px] border border-[var(--color-line)] bg-white p-7">
              <h2 className="mb-4 text-[19px] text-[var(--color-ink)]">
                What happens next
              </h2>
              <ol className="flex flex-col gap-4">
                {[
                  "We read what you've told us — an actual person, not an autoresponder.",
                  "We come back within one business day to confirm the details and answer questions.",
                  "If we think you've picked the wrong program, we'll say so before you pay anything.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-3 text-[13.5px] leading-relaxed text-brand-sub">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-lavender text-[11.5px] font-extrabold text-brand-purple">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[18px] border border-[var(--color-line)] bg-white p-7">
              <h2 className="mb-3 text-[19px] text-[var(--color-ink)]">
                Rather just talk?
              </h2>
              <p className="mb-4 text-[13.5px] leading-relaxed text-brand-sub">
                Completely fine — call or email and skip the form entirely.
              </p>
              <a href={contact.phoneHref} className="block text-[15px] font-extrabold text-[var(--color-ink)] hover:text-brand-purple">
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="mt-1 block break-all text-[13.5px] text-brand-sub hover:text-brand-purple">
                {contact.email}
              </a>
            </div>

            <div className="rounded-[18px] border-2 border-dashed border-brand-purple/40 bg-white p-7">
              <h2 className="mb-3 text-[19px] text-[var(--color-ink)]">
                Not ready yet?
              </h2>
              <p className="mb-4 text-[13.5px] leading-relaxed text-brand-sub">
                Watch the free masterclass first. No payment, no obligation —
                and it might be all you need.
              </p>
              <Link
                href="/masterclass"
                className="inline-block rounded-[10px] bg-brand-lavender px-5 py-3 text-[13.5px] font-extrabold text-brand-purple transition-colors hover:bg-brand-purple hover:text-white"
              >
                Watch it free →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
