"use client";

import { useEffect, useState } from "react";
import { masterclassChapters as fallbackChapters } from "@/lib/site-config";

const STORAGE_KEY = "visgrow:masterclass-unlocked";

function VideoPlayer({ youtubeId }: { youtubeId: string }) {
  if (!youtubeId) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[18px] border-2 border-dashed border-brand-purple/40 bg-brand-lavender p-8 text-center">
        <span className="text-[30px]" aria-hidden="true">🎬</span>
        <p className="text-[16px] font-extrabold text-[var(--color-ink)]">
          Masterclass video goes here
        </p>
        <p className="max-w-[420px] text-[13.5px] leading-relaxed text-brand-sub">
          Upload the masterclass to YouTube as <strong>Unlisted</strong>, then
          paste the video ID into{" "}
          <strong>Admin → Site settings → Masterclass</strong> and it will
          appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-[18px] bg-black">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
        title="Visgrow Masterclass — how to successfully land a job"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function MasterclassGate({
  youtubeId = "",
  chapters,
  duration = "",
}: {
  youtubeId?: string;
  chapters?: string[];
  /** From Site settings. The badge used to hard-code a length nobody had
      confirmed, so editing it in the CMS changed the page but not the badge. */
  duration?: string;
} = {}) {
  // Chapters and the video ID come from Site settings in the admin; the
  // built-in list is the fallback so the page is never empty.
  const chapterList = chapters?.length ? chapters : fallbackChapters;
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {
      /* storage unavailable — visitor just sees the form */
    }
    setReady(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const firstName = String(data.get("firstName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!firstName) return setError("Enter your first name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Enter a valid email address");

    setError("");
    setSubmitting(true);

    // Unlock immediately — the visitor never waits on the network.
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setUnlocked(true);

    // Record the signup in the background.
    fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: firstName,
        email,
        audience: "student",
        enquiryType: "Free Masterclass",
        message: "Signed up to watch the free masterclass.",
        consent: true,
        source: "/masterclass",
      }),
    }).catch(() => {
      /* the visitor already has access; nothing to surface */
    });
  };

  if (!ready) {
    return <div className="aspect-video w-full rounded-[18px] bg-brand-lavender" />;
  }

  if (unlocked) {
    return (
      <div>
        <VideoPlayer youtubeId={youtubeId} />
        <p className="mt-5 text-[13.5px] text-brand-sub">
          Watch it in your own time — you can come back to this page whenever
          you like and it&apos;ll still be here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div className="rounded-[20px] border-2 border-brand-purple bg-white p-8 shadow-[0_20px_50px_rgba(105,24,220,0.14)] lg:p-9">
        <span className="mb-4 inline-block rounded-full bg-brand-lavender px-3.5 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[1.2px] text-brand-purple">
          {duration ? `Free · ${duration} · No payment` : "Free · No payment · No catch"}
        </span>
        <h2 className="mb-3 text-[26px] text-[var(--color-ink)]">
          Tell us where to send it, and it starts playing.
        </h2>
        <p className="mb-7 text-[14.5px] leading-[1.65] text-brand-sub">
          Two details, nothing else. The video unlocks on this page
          straight away — we&apos;ll also email you the link so you can pick it
          up later.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="mc-first" className="mb-1.5 block text-[13px] font-bold text-[var(--color-ink)]">
              First name
            </label>
            <input
              id="mc-first"
              name="firstName"
              autoComplete="given-name"
              className="w-full rounded-[10px] border-[1.5px] border-[var(--color-line)] px-3.5 py-3 text-[14px] text-[var(--color-ink)] outline-none transition-colors focus:border-brand-purple"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="mc-email" className="mb-1.5 block text-[13px] font-bold text-[var(--color-ink)]">
              Email
            </label>
            <input
              id="mc-email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-[10px] border-[1.5px] border-[var(--color-line)] px-3.5 py-3 text-[14px] text-[var(--color-ink)] outline-none transition-colors focus:border-brand-purple"
            />
          </div>

          {error && (
            <p className="mb-4 text-[12.5px] font-semibold text-brand-pink">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-[10px] bg-brand-gradient py-4 text-[15px] font-extrabold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            Watch the masterclass now →
          </button>

          <p className="mt-3.5 text-center text-[12px] text-brand-sub">
            No payment, no obligation, unsubscribe any time.
          </p>
        </form>
      </div>

      <div>
        <h3 className="mb-5 text-[21px] text-[var(--color-ink)]">
          What&apos;s covered
        </h3>
        <ul className="flex flex-col gap-3">
          {chapterList.map((c) => (
            <li key={c} className="flex items-start gap-3 text-[14.5px] leading-snug text-brand-sub">
              <span className="mt-0.5 font-black text-[#1cae6f]" aria-hidden="true">✓</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
