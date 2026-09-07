import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Terms & Conditions | Visgrow",
  description:
    "The terms that apply when you use the Visgrow website or buy a Visgrow program — including payments, refunds, program access, and our position on outcomes.",
  alternates: { canonical: "/terms-of-use" },
  robots: { index: false, follow: true },
};

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const business = settings?.businessName?.trim();
  const abn = settings?.abn?.trim();
  const email = settings?.email || "hello@visgrowinternships.com.au";
  const phone = settings?.phone || "1300 891 365";

  // Only chase the details that are genuinely still missing.
  const pending = [
    !business && "Registered business name",
    !abn && "ABN",
  ].filter(Boolean) as string[];

  const entity = business
    ? `${business}${abn ? ` (ABN ${abn})` : ""}, trading as Visgrow`
    : "Visgrow";

  return (
    <LegalPage
      title="Terms & Conditions"
      updated={settings?.legalLastUpdated?.trim() || "September 2026"}
      intro="These terms apply when you use this website and when you buy any Visgrow program. They're written to be read, not to hide things. If something here doesn't sit right with you, tell us before you pay."
      pending={pending}
      sections={[
        {
          heading: "Who you're dealing with",
          paragraphs: [
            `These terms are between you and ${entity} ("Visgrow", "we", "us"). You can reach us at ${email} or ${phone}.`,
            "By using this website, booking a session, or paying for a program, you agree to these terms. If you're under 18, a parent or guardian needs to agree on your behalf.",
          ],
        },

        {
          heading: "What we do — and what we don't promise",
          paragraphs: [
            "This is the most important section on this page, so it's near the top.",
            "Visgrow provides career coaching, employability programs, hosted internships and workshops. We help you build a strategy, improve your resume and LinkedIn profile, prepare for interviews, and gain practical experience.",
            "We do not guarantee that you will receive a job offer, an interview, a placement, permanent residency, a visa outcome, or any particular salary. Nobody honestly can. Anyone who does is either misleading you or doesn't understand hiring.",
            "Your results depend on your own effort, your field, your experience, the state of the job market, employer decisions, and other things entirely outside our control. Any outcomes, examples or testimonials described on this site are individual experiences, not a prediction of what will happen for you.",
            "Nothing on this site or in our programs is legal, migration, financial or immigration advice. If your visa or migration status matters to your decision, speak to a registered migration agent before enrolling.",
          ],
        },

        {
          heading: "Booking and enrolment",
          paragraphs: [
            "Enrolment is confirmed once we've received your payment (or your first payment plan instalment) and sent you a written confirmation. Until then, no place is held for you.",
            "We may decline or cancel an enrolment if we don't believe the program is right for you. If we do that, you get a full refund. We would rather turn away a sale than take money for something that won't help you.",
          ],
        },

        {
          heading: "Prices and payment",
          paragraphs: [
            "All prices are in Australian dollars and include GST where applicable. Prices shown on the website are current at the time of display, but the price that applies to you is the one confirmed in writing before you pay.",
            "Card payments are processed by Stripe. We never see or store your full card details — Stripe handles that directly, and your card information does not pass through our systems.",
            "Where a payment plan is offered, the schedule is set out before you commit. If an instalment fails, we'll contact you before doing anything else. Access to program materials may be paused while a payment is outstanding, and resumes once it's settled.",
          ],
        },

        {
          heading: "Cancellations, rescheduling and refunds",
          paragraphs: [
            "We think a clear refund policy is a sign of confidence, not weakness. Here's ours.",
          ],
          list: [
            "Rescheduling a one-to-one session: free with at least 48 hours' notice. Inside 48 hours, or if you don't show up, that session is treated as delivered.",
            "Career Strategy & Gap Analysis: if you complete the session and genuinely don't leave with a clearer picture of what's holding you back, tell us within 7 days and we'll refund it in full.",
            "14-Day Accelerator: full refund if you cancel before Day 1 opens. After the program starts, refunds are considered on a pro-rata basis for the days not yet released, less any work already delivered.",
            "Ongoing Coaching: cancel with 14 days' written notice. We'll refund sessions paid for but not used.",
            "Hosted Internships: full refund if you cancel more than 14 days before the placement starts. Inside 14 days, placement arrangements have usually been made with a host and costs incurred, so refunds are assessed individually.",
            "Workshops booked by an employer or institution: full refund if cancelled more than 14 days before the delivery date; 50% between 7 and 14 days; no refund inside 7 days, though we'll always try to reschedule instead.",
            "If we cancel or can't deliver something you've paid for, you get a full refund of the undelivered portion — no conditions.",
          ],
        },

        {
          heading: "Your rights under Australian Consumer Law",
          paragraphs: [
            "Our services come with guarantees that cannot be excluded under the Australian Consumer Law. Among other things, our services must be provided with due care and skill, be fit for the purpose we've described, and be delivered within a reasonable time.",
            "If there is a major failure with a service, you are entitled to cancel and receive a refund for the unused portion, or to compensation for the reduced value. If the failure is not major, you are entitled to have the problem fixed within a reasonable time — and if it isn't, to a refund.",
            "Nothing in these terms excludes, restricts or modifies those rights. Where anything here conflicts with the Australian Consumer Law, the Australian Consumer Law wins.",
          ],
        },

        {
          heading: "Access to program materials",
          paragraphs: [
            "When you enrol in a program with an online component, we give you a personal, non-transferable licence to access the material for the duration of your program and for a reasonable period afterwards.",
            "Your sign-in link is for you alone. Don't share it, your account, or the material with anyone else. Sharing paid content is the one thing that will get your access removed without a refund — it takes income directly from the person who made it.",
            "We may occasionally update, improve or reorder program content. We won't materially reduce what you've paid for.",
          ],
        },

        {
          heading: "Hosted internships",
          paragraphs: [
            "Visgrow-hosted internships are supervised by us directly. We do not outsource interns to third-party host organisations.",
            "An internship is a learning placement, not employment. It does not create an employment relationship between you and Visgrow, and it does not carry an entitlement to wages, unless we have separately agreed that in writing.",
            "We'll agree the scope, hours and duration with you before you start. Completing a placement in good faith entitles you to a written reference reflecting the work you actually did.",
          ],
        },

        {
          heading: "What we ask of you",
          list: [
            "Give us accurate information — we can't diagnose the real problem from an inaccurate picture",
            "Turn up to sessions you've booked, or give us notice",
            "Do the work between sessions; the program only works if you do",
            "Treat our team, other participants and any host organisation with respect",
            "Don't copy, share, resell or publish our materials",
            "Don't misrepresent your relationship with Visgrow to employers or third parties",
          ],
        },

        {
          heading: "Our materials belong to us",
          paragraphs: [
            "All content on this website and within our programs — text, graphics, logos, frameworks, templates, worksheets, video and course material — is owned by or licensed to Visgrow and protected by copyright.",
            "You may use it for your own personal, non-commercial purposes. You may not reproduce, distribute, adapt, publish or commercialise it without our written permission.",
            "Work you create during a program — your resume, your LinkedIn profile, your portfolio pieces — belongs to you.",
          ],
        },

        {
          heading: "Confidentiality",
          paragraphs: [
            "What you tell us in a coaching session stays between us. We won't share your situation, your materials or your circumstances with anyone without your consent, except where we're legally required to, or where there's a serious and imminent risk to someone's safety.",
            "If you're in a group program, we ask the same of you: what other participants share isn't yours to repeat.",
          ],
        },

        {
          heading: "Privacy",
          paragraphs: [
            "We collect and handle personal information in line with our Privacy Policy and the Privacy Act 1988 (Cth). Please read it — it explains what we collect, why, and how to ask for it back or have it deleted.",
          ],
        },

        {
          heading: "The website itself",
          paragraphs: [
            "We try to keep the site accurate and available, but we don't guarantee it will be uninterrupted or error-free.",
            "The site may link to third-party websites or embed third-party content such as video. We don't control those services and aren't responsible for them. A link is not an endorsement.",
          ],
          list: [
            "Don't use this website in any way that breaches a law",
            "Don't attempt to gain unauthorised access to any part of it",
            "Don't interfere with or disrupt the site or the servers behind it",
            "Don't submit information that is false, or that belongs to someone else without their consent",
          ],
        },

        {
          heading: "Liability",
          paragraphs: [
            "To the maximum extent permitted by law, and subject always to your Australian Consumer Law rights, our total liability to you for any claim connected with a program or this website is limited to the amount you paid us for that program.",
            "We are not liable for indirect or consequential loss — for example lost income, lost opportunity, or loss arising from a hiring decision made by a third party.",
            "This section does not limit liability that cannot lawfully be limited, including liability for fraud, or for death or personal injury caused by our negligence.",
          ],
        },

        {
          heading: "Suspending or ending access",
          paragraphs: [
            "We may suspend or end your access if you breach these terms in a serious way — sharing paid material, behaving abusively toward our team or other participants, or failing to pay.",
            "Where we end access because of a breach by you, refunds are at our discretion. Where we end it for any other reason, you get a refund for the undelivered portion.",
            "You can stop using our services at any time. The refund terms above tell you where you stand financially.",
          ],
        },

        {
          heading: "If something goes wrong",
          paragraphs: [
            `Tell us first — most problems are fixable and we'd rather hear about it than read it in a review. Email ${email} or call ${phone} and we'll respond within five business days.`,
            "If we can't resolve it between us, you can contact the Australian Competition and Consumer Commission, or your state's consumer affairs body — in South Australia, Consumer and Business Services.",
          ],
        },

        {
          heading: "Things outside anyone's control",
          paragraphs: [
            "If we can't deliver because of something genuinely beyond our control — illness, natural disaster, power or internet failure, government restrictions — we'll reschedule where we can, and refund the undelivered portion where we can't.",
          ],
        },

        {
          heading: "Changes to these terms",
          paragraphs: [
            "We may update these terms from time to time. The version that applies to your program is the one in force on the day you paid. Changes don't apply retrospectively to a program you've already bought.",
            "Continuing to use the website after a change means you accept the updated version for future use of the site.",
          ],
        },

        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of South Australia. You and Visgrow submit to the non-exclusive jurisdiction of the courts of that state.",
            "If any part of these terms is found to be unenforceable, that part is removed and the rest continues to apply.",
          ],
        },
      ]}
    />
  );
}
