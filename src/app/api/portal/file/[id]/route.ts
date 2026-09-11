import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { getCurrentStudent } from "@/lib/lms-auth";

/**
 * Download one of your own files.
 *
 * Payload's built-in `/api/student-documents/file/...` route inherits the
 * collection's read access, which is admin-only — deliberately, so nobody can
 * enumerate other people's resumes through the API. That leaves customers
 * with no way to fetch their own file, which is what this route is for.
 *
 * It checks the session cookie, loads the document, and refuses unless the
 * document's owner is the person asking.
 *
 * The bytes are then streamed back from wherever the file actually lives —
 * disk locally, Vercel Blob in production. Crucially it streams rather than
 * redirects: a Vercel Blob URL is unguessable but publicly readable, so
 * handing it to the browser would put a permanent, un-revocable link to
 * someone's resume in their history, their referrer headers, and anywhere
 * they happened to paste it. Proxying keeps the only route to the file one
 * that re-checks the session every single time.
 */

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const student = await getCurrentStudent();
  if (!student) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    const doc = await payload.findByID({
      collection: "student-documents",
      id,
      depth: 0,
    });

    const ownerId = typeof doc.student === "object" ? doc.student.id : doc.student;

    // Same response for "doesn't exist" and "isn't yours", so this can't be
    // used to work out which document ids are real.
    if (!doc.filename || String(ownerId) !== String(student.id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const filename = path.basename(doc.filename);
    let body: ArrayBuffer;

    if (doc.url && /^https?:\/\//i.test(doc.url)) {
      // Hosted storage (Vercel Blob).
      const upstream = await fetch(doc.url, { cache: "no-store" });
      if (!upstream.ok) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      body = await upstream.arrayBuffer();
    } else {
      // Local disk. Resolve inside the upload directory and confirm it stayed
      // there, so a crafted filename can't walk up into the rest of the
      // filesystem.
      const dir = path.join(process.cwd(), "private-uploads", "student-files");
      const full = path.join(dir, filename);
      if (!full.startsWith(dir)) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      const file = await fs.readFile(full);
      body = file.buffer.slice(
        file.byteOffset,
        file.byteOffset + file.byteLength,
      ) as ArrayBuffer;
    }

    return new NextResponse(body, {
      headers: {
        "Content-Type": doc.mimeType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${filename}"`,
        // Private documents must never sit in a shared cache.
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
