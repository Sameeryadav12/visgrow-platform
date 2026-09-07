"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const enquiryTypes = [
  "Career Coaching",
  "14-Day Career Accelerator",
  "Visgrow-Hosted Internship",
  "Not sure yet — I'd like to chat",
];

const fieldBase =
  "w-full rounded-[10px] border-[1.5px] border-[var(--color-line)] bg-white px-3.5 py-3 text-[14px] text-[var(--color-ink)] outline-none transition-colors focus:border-brand-purple";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const enquiryType = String(data.get("enquiryType") ?? "").trim();
    const consent = data.get("consent");

    const nextErrors: Record<string, string> = {};
    if (!firstName) nextErrors.firstName = "Enter your first name";
    if (!lastName) nextErrors.lastName = "Enter your last name";
    if (!email) nextErrors.email = "Enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email address";
    if (!enquiryType) nextErrors.enquiryType = "Choose what you're interested in";
    if (!consent) nextErrors.consent = "Please accept before submitting";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data.entries()),
          audience: "student",
          consent: data.get("consent") === "on",
          source:
            typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-[20px] bg-white p-10 text-center shadow-[0_20px_50px_rgba(105,24,220,0.15)]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-[24px] text-white">
          ✓
        </div>
        <h3 className="mb-3 text-[26px] text-[var(--color-ink)]">
          Thanks — we&apos;ve got it.
        </h3>
        <p className="text-[14.5px] leading-relaxed text-brand-sub">
          Someone from Visgrow will be in touch within one business day. No
          sales pitch — just a straight conversation about where you&apos;re
          stuck.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[20px] bg-white p-8 text-[var(--color-ink)] shadow-[0_20px_50px_rgba(105,24,220,0.15)] lg:p-9"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-[13px] font-bold">
            First name
          </label>
          <input id="firstName" name="firstName" className={fieldBase} autoComplete="given-name" />
          {errors.firstName && (
            <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-[13px] font-bold">
            Last name
          </label>
          <input id="lastName" name="lastName" className={fieldBase} autoComplete="family-name" />
          {errors.lastName && (
            <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="email" className="mb-1.5 block text-[13px] font-bold">
          Email
        </label>
        <input id="email" name="email" type="email" className={fieldBase} autoComplete="email" />
        {errors.email && (
          <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.email}</p>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-[13px] font-bold">
            Phone <span className="font-medium text-brand-sub">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={fieldBase} autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="fieldOfStudy" className="mb-1.5 block text-[13px] font-bold">
            Field of study <span className="font-medium text-brand-sub">(optional)</span>
          </label>
          <input id="fieldOfStudy" name="fieldOfStudy" className={fieldBase} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="enquiryType" className="mb-1.5 block text-[13px] font-bold">
          What are you interested in?
        </label>
        <select id="enquiryType" name="enquiryType" className={fieldBase} defaultValue="">
          <option value="" disabled>
            Choose one…
          </option>
          {enquiryTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.enquiryType && (
          <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.enquiryType}</p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-[13px] font-bold">
          Where are you stuck? <span className="font-medium text-brand-sub">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${fieldBase} resize-y`}
          placeholder="Tell us what's been happening with your job search…"
        />
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 py-1 text-[13.5px] leading-relaxed text-brand-sub">
        <input
          type="checkbox"
          name="consent"
          className="mt-px h-[22px] w-[22px] shrink-0 cursor-pointer accent-[var(--color-purple)]"
        />
        <span>
          I&apos;m happy for Visgrow to contact me about my enquiry. No spam,
          and you can opt out any time. See our{" "}
          <a
            href="/privacy-policy"
            className="font-semibold text-brand-purple underline underline-offset-2"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>
      {errors.consent && (
        <p className="mt-1.5 text-[12.5px] font-semibold text-brand-pink">{errors.consent}</p>
      )}

      {status === "error" && (
        <p className="mt-4 rounded-[10px] bg-[#fff5f7] p-3.5 text-[13px] font-semibold text-brand-pink">
          Something went wrong sending that. Please try again, or email
          hello@visgrowinternships.com.au directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-[10px] bg-brand-gradient py-4 text-[15px] font-extrabold text-white transition-opacity hover:opacity-92 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Let's Chat — No Pressure"}
      </button>

      <p className="mt-3.5 text-center text-[12px] text-brand-sub">
        We reply within one business day.
      </p>
    </form>
  );
}
