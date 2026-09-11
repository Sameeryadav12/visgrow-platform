import type { Payload } from "payload";

/**
 * One-time corrections to content already sitting in the database.
 *
 * Fixing the source files only helps a fresh install. Anything already seeded
 * keeps the old wording, and because the CMS takes priority over the code
 * fallbacks, the live site would keep showing it. This closes that gap.
 *
 * Runs on every start, does nothing once the text is gone, and only ever
 * replaces an exact known string — so it can't touch wording Mustafa has
 * since written himself.
 */

type Correction = { find: string; replace: string; why: string };

const CORRECTIONS: Correction[] = [
  {
    why: "The '80% of roles are never advertised' figure is widely repeated but poorly evidenced. Stating it as fact on a commercial page is a misleading-conduct risk.",
    find: "Seek and LinkedIn ads are roughly 20% of the market. The other 80% gets filled through people — before it's ever posted.",
    replace:
      "Job boards only show you the roles that made it to a job board. A large share never do — they get filled through people, before anything is posted.",
  },
  {
    why: "Same claim, phrased as a fraction.",
    find: "You're only seeing a fifth of the jobs",
    replace: "You're only seeing the jobs that got advertised",
  },
  {
    why: "Same claim, in the home page callout.",
    find:
      "And the part nobody tells you: only 20% of roles are ever advertised. The other 80% — the hidden job market — never reaches Seek at all. You've been competing for a fifth of the jobs, against everyone else doing exactly the same thing.",
    replace:
      "And the part nobody tells you: a large share of roles are never advertised at all. They get filled through people — a conversation, a referral, someone who already knows the work — long before anything reaches Seek. You've been competing for the visible jobs, against everyone else doing exactly the same thing.",
  },
  {
    why: "Unsourced statistic presented as fact.",
    find: "of roles are never advertised",
    replace: "roles are filled before they're advertised",
  },
  {
    why: "Unsourced statistic presented as fact.",
    find: "average first resume scan",
    replace: "is all your resume gets on the first pass",
  },

  // --- Career Coaching page. These survived the first pass because the saved
  // wording differs from the phrasings matched above. Found by reading the
  // rendered page rather than the source files, which were already correct.
  {
    why: "The 6-second resume scan figure is folklore, not evidence.",
    find: "A resume that survives the 6-second scan",
    replace: "A resume that survives the first scan",
  },
  {
    why: "Same figure, in the body of that card.",
    find: "so a recruiter's first six seconds land on the reason to call you",
    replace:
      "so the first thing a recruiter's eye lands on is the reason to call you",
  },
  {
    why: "The 80% hidden-job-market claim.",
    find: "reach the 80% of roles that never get advertised",
    replace: "reach the roles that never get advertised",
  },
  {
    why: "Resources filters moved from a hash to a query parameter. A hash-only change on the page you are already on does not always trigger a navigation, so the three dropdown links appeared dead.",
    find: "/resources#students",
    replace: "/resources?for=students",
  },
  {
    why: "Same, for the employer link.",
    find: "/resources#employers",
    replace: "/resources?for=employers",
  },
  {
    why: "Same, for the education partner link.",
    find: "/resources#education-partners",
    replace: "/resources?for=education-partners",
  },
  {
    why: "The same claim inverted as 20%.",
    find: "competing in the same visible 20% of the market",
    replace: "competing for the same advertised roles",
  },
];

/**
 * Last line of defence. If a number we've decided not to claim shows up in
 * any saved wording at all, it gets logged loudly at startup so it can't sit
 * on a live page unnoticed the way these four did.
 */
const BANNED = [/\b80\s?%/, /\b20\s?%\s+of\s+(the\s+)?(market|roles|jobs)/i, /6[-\s]second/i, /75\s?%\s+of\s+resumes/i];

/** Walks any nested object/array and applies the string swaps. */
function fix(
  value: unknown,
  done: { count: number; flagged: string[] },
): unknown {
  if (typeof value === "string") {
    let out = value;
    for (const c of CORRECTIONS) {
      if (out.includes(c.find)) {
        out = out.split(c.find).join(c.replace);
        done.count += 1;
      }
    }
    // Anything still carrying a banned figure is reported, not silently
    // rewritten — a wrong auto-fix on live copy is worse than a warning.
    if (out.length > 12 && BANNED.some((re) => re.test(out))) {
      done.flagged.push(out.slice(0, 120));
    }
    // The paired stat values, which only make sense alongside their labels.
    if (out === "80%") { done.count += 1; return "Most"; }
    if (out === "6 sec") { done.count += 1; return "Seconds"; }
    if (out === "2 yrs") { done.count += 1; return "Early"; }
    return out;
  }
  if (Array.isArray(value)) return value.map((v) => fix(v, done));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = fix(v, done);
    }
    return out;
  }
  return value;
}

/**
 * Details Mustafa confirmed by email. Only ever fills a field that is still
 * empty, or replaces a value we know is superseded — never overwrites
 * something he has since typed himself.
 */
async function applyConfirmedDetails(payload: Payload) {
  const settings = await payload.findGlobal({ slug: "site-settings", depth: 0 });
  const patch: Record<string, string> = {};

  if (!settings?.businessName?.trim()) {
    patch.businessName = "Vis-Grow Internships";
  }
  if (!settings?.abn?.trim()) {
    patch.abn = "32 274 155 355";
  }
  // The HD re-upload supersedes the original 720p version.
  const currentVideo = settings?.masterclassYoutubeId?.trim();
  if (!currentVideo || currentVideo === "ZLvxqVzQzeg") {
    patch.masterclassYoutubeId = "ItulbkEopuY";
  }

  if (Object.keys(patch).length) {
    await payload.updateGlobal({ slug: "site-settings", data: patch });
    payload.logger.info(
      `[visgrow] Applied confirmed business details: ${Object.keys(patch).join(", ")}`,
    );
  }

  // Prices Mustafa has confirmed. The two he's still deciding on are left
  // blank so the site says "let's talk" rather than showing a number he
  // hasn't agreed to.
  const confirmed: Record<string, { price: string; priceNote: string }> = {
    "14-day-accelerator": { price: "$999", priceNote: "14 days" },
    "hosted-internships": { price: "$3,499", priceNote: "incl. coaching" },
    "career-strategy-gap-analysis": { price: "", priceNote: "Price being confirmed" },
    "career-coaching": { price: "", priceNote: "Price being confirmed" },
  };

  const superseded = ["$899", "$249", "$1,999"];

  for (const [slug, values] of Object.entries(confirmed)) {
    const found = await payload.find({
      collection: "programs",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    const program = found.docs[0];
    if (!program) continue;

    const current = (program.price ?? "").trim();
    // Only touch it if it's still one of the old placeholder prices.
    if (!superseded.includes(current)) continue;

    await payload.update({
      collection: "programs",
      id: program.id,
      data: values,
    });
    payload.logger.info(
      `[visgrow] Updated ${slug} price: ${current} → ${values.price || "(enquiry only)"}`,
    );
  }
}

/**
 * Makes sure the free scorecard is linked from the main menu.
 *
 * The navigation is stored in the database and the saved copy wins over the
 * code fallback, so adding the link to nav-data.ts alone would do nothing on
 * any site that has already been seeded — including the live one.
 *
 * Only ever adds, and only if it isn't there. If Mustafa later removes or
 * renames it himself, this leaves his version alone.
 */
async function ensureScorecardLink(payload: Payload) {
  try {
    const nav = await payload.findGlobal({ slug: "navigation", depth: 0 });
    const items = nav?.items;
    if (!Array.isArray(items)) return;

    const alreadyThere = JSON.stringify(items).includes("/scorecard");
    if (alreadyThere) return;

    const students = items.find((i) =>
      /students/i.test(String(i?.label ?? "")),
    );
    if (!students || !Array.isArray(students.children)) return;

    students.children.unshift({
      label: "Free Job-Readiness Scorecard",
      href: "/scorecard",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await payload.updateGlobal({ slug: "navigation", data: { items } as any });
    payload.logger.info("[visgrow] Added the scorecard link to the menu.");
  } catch (err) {
    payload.logger.error({ err }, "[visgrow] Could not add the scorecard link");
  }
}

export async function runCorrections(payload: Payload) {
  let total = 0;

  try {
    await applyConfirmedDetails(payload);
    await ensureScorecardLink(payload);

    // Home page copy
    const home = await payload.findGlobal({ slug: "home-page", depth: 0 });
    const counter = { count: 0, flagged: [] as string[] };
    const fixedHome = fix(home, counter) as Record<string, unknown>;
    if (counter.count > 0) {
      delete fixedHome.id;
      delete fixedHome.updatedAt;
      delete fixedHome.createdAt;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.updateGlobal({ slug: "home-page", data: fixedHome as any });
      total += counter.count;
    }

    // Navigation and footer. These hold the dropdown hrefs, and the saved
    // values win over the code fallbacks — so a link fixed only in
    // nav-data.ts would still be broken on the live site.
    for (const slug of ["navigation", "footer"] as const) {
      const g = await payload.findGlobal({ slug, depth: 0 });
      const c = { count: 0, flagged: [] as string[] };
      const fixed = fix(g, c) as Record<string, unknown>;
      if (c.count === 0) continue;
      delete fixed.id;
      delete fixed.updatedAt;
      delete fixed.createdAt;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.updateGlobal({ slug, data: fixed as any });
      total += c.count;
    }

    // Every other page's copy
    const pages = await payload.find({
      collection: "page-copy",
      limit: 100,
      depth: 0,
      pagination: false,
    });

    for (const doc of pages.docs) {
      const c = { count: 0, flagged: [] as string[] };
      const fixed = fix(doc, c) as Record<string, unknown>;
      if (c.count === 0) continue;
      delete fixed.id;
      delete fixed.updatedAt;
      delete fixed.createdAt;
      await payload.update({
        collection: "page-copy",
        id: doc.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: fixed as any,
      });
      total += c.count;
      counter.flagged.push(...c.flagged);
    }

    if (total > 0) {
      payload.logger.info(
        `[visgrow] Corrected ${total} unsourced claim(s) in saved content.`,
      );
    }

    if (counter.flagged.length) {
      payload.logger.warn(
        `[visgrow] ${counter.flagged.length} saved string(s) still contain a figure we've decided not to claim. Review these in /admin:\n  - ${counter.flagged.join("\n  - ")}`,
      );
    }
  } catch (err) {
    // Never block startup over this.
    payload.logger.error({ err }, "[visgrow] Content corrections failed");
  }
}
