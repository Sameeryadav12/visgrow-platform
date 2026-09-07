import { NextResponse } from "next/server";
import { endSession } from "@/lib/lms-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST() {
  await endSession();
  return NextResponse.json({ ok: true });
}

export async function GET() {
  await endSession();
  return NextResponse.redirect(`${SITE}/sign-in?problem=signedout`);
}
