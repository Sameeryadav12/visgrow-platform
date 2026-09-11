"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Guide, Topic } from "@/lib/guides";

/**
 * The card grid on the Resources page.
 *
 * Filtering is by audience, not topic, because the main navigation links
 * straight here for students, employers and education partners. Those links
 * have to keep working, so the ?for= query parameter drives the filter.
 * Topic stays visible on the card art.
 *
 * Covers are generated from the brand palette rather than pulled from a
 * stock-photo service. Every article then has art that is on-brand, loads
 * instantly, costs nothing, needs no API key, and can never return a photo
 * that has nothing to do with the piece. The same slug always produces the
 * same cover, so a card doesn't change between visits.
 */

type Audience = Guide["audience"];
type Filter = Audience | "all";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All guides" },
  { key: "students", label: "Students & Graduates" },
  { key: "employers", label: "Employers" },
  { key: "education-partners", label: "Education Partners" },
];

const PALETTES: [string, string][] = [
  ["#6918DC", "#B625B9"],
  ["#B625B9", "#E94B6C"],
  ["#E94B6C", "#F6A83D"],
  ["#6918DC", "#E94B6C"],
  ["#8B1FD0", "#F6A83D"],
];

const ICONS: Record<Topic, string> = {
  "Job search":
    "M10 2a8 8 0 105.29 14.01l4.35 4.35 1.42-1.42-4.35-4.35A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z",
  Resumes:
    "M6 2h8l4 4v16H6V2zm7 1.5V7h3.5L13 3.5zM8 11h8v1.5H8V11zm0 3.5h8V16H8v-1.5zm0 3.5h5v1.5H8V18z",
  Interviews: "M4 4h16v11H7l-3 3V4zm3 3v1.5h10V7H7zm0 4v1.5h7V11H7z",
  Networking:
    "M12 2a3 3 0 013 3 3 3 0 01-2 2.83V10h4a2 2 0 012 2v1.17A3 3 0 0121 16a3 3 0 11-4-2.83V12h-4v1.17a3 3 0 11-2 0V12H7v1.17A3 3 0 113 16a3 3 0 012-2.83V12a2 2 0 012-2h4V7.83A3 3 0 019 5a3 3 0 013-3z",
  Internships:
    "M9 3h6v2h4a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4V3zm2 2v0h2V5h-2zM5 9v10h14V9H5z",
  "Study & habits":
    "M12 3L2 8l10 5 8-4v6h2V8L12 3zM6 13.5V17c0 1.66 2.69 3 6 3s6-1.34 6-3v-3.5l-6 3-6-3z",
  "For employers": "M3 7h6V5a2 2 0 012-2h2a2 2 0 012 2v2h6v12H3V7zm8-2v2h2V5h-2z",
  "For institutions":
    "M12 3l9 5-9 5-9-5 9-5zM5 12.5l7 3.9 7-3.9V17c0 1.5-3.13 3-7 3s-7-1.5-7-3v-4.5z",
};

function seed(text: string) {
  let n = 0;
  for (let i = 0; i < text.length; i += 1) n = (n * 31 + text.charCodeAt(i)) >>> 0;
  return n;
}

function Cover({ guide }: { guide: Guide }) {
  const [from, to] = PALETTES[seed(guide.slug) % PALETTES.length];
  return (
    <div
      className="relative flex h-[172px] items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    >
      <span className="absolute -left-8 -top-10 h-36 w-36 rounded-full bg-white/10" />
      <span className="absolute -bottom-14 right-2 h-40 w-40 rounded-full bg-white/10" />
      <svg viewBox="0 0 24 24" className="relative h-12 w-12 fill-white/90">
        <path d={ICONS[guide.topic]} />
      </svg>
      <span className="absolute bottom-3 left-4 rounded-full bg-black/25 px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-[1px] text-white backdrop-blur">
        {guide.topic}
      </span>
    </div>
  );
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const toFilter = (value: string | null): Filter | null =>
  value && FILTERS.some((f) => f.key === value) ? (value as Filter) : null;

export default function GuideGrid({ guides }: { guides: Guide[] }) {
  const [active, setActive] = useState<Filter>("all");

  // The header dropdown links to /resources?for=students (and employers,
  // education-partners). A query parameter is used rather than a #hash
  // because clicking a hash link while already on /resources changes nothing
  // Next.js re-renders — which is exactly why those three links looked dead.
  const params = useSearchParams();
  const wanted = toFilter(params.get("for"));

  useEffect(() => {
    if (!wanted) return;
    setActive(wanted);
    // The grid sits below the hero, so without this the page would look
    // unchanged and the link would still feel broken.
    document.getElementById("guides")?.scrollIntoView({ behavior: "smooth" });
  }, [wanted]);

  const shown =
    active === "all" ? guides : guides.filter((g) => g.audience === active);

  return (
    <div id="guides" className="scroll-mt-28">
      <div
        className="mb-10 flex flex-wrap gap-2.5"
        role="group"
        aria-label="Filter guides by audience"
      >
        {FILTERS.map((f) => {
          const on = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              aria-pressed={on}
              className={`rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-colors ${
                on
                  ? "bg-brand-gradient text-white"
                  : "bg-brand-lavender text-brand-sub hover:text-brand-purple"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((g) => (
          <article
            key={g.slug}
            className="flex flex-col overflow-hidden rounded-[18px] border border-[var(--color-line)] bg-white transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(105,24,220,0.13)]"
          >
            <Cover guide={g} />
            <div className="flex flex-1 flex-col p-6">
              <span className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[1.2px] text-brand-sub">
                {formatDate(g.published)} · {g.readTime} read
              </span>
              <h3
                className="mb-2.5 text-[17px] font-extrabold leading-snug text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {g.title}
              </h3>
              <p className="mb-5 flex-1 text-[13.5px] leading-[1.6] text-brand-sub">
                {g.blurb}
              </p>
              <Link
                href={`/resources/${g.slug}`}
                className="text-[13px] font-extrabold text-brand-purple underline-offset-4 hover:underline"
              >
                Read the guide →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="py-10 text-center text-[15px] text-brand-sub">
          Nothing here yet — try another audience.
        </p>
      )}
    </div>
  );
}
