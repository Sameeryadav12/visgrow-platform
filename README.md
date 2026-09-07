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

---

## Architecture notes

**Route groups.** `(frontend)` and `(payload)` each have their own root layout, so the admin panel doesn't inherit the marketing site's fonts, header or scroll behaviour. A consequence worth knowing: a root-level `not-found.tsx` must not render its own `<html>`/`<body>`, or the 404 page hydrates twice.

**ISR.** The frontend layout sets `revalidate = 60`, so a CMS edit appears within about a minute with no rebuild or redeploy.

**Graceful degradation.** Every CMS read swallows its errors and falls back to the wording already in the code. A database outage serves a slightly stale page rather than a 500 — a stale page still sells; an error page sells nothing.

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

## Status

Built and functional. Deployment target is Vercel with a hosted PostgreSQL instance.

Client-side items outstanding before launch: two program prices, legal review of the terms and privacy pages, and final content sign-off.

---

Built by **Sameer Yadav** · [ysameer0303@gmail.com](mailto:ysameer0303@gmail.com)
