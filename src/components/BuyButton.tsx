"use client";

import { useState } from "react";

/**
 * Sends someone to Stripe Checkout.
 *
 * The price isn't passed from here — the server reads it from the CMS. If the
 * amount travelled with the request, anyone could edit it and pay $1.
 */
export default function BuyButton({
  programSlug,
  label = "Pay and start now",
  price,
  className = "",
  variant = "block",
}: {
  programSlug: string;
  label?: string;
  price?: string | null;
  className?: string;
  /** "block" for a pricing card; "onDark" to sit in a gradient CTA row. */
  variant?: "block" | "onDark";
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const go = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programSlug }),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error || "We couldn't start the payment. Please try again.");
        setBusy(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("We couldn't reach the payment page. Check your connection and try again.");
      setBusy(false);
    }
  };

  const onDark = variant === "onDark";
  const text = busy
    ? "Taking you to checkout…"
    : price
      ? `${label} — ${price}`
      : label;

  if (onDark) {
    return (
      <div className={className}>
        <button
          onClick={go}
          disabled={busy}
          className="rounded-xl bg-white px-9 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_16px_36px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1 disabled:opacity-70"
        >
          {text}
        </button>
        {error && (
          <p className="mt-3 max-w-[320px] text-[12.5px] font-semibold text-white">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        onClick={go}
        disabled={busy}
        className="w-full rounded-[10px] bg-brand-gradient py-4 text-[15px] font-extrabold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {text}
      </button>

      {error && (
        <p className="mt-3 rounded-[10px] bg-[#fff5f7] p-3 text-[13px] font-semibold text-brand-pink">
          {error}
        </p>
      )}

      <p className="mt-3 text-center text-[12px] leading-relaxed text-brand-sub">
        Secure payment by Stripe. We never see your card details.
        <br />
        Read the{" "}
        <a href="/terms-of-use" className="underline underline-offset-2">
          refund policy
        </a>{" "}
        before you pay.
      </p>
    </div>
  );
}
