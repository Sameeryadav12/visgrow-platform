import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  getCurrentStudent,
  unlockedThrough,
  unlocksOn,
  hasAcceleratorAccess,
  getStudentProgramSlugs,
} from "@/lib/lms-auth";

export const metadata: Metadata = {
  title: "My program | Visgrow",
  robots: { index: false, follow: false },
};

// Always live — a day unlocking is time-based, so this must never be cached.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const dayLabel = (d: Date) =>
  d.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });

export default async function MyProgramPage() {
  const student = await getCurrentStudent();
  if (!student) redirect("/sign-in");

  // Being signed in is not enough — this is the paid Accelerator, and a
  // coaching-only customer must not be able to read it by typing the URL.
  const slugs = await getStudentProgramSlugs(student);
  if (!hasAcceleratorAccess(student, slugs)) redirect("/portal");

  const payload = await getPayload({ config });
  const { docs: lessons } = await payload.find({
    collection: "lessons",
    where: { published: { equals: true } },
    sort: "day",
    limit: 60,
    depth: 0,
  });

  const open = unlockedThrough(student);
  const done = new Set(student.completedDays ?? []);
  const completed = lessons.filter((l) => done.has(l.day)).length;
  const percent = lessons.length
    ? Math.round((completed / lessons.length) * 100)
    : 0;

  // The next thing to actually do.
  const nextUp =
    lessons.find((l) => l.day <= open && !done.has(l.day)) ?? null;

  const firstName = student.name.split(" ")[0];

  return (
    <>
      {/* ---------------------------------------------------------- header */}
      <section className="bg-brand-gradient py-12 text-white lg:py-16">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-[12.5px] font-extrabold uppercase tracking-[2px] text-white/80">
                14-Day Career Accelerator
              </p>
              <h1 className="text-[clamp(28px,3.8vw,44px)] leading-[1.05]">
                Good to see you, {firstName}.
              </h1>
            </div>
            <Link
              href="/portal"
              className="rounded-full border border-white/40 bg-white/15 px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-white/25"
            >
              ← Back to your portal
            </Link>
          </div>

          {/* progress */}
          <div className="mt-8 max-w-[520px]">
            <div className="mb-2 flex items-baseline justify-between text-[13px] font-semibold">
              <span>
                {lessons.length
                  ? `${completed} of ${lessons.length} days done`
                  : "Program coming soon"}
              </span>
              <span className="text-white/80">{percent}%</span>
            </div>
            <div
              className="h-2.5 w-full overflow-hidden rounded-full bg-white/25"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Program progress"
            >
              <div
                className="h-full rounded-full bg-white transition-[width] duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {student.status === "paused" && (
            <p className="mt-6 max-w-[520px] rounded-[12px] bg-white/15 p-4 text-[13.5px] leading-relaxed">
              Your program is paused, so no new days are unlocking. Everything
              you&apos;ve already reached is still here whenever you&apos;re ready.
            </p>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------- next step */}
      {nextUp && (
        <section className="bg-brand-lavender py-8">
          <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[16px] border-2 border-brand-purple bg-white p-6">
              <div>
                <p className="mb-1 text-[12px] font-extrabold uppercase tracking-[1.5px] text-brand-pink">
                  Pick up here
                </p>
                <p className="text-[17px] font-extrabold text-[var(--color-ink)]">
                  Day {nextUp.day} — {nextUp.title}
                </p>
              </div>
              <Link
                href={`/my-program/day/${nextUp.day}`}
                className="rounded-full bg-brand-gradient px-6 py-3 text-[14px] font-extrabold text-white"
              >
                Continue →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ days */}
      <section className="bg-brand-lavender pb-20 pt-8">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          {lessons.length === 0 ? (
            <p className="rounded-[16px] bg-white p-8 text-center text-[15px] text-brand-sub">
              Your program is being finalised. We&apos;ll email you the moment
              Day 1 is ready.
            </p>
          ) : (
            <ol className="flex flex-col gap-3">
              {lessons.map((lesson) => {
                const isOpen = lesson.day <= open;
                const isDone = done.has(lesson.day);
                const opensAt = unlocksOn(student, lesson.day);

                const inner = (
                  <>
                    <span
                      aria-hidden="true"
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] text-[15px] font-extrabold ${
                        isDone
                          ? "bg-[#1cae6f] text-white"
                          : isOpen
                            ? "bg-brand-lavender text-brand-purple"
                            : "bg-[#f1eef7] text-[#b3aac5]"
                      }`}
                    >
                      {isDone ? "✓" : isOpen ? lesson.day : "🔒"}
                    </span>

                    <span className="flex flex-1 flex-col">
                      <span
                        className={`text-[15.5px] font-extrabold ${
                          isOpen ? "text-[var(--color-ink)]" : "text-[#9b93ad]"
                        }`}
                      >
                        Day {lesson.day} — {lesson.title}
                      </span>
                      <span className="mt-0.5 text-[13px] leading-snug text-brand-sub">
                        {isOpen
                          ? (lesson.summary ??
                            (lesson.durationMinutes
                              ? `About ${lesson.durationMinutes} minutes`
                              : ""))
                          : opensAt
                            ? `Opens ${dayLabel(opensAt)}`
                            : "Opens soon"}
                      </span>
                    </span>

                    {isOpen && (
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[16px] font-bold text-brand-purple"
                      >
                        →
                      </span>
                    )}
                  </>
                );

                return (
                  <li key={lesson.id}>
                    {isOpen ? (
                      <Link
                        href={`/my-program/day/${lesson.day}`}
                        className="flex items-center gap-4 rounded-[16px] border-2 border-[var(--color-line)] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-purple"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className="flex items-center gap-4 rounded-[16px] border-2 border-dashed border-[var(--color-line)] bg-white/60 p-5">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          )}

          <p className="mt-8 text-center text-[13px] leading-relaxed text-brand-sub">
            Stuck on something? Call{" "}
            <a href="tel:1300891365" className="font-semibold text-brand-purple">
              1300 891 365
            </a>{" "}
            — that&apos;s what the coaching is for.
          </p>
        </div>
      </section>
    </>
  );
}
