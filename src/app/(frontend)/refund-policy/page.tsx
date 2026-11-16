import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { refundSections } from "@/content/legal/refund";

export const metadata: Metadata = {
  title: "Refund, Cancellation & Money-Back Guarantee Policy | Visgrow",
  description:
    "When refunds, cancellations and the seven-day money-back guarantee apply to Visgrow services.",
  alternates: { canonical: "/refund-policy" },
  robots: { index: false, follow: true },
};

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund, Cancellation & Money-Back Guarantee Policy"
      updated="4 November 2026"
      intro="When refunds and cancellations apply, and how our seven-day money-back guarantee works."
      pending={[]}
      sections={refundSections}
    />
  );
}
