"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="floating-el fixed bottom-6 left-6 z-[90] flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-purple border-2 border-[var(--color-line)] shadow-[0_10px_28px_rgba(36,26,51,0.16)] transition-all hover:-translate-y-1 hover:border-brand-purple animate-[fadeIn_.2s_ease]"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 13V3M8 3L3 8M8 3l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
