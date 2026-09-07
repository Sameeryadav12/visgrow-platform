import type { Payload } from "payload";

/**
 * Creates the first admin account on first boot, so nobody has to sit
 * at a "create your first user" screen. Runs on every start but only
 * ever creates a user when the table is empty.
 *
 * Credentials come from .env.local — never hard-coded here.
 */
export async function ensureFirstUser(payload: Payload) {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Visgrow Admin";

  if (!email || !password) return;

  try {
    const existing = await payload.find({
      collection: "users",
      limit: 1,
      pagination: false,
    });

    if (existing.totalDocs > 0) return;

    await payload.create({
      collection: "users",
      data: { email, password, name },
    });

    payload.logger.info(`[visgrow] Created first admin user: ${email}`);
    payload.logger.warn(
      "[visgrow] Change this password after first login — it is sitting in plain text in .env.local.",
    );
  } catch (err) {
    payload.logger.error({ err }, "[visgrow] Could not create the first admin user");
  }
}
