import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { callerKey, rateLimit } from "@/lib/rate-limit";
import { QUESTIONS, scoreAnswers, AREAS } from "@/lib/scorecard";
import { sendScorecardResult } from "@/lib/email";

export const runtime = "nodejs";

/**
 * Saves a completed scorecard as a lead.
 *
 * The score is recalculated here from the raw answers rather than trusting
 * the numbers the browser sends. Not because anyone would gain much from
 * faking a score, but because a record in the CRM that Mustafa is about to
 * make a sales call on should have been produced by our own scoring, not by
 * whatever arrived in the request body.
 *
 * The lead is written with the weakest area in the message, so he opens it
 * already knowing what to talk about — which is the entire point of the
 * exercise.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v?: string) => (v ?? "").trim();

type Body = {
  name?: string;
  email?: string;
  consent?: boolean;
  answers?: Record<string, number>;
};

export async function POST(request: Request) {
  const limit = rateLimit(callerKey(request, "scorecard"), {
    max: 5,
    windowMs: 10 * 60_000,
  });
  if (!limit.ok) {
    return NextResponse.json(
      {
        error:
          "That's a few too many in a short time. Try again shortly, or call 1300 891 365.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email).toLowerCase();

  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "We need a name and a valid email to send this to." },
      { status: 422 },
    );
  }
  if (!body.consent) {
    return NextResponse.json(
      { error: "Please tick the box so we know we're allowed to email you." },
      { status: 422 },
    );
  }

  // Only accept answers to questions we actually asked, and only values in
  // range. Anything else is discarded rather than rejected — a malformed
  // answer shouldn't cost someone the two minutes they just spent.
  const raw = body.answers ?? {};
  const answers: Record<string, number> = {};
  for (const q of QUESTIONS) {
    const v = Number(raw[q.id]);
    if (Number.isInteger(v) && v >= 0 && v <= 3) answers[q.id] = v;
  }

  const result = scoreAnswers(answers);

  // A short, readable summary. Mustafa reads this, not JSON.
  const breakdown = result.areas
    .map((a) => `  ${a.label}: ${a.percent}%`)
    .join("\n");

  const message = [
    `Completed the Job-Readiness Scorecard.`,
    ``,
    `Overall: ${result.overall}/100 — ${result.band.title}`,
    ``,
    `Breakdown:`,
    breakdown,
    ``,
    `Weakest area: ${result.weakest.label}`,
    `Strongest area: ${result.strongest.label}`,
    ``,
    `Suggested next step for them: ${AREAS[result.weakest.key].programSlug}`,
  ].join("\n");

  try {
    const payload = await getPayload({ config });

    // Warmth is set from the score, because it genuinely predicts the
    // conversation. A low score means more to fix and more to talk about;
    // someone already well prepared is usually shopping, not buying.
    const priority =
      result.overall < 35 ? "hot" : result.overall < 70 ? "warm" : "cold";

    await payload.create({
      collection: "enquiries",
      data: {
        name,
        email,
        audience: "student",
        enquiryType: `Scorecard — ${result.overall}/100, weakest: ${result.weakest.label}`,
        message,
        status: "new",
        priority,
        source: "/scorecard",
        consent: true,
      },
    });
  } catch (err) {
    // Saving is what matters least to the person in front of us — they've
    // already seen their result. Log it and carry on rather than showing
    // them an error for something that isn't their problem.
    console.error("[visgrow:scorecard] could not save lead:", err);
  }

  await sendScorecardResult({ name, email, result });

  return NextResponse.json({ ok: true });
}
