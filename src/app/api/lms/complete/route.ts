import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { getCurrentStudent, unlockedThrough } from "@/lib/lms-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Marks a day done, or undoes it. */
export async function POST(request: Request) {
  const student = await getCurrentStudent();
  if (!student) {
    return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  }

  let day = 0;
  let done = true;
  try {
    const body = await request.json();
    day = Number(body.day);
    done = body.done !== false;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Don't let someone mark a day they can't even open yet.
  if (!Number.isInteger(day) || day < 1 || day > unlockedThrough(student)) {
    return NextResponse.json({ error: "That day isn't open yet." }, { status: 403 });
  }

  const current = new Set(student.completedDays ?? []);
  if (done) current.add(day);
  else current.delete(day);

  try {
    const payload = await getPayload({ config });
    await payload.update({
      collection: "students",
      id: student.id,
      data: {
        completedDays: [...current].sort((a, b) => a - b),
        lastSeen: new Date().toISOString(),
      },
    });
    return NextResponse.json({ ok: true, completedDays: [...current] });
  } catch (err) {
    console.error("[visgrow:lms] progress update failed:", err);
    return NextResponse.json({ error: "Couldn't save that." }, { status: 500 });
  }
}
