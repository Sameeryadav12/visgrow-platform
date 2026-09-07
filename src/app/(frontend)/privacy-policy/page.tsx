import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Privacy Policy | Visgrow",
  description:
    "How Visgrow collects, holds, uses and discloses your personal information — and how you can access, correct or delete it.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  const business = settings?.businessName?.trim();
  const abn = settings?.abn?.trim();
  const email = settings?.email || "hello@visgrowinternships.com.au";
  const phone = settings?.phone || "1300 891 365";
  const address = settings?.address || "Adelaide, South Australia";

  const pending = [
    !business && "Registered business name",
    !abn && "ABN",
  ].filter(Boolean) as string[];

  const entity = business
    ? `${business}${abn ? ` (ABN ${abn})` : ""}, trading as Visgrow`
    : "Visgrow";

  return (
    <LegalPage
      title="Privacy Policy"
      updated={settings?.legalLastUpdated?.trim() || "September 2026"}
      intro="What we collect, why we collect it, who we share it with, and how to get it back or have it deleted. Written plainly, because a privacy policy nobody can read isn't really a disclosure."
      pending={pending}
      sections={[
        {
          heading: "Who this is about",
          paragraphs: [
            `${entity} handles your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.`,
            `If you want to ask about anything here, email ${email} or call ${phone}. We're based at ${address}.`,
          ],
        },

        {
          heading: "What we collect",
          paragraphs: [
            "We only collect what we actually need. In practice that's:",
          ],
          list: [
            "Your name, email address and phone number, when you fill in a form or enquire",
            "Your organisation, if you're enquiring as an employer or education provider",
            "What you tell us about your situation — your job search, your goals, and anything you write in the message box",
            "Your resume, LinkedIn profile and related career material, if you send them to us for review",
            "If you enrol in a program: your start date, which days you've completed, and when you last signed in",
            "If you pay online: the fact of the payment, the amount, and the last four digits of your card. We never see or store your full card number",
            "Basic technical information your browser sends — IP address, browser type, and which pages you visited",
          ],
        },

        {
          heading: "Sensitive information",
          paragraphs: [
            "We don't ask for sensitive information — health, race, religion, sexual orientation, criminal record or political views — and you shouldn't send it to us.",
            "Coaching conversations sometimes touch on personal circumstances. We only record what's relevant to helping you, and we don't collect health information.",
          ],
        },

        {
          heading: "Why we collect it",
          list: [
            "To answer your enquiry and work out whether we can genuinely help",
            "To deliver the program you've paid for, and to give you access to it",
            "To take payment and issue you a tax invoice",
            "To keep a record of our conversations so you don't have to repeat yourself",
            "To send you occasional updates, if you've agreed to that — and only then",
            "To meet our legal and tax obligations",
          ],
          paragraphs: [
            "We don't sell your information. We never have and we won't. There is no version of this business where that makes sense.",
          ],
        },

        {
          heading: "Who we share it with — including overseas",
          paragraphs: [
            // Relying on bundled implied consent ("by using our services you
            // consent") is the weakest basis available under APP 8, and the
            // OAIC discourages it. We already take the stronger route in the
            // next paragraph, so the claim was doing no work and adding risk.
            "We use a small number of trusted services to run the website. Some of them store data outside Australia, mostly in the United States and Europe. We've named every one of them below so you can see exactly where your information goes before you give it to us.",
            "That list below is the whole list. We don't share your information with advertisers, data brokers, or any other third party. Where information goes overseas, we take reasonable steps to ensure it's handled consistently with the Australian Privacy Principles.",
          ],
          list: [
            "Stripe — payment processing. Your card details go directly to Stripe and never pass through our systems. Stripe is based in the United States and Ireland.",
            "Resend — sending emails such as enquiry confirmations and program sign-in links. Based in the United States.",
            "Our website hosting and database provider, which stores the enquiry and program records described above.",
            "Professional advisers, or a government body, where we're legally required to disclose.",
          ],
        },

        {
          heading: "Confidentiality of coaching",
          paragraphs: [
            "What you tell us in a coaching session stays between us. We won't discuss your situation, your materials or your circumstances with an employer, an education provider, or anyone else without your consent.",
            "The only exceptions are where we're legally compelled, or where there's a serious and imminent threat to someone's life or safety.",
          ],
        },

        {
          heading: "Cookies and how the site works",
          paragraphs: [
            "This website doesn't use advertising or tracking cookies. We don't run advertising pixels and we don't build a profile of you across other websites.",
            "We do use a small number of functional items stored in your browser:",
          ],
          list: [
            "A sign-in cookie, if you're enrolled in a program — this is what keeps you logged in, and it's how the program area works at all",
            "A note that you've already seen the 'Which one are you?' prompt, so it doesn't reappear all session",
            "A note that you've unlocked the free masterclass, so you don't have to enter your details twice",
          ],
        },

        {
          heading: "How long we keep it",
          list: [
            "Enquiries that don't proceed: up to 2 years, then deleted",
            "Client and program records: 7 years after your last engagement, which is what tax and business record law requires",
            "Payment records: 7 years, for the same reason",
            "Marketing contacts: until you unsubscribe, then removed",
          ],
          paragraphs: [
            "You can ask us to delete your information sooner, and we will — except where we're legally required to keep it.",
          ],
        },

        {
          heading: "Keeping it safe",
          paragraphs: [
            "Access to enquiry and program records requires a login, and only Visgrow staff have one. Data is encrypted in transit. Card details are handled entirely by Stripe, which is PCI-DSS compliant, so a breach of our systems could not expose your card.",
            "No system is perfectly secure, and we won't pretend otherwise. If a data breach occurs that is likely to cause you serious harm, we will notify you and the Office of the Australian Information Commissioner, as the Notifiable Data Breaches scheme requires.",
          ],
        },

        {
          heading: "Your rights",
          list: [
            "Ask what personal information we hold about you, and get a copy",
            "Ask us to correct anything that's wrong or out of date",
            "Ask us to delete it, subject to our legal record-keeping obligations",
            "Unsubscribe from marketing at any time — every email has a link, or just reply and say so",
            "Deal with us anonymously or under a pseudonym, though that will limit what we can do for you",
          ],
          paragraphs: [
            `Email ${email} and we'll respond within 30 days. There's no charge for a reasonable request.`,
          ],
        },

        {
          heading: "If you're not happy with how we've handled it",
          paragraphs: [
            `Tell us first — email ${email} with the details and we'll investigate and respond within 30 days.`,
            "If you're still not satisfied, you can complain to the Office of the Australian Information Commissioner at oaic.gov.au or on 1300 363 992.",
          ],
        },

        {
          heading: "Children",
          paragraphs: [
            "Our services are aimed at adults. If you're under 18, a parent or guardian needs to consent before you give us your information.",
          ],
        },

        {
          heading: "Changes to this policy",
          paragraphs: [
            "We'll update this page if what we collect or who we share it with changes. The date at the top tells you when it last changed. If a change materially affects how we use information you've already given us, we'll tell you directly rather than quietly updating the page.",
          ],
        },
      ]}
    />
  );
}
