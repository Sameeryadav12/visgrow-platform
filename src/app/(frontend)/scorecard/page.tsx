import type { Metadata } from "next";
import Link from "next/link";
import Scorecard from "@/components/Scorecard";

export const metadata: Metadata = {
  title: "Free Job-Readiness Scorecard | Visgrow",
  description:
    "Twelve questions, two minutes, no sign-up. Find out which part of your job search is actually holding you back — direction, resume, interviews, network or local experience.",
  alternates: { canonical: "/scorecard" },
};

/**
 * The scorecard page.
 *
 * Follows the agreed narrative order — pain, why it matters, what you get,
 * what it costs to keep guessing, what it looks like, how to start — with
 * one difference: the tool sits near the top rather than the bottom. The
 * usual order exists to build enough belief to act. Here the action is free
 * and takes two minutes, so making someone read six sections first would
 * lose the people it was meant to convince.
 */
export default function ScorecardPage() {
  return (
    <>
      {/* ============ PAIN ============ */}
      <section className="bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-16 text-center lg:px-10 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-left text-[12.5px] font-semibold text-white/70"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-white">Scorecard</span>
          </nav>

          <span
            aria-hidden="true"
            className="mx-auto mb-7 block h-1 w-14 rounded-full bg-white/70"
          />
          <h1 className="mx-auto mb-5 max-w-[840px] text-[clamp(32px,4.8vw,56px)] leading-[1.04]">
            Forty applications. No replies. Nobody tells you why.
          </h1>
          <p className="mx-auto max-w-[620px] text-[16.5px] leading-[1.65] text-white/90">
            Rejection emails don&apos;t explain anything. So you change one
            thing, send another twenty, and hope. Two minutes from now
            you&apos;ll know which part is actually broken.
          </p>
        </div>
      </section>

      {/* ============ THE TOOL ============ */}
      <section className="bg-brand-lavender py-14 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Scorecard />
        </div>
      </section>

      {/* ============ IMPORTANCE ============ */}
      <section className="bg-white py-16 lg:py-20 reveal">
        <div className="mx-auto max-w-[760px] px-6 text-center lg:px-10">
          <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
            Why this matters
          </span>
          <h2 className="mb-6 text-[clamp(26px,3.4vw,38px)] leading-[1.1] text-[var(--color-ink)]">
            Guessing is the expensive part.
          </h2>
          <p className="text-[16px] leading-[1.8] text-brand-sub">
            Most graduates fix the wrong thing. They rewrite the resume for the
            fifth time when the real problem is that nobody in the industry
            knows their name — or they network hard with a resume that reads
            like a job description. Effort in the wrong place feels like
            progress and produces nothing, which is the most demoralising
            combination there is.
          </p>
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className="bg-brand-lavender py-16 lg:py-20 reveal">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mx-auto mb-10 max-w-[640px] text-center">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-purple">
              What you get
            </span>
            <h2 className="text-[clamp(26px,3.4vw,38px)] leading-[1.1] text-[var(--color-ink)]">
              An answer, not a sales pitch.
            </h2>
          </div>

          <div className="reveal-stagger in grid gap-6 md:grid-cols-3">
            {[
              {
                title: "A score you can act on",
                body: "Five areas, marked separately, so you can see which one is dragging the rest down instead of guessing.",
              },
              {
                title: "One thing to fix first",
                body: "Not a list of twenty. The single weakest area, why it costs you, and something specific you can do this week for free.",
              },
              {
                title: "No gate, no sign-up",
                body: "You see the whole result before we ask for anything. Your email is optional, and only if you want it saved.",
              },
            ].map((c) => (
              <div key={c.title} className="pillar-card">
                <h3 className="mb-3 text-[18px] font-extrabold text-[var(--color-ink)]">
                  {c.title}
                </h3>
                <p className="text-[14.5px] leading-[1.7] text-brand-sub">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONSEQUENCES ============ */}
      <section className="bg-white py-16 lg:py-20 reveal">
        <div className="mx-auto max-w-[760px] px-6 lg:px-10">
          <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
            What happens if you don&apos;t
          </span>
          <h2 className="mb-6 text-[clamp(26px,3.4vw,38px)] leading-[1.1] text-[var(--color-ink)]">
            Another six months of the same.
          </h2>
          <p className="mb-5 text-[16px] leading-[1.8] text-brand-sub">
            The applications keep going out. The replies keep not arriving. And
            the longer the gap on your resume gets, the harder the next
            conversation becomes — not because you got worse, but because
            employers read a gap as a question.
          </p>
          <p className="text-[16px] leading-[1.8] text-brand-sub">
            The graduates who get out of this are rarely the most qualified.
            They&apos;re the ones who worked out what was actually wrong and
            fixed that, instead of doing more of what wasn&apos;t working.
          </p>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="bg-brand-lavender py-16 lg:py-20 reveal">
        <div className="mx-auto max-w-[860px] px-6 lg:px-10">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-purple">
              How it works
            </span>
            <h2 className="text-[clamp(26px,3.4vw,38px)] leading-[1.1] text-[var(--color-ink)]">
              Two minutes, start to finish.
            </h2>
          </div>

          <ol className="grid gap-5">
            {[
              {
                n: "1",
                t: "Answer twelve questions",
                b: "All about things you've done, not how you feel. There's no way to talk yourself up, which is what makes the score worth having.",
              },
              {
                n: "2",
                t: "See your result immediately",
                b: "Your overall score, a mark for each of the five areas, and the one to fix first — on screen, straight away.",
              },
              {
                n: "3",
                t: "Do the free thing first",
                b: "Every result comes with one specific action for that week. Plenty of people do just that and never pay us anything. That's fine.",
              },
              {
                n: "4",
                t: "Talk to us if you want to move faster",
                b: "If you'd rather not work it out alone, the first conversation costs nothing and we'll tell you honestly whether we can help.",
              },
            ].map((s) => (
              <li
                key={s.n}
                className="flex gap-5 rounded-[16px] border border-[var(--color-line)] bg-white p-6"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-[18px] text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="mb-1.5 text-[17px] font-extrabold text-[var(--color-ink)]">
                    {s.t}
                  </h3>
                  <p className="text-[14.5px] leading-[1.7] text-brand-sub">
                    {s.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ HONESTY ============ */}
      <section className="bg-white py-14 lg:py-16">
        <div className="mx-auto max-w-[700px] px-6 lg:px-10">
          <div className="rounded-[18px] border border-[var(--color-line)] bg-brand-lavender p-7 text-center">
            <h2 className="mb-3 text-[20px] text-[var(--color-ink)]">
              What this isn&apos;t
            </h2>
            <p className="text-[14.5px] leading-[1.75] text-brand-sub">
              It&apos;s not a personality test, and it can&apos;t tell you
              whether you&apos;ll get a job — nobody can honestly promise that,
              and we won&apos;t. It measures how prepared you are, which is the
              one part of this you actually control.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
