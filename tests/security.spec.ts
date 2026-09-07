import { test, expect } from "@playwright/test";

/**
 * The checks that matter most, because failing them costs real money or
 * breaches privacy — not just looks bad.
 *
 * Run with no admin cookie, so this is exactly what a stranger sees.
 */

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("private data stays private", () => {
  const MUST_BE_LOCKED = [
    ["enquiries", "/api/enquiries"],
    ["students", "/api/students"],
    ["lessons — these hold the paid video IDs", "/api/lessons"],
    ["users", "/api/users"],
  ] as const;

  for (const [what, url] of MUST_BE_LOCKED) {
    test(`${what} are not publicly readable`, async ({ request }) => {
      const res = await request.get(url);
      expect(
        res.status(),
        `${url} returned ${res.status()} — this data must never be public`,
      ).toBeGreaterThanOrEqual(400);
    });
  }

  test("the seed endpoint needs a login", async ({ request }) => {
    expect((await request.get("/api/seed")).status()).toBe(401);
  });

  test("the lead export needs a login", async ({ request }) => {
    expect((await request.get("/api/enquiries/export")).status()).toBe(401);
  });

  test("the daily job cannot be triggered by a stranger", async ({ request }) => {
    const res = await request.get("/api/cron/daily");
    expect([401, 500]).toContain(res.status());
  });
});

test.describe("the paid program", () => {
  test("is not reachable without signing in", async ({ page }) => {
    await page.goto("/my-program");
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test("individual days are not reachable either", async ({ page }) => {
    await page.goto("/my-program/day/1");
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test("progress cannot be faked from outside", async ({ request }) => {
    const res = await request.post("/api/lms/complete", {
      data: { day: 1, done: true },
    });
    expect(res.status()).toBe(401);
  });
});

test.describe("sign-in", () => {
  test("does not reveal who is enrolled", async ({ request }) => {
    // An unknown address and a real one must be indistinguishable, or this
    // becomes a way to check who has bought the program.
    const unknown = await request.post("/api/lms/request-link", {
      data: { email: "definitely-not-enrolled@example.com" },
    });
    // 429 also passes: the endpoint is protected, which is the point.
    expect([200, 429]).toContain(unknown.status());
    if (unknown.status() === 200) {
      expect(await unknown.json()).toEqual({ ok: true });
    }
  });

  test("rejects a rubbish token", async ({ page }) => {
    await page.goto("/api/lms/verify?token=obviously-not-a-real-token");
    await expect(page).toHaveURL(/\/sign-in\?problem=invalid/);
  });
});

test.describe("payments", () => {
  test("payments are not publicly readable", async ({ request }) => {
    const res = await request.get("/api/payments");
    expect(res.status()).toBeGreaterThanOrEqual(400);
  });

  test("the price is set by the server, not the browser", async ({ request }) => {
    // Someone editing the request must not be able to choose their own price.
    const res = await request.post("/api/checkout", {
      data: { programSlug: "14-day-accelerator", amount: 1, price: "$1" },
    });
    const body = await res.text();
    // Either Stripe is off (503) or a session was made — but never at $1.
    expect([200, 409, 503, 429]).toContain(res.status());
    expect(body).not.toContain('"amount":1');
  });

  test("a made-up program cannot be bought", async ({ request }) => {
    const res = await request.post("/api/checkout", {
      data: { programSlug: "free-everything-please" },
    });
    expect([404, 503, 429]).toContain(res.status());
  });

  test("the Stripe webhook rejects unsigned requests", async ({ request }) => {
    // Without this, anyone could POST a fake "payment succeeded" and be
    // enrolled in a paid program for nothing.
    const res = await request.post("/api/webhooks/stripe", {
      data: { type: "checkout.session.completed", data: { object: {} } },
    });
    expect([400, 503]).toContain(res.status());
  });
});

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["x-frame-options"]).toBe("SAMEORIGIN");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
});
