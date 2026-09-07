"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StickyCta({
  enabled = true,
  text = "Not sure where to start?",
}: {
  enabled?: boolean;
  text?: string;
} = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enquire = document.getElementById("enquire");

    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 1.2;
      let atForm = false;
      if (enquire) {
        const r = enquire.getBoundingClientRect();
        atForm = r.top < window.innerHeight && r.bottom > 0;
      }
      setVisible(past && !atForm);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("has-sticky-cta");
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-sticky-cta", visible);
  }, [visible]);

  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[80] border-t border-[var(--color-line)] bg-white/95 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-10"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <p className="hidden text-[13.5px] font-semibold text-[var(--color-ink)] sm:block">
          {text}
          <span className="ml-1.5 font-normal text-brand-sub">
            One honest conversation, no pressure.
          </span>
        </p>
        <div className="flex flex-1 items-center justify-end gap-2.5 sm:gap-3">
          <Link
            href="/masterclass"
            className="flex-1 rounded-full border-2 border-[var(--color-line)] px-4 py-3 text-center text-[13px] font-bold text-[var(--color-ink)] transition-colors hover:border-brand-purple sm:flex-none sm:px-5 sm:py-2.5"
          >
            Free masterclass
          </Link>
          <Link
            href="/get-started"
            className="flex-1 rounded-full bg-brand-gradient px-4 py-3 text-center text-[13px] font-extrabold text-white shadow-[0_8px_20px_rgba(105,24,220,0.28)] transition-transform hover:-translate-y-0.5 sm:flex-none sm:px-6 sm:py-2.5"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
