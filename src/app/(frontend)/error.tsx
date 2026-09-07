"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Shown when a page throws.
 *
 * Never displays the technical error to the visitor — it tells them nothing
 * useful and looks broken. It gets logged for us, and the visitor gets a
 * retry plus a phone number, because someone hitting an error mid-enquiry is
 * a sale about to be lost.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[visgrow:page-error]", error);
  }, [error]);

  return (
    <section className="flex flex-1 items-center bg-brand-lavender py-20 lg:py-28">
      <div className="mx-auto max-w-[620px] px-6 text-center lg:px-10">
        <div
          aria-hidden="true"
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[24px] shadow-[0_8px_24px_rgba(105,24,220,0.14)]"
        >
          ⚠️
        </div>

        <h1 className="mb-4 text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
          Something went wrong at our end.
        </h1>
        <p className="mb-8 text-[16px] leading-[1.65] text-brand-sub">
          Not your fault, and nothing you entered has been lost. Try again — and
          if it keeps happening, call us and we&apos;ll sort it out directly.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-full bg-brand-gradient px-7 py-3.5 text-[14.5px] font-extrabold text-white"
          >
            Try again
          </button>
          <a
            href="tel:1300891365"
            className="rounded-full border-2 border-[var(--color-line)] bg-white px-7 py-3.5 text-[14.5px] font-bold text-[var(--color-ink)] transition-colors hover:border-brand-purple"
          >
            Call 1300 891 365
          </a>
        </div>

        <p className="mt-8 text-[12.5px] text-brand-sub">
          <Link href="/" className="underline underline-offset-2">
            Back to the home page
          </Link>
        </p>
      </div>
    </section>
  );
}
