import type { Metadata } from "next";
import Link from "next/link";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Thank you | Visgrow",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Shown after Stripe sends them back.
 *
 * This page confirms and reassures — it does not grant anything. Access is
 * granted by the webhook, because a browser redirect can be faked by typing
 * a URL and a signed webhook cannot.
 */
export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  let name = "";
  let programName = "";
  let paid = false;

  if (stripe && sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      name = session.customer_details?.name?.split(" ")[0] ?? "";
      programName = session.metadata?.programTitle ?? "";
    } catch {
      // A bad or expired id just means we show the generic version.
    }
  }

  const isAccelerator = /accelerator/i.test(programName);

  return (
    <section className="flex flex-1 items-center bg-brand-lavender py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[640px] px-6 text-center lg:px-10">
        <div
          aria-hidden="true"
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-[30px] text-white"
        >
          ✓
        </div>

        <h1 className="mb-4 text-[clamp(30px,4vw,44px)] text-[var(--color-ink)]">
          {name ? `You're in, ${name}.` : "You're in."}
        </h1>

        <p className="mb-8 text-[16px] leading-[1.65] text-brand-sub">
          {paid
            ? "Your payment went through and your receipt is on its way by email."
            : "Thanks — we're confirming your payment now. If anything looks wrong, call us and we'll sort it."}
          {programName && (
            <>
              {" "}
              You&apos;ve bought <strong className="text-[var(--color-ink)]">{programName}</strong>.
            </>
          )}
        </p>

        <div className="rounded-[18px] bg-white p-7 text-left lg:p-8">
          <h2 className="mb-4 text-[20px] text-[var(--color-ink)]">
            What happens next
          </h2>

          <ol className="flex flex-col gap-3.5">
            {isAccelerator ? (
              <>
                <li className="flex gap-3 text-[14.5px] leading-relaxed text-brand-sub">
                  <span className="font-black text-brand-purple">1.</span>
                  Your program is already open. Go to the sign-in page, enter
                  this same email address, and we&apos;ll send you a link — no
                  password needed.
                </li>
                <li className="flex gap-3 text-[14.5px] leading-relaxed text-brand-sub">
                  <span className="font-black text-brand-purple">2.</span>
                  Day 1 is available now. A new day opens each day after that.
                </li>
                <li className="flex gap-3 text-[14.5px] leading-relaxed text-brand-sub">
                  <span className="font-black text-brand-purple">3.</span>
                  Mustafa will be in touch within one business day to introduce
                  himself properly.
                </li>
              </>
            ) : (
              <>
                <li className="flex gap-3 text-[14.5px] leading-relaxed text-brand-sub">
                  <span className="font-black text-brand-purple">1.</span>
                  Mustafa will email you within one business day to book your
                  first session around your schedule.
                </li>
                <li className="flex gap-3 text-[14.5px] leading-relaxed text-brand-sub">
                  <span className="font-black text-brand-purple">2.</span>
                  Have your current resume and LinkedIn profile ready — we
                  review them before we meet, so the session isn&apos;t spent
                  reading.
                </li>
                <li className="flex gap-3 text-[14.5px] leading-relaxed text-brand-sub">
                  <span className="font-black text-brand-purple">3.</span>
                  Bring any rejection emails you&apos;ve kept. They&apos;re
                  often more revealing than people expect.
                </li>
              </>
            )}
          </ol>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {isAccelerator && (
            <Link
              href="/sign-in"
              className="rounded-full bg-brand-gradient px-7 py-3.5 text-[14.5px] font-extrabold text-white"
            >
              Open my program
            </Link>
          )}
          <Link
            href="/"
            className="rounded-full border-2 border-[var(--color-line)] bg-white px-7 py-3.5 text-[14.5px] font-bold text-[var(--color-ink)] transition-colors hover:border-brand-purple"
          >
            Back to the website
          </Link>
        </div>

        <p className="mt-8 text-[13px] leading-relaxed text-brand-sub">
          Anything not right? Call{" "}
          <a href="tel:1300891365" className="font-semibold text-brand-purple">
            1300 891 365
          </a>{" "}
          — a real person answers.
        </p>
      </div>
    </section>
  );
}
