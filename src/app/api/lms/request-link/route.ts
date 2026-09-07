import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { newLoginToken, loginTokenExpiry } from "@/lib/lms-auth";
import { sendSignInLink } from "@/lib/email";
import { callerKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // Without this, someone who knows a student's email could flood their inbox.
  const limit = rateLimit(callerKey(request, "signin"), {
    max: 5,
    windowMs: 15 * 60_000,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let email = "";
  try {
    const body = await request.json();
    email = String(body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't look right." },
      { status: 422 },
    );
  }

  // Always answer the same way, whether or not the email is enrolled.
  // Otherwise this endpoint becomes a way to check who has bought the program.
  const generic = NextResponse.json({ ok: true }, { status: 200 });

  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "students",
      where: { email: { equals: email } },
      limit: 1,
      depth: 0,
    });

    const student = res.docs[0];
    if (!student || student.status === "revoked") return generic;

    const token = newLoginToken();
    await payload.update({
      collection: "students",
      id: student.id,
      data: { loginToken: token, loginTokenExpires: loginTokenExpiry() },
    });

    await sendSignInLink({
      name: student.name,
      email: student.email,
      token,
    });
  } catch (err) {
    console.error("[visgrow:lms] sign-in link failed:", err);
  }

  return generic;
}
