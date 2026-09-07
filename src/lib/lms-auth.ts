import crypto from "crypto";
import { cookies } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Student } from "@/payload-types";

/**
 * Sign-in for students.
 *
 * No passwords. They enter their email, we email a single-use link, and
 * clicking it proves they control that inbox — which is the same guarantee a
 * password reset gives you, without the resets to support.
 *
 * Two separate secrets-derived values are used: a random one-time token
 * stored against the student record (so a used link stops working), and an
 * HMAC-signed session cookie (so we don't hit the database on every page).
 */

const SECRET = process.env.PAYLOAD_SECRET || "";
const COOKIE = "visgrow_student";
const SESSION_DAYS = 30;
const LINK_MINUTES = 30;

const sign = (value: string) =>
  crypto.createHmac("sha256", SECRET).update(value).digest("hex");

/** A random, unguessable one-time token for the email link. */
export const newLoginToken = () => crypto.randomBytes(32).toString("hex");

export const loginTokenExpiry = () =>
  new Date(Date.now() + LINK_MINUTES * 60_000).toISOString();

/** cookie value = studentId.expiryMs.signature */
function makeSession(studentId: string | number): string {
  const expires = Date.now() + SESSION_DAYS * 86_400_000;
  const body = `${studentId}.${expires}`;
  return `${body}.${sign(body)}`;
}

function readSession(raw: string | undefined): string | null {
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [id, expires, signature] = parts;

  // Constant-time compare, so the signature can't be guessed by timing.
  const expected = sign(`${id}.${expires}`);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  if (Number(expires) < Date.now()) return null;
  return id;
}

export async function startSession(studentId: string | number) {
  const jar = await cookies();
  jar.set(COOKIE, makeSession(studentId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  });
}

export async function endSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

/**
 * The signed-in student, or null.
 *
 * Re-checks status on every request rather than trusting the cookie, so
 * revoking someone's access takes effect immediately instead of in 30 days.
 */
export async function getCurrentStudent(): Promise<Student | null> {
  try {
    const jar = await cookies();
    const id = readSession(jar.get(COOKIE)?.value);
    if (!id) return null;

    const payload = await getPayload({ config });
    const student = (await payload.findByID({
      collection: "students",
      id,
      depth: 0,
    })) as Student | null;

    if (!student || student.status === "revoked") return null;
    return student;
  } catch {
    return null;
  }
}

/**
 * Which days this student can open right now.
 *
 * Day 1 is available on their start date, day 2 the day after, and so on.
 * A paused student keeps whatever they had already reached.
 */
export function unlockedThrough(student: Student): number {
  if (student.unlockEverything) return 999;
  if (!student.startDate) return 0;

  const start = new Date(student.startDate);
  start.setHours(0, 0, 0, 0);

  // A paused student's clock stops on the day they were paused, so nothing
  // new appears while they're away. Their start date is shifted forward when
  // they resume, so they don't lose the days either.
  const asAt =
    student.status === "paused" && student.pausedAt
      ? new Date(student.pausedAt)
      : new Date();

  const today = asAt;
  today.setHours(0, 0, 0, 0);

  const daysElapsed = Math.floor(
    (today.getTime() - start.getTime()) / 86_400_000,
  );

  // Before their start date, nothing is open yet.
  if (daysElapsed < 0) return 0;
  return daysElapsed + 1;
}

/** When a locked day will open, so we can tell them rather than just refusing. */
export function unlocksOn(student: Student, day: number): Date | null {
  if (!student.startDate) return null;
  const d = new Date(student.startDate);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + (day - 1));
  return d;
}
