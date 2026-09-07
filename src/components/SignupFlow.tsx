"use client";

import { useState } from "react";

/**
 * "Price being confirmed" is an internal note, and it was being shown to
 * customers on the one page where they pick what to buy — twice. It tells a
 * stranger we don't know what we charge. Where there's no price yet we sell
 * the conversation instead, and the real price appears here automatically the
 * moment Mustafa sets it in the admin panel.
 */
const programs = [
  {
    key: "gap",
    slug: "career-strategy-gap-analysis",
    name: "Career Strategy & Gap Analysis",
    fallbackPrice: "Let's talk",
    blurb: "Find out exactly why you're being passed over.",
  },
  {
    key: "accelerator",
    slug: "14-day-accelerator",
    name: "14-Day Career Accelerator",
    fallbackPrice: "Let's talk",
    blurb: "A structured sprint from stuck to job-ready.",
  },
  {
    key: "coaching",
    slug: "career-coaching",
    name: "Ongoing Career Coaching",
    fallbackPrice: "Let's talk",
    blurb: "Six months of sustained one-on-one support.",
  },
  {
    key: "internship",
    slug: "hosted-internships",
    name: "Visgrow-Hosted Internship",
    fallbackPrice: "Let's talk",
    blurb: "Real local experience, coaching included.",
  },
  {
    key: "unsure",
    slug: "",
    name: "I'm not sure yet",
    fallbackPrice: "Free chat",
    blurb: "Tell us your situation and we'll recommend honestly.",
  },
];

const situations = [
  "Still studying",
  "Recently graduated",
  "Graduated 6+ months ago, still looking",
  "Working, but not in my field",
];

const fieldBase =
  "w-full rounded-[10px] border-[1.5px] border-[var(--color-line)] bg-white px-3.5 py-3 text-[14px] text-[var(--color-ink)] outline-none transition-colors focus:border-brand-purple";

export default function SignupFlow({
  preselect,
  prices = {},
}: {
  preselect?: string;
  prices?: Record<string, string>;
}) {
  const priceFor = (p: (typeof programs)[number]) =>
    (p.slug && prices[p.slug]) || p.fallbackPrice;

  const [step, setStep] = useState(preselect ? 2 : 1);
  const [program, setProgram] = useState(preselect ?? "");
  const [situation, setSituation] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const chosen = programs.find((p) => p.key === program);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    const next: Record<string, string> = {};
    if (!firstName) next.firstName = "Enter your first name";
    if (!lastName) next.lastName = "Enter your last name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: String(data.get("phone") ?? ""),
          fieldOfStudy: String(data.get("fieldOfStudy") ?? ""),
          audience: "student",
          enquiryType: chosen?.name ?? "Get started",
          message: `Situation: ${situation || "not given"}. ${String(data.get("message") ?? "")}`,
          consent: true,
          source: "/get-started",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-[20px] border-2 border-brand-purple bg-white p-10 text-center shadow-[0_20px_50px_rgba(105,24,220,0.15)]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-[24px] text-white" aria-hidden="true">
          ✓
        </div>
        <h2 className="mb-3 text-[28px] text-[var(--color-ink)]">You&apos;re in.</h2>
        <p className="mx-auto max-w-[460px] text-[15px] leading-relaxed text-brand-sub">
          We&apos;ve got your details for{" "}
          <strong className="text-[var(--color-ink)]">{chosen?.name}</strong>.
          Someone from Visgrow will be in touch within one business day to
          confirm the next step — no sales pitch, just the practical detail.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border border-[var(--color-line)] bg-white p-8 shadow-[0_20px_50px_rgba(105,24,220,0.12)] lg:p-10">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-3">
        {[1, 2].map((n) => (
          <div key={n} className="flex flex-1 items-center gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold ${
                step >= n ? "bg-brand-gradient text-white" : "bg-brand-lavender text-brand-sub"
              }`}
            >
              {n}
            </span>
            <span className={`text-[13px] font-bold ${step >= n ? "text-[var(--color-ink)]" : "text-brand-sub"}`}>
              {n === 1 ? "Choose your program" : "Your details"}
            </span>
            {n === 1 && <span className="h-px flex-1 bg-[var(--color-line)]" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="mb-2 text-[24px] text-[var(--color-ink)]">
            What are you here for?
          </h2>
          <p className="mb-6 text-[14px] text-brand-sub">
            Not sure? Pick the last option — we&apos;d rather point you to the
            right thing than sell you the wrong one.
          </p>

          <div className="flex flex-col gap-3">
            {programs.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  setProgram(p.key);
                  setStep(2);
                }}
                className="group flex items-center justify-between gap-4 rounded-[14px] border-[1.5px] border-[var(--color-line)] px-5 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-brand-purple hover:bg-brand-lavender"
              >
                <span>
                  <span className="block text-[15px] font-extrabold text-[var(--color-ink)] group-hover:text-brand-purple">
                    {p.name}
                  </span>
                  <span className="block text-[13px] text-brand-sub">{p.blurb}</span>
                </span>
                <span className="shrink-0 text-[14px] font-extrabold text-brand-purple">
                  {priceFor(p)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={submit} noValidate>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[12px] bg-brand-lavender px-5 py-3.5">
            <span className="text-[13.5px] font-bold text-[var(--color-ink)]">
              {chosen?.name ?? "Get started"}
              <span className="ml-2 font-semibold text-brand-purple">
                {chosen ? priceFor(chosen) : ""}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[12.5px] font-bold text-brand-purple underline underline-offset-2"
            >
              Change
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="su-first" className="mb-1.5 block text-[13px] font-bold">First name</label>
              <input id="su-first" name="firstName" autoComplete="given-name" className={fieldBase} />
              {errors.firstName && <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="su-last" className="mb-1.5 block text-[13px] font-bold">Last name</label>
              <input id="su-last" name="lastName" autoComplete="family-name" className={fieldBase} />
              {errors.lastName && <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.lastName}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="su-email" className="mb-1.5 block text-[13px] font-bold">Email</label>
            <input id="su-email" name="email" type="email" autoComplete="email" className={fieldBase} />
            {errors.email && <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.email}</p>}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="su-phone" className="mb-1.5 block text-[13px] font-bold">
                Phone <span className="font-medium text-brand-sub">(optional)</span>
              </label>
              <input id="su-phone" name="phone" type="tel" autoComplete="tel" className={fieldBase} />
            </div>
            <div>
              <label htmlFor="su-field" className="mb-1.5 block text-[13px] font-bold">
                Field of study <span className="font-medium text-brand-sub">(optional)</span>
              </label>
              <input id="su-field" name="fieldOfStudy" className={fieldBase} />
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="mb-2.5 text-[13px] font-bold">
              Where are you right now? <span className="font-medium text-brand-sub">(optional)</span>
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {situations.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSituation(situation === s ? "" : s)}
                  className={`rounded-full border-[1.5px] px-4 py-2 text-[13px] font-semibold transition-colors ${
                    situation === s
                      ? "border-brand-purple bg-brand-lavender text-brand-purple"
                      : "border-[var(--color-line)] text-brand-sub hover:border-brand-purple"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-5">
            <label htmlFor="su-msg" className="mb-1.5 block text-[13px] font-bold">
              Anything we should know? <span className="font-medium text-brand-sub">(optional)</span>
            </label>
            <textarea id="su-msg" name="message" rows={3} className={`${fieldBase} resize-y`} />
          </div>

          {status === "error" && (
            <p className="mt-4 rounded-[10px] bg-[#fff5f7] p-3.5 text-[13px] font-semibold text-brand-pink">
              Something went wrong. Try again, or email hello@visgrowinternships.com.au directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-7 w-full rounded-[10px] bg-brand-gradient py-4 text-[15px] font-extrabold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Confirm & get started"}
          </button>

          <p className="mt-3.5 text-center text-[12px] text-brand-sub">
            No payment taken now. We&apos;ll confirm everything with you first.
          </p>
        </form>
      )}
    </div>
  );
}
