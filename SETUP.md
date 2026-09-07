# Visgrow — running the site locally

Everything below runs from `D:\Projects\Visgrow\Visgrow_Website\visgrow-app`.

## One time only

**1. Start the database** (Docker Desktop must be running)

```bash
docker compose up -d
```

This starts Postgres on port **5433**. It keeps your data between restarts.
Check it worked:

```bash
docker ps
```

You should see `visgrow-postgres` with status `healthy`.

**2. Install the new packages**

```bash
npm install
```

This adds Payload CMS, the Postgres adapter and Resend. Takes a few minutes.

**3. Start the site**

```bash
npm run dev
```

The first start takes longer than usual — Payload creates all the database
tables automatically.

**4. Log in**

The first admin account is created automatically on first start. Open
<http://localhost:3000/admin> and sign in:

- **Email:** `ysameer0303@gmail.com`
- **Password:** `Visgrow-Admin-2026`

Change that password once you're in (click your name, top right → Account).
It's currently sitting in plain text in `.env.local`.

**Adding Mustafa later:** Admin → Users → Create new. Give him his own account
with his own password rather than sharing this one — that way you can see who
changed what, and remove access without locking yourself out.

---

## Every day after that

```bash
docker compose up -d
npm run dev
```

Site: <http://localhost:3000>
Admin: <http://localhost:3000/admin>

To stop the database: `docker compose down`

---

## Still needed from Mustafa

These are blocking, not optional:

| What | Where it goes | Why |
|---|---|---|
| Masterclass YouTube ID (upload as **Unlisted**) | Admin → Site settings → Masterclass | The masterclass page shows a placeholder until this exists |
| Registered business name + ABN | Admin → Site settings → Contact | Legal pages can't be published without them |
| Legal sign-off on Privacy Policy & Terms | — | Currently marked "draft, pending review" on the pages themselves |
| Confirmed prices for the four programs | Admin → Programs | Prices on the site are placeholders until confirmed |
| Employer & education partner testimonials | Admin → Testimonials | Those pages currently have none |

## Optional: turn on enquiry emails

Without this, enquiries still save to the database and appear in
**Admin → Enquiries**. They just don't email anyone.

1. Sign up free at <https://resend.com>
2. Create an API key at <https://resend.com/api-keys>
3. Paste it into `.env.local` as `RESEND_API_KEY=`
4. Restart `npm run dev`

Until the domain `visgrowinternships.com.au` is verified in Resend, emails send
from `onboarding@resend.dev`. That's fine for testing. Before launch, verify the
domain in Resend and change `EMAIL_FROM` to `Visgrow <hello@visgrowinternships.com.au>`.

That's it — the content loads itself.

Every time the server starts it checks whether the CMS is empty and, if so,
fills it with the site's current copy: programs, testimonials, FAQs, company
logos, page copy, footer links and contact details. It skips anything that
already has content, so it can never overwrite an edit, and you never have to
remember a seed step after resetting the database.

If you ever want to run it on demand and see exactly what happened, visit
<http://localhost:3000/api/seed> — it returns a list of what was created and
what was skipped.

---

## What's in the admin panel

**Content**

- **Home page copy** — every word on the home page, tab by tab, in the order
  the sections appear: Hero, Logo strip, 1 · Pain, 2 · Importance, 3 · Benefits,
  4 · Consequences, 5 · Results, 6 · How it works, Honesty & pricing, FAQs.
  Clear a field and it reverts to the current wording rather than going blank.
  Section order and design are fixed on purpose — the structure was signed off,
  so it can't be dragged apart by accident.
- **Page copy** — every other page, one entry each (13 of them). Same tab
  structure as the home page: Hero, 1 · Pain, 2 · Importance, 3 · Benefits,
  4 · Consequences, 5 · Results, 6 · How it works, Honesty & CTA, plus a
  Search & sharing tab for the Google title and description.
- **Programs** — the things people buy. Prices live here and update everywhere at once.
- **Testimonials** — quotes, tagged by audience.
- **FAQs** — tagged by audience, ordered.
- **Company logos** — the scrolling strip. Untick "active" to hide one.
- **Media** — all images.

**Leads**

- **Enquiries** — every form submission. For each one you can set:
  - **Where this lead is up to** — New → Contacted → Booked a call → Enrolled → Not proceeding
  - **Follow up on** — a date. The dashboard counts anyone whose date has arrived,
    so "who do I owe a call today" is one click.
  - **How warm are they?** — hot, warm or cold
  - **Program and likely value** — these add up into the "in play" figure on the dashboard
  - **Contact history** — a dated log of every call, email and meeting. Status
    changes are written into it automatically, so the history is never just
    whatever someone remembered to type.
  - **Private notes** — never shown on the website

  Search works across name, email, phone, organisation and their message.
  **Download as spreadsheet** on the dashboard exports everything to CSV for
  Excel — you are never locked in.

**14-Day Accelerator (the program area)**

- **Program days** — one entry per day. Each has a YouTube video ID, a summary,
  today's task, a checklist, downloads, and an optional personal note from
  Mustafa. Nothing is visible to students until **"Ready for students"** is
  ticked, so days can be built in advance.
- **Students** — add someone once they've paid. Set their **start date** and the
  days unlock one per day from there. No daily admin.
  - **Give them all 14 days now** — override for someone catching up
  - **Access: Active / Paused / Finished / Removed** — paused freezes their
    schedule; removed blocks sign-in immediately
  - **Last signed in** — if someone's gone quiet for a few days, that's the
    cue to check in

**Enrolling someone:** mark their enquiry as **Enrolled** and, if it was for
the Accelerator, their student record is created automatically with today's
start date. No retyping their name and email, and no typos in the address they
sign in with.

**How students get in:** they go to `/sign-in`, enter their email, and get a
one-time link. No passwords, so no reset requests. Links expire after 30
minutes and stop working once used.

**Uploading the videos:** upload to YouTube as **Unlisted** (not Private —
Unlisted means anyone with the link can watch, which is what the embed needs),
then paste just the video ID into the day.

**Settings**

- **Site settings** — phone, email, ABN, masterclass video, popup and sticky-bar text.
- **Menu (header)** and **Footer** — the navigation links.

## Automatic daily emails

One endpoint does the daily work:

```
GET /api/cron/daily?key=<CRON_SECRET>
```

It does two things, and **only sends anything when there's something to say** —
a digest that arrives every day saying "nothing today" trains you to ignore it.

**To Mustafa:** everyone whose follow-up date has arrived, everyone new who
hasn't been contacted, and any student who's gone quiet. Each name links
straight into the admin record.

**To students:** a warm check-in if they haven't signed in for 3 days.
Never more than one a week per student, and never before their program starts.
Deliberately not a guilt-trip — someone who's stalled usually feels bad about
it already, and nagging makes them avoid the program entirely.

**Test it now:**

```bash
curl "http://localhost:3000/api/cron/daily?key=3f9a1c7e5b2d48a6c0e83f17b94d2a6e"
```

Without the key it refuses to run, so nobody can trigger emails to everyone.

**Scheduling it** — pick whichever suits the host:

| Host | How |
|---|---|
| Vercel | Add a `crons` entry in `vercel.json` pointing at `/api/cron/daily` |
| Any Linux server | `0 8 * * * curl -s "https://yourdomain/api/cron/daily?key=..."` |
| Windows (local) | Task Scheduler → daily 8am → run the curl command above |
| No server yet | GitHub Actions on a schedule works fine |

---

## Automatic tests

```bash
npm install             # one time — installs the test runner itself
npm run test:install    # one time — downloads the browser it drives
npm run test
```

The tests start the dev server themselves if it isn't already running, and
reuse yours if it is.

**`'playwright' is not recognized`** — `npm install` hasn't been run since the
test runner was added.

**`ECONNREFUSED ::1:3000`** — Windows resolves `localhost` to the IPv6 address
`::1`, but the dev server listens on IPv4. The tests use `127.0.0.1` to avoid
this. If you ever hit it elsewhere (curl, a browser, another tool), swap
`localhost` for `127.0.0.1`.

Covers the things that cost money if they break: every page loads with real
content, the enquiry form accepts good submissions and rejects bad ones,
private data stays private, and the paid program can't be reached without
signing in. Run it before any deploy.

`npm run test:ui` opens an interactive runner if you want to watch it.

---

## Taking payments (Stripe)

Card payments are built but switched off until keys are added. With no keys the
site works normally — the pay buttons say "get in touch" instead.

**To switch it on:**

1. Create a Stripe account and complete business verification (Stripe needs the
   ABN, so this is blocked on the same detail as the legal pages).
2. Copy the **test** keys from <https://dashboard.stripe.com/apikeys> into
   `.env.local` — they start `sk_test_` and `pk_test_`.
3. For local testing, install the Stripe CLI and run:

   ```bash
   stripe listen --forward-to 127.0.0.1:3000/api/webhooks/stripe
   ```

   It prints a signing secret starting `whsec_` — put that in
   `STRIPE_WEBHOOK_SECRET`.
4. Test with card `4242 4242 4242 4242`, any future expiry, any CVC.
5. When live, swap to the live keys and add the webhook endpoint at
   `https://yourdomain/api/webhooks/stripe` in the Stripe dashboard.

**What happens when someone pays:**

- Stripe emails them a tax invoice automatically
- A record appears in **Admin → Payments** (read-only — it's a financial record)
- Their enquiry moves to **Enrolled** with the amount filled in
- Accelerator buyers get program access immediately, no waiting for a human

**Two deliberate decisions:**

*Only the Accelerator and Gap Analysis have pay-now buttons.* Coaching and
Internships stay enquiry-first — they're consultative sales, and taking money
before a conversation would cost more in refunds than it wins in sales.

*Access is granted by the webhook, not the thank-you page.* A browser redirect
can be faked by typing a URL; a signed webhook cannot.

---

## Backing up

```bash
npm run backup
```

Writes everything — all content, settings and every enquiry — to
`backups/visgrow-YYYY-MM-DD.json`.

Worth running before any big change, and monthly once the site is live.
**The file contains customers' personal details.** Keep it somewhere private.
It's already excluded from git.

---

## Before going live

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain — the sitemap, robots.txt
      and structured data all read from it
- [ ] Verify the domain in Resend, then change `EMAIL_FROM` to
      `Visgrow <hello@visgrowinternships.com.au>`
- [ ] Change the admin password (it's in plain text in `.env.local`)
- [ ] Generate a fresh `PAYLOAD_SECRET` for the live server
- [ ] Submit `/sitemap.xml` in Google Search Console
- [ ] Fill in the ABN and business name, and get the legal pages signed off
- [ ] Test one real enquiry end to end

---

## Troubleshooting

**"password authentication failed" or "ECONNREFUSED"**
Postgres isn't running. `docker compose up -d`, wait 10 seconds, try again.

**Port 5433 already in use**
Something else is on that port. Change both `docker-compose.yml` and
`DATABASE_URI` in `.env.local` to another port, e.g. 5434.

**The site loads forever and never responds**

Look at the terminal running `npm run dev`. When the CMS structure changes,
Payload asks permission before altering the database and **waits for you to
answer** — the server won't respond to the browser until you do.

You'll see something like `Accept warnings and push schema to database? (y/N)`.
Type `y` and press Enter.

If it's still stuck, wipe the database and start clean (only safe while there's
no real content in it):

```bash
npm run db:reset
npm run dev
```

Then visit <http://localhost:3000/api/seed> again to reload the content.

**"PayloadComponent not found in importMap"**
The admin's component map is out of date. `npm run dev` and `npm run build` both
regenerate it automatically, but you can force it:

```bash
npm run generate:importmap
```

Re-run this any time a new field type is added to the CMS.

**Admin page is blank or errors after a schema change**
Stop the dev server, run `docker compose down -v` (this **deletes all CMS data**),
then `docker compose up -d` and `npm run dev`. Only safe before real content exists.
