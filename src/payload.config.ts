import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Enquiries } from "./payload/collections/Enquiries";
import { Lessons } from "./payload/collections/Lessons";
import { Students } from "./payload/collections/Students";
import { Payments } from "./payload/collections/Payments";
import { Testimonials } from "./payload/collections/Testimonials";
import { Faqs } from "./payload/collections/Faqs";
import { Programs } from "./payload/collections/Programs";
import { CompanyLogos } from "./payload/collections/CompanyLogos";
import { PageCopy } from "./payload/collections/PageCopy";
import { HomePage } from "./payload/globals/HomePage";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { Navigation } from "./payload/globals/Navigation";
import { FooterGlobal } from "./payload/globals/Footer";
import { ensureFirstUser } from "./payload/seed/firstUser";
import { runSeed } from "./payload/seed/run";
import { runCorrections } from "./payload/seed/corrections";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Postgres connection settings.
 *
 * Hosted providers hand you a URL with query parameters that node-postgres
 * either doesn't understand or warns loudly about:
 *
 *  - `channel_binding` isn't supported and is rejected outright.
 *  - `sslmode=require` still works, but the driver prints a deprecation
 *    warning on every start because it treats it as an alias.
 *
 * So both are stripped and TLS is configured explicitly instead. Certificates
 * are verified — the default `rejectUnauthorized: false` many guides suggest
 * would leave the connection open to interception, which is not acceptable for
 * a database holding enquiries and coaching notes.
 *
 * A local Docker Postgres has no TLS, so SSL is skipped for local hosts.
 */
function buildPool() {
  const raw = process.env.DATABASE_URI || "";
  const connectionString = raw
    .replace(/[?&]channel_binding=[^&]*/g, "")
    .replace(/[?&]sslmode=[^&]*/g, "")
    .replace(/\?&/, "?")
    .replace(/[?&]$/, "");

  const isLocal = /@(localhost|127\.0\.0\.1|host\.docker\.internal)/.test(raw);

  return isLocal
    ? { connectionString }
    : { connectionString, ssl: { rejectUnauthorized: true } };
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " · Visgrow",
      icons: [{ rel: "icon", type: "image/png", url: "/logo/PNG/visgrow-logo-primary.png" }],
    },
    components: {
      graphics: {
        Logo: "@/payload/admin/Logo#Logo",
        Icon: "@/payload/admin/Icon#Icon",
      },
      views: {
        dashboard: {
          Component: "@/payload/admin/Dashboard#Dashboard",
        },
      },
    },
  },

  collections: [
    PageCopy,
    Programs,
    Testimonials,
    Faqs,
    CompanyLogos,
    Media,
    Lessons,
    Students,
    Enquiries,
    Payments,
    Users,
  ],

  globals: [HomePage, SiteSettings, Navigation, FooterGlobal],

  editor: lexicalEditor(),

  /**
   * Runs once when the app boots — which on a long-running server means
   * literally once, and on a serverless host means on every cold start.
   *
   * That difference matters. Creating the schema and seeding roughly seventy
   * records takes far longer than a serverless request is allowed to run, so
   * doing it here made every cold start of the admin panel time out and
   * return a 500. The public pages hid it, because their reads fall back to
   * the copy in the code.
   *
   * So setup only runs where there is time for it: locally, or when
   * explicitly asked for with RUN_SETUP=true. Point .env.local at the hosted
   * database and start the app once, and it builds and seeds everything.
   * After that the hosted app just reads and writes normally.
   */
  onInit: async (payload) => {
    const isServerless = Boolean(process.env.VERCEL);
    const forced = process.env.RUN_SETUP === "true";

    if (isServerless && !forced) {
      return;
    }

    try {
      await ensureFirstUser(payload);

      // Skips anything that already has content, so it can never overwrite
      // an edit, and nobody has to remember to run a seed step by hand.
      const { created } = await runSeed(payload);
      if (created.length) {
        payload.logger.info(`[visgrow] Seeded content: ${created.join(", ")}`);
      }

      // Fixes wording already saved in the database. Source-file changes
      // alone don't reach content that's been seeded, and the CMS takes
      // priority over the code fallbacks.
      await runCorrections(payload);
      payload.logger.info("[visgrow] Setup complete.");
    } catch (err) {
      payload.logger.error({ err }, "[visgrow] Setup failed");
    }
  },

  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: postgresAdapter({
    pool: buildPool(),
    // Payload only creates tables automatically when NODE_ENV isn't
    // "production". On a hosted deployment it is, so the schema was never
    // built and every admin request failed while the public pages quietly
    // fell back to their hard-coded copy.
    //
    // Push is the right call while this is a single environment with no
    // migration history. Before the real launch, generate migrations and set
    // this back to false so schema changes are reviewable and reversible.
    push: true,
  }),

  sharp,

  // Uploads land in /public/media so Next can serve them directly.
  upload: {
    limits: { fileSize: 10_000_000 },
  },
});
