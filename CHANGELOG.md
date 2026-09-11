# Changelog

Every released version of the Visgrow platform. Newest first.

This project uses [semantic versioning](https://semver.org): `MAJOR.MINOR.PATCH`.

- **PATCH** (1.0.0 → 1.0.1) — a fix. Wording, a broken link, a styling bug.
- **MINOR** (1.0.0 → 1.1.0) — something new that doesn't break what exists. A new page, a new field in the admin panel.
- **MAJOR** (1.0.0 → 2.0.0) — a change that alters how something fundamental works, or requires a database migration that can't be undone.

Each released version is a git tag, so any of them can be checked out or redeployed exactly as it was.

---

## [1.2.0] — 2026-09-12

### Added
- **Free Job-Readiness Scorecard at `/scorecard`** — twelve questions, five scored areas, instant personalised result with the single weakest area named and one free action to take this week. No sign-up, and the full result is shown before any email is requested. Completed scorecards land in the CRM with the score breakdown and a warmth rating, so a sales call starts with the diagnosis already done.
- **Cost-of-waiting calculator** on the home page, directly after the consequences section — the visitor works out their own number rather than being told one.
- **Real Google reviews** via the Places API, on the home, employers and education-partner pages. Renders nothing at all until `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` are set. There is deliberately no placeholder or sample data.
- **Polish layer** — staggered section reveals, a slow drift on the hero gradient, a sheen on primary buttons, visible keyboard focus rings, and a scroll-linked reading progress bar where the browser supports it. All CSS-only, and all disabled under `prefers-reduced-motion`.

### Notes
- Fabricated reviews were requested and declined. Inventing customer reviews breaches the Australian Consumer Law, and presenting invented text as a Google review would also misrepresent Google. Where no genuine testimonials exist — employers and education partners — the pages lean on the founder's verifiable credentials instead, and the reviews section stays hidden until there is something real to show.
- The scorecard measures preparation, never predicts outcomes, and says so on the page, in the result and in the email.

---

## [1.1.0] — 2026-09-09

### Added
- **Customer portal at `/portal`** — one signed-in area for everyone who has bought something, not only Accelerator students. Overview with a single next action, program progress, files, sessions and account details.
- **Customer files** — a private upload collection. Files are stored outside `public/`, the collection is admin-only for reads, and `/api/portal/file/[id]` verifies both the session and the document's owner before streaming the file.
- **Sessions** — one-to-one bookings recorded by Visgrow, showing the customer when it is, what to bring, the join link, and what was agreed afterwards.
- Customers can now have multiple programs recorded against them, which decides what their portal shows.
- **Vercel Blob storage** for media and customer files, so uploads survive a deploy instead of disappearing with the filesystem. Off unless `BLOB_READ_WRITE_TOKEN` is set, so local development is unchanged.
- **Welcome email** on creating a customer, telling them their portal exists and how to get in. Sends once, and can be turned off per person before saving.

### Changed
- Sign-in lands on `/portal` instead of the Accelerator lesson list, and its copy no longer assumes the Accelerator.
- The `students` collection is labelled "Customers" in the admin panel, and the Accelerator start date is optional — someone who bought coaching only doesn't have one.

### Fixed
- The three Resources dropdown links did nothing. They pointed at `#hash` anchors on a page the user was often already on, which Next.js does not treat as a navigation. They now use `?for=` and the correction pass rewrites the saved navigation in the database, which previously it never touched.

---

## [1.0.0] — 2026-09-07

First complete build, ready for client review.

### Public site
- 17 pages across students & graduates, employers, education partners and the academy
- Every page follows the agreed narrative order: problem → why it matters → what you get → cost of inaction → proof → how to start
- 19 long-form guides published, each indexable and routing to a paid diagnostic
- Real photography from Visgrow sessions across the home, employers, education partners, academy and about pages

### Content management
- Programs, prices, testimonials, FAQs, page copy, navigation, footer and site settings all editable by the client
- Admin panel branded and relabelled for a non-technical user
- Idempotent startup corrections, so content fixes reach already-seeded records

### CRM
- Enquiry pipeline with status, follow-up date, warmth rating and automatic contact history
- Marking a lead enrolled provisions program access automatically
- CSV export

### Learning platform
- Passwordless sign-in with HMAC-signed session cookies
- Daily lesson unlocking from the student's start date, with pause support
- Per-day video, task, checklist and downloads, all client-editable
- Instant checkout gating: paid access only opens once all 14 days are published with video

### Payments
- Stripe Checkout with signed webhooks and duplicate-delivery protection
- Automatic student provisioning on purchase
- Refund and dispute handling
- Terms consent collected at the point of payment

### Legal and compliance
- Terms & Conditions and Privacy Policy written against Australian Consumer Law and the Privacy Act 1988
- No unsourced statistics anywhere on the site, with a startup check that flags any reappearing
- No job guarantee, stated explicitly wherever someone is about to pay

### Operations
- Transactional email via Resend; daily digest and student nudges
- Rate limiting on public endpoints
- Database backup script
- Sitemap, structured data, and search-engine blocking on anything that isn't the flagged production environment
- 74 Playwright specs covering pages, the enquiry flow and security expectations

### Known — awaiting client
- Career Strategy & Gap Analysis price not set
- Ongoing Career Coaching price not set, and the program itself is unconfirmed
- Legal pages not yet reviewed by a solicitor
- Employer and education-partner testimonials not yet supplied
