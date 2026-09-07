import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Visgrow",
  robots: { index: false, follow: true },
};

const routes = [
  {
    href: "/#overview",
    title: "I'm a student or graduate",
    body: "Coaching, internships and workshops",
  },
  {
    href: "/employers",
    title: "I'm an employer",
    body: "Build capability in your team",
  },
  {
    href: "/education-partners",
    title: "I'm an education institution",
    body: "Partner on graduate outcomes",
  },
];

/**
 * A 404 that keeps the visit alive.
 *
 * Someone landing here already wanted something from us. A dead end with a
 * single "go home" link wastes that; the same audience choice used on the
 * rest of the site gives them somewhere useful to go instead.
 */
export default function NotFound() {
  return (
    <>
      <section className="bg-brand-gradient py-20 text-white lg:py-24">
        <div className="mx-auto max-w-[760px] px-6 text-center lg:px-10">
          <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[2px] text-white/80">
            Page not found
          </p>
          <h1 className="mb-5 text-[clamp(32px,4.6vw,54px)] leading-[1.04]">
            We couldn&apos;t find that page.
          </h1>
          <p className="mx-auto max-w-[520px] text-[16.5px] leading-[1.65] text-white/90">
            The link was probably old or mistyped. Nothing you did wrong —
            let&apos;s get you where you were actually going.
          </p>
        </div>
      </section>

      <section className="bg-brand-lavender py-16 lg:py-20">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <p className="mb-6 text-center text-[15px] font-bold text-[var(--color-ink)]">
            Which one are you?
          </p>

          <ul className="grid gap-4 sm:grid-cols-3">
            {routes.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="flex h-full flex-col rounded-[16px] border-2 border-[var(--color-line)] bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-purple"
                >
                  <span className="mb-1.5 text-[15.5px] font-extrabold text-[var(--color-ink)]">
                    {r.title}
                  </span>
                  <span className="text-[13.5px] leading-snug text-brand-sub">
                    {r.body}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-full bg-brand-gradient px-7 py-3.5 text-[14.5px] font-extrabold text-white"
            >
              Back to the home page
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-[var(--color-line)] bg-white px-7 py-3.5 text-[14.5px] font-bold text-[var(--color-ink)] transition-colors hover:border-brand-purple"
            >
              Tell us what you were looking for
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
