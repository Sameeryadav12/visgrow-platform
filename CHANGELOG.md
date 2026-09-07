# Changelog

Every released version of the Visgrow platform. Newest first.

This project uses [semantic versioning](https://semver.org): `MAJOR.MINOR.PATCH`.

- **PATCH** (1.0.0 → 1.0.1) — a fix. Wording, a broken link, a styling bug.
- **MINOR** (1.0.0 → 1.1.0) — something new that doesn't break what exists. A new page, a new field in the admin panel.
- **MAJOR** (1.0.0 → 2.0.0) — a change that alters how something fundamental works, or requires a database migration that can't be undone.

Each released version is a git tag, so any of them can be checked out or redeployed exactly as it was.

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
