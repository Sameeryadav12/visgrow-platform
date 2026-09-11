"use client";

import { useState } from "react";
import Link from "next/link";
import {
  QUESTIONS,
  scoreAnswers,
  type Result,
  type AreaScore,
} from "@/lib/scorecard";

/**
 * The interactive part of the scorecard.
 *
 * One question on screen at a time. A twelve-question form shown all at once
 * looks like homework and gets abandoned; one question with a progress bar
 * gets finished, because each answer is a tiny commitment and the bar makes
 * the end visible.
 *
 * The result is shown *before* any email is asked for. Gating it would raise
 * the email capture rate and lower the number of people who ever see how
 * useful this is — and the site's whole argument is that Visgrow tells you
 * the truth before it asks you for anything.
 */

type Stage = "intro" | "questions" | "result";

const INPUT =
  "w-full rounded-[10px] border-[1.5px] border-[var(--color-line)] bg-white px-3.5 py-3 text-[14px] text-[var(--color-ink)] outline-none transition-colors focus:border-brand-purple";

export default function Scorecard() {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const question = QUESTIONS[index];
  const progress = Math.round((index / QUESTIONS.length) * 100);

  const choose = (value: number) => {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);

    if (index + 1 < QUESTIONS.length) {
      setIndex(index + 1);
    } else {
      setResult(scoreAnswers(next));
      setStage("result");
    }
  };

  const back = () => setIndex((i) => Math.max(0, i - 1));

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setResult(null);
    setStage("intro");
  };

  // ------------------------------------------------------------------ intro
  if (stage === "intro") {
    return (
      <div className="mx-auto max-w-[640px] rounded-[22px] border-2 border-brand-purple bg-white p-8 text-center lg:p-11">
        <span className="mb-4 inline-block rounded-full bg-brand-lavender px-4 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[1.5px] text-brand-purple">
          Free · 2 minutes · no sign-up
        </span>
        <h2 className="mb-4 text-[clamp(26px,3.4vw,38px)] leading-[1.08] text-[var(--color-ink)]">
          Find out what&apos;s actually stopping you.
        </h2>
        <p className="mx-auto mb-8 max-w-[460px] text-[15.5px] leading-[1.7] text-brand-sub">
          Twelve questions about what you&apos;ve done, not how you feel. You
          get your score and your weakest area straight away — before we ask
          you for anything.
        </p>
        <button
          type="button"
          onClick={() => setStage("questions")}
          className="btn-shine rounded-full bg-brand-gradient px-9 py-4 text-[15px] font-extrabold text-white shadow-[0_14px_32px_rgba(105,24,220,0.28)] transition-transform hover:-translate-y-1"
        >
          Start the scorecard →
        </button>
        <p className="mt-6 text-[12.5px] leading-relaxed text-brand-sub">
          This measures how prepared you are. It can&apos;t predict whether
          you&apos;ll get a job — nobody can honestly tell you that.
        </p>
      </div>
    );
  }

  // -------------------------------------------------------------- questions
  if (stage === "questions") {
    return (
      <div className="mx-auto max-w-[640px] rounded-[22px] border border-[var(--color-line)] bg-white p-7 lg:p-10">
        <div className="mb-7">
          <div className="mb-2 flex items-baseline justify-between text-[12.5px] font-bold text-brand-sub">
            <span>
              Question {index + 1} of {QUESTIONS.length}
            </span>
            <span>{progress}%</span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-brand-lavender"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Scorecard progress"
          >
            <div
              className="h-full rounded-full bg-brand-gradient transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2
          className="mb-7 text-[clamp(20px,2.6vw,27px)] leading-[1.2] text-[var(--color-ink)]"
          aria-live="polite"
        >
          {question.text}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option, value) => {
            const selected = answers[question.id] === value;
            return (
              <button
                key={option}
                type="button"
                onClick={() => choose(value)}
                className={`rounded-[12px] border-[1.5px] px-5 py-4 text-left text-[14.5px] font-semibold transition-all hover:-translate-y-0.5 ${
                  selected
                    ? "border-brand-purple bg-brand-lavender text-brand-purple"
                    : "border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-brand-purple"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {index > 0 && (
          <button
            type="button"
            onClick={back}
            className="mt-6 text-[13.5px] font-bold text-brand-sub underline-offset-4 hover:text-brand-purple hover:underline"
          >
            ← Previous question
          </button>
        )}
      </div>
    );
  }

  // ----------------------------------------------------------------- result
  return <ResultPanel result={result!} onRestart={restart} answers={answers} />;
}

/* ------------------------------------------------------------------ result */

function ResultPanel({
  result,
  answers,
  onRestart,
}: {
  result: Result;
  answers: Record<string, number>;
  onRestart: () => void;
}) {
  return (
    <div className="mx-auto max-w-[760px]">
      {/* score */}
      <div className="mb-6 rounded-[22px] bg-brand-gradient p-8 text-center text-white lg:p-11">
        <p className="mb-3 text-[12px] font-extrabold uppercase tracking-[2px] text-white/80">
          Your job-readiness score
        </p>
        <p
          className="mb-2 text-[clamp(56px,10vw,88px)] leading-none"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {result.overall}
          <span className="text-[0.42em] align-super">/100</span>
        </p>
        <p className="text-[19px] font-extrabold">{result.band.title}</p>
      </div>

      {/* honest read */}
      <div className="mb-6 rounded-[18px] border border-[var(--color-line)] bg-white p-7">
        <p className="text-[15.5px] leading-[1.75] text-brand-sub">
          {result.band.summary}
        </p>
      </div>

      {/* breakdown */}
      <div className="mb-6 rounded-[18px] border border-[var(--color-line)] bg-white p-7">
        <h3 className="mb-5 text-[17px] font-extrabold text-[var(--color-ink)]">
          Where your marks came from
        </h3>
        <div className="flex flex-col gap-4">
          {result.areas.map((a) => (
            <Bar key={a.key} area={a} />
          ))}
        </div>
      </div>

      {/* the one thing to fix */}
      <div className="mb-6 rounded-[18px] border-2 border-brand-purple bg-white p-7">
        <p className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.5px] text-brand-pink">
          Fix this first — {result.weakest.label}
        </p>
        <p className="mb-5 text-[15.5px] leading-[1.75] text-[var(--color-ink)]">
          {result.weakest.problem}
        </p>
        <div className="rounded-[12px] bg-brand-lavender p-5">
          <p className="mb-1.5 text-[11.5px] font-extrabold uppercase tracking-[1.2px] text-brand-purple">
            Do this week — free
          </p>
          <p className="text-[14.5px] leading-[1.7] text-brand-sub">
            {result.weakest.firstStep}
          </p>
        </div>
      </div>

      {/* what's working — a result that's all criticism gets ignored */}
      <div className="mb-8 rounded-[18px] border border-[var(--color-line)] bg-white p-7">
        <p className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.5px] text-brand-purple">
          Already working — {result.strongest.label}
        </p>
        <p className="text-[15px] leading-[1.7] text-brand-sub">
          This is your strongest area. Keep doing it, and lean on it while you
          fix the rest — it&apos;s the part of your application that&apos;s
          already pulling its weight.
        </p>
      </div>

      <SaveResult result={result} answers={answers} />

      <div className="mt-8 text-center">
        <Link
          href="/students-graduates"
          className="btn-shine inline-block rounded-full bg-brand-gradient px-8 py-4 text-[15px] font-extrabold text-white shadow-[0_14px_32px_rgba(105,24,220,0.28)] transition-transform hover:-translate-y-1"
        >
          See how we&apos;d work on this with you →
        </Link>
        <p className="mt-5">
          <button
            type="button"
            onClick={onRestart}
            className="text-[13.5px] font-bold text-brand-sub underline-offset-4 hover:text-brand-purple hover:underline"
          >
            Start again
          </button>
        </p>
      </div>
    </div>
  );
}

function Bar({ area }: { area: AreaScore }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-[13.5px] font-bold text-[var(--color-ink)]">
        <span>{area.label}</span>
        <span className="text-brand-sub">{area.percent}%</span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-brand-lavender"
        role="progressbar"
        aria-valuenow={area.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${area.label} score`}
      >
        <div
          className="h-full rounded-full bg-brand-gradient transition-[width] duration-700"
          style={{ width: `${Math.max(area.percent, 3)}%` }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- save/email */

function SaveResult({
  result,
  answers,
}: {
  result: Result;
  answers: Record<string, number>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");

    try {
      const res = await fetch("/api/scorecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, consent, answers, result }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Try again in a moment.");
        return;
      }
      setState("done");
    } catch {
      setState("error");
      setMessage("Couldn't reach us. Check your connection and try again.");
    }
  };

  if (state === "done") {
    return (
      <div className="rounded-[18px] border border-[var(--color-line)] bg-brand-lavender p-7 text-center">
        <p className="mb-1.5 text-[17px] font-extrabold text-[var(--color-ink)]">
          Sent. Check your inbox.
        </p>
        <p className="text-[14.5px] leading-relaxed text-brand-sub">
          Your results are on their way. If you&apos;d rather just talk it
          through, call 1300 891 365 — no charge for the first conversation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[18px] border border-[var(--color-line)] bg-brand-lavender p-7"
    >
      <h3 className="mb-2 text-[17px] font-extrabold text-[var(--color-ink)]">
        Want this emailed to you?
      </h3>
      <p className="mb-5 text-[14px] leading-relaxed text-brand-sub">
        Optional — you&apos;ve already seen everything above. This just saves
        it, and means we can point you at the right guides.
      </p>

      <div className="mb-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="sc-name" className="sr-only">
            Your name
          </label>
          <input
            id="sc-name"
            className={INPUT}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="sc-email" className="sr-only">
            Your email
          </label>
          <input
            id="sc-email"
            type="email"
            className={INPUT}
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
      </div>

      <label className="mb-5 flex items-start gap-2.5 text-[13px] leading-relaxed text-brand-sub">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-purple)]"
        />
        <span>
          Send me my results and occasional career advice. I can unsubscribe
          any time.
        </span>
      </label>

      {state === "error" && (
        <p className="mb-4 rounded-[10px] bg-white px-4 py-3 text-[13.5px] text-brand-pink">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-shine rounded-full bg-brand-gradient px-7 py-3.5 text-[14.5px] font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Email me my results"}
      </button>

      <p className="mt-4 text-[12px] leading-relaxed text-brand-sub">
        Score: {result.overall}/100. We never sell or share your details.
      </p>
    </form>
  );
}
