"use client";

import { useState } from "react";

const modules = [
  { day: 1, title: "Mindset & Positive Attitude", body: "Kill the limiting beliefs that are quietly sabotaging every application before you send it." },
  { day: 2, title: "Personality Awareness & NLP", body: "Understand how you're wired so you can play to your strengths in interviews, not against them." },
  { day: 3, title: "Goal Setting & the GROW Model", body: "Turn \"I want a job\" into a real, dated plan you actually follow through on." },
  { day: 4, title: "Your 30-Second Elevator Pitch", body: "Stop rambling when someone asks \"tell me about yourself.\" Say it in 30 seconds, and mean it." },
  { day: 5, title: "Personal Branding", body: "Build the brand that makes recruiters remember you after the call ends." },
  { day: 6, title: "Resume Strategy", body: "Rebuild your resume so it survives the ATS and gets a \"wow\" in 30 seconds." },
  { day: 7, title: "LinkedIn Optimisation", body: "Fix the profile that's currently working against you — SEO keywords, first impression, feed strategy." },
  { day: 8, title: "Cover Letter Coaching", body: "Show them you're the solution, not just another applicant, in three short paragraphs." },
  { day: 9, title: "Interview Preparation", body: "The SAR technique, the two questions every interview starts with, and how to actually answer them." },
  { day: 10, title: "Communication Skills", body: "Assertive, confident, clear — the communication style that gets remembered for the right reasons." },
  { day: 11, title: "Networking That Works", body: "How to walk into a room (or a LinkedIn DM) and make a connection that turns into an opportunity." },
  { day: 12, title: "Market & Industry Research", body: "Find the companies actually hiring, and the decision-makers actually worth reaching out to." },
  { day: 13, title: "Accessing the Hidden Job Market", body: "The jobs that never get advertised — and exactly how to tap into them." },
  { day: 14, title: "Final Review & Mock Interview", body: "Put it all together. Walk out ready, not hopeful." },
];

export default function AcceleratorTracker() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [active, setActive] = useState(1);

  const isLocked = (day: number) => day > 1 && !completed.includes(day - 1);
  const isDone = (day: number) => completed.includes(day);

  const complete = (day: number) => {
    setCompleted((c) => (c.includes(day) ? c : [...c, day]));
    if (day < 14) setActive(day + 1);
  };

  const progress = Math.round((completed.length / modules.length) * 100);

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
      <div>
        <div className="mb-4 flex items-center justify-between text-[13px] font-bold text-[var(--color-ink)]">
          <span>Your progress</span>
          <span className="text-brand-purple">{progress}%</span>
        </div>
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-[var(--color-line)]">
          <div
            className="h-full rounded-full bg-brand-gradient transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex max-h-[520px] flex-col gap-2 overflow-y-auto pr-1">
          {modules.map((m) => {
            const locked = isLocked(m.day);
            const done = isDone(m.day);
            return (
              <button
                key={m.day}
                disabled={locked}
                onClick={() => !locked && setActive(m.day)}
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
                  active === m.day
                    ? "border-brand-purple bg-brand-lavender"
                    : "border-[var(--color-line)] bg-white"
                } ${locked ? "opacity-70 cursor-not-allowed grayscale-[40%]" : "hover:border-brand-purple"}`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                    done
                      ? "bg-brand-gradient text-white"
                      : "bg-[var(--color-line)] text-brand-sub"
                  }`}
                >
                  {done ? "✓" : m.day}
                </span>
                <span className="flex-1 text-[13px] font-semibold text-[var(--color-ink)] leading-snug">
                  Day {m.day}: {m.title}
                </span>
                {locked && (
                  <span className="shrink-0 text-[14px] text-brand-sub" aria-hidden>
                    🔒
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--color-line)] bg-white p-8 lg:p-10">
        {modules
          .filter((m) => m.day === active)
          .map((m) => (
            <div key={m.day}>
              <span className="mb-3 block text-[12.5px] font-extrabold uppercase tracking-wider text-brand-pink">
                Day {m.day} of 14
              </span>
              <h3 className="mb-4 text-[26px] text-[var(--color-ink)]">{m.title}</h3>
              <p className="mb-8 text-[15px] leading-relaxed text-brand-sub">{m.body}</p>
              <button
                onClick={() => complete(m.day)}
                disabled={isDone(m.day)}
                className="rounded-xl bg-brand-gradient px-7 py-3 text-[13.5px] font-bold text-white shadow-[0_10px_24px_rgba(105,24,220,0.3)] transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isDone(m.day) ? "Completed ✓" : "Mark Day Complete →"}
              </button>
              <p className="mt-4 text-[12px] text-brand-sub">
                Preview only — the full accelerator is delivered live with your
                coach, day by day.
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
