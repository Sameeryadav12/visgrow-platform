import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import { getPageCopy, t, list, texts } from "@/lib/page-copy";
import { getProgramBySlug, getTestimonials } from "@/lib/cms";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title: "Career Strategy & Gap Analysis | Visgrow Adelaide",
  description:
    "A 60–90 minute one-on-one diagnostic that finds the exact reason employers are passing on you — resume, LinkedIn, interview technique or targeting. You leave with a written action plan.",
  alternates: { canonical: "/students-graduates/career-strategy-gap-analysis" },
};

const pains = [
  {
    icon: "❓",
    title: "Nobody tells you why you were rejected",
    body: "Not the recruiter, not the system, not the silence. So you guess — and you keep guessing for months.",
  },
  {
    icon: "🔧",
    title: "You're fixing the wrong thing",
    body: "You rewrite the resume for the fifth time when the real problem was your targeting, or your interview answers, or a LinkedIn profile nobody can find.",
  },
  {
    icon: "💸",
    title: "You're about to spend money on a guess",
    body: "Courses, resume services, another certificate. All of it worthless if it isn't aimed at the thing actually stopping you.",
  },
];

const benefits = [
  {
    title: "An honest diagnosis, not a sales pitch",
    body: "We look at your resume, your LinkedIn, how you interview and the roles you're targeting — then tell you plainly which one is costing you the offers.",
  },
  {
    title: "An ATS compatibility check",
    body: "We run your resume the way screening software reads it, so you can see what's being stripped, mangled or filtered out before a human ever sees it.",
  },
  {
    title: "A written action plan you keep",
    body: "You leave with specific, ordered next steps in writing — not a vague feeling that you should 'network more'.",
  },
  {
    title: "A straight recommendation",
    body: "Including whether you need anything else from us at all. If the plan is something you can execute alone, we'll tell you that.",
  },
];

const consequences = [
  "You keep spending months treating symptoms while the actual blocker sits untouched.",
  "You buy a program that fixes a problem you didn't have, and nothing changes.",
  "You conclude the market is impossible, when the real issue was fixable in an afternoon.",
];

const steps = [
  {
    n: "01",
    title: "Send us your material",
    body: "Resume, LinkedIn, and the kind of roles you've been applying for. We review it properly before we meet.",
  },
  {
    n: "02",
    title: "Sit down for 60–90 minutes",
    body: "One-on-one, in person in Adelaide or online. We go through what we found and what it means.",
  },
  {
    n: "03",
    title: "Get the honest answer",
    body: "The specific reason you're being passed over, said plainly — even if it's uncomfortable to hear.",
  },
  {
    n: "04",
    title: "Leave with a written plan",
    body: "Ordered steps, what to do first, and a recommendation on whether you need support or can run it yourself.",
  },
];

const fallbackTestimonials = [
  {
    quote:
      "Mustafa is driven to provide mentorship to graduates to better their visibility in the job market by perfecting and tailoring their resume, their LinkedIn profile, and even provide one-on-one sessions for career growth and interview preparation.",
    name: "Nalin Gupta",
    role: "Graduate, Risk Advisory — Deloitte",
  },
  {
    quote:
      "The resume process is different and way better than conventional resume companies. The interview prep session is very beneficial for a strong professional career.",
    name: "Shuvankeet Nandi",
    role: "Mechanical Engineer — Mayne Pharma",
  },
];

const faqs = [
  {
    q: "Is this just a sales call for your bigger programs?",
    a: "No. It's a paid session because it's real work — we review your material beforehand and give you a written plan afterwards. Plenty of people take the plan and run it themselves, and that's a completely fine outcome.",
  },
  {
    q: "What do I need to bring?",
    a: "Your current resume, your LinkedIn profile, and a rough idea of the roles you've been applying for. If you've kept any rejection emails, bring those too — they're often more revealing than people expect.",
  },
  {
    q: "Can I do it online?",
    a: "Yes. We're Adelaide-based and happy to meet in person, but the session works just as well over video and a lot of our clients are interstate.",
  },
  {
    q: "What if I've already had my resume professionally written?",
    a: "Bring it anyway. Sometimes the resume is genuinely fine and the blocker is elsewhere — in which case we'll say so rather than charge you to rewrite something that doesn't need rewriting.",
  },
  {
    q: "What if it doesn't help?",
    a: "Then tell us within 7 days and we'll refund it. If you don't leave with a clearer picture of what's holding you back, we haven't done the job.",
  },
];

export default async function GapAnalysisPage() {
  const copy = await getPageCopy("/students-graduates/career-strategy-gap-analysis");
  const cms_pains = list(copy?.pain?.items, pains);
  const cms_benefits = list(copy?.benefits?.items, benefits);
  const cms_consequences = texts(copy?.consequences?.items, consequences);
  const cms_steps = list(copy?.how?.steps, steps);

  // The price comes from the CMS, never from this file. While Mustafa is still
  // deciding it, the page must not show a number or offer a "pay now" button
  // that would fail at checkout — it sells the conversation instead.
  const program = await getProgramBySlug("career-strategy-gap-analysis");
  const price = (program?.price ?? "").trim();
  const priceNote = (program?.priceNote ?? "").trim();
  const canPayOnline = Boolean(price);

  const cmsTestimonials = await getTestimonials("student");
  const shown = (cmsTestimonials?.length ? cmsTestimonials : fallbackTestimonials).slice(0, 2);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Career Strategy &amp; Gap Analysis</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[1.5px]">
                Start here · one session
              </span>

              <h1 className="mb-6 text-[clamp(33px,4.8vw,56px)] leading-[1.02]">
                {t(copy?.hero?.heading, "Before you fix anything, find out what's actually broken.")}
              </h1>

              <p className="mb-9 max-w-[540px] text-[16.5px] leading-[1.65] text-white/90">
                A 60–90 minute one-on-one session where we audit your resume,
                LinkedIn, interview technique and targeting — then tell you
                honestly which one is costing you the offers.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/get-started?program=gap"
                  className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1"
                >
                  Book My Gap Analysis
                </Link>
                <Link
                  href="#whats-included"
                  className="rounded-xl border-2 border-white/70 px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
                >
                  See what&apos;s included
                </Link>
              </div>
            </div>

            <div className="rounded-[20px] border border-[var(--color-line)] bg-white p-7 shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
              <p className="mb-1 text-[12.5px] font-extrabold uppercase tracking-[1.2px] text-brand-sub">
                The session
              </p>
              <p className="mb-5 text-[40px] leading-none text-brand-purple" style={{ fontFamily: "var(--font-heading)" }}>
                {price || "60–90 min"}
                <span className="ml-2 align-middle text-[14px] font-semibold text-brand-sub" style={{ fontFamily: "var(--font-body)" }}>
                  {price ? priceNote || "one-off" : "one-on-one, one-off"}
                </span>
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Your material reviewed before we meet",
                  "Resume & LinkedIn audit",
                  "ATS compatibility check",
                  "Written action plan you keep",
                  "In person in Adelaide or online",
                ].map((x) => (
                  <li key={x} className="flex gap-2.5 text-[13.5px] leading-snug text-brand-sub">
                    <span className="font-black text-[#1cae6f]" aria-hidden="true">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-[var(--color-line)] pt-4 text-[12px] leading-relaxed text-brand-sub">
                Refundable within 7 days if you don&apos;t leave with a clearer
                picture of what&apos;s holding you back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 1 · PAIN ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ga-pain">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.pain?.eyebrow, "The real problem")}
            </span>
            <h2 id="ga-pain" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.pain?.heading, "You're not failing. You're flying blind.")}
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              Rejection almost never comes with a reason attached. So people
              guess, fix the most visible thing, and wonder why nothing shifts.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {cms_pains.map((p) => (
              <div key={p.title} className="rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <span aria-hidden="true" className="mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-brand-lavender text-[20px]">
                  {p.icon}
                </span>
                <h3 className="mb-2 text-[16.5px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
                  {p.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-brand-sub">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 2 · IMPORTANCE ============ */}
      <section className="bg-brand-deep py-20 text-white reveal" aria-labelledby="ga-importance">
        <div className="mx-auto max-w-[900px] px-6 text-center lg:px-10">
          <span className="mb-4 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-orange">
            {t(copy?.importance?.eyebrow, "Why diagnose first")}
          </span>
          <h2 id="ga-importance" className="mb-6 text-[clamp(30px,3.8vw,46px)]">
            {t(copy?.importance?.heading, "No doctor prescribes before they examine.")}
          </h2>
          <p className="mx-auto max-w-[680px] text-[16.5px] leading-[1.7] text-white/85">
            Every other program on this site assumes you already know what you
            need. Most people don&apos;t — and buying the wrong solution
            costs far more than an hour spent finding the right one. This is
            the cheapest, fastest way to stop guessing.
          </p>
        </div>
      </section>

      {/* ============ 3 · BENEFITS ============ */}
      <section id="whats-included" className="scroll-mt-24 bg-brand-lavender py-24 reveal" aria-labelledby="ga-benefits">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.benefits?.eyebrow, "What's included")}
            </span>
            <h2 id="ga-benefits" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.benefits?.heading, "One session. Four things you walk away with.")}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {cms_benefits.map((b) => (
              <div key={b.title} className="rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <div className="icon-check" aria-hidden="true">✓</div>
                <h3 className="mb-2.5 text-[17.5px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
                  {b.title}
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-brand-sub">{b.body}</p>
              </div>
            ))}
          </div>

          {/* Naming who shouldn't buy is the strongest proof that the
              recommendation afterwards is honest. */}
          <div className="mt-10 rounded-[18px] border-[1.5px] border-brand-purple bg-white p-7">
            <h3
              className="mb-2.5 text-[17px] font-extrabold text-brand-purple"
              style={{ fontFamily: "var(--font-body)" }}
            >
              When we&apos;ll tell you not to book this
            </h3>
            <p className="text-[14.5px] leading-[1.65] text-brand-sub">
              If you already know exactly what&apos;s wrong and just need it
              fixed, skip this and go straight to the program that fixes it.
              This session is for the people who&apos;ve been applying for
              months without a straight answer as to why it isn&apos;t working.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 4 · CONSEQUENCES ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ga-consequences">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          <div className="mb-10 max-w-[680px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.consequences?.eyebrow, "If you skip this step")}
            </span>
            <h2 id="ga-consequences" className="text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
              {t(copy?.consequences?.heading, "Guessing is the most expensive option available to you.")}
            </h2>
          </div>
          <ul className="flex flex-col gap-4">
            {cms_consequences.map((c) => (
              <li key={c} className="rounded-[16px] border-l-4 border-brand-pink bg-[#fff5f7] p-5 text-[14.5px] leading-[1.6] text-[var(--color-ink)]">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 5 · RESULTS ============ */}
      <section className="bg-brand-gradient py-24 text-white reveal" aria-labelledby="ga-results">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-white/80">
              {t(copy?.results?.eyebrow, "What people say afterwards")}
            </span>
            <h2 id="ga-results" className="text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.results?.heading, "Mostly: “why did nobody tell me this sooner?”")}
            </h2>
            <p className="mt-4 text-[14px] leading-[1.6] text-white/75">
              From people we&apos;ve worked with across our programs — the same
              honest assessment sits behind all of them.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {shown.map((t) => (
              <figure key={t.name} className="rounded-[18px] border border-white/20 bg-white/10 p-7 backdrop-blur">
                <div className="mb-4 text-[13px] tracking-[3px] text-[#F6A83D]" aria-hidden="true">★★★★★</div>
                <blockquote className="mb-5 text-[14.5px] leading-[1.7] text-white/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <span className="block text-[14px] font-extrabold">{t.name}</span>
                  <span className="block text-[12.5px] text-white/70">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6 · HOW TO IMPLEMENT ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ga-how">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.how?.eyebrow, "How it works")}
            </span>
            <h2 id="ga-how" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.how?.heading, "Four steps, start to plan.")}
            </h2>
          </div>

          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cms_steps.map((s, i) => (
              <li key={s.title} className="rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <span className="mb-5 block text-[40px] leading-none text-brand-gradient" style={{ fontFamily: "var(--font-heading)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2.5 text-[16.5px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
                  {s.title}
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-brand-sub">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex justify-center">
            <Link
              href="/#compare"
              className="rounded-xl border-2 border-brand-purple px-8 py-4 text-[14.5px] font-extrabold text-brand-purple transition-colors hover:bg-brand-purple hover:text-white"
            >
              Compare all programs →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-brand-lavender py-24 reveal" aria-labelledby="ga-faq">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <div className="mb-11">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Before you book
            </span>
            <h2 id="ga-faq" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              Fair questions, straight answers.
            </h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-brand-deep py-24 text-white reveal">
        <div className="mx-auto max-w-[760px] px-6 text-center lg:px-10">
          <h2 className="mb-6 text-[clamp(30px,3.8vw,46px)]">
            {t(copy?.cta?.heading, "One hour to stop guessing.")}
          </h2>
          <p className="mb-10 text-[16.5px] leading-[1.7] text-white/85">
            Whatever you do next — with us or on your own — you&apos;ll be
            doing it for a reason instead of a hunch. That&apos;s the entire
            point of this session.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {canPayOnline ? (
              <BuyButton
                programSlug="career-strategy-gap-analysis"
                label="Book and pay now"
                price={price}
                variant="onDark"
              />
            ) : (
              <Link
                href="/get-started?program=gap"
                className="rounded-xl bg-white px-9 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_16px_36px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1"
              >
                Book My Gap Analysis
              </Link>
            )}
            <Link
              href="/masterclass"
              className="rounded-xl border-2 border-white/60 px-9 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
            >
              Watch the free masterclass first
            </Link>
          </div>

          {/* The refund promise is the last objection standing. Say it here,
              not only in the FAQ where most people never scroll. */}
          <p className="mx-auto mt-8 max-w-[520px] text-[13.5px] leading-[1.65] text-white/75">
            If you don&apos;t leave with a clearer picture of what&apos;s holding
            you back, tell us within 7 days and we&apos;ll refund it. We&apos;d
            rather give the money back than have you recommend us to nobody.
          </p>
        </div>
      </section>
    </>
  );
}
