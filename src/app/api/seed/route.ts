import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { runSeed } from "@/payload/seed/run";
import { headers as nextHeaders } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Manual trigger for the content seed.
 *
 * The same seed runs automatically whenever the server starts, so this is
 * only here for when you want to run it on demand and see what happened.
 * It never overwrites anything that already has content.
 */
export async function GET() {
  try {
    const payload = await getPayload({ config });

    // Requires an admin login. Without this, a stranger could trigger a seed
    // on a fresh database and read back the site's internal structure.
    const { user } = await payload.auth({ headers: await nextHeaders() });
    if (!user) {
      return NextResponse.json(
        { error: "Log in to the admin first, then reload this page." },
        { status: 401 },
      );
    }

    const { created, skipped } = await runSeed(payload);

    return NextResponse.json({
      ok: true,
      created,
      skipped,
      next: "Open /admin to review and edit. Nothing here will be overwritten from now on.",
    });
  } catch (err) {
    console.error("[visgrow:seed] failed:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
