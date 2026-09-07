"use client";

import { useState } from "react";

export default function SignInForm({
  initialMessage,
}: {
  initialMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email doesn't look right.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/lms/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-[20px] bg-white p-9 text-center text-[var(--color-ink)] shadow-[0_20px_50px_rgba(105,24,220,0.14)]">
        <div
          aria-hidden="true"
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-[24px] text-white"
        >
          ✉️
        </div>
        <h2 className="mb-3 text-[24px]">Check your email.</h2>
        <p className="mx-auto max-w-[380px] text-[14.5px] leading-relaxed text-brand-sub">
          If <strong className="text-[var(--color-ink)]">{email.trim()}</strong>{" "}
          is enrolled, a sign-in link is on its way. It works once and lasts 30
          minutes.
        </p>
        <p className="mt-5 text-[13px] text-brand-sub">
          Nothing after a minute or two? Check your spam folder, or call us on{" "}
          <a href="tel:1300891365" className="font-semibold text-brand-purple">
            1300 891 365
          </a>
          .
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-[13px] font-semibold text-brand-purple underline underline-offset-2"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-[20px] bg-white p-8 text-[var(--color-ink)] shadow-[0_20px_50px_rgba(105,24,220,0.14)] lg:p-9"
    >
      {initialMessage && (
        <p className="mb-5 rounded-[10px] bg-brand-lavender p-3.5 text-[13.5px] leading-relaxed text-[var(--color-ink)]">
          {initialMessage}
        </p>
      )}

      <label htmlFor="signin-email" className="mb-1.5 block text-[13px] font-bold">
        The email you enrolled with
      </label>
      <input
        id="signin-email"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-[10px] border-[1.5px] border-[var(--color-line)] bg-white px-3.5 py-3.5 text-[15px] text-[var(--color-ink)] outline-none transition-colors focus:border-brand-purple"
      />
      {error && (
        <p className="mt-2 text-[12.5px] font-semibold text-brand-pink">{error}</p>
      )}

      {status === "error" && (
        <p className="mt-4 rounded-[10px] bg-[#fff5f7] p-3.5 text-[13px] font-semibold text-brand-pink">
          Something went wrong. Try again, or call 1300 891 365.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 w-full rounded-[10px] bg-brand-gradient py-4 text-[15px] font-extrabold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Email me a sign-in link"}
      </button>

      <p className="mt-3.5 text-center text-[12px] text-brand-sub">
        We&apos;ll never ask you for a password.
      </p>
    </form>
  );
}
