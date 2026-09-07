"use client";

import { useState } from "react";

const fieldBase =
  "w-full rounded-[10px] border-[1.5px] border-[var(--color-line)] bg-white px-3.5 py-3 text-[14px] text-[var(--color-ink)] outline-none transition-colors focus:border-brand-purple";

export default function PartnerEnquiryForm({
  audience,
  interests,
}: {
  audience: "Employer" | "Education Partner";
  interests: string[];
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const organisation = String(data.get("organisation") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const interest = String(data.get("interest") ?? "").trim();

    const next: Record<string, string> = {};
    if (!name) next.name = "Enter your name";
    if (!organisation) next.organisation = "Enter your organisation";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid work email";
    if (!interest) next.interest = "Choose what you're interested in";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          organisation,
          email,
          phone: String(data.get("phone") ?? ""),
          audience: audience === "Employer" ? "employer" : "education",
          enquiryType: interest,
          message: String(data.get("message") ?? ""),
          consent: true,
          source: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-[20px] bg-white p-9 text-center text-[var(--color-ink)] shadow-[0_20px_50px_rgba(105,24,220,0.15)]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-[24px] text-white" aria-hidden="true">
          ✓
        </div>
        <h3 className="mb-3 text-[25px] text-[var(--color-ink)]">Thanks — we&apos;ll be in touch.</h3>
        <p className="mx-auto max-w-[420px] text-[14.5px] leading-relaxed text-brand-sub">
          Mustafa will come back to you within one business day to talk through
          what your team actually needs — no pitch deck, just a conversation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-[20px] bg-white p-8 text-[var(--color-ink)] shadow-[0_20px_50px_rgba(105,24,220,0.15)] lg:p-9"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pe-name" className="mb-1.5 block text-[13px] font-bold">Your name</label>
          <input id="pe-name" name="name" autoComplete="name" className={fieldBase} />
          {errors.name && <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="pe-org" className="mb-1.5 block text-[13px] font-bold">Organisation</label>
          <input id="pe-org" name="organisation" autoComplete="organization" className={fieldBase} />
          {errors.organisation && <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.organisation}</p>}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pe-email" className="mb-1.5 block text-[13px] font-bold">Work email</label>
          <input id="pe-email" name="email" type="email" autoComplete="email" className={fieldBase} />
          {errors.email && <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="pe-phone" className="mb-1.5 block text-[13px] font-bold">
            Phone <span className="font-medium text-brand-sub">(optional)</span>
          </label>
          <input id="pe-phone" name="phone" type="tel" autoComplete="tel" className={fieldBase} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="pe-interest" className="mb-1.5 block text-[13px] font-bold">
          What are you interested in?
        </label>
        <select id="pe-interest" name="interest" defaultValue="" className={fieldBase}>
          <option value="" disabled>Choose one…</option>
          {interests.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        {errors.interest && <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.interest}</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="pe-msg" className="mb-1.5 block text-[13px] font-bold">
          Tell us about your team <span className="font-medium text-brand-sub">(optional)</span>
        </label>
        <textarea
          id="pe-msg"
          name="message"
          rows={4}
          className={`${fieldBase} resize-y`}
          placeholder="Team size, roles, and what you'd like to see change…"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-[10px] bg-[#fff5f7] p-3.5 text-[13px] font-semibold text-brand-pink">
          Something went wrong. Try again, or email hello@visgrowinternships.com.au directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-[10px] bg-brand-gradient py-4 text-[15px] font-extrabold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Start the conversation"}
      </button>

      <p className="mt-3.5 text-center text-[12px] text-brand-sub">
        We reply within one business day. No obligation.
      </p>
    </form>
  );
}
