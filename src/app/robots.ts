import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://visgrowinternships.com.au";

/**
 * Staging must never be indexed. A preview build that leaks into Google
 * competes with the real site for its own brand name and is very hard to
 * undo, so the default is "block everything" and the live site has to opt in
 * by setting NEXT_PUBLIC_SITE_ENV=production.
 */
const IS_LIVE = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!IS_LIVE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  // Search engines must never index the admin, the API, or anything holding
  // enquiry data. The legal pages are excluded too — they're boilerplate and
  // add nothing to search results.
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/privacy-policy",
          "/terms-of-use",
          // Paid program area — must never appear in search results.
          "/my-program",
          "/my-program/",
          "/portal",
          "/portal/",
          "/sign-in",
          "/payment",
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
