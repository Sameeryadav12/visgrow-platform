import { getPayload } from "payload";
import config from "@payload-config";
import { headers as nextHeaders } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Downloads every enquiry as a CSV, for Excel or for moving to another system.
 *
 * Nobody should feel locked in to a CRM. Requires an admin login — this is
 * personal data and must never be publicly readable.
 */

const cell = (v: unknown): string => {
  if (v === null || v === undefined) return "";
  const s = String(v);
  // Escape quotes, and wrap anything containing a comma, quote or newline.
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET() {
  try {
  const payload = await getPayload({ config });

  // Reuse the admin session cookie — no separate auth to manage.
  const { user } = await payload.auth({ headers: await nextHeaders() });
  if (!user) {
    return new Response("You need to be logged in to the admin to do this.", {
      status: 401,
    });
  }

  const res = await payload.find({
    collection: "enquiries",
    limit: 5000,
    sort: "-createdAt",
    depth: 1,
  });

  const columns: [string, (d: Record<string, unknown>) => unknown][] = [
    ["Received", (d) => d.createdAt],
    ["Name", (d) => d.name],
    ["Email", (d) => d.email],
    ["Phone", (d) => d.phone],
    ["Organisation", (d) => d.organisation],
    ["Who they are", (d) => d.audience],
    ["Asked about", (d) => d.enquiryType],
    [
      "Program",
      (d) => (d.program as { title?: string } | null)?.title ?? "",
    ],
    ["Likely value", (d) => d.value],
    ["Status", (d) => d.status],
    ["How warm", (d) => d.priority],
    ["Follow up on", (d) => d.followUpDate],
    ["Consent given", (d) => (d.consent ? "Yes" : "No")],
    ["Came from", (d) => d.source],
    ["Their message", (d) => d.message],
    ["Private notes", (d) => d.notes],
    [
      "Contact history",
      (d) =>
        ((d.activity as { date?: string; note?: string }[] | undefined) ?? [])
          .map(
            (a) =>
              `${a.date ? new Date(a.date).toLocaleDateString("en-AU") : ""}: ${a.note ?? ""}`,
          )
          .join(" | "),
    ],
  ];

  const rows = [
    columns.map(([h]) => cell(h)).join(","),
    ...res.docs.map((d) =>
      columns
        .map(([, get]) => cell(get(d as unknown as Record<string, unknown>)))
        .join(","),
    ),
  ];

  const today = new Date().toISOString().slice(0, 10);

  // The BOM makes Excel open UTF-8 correctly instead of mangling accents.
  return new Response("﻿" + rows.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="visgrow-enquiries-${today}.csv"`,
      "Cache-Control": "no-store",
    },
  });
  } catch (err) {
    console.error("[visgrow:export] failed:", err);
    return new Response("Could not build the export. Please try again.", {
      status: 500,
    });
  }
}
