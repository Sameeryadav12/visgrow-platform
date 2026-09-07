import type { Metadata } from "next";
import Link from "next/link";
import AcceleratorTracker from "@/components/AcceleratorTracker";
import FaqAccordion from "@/components/FaqAccordion";
import { getPageCopy, t, list, texts } from "@/lib/page-copy";
import BuyButton from "@/components/BuyButton";
import { getProgramBySlug, getReadyDayCount, ACCELERATOR_TOTAL_DAYS } from "@/lib/cms";

export const metadata: Metadata = {
  title: "14-Day Career Accelerator | Visgrow Adelaide",
  description:
    "A structured 14-day sprint from stuck to job-ready — mindset, personal brand, resume, LinkedIn, interview skills and the hidden job market, one focused day at a time.",
  alternates: { canonical: "/students-graduates/14-day-accelerator" },
};

const pains = [
  {
    icon: "🌀",
    title: "You keep starting and stopping",
    body: "A burst of applications on Sunday night, then nothing for two weeks. Not laziness — just no structure holding you to it.",
  },
  {
    icon: "🤷",
    title: "You don't know what to fix first",
    body: "Resume? LinkedIn? Interviews? Networking? Everyone gives different advice, so you end up half-doing all of it.",
  },
  {
    icon: "📉",
    title: "Motivation runs out before results arrive",
    body: "Job searching gives you rejection long before it gives you wins. Willpower alone can't survive that gap.",
  },
];

const benefits = [
  {
    title: "One job per day, not a to-do list",
    body: "Each day has a single focus. You always know what today's work is, which is why people actually finish this.",
  },
  {
    title: "Daily check-ins keep you honest",
    body: "Structure plus accountability. It's much harder to quietly drop off when someone's expecting you tomorrow.",
  },
  {
    title: "Everything rebuilt, not tweaked",
    body: "Resume, LinkedIn, cover letter and your 30-second pitch — all reworked properly across the fortnight.",
  },
  {
    title: "A mock interview on Day 14",
    body: "You finish by proving it out loud, with honest feedback, so you walk into the real thing having already done it once.",
  },
];

const consequences = [
  "\"I'll start properly next week\" is how most job searches quietly stall for another three months.",
  "Every fortnight you spend figuring it out alone is a fortnight someone with a plan gets ahead of you.",
  "The longer the gap on your resume sits unexplained, the more explaining it takes.",
];

const compareRows = [
  { label: "Format", coaching: "Ongoing, flexible sessions", accelerator: "Structured 14-day sprint" },
  { label: "Best for", coaching: "Deeper, longer-term support", accelerator: "Fast momentum, right now" },
  { label: "Pace", coaching: "You set the pace", accelerator: "We set the pace, together" },
  { label: "Accountability", coaching: "Session to session", accelerator: "Daily check-ins" },
  { label: "Outcome", coaching: "Long-term career strategy", accelerator: "Job-ready in a fortnight" },
];

const testimonials = [
  {
    quote:
      "Mustafa is extremely supportive and professional. I really like his training sessions, especially the LinkedIn one — he taught me how to reach out to people professionally.",
    name: "Duc Anh Nguyen",
    role: "Career Coaching Client",
  },
  {
    quote:
      "I'd definitely recommend Visgrow — not just a career advisor, but a good friend who helped me grow further in my career.",
    name: "Mohsin Navodiya",
    role: "Business Intern",
  },
];

const faqs = [
  {
    q: "How much time does it take each day?",
    a: "Around an hour a day for fourteen days. It's designed to fit around study or work — the point is consistency, not marathon sessions.",
  },
  {
    q: "What if I miss a day?",
    a: "You pick it up the next day. Life happens and we'd rather you finish late than quit. The structure exists to pull you back, not to punish you.",
  },
  {
    q: "Is this pre-recorded content?",
    a: "No. The modules are structured, but it's delivered live with your coach, with daily check-ins and feedback on your actual resume, LinkedIn and answers — not a video library you watch alone.",
  },
  {
    q: "Will I have a job at the end of 14 days?",
    a: "Almost certainly not, and we won't pretend otherwise. Fourteen days makes you job-ready — resume, profile, pitch and interview technique all sorted. How quickly an offer follows depends on your field, the market and how hard you push after.",
  },
  {
    q: "Can I do this and an internship?",
    a: "Yes, and many do. The Accelerator makes you ready; a Visgrow-Hosted Internship gives you the local experience to prove it. Most people do the Accelerator first.",
  },
];

export default async function AcceleratorPage() {
  const copy = await getPageCopy("/students-graduates/14-day-accelerator");
  // The price is read from the CMS so the button carries the real number.
  const program = await getProgramBySlug("14-day-accelerator");
  const price = (program?.price ?? "").trim();
  // Recorded program: only offer instant paid access once all 14 days exist.
  const readyDays = await getReadyDayCount();
  const canStartToday = readyDays >= ACCELERATOR_TOTAL_DAYS;
  const cms_pains = list(copy?.pain?.items, pains);
  const cms_benefits = list(copy?.benefits?.items, benefits);
  const cms_consequences = texts(copy?.consequences?.items, consequences);
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">14-Day Career Accelerator</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[1.5px]">
                Signature Program
              </span>

              <h1 className="mb-6 text-[clamp(34px,5vw,58px)] leading-[1.02]">
                {t(copy?.hero?.heading, "14 days to clarity, confidence and momentum.")}
              </h1>

              <p className="mb-9 max-w-[540px] text-[17px] leading-[1.65] text-white/90">
                Not another course you&apos;ll abandon by day three. A
                structured, coached sprint from stuck to job-ready — mindset,
                personal brand, resume, LinkedIn, interviews and the hidden job
                market, one focused day at a time.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#roadmap"
                  className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1"
                >
                  See all 14 days →
                </Link>
                <Link
                  href="/#pricing"
                  className="rounded-xl border-2 border-white/70 px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
                >
                  View Pricing
                </Link>
              </div>
            </div>

            <div className="rounded-[20px] border border-[var(--color-line)] bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
              <p className="mb-4 text-[12.5px] font-extrabold uppercase tracking-[1.2px] text-brand-sub">
                The roadmap
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  "Mindset & Goals — Days 1–3",
                  "Your Story & Brand — Days 4–5",
                  "Resume, LinkedIn & Cover Letter — Days 6–8",
                  "Interview & Communication — Days 9–10",
                  "Networking & Hidden Job Market — Days 11–13",
                  "Mock Interview & Launch — Day 14",
                ].map((s) => (
                  <div key={s} className="rounded-xl bg-brand-lavender px-4 py-3 text-[13.5px] font-semibold text-[var(--color-ink)]">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 1 · PAIN ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ac-pain">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.pain?.eyebrow, "Why you're still stuck")}
            </span>
            <h2 id="ac-pain" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.pain?.heading, "You don't have a knowledge problem. You have a structure problem.")}
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              You&apos;ve read the articles and watched the videos. Knowing
              what to do has never been the hard part.
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
      <section className="bg-brand-deep py-20 text-white reveal" aria-labelledby="ac-importance">
        <div className="mx-auto max-w-[900px] px-6 text-center lg:px-10">
          <span className="mb-4 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-orange">
            {t(copy?.importance?.eyebrow, "Why fourteen days")}
          </span>
          <h2 id="ac-importance" className="mb-6 text-[clamp(30px,3.8vw,46px)]">
            {t(copy?.importance?.heading, "Momentum beats motivation. A deadline beats a maybe.")}
          </h2>
          <p className="mx-auto max-w-[680px] text-[16.5px] leading-[1.7] text-white/85">
            Open-ended job searching drifts, because nothing is ever due. Two
            weeks is long enough to rebuild everything properly and short
            enough that you can actually see the end from where you&apos;re
            standing.
          </p>
        </div>
      </section>

      {/* ============ 3 · BENEFITS ============ */}
      <section className="bg-brand-lavender py-24 reveal" aria-labelledby="ac-benefits">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.benefits?.eyebrow, "What makes this work")}
            </span>
            <h2 id="ac-benefits" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.benefits?.heading, "Built so you finish it.")}
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
        </div>
      </section>

      {/* ============ 4 · CONSEQUENCES ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ac-consequences">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          <div className="mb-10 max-w-[680px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.consequences?.eyebrow, "The cost of waiting")}
            </span>
            <h2 id="ac-consequences" className="text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
              {t(copy?.consequences?.heading, "Your next fortnight is going to pass either way.")}
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
      <section className="bg-brand-gradient py-24 text-white reveal" aria-labelledby="ac-results">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-white/80">
              {t(copy?.results?.eyebrow, "People who did it")}
            </span>
            <h2 id="ac-results" className="text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.results?.heading, "Same market. Different approach.")}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
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

      {/* ============ 6 · HOW — INTERACTIVE ROADMAP ============ */}
      <section id="roadmap" className="scroll-mt-24 bg-brand-lavender py-24 reveal" aria-labelledby="ac-how">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.how?.eyebrow, "How it works")}
            </span>
            <h2 id="ac-how" className="mb-4 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.how?.heading, "Click through what your 14 days look like.")}
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              This is the real curriculum, day by day. Complete a day to unlock
              the next one — exactly how the program runs.
            </p>
          </div>
          <AcceleratorTracker />
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ac-compare">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          <div className="mb-11 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Not sure which fits
            </span>
            <h2 id="ac-compare" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              Accelerator vs. ongoing coaching.
            </h2>
          </div>

          <p className="mb-3 text-[13px] font-semibold text-brand-purple sm:hidden">
            Swipe the table sideways to compare →
          </p>

          <div className="overflow-x-auto rounded-[18px] border border-[var(--color-line)]">
            <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-brand-lavender">
                  <th scope="col" className="px-6 py-4 font-extrabold text-[var(--color-ink)]">&nbsp;</th>
                  <th scope="col" className="px-6 py-4 font-extrabold text-[var(--color-ink)]">Ongoing Coaching</th>
                  <th scope="col" className="px-6 py-4 font-extrabold text-brand-purple">14-Day Accelerator</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-brand-lavender/40"}>
                    <th scope="row" className="px-6 py-4 text-left font-bold text-[var(--color-ink)]">{row.label}</th>
                    <td className="px-6 py-4 text-brand-sub">{row.coaching}</td>
                    <td className="px-6 py-4 font-semibold text-[var(--color-ink)]">{row.accelerator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-brand-deep py-24 text-white reveal">
        <div className="mx-auto max-w-[760px] px-6 text-center lg:px-10">
          <h2 className="mb-6 text-[clamp(30px,3.8vw,46px)]">
            {t(copy?.cta?.heading, "Fourteen days from now, you could be ready.")}
          </h2>
          <p className="mb-10 text-[16.5px] leading-[1.7] text-white/85">
            Or fourteen days from now you could be exactly where you are today,
            having sent another twenty applications into the same silence.
            That&apos;s honestly the whole decision.
          </p>
          {/* One primary action carrying the real price, one for people who
              want a human first. Two identical white buttons that both meant
              "start" made the reader choose between synonyms. */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {canStartToday ? (
              <>
                <BuyButton
                  programSlug="14-day-accelerator"
                  label="Pay and start today"
                  price={price || undefined}
                  variant="onDark"
                />
                <Link
                  href="/get-started?program=accelerator"
                  className="rounded-xl border-2 border-white/60 px-9 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
                >
                  Talk to someone first
                </Link>
              </>
            ) : (
              <Link
                href="/get-started?program=accelerator"
                className="rounded-xl bg-white px-9 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_16px_36px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1"
              >
                Join the next intake{price ? ` — ${price}` : ""}
              </Link>
            )}
          </div>

          {!canStartToday && (
            <p className="mt-5 text-[13.5px] leading-relaxed text-white/75">
              Places are taken one intake at a time so every day gets proper
              attention. Tell us you&apos;re interested and we&apos;ll confirm
              your start date before you pay anything.
            </p>
          )}

          <p className="mt-7 text-[14px] leading-relaxed text-white/75">
            Not ready for either?{" "}
            <Link
              href="/masterclass"
              className="font-bold text-white underline underline-offset-4 hover:text-brand-orange"
            >
              Watch the free masterclass
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
