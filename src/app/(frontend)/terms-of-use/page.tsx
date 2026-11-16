import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { termsSections } from "@/content/legal/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions | Visgrow",
  description:
    "The terms that apply when you use the Visgrow website or buy a Visgrow service, including payments, refunds, program access and our position on outcomes.",
  alternates: { canonical: "/terms-of-use" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="4 November 2026"
      intro="These terms apply when you use this website or buy any Visgrow service."
      pending={[]}
      sections={termsSections}
    />
  );
}
