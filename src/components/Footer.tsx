import Link from "next/link";
import Image from "next/image";
import { getFooter, getSiteSettings } from "@/lib/cms";

const defaultBlurb =
  "Helping students and graduates become confident, job-ready professionals — and helping employers build capable, resilient teams.";

const columns = [
  {
    title: "Students & Graduates",
    links: [
      { label: "Career Strategy & Gap Analysis", href: "/students-graduates/career-strategy-gap-analysis" },
      { label: "Career Coaching", href: "/students-graduates/career-coaching" },
      { label: "14-Day Career Accelerator", href: "/students-graduates/14-day-accelerator" },
      { label: "Visgrow-Hosted Internships", href: "/students-graduates/hosted-internships" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Success Stories", href: "/#success-stories" },
      { label: "FAQs", href: "/#faqs" },
    ],
  },
  {
    title: "Employers & Partners",
    links: [
      { label: "Workforce Capability Development", href: "/employers#workforce-capability" },
      { label: "Emerging Leaders Program", href: "/employers#emerging-leaders" },
      { label: "Education Partners", href: "/education-partners" },
      { label: "Partner With Visgrow", href: "/employers#partner" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "Skills Development", href: "/academy/skills-development" },
      { label: "Workshop Packages & Pricing", href: "/academy#pricing" },
      { label: "Book a Workshop", href: "/academy#book" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Visgrow", href: "/about" },
      { label: "Founder Profile", href: "/about#founder" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default async function Footer() {
  // Falls back to the arrays above if the CMS is empty or unreachable.
  const [cms, settings] = await Promise.all([getFooter(), getSiteSettings()]);

  const cols =
    cms?.columns?.length
      ? cms.columns.map((c) => ({
          title: c.title,
          links: (c.links ?? []).map((l) => ({ label: l.label, href: l.href })),
        }))
      : columns;

  const blurb = cms?.blurb || defaultBlurb;
  const phone = settings?.phone || "1300 891 365";
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
  const email = settings?.email || "hello@visgrowinternships.com.au";
  const legalLine = cms?.legalLine || "Adelaide, South Australia";

  return (
    <footer className="border-t border-[var(--color-line)] bg-white pt-16 pb-8">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-[1.25fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Image
              src="/logo/PNG/visgrow-logo-primary.png"
              alt="Visgrow"
              width={150}
              height={42}
              className="mb-5 h-9 w-auto"
            />
            <p className="max-w-[280px] text-[13.5px] leading-relaxed text-brand-sub">
              {blurb}
            </p>
            <div className="mt-4 flex flex-col items-start text-[13.5px] leading-relaxed text-brand-sub">
              <a
                href={phoneHref}
                className="block py-2 text-[15px] font-bold text-[var(--color-ink)] transition-colors hover:text-brand-purple"
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="block break-all py-2 transition-colors hover:text-brand-purple"
              >
                {email}
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4
                className="mb-5 text-[13px] font-extrabold uppercase tracking-[0.8px] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-1 lg:gap-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block py-2.5 text-[14.5px] leading-snug text-brand-sub transition-colors hover:text-brand-purple lg:py-1.5 lg:text-[14px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--color-line)] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12.5px] text-brand-sub">
            © {new Date().getFullYear()} Visgrow. All rights reserved. ·{" "}
            {legalLine}
          </p>
          <div className="-my-2 flex gap-5 text-[13px] text-brand-sub">
            <Link href="/scorecard" className="block py-2 transition-colors hover:text-brand-purple">
              Free Scorecard
            </Link>
            <Link href="/privacy-policy" className="block py-2 transition-colors hover:text-brand-purple">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="block py-2 transition-colors hover:text-brand-purple">
              Terms of Use
            </Link>
            {/* Second way in. Someone hunting for their login checks the
                footer as often as the header. */}
            <Link href="/sign-in" className="block py-2 transition-colors hover:text-brand-purple">
              Customer sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 h-1.5 bg-brand-gradient" />
    </footer>
  );
}
