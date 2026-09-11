# Visgrow Platform

A production website and business platform for [Visgrow](https://visgrowinternships.com.au), an Adelaide career-coaching, internship and corporate-training company.

This is not a marketing site with a contact form bolted on. It is four systems in one codebase: a public site, a content management system the client edits himself, a CRM that tracks every enquiry through to payment, and a learning platform that delivers a paid 14-day program to enrolled students.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Payload CMS 3 · PostgreSQL · Tailwind CSS 4 · Stripe · Resend · Playwright

---

## Why it was built this way

The client is not technical, sells four programs through conversations rather than a checkout funnel, and needed to run the whole business without calling a developer every time a price changed. Three decisions followed from that.

**The CMS edits words, not layout.** Every heading, paragraph, price and list on the site is editable in the admin panel — but the page structure is fixed in code. A block-based page builder would have let the client rearrange a conversion-tested narrative into something that doesn't sell. Editable copy, locked structure.

**Prices are read server-side, never from the browser.** The checkout endpoint looks the price up in the database rather than accepting one from the client, because a price that travels with the request can be edited to `$1`. Access is granted in the Stripe webhook, not on the success page — a browser redirect can be faked by typing a URL; a signed webhook cannot.

**Content corrections are idempotent and run at startup.** Editing a source file doesn't change content already seeded into the database, and the CMS takes priority over code fallbacks — so a fix in the repo would never reach the live page. A startup pass replaces known-superseded strings only, and logs a warning if a claim we've decided not to make reappears anywhere in saved content.

---

## What it does

### Public site
17 pages across four audiences — students and graduates, employers, education partners, and the training academy. Every page follows the same narrative order: the problem, why it matters, what you get, what happens if you do nothing, proof, and how to start.

Nineteen long-form guides are published from the client's own writing, each an indexable page that answers a real search query and routes to a paid diagnostic at the end.

### Content management (Payload CMS)
Programs, prices, testimonials, FAQs, page copy, navigation, footer and site settings — all editable by the client. Field labels and help text are written for a non-technical reader ("Where this lead is up to", not "status enum"). Row labels, grouped tabs and inline descriptions throughout.

### CRM
Every enquiry lands as a record with a status pipeline, a follow-up date, a warmth rating and an automatic contact history — status changes are logged by the system rather than relying on someone remembering to type them. Marking a lead as enrolled provisions their program access automatically.

### Job-Readiness Scorecard
A free twelve-question diagnostic at `/scorecard`. It scores five areas — direction, resume, interviews, network, local experience — and returns the single weakest one with a free action to take this week.

Every question asks what the person has *done*, not how they feel, because a self-rated confidence score flatters people rather than helping them. Scoring is local and transparent: no model, no API, nothing that could produce a claim we'd have to defend later. The score is recalculated server-side from the raw answers rather than trusting the browser, since the result becomes a CRM record Mustafa acts on.

The full result is shown before any email is asked for. Gating it would capture more addresses and convince fewer people, and the site's argument is that Visgrow tells you the truth before asking you for anything.

### Customer portal
One signed-in area at `/portal` for everyone who has bought something, not just Accelerator students. It shows a single next action, their program progress, files handed back to them, and their booked sessions with prep notes and a join link.

Private files live outside `public/` and are served by a route that verifies the session and the document's owner before streaming the bytes — the collection itself is admin-only for reads, so there is no public API path to someone else's resume.

Sessions are recorded rather than self-booked. Scheduling is agreed in the sales conversation that is already happening; adding a booking engine would have added a calendar integration to solve a problem that doesn't exist.

### Learning platform
Passwordless sign-in via HMAC-signed session cookies with `timingSafeEqual` comparison. Lessons unlock one per day from the student's start date, honouring pauses. Access is re-checked against student status on every request, so revocation is immediate. Lesson documents are admin-read-only, because they hold unlisted video IDs — public API read access would give away the paid product.

### Payments
Stripe Checkout with signed webhooks, duplicate-delivery guards, automatic student provisioning, refund and dispute handling, and terms-of-service consent collected at the point of payment.

### Operations
Transactional email via Resend, a daily digest and student nudges on a cron route, rate limiting on public endpoints, database backup script, structured data, sitemap, and a robots policy that blocks indexing everywhere except an explicitly flagged production environment.

---

## Testing

74 Playwright specs covering page rendering, the enquiry flow, and security expectations — auth on protected routes, rate limiting, no hydration mismatches, correct 404 handling.

```bash
npm run test:install   # once
npm test
```

Tests run against `127.0.0.1` rather than `localhost`: on Windows, `localhost` resolves to IPv6 while the dev server binds IPv4, and every test fails with `ECONNREFUSED ::1:3000`.

---

## Running it locally

Requires Node 22+ and Docker Desktop.

```bash
cp .env.example .env.local     # fill in the values
npm install
npm run db:up                  # Postgres 16 in Docker on port 5433
npm run dev
```

Then open **http://127.0.0.1:3000** — admin panel at `/admin`.

The database seeds itself on first run and creates an admin account from `ADMIN_EMAIL` / `ADMIN_PASSWORD` if no users exist. Port 5433 avoids colliding with a local Postgres install.

A step-by-step version of this, written for a non-technical reader, is in [SETUP.md](./SETUP.md).

### Environment

| Variable | Purpose |
|---|---|
| `DATABASE_URI` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Signs sessions — long random string |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, Stripe redirects |
| `NEXT_PUBLIC_SITE_ENV` | `production` on the live site only; anything else is blocked from search engines |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | First admin account, created on first run |
| `RESEND_API_KEY` / `EMAIL_FROM` / `EMAIL_TO` | Transactional email |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Card payments — leave blank to disable |
| `CRON_SECRET` | Authorises the daily digest route |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob file storage — leave blank locally to write to disk |
| `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` | Real Google reviews — leave blank and the reviews section doesn't render |

---

## Architecture notes

**Route groups.** `(frontend)` and `(payload)` each have their own root layout, so the admin panel doesn't inherit the marketing site's fonts, header or scroll behaviour. A consequence worth knowing: a root-level `not-found.tsx` must not render its own `<html>`/`<body>`, or the 404 page hydrates twice.

**ISR.** The frontend layout sets `revalidate = 60`, so a CMS edit appears within about a minute with no rebuild or redeploy.

**Graceful degradation.** Every CMS read swallows its errors and falls back to the wording already in the code. A database outage serves a slightly stale page rather than a 500 — a stale page still sells; an error page sells nothing.

**Social proof is never fabricated.** `src/lib/google-reviews.ts` has no fallback data by design — if Google returns nothing, the section disappears. Inventing reviews breaches the Australian Consumer Law, and presenting invented text as a Google review misrepresents Google as well as the business. Pages with no genuine testimonials use the founder's verifiable credentials instead.

**Claims discipline.** No unsourced statistic appears anywhere on the site. Widely repeated figures — "80% of jobs are never advertised", "recruiters spend 6 seconds on a resume" — were removed and replaced with defensible qualitative claims, and a startup check flags any that reappear. The site never promises a job, and says so explicitly on the pages where someone is about to pay.

---

## Project structure

```
src/
├── app/
│   ├── (frontend)/     17 public pages + student program area
│   ├── (payload)/      admin panel
│   └── api/            enquiries, checkout, Stripe webhook, auth, cron
├── payload/
│   ├── collections/    programs, enquiries, students, lessons, payments…
│   ├── globals/        home page, navigation, footer, site settings
│   └── seed/           initial content + idempotent corrections
├── components/         shared UI
└── lib/                CMS reads, auth, Stripe, email, rate limiting
```

---

## Versioning and releases

`main` is what the client sees. It is always deployable.

| Branch | Vercel deploys it to | Use it for |
|---|---|---|
| `main` | the production URL | approved, released work only |
| `develop` | a stable preview URL | everything in progress |
| `feature/*` | its own preview URL | one change at a time |

Work happens on a feature branch, merges into `develop` for review on a real URL, and only reaches `main` once the client has approved it. Because `main` never receives untested work, the live site cannot break from a change nobody has looked at.

Every release on `main` is tagged — `v1.0.0`, `v1.1.0` — and recorded in [CHANGELOG.md](./CHANGELOG.md). Tags make previous versions recoverable:

```bash
git tag -a v1.1.0 -m "Add Gap Analysis pricing"
git push origin v1.1.0

git checkout v1.0.0        # inspect any earlier release exactly as it shipped
```

Vercel keeps every deployment, so rolling back is instant and doesn't require git at all: open the Deployments tab, find the last good build, and promote it. Combined with tags, that means a bad change can be undone in under a minute — from the dashboard for speed, or from git for a permanent revert.

## Deployment notes

**One-time setup against a hosted database.** Schema creation and seeding run
in `onInit`, which fires once on a long-running server but on *every cold
start* of a serverless function — far longer than a request is allowed to take,
so it made every cold start of the admin panel time out. It now skips itself on
Vercel unless `RUN_SETUP=true`. To prepare a hosted database, point
`.env.local` at it and run `npm run dev` once locally:

```bash
DATABASE_URI=<hosted connection string> npm run dev
```

Watch for `[visgrow] Setup complete.` in the output, then stop it. The hosted
app reads and writes normally from that point on.

**Schema.** `push: true` is set on the Postgres adapter. Payload only creates
tables automatically when `NODE_ENV` isn't `production`, so without it a hosted
deployment starts against an empty database — the admin panel 500s while the
public pages quietly fall back to their hard-coded copy, which makes the
failure easy to miss. Before the real launch, generate migrations and turn push
off so schema changes are reviewable.

**Neon.** The connection string is stripped of `channel_binding`, which
node-postgres rejects. TLS still applies via `sslmode=require`.

**Uploads.** A serverless filesystem is read-only and rebuilt on every deploy,
so anything uploaded through the admin panel would vanish the next time the
site shipped. Vercel Blob is wired up for both media and customer files, and
switches on only when `BLOB_READ_WRITE_TOKEN` is present — local development
keeps writing to disk with no account or setup. Create the store from the
Storage tab in Vercel and the variable is set automatically.

Locally, customer files write to `private-uploads/student-files`: gitignored,
and deliberately outside `public/`, since everything in `public/` is served
statically with no access check.

A blob URL is unguessable but publicly readable, so customer files are never
linked to directly. `/api/portal/file/[id]` re-checks the session and the
document's owner, then streams the bytes — the storage URL never reaches a
browser, a history entry, or a referrer header.

## Status

Built and functional. Deployment target is Vercel with a hosted PostgreSQL instance.

Client-side items outstanding before launch: two program prices, legal review of the terms and privacy pages, and final content sign-off.

---

Built by **Sameer Yadav** · [ysameer0303@gmail.com](mailto:ysameer0303@gmail.com)
