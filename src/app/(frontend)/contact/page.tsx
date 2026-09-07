import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import { getSiteSettings } from "@/lib/cms";
import { getPageCopy, t } from "@/lib/page-copy";

export const metadata: Metadata = {
  title: "Contact Visgrow | Adelaide Career Coaching & Internships",
  description:
    "Talk to Visgrow. Call 1300 891 365, email hello@visgrowinternships.com.au, or send us a message — we reply within one business day.",
  alternates: { canonical: "/contact" },
};

const offices = [
  {
    name: "Innovation House",
    lines: ["Mawson Lakes SA 5095"],
  },
  {
    name: "Tonsley Innovation District",
    lines: ["Clovelly Park SA 5042"],
  },
];

export default async function ContactPage() {
  const copy = await getPageCopy("/contact");
  const settings = await getSiteSettings();
  const phone = settings?.phone || "1300 891 365";
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
  const email = settings?.email || "hello@visgrowinternships.com.au";

  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Contact</span>
          </nav>

          <h1 className="mb-5 max-w-[720px] text-[clamp(32px,4.6vw,54px)] leading-[1.04]">
            {t(copy?.hero?.heading, "Talk to a real person.")}
          </h1>
          <p className="max-w-[580px] text-[16.5px] leading-[1.65] text-white/90">
            {t(copy?.hero?.body, "No call centre, no ticket number. Call, email, or send a message and we'll come back to you within one business day.")}
          </p>
        </div>
      </section>

      <section className="bg-brand-lavender py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-10">
          {/* Contact details */}
          <div className="flex flex-col gap-5">
            <div className="rounded-[18px] border border-[var(--color-line)] bg-white p-7">
              <h2 className="mb-5 text-[21px] text-[var(--color-ink)]">Get in touch</h2>

              <div className="mb-5">
                <p className="mb-1 text-[12px] font-extrabold uppercase tracking-[1.2px] text-brand-pink">
                  Phone
                </p>
                <a href={phoneHref} className="block text-[17px] font-extrabold text-[var(--color-ink)] hover:text-brand-purple">
                  {phone}
                </a>
                <a href="tel:+61423737675" className="mt-1 block text-[14.5px] font-semibold text-brand-sub hover:text-brand-purple">
                  0423 737 675
                </a>
                <p className="mt-1.5 text-[12.5px] text-brand-sub">Mon–Fri, business hours</p>
              </div>

              <div className="mb-5 border-t border-[var(--color-line)] pt-5">
                <p className="mb-1 text-[12px] font-extrabold uppercase tracking-[1.2px] text-brand-pink">
                  Email
                </p>
                <a
                  href={`mailto:${email}`}
                  className="block break-all text-[15px] font-bold text-[var(--color-ink)] hover:text-brand-purple"
                >
                  {email}
                </a>
                <p className="mt-1.5 text-[12.5px] text-brand-sub">We reply within one business day</p>
              </div>

              <div className="border-t border-[var(--color-line)] pt-5">
                <p className="mb-3 text-[12px] font-extrabold uppercase tracking-[1.2px] text-brand-pink">
                  Where we are
                </p>
                <ul className="flex flex-col gap-4">
                  {offices.map((o) => (
                    <li key={o.name}>
                      <span className="block text-[14.5px] font-bold text-[var(--color-ink)]">{o.name}</span>
                      {o.lines.map((l) => (
                        <span key={l} className="block text-[13.5px] text-brand-sub">{l}</span>
                      ))}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[12.5px] leading-relaxed text-brand-sub">
                  Adelaide-based, working with students and organisations
                  Australia-wide. Sessions available in person or online.
                </p>
              </div>
            </div>

            <div className="rounded-[18px] border-2 border-dashed border-brand-purple/40 bg-white p-7">
              <h2 className="mb-2.5 text-[19px] text-[var(--color-ink)]">
                Ready to start rather than ask?
              </h2>
              <p className="mb-4 text-[13.5px] leading-relaxed text-brand-sub">
                If you already know which program you want, skip the message
                and go straight to signing up.
              </p>
              <Link
                href="/get-started"
                className="inline-block rounded-[10px] bg-brand-gradient px-5 py-3 text-[13.5px] font-extrabold text-white transition-transform hover:-translate-y-0.5"
              >
                Get started →
              </Link>
            </div>

            <div className="rounded-[18px] border border-[var(--color-line)] bg-white p-7">
              <h2 className="mb-2.5 text-[19px] text-[var(--color-ink)]">
                Employer or education provider?
              </h2>
              <p className="mb-4 text-[13.5px] leading-relaxed text-brand-sub">
                There are dedicated enquiry forms for workforce development and
                institutional partnerships.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/employers#partner"
                  className="rounded-[10px] bg-brand-lavender px-4 py-2.5 text-[13px] font-extrabold text-brand-purple transition-colors hover:bg-brand-purple hover:text-white"
                >
                  Employers
                </Link>
                <Link
                  href="/education-partners#partner"
                  className="rounded-[10px] bg-brand-lavender px-4 py-2.5 text-[13px] font-extrabold text-brand-purple transition-colors hover:bg-brand-purple hover:text-white"
                >
                  Education partners
                </Link>
              </div>
            </div>
          </div>

          {/* Message form */}
          <div>
            <div className="mb-6">
              <h2 className="mb-2 text-[clamp(24px,3vw,34px)] text-[var(--color-ink)]">
                Send us a message
              </h2>
              <p className="text-[15px] leading-relaxed text-brand-sub">
                Tell us what&apos;s going on and we&apos;ll come back to you
                with something useful — not a brochure.
              </p>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
