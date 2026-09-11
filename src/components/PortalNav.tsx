"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The portal's own header.
 *
 * Separate from the marketing header on purpose. Someone who has already
 * bought does not need "See what the 14 days cover" — they need their
 * program, their files and their next session, in that order.
 */

const LINKS = [
  { href: "/portal", label: "Overview" },
  { href: "/portal/files", label: "My files" },
  { href: "/portal/sessions", label: "My sessions" },
  { href: "/portal/account", label: "Account" },
];

export default function PortalNav({ name }: { name: string }) {
  const pathname = usePathname();
  const firstName = name.split(" ")[0];

  return (
    <header className="bg-brand-gradient text-white">
      <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-4 px-6 pt-6 lg:px-10">
        <Link href="/" className="text-[13px] font-bold text-white/80 hover:text-white">
          ← Visgrow
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-white/80">{firstName}</span>
          <a
            href="/api/lms/logout"
            className="rounded-full border border-white/40 bg-white/15 px-4 py-2 text-[12.5px] font-bold transition-colors hover:bg-white/25"
          >
            Sign out
          </a>
        </div>
      </div>

      <nav
        aria-label="Your portal"
        className="mx-auto max-w-[1000px] px-6 lg:px-10"
      >
        <ul className="flex gap-1 overflow-x-auto pt-5">
          {LINKS.map((l) => {
            const on =
              l.href === "/portal"
                ? pathname === "/portal"
                : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={on ? "page" : undefined}
                  className={`inline-block whitespace-nowrap rounded-t-[10px] px-5 py-3 text-[13.5px] font-bold transition-colors ${
                    on
                      ? "bg-brand-lavender text-brand-purple"
                      : "text-white/85 hover:bg-white/15"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
