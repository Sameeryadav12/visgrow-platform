import Stripe from "stripe";

/**
 * Stripe, set up once.
 *
 * The secret key must never reach the browser — it has no NEXT_PUBLIC prefix
 * and this file is only ever imported from server code.
 *
 * Returns null when no key is configured, so the site runs perfectly well
 * without payments switched on. Buttons fall back to the enquiry form.
 */

const key = process.env.STRIPE_SECRET_KEY;

export const stripe = key ? new Stripe(key) : null;

export const stripeEnabled = Boolean(key);

/** Converts a price the CMS holds as text ("$899", "From $1,200") into cents. */
export function priceToCents(price?: string | null): number | null {
  if (!price) return null;
  const digits = price.replace(/[^\d.]/g, "");
  if (!digits) return null;
  const amount = Number.parseFloat(digits);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return Math.round(amount * 100);
}

export const formatAud = (cents: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(cents / 100);
