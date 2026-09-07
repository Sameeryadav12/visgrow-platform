"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const options = [
  {
    key: "student",
    icon: "🎓",
    label: "I'm a Student or Graduate",
    sub: "Coaching, internships & workshops",
    href: "/#overview",
  },
  {
    key: "employer",
    icon: "🏢",
    label: "I'm an Employer",
    sub: "Build capability in your team",
    href: "/employers",
  },
  {
    key: "education",
    icon: "🏛️",
    label: "I'm an Education Institution",
    sub: "Partner on graduate outcomes",
    href: "/education-partners",
  },
];

const SEEN_KEY = "visgrow:audience-prompt-seen";

export default function AudiencePopup({
  enabled = true,
  heading = "Which one are you?",
  subheading = "One click and we'll take you to the right place.",
}: {
  enabled?: boolean;
  heading?: string;
  subheading?: string;
} = {}) {
  const [expanded, setExpanded] = useState(false);
  const [autoOpened, setAutoOpened] = useState(false);

  // Auto-open once per session, after the visitor has had a moment to read
  // the hero. Never re-opens once they've seen or dismissed it.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage unavailable — fall through and show it */
    }
    if (seen) return;

    const markSeen = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    };

    const open = () => {
      setExpanded(true);
      setAutoOpened(true);
      markSeen();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };

    // Whichever happens first: they scroll past the hero, or 7 seconds pass.
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) open();
    };

    const timer = setTimeout(open, 7000);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Auto-opened prompts close themselves; manually opened ones stay put.
  useEffect(() => {
    if (!expanded || !autoOpened) return;
    const closeTimer = setTimeout(() => setExpanded(false), 9000);
    return () => clearTimeout(closeTimer);
  }, [expanded, autoOpened]);

  if (!enabled) return null;

  return (
    <div className="floating-el fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {expanded && (
        <div
          role="dialog"
          aria-label="Choose your audience"
          className="w-[min(330px,calc(100vw-2.5rem))] overflow-hidden rounded-[20px] bg-white shadow-[0_28px_70px_rgba(36,26,51,0.28)] animate-[fadeIn_.22s_ease]"
        >
          {/* Brand header — inline gradient so the global
              `.bg-brand-gradient > *` rule can't override child positioning */}
          <div
            className="relative px-5 pb-5 pt-5 text-white"
            style={{
              background:
                "linear-gradient(90deg,#6918dc 0%,#b625b9 30%,#e94b6c 60%,#f6a83d 100%)",
            }}
          >
            <button
              onClick={() => {
                setExpanded(false);
                setAutoOpened(false);
              }}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[18px] leading-none text-white transition-colors hover:bg-white/35"
            >
              &times;
            </button>
            <p className="pr-10 text-[17px] font-extrabold leading-snug">
              {heading}
            </p>
            <p className="mt-1 pr-10 text-[12.5px] leading-snug text-white/85">
              {subheading}
            </p>
          </div>

          <div className="flex flex-col gap-2 p-4">
            {options.map((opt) => (
              <Link
                key={opt.key}
                href={opt.href}
                onClick={() => setExpanded(false)}
                className="group flex items-center gap-3.5 rounded-[14px] border-[1.5px] border-[var(--color-line)] px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-brand-purple hover:bg-brand-lavender"
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-brand-lavender text-[17px] transition-colors group-hover:bg-white"
                >
                  {opt.icon}
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="text-[13.5px] font-extrabold text-[var(--color-ink)] group-hover:text-brand-purple">
                    {opt.label}
                  </span>
                  <span className="text-[12px] leading-snug text-brand-sub">
                    {opt.sub}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[15px] font-bold text-[var(--color-line)] transition-all group-hover:translate-x-0.5 group-hover:text-brand-purple"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!expanded && (
        <button
          onClick={() => {
            setExpanded(true);
            setAutoOpened(false);
          }}
          className="flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3.5 text-[13.5px] font-bold text-white shadow-[0_10px_28px_rgba(105,24,220,0.35)] transition-transform hover:-translate-y-0.5 animate-[pulseGlow_2.5s_ease-in-out_infinite]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          {heading}
        </button>
      )}
    </div>
  );
}
