import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { privacySections } from "@/content/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy | Visgrow",
  description:
    "How Visgrow collects, holds, uses and discloses your personal information — and how you can access, correct or delete it.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="4 November 2026"
      intro="How we collect, use, store and protect your personal information, and how to access, correct or delete it."
      pending={[]}
      sections={privacySections}
    />
  );
}
