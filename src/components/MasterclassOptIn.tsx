"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function MasterclassOptIn() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!firstName) {
      setError("Enter your first name");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: "—",
          email,
          enquiryType: "Free Masterclass",
          message: "Requested the free masterclass on landing a job.",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-[18px] border border-white/25 bg-white/15 p-7 backdrop-blur">
        <p className="mb-2 text-[19px] font-extrabold">Check your inbox.</p>
        <p className="text-[14px] leading-relaxed text-white/85">
          We&apos;re sending you the masterclass now. If it doesn&apos;t arrive
          within a few minutes, check your spam folder — or email us and
          we&apos;ll send it again.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[18px] border border-white/25 bg-white/12 p-6 backdrop-blur">
      <p className="mb-4 text-[13.5px] font-bold text-white">
        Send it to me free — no cost, no obligation.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          name="firstName"
          aria-label="First name"
          placeholder="First name"
          className="w-full rounded-[10px] border border-white/30 bg-white/95 px-4 py-3 text-[14px] text-[var(--color-ink)] outline-none placeholder:text-brand-sub focus:border-white sm:w-[38%]"
        />
        <input
          name="email"
          type="email"
          aria-label="Email address"
          placeholder="Your email"
          className="w-full rounded-[10px] border border-white/30 bg-white/95 px-4 py-3 text-[14px] text-[var(--color-ink)] outline-none placeholder:text-brand-sub focus:border-white"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 rounded-[10px] bg-white px-6 py-3 text-[14px] font-extrabold text-brand-purple transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send it to me"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-[12.5px] font-semibold text-[#F6A83D]">{error}</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-[12.5px] font-semibold text-[#F6A83D]">
          Something went wrong. Try again, or email hello@visgrowinternships.com.au
        </p>
      )}

      <p className="mt-3.5 text-[11.5px] text-white/65">
        One email with the masterclass link. No spam, unsubscribe any time.
      </p>
    </form>
  );
}
