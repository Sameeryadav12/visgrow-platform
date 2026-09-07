import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { getPageCopy, t, list, texts } from "@/lib/page-copy";

export const metadata: Metadata = {
  title: "About Visgrow & Mustafa Kadir | Career Coaching Adelaide",
  description:
    "Visgrow is an Adelaide-based career coaching, internship and workshop provider founded by Mustafa Kadir — built to close the gap between education and employment.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: "🎯",
    title: "We tell you the truth",
    body: "Even when it's not what you hoped for, and even when the honest answer is that you don't need to buy anything from us.",
  },
  {
    icon: "🚫",
    title: "We never promise a job",
    body: "Nobody can honestly guarantee an offer. We build everything that makes one likely, and we're upfront that the rest isn't ours to control.",
  },
  {
    icon: "🤝",
    title: "We do the work with you",
    body: "Not a course you watch alone. Real sessions, real feedback, and someone who notices when you go quiet.",
  },
  {
    icon: "🌏",
    title: "Local experience, genuinely local",
    body: "Adelaide-based, working Australia-wide, with real connections in the market our clients are trying to enter.",
  },
];

const milestones = [
  {
    k: "The problem",
    v: "Graduates leaving university technically capable and professionally unprepared — with nobody responsible for the gap.",
  },
  {
    k: "The founding",
    v: "Visgrow started to do what universities weren't resourced to do: coach people individually into being genuinely job-ready.",
  },
  {
    k: "Today",
    v: "Career coaching, Visgrow-hosted internships and workshop programs, delivered to students, employers and education partners.",
  },
];

const testimonials = [
  {
    quote:
      "As an international graduate it wasn't easy without local experience. Mustafa guided me and introduced me to professionals in the IT sector.",
    name: "Chamila Jayathilake",
    role: "IT Graduate",
  },
  {
    quote:
      "I'd definitely recommend Visgrow — not just a career advisor, but a good friend who helped me grow further in my career.",
    name: "Mohsin Navodiya",
    role: "Business Intern",
  },
  {
    quote:
      "Mustafa is extremely supportive and professional. I really like his training sessions, especially the LinkedIn one — he taught me how to reach out to people professionally.",
    name: "Duc Anh Nguyen",
    role: "Career Coaching Client",
  },
  {
    quote:
      "I was able to land an internship with a global organisation working on AI models, all thanks to Mustafa.",
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

export default async function AboutPage() {
  const copy = await getPageCopy("/about");
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">About</span>
          </nav>

          <h1 className="mb-5 max-w-[820px] text-[clamp(32px,4.6vw,56px)] leading-[1.04]">
            {t(copy?.hero?.heading, "We exist because a degree stopped being enough, and nobody told students.")}
          </h1>
          <p className="max-w-[620px] text-[16.5px] leading-[1.65] text-white/90">
            Visgrow is an Adelaide-based career coaching, internship and
            workshop provider — built to close the gap between finishing your
            education and actually being employable.
          </p>
        </div>
      </section>

      {/* ============ WHY WE EXIST ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ab-why">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
                {t(copy?.hero?.eyebrow, "Why we exist")}
              </span>
              <h2 id="ab-why" className="mb-6 text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
                The system hands you a qualification and wishes you luck.
              </h2>
              <div className="flex flex-col gap-4 text-[15.5px] leading-[1.75] text-brand-sub">
                <p>
                  Universities are measured on teaching, not on employment.
                  Careers departments are stretched across thousands of
                  students and can only offer general advice — which works for
                  some people and quietly fails a lot of others.
                </p>
                <p>
                  So graduates leave with the qualification they were told to
                  get, and discover that nobody ever taught them how hiring
                  actually works: that most roles are never advertised, that
                  screening software reads your resume before a human does,
                  that the interview is a skill and not a personality test.
                </p>
                <p>
                  Visgrow was founded to do the part nobody else was doing —
                  sit with people individually, find the specific thing
                  standing in their way, and fix it.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {milestones.map((m) => (
                <div key={m.k} className="rounded-[18px] border-l-4 border-brand-purple bg-brand-lavender p-6">
                  <span className="mb-2 block text-[12px] font-extrabold uppercase tracking-[1.4px] text-brand-purple">
                    {m.k}
                  </span>
                  <p className="text-[14.5px] leading-[1.65] text-[var(--color-ink)]">{m.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOUNDER ============ */}
      <section id="founder" className="scroll-mt-24 bg-brand-gradient py-24 text-white reveal" aria-labelledby="ab-founder">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] border-4 border-white/25 shadow-[0_28px_64px_rgba(0,0,0,0.28)] lg:aspect-[4/5]">
              <Image
                src="/images/mustafa-kadir.jpg"
                alt="Mustafa Kadir, Founder and Managing Director of Visgrow"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-center"
                priority
              />
            </div>

            <div>
              <span className="mb-4 block text-[13px] font-extrabold uppercase tracking-[2px] text-[#F6A83D]">
                Founder profile
              </span>
              <h2 id="ab-founder" className="mb-6 text-[clamp(30px,3.8vw,46px)]">
                Mustafa Kadir
              </h2>

              <div className="mb-8 flex flex-col gap-4 text-[15.5px] leading-[1.75] text-white/90">
                <p>
                  Mustafa has worked as an IT engineer, consultant and general
                  manager across organisations of every size — which means
                  he&apos;s been the candidate, the manager, and the person
                  deciding who gets shortlisted.
                </p>
                <p>
                  He&apos;s landed roles without formally applying, held
                  multiple board positions, and served as Vice President of
                  ASP. He sits on ACS board positions and the Australia Day
                  Council committee, and Visgrow operates from Adelaide&apos;s
                  innovation precincts.
                </p>
                <p>
                  None of that is the point, though. The point is that he
                  remembers how demoralising the job search is, and he built
                  Visgrow so people don&apos;t have to work it out alone.
                </p>
              </div>

              <blockquote className="mb-8 border-l-4 border-white/40 pl-6 text-[clamp(19px,2.2vw,26px)] leading-[1.35]" style={{ fontFamily: "var(--font-heading)" }}>
                &ldquo;I understand how frustrating it is to become employed in
                this competitive job market — because I&apos;ve lived it, on
                both sides of the hiring table.&rdquo;
              </blockquote>

              <ul className="flex flex-wrap gap-3">
                {[
                  "20+ Years Industry Experience",
                  "Former VP, ASP",
                  "ACS Board Member",
                  "Australia Day Council Committee",
                  "20,000+ LinkedIn Followers",
                ].map((b) => (
                  <li key={b} className="rounded-[10px] border border-white/30 bg-white/15 px-4 py-2.5 text-[12.5px] font-bold">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROOF OF THE WORK ============ */}
      {/* The About page had one photo on it — a studio portrait — while the
          entire argument of the page is "we are real and we do this". These
          are actual Visgrow sessions. Until employer and institution
          testimonials arrive, this is the evidence. */}
      <section className="bg-white py-24 reveal" aria-labelledby="ab-gallery">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[720px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Where the work happens
            </span>
            <h2 id="ab-gallery" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              Not a website with a phone number behind it.
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              Sessions run with universities, TAFE, industry bodies and
              employers across Adelaide — in rooms, with real cohorts, most
              months of the year.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "uoa-bright-futures.jpg", cap: "University of Adelaide — Bright Futures cohort" },
              { src: "acs-session.jpg", cap: "Personal branding session with ACS" },
              { src: "issua-full-room.jpg", cap: "A full room of students, mid-session" },
              { src: "pmi-presenting.jpg", cap: "Delivering to a professional audience" },
              { src: "study-adelaide-group.jpg", cap: "Study Adelaide student group" },
              { src: "corporate-team-session.jpg", cap: "On-site with a client team" },
            ].map((g) => (
              <figure
                key={g.src}
                className="group relative h-[230px] overflow-hidden rounded-[16px] border border-[var(--color-line)]"
              >
                <Image
                  src={`/images/real/${g.src}`}
                  alt={g.cap}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(36,26,51,0.92),transparent)] p-4 text-[12.5px] font-bold leading-snug text-white">
                  {g.cap}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="bg-brand-lavender py-24 reveal" aria-labelledby="ab-values">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[680px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              How we work
            </span>
            <h2 id="ab-values" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              Four things we won&apos;t compromise on.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <span aria-hidden="true" className="mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-brand-lavender text-[20px]">
                  {v.icon}
                </span>
                <h3 className="mb-2.5 text-[16.5px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
                  {v.title}
                </h3>
                <p className="text-[13.5px] leading-[1.65] text-brand-sub">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ab-testimonials">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-11 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              In their words
            </span>
            <h2 id="ab-testimonials" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              The people we&apos;ve worked with.
            </h2>
          </div>
        </div>
        <TestimonialCarousel items={testimonials} />
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-brand-deep py-24 text-white reveal">
        <div className="mx-auto max-w-[760px] px-6 text-center lg:px-10">
          <h2 className="mb-5 text-[clamp(28px,3.6vw,42px)]">
            {t(copy?.cta?.heading, "Whatever you're facing, someone here has seen it before.")}
          </h2>
          <p className="mb-10 text-[16.5px] leading-[1.7] text-white/85">
            Start with the free masterclass, or tell us where you&apos;re
            stuck and we&apos;ll give you a straight answer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-started"
              className="rounded-xl bg-white px-9 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_16px_36px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1"
            >
              Get started with Visgrow
            </Link>
            <Link
              href="/masterclass"
              className="rounded-xl border-2 border-white/60 px-9 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
            >
              Watch the free masterclass
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
