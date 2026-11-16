import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  getCurrentStudent,
  getStudentProgramSlugs,
  hasAcademyAccess,
} from "@/lib/lms-auth";

export const metadata: Metadata = {
  title: "Skills Development | Visgrow Academy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MyAcademyPage() {
  const student = await getCurrentStudent();
  if (!student) redirect("/sign-in");

  // Signed in is not enough. This is a paid program, so a customer who
  // bought something else must not be able to open it by typing the URL.
  const slugs = await getStudentProgramSlugs(student);
  if (!hasAcademyAccess(student, slugs)) redirect("/portal");

  const payload = await getPayload({ config });
  const { docs: modules } = await payload.find({
    collection: "academy-modules",
    where: { published: { equals: true } },
    sort: "number",
    limit: 100,
    depth: 0,
  });

  const workplace = modules.filter((m) => m.group !== "graduate");
  const graduate = modules.filter((m) => m.group === "graduate");
  const firstName = student.name.split(" ")[0];

  const row = (m: (typeof modules)[number]) => (
    <li key={m.id}>
      <Link
        href={`/my-academy/${m.number}`}
        className="flex items-center gap-4 rounded-[16px] border-2 border-[var(--color-line)] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-purple"
      >
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-brand-lavender text-[15px] font-extrabold text-brand-purple"
        >
          {m.number}
        </span>
        <span className="flex flex-1 flex-col">
          <span className="text-[15.5px] font-extrabold text-[var(--color-ink)]">
            {m.title}
          </span>
          {(m.summary || m.durationMinutes) && (
            <span className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-brand-sub">
              {m.summary ?? `About ${m.durationMinutes} minutes`}
            </span>
          )}
        </span>
        <span aria-hidden="true" className="shrink-0 text-[16px] font-bold text-brand-purple">
          →
        </span>
      </Link>
    </li>
  );

  return (
    <>
      <section className="bg-brand-gradient py-12 text-white lg:py-16">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-[12.5px] font-extrabold uppercase tracking-[2px] text-white/80">
                Visgrow Academy · Skills Development
              </p>
              <h1 className="text-[clamp(28px,3.8vw,44px)] leading-[1.05]">
                Good to see you, {firstName}.
              </h1>
              <p className="mt-3 max-w-[560px] text-[15.5px] leading-[1.65] text-white/90">
                Work through the modules at your own pace. Each one has a short
                video and something practical to do.
              </p>
            </div>
            <Link
              href="/portal"
              className="rounded-full border border-white/40 bg-white/15 px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-white/25"
            >
              ← Back to your portal
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-lavender pb-20 pt-8">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          {modules.length === 0 ? (
            <p className="rounded-[16px] bg-white p-8 text-center text-[15px] text-brand-sub">
              Your modules are being finalised. We&apos;ll email you as soon as
              the first one is ready.
            </p>
          ) : (
            <>
              <h2 className="mb-4 text-[20px] text-[var(--color-ink)]">
                Workplace skills
              </h2>
              <ol className="flex flex-col gap-3">{workplace.map(row)}</ol>

              {graduate.length > 0 && (
                <>
                  <h2 className="mb-4 mt-10 text-[20px] text-[var(--color-ink)]">
                    Graduate job-readiness add-on
                  </h2>
                  <ol className="flex flex-col gap-3">{graduate.map(row)}</ol>
                </>
              )}
            </>
          )}

          <p className="mt-8 text-center text-[13px] leading-relaxed text-brand-sub">
            Questions? Call{" "}
            <a href="tel:1300891365" className="font-semibold text-brand-purple">
              1300 891 365
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
