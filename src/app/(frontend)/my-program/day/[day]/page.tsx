import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { getCurrentStudent, unlockedThrough, unlocksOn } from "@/lib/lms-auth";
import DayComplete from "@/components/DayComplete";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "My program | Visgrow",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const student = await getCurrentStudent();
  if (!student) redirect("/sign-in");

  const day = Number((await params).day);
  if (!Number.isInteger(day) || day < 1) notFound();

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "lessons",
    where: { and: [{ day: { equals: day } }, { published: { equals: true } }] },
    limit: 1,
    depth: 1,
  });

  const lesson = docs[0];
  if (!lesson) notFound();

  // The check that actually protects the paid content.
  if (day > unlockedThrough(student)) {
    const opensAt = unlocksOn(student, day);
    return (
      <section className="flex flex-1 items-center bg-brand-lavender py-20">
        <div className="mx-auto max-w-[520px] px-6 text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[24px] shadow-[0_8px_24px_rgba(105,24,220,0.14)]"
          >
            🔒
          </div>
          <h1 className="mb-4 text-[clamp(26px,3.4vw,38px)] text-[var(--color-ink)]">
            Day {day} isn&apos;t open yet.
          </h1>
          <p className="mb-8 text-[15.5px] leading-[1.65] text-brand-sub">
            {opensAt
              ? `It opens on ${opensAt.toLocaleDateString("en-AU", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}.`
              : "It'll open shortly."}{" "}
            One day at a time is deliberate — this only works if you do the
            work between them.
          </p>
          <Link
            href="/my-program"
            className="rounded-full bg-brand-gradient px-7 py-3.5 text-[14.5px] font-extrabold text-white"
          >
            Back to my program
          </Link>
        </div>
      </section>
    );
  }

  const settings = await getSiteSettings();
  const noVideoTitle =
    (settings?.lessonNoVideoTitle ?? "").trim() || "This day's video is being added";
  const noVideoBody =
    (settings?.lessonNoVideoBody ?? "").trim() ||
    "It will appear here as soon as it's ready — you won't need to do anything. In the meantime the task below is the part that actually changes your outcome, so you can start on it now.";

  const done = (student.completedDays ?? []).includes(day);
  const resources = lesson.resources ?? [];

  return (
    <article className="bg-brand-lavender pb-20">
      {/* ---------------------------------------------------------- header */}
      <header className="bg-brand-gradient py-10 text-white lg:py-12">
        <div className="mx-auto max-w-[860px] px-6 lg:px-10">
          <Link
            href="/my-program"
            className="mb-5 inline-block text-[13px] font-semibold text-white/80 transition-colors hover:text-white"
          >
            ← All days
          </Link>
          <p className="mb-2 text-[12.5px] font-extrabold uppercase tracking-[2px] text-white/80">
            Day {lesson.day}
            {lesson.durationMinutes ? ` · about ${lesson.durationMinutes} min` : ""}
          </p>
          <h1 className="text-[clamp(26px,3.6vw,40px)] leading-[1.08]">
            {lesson.title}
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[860px] px-6 lg:px-10">
        {lesson.coachNote && (
          <p className="mt-8 rounded-[14px] border-l-4 border-brand-orange bg-white p-5 text-[14.5px] leading-[1.65] text-[var(--color-ink)]">
            <strong>From Mustafa:</strong> {lesson.coachNote}
          </p>
        )}

        {/* ---------------------------------------------------------- video */}
        <div className="mt-8">
          {lesson.youtubeId ? (
            <div className="aspect-video w-full overflow-hidden rounded-[18px] bg-[#241a33]">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}?rel=0&modestbranding=1`}
                title={`Day ${lesson.day} — ${lesson.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            /* "Video coming shortly" was a promise we had no date for, made to
               someone who has already paid. The Accelerator is coached live, so
               the honest version of this state is also the reassuring one — and
               it's editable in Site settings without touching code. */
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[18px] border-2 border-dashed border-brand-purple/40 bg-white p-8 text-center">
              <span className="text-[30px]" aria-hidden="true">
                🎧
              </span>
              <p className="text-[15.5px] font-extrabold text-[var(--color-ink)]">
                {noVideoTitle}
              </p>
              <p className="max-w-[420px] text-[13.5px] leading-relaxed text-brand-sub">
                {noVideoBody}
              </p>
            </div>
          )}
        </div>

        {/* ----------------------------------------------------------- task */}
        {lesson.task && (
          <section className="mt-9 rounded-[18px] bg-white p-7 lg:p-8">
            <h2 className="mb-3 text-[22px] text-[var(--color-ink)]">
              Today&apos;s task
            </h2>
            <p className="whitespace-pre-wrap text-[15px] leading-[1.7] text-brand-sub">
              {lesson.task}
            </p>

            {lesson.checklist && lesson.checklist.length > 0 && (
              <ul className="mt-6 flex flex-col gap-2.5">
                {lesson.checklist.map((c, i) => (
                  <li
                    key={c.id ?? i}
                    className="flex gap-3 rounded-[10px] bg-brand-lavender p-3.5 text-[14px] leading-snug text-[var(--color-ink)]"
                  >
                    <span aria-hidden="true" className="font-black text-brand-purple">
                      {i + 1}.
                    </span>
                    {c.text}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* ------------------------------------------------------ resources */}
        {resources.length > 0 && (
          <section className="mt-6 rounded-[18px] bg-white p-7 lg:p-8">
            <h2 className="mb-4 text-[20px] text-[var(--color-ink)]">
              Downloads &amp; links
            </h2>
            <ul className="flex flex-col gap-2.5">
              {resources.map((r, i) => {
                const file = r.file as { url?: string } | null | undefined;
                const href = r.url || file?.url;
                if (!href) return null;
                return (
                  <li key={r.id ?? i}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-[10px] border-[1.5px] border-[var(--color-line)] px-4 py-3.5 text-[14px] font-semibold text-[var(--color-ink)] transition-colors hover:border-brand-purple hover:text-brand-purple"
                    >
                      <span aria-hidden="true">📎</span>
                      {r.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* ------------------------------------------------------- complete */}
        <DayComplete day={lesson.day} initiallyDone={done} />

        <p className="mt-8 text-center text-[13px] leading-relaxed text-brand-sub">
          Something not landing? Call{" "}
          <a href="tel:1300891365" className="font-semibold text-brand-purple">
            1300 891 365
          </a>
          . Working it out alone is exactly what this program exists to stop.
        </p>
      </div>
    </article>
  );
}
