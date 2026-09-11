import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import CountUp from "@/components/CountUp";
import FaqAccordion from "@/components/FaqAccordion";
import EnquiryForm from "@/components/EnquiryForm";
import WaitingCost from "@/components/WaitingCost";
import GoogleReviews from "@/components/GoogleReviews";
import {
  getSiteSettings,
  getCompanyLogos,
  getFaqs,
  getPrograms,
  getTestimonials,
  logoSrc,
} from "@/lib/cms";
import { getHomeCopy, homeDefaults, pick, pickList } from "@/lib/home-copy";
import { FaqSchema, OrganisationSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title:
    "Career Coaching, Internships & Workshops for Students | Visgrow Adelaide",
  description:
    "Stop getting your resume rejected. Visgrow gives students and graduates career strategy, real local work experience and interview confidence. Adelaide-based, Australia-wide.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Visgrow | Career Coaching, Internships & Academy",
    description:
      "Career strategy, hosted internships and workshops that help students and graduates become genuinely job-ready.",
    type: "website",
    locale: "en_AU",
  },
};

const clientLogos = [
  { file: "pwc.png", name: "PwC" },
  { file: "deloitte.png", name: "Deloitte" },
  { file: "redarc.png", name: "REDARC" },
  { file: "mayne-pharma.png", name: "Mayne Pharma" },
  { file: "cfs.png", name: "Country Fire Service" },
  { file: "aussie-home-loans.png", name: "Aussie Home Loans" },
  { file: "aurecon.png", name: "Aurecon" },
  { file: "dialog.png", name: "Dialog Information Technology" },
  { file: "relationships-australia.png", name: "Relationships Australia SA" },
  { file: "sa-energy-mining.png", name: "SA Department for Energy and Mining" },
  { file: "tax-store.png", name: "Tax Store" },
  { file: "sa-nt-datalink.png", name: "SA-NT DataLink" },
  { file: "kiratech.png", name: "Kiratech" },
  { file: "komplete-care.png", name: "KompleteCare" },
  { file: "gba-projects.png", name: "GBA Projects" },
  { file: "equals-international.png", name: "Equals International" },
];

const pains = [
  {
    icon: "😟",
    title: "Rejected again — or worse, ignored",
    body: "You've rewritten the resume a dozen times. Still no interviews. Often, not even a reply.",
  },
  {
    icon: "⏳",
    title: "The clock is running",
    body: "Your visa has a deadline. Your migration agent keeps asking. Every month without an offer costs you options you can't get back.",
  },
  {
    icon: "🔒",
    title: "No local experience",
    body: "Every role wants experience. Nobody wants to give you the first chance to get it.",
  },
  {
    icon: "📵",
    title: "LinkedIn goes nowhere",
    body: "You post, you connect, you apply. Nothing moves. Nobody engages.",
  },
  {
    icon: "🎓",
    title: "The degree wasn't enough",
    body: "You did everything they told you to do. Nobody mentioned this part.",
  },
  {
    icon: "🙃",
    title: "Everyone else seems to be getting hired",
    body: "You're happy for them. You're also quietly wondering what they know that you don't.",
  },
];

const importanceStats = [
  { k: "Most", v: "roles are filled before they're advertised" },
  { k: "Seconds", v: "is all your resume gets on the first pass" },
  { k: "1st", v: "impression decides the shortlist" },
  { k: "Early", v: "years set the trajectory of your career" },
];

const pillars = [
  {
    num: "01 — Coaching",
    title: "Career Coaching",
    body: "Career Strategy & Gap Analysis, a resume that survives ATS, and interview coaching that builds genuine confidence — plus our signature 14-Day Accelerator.",
    href: "/students-graduates/career-coaching",
    cta: "Explore Career Coaching",
  },
  {
    num: "02 — Internships",
    title: "Hosted Internships",
    body: "Real, local, Visgrow-hosted work experience — supervised by us, never outsourced to a stranger. The premium next step once you're coached and ready.",
    href: "/students-graduates/hosted-internships",
    cta: "See what's included →",
  },
  {
    num: "03 — Academy",
    title: "Skills & Workshops",
    body: "Practical workshops on personal branding, networking and the hidden job market — the skills employers actually notice and reward.",
    href: "/academy",
    cta: "View Workshops",
  },
];

const consequences = [
  "Months turn into a year. Confidence erodes. You start applying for anything — not the career you actually wanted.",
  "You take a job unrelated to your degree just to pay rent, and it gets harder to leave the longer you stay.",
  "Employers start asking about the gap. It gets harder to explain every month it grows.",
];

const stats = [
  { to: 1000, suffix: "+", label: "Students coached" },
  { to: 20, suffix: "+", label: "Years founder industry experience" },
  { to: 20000, suffix: "+", label: "Professional network" },
  { to: 14, suffix: "", label: "Modules in the Career Accelerator" },
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

const steps = [
  {
    n: "01",
    title: "Career Strategy & Gap Analysis",
    body: "We find the exact reason you're being passed over — before you spend money on anything else.",
  },
  {
    n: "02",
    title: "Choose your pathway",
    body: "Coaching, the 14-Day Accelerator, or a Hosted Internship — based on what you actually need.",
  },
  {
    n: "03",
    title: "Do the work, with us beside you",
    body: "Structured sessions, honest feedback, real accountability. Not a course you forget about.",
  },
  {
    n: "04",
    title: "Walk in ready",
    body: "You'll know your story, your value, and how to prove both in the room.",
  },
];

const plans = [
  {
    name: "Career Strategy & Gap Analysis",
    sub: "Start here",
    price: "",
    period: "Price being confirmed",
    features: [
      "60–90 min 1:1 strategy session",
      "Resume & LinkedIn audit",
      "Written action plan",
      "ATS compatibility check",
    ],
    href: "/students-graduates/career-strategy-gap-analysis",
    cta: "See what's included →",
    feat: false,
  },
  {
    name: "14-Day Career Accelerator",
    sub: "Clarity, confidence, momentum",
    price: "$999",
    period: "14 days",
    features: [
      "14 structured modules, one a day",
      "Daily coaching check-ins",
      "Resume + LinkedIn + cover letter rebuild",
      "Mock interview on Day 14",
    ],
    href: "/students-graduates/14-day-accelerator",
    cta: "See the 14 days →",
    feat: true,
  },
  {
    name: "Ongoing Career Coaching",
    sub: "Deeper, personalised support",
    price: "",
    period: "Price being confirmed",
    features: [
      "Fortnightly 1:1 sessions",
      "Unlimited resume revisions",
      "Ongoing interview prep",
      "Priority internship access",
    ],
    href: "/students-graduates/career-coaching",
    cta: "See what's included →",
    feat: false,
  },
  {
    name: "Visgrow-Hosted Internship",
    sub: "Real, local experience",
    price: "$3,499",
    period: "incl. coaching",
    features: [
      "Local, Visgrow-supervised placement",
      "Real client-facing projects",
      "Career coaching included",
      "Genuine reference on completion",
    ],
    href: "/students-graduates/hosted-internships",
    cta: "See what's included →",
    feat: false,
  },
];

const compareCols = [
  { key: "gap", name: "Gap Analysis", price: "Price being confirmed", feat: false },
  { key: "accel", name: "14-Day Accelerator", price: "$999 · 14 days", feat: true },
  { key: "coaching", name: "Ongoing Coaching", price: "Price being confirmed", feat: false },
  { key: "intern", name: "Hosted Internship", price: "$3,499 incl. coaching", feat: false },
];

const compareRows: { feature: string; values: (string | boolean)[] }[] = [
  {
    feature: "Best if you…",
    values: [
      "Want a straight answer first",
      "Want momentum, fast",
      "Want long-term support",
      "Have no local experience",
    ],
  },
  {
    feature: "Time commitment",
    values: ["One 60–90 min session", "14 days, ~1 hr a day", "6 months, fortnightly", "Ongoing placement"],
  },
  { feature: "Career Strategy & Gap Analysis", values: [true, true, true, true] },
  { feature: "ATS-ready resume rebuild", values: ["Audit only", true, "Unlimited revisions", true] },
  { feature: "LinkedIn optimisation", values: ["Audit only", true, "Unlimited revisions", true] },
  { feature: "Cover letter coaching", values: [false, true, true, true] },
  { feature: "Interview coaching", values: [false, "Mock interview", "Ongoing", true] },
  { feature: "Personal brand & elevator pitch", values: [false, true, true, true] },
  { feature: "Hidden job market access", values: [false, true, true, true] },
  { feature: "Real local work experience", values: [false, false, "Priority access", true] },
  { feature: "Reference on completion", values: [false, false, false, true] },
  { feature: "Payment plan available", values: [false, true, true, true] },
];

const faqs = [
  {
    q: "Will this guarantee me a job?",
    a: "No — and be careful of anyone who promises that. What we build with you is a career strategy, a resume that survives ATS screening, a LinkedIn profile that gets engagement, and the interview confidence that makes an offer far more likely. We build everything that makes a job likely. We can't build the offer itself.",
  },
  {
    q: "What exactly is a Career Strategy & Gap Analysis?",
    a: "A 60–90 minute one-on-one session where we audit your resume, LinkedIn and interview readiness, then identify the specific reason employers are passing on you. You leave with a written action plan — and an honest recommendation on which program fits your situation, even if that's none of ours.",
  },
  {
    q: "Do you work with international students?",
    a: "Yes — a large portion of our clients are international students and graduates. You don't need PR or citizenship to get hired here, but you do need a strategy that accounts for how Australian employers actually screen and hire. That's exactly what we build with you.",
  },
  {
    q: "How is the 14-Day Accelerator different from ongoing coaching?",
    a: "The Accelerator is a structured sprint — 14 modules, one per day, with a fixed deadline that creates momentum. Ongoing coaching is a 6-month program with fortnightly sessions for people who want sustained support as their situation evolves. Most people start with the Accelerator.",
  },
  {
    q: "Are your internships real work, or just shadowing?",
    a: "Real work. Visgrow-Hosted Internships are supervised by us directly — you'll work on actual client-facing deliverables, not observe someone else doing them. You finish with a portfolio piece and a genuine reference, not a certificate of attendance.",
  },
  {
    q: "I can't afford this right now. What are my options?",
    a: "Start with the Career Strategy & Gap Analysis — it's the lowest-cost entry point and often the highest-value hour you'll spend, because it tells you exactly what to fix. Payment plans are available on the larger programs; ask us when you enquire.",
  },
  {
    q: "How do I get started?",
    a: "Start with a conversation — no pressure and no sales pitch. Tell us where you're stuck and we'll tell you honestly what we think you need. Use the form at the bottom of this page, or call 1300 891 365.",
  },
];

export default async function Home() {
  const settings = await getSiteSettings();
  const phone = settings?.phone || "1300 891 365";
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
  const email = settings?.email || "hello@visgrowinternships.com.au";
  const address = settings?.address || "Innovation House, Mawson Lakes SA";
  // Content comes from the CMS. The arrays above are the fallback, so the
  // page renders correctly before the CMS is seeded and stays up if the
  // database is unavailable.
  const [cmsLogos, cmsPrograms, cmsTestimonials, cmsFaqs] = await Promise.all([
    getCompanyLogos(),
    getPrograms("student"),
    getTestimonials("featured"),
    getFaqs("student"),
  ]);

  const logos = cmsLogos.length
    ? cmsLogos
        .map((l) => ({ file: logoSrc(l) ?? "", name: l.name }))
        .filter((l) => l.file)
    : clientLogos.map((l) => ({
        file: `/images/company-logos/named/${l.file}`,
        name: l.name,
      }));

  const pricing = cmsPrograms.length
    ? cmsPrograms.map((p) => ({
        name: p.title,
        sub: p.tagline ?? "",
        price: p.price ?? "",
        period: p.priceNote ?? "",
        features: (p.includes ?? []).map((f) => f.item),
        href: p.pageUrl ?? "/get-started",
        cta: p.ctaLabel ?? "See what's included →",
        feat: Boolean(p.featured),
      }))
    : plans;

  const stories = cmsTestimonials.length
    ? cmsTestimonials.map((t) => ({
        quote: t.quote,
        name: t.name,
        role: t.role ?? "",
      }))
    : testimonials;

  const questions = cmsFaqs.length
    ? cmsFaqs.map((f) => ({ q: f.question, a: f.answer }))
    : faqs;

  // Narrative copy. Every field falls back to the wording already on the site.
  const c = await getHomeCopy();
  const d = homeDefaults;

  const painItems = pickList(c?.pain?.items, d.pain.items);
  const importanceTiles = pickList(c?.importance?.stats, d.importance.stats);
  const pillarCards = pickList(c?.benefits?.pillars, d.benefits.pillars);
  const consequenceItems = (
    c?.consequences?.items?.length
      ? c.consequences.items.map((i) => i.text)
      : d.consequences.items
  ) as string[];

  return (
    <>
      {/* Tells Google who Visgrow is and what the FAQ answers are, so the
          search result can show the business details and an expandable
          question list rather than just a blue link. */}
      <OrganisationSchema phone={phone} email={email} address={address} />
      <FaqSchema faqs={questions} />

      {/* ============ HERO ============ */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden text-white">
        {/* A real Visgrow session — a full room of students, not stock. It sits
            under a heavy overlay so it reads as texture, but anyone who looks
            closely sees the actual thing we're selling. */}
        <Image
          src="/images/real/issua-full-room.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        {/* The right-hand side was too transparent — faces in the photo competed
            with the headline and the whole thing read muddy. Heavier on the
            right so the image works as texture, not as a second subject. */}
        <div className="gradient-drift absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(45,12,80,0.97)_0%,rgba(105,24,220,0.92)_38%,rgba(182,37,185,0.84)_68%,rgba(233,75,108,0.74)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(36,26,51,0.18)_0%,transparent_35%,transparent_70%,rgba(36,26,51,0.22)_100%)]" />
        <div className="absolute inset-0 -z-10 [background:radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.22),transparent_42%),radial-gradient(circle_at_88%_75%,rgba(246,168,61,0.3),transparent_48%)]" />

        <div className="mx-auto w-full max-w-[1240px] px-6 py-28 lg:px-10">
          <span className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[12.5px] font-extrabold uppercase tracking-[1.6px] backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Career Coaching · Internships · Academy
          </span>

          <h1 className="mb-7 min-h-[2.05em] max-w-[760px] text-[clamp(38px,5.4vw,70px)] leading-[1.02]">
            <Typewriter
              phrases={[
                "Stop getting your resume rejected.",
                "A degree alone won't get you hired.",
                "Stop guessing why you were passed over.",
                "Start getting interviews that go somewhere.",
              ]}
            />
          </h1>

          <p className="mb-9 max-w-[600px] text-[clamp(16px,1.6vw,19px)] font-medium leading-[1.62] text-white/92">
            You did the degree. Now you need the direction, the confidence and
            the real local experience employers actually look for. That&apos;s
            what we build — together.
          </p>

          <div className="mb-14 flex flex-wrap gap-4">
            <Link
              href="#overview"
              className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1"
            >
              Start Your Career Journey →
            </Link>
            <Link
              href="#pricing"
              className="rounded-xl border-2 border-white/70 px-8 py-4 text-[15px] font-extrabold text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/15"
            >
              View Pricing
            </Link>
          </div>

          {/* The free way in. Someone who isn't ready to buy will not click
              "View Pricing" — but they will spend two minutes finding out
              what's wrong, and that's who most of this traffic is. */}
          <p className="mb-14 -mt-8 text-[14.5px] font-semibold text-white/90">
            Not sure where you stand?{" "}
            <Link
              href="/scorecard"
              className="font-extrabold text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white"
            >
              Take the free 2-minute scorecard
            </Link>{" "}
            — no sign-up.
          </p>

          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              { ic: "👥", t: "1,000+ students coached" },
              { ic: "📍", t: "Adelaide-based, Australia-wide" },
              { ic: "🤝", t: "1:1 with the founder" },
            ].map((x) => (
              <li key={x.t} className="flex items-center gap-2.5 text-[14px] font-bold">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/18 text-[15px] backdrop-blur"
                >
                  {x.ic}
                </span>
                {x.t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <section
        className="border-y border-[var(--color-line)] bg-brand-lavender py-8"
        aria-labelledby="clients-heading"
      >
        <p
          id="clients-heading"
          className="mb-6 text-center text-[11.5px] font-extrabold uppercase tracking-[2px] text-brand-sub"
        >
          {pick(c?.ticker?.caption, d.ticker.caption)}
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]">
          <div className="flex w-max items-center gap-5 animate-[scrollX_46s_linear_infinite]">
            {[...logos, ...logos].map((c, i) => (
              <span
                key={`${c.file}-${i}`}
                className="flex h-[82px] w-[184px] shrink-0 items-center justify-center rounded-2xl border border-[var(--color-line)] bg-white px-4 shadow-[0_2px_10px_rgba(36,26,51,0.05)] transition-shadow duration-300 hover:shadow-[0_10px_26px_rgba(105,24,220,0.14)]"
              >
                <Image
                  src={c.file}
                  alt={c.name}
                  width={280}
                  height={88}
                  className="h-auto w-full object-contain"
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 1 · PAIN ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="pain-heading">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {pick(c?.pain?.eyebrow, d.pain.eyebrow)}
            </span>
            <h2 id="pain-heading" className="mb-8 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {pick(c?.pain?.heading, d.pain.heading)}
            </h2>
            <ul className="flex flex-col gap-6">
              {painItems.map((p) => (
                <li key={p.title} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[13px] bg-white text-[20px] shadow-[0_6px_18px_rgba(105,24,220,0.14)]"
                  >
                    {p.icon}
                  </span>
                  <span>
                    <strong className="mb-1 block text-[16.5px] font-extrabold text-[var(--color-ink)]">
                      {p.title}
                    </strong>
                    <span className="block text-[14.5px] leading-[1.55] text-brand-sub">
                      {p.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] bg-white p-10 shadow-[0_20px_50px_rgba(105,24,220,0.14)] ring-1 ring-[var(--color-line)]">
            <h3 className="mb-4 text-[30px] text-brand-purple">
              {pick(c?.pain?.card?.heading, d.pain.card.heading)}
            </h3>
            <p className="mb-5 text-[14.5px] leading-[1.65] text-brand-sub">
              {pick(c?.pain?.card?.paragraph, d.pain.card.paragraph)}
            </p>
            <p className="mb-6 rounded-xl border-l-4 border-brand-orange bg-brand-lavender p-4 text-[14px] leading-[1.6] text-[var(--color-ink)]">
              {pick(c?.pain?.card?.callout, d.pain.card.callout)}
            </p>
            <p className="mb-7 text-[14.5px] font-semibold leading-[1.65] text-[var(--color-ink)]">
              {pick(c?.pain?.card?.closing, d.pain.card.closing)}
            </p>
            <Link
              href="#how"
              className="inline-block rounded-xl bg-brand-gradient px-7 py-4 text-[14.5px] font-extrabold text-white shadow-[0_12px_28px_rgba(105,24,220,0.3)] transition-transform hover:-translate-y-1"
            >
              {pick(c?.pain?.card?.ctaLabel, d.pain.card.ctaLabel)}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 2 · IMPORTANCE ============ */}
      <section className="relative overflow-hidden bg-brand-deep py-20 text-white reveal" aria-labelledby="importance-heading">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 lg:grid-cols-[1fr_auto] lg:px-10">
          <div>
            <span className="mb-4 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-orange">
              {pick(c?.importance?.eyebrow, d.importance.eyebrow)}
            </span>
            <h2 id="importance-heading" className="mb-6 max-w-[620px] text-[clamp(30px,3.8vw,46px)]">
              {pick(c?.importance?.heading, d.importance.heading)}
            </h2>
            <p className="max-w-[620px] text-[16.5px] leading-[1.7] text-white/85">
              {pick(c?.importance?.body, d.importance.body)}
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-4 lg:w-[340px]">
            {importanceTiles.map((s) => (
              <div key={s.value} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <div className="text-[26px] leading-none text-[#F6A83D]" style={{ fontFamily: "var(--font-heading)" }}>
                  {s.value}
                </div>
                <p className="mt-2 text-[11.5px] font-semibold leading-snug text-white/80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3 · BENEFITS / OVERVIEW ============ */}
      <section id="overview" className="scroll-mt-24 bg-brand-lavender py-24 reveal" aria-labelledby="overview-heading">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[680px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {pick(c?.benefits?.eyebrow, d.benefits.eyebrow)}
            </span>
            <h2 id="overview-heading" className="mb-4 text-[clamp(32px,4vw,48px)] text-[var(--color-ink)]">
              {pick(c?.benefits?.heading, d.benefits.heading)}
            </h2>
            <p className="text-[16.5px] leading-[1.6] text-brand-sub">
              {pick(c?.benefits?.body, d.benefits.body)}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {pillarCards.map((p) => (
              <article key={p.title} className="pillar-card flex flex-col">
                <span className="text-[13px] font-bold uppercase tracking-[2px] text-brand-pink" style={{ fontFamily: "var(--font-heading)" }}>
                  {p.number}
                </span>
                <h3 className="mb-3 mt-3 text-[28px] text-[var(--color-ink)]">{p.title}</h3>
                <p className="mb-5 flex-1 text-[14.5px] leading-[1.6] text-brand-sub">{p.body}</p>
                <Link href={p.href ?? "/"} className="text-[13.5px] font-extrabold text-brand-purple transition-colors hover:text-brand-pink">
                  {(p.ctaLabel ?? "").trim().endsWith("→") ? p.ctaLabel : `${p.ctaLabel ?? "Learn more"} →`}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4 · CONSEQUENCES ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="consequences-heading">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            <div className="relative min-h-[320px] overflow-hidden rounded-[20px]">
              <Image
                src="/images/student-late-night.jpg"
                alt="A graduate working late at a desk"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(105,24,220,0.42),rgba(36,26,51,0.68))]" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-[16px] font-bold leading-snug text-white">
                  {pick(c?.consequences?.imageQuote, d.consequences.imageQuote)}
                </p>
                <p className="mt-1.5 text-[12.5px] text-white/70">
                  {pick(c?.consequences?.imageAttribution, d.consequences.imageAttribution)}
                </p>
              </div>
            </div>
            <div>
              <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
                {pick(c?.consequences?.eyebrow, d.consequences.eyebrow)}
              </span>
              <h2 id="consequences-heading" className="mb-7 text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
                {pick(c?.consequences?.heading, d.consequences.heading)}
              </h2>
              <ul className="flex flex-col gap-4">
                {consequenceItems.map((item) => (
                  <li key={item} className="rounded-[16px] border-l-4 border-brand-pink bg-[#fff5f7] p-5 text-[14.5px] leading-[1.6] text-[var(--color-ink)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4b · WHAT THE WAIT COSTS ============ */}
      {/* Sits immediately after the consequences list on purpose: the list
          says waiting is expensive, this makes them work out their own
          number. Theirs is far more persuasive than ours. */}
      <section
        className="bg-brand-lavender py-20 reveal"
        aria-labelledby="waiting-cost-heading"
      >
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <div className="mx-auto mb-10 max-w-[620px] text-center">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              The part nobody adds up
            </span>
            <h2
              id="waiting-cost-heading"
              className="text-[clamp(26px,3.4vw,40px)] leading-[1.1] text-[var(--color-ink)]"
            >
              Every month you guess has a price.
            </h2>
          </div>
          <WaitingCost />
        </div>
      </section>

      {/* ============ FREE MASTERCLASS — LEAD MAGNET ============ */}
      <section id="masterclass" className="scroll-mt-24 bg-brand-deep py-24 text-white reveal" aria-labelledby="masterclass-heading">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 px-3.5 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[1.4px] text-[#F6A83D]">
              Free · No credit card
            </span>
            <h2 id="masterclass-heading" className="mb-5 text-[clamp(30px,3.8vw,46px)]">
              Not ready to spend anything? Start here instead.
            </h2>
            <p className="mb-7 max-w-[520px] text-[16px] leading-[1.7] text-white/85">
              Mustafa recorded his full masterclass on landing a job in this
              market — the same material he charges for, given away free. Watch
              it, apply it yourself, and if you never speak to us again,
              that&apos;s genuinely fine.
            </p>

            <ul className="mb-8 flex flex-col gap-3">
              {[
                "Why so many roles never reach Seek — and how to find them",
                "The resume mistakes that get you auto-rejected before a human reads it",
                "How international students get hired without PR",
                "The 30-second pitch that makes people remember you",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 text-[14.5px] leading-snug text-white/90">
                  <span className="mt-0.5 font-black text-[#F6A83D]" aria-hidden="true">✓</span>
                  {x}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/masterclass"
                className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1"
              >
                Watch the full masterclass — free →
              </Link>
              <span className="text-[13px] font-semibold text-white/70">
                {settings?.masterclassDuration?.trim()
                  ? `${settings.masterclassDuration.trim()} · no payment`
                  : "No payment, no catch"}
              </span>
            </div>
          </div>

          <Link
            href="/masterclass"
            className="group relative block overflow-hidden rounded-[20px] border border-white/25 shadow-[0_28px_64px_rgba(0,0,0,0.3)]"
          >
            {settings?.masterclassYoutubeId ? (
              <>
                {/* The real thumbnail, straight from YouTube. Clicking goes to
                    the masterclass page rather than playing here, so the
                    email capture still happens. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${settings.masterclassYoutubeId}/maxresdefault.jpg`}
                  alt=""
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-[rgba(36,26,51,0.32)] transition-colors group-hover:bg-[rgba(36,26,51,0.18)]" />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 flex h-[74px] w-[74px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[26px] text-brand-purple shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-110"
                >
                  ▶
                </span>
              </>
            ) : (
              <span className="flex aspect-video w-full items-center justify-center bg-white/10 text-[15px] font-bold text-white/80">
                Masterclass coming shortly
              </span>
            )}
          </Link>
        </div>
      </section>

      {/* ============ 5 · RESULTS / SUCCESS STORIES ============ */}
      <section className="bg-brand-gradient py-16 text-white reveal" aria-labelledby="results-heading">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <h2 id="results-heading" className="sr-only">
            Success stories and results
          </h2>
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-[clamp(38px,4.6vw,54px)] leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[13.5px] font-semibold opacity-90">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 text-center text-[11.5px] text-white/55">
            *Figures reflect Visgrow&apos;s work to date across coaching,
            workshops and internships.
          </p>
        </div>
      </section>

      <section className="bg-brand-gradient pb-24 text-white reveal">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] border border-white/30 shadow-[0_28px_64px_rgba(0,0,0,0.28)] lg:aspect-[4/5]">
            <Image
              src="/images/mustafa-kadir.jpg"
              alt="Mustafa Kadir, Founder and Managing Director of Visgrow"
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-cover object-center"
            />
          </div>

          <div>
            <span className="mb-4 block text-[13px] font-extrabold uppercase tracking-[2px] text-[#F6A83D]">
              Meet your coach
            </span>
            <blockquote className="mb-6 text-[clamp(24px,3vw,34px)] leading-[1.25]" style={{ fontFamily: "var(--font-heading)" }}>
              &ldquo;I understand how frustrating it is to become employed in
              this competitive job market — because I&apos;ve lived it, on
              both sides of the hiring table.&rdquo;
            </blockquote>
            <p className="text-[16px] font-extrabold">
              Mustafa Kadir
              <span className="mt-0.5 block text-[13.5px] font-medium opacity-85">
                Founder &amp; Managing Director, Visgrow
              </span>
            </p>

            <ul className="mt-7 flex flex-wrap gap-3">
              {[
                "20+ Years Industry Experience",
                "Former VP, ASP",
                "ACS Board Member",
                "20,000+ LinkedIn Followers",
              ].map((b) => (
                <li key={b} className="rounded-[10px] border border-white/30 bg-white/15 px-4 py-2.5 text-[12.5px] font-bold">
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-white/25 pt-6">
              <p className="max-w-[560px] text-[14.5px] leading-[1.7] text-white/85">
                Mustafa has hired, managed and mentored across IT, consulting
                and general management — and has sat on the other side of the
                table deciding who gets shortlisted. That&apos;s the
                perspective you get in every session.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="success-stories" className="scroll-mt-24 bg-brand-lavender py-24 reveal" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-11 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Don&apos;t take our word for it
            </span>
            <h2 id="testimonials-heading" className="text-[clamp(32px,4vw,48px)] text-[var(--color-ink)]">
              People exactly like you, already on the other side of it.
            </h2>
          </div>
        </div>
        <TestimonialCarousel items={stories} />
      </section>

      {/* Real Google reviews, straight from the Business Profile. Renders
          nothing at all until the API credentials are set — there is no
          placeholder, because an empty reviews block advertises that nobody
          has reviewed you. */}
      <GoogleReviews />

      {/* ============ 6 · HOW TO IMPLEMENT ============ */}
      <section id="how" className="scroll-mt-24 bg-white py-24 reveal" aria-labelledby="how-heading">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              How it works
            </span>
            <h2 id="how-heading" className="text-[clamp(32px,4vw,48px)] text-[var(--color-ink)]">
              Your path from stuck to job-ready.
            </h2>
          </div>
          <ol className="reveal-stagger in grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <span className="mb-5 block text-[40px] leading-none text-brand-gradient" style={{ fontFamily: "var(--font-heading)" }}>
                  {s.n}
                </span>
                <h3 className="mb-2.5 text-[16.5px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
                  {s.title}
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-brand-sub">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ QUALIFICATION + RISK REVERSAL ============ */}
      <section className="bg-brand-lavender py-24 reveal" aria-labelledby="fit-heading">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="mb-12 max-w-[680px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Let&apos;s be straight with each other
            </span>
            <h2 id="fit-heading" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              We&apos;re not right for everyone. Here&apos;s the honest test.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[20px] border-2 border-[#1cae6f]/35 bg-white p-8">
              <h3 className="mb-5 text-[21px] text-[var(--color-ink)]">
                This is for you if…
              </h3>
              <ul className="flex flex-col gap-3.5">
                {[
                  "You're applying and hearing nothing back, and you don't know why.",
                  "You're willing to do the work — we coach, you still have to show up.",
                  "You want someone to tell you the truth, not flatter you.",
                  "You're an international student or graduate who's been told you need PR first.",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3 text-[14.5px] leading-snug text-brand-sub">
                    <span className="mt-0.5 font-black text-[#1cae6f]" aria-hidden="true">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[20px] border-2 border-[var(--color-line)] bg-white p-8">
              <h3 className="mb-5 text-[21px] text-[var(--color-ink)]">
                This isn&apos;t for you if…
              </h3>
              <ul className="flex flex-col gap-3.5">
                {[
                  "You want someone to apply to jobs for you. We don't do that.",
                  "You want a guaranteed job offer. Nobody can honestly promise that — and we won't.",
                  "You're not prepared to change how you're presenting yourself.",
                  "You want the cheapest option regardless of whether it fits.",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3 text-[14.5px] leading-snug text-brand-sub">
                    <span className="mt-0.5 font-black text-brand-pink" aria-hidden="true">✕</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-[20px] border-2 border-brand-purple bg-white p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-[26px]"
              >
                🛡️
              </span>
              <div className="flex-1">
                <h3 className="mb-2 text-[23px] text-[var(--color-ink)]">
                  Our honest guarantee
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-brand-sub">
                  We can&apos;t guarantee you a job — anyone who does is
                  selling you something. What we do guarantee: sit through
                  your first session, and if you don&apos;t leave with a
                  clearer picture of exactly what&apos;s holding you back,
                  tell us and we&apos;ll refund it. No forms, no argument.
                </p>
              </div>
              <Link
                href="/get-started?program=gap"
                className="shrink-0 rounded-xl bg-brand-gradient px-7 py-4 text-center text-[14.5px] font-extrabold text-white shadow-[0_12px_28px_rgba(105,24,220,0.3)] transition-transform hover:-translate-y-1"
              >
                Book My First Session
              </Link>
            </div>
            <p className="mt-5 text-[12px] text-brand-sub">
              *Refund applies to the Career Strategy &amp; Gap Analysis session
              when requested within 7 days. Full terms confirmed at booking.
            </p>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON TABLE ============ */}
      <section id="compare" className="scroll-mt-24 bg-white py-24 reveal" aria-labelledby="compare-heading">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[680px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Compare every option
            </span>
            <h2 id="compare-heading" className="mb-4 text-[clamp(32px,4vw,48px)] text-[var(--color-ink)]">
              Which one is actually right for you?
            </h2>
            <p className="text-[16.5px] leading-[1.6] text-brand-sub">
              Most people don&apos;t need everything — they need the right
              thing. Here&apos;s an honest side-by-side so you can pick without
              guessing.
            </p>
          </div>

          <p className="mb-3 text-[13px] font-semibold text-brand-purple lg:hidden">
            Swipe the table sideways to compare →
          </p>

          <div className="overflow-x-auto rounded-[20px] border border-[var(--color-line)]">
            <table className="w-full min-w-[820px] border-collapse text-left text-[13.5px]">
              <caption className="sr-only">
                Comparison of Visgrow programs for students and graduates
              </caption>
              <thead>
                <tr className="bg-brand-lavender">
                  <th scope="col" className="px-5 py-5 font-extrabold text-[var(--color-ink)]">
                    &nbsp;
                  </th>
                  {compareCols.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      className={`px-5 py-5 align-top ${c.feat ? "bg-white" : ""}`}
                    >
                      <span
                        className={`block text-[15px] font-extrabold ${
                          c.feat ? "text-brand-purple" : "text-[var(--color-ink)]"
                        }`}
                      >
                        {c.name}
                      </span>
                      <span className="mt-1 block text-[12.5px] font-semibold text-brand-sub">
                        {c.price}
                      </span>
                      {c.feat && (
                        <span className="mt-2 inline-block rounded-full bg-brand-gradient px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-wider text-white">
                          Signature program
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-white" : "bg-brand-lavender/40"}
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 text-left font-bold text-[var(--color-ink)]"
                    >
                      {row.feature}
                    </th>
                    {row.values.map((v, j) => (
                      <td
                        key={j}
                        className={`px-5 py-4 ${
                          compareCols[j].feat
                            ? "font-semibold text-[var(--color-ink)]"
                            : "text-brand-sub"
                        }`}
                      >
                        {v === true ? (
                          <span className="font-black text-[#1cae6f]" aria-label="Included">✓</span>
                        ) : v === false ? (
                          <span className="text-[var(--color-line)]" aria-label="Not included">—</span>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-[13px] text-brand-sub">
            Still torn between two? That&apos;s exactly what the Gap Analysis
            is for — we&apos;ll tell you honestly which one fits, even if
            it&apos;s the cheapest one.
          </p>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="scroll-mt-24 bg-brand-lavender py-24 reveal" aria-labelledby="pricing-heading">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-14 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {pick(c?.pricing?.eyebrow, d.pricing.eyebrow)}
            </span>
            <h2 id="pricing-heading" className="mb-4 text-[clamp(32px,4vw,48px)] text-[var(--color-ink)]">
              {pick(c?.pricing?.heading, d.pricing.heading)}
            </h2>
            <p className="text-[16.5px] leading-[1.6] text-brand-sub">
              {pick(c?.pricing?.body, d.pricing.body)}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pricing.map((p) => (
              <article
                key={p.name}
                className={`relative flex flex-col rounded-[20px] bg-white p-8 transition-transform hover:-translate-y-1.5 ${
                  p.feat
                    ? "border-2 border-brand-purple shadow-[0_20px_50px_rgba(105,24,220,0.18)]"
                    : "border-2 border-[var(--color-line)]"
                }`}
              >
                {p.feat && (
                  <span className="absolute -top-3.5 left-7 rounded-full bg-brand-gradient px-3.5 py-1.5 text-[10.5px] font-extrabold uppercase tracking-wider text-white">
                    Signature Program
                  </span>
                )}
                <h3 className="mb-1.5 text-[21px] text-[var(--color-ink)]">{p.name}</h3>
                <p className="text-[12.5px] font-semibold text-brand-sub">{p.sub}</p>
                <p className="mb-1 mt-4">
                  <span className="text-[38px] text-brand-purple" style={{ fontFamily: "var(--font-heading)" }}>
                    {p.price}
                  </span>
                  <span className="ml-1.5 text-[13px] font-semibold text-brand-sub">{p.period}</span>
                </p>
                <ul className="mb-7 mt-5 flex flex-1 flex-col gap-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 text-[13.5px] leading-snug text-brand-sub">
                      <span className="font-black text-[#1cae6f]" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className={`rounded-[10px] py-3.5 text-center text-[13.5px] font-extrabold transition-opacity hover:opacity-90 ${
                    p.feat ? "bg-brand-gradient text-white" : "bg-brand-lavender text-brand-purple"
                  }`}
                >
                  {p.cta}
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-[13px] text-brand-sub">
            {pick(c?.pricing?.footnote, d.pricing.footnote)}
          </p>
        </div>
      </section>

      {/* ============ FAQs ============ */}
      <section id="faqs" className="scroll-mt-24 bg-white py-24 reveal" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <div className="mb-11">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {pick(c?.faq?.eyebrow, d.faq.eyebrow)}
            </span>
            <h2 id="faq-heading" className="text-[clamp(32px,4vw,48px)] text-[var(--color-ink)]">
              {pick(c?.faq?.heading, d.faq.heading)}
            </h2>
          </div>
          <FaqAccordion items={questions} />
        </div>
      </section>

      {/* ============ ENQUIRE NOW ============ */}
      <section id="enquire" className="scroll-mt-24 bg-brand-gradient py-24 text-white reveal" aria-labelledby="enquire-heading">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 lg:grid-cols-2 lg:items-start lg:px-10">
          <div>
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-[#F6A83D]">
              Enquire now
            </span>
            <h2 id="enquire-heading" className="mb-5 text-[clamp(32px,4vw,48px)]">
              Still not sure? Let&apos;s just talk it through.
            </h2>
            <p className="mb-9 max-w-[480px] text-[16.5px] leading-[1.7] text-white/88">
              You&apos;re one short conversation away from a real person
              who&apos;ll give you a straight answer — no pressure, no sales
              pitch, and no guaranteed-job promises.
            </p>

            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3.5">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/18 text-[17px]">📞</span>
                <span>
                  <a href={phoneHref} className="block text-[15.5px] font-extrabold hover:underline">{phone}</a>
                  <span className="block text-[13px] text-white/70">Mon–Fri, business hours</span>
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/18 text-[17px]">✉️</span>
                <span>
                  <a href={`mailto:${email}`} className="block text-[15.5px] font-extrabold hover:underline">
                    {email}
                  </a>
                  <span className="block text-[13px] text-white/70">We reply within one business day</span>
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/18 text-[17px]">📍</span>
                <span>
                  <span className="block text-[15.5px] font-extrabold">{address}</span>
                  <span className="block text-[13px] text-white/70">Adelaide-based, working Australia-wide</span>
                </span>
              </li>
            </ul>
          </div>

          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
