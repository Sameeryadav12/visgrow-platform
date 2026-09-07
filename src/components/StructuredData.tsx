import React from "react";

/**
 * JSON-LD for Google.
 *
 * This is what lets a search result show the business details, the FAQ
 * accordion, and the program information rather than a plain blue link.
 * It costs nothing and is the highest-leverage SEO work available before
 * the site has any backlinks.
 *
 * Everything here must be true and match what's visible on the page —
 * Google penalises structured data that doesn't.
 */

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://visgrowinternships.com.au";

function Json({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is ours, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganisationSchema({
  phone,
  email,
  address,
}: {
  phone: string;
  email: string;
  address: string;
}) {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SITE}/#organisation`,
        name: "Visgrow",
        url: SITE,
        logo: `${SITE}/logo/PNG/visgrow-logo-primary.png`,
        image: `${SITE}/logo/PNG/visgrow-logo-primary.png`,
        description:
          "Career coaching, hosted internships and employability workshops for students, graduates and employers in Adelaide, South Australia.",
        telephone: phone,
        email,
        address: {
          "@type": "PostalAddress",
          streetAddress: address,
          addressLocality: "Adelaide",
          addressRegion: "SA",
          addressCountry: "AU",
        },
        areaServed: [
          { "@type": "State", name: "South Australia" },
          { "@type": "Country", name: "Australia" },
        ],
        knowsAbout: [
          "Career coaching",
          "Resume and ATS optimisation",
          "Interview preparation",
          "Internships",
          "Graduate employability",
          "Workforce capability development",
        ],
      }}
    />
  );
}

export function FaqSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs.length) return null;
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  url,
  price,
}: {
  name: string;
  description: string;
  url: string;
  price?: string | null;
}) {
  // Only publish a price when we actually have one — a wrong or missing
  // price in structured data is worse than none at all.
  const offer =
    price && /\d/.test(price)
      ? {
          offers: {
            "@type": "Offer",
            price: price.replace(/[^\d.]/g, ""),
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock",
            url: `${SITE}${url}`,
          },
        }
      : {};

  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType: "Career coaching",
        provider: { "@id": `${SITE}/#organisation` },
        areaServed: { "@type": "Country", name: "Australia" },
        url: `${SITE}${url}`,
        ...offer,
      }}
    />
  );
}

export function BreadcrumbSchema({
  trail,
}: {
  trail: { name: string; url: string }[];
}) {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.name,
          item: `${SITE}${t.url}`,
        })),
      }}
    />
  );
}
