import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  getCurrentStudent,
  getStudentProgramSlugs,
  hasAcademyAccess,
} from "@/lib/lms-auth";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Skills Development | Visgrow Academy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AcademyModulePage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const student = await getCurrentStudent();
  if (!student) redirect("/sign-in");

  const slugs = await getStudentProgramSlugs(student);
  if (!hasAcademyAccess(student, slugs)) redirect("/portal");

  const number = Number((await params).number);
  if (!Number.isInteger(number) || number < 1) notFound();

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "academy-modules",
    where: {
      and: [{ number: { equals: number } }, { published: { equals: true } }],
    },
    limit: 1,
    depth: 0,
  });
  const mod = docs[0];
  if (!mod) notFound();

  const settings = await getSiteSettings();
  const noVideoTitle =
    (settings?.lessonNoVideoTitle ?? "").trim() || "This module's video is being added";
  const noVideoBody =
    (settings?.lessonNoVideoBody ?? "").trim() ||
    "It will appear here as soon as it's ready. In the meantime, the points and task below are a good place to start.";

  const covers = mod.covers ?? [];
  const resources = mod.resources ?? [];

  return (
    <article className="bg-brand-lavender pb-20">
      <header className="bg-brand-gradient py-10 text-white lg:py-12">
        <div className="mx-auto max-w-[860px] px-6 lg:px-10">
          <Link
            href="/my-academy"
            className="mb-5 inline-block text-[13px] font-semibold text-white/80 transition-colors hover:text-white"
          >
            ← All modules
          </Link>
          <p className="mb-2 text-[12.5px] font-extrabold uppercase tracking-[2px] text-white/80">
            Module {mod.number}
            {mod.durationMinutes ? ` · about ${mod.durationMinutes} min` : ""}
          </p>
          <h1 className="text-[clamp(26px,3.6vw,40px)] leading-[1.08]">{mod.title}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-[860px] px-6 lg:px-10">
        {mod.coachNote && (
          <p className="mt-8 rounded-[14px] border-l-4 border-brand-orange bg-white p-5 text-[14.5px] leading-[1.65] text-[var(--color-ink)]">
            <strong>From Mustafa:</strong> {mod.coachNote}
          </p>
        )}

        <div className="mt-8">
          {mod.youtubeId ? (
            <div className="aspect-video w-full overflow-hidden rounded-[18px] bg-[#241a33]">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(mod.youtubeId)}?rel=0&modestbranding=1`}
                title={`Module ${mod.number}: ${mod.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[18px] border-2 border-dashed border-brand-purple/40 bg-white p-8 text-center">
              <span className="text-[30px]" aria-hidden="true">🎧</span>
              <p className="text-[15.5px] font-extrabold text-[var(--color-ink)]">{noVideoTitle}</p>
              <p className="max-w-[420px] text-[13.5px] leading-relaxed text-brand-sub">{noVideoBody}</p>
            </div>
          )}
        </div>

        {(mod.summary || covers.length > 0) && (
          <section className="mt-9 rounded-[18px] bg-white p-7 lg:p-8">
            <h2 className="mb-3 text-[22px] text-[var(--color-ink)]">What this module covers</h2>
            {mod.summary && (
              <p className="whitespace-pre-wrap text-[15px] leading-[1.7] text-brand-sub">{mod.summary}</p>
            )}
            {covers.length > 0 && (
              <ul className="mt-5 flex flex-col gap-2.5">
                {covers.map((c, i) => (
                  <li key={c.id ?? i} className="flex gap-3 text-[14.5px] leading-snug text-[var(--color-ink)]">
                    <span aria-hidden="true" className="font-black text-[#1cae6f]">✓</span>
                    {c.text}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {mod.task && (
          <section className="mt-6 rounded-[18px] bg-white p-7 lg:p-8">
            <h2 className="mb-3 text-[22px] text-[var(--color-ink)]">Your task</h2>
            <p className="whitespace-pre-wrap text-[15px] leading-[1.7] text-brand-sub">{mod.task}</p>
          </section>
        )}

        {resources.length > 0 && (
          <section className="mt-6 rounded-[18px] bg-white p-7 lg:p-8">
            <h2 className="mb-4 text-[20px] text-[var(--color-ink)]">Downloads &amp; links</h2>
            <ul className="flex flex-col gap-2.5">
              {resources.map((r, i) => (
                <li key={r.id ?? i}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-[10px] border-[1.5px] border-[var(--color-line)] px-4 py-3.5 text-[14px] font-semibold text-[var(--color-ink)] transition-colors hover:border-brand-purple hover:text-brand-purple"
                  >
                    <span aria-hidden="true">📎</span>
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10 flex justify-between gap-4 text-[14px] font-bold">
          {number > 1 ? (
            <Link href={`/my-academy/${number - 1}`} className="text-brand-purple hover:underline">
              ← Previous module
            </Link>
          ) : (
            <span />
          )}
          <Link href={`/my-academy/${number + 1}`} className="text-brand-purple hover:underline">
            Next module →
          </Link>
        </div>
      </div>
    </article>
  );
}
