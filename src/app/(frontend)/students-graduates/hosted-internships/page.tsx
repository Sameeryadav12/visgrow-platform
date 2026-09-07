import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import { getPageCopy, t, list, texts } from "@/lib/page-copy";
import { getProgramBySlug } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Visgrow-Hosted Internships in Adelaide | Visgrow",
  description:
    "Real, local work experience hosted and supervised by Visgrow — never outsourced. Real client-facing projects, coaching included, and a genuine reference on completion.",
  alternates: { canonical: "/students-graduates/hosted-internships" },
};

const pains = [
  {
    icon: "🔁",
    title: "The catch-22 nobody solves for you",
    body: "Every role wants experience. You can't get experience without a role. Everyone says \"just get some experience\" as if the door isn't locked.",
  },
  {
    icon: "🧾",
    title: "Certificates aren't experience",
    body: "You've done the online courses and collected the badges. Employers still ask what you've actually delivered for someone.",
  },
  {
    icon: "🚪",
    title: "Unpaid trials that go nowhere",
    body: "A day of shadowing, a week of filing. Nothing you can put on a resume, and nobody willing to be your reference afterwards.",
  },
];

const benefits = [
  {
    title: "Hosted by Visgrow — never outsourced",
    body: "We don't hand you to a stranger company and hope it works out. Your placement is run and supervised by us, start to finish, so the quality is ours to answer for.",
  },
  {
    title: "Real client-facing work",
    body: "Actual deliverables for actual organisations. Not shadowing, not busywork, not making coffee while someone else does the job.",
  },
  {
    title: "Coaching runs alongside it",
    body: "You're building your resume and your professional skills at the same time as the experience — so you finish ready, not just experienced.",
  },
  {
    title: "A reference that carries weight",
    body: "You leave with someone credible who can speak to your work, plus a portfolio piece and a real story for your next interview.",
  },
];

const consequences = [
  "Every month without real experience, your resume looks identical to the one you sent last month.",
  "\"Entry level\" roles keep asking for one to two years — and that gap never closes by waiting it out.",
  "You stay in the pile of applicants with potential, competing against people with proof.",
];

const steps = [
  {
    n: "01",
    title: "Apply & match",
    body: "We match you to a placement based on your field, your goals and your availability — not whoever happens to have a desk free.",
  },
  {
    n: "02",
    title: "Onboard & set goals",
    body: "Clear expectations from day one: what you'll work on, what you'll learn, and what you'll walk away holding.",
  },
  {
    n: "03",
    title: "Do real work, supervised",
    body: "Real projects with real deadlines and real feedback, with someone accountable for your development the whole way through.",
  },
  {
    n: "04",
    title: "Finish with proof",
    body: "A completed piece of work, a genuine reference, and an answer to \"tell me about your experience\" that isn't apologetic.",
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
      "I was able to land an internship with a global organisation working on AI models, all thanks to Mustafa.",
    name: "Nalin Gupta",
    role: "Graduate, Risk Advisory — Deloitte",
  },
];

const faqs = [
  {
    q: "Are these real internships or observation placements?",
    a: "Real work. You'll be given actual client-facing deliverables with deadlines and feedback. If a placement can't offer genuine work, we don't run it.",
  },
  {
    q: "Do you place me with an outside company?",
    a: "No. Visgrow-Hosted Internships are hosted and supervised by us directly. We're not a middleman passing you to a third party — that's the whole point of the model, and it's why we can stand behind the experience.",
  },
  {
    q: "Is the internship paid?",
    a: "No — and we'd rather say that plainly than let you find out later. This is a paid-for learning placement, not a job: you pay a program fee, and in return you get supervised client-facing work, coaching alongside it, and a reference at the end. That's the opposite of an unpaid trial, where you work for free and get nothing you can use. If what you need right now is income rather than experience, tell us and we'll say so.",
  },
  {
    q: "Do I need coaching before an internship?",
    a: "We strongly recommend it, and coaching is included. Experience only converts into an offer if you can articulate it — the internship gives you the story, the coaching teaches you to tell it.",
  },
  {
    q: "How long does a placement run?",
    a: "It depends on your field and availability. We'll set the length and scope with you at the start so there are no surprises on either side.",
  },
];

export default async function HostedInternshipsPage() {
  const copy = await getPageCopy("/students-graduates/hosted-internships");
  const cms_pains = list(copy?.pain?.items, pains);
  const cms_benefits = list(copy?.benefits?.items, benefits);
  const cms_consequences = texts(copy?.consequences?.items, consequences);
  const cms_steps = list(copy?.how?.steps, steps);
  const program = await getProgramBySlug("hosted-internships");
  const price = (program?.price ?? "").trim();
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Visgrow-Hosted Internships</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[1.5px]">
                Pillar 02 · Hosted Internships
              </span>

              <h1 className="mb-6 text-[clamp(32px,4.8vw,56px)] leading-[1.02]">
                {t(copy?.hero?.heading, "Real local experience — hosted by us, not outsourced to a stranger.")}
              </h1>

              <p className="mb-9 max-w-[540px] text-[16.5px] leading-[1.65] text-white/90">
                Not a course. Not a certificate. An actual internship with real
                projects, supervised by Visgrow, so you finish holding proof —
                not another piece of paper.
              </p>

              {/* The hero's first action was an anchor scroll, and the price
                  lived on another page. Both cost conversions: a $3,499
                  decision needs the real action and the real number in front
                  of the reader, not one click away. */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/get-started?program=internship"
                  className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1"
                >
                  Apply for an Internship
                </Link>
                <Link
                  href="#whats-different"
                  className="rounded-xl border-2 border-white/70 px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
                >
                  See what makes it different →
                </Link>
              </div>

              {price && (
                <p className="mt-6 text-[14px] leading-relaxed text-white/85">
                  <strong className="text-[17px] font-extrabold text-white">
                    {price}
                  </strong>{" "}
                  — placement, supervision and career coaching included.
                  Payment plans available.
                </p>
              )}
            </div>

            <div className="relative h-[340px] overflow-hidden rounded-[20px] border border-white/25 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/main-header.jpg"
                alt="A group of students and graduates together"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 1 · PAIN ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="hi-pain">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.pain?.eyebrow, "The catch-22")}
            </span>
            <h2 id="hi-pain" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.pain?.heading, "“Just get some experience” is easy to say and almost impossible to do alone.")}
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              It&apos;s the single most common advice graduates get, and the
              least actionable — because the people giving it aren&apos;t
              offering it.
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
      <section className="bg-brand-deep py-20 text-white reveal" aria-labelledby="hi-importance">
        <div className="mx-auto max-w-[900px] px-6 text-center lg:px-10">
          <span className="mb-4 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-orange">
            {t(copy?.importance?.eyebrow, "Why it matters")}
          </span>
          <h2 id="hi-importance" className="mb-6 text-[clamp(30px,3.8vw,46px)]">
            {t(copy?.importance?.heading, "Employers hire proof, not potential.")}
          </h2>
          <p className="mx-auto max-w-[680px] text-[16.5px] leading-[1.7] text-white/85">
            A degree shows you can study. Local experience shows you can work
            — inside an Australian workplace, with Australian expectations,
            alongside people who&apos;ll vouch for you. That single difference
            decides most shortlists.
          </p>
        </div>
      </section>

      {/* ============ 3 · BENEFITS ============ */}
      <section id="whats-different" className="scroll-mt-24 bg-brand-lavender py-24 reveal" aria-labelledby="hi-benefits">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.benefits?.eyebrow, "What makes it different")}
            </span>
            <h2 id="hi-benefits" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.benefits?.heading, "Hosted by us. That word matters.")}
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              Most internship programs are brokers — they introduce you to a
              company and step back. We host the placement ourselves, which
              means the quality of your experience is our responsibility, not
              someone else&apos;s spare capacity.
            </p>
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
      <section className="bg-white py-24 reveal" aria-labelledby="hi-consequences">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          {/* Of the photos we hold, this is the only one carrying the right
              emotion for "if you keep waiting" — every other option is a
              smiling group, which fights the section. The home page uses the
              same shot, so this one is cropped tighter and tinted toward the
              brand pink rather than purple: same source, visibly different
              picture. Replace with a real Visgrow photo as soon as we have
              one — on this page especially, real beats polished. */}
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            <div className="relative min-h-[320px] overflow-hidden rounded-[20px]">
              <Image
                src="/images/student-late-night.jpg"
                alt="A graduate working alone at a desk late at night"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="scale-[1.18] object-cover object-[70%_30%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(233,75,108,0.50),rgba(36,26,51,0.80))]" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span
                  aria-hidden="true"
                  className="mb-2 block text-[54px] leading-[0.5] text-white/45"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  &ldquo;
                </span>
                <blockquote className="text-[19px] font-bold leading-snug text-white">
                  I just need someone to give me a chance.
                </blockquote>
                <p className="mt-2.5 text-[13px] text-white/80">
                  That&apos;s the entire problem — and it&apos;s solvable.
                </p>
              </div>
            </div>

            <div>
              <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
                {t(copy?.consequences?.eyebrow, "If you keep waiting")}
              </span>
              <h2 id="hi-consequences" className="mb-7 text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
                {t(copy?.consequences?.heading, "The experience gap doesn't close on its own.")}
              </h2>
              <ul className="flex flex-col gap-4">
                {cms_consequences.map((c) => (
                  <li key={c} className="rounded-[16px] border-l-4 border-brand-pink bg-[#fff5f7] p-5 text-[14.5px] leading-[1.6] text-[var(--color-ink)]">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5 · RESULTS ============ */}
      <section className="bg-brand-gradient py-24 text-white reveal" aria-labelledby="hi-results">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-white/80">
              {t(copy?.results?.eyebrow, "People who got the first chance")}
            </span>
            <h2 id="hi-results" className="text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.results?.heading, "They needed one door opened. Then they did the rest.")}
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

      {/* ============ 6 · HOW TO IMPLEMENT ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="hi-how">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.how?.eyebrow, "How it works")}
            </span>
            <h2 id="hi-how" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.how?.heading, "From application to a reference worth having.")}
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
      <section className="bg-brand-lavender py-24 reveal" aria-labelledby="hi-faq">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <div className="mb-11">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Before you ask
            </span>
            <h2 id="hi-faq" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              Straight answers about how this works.
            </h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-brand-deep py-24 text-white reveal">
        <div className="mx-auto max-w-[760px] px-6 text-center lg:px-10">
          <h2 className="mb-6 text-[clamp(30px,3.8vw,46px)]">
            {t(copy?.cta?.heading, "Stop trying to get experience to get experience.")}
          </h2>
          <p className="mb-10 text-[16.5px] leading-[1.7] text-white/85">
            Tell us your field and where you&apos;re stuck. If a hosted
            internship is the right move we&apos;ll say so — and if coaching
            should come first, we&apos;ll say that instead.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-started?program=internship"
              className="rounded-xl bg-white px-9 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_16px_36px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1"
            >
              Apply for an Internship
            </Link>
            <Link
              href="/students-graduates/career-coaching"
              className="rounded-xl border-2 border-white/60 px-9 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
            >
              Explore Career Coaching
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
