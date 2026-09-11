import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { startSession } from "@/lib/lms-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * The target of the emailed sign-in link.
 *
 * The token is cleared as soon as it's used, so a forwarded or intercepted
 * email can't be replayed later.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const fail = (reason: string) =>
    NextResponse.redirect(`${SITE}/sign-in?problem=${reason}`);

  if (!token) return fail("missing");

  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "students",
      where: { loginToken: { equals: token } },
      limit: 1,
      depth: 0,
    });

    const student = res.docs[0];
    if (!student) return fail("invalid");

    const expires = student.loginTokenExpires
      ? new Date(student.loginTokenExpires).getTime()
      : 0;
    if (expires < Date.now()) return fail("expired");
    if (student.status === "revoked") return fail("noaccess");

    // Burn the token and record the visit.
    await payload.update({
      collection: "students",
      id: student.id,
      data: {
        loginToken: null,
        loginTokenExpires: null,
        lastSeen: new Date().toISOString(),
      },
    });

    await startSession(student.id);
    // Land on the portal, not the lesson list — a customer may have bought
    // coaching rather than the Accelerator, and the portal routes them either way.
    return NextResponse.redirect(`${SITE}/portal`);
  } catch (err) {
    console.error("[visgrow:lms] verify failed:", err);
    return fail("error");
  }
}
