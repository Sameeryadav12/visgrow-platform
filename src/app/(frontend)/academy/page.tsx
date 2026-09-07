import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import PartnerEnquiryForm from "@/components/PartnerEnquiryForm";
import { getSiteSettings } from "@/lib/cms";
import { getPageCopy, t, list, texts } from "@/lib/page-copy";

export const metadata: Metadata = {
  title: "Visgrow Academy — Skills Development Workshops | Adelaide",
  description:
    "Practical workshops on personal branding, communication, networking, goal setting and the hidden job market — delivered to student cohorts and workplace teams.",
  alternates: { canonical: "/academy" },
};

const pains = [
  {
    icon: "🎧",
    title: "Training people sit through and forget",
    body: "Slides read aloud, a certificate at the end, nothing different on Monday. Most professional development fails because nobody has to do anything.",
  },
  {
    icon: "🧩",
    title: "The skills that matter never got taught",
    body: "Communication, presence, networking, personal brand. Every job description asks for them; no curriculum ever covered them.",
  },
  {
    icon: "📆",
    title: "Generic content, generic results",
    body: "Off-the-shelf workshops treat a room of engineers the same as a room of accountants — and land with neither.",
  },
];

const workshops = [
  {
    title: "Positive Attitude & Mindset",
    body: "What actually drives professional confidence, how to reframe setbacks, and how to hold your nerve in an unfamiliar room.",
  },
  {
    title: "Personality Awareness & NLP",
    body: "Understanding how you're wired, your strengths and blind spots, and how to build rapport with people who work differently to you.",
  },
  {
    title: "Goal Setting & the GROW Model",
    body: "Turning vague intent into dated, accountable plans — plus how to coach yourself when motivation runs out.",
  },
  {
    title: "Personal Branding",
    body: "The 5 P's of personal branding, building credibility and recognition, and how to be remembered for the right reasons.",
  },
  {
    title: "Communication Skills",
    body: "Assertive communication, active listening, body language, and how to disagree without damaging the relationship.",
  },
  {
    title: "Networking That Works",
    body: "Where to find the right rooms, how to open a conversation, and how to follow up without feeling like you're imposing.",
  },
  {
    title: "The 30-Second Pitch",
    body: "Who you are, the value you bring and why you care — sharp enough to land in the time it takes to shake a hand.",
  },
  {
    title: "Accessing the Hidden Job Market",
    body: "The roles that never get advertised, and how to reach the people who quietly fill them.",
  },
];

const consequences = [
  "Your people stay capable but invisible — passed over for opportunities they could have handled.",
  "The same avoidable communication problems keep costing time, clients and goodwill.",
  "You keep paying for training that changes nothing, which makes the next proposal harder to approve.",
];

const steps = [
  {
    n: "01",
    title: "Tell us the gap",
    body: "Who the group is, what they struggle with, and what you want to be different afterwards.",
  },
  {
    n: "02",
    title: "We shape the session",
    body: "Chosen from the framework and tailored to your industry, cohort and time available.",
  },
  {
    n: "03",
    title: "We deliver it in person",
    body: "Practical and participatory — people practise, get feedback, and leave having actually done the thing.",
  },
  {
    n: "04",
    title: "They apply it immediately",
    body: "Every workshop ends with something concrete to use in the next week, not a folder to file away.",
  },
];

const faqs = [
  {
    q: "Who are the workshops for?",
    a: "Two groups mainly — student cohorts through education partners, and workplace teams through employers. The framework is the same; the framing and examples change to match the audience.",
  },
  {
    q: "How long is a workshop?",
    a: "Most run as half-day or full-day sessions, and several can be combined into a program over a few weeks. We'll recommend a format once we know the group and the goal.",
  },
  {
    q: "Can you tailor content to our industry?",
    a: "Yes, and we'd insist on it. Generic examples are the reason most training doesn't stick — we use scenarios from your actual context so people can see themselves in it.",
  },
  {
    q: "Where do you deliver?",
    a: "On site at your workplace or campus wherever possible. We're Adelaide-based and work Australia-wide, and we deliver online when travel doesn't make sense.",
  },
  {
    q: "What does it cost?",
    a: "It depends on format, group size and how much tailoring is involved. Tell us what you need and we'll quote against that rather than pushing a fixed package.",
  },
];

export default async function AcademyPage() {
  const copy = await getPageCopy("/academy");
  const cms_pains = list(copy?.pain?.items, pains);
  const cms_consequences = texts(copy?.consequences?.items, consequences);
  const cms_steps = list(copy?.how?.steps, steps);
  const settings = await getSiteSettings();
  const phone = settings?.phone || "1300 891 365";
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
  const email = settings?.email || "hello@visgrowinternships.com.au";
  const address = settings?.address || "Innovation House, Mawson Lakes SA";
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Academy</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[1.5px]">
                Pillar 03 · Visgrow Academy
              </span>

              <h1 className="mb-6 text-[clamp(32px,4.8vw,56px)] leading-[1.02]">
                {t(copy?.hero?.heading, "The skills every job asks for and no course ever taught.")}
              </h1>

              <p className="mb-9 max-w-[560px] text-[16.5px] leading-[1.65] text-white/90">
                Practical workshops on communication, personal brand,
                networking and professional presence — delivered to student
                cohorts and workplace teams, built on the Visgrow Employability
                &amp; Success Framework.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#workshops"
                  className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1"
                >
                  See the workshops →
                </Link>
                <Link
                  href="#book"
                  className="rounded-xl border-2 border-white/70 px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
                >
                  Book a workshop
                </Link>
              </div>
            </div>

            <div className="relative h-[340px] overflow-hidden rounded-[20px] border border-white/25 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/real/acs-session.jpg"
                alt="Mustafa Kadir running a Visgrow Academy workshop for an ACS audience"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 1 · PAIN ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ac-pain">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[720px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.pain?.eyebrow, "Why most training doesn't work")}
            </span>
            <h2 id="ac-pain" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.pain?.heading, "Everyone's been to a workshop that changed nothing.")}
            </h2>
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
            {t(copy?.importance?.eyebrow, "Why these skills decide careers")}
          </span>
          <h2 id="ac-importance" className="mb-6 text-[clamp(30px,3.8vw,46px)]">
            {t(copy?.importance?.heading, "Technical ability gets you in. Everything else decides how far you go.")}
          </h2>
          <p className="mx-auto max-w-[680px] text-[16.5px] leading-[1.7] text-white/85">
            Two people with identical qualifications end up in very different
            places, and the difference is rarely technical. It&apos;s who can
            explain their thinking, hold a room, build a relationship and be
            trusted with something bigger.
          </p>
        </div>
      </section>

      {/* ============ 3 · BENEFITS / WORKSHOPS ============ */}
      <section id="workshops" className="scroll-mt-24 bg-brand-lavender py-24 reveal" aria-labelledby="ac-workshops">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.benefits?.eyebrow, "The workshops")}
            </span>
            <h2 id="ac-workshops" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.benefits?.heading, "Built on the Employability & Success Framework.")}
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              Run individually or combined into a program. Every one is
              practical — people practise, get feedback, and leave with
              something they can use immediately.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workshops.map((w) => (
              <div key={w.title} className="rounded-[18px] border border-[var(--color-line)] bg-white p-6 card-lift">
                <div className="icon-check" aria-hidden="true">✓</div>
                <h3 className="mb-2 text-[15.5px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
                  {w.title}
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-brand-sub">{w.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/academy/skills-development"
              className="rounded-xl border-2 border-brand-purple px-8 py-4 text-[14.5px] font-extrabold text-brand-purple transition-colors hover:bg-brand-purple hover:text-white"
            >
              See the full Skills Development program →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 4 · CONSEQUENCES ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ac-consequences">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          <div className="mb-10 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.consequences?.eyebrow, "If the gap stays unaddressed")}
            </span>
            <h2 id="ac-consequences" className="text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
              {t(copy?.consequences?.heading, "Capable people quietly stall.")}
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
      <section id="testimonials" className="scroll-mt-24 bg-brand-gradient py-24 text-white reveal" aria-labelledby="ac-results">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <div className="mb-12 max-w-[680px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-white/80">
              {t(copy?.results?.eyebrow, "Who delivers it")}
            </span>
            <h2 id="ac-results" className="text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.results?.heading, "Run by a practitioner, not a presenter.")}
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] border border-white/25">
              <Image
                src="/images/mustafa-kadir.jpg"
                alt="Mustafa Kadir, Founder of Visgrow"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <blockquote className="mb-6 text-[clamp(20px,2.4vw,28px)] leading-[1.3]" style={{ fontFamily: "var(--font-heading)" }}>
                &ldquo;Every one of these skills is something I had to learn the
                hard way, on the job. There&apos;s no reason the next
                generation should have to.&rdquo;
              </blockquote>
              <p className="text-[15.5px] font-extrabold">
                Mustafa Kadir
                <span className="mt-0.5 block text-[13.5px] font-medium opacity-85">
                  Founder &amp; Managing Director, Visgrow
                </span>
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
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
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6 · HOW TO IMPLEMENT ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ac-how">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.how?.eyebrow, "How it works")}
            </span>
            <h2 id="ac-how" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.how?.heading, "From enquiry to workshop.")}
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
        </div>
      </section>

      {/* ============ PACKAGES & PRICING ============ */}
      <section id="pricing" className="scroll-mt-24 bg-brand-lavender py-24 reveal" aria-labelledby="ac-pricing">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          <div className="mb-10 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Workshop packages &amp; pricing
            </span>
            <h2 id="ac-pricing" className="mb-4 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              Quoted against what you actually need.
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              We don&apos;t publish a fixed price list, because a half-day for
              twelve graduates and a six-week program for a department
              aren&apos;t the same job. Tell us the group and the goal and
              we&apos;ll quote properly.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { t: "Single workshop", d: "Half or full day on one topic, for a single group." },
              { t: "Workshop series", d: "Several sessions across weeks, building on each other." },
              { t: "Full program", d: "The complete framework, run as a structured cohort program." },
            ].map((x) => (
              <div key={x.t} className="rounded-[18px] border border-[var(--color-line)] bg-white p-7">
                <h3 className="mb-2 text-[19px] text-[var(--color-ink)]">{x.t}</h3>
                <p className="text-[14px] leading-[1.6] text-brand-sub">{x.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[12.5px] text-brand-sub">
            *Pricing confirmed at scoping. Rates vary by format, group size and
            level of tailoring.
          </p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ac-faq">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <div className="mb-11">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Common questions
            </span>
            <h2 id="ac-faq" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              Before you book.
            </h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ============ BOOK A WORKSHOP ============ */}
      <section id="book" className="scroll-mt-24 bg-brand-gradient py-24 text-white reveal" aria-labelledby="ac-book">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 lg:grid-cols-2 lg:items-start lg:px-10">
          <div>
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-[#F6A83D]">
              {t(copy?.cta?.eyebrow, "Book a workshop")}
            </span>
            <h2 id="ac-book" className="mb-5 text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.cta?.heading, "Tell us about the group.")}
            </h2>
            <p className="mb-9 max-w-[480px] text-[16.5px] leading-[1.7] text-white/88">
              Who they are, what&apos;s not working, and what you&apos;d like
              to be different afterwards. We&apos;ll come back with a format
              and a quote — and tell you if we&apos;re not the right fit.
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
            </ul>
          </div>

          <PartnerEnquiryForm
            audience="Employer"
            interests={[
              "Single workshop",
              "Workshop series",
              "Full Skills Development program",
              "Not sure yet — I'd like to talk",
            ]}
          />
        </div>
      </section>
    </>
  );
}
