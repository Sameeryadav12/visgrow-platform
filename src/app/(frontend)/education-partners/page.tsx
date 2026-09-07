import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import PartnerEnquiryForm from "@/components/PartnerEnquiryForm";
import { getSiteSettings } from "@/lib/cms";
import { getPageCopy, t, list, texts } from "@/lib/page-copy";

export const metadata: Metadata = {
  title: "Career & Employability Services for Education Providers | Visgrow",
  description:
    "Visgrow partners with universities, colleges and RTOs to deliver career and employability services and Visgrow-Hosted Internships that improve graduate outcomes.",
  alternates: { canonical: "/education-partners" },
};

const pains = [
  {
    icon: "📊",
    title: "Employability outcomes you're measured on",
    body: "Graduate employment rates sit in rankings, reviews and marketing. They're reported publicly long before anyone asks how much support you were resourced to give.",
  },
  {
    icon: "🧑‍🏫",
    title: "One careers adviser, hundreds of students",
    body: "Your team is capable and stretched. Generic advice at scale is all the ratio allows, and generic advice is exactly what stops working in a competitive market.",
  },
  {
    icon: "🌏",
    title: "International students need more, not the same",
    body: "They're navigating visa timelines, no local network and employers who hesitate. The standard careers session doesn't touch any of that.",
  },
  {
    icon: "🔗",
    title: "Work placements are hard to source and harder to supervise",
    body: "Finding hosts is a job in itself. Guaranteeing the quality of what students actually do once they're there is another one entirely.",
  },
];

const services = [
  {
    id: "services",
    tag: "Service 01",
    title: "Career & Employability Services",
    body: "We deliver career and employability programs directly to your students — on campus or online — covering the things that decide who gets hired: resumes that survive screening, LinkedIn, interview technique, personal brand and the hidden job market.",
    points: [
      "Delivered on campus or online, around your timetable",
      "Workshops, cohort programs or one-on-one sessions",
      "Tailored to your student mix, including international cohorts",
      "Extends your careers team rather than replacing it",
    ],
  },
  {
    id: "hosted-internships",
    tag: "Service 02",
    title: "Visgrow-Hosted Internships",
    body: "We host and supervise the placements ourselves rather than brokering students out to third parties. That means you know what your students are actually doing, and the quality of the experience is our responsibility — not a host organisation's spare capacity.",
    points: [
      "Hosted and supervised directly by Visgrow",
      "Real client-facing project work, not observation",
      "Coaching runs alongside the placement",
      "Students finish with a portfolio piece and a genuine reference",
    ],
  },
];

const consequences = [
  "Graduate outcome figures stay flat while competitor institutions market theirs loudly.",
  "Students who struggled to convert their qualification into work become alumni who say so.",
  "Your careers team keeps absorbing demand it was never resourced to meet.",
];

const steps = [
  {
    n: "01",
    title: "Understand your cohort",
    body: "Student mix, disciplines, where they're getting stuck, and what your careers team already covers well.",
  },
  {
    n: "02",
    title: "Design the program together",
    body: "Workshops, a cohort program, hosted placements, or a combination — scoped to your calendar and budget.",
  },
  {
    n: "03",
    title: "Deliver to your students",
    body: "On campus or online, run by an industry practitioner rather than a theorist.",
  },
  {
    n: "04",
    title: "Report and refine",
    body: "Attendance, engagement and student feedback back to you, so you can evidence the investment and improve the next round.",
  },
];

const faqs = [
  {
    q: "Do you replace our careers team?",
    a: "No — we extend it. Your team knows your students and your institution far better than we ever will. We add industry-practitioner delivery and capacity for the areas where one-to-many advice runs out of usefulness.",
  },
  {
    q: "Can you work specifically with international student cohorts?",
    a: "Yes, and it's a significant part of what we do. International students face a different set of obstacles — visa timelines, no local network, employer hesitancy — and they need advice that addresses those directly rather than working around them.",
  },
  {
    q: "How do the hosted internships differ from a normal placement program?",
    a: "We host them ourselves rather than brokering students to outside companies. You're not relying on a third party's goodwill for the quality of the experience — the supervision, the work and the outcome are ours to stand behind.",
  },
  {
    q: "Can programs be delivered online?",
    a: "Yes. On campus generally works better for participation, but we run online and hybrid delivery regularly, including for regional and interstate cohorts.",
  },
  {
    q: "What does it cost?",
    a: "It depends entirely on scope — cohort size, format and duration. We'll scope it with you and quote against what you actually need rather than a fixed package.",
  },
];

export default async function EducationPartnersPage() {
  const copy = await getPageCopy("/education-partners");
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
            <span className="text-white">Education Partners</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[1.5px]">
                For Education Providers
              </span>

              <h1 className="mb-6 text-[clamp(32px,4.8vw,56px)] leading-[1.02]">
                {t(copy?.hero?.heading, "You teach them the discipline. We help them convert it into work.")}
              </h1>

              <p className="mb-9 max-w-[560px] text-[16.5px] leading-[1.65] text-white/90">
                Career and employability programs and Visgrow-Hosted
                Internships, delivered to your students by an industry
                practitioner — extending your careers team rather than
                duplicating it.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#services"
                  className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1"
                >
                  See what we deliver →
                </Link>
                <Link
                  href="#partner"
                  className="rounded-xl border-2 border-white/70 px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
                >
                  Talk to us
                </Link>
              </div>
            </div>

            <div className="relative h-[340px] overflow-hidden rounded-[20px] border border-white/25 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/real/uoa-bright-futures.jpg"
                alt="Mustafa Kadir delivering a Visgrow session for a University of Adelaide Bright Futures cohort"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-[center_35%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(36,26,51,0.88),transparent)] p-5">
                <p className="text-[13px] font-bold leading-snug text-white">
                  Delivering for a University of Adelaide cohort
                </p>
                <p className="mt-0.5 text-[11.5px] text-white/75">
                  Bright Futures program — one of the institutions we already work with.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 1 · PAIN ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ep-pain">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[720px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.pain?.eyebrow, "The pressure you're under")}
            </span>
            <h2 id="ep-pain" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.pain?.heading, "You're judged on outcomes you only partly control.")}
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              The teaching can be excellent and the employment figures still
              disappoint — because what happens between graduation and a first
              offer sits largely outside the curriculum.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {cms_pains.map((p) => (
              <div key={p.title} className="flex items-start gap-4 rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <span aria-hidden="true" className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[13px] bg-brand-lavender text-[20px]">
                  {p.icon}
                </span>
                <span>
                  <strong className="mb-1.5 block text-[16.5px] font-extrabold text-[var(--color-ink)]">
                    {p.title}
                  </strong>
                  <span className="block text-[14.5px] leading-[1.6] text-brand-sub">{p.body}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 2 · IMPORTANCE ============ */}
      <section className="bg-brand-deep py-20 text-white reveal" aria-labelledby="ep-importance">
        <div className="mx-auto max-w-[900px] px-6 text-center lg:px-10">
          <span className="mb-4 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-orange">
            {t(copy?.importance?.eyebrow, "Why this matters to you")}
          </span>
          <h2 id="ep-importance" className="mb-6 text-[clamp(30px,3.8vw,46px)]">
            {t(copy?.importance?.heading, "Graduate outcomes are your most persuasive marketing — or your quietest problem.")}
          </h2>
          <p className="mx-auto max-w-[680px] text-[16.5px] leading-[1.7] text-white/85">
            Prospective students and their families look at where graduates end
            up. Employability support isn&apos;t a student service any more —
            it&apos;s part of the value proposition, and increasingly part of
            the decision to enrol.
          </p>
        </div>
      </section>

      {/* ============ 3 · BENEFITS / SERVICES ============ */}
      <section
        id="services"
        className="scroll-mt-24 bg-brand-lavender py-24 reveal"
        aria-labelledby="ep-services"
      >
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.benefits?.eyebrow, "What we deliver")}
            </span>
            <h2 id="ep-services" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.benefits?.heading, "Two ways we work with institutions.")}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="scroll-mt-24 rounded-[20px] border border-[var(--color-line)] bg-white p-8 lg:p-9"
              >
                <span className="mb-3 block text-[12px] font-extrabold uppercase tracking-[1.6px] text-brand-pink">
                  {s.tag}
                </span>
                <h3 className="mb-4 text-[27px] text-[var(--color-ink)]">{s.title}</h3>
                <p className="mb-6 text-[14.5px] leading-[1.7] text-brand-sub">{s.body}</p>
                <ul className="flex flex-col gap-3">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-[14px] leading-snug text-[var(--color-ink)]">
                      <span className="font-black text-[#1cae6f]" aria-hidden="true">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4 · CONSEQUENCES ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ep-consequences">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          <div className="mb-10 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.consequences?.eyebrow, "If nothing changes")}
            </span>
            <h2 id="ep-consequences" className="text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
              {t(copy?.consequences?.heading, "The gap doesn't stay invisible for long.")}
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
      <section className="bg-brand-gradient py-24 text-white reveal" aria-labelledby="ep-results">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <div className="mb-12 max-w-[680px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-white/80">
              {t(copy?.results?.eyebrow, "Where our students have gone")}
            </span>
            <h2 id="ep-results" className="text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.results?.heading, "The outcome your students are actually after.")}
            </h2>
          </div>

          <div className="mb-10 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { k: "1,000+", v: "students coached" },
              { k: "20+", v: "years founder industry experience" },
              { k: "20,000+", v: "professional network" },
              { k: "Adelaide", v: "based, working Australia-wide" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-[clamp(28px,3.4vw,40px)] leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                  {s.k}
                </div>
                <p className="mt-2 text-[12.5px] font-semibold opacity-90">{s.v}</p>
              </div>
            ))}
          </div>

          <p className="mb-6 text-[12.5px] uppercase tracking-[1px] opacity-75">
            Our clients have gone on to roles at
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {[
              "PwC", "Deloitte", "REDARC", "Mayne Pharma", "Country Fire Service",
              "Aussie Home Loans", "Aurecon", "Relationships Australia SA",
              "SA Department for Energy and Mining",
            ].map((c) => (
              <li key={c} className="rounded-lg bg-white/15 px-3.5 py-2 text-[12.5px] font-bold">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 6 · HOW TO IMPLEMENT ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="ep-how">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.how?.eyebrow, "How a partnership works")}
            </span>
            <h2 id="ep-how" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.how?.heading, "Four steps from conversation to cohort.")}
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

      {/* ============ FAQ ============ */}
      <section className="bg-brand-lavender py-24 reveal" aria-labelledby="ep-faq">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <div className="mb-11">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Common questions
            </span>
            <h2 id="ep-faq" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              What institutions ask us first.
            </h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ============ PARTNER WITH VISGROW ============ */}
      <section id="partner" className="scroll-mt-24 bg-brand-gradient py-24 text-white reveal" aria-labelledby="ep-partner">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 lg:grid-cols-2 lg:items-start lg:px-10">
          <div>
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-[#F6A83D]">
              {t(copy?.cta?.eyebrow, "Partner with Visgrow")}
            </span>
            <h2 id="ep-partner" className="mb-5 text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.cta?.heading, "Let's talk about your cohort.")}
            </h2>
            <p className="mb-9 max-w-[480px] text-[16.5px] leading-[1.7] text-white/88">
              Tell us who your students are and where they&apos;re getting
              stuck. We&apos;ll tell you honestly whether we can help and what
              it would look like — no obligation.
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
            audience="Education Partner"
            interests={[
              "Career & Employability Services",
              "Visgrow-Hosted Internships",
              "International student cohort support",
              "Not sure yet — I'd like to talk",
            ]}
          />
        </div>
      </section>
    </>
  );
}
