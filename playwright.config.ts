import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke tests: the journeys that make money.
 *
 * They don't test styling — they test that a visitor can get from landing to
 * enquiry, that paid content stays locked, and that private data isn't
 * publicly readable.
 *
 * Note on 127.0.0.1 rather than localhost: on Windows, "localhost" resolves
 * to the IPv6 address ::1 first, but the dev server listens on IPv4. That
 * mismatch makes every request fail with ECONNREFUSED before it reaches the
 * site. Using the IPv4 address directly avoids it entirely.
 */
const HOST = process.env.TEST_URL || "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false, // shared database
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  timeout: 30_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: HOST,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  /**
   * Starts the dev server if it isn't already running, and reuses yours if
   * it is. Means the tests can never fail simply because someone forgot to
   * start it — which is exactly what happened the first time.
   */
  webServer: {
    command: "npm run dev",
    url: HOST,
    reuseExistingServer: true,
    timeout: 180_000,
    stdout: "ignore",
    stderr: "pipe",
  },

  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
