#!/usr/bin/env node
/**
 * Backs up the whole CMS and every enquiry to a dated JSON file.
 *
 *   npm run backup            → writes backups/visgrow-YYYY-MM-DD.json
 *
 * Runs through Payload rather than pg_dump so the file is human-readable
 * and portable: if this project were ever rebuilt on a different stack,
 * the content and the leads would still be recoverable from it.
 *
 * The leads file contains personal information. Keep backups somewhere
 * private and never commit them.
 */

import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import config from "../src/payload.config.ts";

const COLLECTIONS = [
  "page-copy",
  "programs",
  "testimonials",
  "faqs",
  "company-logos",
  "media",
  "enquiries",
  "users",
];

const GLOBALS = ["home-page", "site-settings", "navigation", "footer"];

const run = async () => {
  const payload = await getPayload({ config });
  const out = { takenAt: new Date().toISOString(), collections: {}, globals: {} };

  for (const slug of COLLECTIONS) {
    const res = await payload.find({
      collection: slug,
      limit: 10000,
      depth: 0,
      pagination: false,
    });
    // Never back up password hashes, even our own.
    out.collections[slug] =
      slug === "users"
        ? res.docs.map(({ id, email, name }) => ({ id, email, name }))
        : res.docs;
    console.log(`  ${slug}: ${res.docs.length}`);
  }

  for (const slug of GLOBALS) {
    out.globals[slug] = await payload.findGlobal({ slug, depth: 0 });
    console.log(`  ${slug}: ok`);
  }

  const dir = path.resolve("backups");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `visgrow-${new Date().toISOString().slice(0, 10)}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 2));

  const kb = Math.round(fs.statSync(file).size / 1024);
  console.log(`\nBackup written to ${file} (${kb} KB)`);
  console.log("This contains personal data. Store it somewhere private.");
  process.exit(0);
};

run().catch((err) => {
  console.error("Backup failed:", err);
  process.exit(1);
});
