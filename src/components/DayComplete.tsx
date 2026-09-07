"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DayComplete({
  day,
  initiallyDone,
}: {
  day: number;
  initiallyDone: boolean;
}) {
  const router = useRouter();
  const [done, setDone] = useState(initiallyDone);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);

  const toggle = async () => {
    const next = !done;
    setSaving(true);
    setFailed(false);

    // Update straight away — waiting on the network to tick a checkbox feels
    // broken. Rolled back if the save fails.
    setDone(next);

    try {
      const res = await fetch("/api/lms/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, done: next }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setDone(!next);
      setFailed(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mt-8 rounded-[18px] bg-white p-7 text-center lg:p-8">
      {done ? (
        <>
          <div
            aria-hidden="true"
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1cae6f] text-[26px] text-white"
          >
            ✓
          </div>
          <h2 className="mb-2 text-[22px] text-[var(--color-ink)]">
            Day {day} done.
          </h2>
          <p className="mb-6 text-[14.5px] leading-relaxed text-brand-sub">
            That&apos;s one more than most people manage. Tomorrow&apos;s day
            opens automatically.
          </p>
          <button
            onClick={toggle}
            disabled={saving}
            className="text-[13px] font-semibold text-brand-sub underline underline-offset-2 disabled:opacity-60"
          >
            Actually, I haven&apos;t finished this
          </button>
        </>
      ) : (
        <>
          <h2 className="mb-2 text-[22px] text-[var(--color-ink)]">
            Finished the task?
          </h2>
          <p className="mb-6 text-[14.5px] leading-relaxed text-brand-sub">
            Only tick this once you&apos;ve actually done the work. Ticking it
            to feel productive is how people finish 14 days with nothing to
            show.
          </p>
          <button
            onClick={toggle}
            disabled={saving}
            className="rounded-full bg-brand-gradient px-8 py-3.5 text-[15px] font-extrabold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving…" : `Mark day ${day} complete`}
          </button>
        </>
      )}

      {failed && (
        <p className="mt-4 text-[13px] font-semibold text-brand-pink">
          Couldn&apos;t save that. Check your connection and try again.
        </p>
      )}
    </section>
  );
}
