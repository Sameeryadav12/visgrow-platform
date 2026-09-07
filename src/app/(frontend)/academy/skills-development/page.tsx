import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import { getPageCopy, t, list, texts } from "@/lib/page-copy";

export const metadata: Metadata = {
  title: "Skills Development Program | Visgrow Academy",
  description:
    "The Visgrow Employability & Success Framework delivered as a structured skills development program — mindset, personality awareness, goal setting, personal branding, communication, networking and the hidden job market.",
  alternates: { canonical: "/academy/skills-development" },
};

const modules = [
  {
    n: "01",
    title: "Positive Attitude & Mindset",
    body: "What success actually looks like, the effect of attitude on a job search, conveying positive language, and staying steady when situations aren't.",
    points: ["Focus on what you have, not what you don't", "Avoiding negative language patterns", "Staying positive under pressure"],
  },
  {
    n: "02",
    title: "Outer Impact & Presence",
    body: "How you land in a room before you've said anything of substance — posture, gesture, eye contact, listening and reading a new environment.",
    points: ["Body language and eye contact", "Responding to unfamiliar environments", "Active listening"],
  },
  {
    n: "03",
    title: "Conversation & High-Impact Personality",
    body: "The art of small talk, building rapport quickly, finding common ground, and the difference enthusiasm and specificity make.",
    points: ["Making small conversation well", "Finding common ground fast", "Impact words and being generous with detail"],
  },
  {
    n: "04",
    title: "Personality Awareness & NLP",
    body: "Understanding how you're wired using NLP and personality profiling — strengths, weaknesses, career suitability and how to build rapport with people unlike you.",
    points: ["What NLP is and how it helps", "Strengths, weaknesses and career fit", "Establishing rapport deliberately"],
  },
  {
    n: "05",
    title: "Goal Setting & the GROW Model",
    body: "Turning intent into dated, accountable plans — the six steps to personal goal setting, using GROW to coach yourself, and beating procrastination.",
    points: ["Why perseverance matters and how to build it", "Vision, mission and manifesting a plan", "The deadly trap of procrastination"],
  },
  {
    n: "06",
    title: "The 30-Second Elevator Pitch",
    body: "Who you are, how you add value, why you care and what you're aiming at — sharp enough to land at a networking event or an interview opener.",
    points: ["Common intro pitch mistakes", "Reading your audience first", "Building your own pitch template"],
  },
  {
    n: "07",
    title: "Personal Branding",
    body: "The power of a personal brand, the 5 P's, building credibility and recognition online, and how to measure whether it's actually working.",
    points: ["Designing your visual identity", "Offering value and building trust", "Common mistakes that kill a brand"],
  },
  {
    n: "08",
    title: "Resume & LinkedIn",
    body: "Structure, formatting, results-driven achievement statements, ATS compatibility — plus the LinkedIn profile decisions recruiters actually respond to.",
    points: ["Why the top half of your resume decides everything", "Tailoring to selection criteria", "LinkedIn SEO, recommendations and feed strategy"],
  },
  {
    n: "09",
    title: "Cover Letters",
    body: "The foundations of a cover letter that adds something — how to open, how to position yourself as the solution, and how to finish.",
    points: ["Common cover letter mistakes", "Showing you're the solution", "Templates and structure"],
  },
  {
    n: "10",
    title: "Interview Preparation",
    body: "Research, preparation, presentation and the SAR technique for behavioural, competency, situational and company questions — plus every follow-up scenario.",
    points: ["The two questions every interview opens with", "Using SAR to structure answers", "Follow-up after silence, and handling offers"],
  },
  {
    n: "11",
    title: "Communication Skills",
    body: "Assertive communication, active listening, physical gesture and voice, eliminating defensive responses, and how to socialise as an introvert.",
    points: ["Open vs closed questions and the 5 whys", "Avoiding workplace misunderstandings", "Building confidence in conversation"],
  },
  {
    n: "12",
    title: "Networking & the Hidden Job Market",
    body: "The roles that are never advertised, where to find the right rooms, and how to use alumni, associations and professional networks properly.",
    points: ["Where to find industry and networking events", "How to network online without being a nuisance", "Utilising alumni and membership bodies"],
  },
  {
    n: "13",
    title: "Market & Industry Research",
    body: "Locating the right organisations, finding decision-makers, identifying future skill demand and keeping up with local business news.",
    points: ["Finding key decision makers", "Spotting future career trends", "Market mapping and news alerts"],
  },
];

const faqs = [
  {
    q: "Is the whole framework delivered every time?",
    a: "No — most groups take the modules relevant to them. A graduate cohort might do mindset, brand, resume, interview and networking; a workplace team might focus on communication, presence and personal brand. We scope it with you.",
  },
  {
    q: "How long does the full program take?",
    a: "Delivered end to end it runs across several weeks. Individual modules work as standalone half-day or full-day workshops, which is how most organisations start.",
  },
  {
    q: "Who delivers it?",
    a: "Mustafa Kadir and the Visgrow team. It's delivered by people who've worked in industry and done the hiring, not by presenters reading someone else's material.",
  },
  {
    q: "Is this the same as the 14-Day Career Accelerator?",
    a: "They share the same framework. The Accelerator is the individual version for students and graduates, run as a personal 14-day sprint. Skills Development is the group version, delivered to cohorts and teams.",
  },
];

export default async function SkillsDevelopmentPage() {
  const copy = await getPageCopy("/academy/skills-development");
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/academy" className="hover:text-white">Academy</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Skills Development</span>
          </nav>

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[1.5px]">
            The Employability &amp; Success Framework
          </span>

          <h1 className="mb-5 max-w-[800px] text-[clamp(32px,4.6vw,54px)] leading-[1.04]">
            {t(copy?.hero?.heading, "Thirteen modules covering everything a qualification leaves out.")}
          </h1>
          <p className="max-w-[620px] text-[16.5px] leading-[1.65] text-white/90">
            The complete Visgrow framework — from mindset and personal brand
            through to interviews, networking and the hidden job market.
            Delivered to student cohorts and workplace teams.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="#modules"
              className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1"
            >
              See all 13 modules →
            </Link>
            <Link
              href="/academy#book"
              className="rounded-xl border-2 border-white/70 px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
            >
              Book a workshop
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 1 · PAIN ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="sd-pain">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[720px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Why this keeps happening
            </span>
            <h2 id="sd-pain" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              Nobody ever taught this. So everyone assumes they&apos;re the
              only one who missed it.
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              These are the skills every job description asks for and no
              curriculum covers. People are left to pick them up by accident —
              and then judged on them anyway.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "You can do the work. You can't sell it.",
                body: "The thinking is sound. It just doesn't survive the meeting, the email or the interview — so someone less capable gets the credit.",
              },
              {
                title: "Confidence keeps getting called a personality trait",
                body: "It isn't. It's preparation, self-awareness and practice — all three of which are learnable, and none of which anyone sat you down and taught.",
              },
              {
                title: "One workshop, then back to normal on Monday",
                body: "A single session on one skill can't hold. The gap reopens because the skills underneath it were never built.",
              },
            ].map((x) => (
              <div key={x.title} className="rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <h3 className="mb-2.5 text-[16.5px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
                  {x.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-brand-sub">{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY ============ */}
      <section className="bg-white py-20 reveal" aria-labelledby="sd-why">
        <div className="mx-auto max-w-[900px] px-6 text-center lg:px-10">
          <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
            {t(copy?.hero?.eyebrow, "Why a framework, not a workshop")}
          </span>
          <h2 id="sd-why" className="mb-5 text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
            These skills compound. Teaching them in isolation doesn&apos;t
            work.
          </h2>
          <p className="mx-auto max-w-[680px] text-[16px] leading-[1.7] text-brand-sub">
            A great resume gets wasted by a poor interview. Interview technique
            is undermined by low confidence. Confidence is hard without
            self-awareness. Each module holds up the next, which is why we
            built them as one framework rather than a menu of unrelated
            sessions.
          </p>
        </div>
      </section>

      {/* ============ MODULES ============ */}
      <section id="modules" className="scroll-mt-24 bg-brand-lavender py-24 reveal" aria-labelledby="sd-modules">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[680px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              The modules
            </span>
            <h2 id="sd-modules" className="mb-4 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              The full framework.
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              Run end to end as a program, or selected individually to suit
              your group.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <article key={m.n} className="flex flex-col rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <span className="mb-4 block text-[34px] leading-none text-brand-gradient" style={{ fontFamily: "var(--font-heading)" }}>
                  {m.n}
                </span>
                <h3 className="mb-3 text-[18px] font-extrabold leading-snug text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
                  {m.title}
                </h3>
                <p className="mb-5 text-[13.5px] leading-[1.65] text-brand-sub">{m.body}</p>
                <ul className="mt-auto flex flex-col gap-2 border-t border-[var(--color-line)] pt-4">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-2 text-[12.5px] leading-snug text-brand-sub">
                      <span className="font-black text-[#1cae6f]" aria-hidden="true">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4 · CONSEQUENCES + PROOF ============ */}
      <section className="bg-brand-gradient py-24 text-white reveal" aria-labelledby="sd-proof">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-white/80">
                Where this gets delivered
              </span>
              <h2 id="sd-proof" className="mb-6 text-[clamp(28px,3.6vw,42px)]">
                This isn&apos;t theory we wrote down. It&apos;s what we run,
                in rooms, every month.
              </h2>
              <p className="mb-7 text-[16px] leading-[1.7] text-white/85">
                The framework has been delivered to student cohorts and
                workplace teams across Adelaide — universities, TAFE,
                industry bodies and employers. Same thirteen modules,
                reframed for whoever is in the room.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Left alone, these gaps don't close — they get explained away as personality.",
                  "The capable people stay invisible, and the confident ones get the opportunities.",
                  "Another year passes where the qualification does all the talking.",
                ].map((x) => (
                  <li key={x} className="flex gap-3 text-[14.5px] leading-[1.6] text-white/90">
                    <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-[360px] overflow-hidden rounded-[20px] border border-white/25 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
              <Image
                src="/images/real/issua-full-room.jpg"
                alt="A Visgrow employability session being delivered to a full room"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(36,26,51,0.9),transparent)] p-6">
                <p className="text-[13px] font-bold leading-snug text-white">
                  The framework, delivered to a full cohort
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="sd-faq">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <div className="mb-11">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Common questions
            </span>
            <h2 id="sd-faq" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              How the program runs.
            </h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-brand-deep py-24 text-white reveal">
        <div className="mx-auto max-w-[760px] px-6 text-center lg:px-10">
          <h2 className="mb-5 text-[clamp(28px,3.6vw,42px)]">
            {t(copy?.cta?.heading, "Which of these does your group need?")}
          </h2>
          <p className="mb-10 text-[16.5px] leading-[1.7] text-white/85">
            Tell us who they are and where they&apos;re stalling. We&apos;ll
            recommend the modules that will actually move the needle — and
            leave out the ones that won&apos;t.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/academy#book"
              className="rounded-xl bg-white px-9 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_16px_36px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1"
            >
              Book a workshop
            </Link>
            <Link
              href="/students-graduates/14-day-accelerator"
              className="rounded-xl border-2 border-white/60 px-9 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
            >
              Looking for the individual version?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
