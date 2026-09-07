import { getPayload } from "payload";
import config from "@payload-config";
import { unstable_cache } from "next/cache";

/**
 * Read helpers for the front end.
 *
 * Every one of these swallows its errors and returns a fallback. A CMS
 * outage must never take the marketing site down — a page with slightly
 * stale copy still sells; a 500 page sells nothing.
 */

async function safe<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[visgrow:cms] ${label} failed, using fallback:`, err);
    return fallback;
  }
}

export type Audience = "student" | "employer" | "education";

export const getPrograms = (audience: Audience = "student") =>
  safe(
    `programs(${audience})`,
    async () => {
      const payload = await getPayload({ config });
      const res = await payload.find({
        collection: "programs",
        where: { audience: { equals: audience } },
        sort: "order",
        limit: 50,
        depth: 0,
      });
      return res.docs;
    },
    [],
  );

export const getProgramBySlug = (slug: string) =>
  safe(
    `program(${slug})`,
    async () => {
      const payload = await getPayload({ config });
      const res = await payload.find({
        collection: "programs",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
      });
      return res.docs[0] ?? null;
    },
    null,
  );

export const getTestimonials = (audience: Audience | "featured" = "student") =>
  safe(
    `testimonials(${audience})`,
    async () => {
      const payload = await getPayload({ config });
      const res = await payload.find({
        collection: "testimonials",
        where:
          audience === "featured"
            ? { featured: { equals: true } }
            : { audience: { equals: audience } },
        sort: "order",
        limit: 50,
        depth: 1,
      });
      return res.docs;
    },
    [],
  );

export const getFaqs = (audience: Audience | "all" = "student") =>
  safe(
    `faqs(${audience})`,
    async () => {
      const payload = await getPayload({ config });
      const res = await payload.find({
        collection: "faqs",
        where:
          audience === "all"
            ? {}
            : { or: [{ audience: { equals: audience } }, { audience: { equals: "all" } }] },
        sort: "order",
        limit: 60,
        depth: 0,
      });
      return res.docs;
    },
    [],
  );

export const getCompanyLogos = () =>
  safe(
    "companyLogos",
    async () => {
      const payload = await getPayload({ config });
      const res = await payload.find({
        collection: "company-logos",
        where: { active: { equals: true } },
        sort: "order",
        limit: 60,
        depth: 1,
      });
      return res.docs;
    },
    [],
  );

export const getSiteSettings = () =>
  safe(
    "siteSettings",
    async () => {
      const payload = await getPayload({ config });
      return await payload.findGlobal({ slug: "site-settings", depth: 0 });
    },
    null,
  );

export const getFooter = () =>
  safe(
    "footer",
    async () => {
      const payload = await getPayload({ config });
      return await payload.findGlobal({ slug: "footer", depth: 0 });
    },
    null,
  );

export const getNavigation = () =>
  safe(
    "navigation",
    async () => {
      const payload = await getPayload({ config });
      return await payload.findGlobal({ slug: "navigation", depth: 0 });
    },
    null,
  );

/**
 * Resolves a company logo to an image path, whether it was uploaded
 * through the admin or points at a file already in /public.
 */
export function logoSrc(doc: {
  logoPath?: string | null;
  logo?: unknown;
}): string | null {
  if (doc.logoPath) return doc.logoPath;
  const media = doc.logo as { url?: string } | null | undefined;
  return media?.url ?? null;
}

/** Cached wrapper for data that rarely changes within a request burst. */
export const getCachedCompanyLogos = unstable_cache(getCompanyLogos, ["company-logos"], {
  revalidate: 60,
  tags: ["company-logos"],
});

/**
 * How many days of the Accelerator are actually ready for a student.
 *
 * The Accelerator is delivered as recorded days. Until they exist, selling
 * instant access would take $999 for fourteen locked screens — a refund and a
 * complaint, not a sale. The site reads this number and offers the next intake
 * instead of a pay button. Mustafa doesn't set a flag: he uploads the videos,
 * ticks "Ready for students", and checkout switches itself on at fourteen.
 */
export async function getReadyDayCount(): Promise<number> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.count({
      collection: "lessons",
      where: {
        published: { equals: true },
        // A blank string still "exists", so check for real content.
        youtubeId: { not_equals: "" },
        day: { less_than_equal: 14 },
      },
    });
    return res.totalDocs ?? 0;
  } catch {
    // If we can't tell, assume not ready. Never sell what we can't verify.
    return 0;
  }
}

export const ACCELERATOR_TOTAL_DAYS = 14;
