import type { Metadata } from "next";
import { getCurrentStudent } from "@/lib/lms-auth";
import { getPortalData, formatWhen } from "@/lib/portal";
import type { CoachingSession } from "@/payload-types";

export const metadata: Metadata = {
  title: "Your sessions | Visgrow",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PortalSessionsPage() {
  const student = (await getCurrentStudent())!;
  const { upcoming, past } = await getPortalData(student);

  return (
    <div className="mx-auto max-w-[1000px] px-6 py-10 lg:px-10 lg:py-14">
      <h1 className="mb-2 text-[clamp(26px,3.4vw,38px)] leading-[1.1] text-[var(--color-ink)]">
        Your sessions
      </h1>
      <p className="mb-9 max-w-[560px] text-[15.5px] leading-[1.65] text-brand-sub">
        What&apos;s booked, what to bring, and what you agreed last time.
      </p>

      {upcoming.length === 0 && past.length === 0 ? (
        <div className="rounded-[16px] border border-[var(--color-line)] bg-white p-8">
          <p className="mb-2 text-[17px] font-extrabold text-[var(--color-ink)]">
            Nothing booked yet.
          </p>
          <p className="mb-5 text-[14.5px] leading-relaxed text-brand-sub">
            The people who get the most out of this are the ones who book the
            first session early, while they still have time to act on it.
          </p>
          <a
            href="tel:1300891365"
            className="inline-block rounded-full bg-brand-gradient px-6 py-3 text-[13.5px] font-extrabold text-white"
          >
            Call 1300 891 365 to book
          </a>
        </div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
                Coming up
              </h2>
              <ul className="grid gap-4">
                {upcoming.map((s) => (
                  <SessionCard key={s.id} session={s} upcoming />
                ))}
              </ul>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="mb-4 text-[13px] font-extrabold uppercase tracking-[2px] text-brand-sub">
                Already happened
              </h2>
              <ul className="grid gap-4">
                {past.map((s) => (
                  <SessionCard key={s.id} session={s} />
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function SessionCard({
  session,
  upcoming = false,
}: {
  session: CoachingSession;
  upcoming?: boolean;
}) {
  return (
    <li
      className={`rounded-[16px] bg-white p-6 ${
        upcoming
          ? "border-2 border-brand-purple"
          : "border border-[var(--color-line)]"
      }`}
    >
      <p className="mb-1 text-[12.5px] font-bold uppercase tracking-[1.2px] text-brand-sub">
        {formatWhen(session.scheduledFor)} · Adelaide time
      </p>
      <p className="mb-3 text-[18px] font-extrabold leading-snug text-[var(--color-ink)]">
        {session.title}
      </p>

      {upcoming && session.prep && (
        <div className="mb-4 rounded-[12px] bg-brand-lavender p-4">
          <p className="mb-1 text-[11.5px] font-extrabold uppercase tracking-[1.2px] text-brand-purple">
            Bring this
          </p>
          <p className="whitespace-pre-line text-[14px] leading-relaxed text-brand-sub">
            {session.prep}
          </p>
        </div>
      )}

      {session.outcome && session.status === "done" && (
        <div className="mb-4 rounded-[12px] border border-[var(--color-line)] p-4">
          <p className="mb-1 text-[11.5px] font-extrabold uppercase tracking-[1.2px] text-brand-pink">
            What you agreed
          </p>
          <p className="whitespace-pre-line text-[14px] leading-relaxed text-brand-sub">
            {session.outcome}
          </p>
        </div>
      )}

      {upcoming && session.meetingLink && (
        <a
          href={session.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-brand-gradient px-6 py-3 text-[13.5px] font-extrabold text-white"
        >
          Join the session →
        </a>
      )}

      {upcoming && !session.meetingLink && session.location && (
        <p className="text-[14px] font-semibold text-[var(--color-ink)]">
          📍 {session.location}
        </p>
      )}
    </li>
  );
}
