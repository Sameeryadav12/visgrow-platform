import { getPayload } from "payload";
import config from "@payload-config";
import type { PageCopy } from "@/payload-types";

/**
 * Copy for a single page, looked up by its URL path.
 *
 * Returns null on any failure — every caller pairs this with the wording
 * already in the code, so a database outage degrades to the current site
 * rather than to an error page.
 */
export async function getPageCopy(path: string): Promise<PageCopy | null> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "page-copy",
      where: { path: { equals: path } },
      limit: 1,
      depth: 0,
    });
    return (res.docs[0] as PageCopy) ?? null;
  } catch (err) {
    console.error(`[visgrow:cms] page copy for ${path} failed, using code:`, err);
    return null;
  }
}

/** CMS string if present, otherwise the wording already on the site. */
export const t = (cms: unknown, fallback: string): string => {
  const v = typeof cms === "string" ? cms.trim() : "";
  return v || fallback;
};

/** CMS list if it has entries, otherwise the current one. */
export function list<C, F>(cms: C[] | null | undefined, fallback: F[]): C[] | F[] {
  return cms && cms.length ? cms : fallback;
}

/** Pulls the `text` out of a simple {text} array, or falls back. */
export function texts(
  cms: { text?: string | null }[] | null | undefined,
  fallback: string[],
): string[] {
  const v = cms?.map((i) => i.text ?? "").filter(Boolean) ?? [];
  return v.length ? v : fallback;
}

/** Builds page metadata from the CMS, falling back to what's in the file. */
export function seoFrom(
  copy: PageCopy | null,
  fallback: { title: string; description: string },
) {
  return {
    title: t(copy?.seo?.title, fallback.title),
    description: t(copy?.seo?.description, fallback.description),
  };
}
