import type { Metadata } from "next";
import SignInForm from "@/components/SignInForm";

export const metadata: Metadata = {
  title: "Sign in | Visgrow",
  description: "Sign in to your Visgrow portal.",
  robots: { index: false, follow: false },
};

const PROBLEMS: Record<string, string> = {
  expired: "That link has expired. Ask for a fresh one below — they last 30 minutes.",
  invalid: "That link has already been used. Ask for a new one below.",
  missing: "That link was incomplete. Ask for a new one below.",
  noaccess:
    "Your access has been paused. Give us a call on 1300 891 365 and we'll sort it out.",
  error: "Something went wrong at our end. Try again, or call 1300 891 365.",
  signedout: "You've been signed out. Enter your email to get back in.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ problem?: string }>;
}) {
  const { problem } = await searchParams;
  const message = problem ? PROBLEMS[problem] : undefined;

  return (
    <section className="flex flex-1 items-center bg-brand-lavender py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[520px] px-6 lg:px-10">
        <div className="mb-8 text-center">
          <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
            Your Visgrow portal
          </p>
          <h1 className="mb-4 text-[clamp(30px,4vw,44px)] text-[var(--color-ink)]">
            Welcome back.
          </h1>
          <p className="text-[15.5px] leading-[1.65] text-brand-sub">
            Enter the email you signed up with and we&apos;ll send you a link.
            No password to remember.
          </p>
        </div>

        <SignInForm initialMessage={message} />

        <p className="mt-7 text-center text-[13px] leading-relaxed text-brand-sub">
          Not a customer yet?{" "}
          <a
            href="/students-graduates/14-day-accelerator"
            className="font-semibold text-brand-purple underline underline-offset-2"
          >
            See what the 14 days cover
          </a>
          .
        </p>
      </div>
    </section>
  );
}
