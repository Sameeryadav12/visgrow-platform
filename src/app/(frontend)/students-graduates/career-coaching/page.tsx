import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import { getPageCopy, t, list, texts } from "@/lib/page-copy";

export const metadata: Metadata = {
  title: "Career Coaching for Students & Graduates | Visgrow Adelaide",
  description:
    "Career Strategy & Gap Analysis, an ATS-ready resume, a LinkedIn profile that gets engagement and interview coaching that builds real confidence. Adelaide-based career coaching.",
  alternates: { canonical: "/students-graduates/career-coaching" },
};

const pains = [
  {
    icon: "📄",
    title: "Your resume is a template everyone else is using",
    body: "Downloaded from your uni careers page or the first Google result. It doesn't pass ATS screening, and it never says why you specifically are worth hiring.",
  },
  {
    icon: "🔍",
    title: "You're only seeing the jobs that got advertised",
    body: "Job boards only show you the roles that made it to a job board. A large share never do — they get filled through people, before anything is posted.",
  },
  {
    icon: "😶",
    title: "\"Tell me about yourself\" freezes you",
    body: "You ramble, or you recite your resume back at them. Either way, you've lost the room in the first ninety seconds.",
  },
  {
    icon: "⏳",
    title: "You've been told you need PR first",
    body: "You don't. But you do need a strategy that accounts for how Australian employers actually screen — and nobody's given you one.",
  },
];

const benefits = [
  {
    title: "Career Strategy & Gap Analysis",
    body: "We start by finding the actual problem — resume, positioning, LinkedIn, interview technique, or the roles you're targeting. You can't fix what nobody's diagnosed.",
  },
  {
    title: "A resume that survives the first scan",
    body: "ATS-compatible, correctly formatted, results-driven achievement statements — built so the first thing a recruiter's eye lands on is the reason to call you.",
  },
  {
    title: "LinkedIn that works while you sleep",
    body: "SEO keywords recruiters actually search, a profile summary that reads like a person, and a strategy for getting into the right feeds.",
  },
  {
    title: "Interview coaching using the SAR technique",
    body: "Structured answers to behavioural, competency and situational questions — practised out loud with honest feedback until they're sharp.",
  },
  {
    title: "A 30-second pitch that isn't boring",
    body: "Who you are, the value you bring, and why you care — in the time it takes to shake someone's hand at an event.",
  },
  {
    title: "A way into the hidden job market",
    body: "How to find decision-makers, approach them professionally, and use alumni and industry networks without feeling like you're begging.",
  },
];

const consequences = [
  "You keep competing for the same advertised roles, with the same template resume as everyone else in your cohort.",
  "Visa and migration timelines keep running while you wait for replies that were never coming.",
  "Confidence quietly drains away — and interviewers can hear it in your voice before you've answered anything.",
];

const steps = [
  {
    n: "01",
    title: "Career Strategy & Gap Analysis",
    body: "A 60–90 minute session where we audit everything and tell you honestly what's actually holding you back.",
  },
  {
    n: "02",
    title: "Rebuild your assets",
    body: "Resume, LinkedIn, cover letter and your 30-second pitch — reworked properly, not tinkered with.",
  },
  {
    n: "03",
    title: "Practise until it's natural",
    body: "Mock interviews with direct feedback. We keep going until your answers are sharp and sound like you.",
  },
  {
    n: "04",
    title: "Go after the hidden market",
    body: "We show you how to reach the roles that never get advertised — and how to be worth remembering.",
  },
];

const testimonials = [
  {
    quote:
      "Mustafa is driven to provide mentorship to graduates to better their visibility in the job market by perfecting and tailoring their resume, their LinkedIn profile, and even provide one-on-one sessions for career growth and interview preparation. I was able to land an internship with a global organisation working on AI models, all thanks to Mustafa.",
    name: "Nalin Gupta",
    role: "Graduate, Risk Advisory — Deloitte",
  },
  {
    quote:
      "I would strongly recommend Visgrow to all fresh graduates and final year students. Mustafa's career suggestions are really helpful. The resume process is different and way better than conventional resume companies. The interview prep session is very beneficial for a strong professional career.",
    name: "Shuvankeet Nandi",
    role: "Mechanical Engineer — Mayne Pharma",
  },
  {
    quote:
      "Mustafa is extremely supportive and professional. I really like his training sessions, especially the LinkedIn one — he taught me how to reach out to people professionally.",
    name: "Duc Anh Nguyen",
    role: "Career Coaching Client",
  },
];

const faqs = [
  {
    q: "How is this different from a resume-writing service?",
    a: "A resume service sells you a document. We diagnose why you're being passed over first — and often the resume isn't the main problem. You get the document too, but built on an actual strategy rather than a template swap.",
  },
  {
    q: "Should I do coaching or the 14-Day Accelerator?",
    a: "Coaching is open-ended and paced around you. The Accelerator is a structured 14-day sprint with a deadline that creates momentum — most people who feel stuck rather than confused do better with the Accelerator. If you're unsure, the Gap Analysis will tell you which one fits.",
  },
  {
    q: "Will you apply for jobs on my behalf?",
    a: "No. We build the strategy, the assets and the confidence — you do the applying. Anyone offering to apply for you is selling volume, and volume is exactly what isn't working for you right now.",
  },
  {
    q: "I'm an international student. Does this actually work for me?",
    a: "Yes — a large portion of our clients are international students and graduates. You don't need PR to be hired here, but you do need to understand how Australian employers screen, what they're nervous about, and how to address it before they raise it.",
  },
  {
    q: "What if I've already had my resume professionally written?",
    a: "Bring it. We'll tell you honestly whether it's working. Sometimes it's fine and the real gap is interview technique or targeting — in which case we won't charge you to rewrite something that doesn't need rewriting.",
  },
];

export default async function CareerCoachingPage() {
  const copy = await getPageCopy("/students-graduates/career-coaching");
  const cms_pains = list(copy?.pain?.items, pains);
  const cms_benefits = list(copy?.benefits?.items, benefits);
  const cms_consequences = texts(copy?.consequences?.items, consequences);
  const cms_steps = list(copy?.how?.steps, steps);
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Career Coaching</span>
          </nav>

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[1.5px]">
            Pillar 01 · Career Coaching
          </span>

          <h1 className="mb-6 max-w-[820px] text-[clamp(34px,5vw,60px)] leading-[1.02]">
            {t(copy?.hero?.heading, "Your degree proved you can study. Nobody taught you how to get hired.")}
          </h1>

          <p className="mb-9 max-w-[580px] text-[17px] leading-[1.65] text-white/90">
            Career Strategy &amp; Gap Analysis, a resume that survives ATS, a
            LinkedIn profile that gets engagement, and interview coaching that
            builds genuine confidence — from someone who has sat on the hiring
            side of the table.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#what-you-get"
              className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1"
            >
              See what&apos;s included →
            </Link>
            <Link
              href="/students-graduates/14-day-accelerator"
              className="rounded-xl border-2 border-white/70 px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
            >
              Compare to the 14-Day Accelerator
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 1 · PAIN ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="cc-pain">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.pain?.eyebrow, "Let's be honest")}
            </span>
            <h2 id="cc-pain" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.pain?.heading, "Here's why your job search isn't working.")}
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              It usually isn&apos;t effort. Most people we meet are applying
              constantly — they&apos;re just doing it inside a system nobody
              explained to them.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {cms_pains.map((p) => (
              <div key={p.title} className="flex items-start gap-4 rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <span
                  aria-hidden="true"
                  className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[13px] bg-brand-lavender text-[20px]"
                >
                  {p.icon}
                </span>
                <span>
                  <strong className="mb-1.5 block text-[16.5px] font-extrabold text-[var(--color-ink)]">
                    {p.title}
                  </strong>
                  <span className="block text-[14.5px] leading-[1.6] text-brand-sub">
                    {p.body}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 2 · IMPORTANCE ============ */}
      <section className="bg-brand-deep py-20 text-white reveal" aria-labelledby="cc-importance">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 lg:grid-cols-[1fr_auto] lg:px-10">
          <div>
            <span className="mb-4 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-orange">
              {t(copy?.importance?.eyebrow, "Why this matters")}
            </span>
            <h2 id="cc-importance" className="mb-6 max-w-[620px] text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.importance?.heading, "How you search matters more than how hard you search.")}
            </h2>
            <p className="max-w-[620px] text-[16.5px] leading-[1.7] text-white/85">
              Two graduates with identical degrees get completely different
              outcomes, and it&apos;s rarely about grades. One is visible to
              the right people with the right positioning. The other is
              applying into a black hole. That difference is learnable — and
              it&apos;s the entire job of coaching.
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-4 lg:w-[340px]">
            {[
              { k: "Unadvertised", v: "Many roles are filled through people before they're ever posted." },
              { k: "Screened", v: "Software reads your resume before a person does." },
              { k: "Seconds", v: "That's how long the first pass over your resume lasts." },
              { k: "Minutes", v: "That's how long an interview room takes to form a view." },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <div className="text-[26px] leading-none text-[#F6A83D]" style={{ fontFamily: "var(--font-heading)" }}>
                  {s.k}
                </div>
                <p className="mt-2 text-[11.5px] font-semibold leading-snug text-white/80">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3 · BENEFITS ============ */}
      <section id="what-you-get" className="scroll-mt-24 bg-brand-lavender py-24 reveal" aria-labelledby="cc-benefits">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.benefits?.eyebrow, "What you actually get")}
            </span>
            <h2 id="cc-benefits" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.benefits?.heading, "Six things that change the outcome.")}
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              Not a course you watch. One-on-one work on the specific things
              standing between you and an offer.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cms_benefits.map((b) => (
              <div key={b.title} className="rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <div className="icon-check" aria-hidden="true">✓</div>
                <h3 className="mb-2.5 text-[17px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
                  {b.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-brand-sub">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4 · CONSEQUENCES ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="cc-consequences">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
                {t(copy?.consequences?.eyebrow, "What happens if nothing changes")}
              </span>
              <h2 id="cc-consequences" className="mb-7 text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
                {t(copy?.consequences?.heading, "Another six months of the same approach gives you the same result.")}
              </h2>
              <ul className="flex flex-col gap-4">
                {cms_consequences.map((c) => (
                  <li key={c} className="rounded-[16px] border-l-4 border-brand-pink bg-[#fff5f7] p-5 text-[14.5px] leading-[1.6] text-[var(--color-ink)]">
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[20px] border-2 border-brand-purple bg-white p-8">
              <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[1.5px] text-brand-pink">
                Worth doing the maths
              </p>
              <p className="mb-5 text-[15px] leading-[1.7] text-brand-sub">
                Work out what the role you&apos;re aiming for pays, and divide
                it by twelve. That number is what another month of not getting
                hired quietly costs you.
              </p>
              <p className="text-[15px] leading-[1.7] text-brand-sub">
                Now compare it to what it would cost to stop guessing. That
                isn&apos;t a sales line — it&apos;s{" "}
                <strong className="text-[var(--color-ink)]">
                  the one piece of arithmetic most people never do
                </strong>
                , and it&apos;s usually the reason they wait another six months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5 · RESULTS ============ */}
      <section className="bg-brand-gradient py-24 text-white reveal" aria-labelledby="cc-results">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-white/80">
              {t(copy?.results?.eyebrow, "People who were exactly where you are")}
            </span>
            <h2 id="cc-results" className="text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.results?.heading, "They weren't special. They just stopped guessing.")}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-[18px] border border-white/20 bg-white/10 p-7 backdrop-blur">
                <div className="mb-4 text-[13px] tracking-[3px] text-[#F6A83D]" aria-hidden="true">
                  ★★★★★
                </div>
                <blockquote className="mb-6 flex-1 text-[14px] leading-[1.7] text-white/90">
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
      <section className="bg-white py-24 reveal" aria-labelledby="cc-how">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.how?.eyebrow, "How it works")}
            </span>
            <h2 id="cc-how" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.how?.heading, "Four steps. No mystery.")}
            </h2>
          </div>

          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cms_steps.map((s, i) => (
              <li key={String(i + 1).padStart(2, "0")} className="rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
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

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/#pricing"
              className="rounded-xl border-2 border-brand-purple px-8 py-4 text-[14.5px] font-extrabold text-brand-purple transition-colors hover:bg-brand-purple hover:text-white"
            >
              See pricing &amp; compare programs →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-brand-lavender py-24 reveal" aria-labelledby="cc-faq">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <div className="mb-11">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Before you ask
            </span>
            <h2 id="cc-faq" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              The questions we get every week.
            </h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-brand-deep py-24 text-white reveal">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] border border-white/25">
            <Image
              src="/images/mustafa-kadir.jpg"
              alt="Mustafa Kadir, Founder of Visgrow"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover object-center"
            />
          </div>
          <div>
            <h2 className="mb-5 text-[clamp(28px,3.6vw,42px)]">
              {t(copy?.cta?.heading, "Start by finding out what's actually wrong.")}
            </h2>
            <p className="mb-9 text-[16px] leading-[1.7] text-white/85">
              The Career Strategy &amp; Gap Analysis is a single session. You
              leave knowing exactly why you&apos;re being passed over and what
              to do about it — and an honest recommendation on what you need
              next, even if that&apos;s nothing from us.
            </p>
            {/* This is the coaching page. Someone who has read all of it and
                wants coaching must not have to go and read a second page
                before they can say so — that was the primary action here, and
                it was buried in a text link. Diagnose-first stays available as
                the honest second option, which is where it belongs. */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/get-started?program=coaching"
                className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-1"
              >
                Start Career Coaching
              </Link>
              <Link
                href="/students-graduates/career-strategy-gap-analysis"
                className="rounded-xl border-2 border-white/60 px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
              >
                Not sure yet? Start with a Gap Analysis
              </Link>
            </div>

            <p className="mt-6 text-[14px] leading-relaxed text-white/75">
              Not ready to talk to anyone?{" "}
              <Link
                href="/masterclass"
                className="font-bold text-white underline underline-offset-4 hover:text-brand-orange"
              >
                Watch the free masterclass first
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
