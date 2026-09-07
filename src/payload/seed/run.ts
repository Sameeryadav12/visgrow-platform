import type { Payload } from "payload";
import {
  seedCompanyLogos,
  seedFaqs,
  seedFooterColumns,
  seedMasterclassChapters,
  seedPrograms,
  seedTestimonials,
} from "./content";
import { seedPageCopy } from "./pages";
import { homeDefaults } from "@/lib/home-copy";

/**
 * Fills an empty CMS with the copy that currently lives in the page files.
 *
 * Runs automatically every time the server starts, and can also be triggered
 * from /api/seed. It is safe to run any number of times: each collection is
 * skipped if it already contains anything, so it can never overwrite an edit.
 */
export async function runSeed(payload: Payload) {
  const created: string[] = [];
  const skipped: string[] = [];

  const seedCollection = async <T extends Record<string, unknown>>(
    collection: "programs" | "testimonials" | "faqs" | "company-logos" | "page-copy",
    rows: T[],
  ) => {
    const existing = await payload.count({ collection });
    if (existing.totalDocs > 0) {
      skipped.push(`${collection} (${existing.totalDocs} already there)`);
      return;
    }
    for (const row of rows) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.create({ collection, data: row as any });
    }
    created.push(`${collection}: ${rows.length} created`);
  };

  await seedCollection(
    "programs",
    seedPrograms.map((p) => ({
      ...p,
      includes: p.includes.map((item) => ({ item })),
      outcomes: p.outcomes.map((item) => ({ item })),
    })),
  );

  await seedCollection("testimonials", seedTestimonials);
  await seedCollection(
    "page-copy",
    seedPageCopy as unknown as Record<string, unknown>[],
  );
  await seedCollection("faqs", seedFaqs);
  await seedCollection("company-logos", seedCompanyLogos);

  // Globals always have exactly one row, so test a field that has no default
  // value — `phone` has one, so it always looks filled in even when empty.
  const settings = await payload.findGlobal({ slug: "site-settings" });
  if (!settings?.masterclassChapters?.length) {
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        phone: "1300 891 365",
        email: "hello@visgrowinternships.com.au",
        address: "Innovation House, Mawson Lakes SA",
        masterclassChapters: seedMasterclassChapters,
        audiencePopupEnabled: true,
        audiencePopupHeading: "Which one are you?",
        audiencePopupSubheading: "One click and we'll take you to the right place.",
        stickyCtaEnabled: true,
        stickyCtaText: "Not sure where to start?",
      },
    });
    created.push("site settings");
  } else {
    skipped.push("site settings (already filled in)");
  }

  // Pre-fill the home page copy so the admin shows the real words to edit,
  // rather than a wall of empty boxes.
  const home = await payload.findGlobal({ slug: "home-page" });
  if (!home?.pain?.heading) {
    const d = homeDefaults;
    await payload.updateGlobal({
      slug: "home-page",
      data: {
        ticker: d.ticker,
        pain: {
          eyebrow: d.pain.eyebrow,
          heading: d.pain.heading,
          items: d.pain.items,
          card: d.pain.card,
        },
        importance: d.importance,
        benefits: d.benefits,
        consequences: {
          eyebrow: d.consequences.eyebrow,
          heading: d.consequences.heading,
          items: d.consequences.items.map((text) => ({ text })),
          imageQuote: d.consequences.imageQuote,
          imageAttribution: d.consequences.imageAttribution,
        },
        how: d.how,
        results: d.results,
        pricing: d.pricing,
        faq: d.faq,
      },
    });
    created.push("home page copy");
  } else {
    skipped.push("home page copy (already filled in)");
  }

  const footer = await payload.findGlobal({ slug: "footer" });
  if (!footer?.columns?.length) {
    await payload.updateGlobal({
      slug: "footer",
      data: { columns: seedFooterColumns },
    });
    created.push("footer");
  } else {
    skipped.push("footer (already filled in)");
  }

  return { created, skipped };
}
