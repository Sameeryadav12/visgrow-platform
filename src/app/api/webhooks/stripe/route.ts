import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import type Stripe from "stripe";
import { stripe, formatAud } from "@/lib/stripe";
import type { Student } from "@/payload-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Where a payment becomes real.
 *
 * Access is granted here, not on the success page. A browser redirect can be
 * faked by typing a URL; a webhook is signed by Stripe and verified against a
 * secret only we hold. Anything that grants access or records money must
 * happen here.
 */

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Unsigned request." }, { status: 400 });
  }

  // Must be the raw body — parsing it first would break signature checking.
  const raw = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret);
  } catch (err) {
    // A bad signature means this didn't come from Stripe. Refuse it.
    console.error("[visgrow:stripe] signature check failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config });

    switch (event.type) {
      // ------------------------------------------------------- payment taken
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.payment_status !== "paid") break;

        const sessionId = session.id;

        // Stripe can deliver the same event more than once. Without this
        // check, a retry would enrol someone twice.
        const seen = await payload.find({
          collection: "payments",
          where: { stripeSessionId: { equals: sessionId } },
          limit: 1,
          depth: 0,
        });
        if (seen.totalDocs > 0) break;

        const email = (
          session.customer_details?.email ??
          session.customer_email ??
          ""
        ).toLowerCase();
        const name = session.customer_details?.name ?? email.split("@")[0] ?? "Unknown";
        const slug = session.metadata?.programSlug ?? "";
        const programTitle = session.metadata?.programTitle ?? "Visgrow program";
        const amount = session.amount_total ?? 0;

        // Match the program, the enquiry and any existing student record.
        // Postgres ids are numbers; the placeholder types below keep
        // TypeScript happy when a lookup finds nothing.
        const asId = (v: string | number | undefined) =>
          typeof v === "number" ? v : v ? Number(v) : undefined;

        const [programs, enquiries, students] = await Promise.all([
          slug
            ? payload.find({
                collection: "programs",
                where: { slug: { equals: slug } },
                limit: 1,
                depth: 0,
              })
            : Promise.resolve({ docs: [] as { id: number | string }[] }),
          email
            ? payload.find({
                collection: "enquiries",
                where: { email: { equals: email } },
                sort: "-createdAt",
                limit: 1,
                depth: 0,
              })
            : Promise.resolve({ docs: [] as { id: number | string }[] }),
          email
            ? payload.find({
                collection: "students",
                where: { email: { equals: email } },
                limit: 1,
                depth: 0,
              })
            // Typed as Student, not just an id — the branch below reads their
            // existing programs and start date to merge a repeat purchase.
            : Promise.resolve({ docs: [] as Student[] }),
        ]);

        const program = programs.docs[0];
        const enquiry = enquiries.docs[0];
        let studentId: number | undefined = asId(students.docs[0]?.id);

        // Paying IS signing up. Every purchase provisions a portal account
        // and records which program was bought — the portal then shows that
        // program and nothing else. Making someone wait for a human to enrol
        // them after they've handed over money is a terrible first
        // impression, and it puts a manual step in front of every sale.
        const isAccelerator =
          slug === "14-day-accelerator" || /accelerator/i.test(programTitle);

        if (email) {
          const existing = students.docs[0];

          if (!existing) {
            const created = await payload.create({
              collection: "students",
              data: {
                name,
                email,
                // Only the Accelerator runs on a daily schedule. Setting a
                // start date for anyone else would start a clock that has
                // nothing to count.
                startDate: isAccelerator ? new Date().toISOString() : null,
                status: "active",
                programs: program?.id ? [asId(program.id)!] : [],
                enquiry: asId(enquiry?.id),
                notes: "Signed up automatically after paying online.",
              },
            });
            studentId = asId(created.id);
          } else {
            // A returning customer buying a second thing. Add the new program
            // to what they already have rather than replacing it, and never
            // touch a start date they're already partway through.
            const owned = (existing.programs ?? []).map((p) =>
              typeof p === "object" ? p.id : p,
            );
            const newId = asId(program?.id);
            const patch: Record<string, unknown> = {};

            if (newId && !owned.includes(newId)) {
              patch.programs = [...owned, newId];
            }
            if (isAccelerator && !existing.startDate) {
              patch.startDate = new Date().toISOString();
            }
            // Someone who paid again has clearly not been revoked.
            if (existing.status === "revoked") patch.status = "active";

            if (Object.keys(patch).length) {
              await payload.update({
                collection: "students",
                id: existing.id,
                data: patch,
              });
            }
            studentId = asId(existing.id);
          }
        }

        await payload.create({
          collection: "payments",
          data: {
            customerName: name,
            customerEmail: email,
            programName: programTitle,
            program: asId(program?.id),
            enquiry: asId(enquiry?.id),
            student: studentId,
            amountCents: amount,
            amountFormatted: formatAud(amount),
            currency: (session.currency ?? "aud").toUpperCase(),
            status: "paid",
            paidAt: new Date().toISOString(),
            stripeSessionId: sessionId,
            stripePaymentIntentId:
              typeof session.payment_intent === "string" ? session.payment_intent : undefined,
          },
        });

        // Move the lead along, and log it in their history.
        if (enquiry?.id) {
          await payload.update({
            collection: "enquiries",
            id: enquiry.id,
            data: {
              status: "enrolled",
              value: Math.round(amount / 100),
            },
          });
        }

        payload.logger.info(
          `[visgrow] Payment received: ${formatAud(amount)} from ${email} for ${programTitle}`,
        );
        break;
      }

      // ---------------------------------------------------------- refunded
      case "charge.refunded": {
        const charge = event.data.object;
        const intentId =
          typeof charge.payment_intent === "string" ? charge.payment_intent : null;
        if (!intentId) break;

        const match = await payload.find({
          collection: "payments",
          where: { stripePaymentIntentId: { equals: intentId } },
          limit: 1,
          depth: 0,
        });
        const record = match.docs[0];
        if (!record) break;

        const fully = charge.amount_refunded >= charge.amount;
        await payload.update({
          collection: "payments",
          id: record.id,
          data: { status: fully ? "refunded" : "partially_refunded" },
        });
        break;
      }

      // ---------------------------------------------------------- disputed
      case "charge.dispute.created": {
        const dispute = event.data.object;
        const intentId =
          typeof dispute.payment_intent === "string" ? dispute.payment_intent : null;
        if (!intentId) break;

        const match = await payload.find({
          collection: "payments",
          where: { stripePaymentIntentId: { equals: intentId } },
          limit: 1,
          depth: 0,
        });
        const record = match.docs[0];
        if (record) {
          await payload.update({
            collection: "payments",
            id: record.id,
            data: { status: "disputed" },
          });
          payload.logger.warn(
            `[visgrow] Payment disputed — respond in Stripe promptly: ${SITE}/admin/collections/payments/${record.id}`,
          );
        }
        break;
      }

      default:
        // Everything else is ignored on purpose.
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    // Returning 500 makes Stripe retry, which is what we want — better a
    // duplicate attempt (guarded above) than a payment we never recorded.
    console.error("[visgrow:stripe] handler failed:", err);
    return NextResponse.json({ error: "Handler failed." }, { status: 500 });
  }
}
