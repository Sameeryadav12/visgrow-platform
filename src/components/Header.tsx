"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { mainNav } from "@/lib/nav-data";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[] | null;
};

export default function Header({
  nav,
  ctaLabel = "Let's Chat",
  ctaHref = "/get-started",
  phone = "1300 891 365",
}: {
  nav?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
} = {}) {
  // Menu comes from the CMS when it's been set up; otherwise use the
  // built-in structure so the site is never left without navigation.
  const menu: NavItem[] = nav?.length ? nav : mainNav;
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Close the drawer when the viewport grows to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMobileOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const openWithDelay = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const closeWithDelay = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <header
      className={`sticky top-0 z-[100] w-full transition-shadow duration-300 bg-white/95 backdrop-blur ${
        scrolled ? "shadow-[0_4px_24px_rgba(36,26,51,0.08)]" : ""
      }`}
    >
      <div className="h-[3px] bg-brand-gradient" />
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-3 lg:px-10">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo/PNG/visgrow-logo-primary.png"
            alt="Visgrow"
            width={140}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {menu.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && openWithDelay(item.label)}
              onMouseLeave={() => item.children && closeWithDelay()}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-[14.5px] font-semibold text-[var(--color-ink)] transition-colors hover:text-brand-purple rounded-full"
              >
                {item.label}
                {item.children && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 6"
                    className={`transition-transform duration-200 ${
                      openMenu === item.label ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>

              {item.children && openMenu === item.label && (
                <div
                  className="absolute left-0 top-full pt-2 w-[300px] animate-[fadeIn_.15s_ease]"
                  onMouseEnter={() => openWithDelay(item.label)}
                  onMouseLeave={() => closeWithDelay()}
                >
                  <div className="rounded-2xl border border-[var(--color-line)] bg-white p-2 shadow-[0_20px_50px_rgba(36,26,51,0.14)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block rounded-xl px-4 py-2.5 text-[14px] font-medium text-[var(--color-ink)] hover:bg-brand-lavender hover:text-brand-purple transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full px-5 py-2.5 text-[14px] font-bold text-[var(--color-ink)] border-2 border-[var(--color-line)] hover:border-brand-purple transition-colors"
          >
            Contact
          </Link>
          <Link
            href={ctaHref}
            className="rounded-full bg-brand-gradient px-6 py-2.5 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(105,24,220,0.28)] transition-transform hover:-translate-y-0.5"
          >
            {ctaLabel}
          </Link>
        </div>

        <button
          className="lg:hidden -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-line)] bg-white px-6 py-4 max-h-[80vh] overflow-y-auto">
          {menu.map((item) => (
            <div key={item.label} className="py-2">
              <Link
                href={item.href}
                className="block py-2.5 text-[15.5px] font-bold text-[var(--color-ink)]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-3 border-l-2 border-[var(--color-line)] ml-1 mt-1 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block py-2 text-[14px] text-brand-sub"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="block py-2.5 text-[15.5px] font-bold text-[var(--color-ink)]"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>

          <Link
            href={ctaHref}
            className="mt-4 block rounded-full bg-brand-gradient px-6 py-3.5 text-center text-[14.5px] font-bold text-white"
            onClick={() => setMobileOpen(false)}
          >
            {ctaLabel}
          </Link>

          <a
            href={phoneHref}
            className="mt-3 block rounded-full border-2 border-[var(--color-line)] px-6 py-3 text-center text-[14.5px] font-bold text-[var(--color-ink)]"
          >
            Call {phone}
          </a>
        </div>
      )}
    </header>
  );
}
