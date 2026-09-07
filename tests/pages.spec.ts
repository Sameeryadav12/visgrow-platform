import { test, expect } from "@playwright/test";

/**
 * Every page loads, and the things that sell are actually on them.
 *
 * A page returning 200 while rendering an empty shell is the failure mode
 * that matters here, so each check looks for real content — not just a
 * status code.
 */

const PAGES = [
  "/",
  "/masterclass",
  "/get-started",
  "/students-graduates/career-strategy-gap-analysis",
  "/students-graduates/14-day-accelerator",
  "/students-graduates/career-coaching",
  "/students-graduates/hosted-internships",
  "/employers",
  "/education-partners",
  "/academy",
  "/academy/skills-development",
  "/resources",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-use",
];

test.describe("every page", () => {
  for (const path of PAGES) {
    test(`${path} loads with real content`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));

      const res = await page.goto(path);
      expect(res?.status(), `${path} should return 200`).toBe(200);

      // Exactly one h1, and it isn't empty.
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).not.toBeEmpty();

      // Header and footer present, so the layout rendered.
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();

      // No unhandled JavaScript errors.
      expect(errors, `${path} threw: ${errors.join(" | ")}`).toHaveLength(0);
    });
  }
});

test("404 helps rather than dead-ends", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /couldn't find/i,
  );
  // It should still offer a way forward.
  await expect(page.getByRole("link", { name: /home page/i }).first()).toBeVisible();
});

test("no page throws a React hydration mismatch", async ({ page }) => {
  // A mismatch means the server and browser disagreed about the markup.
  // React silently gives up patching it, so interactive things can quietly
  // stop working — exactly the kind of fault nobody notices until a customer
  // reports that a button does nothing.
  const complaints: string[] = [];
  page.on("console", (msg) => {
    const text = msg.text();
    if (/hydrat/i.test(text)) complaints.push(text.slice(0, 200));
  });

  for (const path of ["/", "/contact", "/this-page-does-not-exist"]) {
    await page.goto(path);
    await page.waitForTimeout(400);
  }

  expect(complaints, complaints.join("\n")).toHaveLength(0);
});

test("home page has the sections the strategy depends on", async ({ page }) => {
  await page.goto("/");
  for (const id of ["overview", "success-stories", "how", "pricing", "faqs", "enquire"]) {
    await expect(page.locator(`#${id}`), `#${id} missing`).toHaveCount(1);
  }
});

test("pricing shows real prices, not placeholders", async ({ page }) => {
  await page.goto("/#pricing");
  const cards = page.locator("#pricing article");
  await expect(cards).toHaveCount(4);
  // Every card shows a dollar amount.
  for (let i = 0; i < 4; i++) {
    await expect(cards.nth(i)).toContainText(/\$[\d,]+/);
  }
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<urlset");

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const text = await robots.text();
  // The admin and the paid area must never be crawlable.
  expect(text).toContain("Disallow: /admin");
  expect(text).toContain("Disallow: /my-program");
});
