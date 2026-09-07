"use client";

import { useState } from "react";

export default function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
          >
            <span className="text-[15px] font-bold text-[var(--color-ink)]">
              {item.q}
            </span>
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-lavender text-brand-purple text-[16px] font-bold transition-transform duration-200 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-6 text-[14px] leading-relaxed text-brand-sub">
                {item.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
