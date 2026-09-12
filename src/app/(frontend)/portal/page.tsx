import type { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { requireStudent, unlockedThrough } from "@/lib/lms-auth";
import { getPortalData, formatWhen } from "@/lib/portal";

export const metadata: Metadata = {
  title: "Your portal | Visgrow",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * The overview.
 *
 * Written around one question: what do I do next? A dashboard that lists
 * everything equally makes someone decide, and deciding is where people stop.
 * So the next action is a single card at the top, and everything else is
 * supporting detail underneath.
 */
export default async function PortalPage() {
  const student = await requireStudent();
  const data = await getPortalData(student);

  const firstName = student.name.split(" ")[0];

  // Accelerator progress, only if they have it.
  let progress: { done: number; total: number; percent: number; nextDay: number | null } | null =
    null;

  if (data.hasAccelerator) {
    try {
      const payload = await getPayload({ config });
      const { docs: lessons } = await payload.find({
        collection: "lessons",
        where: { published: { equals: true } },
        sort: "day",
        limit: 60,
        depth: 0,
      });
      const done = new Set(student.completedDays ?? []);
      const open = unlockedThrough(student);
      const completed = lessons.filter((l) => done.has(l.day)).length;
      progress = {
        done: completed,
        total: lessons.length,
        percent: lessons.length ? Math.round((completed / lessons.length) * 100) : 0,
        nextDay: lessons.find((l) => l.day <= open && !done.has(l.day))?.day ?? null,
      };
    } catch {
      progress = null;
    }
  }

  const nextSession = data.upcoming[0] ?? null;
  const newestFile = data.documents[0] ?? null;

  return (
    <div className="mx-auto max-w-[1000px] px-6 py-10 lg:px-10 lg:py-14">
      <h1 className="mb-2 text-[clamp(26px,3.4vw,38px)] leading-[1.1] text-[var(--color-ink)]">
        Good to see you, {firstName}.
      </h1>
      <p className="mb-9 text-[15.5px] leading-[1.65] text-brand-sub">
        Everything you&apos;ve got with us is here. Nothing to keep track of
        anywhere else.
      </p>

      {/* ---------------------------------------------------- do this next */}
      <section className="mb-10 rounded-[18px] border-2 border-brand-purple bg-white p-7">
        <p className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.5px] text-brand-pink">
          Do this next
        </p>

        {progress?.nextDay ? (
          <>
            <p className="mb-5 text-[19px] font-extrabold leading-snug text-[var(--color-ink)]">
              Day {progress.nextDay} of your Accelerator is open.
            </p>
            <Link
              href={`/my-program/day/${progress.nextDay}`}
              className="inline-block rounded-full bg-brand-gradient px-7 py-3.5 text-[14.5px] font-extrabold text-white"
            >
              Continue where you left off →
            </Link>
          </>
        ) : nextSession ? (
          <>
            <p className="mb-2 text-[19px] font-extrabold leading-snug text-[var(--color-ink)]">
              {nextSession.title}
            </p>
            <p className="mb-5 text-[14.5px] text-brand-sub">
              {formatWhen(nextSession.scheduledFor)} · Adelaide time
            </p>
            <Link
              href="/portal/sessions"
              className="inline-block rounded-full bg-brand-gradient px-7 py-3.5 text-[14.5px] font-extrabold text-white"
            >
              See what to bring →
            </Link>
          </>
        ) : newestFile ? (
          <>
            <p className="mb-5 text-[19px] font-extrabold leading-snug text-[var(--color-ink)]">
              {newestFile.title} is waiting for you.
            </p>
            <Link
              href="/portal/files"
              className="inline-block rounded-full bg-brand-gradient px-7 py-3.5 text-[14.5px] font-extrabold text-white"
            >
              Open it →
            </Link>
          </>
        ) : (
          <>
            <p className="mb-5 text-[17px] leading-relaxed text-brand-sub">
              You&apos;re all set up and there&apos;s nothing waiting on you.
              We&apos;ll be in touch to book your first session — or call us on
              1300 891 365 if you&apos;d rather sort it now.
            </p>
            <a
              href="tel:1300891365"
              className="inline-block rounded-full bg-brand-gradient px-7 py-3.5 text-[14.5px] font-extrabold text-white"
            >
              Call 1300 891 365
            </a>
          </>
        )}
      </section>

      {/* ------------------------------------------------------ the cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {progress && (
          <Card
            title="Your Accelerator"
            href="/my-program"
            cta={progress.total ? "Open the program" : "See what's coming"}
          >
            {progress.total ? (
              <>
                <div className="mb-2 flex items-baseline justify-between text-[13px] font-semibold text-brand-sub">
                  <span>
                    {progress.done} of {progress.total} days done
                  </span>
                  <span>{progress.percent}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-brand-lavender">
                  <div
                    className="h-full rounded-full bg-brand-gradient"
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
              </>
            ) : (
              // No lessons published yet. "0 of 0 days done" next to an empty
              // bar reads as broken software, which is the last thing someone
              // who just paid should see.
              <p className="text-[14.5px] leading-relaxed text-brand-sub">
                Your program is being finalised. We&apos;ll email you the
                moment Day 1 is ready.
              </p>
            )}
          </Card>
        )}

        <Card
          title="Your sessions"
          href="/portal/sessions"
          cta={data.upcoming.length ? "See the details" : "View history"}
        >
          <p className="text-[14.5px] leading-relaxed text-brand-sub">
            {nextSession
              ? `Next: ${nextSession.title}, ${formatWhen(nextSession.scheduledFor)}.`
              : "Nothing booked right now."}
          </p>
        </Card>

        <Card
          title="Your files"
          href="/portal/files"
          cta={data.documents.length ? "Open them" : "Nothing yet"}
        >
          <p className="text-[14.5px] leading-relaxed text-brand-sub">
            {data.documents.length
              ? `${data.documents.length} ${data.documents.length === 1 ? "file" : "files"} — feedback, templates and session summaries.`
              : "Anything we write for you lands here."}
          </p>
        </Card>

        <Card title="Your account" href="/portal/account" cta="View details">
          <p className="text-[14.5px] leading-relaxed text-brand-sub">
            {data.programs.length
              ? data.programs.map((p) => p.title).join(" · ")
              : "Your details and what you've bought."}
          </p>
        </Card>
      </div>
    </div>
  );
}

function Card({
  title,
  href,
  cta,
  children,
}: {
  title: string;
  href: string;
  cta: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-[16px] border border-[var(--color-line)] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(105,24,220,0.12)]"
    >
      <h2 className="mb-3 text-[17px] font-extrabold text-[var(--color-ink)]">
        {title}
      </h2>
      <div className="mb-5 flex-1">{children}</div>
      <span className="text-[13px] font-extrabold text-brand-purple underline-offset-4 group-hover:underline">
        {cta} →
      </span>
    </Link>
  );
}
