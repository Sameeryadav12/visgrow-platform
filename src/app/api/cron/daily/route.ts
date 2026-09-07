import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { sendDailyDigest, sendStudentNudge } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * The once-a-day job.
 *
 * Two things happen here:
 *   1. Mustafa gets a digest of who he owes a call — so he never has to
 *      remember to open the admin.
 *   2. Students who have gone quiet get a warm nudge — this is the one that
 *      protects the completion rate, and completions are what produce
 *      testimonials.
 *
 * Trigger it once a day from whatever scheduler the host provides. It is
 * safe to run more than once: nudges are recorded, so nobody gets two.
 */

const DAYS_QUIET_BEFORE_NUDGE = 3;
const DAYS_BETWEEN_NUDGES = 7;

const daysBetween = (from: string | Date, to: Date = new Date()) =>
  Math.floor((to.getTime() - new Date(from).getTime()) / 86_400_000);

export async function GET(request: Request) {
  // Anyone could otherwise trigger emails to Mustafa and every student.
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not set. Refusing to run." },
      { status: 500 },
    );
  }

  const provided =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    new URL(request.url).searchParams.get("key") ??
    "";

  if (provided !== secret) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  const report = {
    followUpsDue: 0,
    newUncontacted: 0,
    studentsNudged: 0,
    digestSent: false,
    errors: [] as string[],
  };

  try {
    const payload = await getPayload({ config });
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const openStatuses = ["new", "contacted", "booked"];

    // ---------------------------------------------------- leads needing action
    const due = await payload.find({
      collection: "enquiries",
      where: {
        and: [
          { followUpDate: { less_than_equal: endOfToday.toISOString() } },
          { status: { in: openStatuses } },
        ],
      },
      sort: "followUpDate",
      limit: 50,
      depth: 0,
    });

    const fresh = await payload.find({
      collection: "enquiries",
      where: { status: { equals: "new" } },
      sort: "-createdAt",
      limit: 50,
      depth: 0,
    });

    report.followUpsDue = due.totalDocs;
    report.newUncontacted = fresh.totalDocs;

    // -------------------------------------------------- students who've stalled
    const active = await payload.find({
      collection: "students",
      where: { status: { equals: "active" } },
      limit: 500,
      depth: 0,
      pagination: false,
    });

    const stalled: { name: string; email: string; days: number }[] = [];

    for (const s of active.docs) {
      // Never nudge before their program has actually started.
      if (!s.startDate || new Date(s.startDate) > new Date()) continue;

      const lastActivity = s.lastSeen ?? s.startDate;
      const quiet = daysBetween(lastActivity);
      if (quiet < DAYS_QUIET_BEFORE_NUDGE) continue;

      // Don't nag. One nudge a week at most.
      if (s.lastNudgedAt && daysBetween(s.lastNudgedAt) < DAYS_BETWEEN_NUDGES) {
        continue;
      }

      const completed = s.completedDays ?? [];
      const nextDay = completed.length ? Math.max(...completed) + 1 : 1;

      try {
        await sendStudentNudge({
          name: s.name,
          email: s.email,
          daysQuiet: quiet,
          nextDay,
        });
        await payload.update({
          collection: "students",
          id: s.id,
          data: { lastNudgedAt: new Date().toISOString() },
        });
        stalled.push({ name: s.name, email: s.email, days: quiet });
        report.studentsNudged += 1;
      } catch (err) {
        report.errors.push(`nudge ${s.email}: ${String(err).slice(0, 80)}`);
      }
    }

    // ------------------------------------------------------------- the digest
    const result = await sendDailyDigest({
      due: due.docs.map((d) => ({
        id: d.id,
        name: d.name,
        phone: d.phone,
        enquiryType: d.enquiryType,
        followUpDate: d.followUpDate,
      })),
      fresh: fresh.docs.map((d) => ({
        id: d.id,
        name: d.name,
        enquiryType: d.enquiryType,
      })),
      stalled,
    });

    report.digestSent = !(result as { skipped?: boolean })?.skipped;

    console.log("[visgrow:cron]", JSON.stringify(report));
    return NextResponse.json({ ok: true, ...report });
  } catch (err) {
    console.error("[visgrow:cron] failed:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
