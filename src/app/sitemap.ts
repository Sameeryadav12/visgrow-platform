import type { MetadataRoute } from "next";
import { publishedGuides } from "@/lib/guides";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://visgrowinternships.com.au";

/**
 * Tells Google which pages exist and how important each one is.
 *
 * Hand-listed rather than auto-crawled, because priority and change
 * frequency are editorial judgements: the pages that sell come first,
 * legal pages are excluded entirely (they're set to noindex anyway).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; freq: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },

    // The money pages.
    { path: "/students-graduates/career-strategy-gap-analysis", priority: 0.9, freq: "monthly" },
    { path: "/students-graduates/14-day-accelerator", priority: 0.9, freq: "monthly" },
    { path: "/students-graduates/career-coaching", priority: 0.9, freq: "monthly" },
    { path: "/students-graduates/hosted-internships", priority: 0.9, freq: "monthly" },

    // Lead magnet — worth ranking for.
    { path: "/masterclass", priority: 0.8, freq: "monthly" },

    // Other audiences.
    { path: "/employers", priority: 0.8, freq: "monthly" },
    { path: "/education-partners", priority: 0.8, freq: "monthly" },
    { path: "/academy", priority: 0.8, freq: "monthly" },
    { path: "/academy/skills-development", priority: 0.7, freq: "monthly" },

    // Supporting.
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "yearly" },
    { path: "/resources", priority: 0.5, freq: "monthly" },
    { path: "/get-started", priority: 0.7, freq: "yearly" },
    { path: "/students-graduates", priority: 0.5, freq: "yearly" },
  ];

  // Every published guide is a real indexable page and the main reason
  // someone lands here from a search rather than an ad.
  for (const g of publishedGuides()) {
    pages.push({ path: `/resources/${g.slug}`, priority: 0.6, freq: "yearly" });
  }

  return pages.map(({ path, priority, freq }) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
