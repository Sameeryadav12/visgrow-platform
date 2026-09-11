"use client";

import { usePathname } from "next/navigation";

/**
 * Wraps the marketing chrome — header, footer, sales popups — and hides all
 * of it inside the signed-in area.
 *
 * A customer who has already paid should not be shown a "Sign in" link while
 * signed in, a second header stacked above their own, or a popup asking
 * "which one are you?". That chrome exists to convert strangers. Showing it
 * to someone who already bought makes the product feel like a website with a
 * login bolted on rather than something they belong to.
 *
 * This is a client component purely so it can read the current path; the
 * layout that uses it stays a server component.
 */

const PRIVATE_AREAS = ["/portal", "/my-program"];

export default function PublicChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isPrivate = PRIVATE_AREAS.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`),
  );

  if (isPrivate) return null;
  return <>{children}</>;
}
