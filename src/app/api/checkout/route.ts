import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { stripe, priceToCents } from "@/lib/stripe";
import { callerKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Starts a Stripe Checkout session.
 *
 * The price is read from the CMS here on the server, never taken from the
 * browser. If the amount came from the client, anyone could pay $1 for a
 * $3,499 program by editing the request.
 */
export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Card payment isn't switched on yet. Please get in touch and we'll invoice you." },
      { status: 503 },
    );
  }

  const limit = rateLimit(callerKey(request, "checkout"), {
    max: 10,
    windowMs: 10 * 60_000,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let slug = "";
  let email = "";
  try {
    const body = await request.json();
    slug = String(body.programSlug ?? "").trim();
    email = String(body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!slug) {
    return NextResponse.json({ error: "No program selected." }, { status: 422 });
  }

  try {
    const payload = await getPayload({ config });
    const found = await payload.find({
      collection: "programs",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });

    const program = found.docs[0];
    if (!program) {
      return NextResponse.json({ error: "We couldn't find that program." }, { status: 404 });
    }

    const amount = priceToCents(program.price);
    if (!amount) {
      return NextResponse.json(
        {
          error:
            "This program is priced individually. Get in touch and we'll confirm the cost with you first.",
        },
        { status: 409 },
      );
    }

    const includes = (program.includes ?? [])
      .map((i) => i.item)
      .filter(Boolean)
      .slice(0, 4)
      .join(" · ");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "aud",
            unit_amount: amount,
            product_data: {
              name: program.title,
              description: includes || program.tagline || undefined,
            },
          },
        },
      ],
      // Carried through to the webhook so we know what was bought.
      metadata: {
        programSlug: slug,
        programId: String(program.id),
        programTitle: program.title,
      },
      success_url: `${SITE}/payment/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE}${program.pageUrl ?? "/"}?payment=cancelled`,

      // Australian tax invoices, sent by Stripe automatically.
      invoice_creation: { enabled: true },

      // They must accept the terms before paying, and Stripe records that
      // they did — which matters if a refund is ever disputed.
      consent_collection: { terms_of_service: "required" },
      custom_text: {
        terms_of_service_acceptance: {
          message: `I agree to the [Terms & Conditions](${SITE}/terms-of-use), including the refund policy.`,
        },
      },

      billing_address_collection: "auto",
      allow_promotion_codes: true,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[visgrow:checkout] failed:", err);
    return NextResponse.json(
      { error: "We couldn't start the payment. Please try again, or call us." },
      { status: 500 },
    );
  }
}
