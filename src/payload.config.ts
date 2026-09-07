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

  onInit: async (payload) => {
    await ensureFirstUser(payload);

    // Fill an empty CMS with the site's current copy. Skips anything that
    // already has content, so it can never overwrite an edit — and it means
    // nobody has to remember to run a seed step by hand after a DB reset.
    try {
      const { created } = await runSeed(payload);
      if (created.length) {
        payload.logger.info(`[visgrow] Seeded content: ${created.join(", ")}`);
      }

      // Fixes wording already saved in the database. Source-file changes
      // alone don't reach content that's been seeded, and the CMS takes
      // priority over the code fallbacks.
      await runCorrections(payload);
    } catch (err) {
      payload.logger.error({ err }, "[visgrow] Content seed failed");
    }
  },

  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),

  sharp,

  // Uploads land in /public/media so Next can serve them directly.
  upload: {
    limits: { fileSize: 10_000_000 },
  },
});
