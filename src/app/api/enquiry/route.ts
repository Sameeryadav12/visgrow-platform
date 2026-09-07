import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { sendEnquiryEmails } from "@/lib/email";
import { callerKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

type Body = {
  // student form
  firstName?: string;
  lastName?: string;
  // shared
  name?: string;
  email?: string;
  phone?: string;
  organisation?: string;
  audience?: string;
  enquiryType?: string;
  message?: string;
  consent?: boolean;
  source?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (v?: string) => (v ?? "").trim();

export async function POST(request: Request) {
  // A form anyone can submit is a form anyone can flood.
  const limit = rateLimit(callerKey(request, "enquiry"), {
    max: 5,
    windowMs: 10 * 60_000,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "That's a few too many in a short time. Try again shortly, or call 1300 891 365." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Both forms feed this endpoint; normalise them into one shape.
  const name =
    clean(body.name) ||
    [clean(body.firstName), clean(body.lastName)].filter(Boolean).join(" ");
  const email = clean(body.email);
  const enquiryType = clean(body.enquiryType);

  if (!name || !email) {
    return NextResponse.json(
      { error: "Please give us your name and email." },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 422 });
  }

  const audience = (["student", "employer", "education"] as const).includes(
    body.audience as "student" | "employer" | "education",
  )
    ? (body.audience as "student" | "employer" | "education")
    : "student";

  const record = {
    name,
    email,
    phone: clean(body.phone) || undefined,
    organisation: clean(body.organisation) || undefined,
    audience,
    enquiryType: enquiryType || undefined,
    message: clean(body.message) || undefined,
    source: clean(body.source) || request.headers.get("referer") || undefined,
    consent: Boolean(body.consent),
    status: "new" as const,
  };

  let id: string | number | undefined;

  // Step 1 — save it. This must succeed; everything else is best-effort.
  try {
    const payload = await getPayload({ config });
    const doc = await payload.create({ collection: "enquiries", data: record });
    id = doc.id;
  } catch (err) {
    console.error("[visgrow:enquiry] DB write failed:", err);
    // Log the full lead so it is recoverable from server logs.
    console.error("[visgrow:enquiry:unsaved]", JSON.stringify(record));
    return NextResponse.json(
      {
        error:
          "We couldn't save that just now. Please email hello@visgrowinternships.com.au and we'll pick it up.",
      },
      { status: 500 },
    );
  }

  // Step 2 — notify. A mail failure must never fail the request.
  try {
    await sendEnquiryEmails({ id, ...record });
  } catch (err) {
    console.error("[visgrow:enquiry] email failed:", err);
  }

  return NextResponse.json({ ok: true, id }, { status: 201 });
}
