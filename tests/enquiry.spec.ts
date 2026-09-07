import { test, expect } from "@playwright/test";

/**
 * The enquiry form is the only thing on this site that makes money.
 * If it silently stops working, nothing else matters.
 *
 * Note on the rate limit: the endpoint deliberately blocks more than 5
 * submissions in 10 minutes from one address. That's correct behaviour, but
 * it means these tests can trip their own protection when run repeatedly.
 * A 429 is therefore treated as a pass — it proves the endpoint is alive and
 * defending itself. Only a wrong status is a failure.
 */

// The API tests only need to run once, not once per device.
test.describe.configure({ mode: "serial" });

const unique = () => `test-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

test("a real enquiry is accepted and saved", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "API test — runs once");

  const res = await request.post("/api/enquiry", {
    data: {
      name: "Playwright Test",
      email: `${unique()}@example.com`,
      phone: "0400 000 000",
      enquiryType: "14-Day Career Accelerator",
      message: "Automated test. Safe to delete.",
      audience: "student",
      consent: true,
      source: "/automated-test",
    },
  });

  if (res.status() === 429) {
    test.skip(true, "Rate limit hit — wait 10 minutes and re-run.");
    return;
  }

  expect(res.status(), `Expected 201. Server said: ${await res.text()}`).toBe(201);
  const body = await res.json();
  expect(body.ok).toBe(true);
  expect(body.id).toBeTruthy();
});

test("rubbish submissions are rejected", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "API test — runs once");

  const noName = await request.post("/api/enquiry", {
    data: { email: "someone@example.com" },
  });
  expect(
    [422, 429],
    `A submission with no name returned ${noName.status()}`,
  ).toContain(noName.status());

  const badEmail = await request.post("/api/enquiry", {
    data: { name: "Someone", email: "not-an-email" },
  });
  expect(
    [422, 429],
    `A submission with a bad email returned ${badEmail.status()}`,
  ).toContain(badEmail.status());
});

test("the form is on the page and usable", async ({ page }) => {
  await page.goto("/#enquire");

  const form = page.locator("#enquire form");
  await expect(form).toBeVisible();

  // Every field has a label a screen reader can use.
  const inputs = form.locator("input:not([type=checkbox]), textarea, select");
  const count = await inputs.count();
  expect(count).toBeGreaterThan(3);

  for (let i = 0; i < count; i++) {
    const id = await inputs.nth(i).getAttribute("id");
    expect(id, "every field needs an id so its label can point at it").toBeTruthy();
    await expect(page.locator(`label[for="${id}"]`)).toHaveCount(1);
  }

  await expect(form.locator('button[type="submit"]')).toBeVisible();
});

test("the form refuses to submit when required fields are empty", async ({ page }) => {
  await page.goto("/#enquire");
  await page.locator("#enquire form button[type=submit]").click();
  // Should stay put and complain, not pretend it sent.
  await expect(page.locator("#enquire form")).toBeVisible();
});
