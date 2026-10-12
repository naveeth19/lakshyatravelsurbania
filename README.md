# Urbania Hire Bengaluru

Marketing and lead-generation site for a Force Urbania rental business in
Bengaluru. `forceurbaniahireinbengaluru.com`

It has two jobs: rank for Urbania-rental searches, and turn Google Ads clicks
into phone calls, WhatsApp messages and form enquiries. Every decision in here
serves one of those two.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm test             # pricing and fare assertions
npm run typecheck
```

Copy `.env.example` to `.env.local` and fill it in. Nothing breaks without the
values: analytics simply does not load, and the enquiry form falls back to
WhatsApp.

## The page inventory

38 indexable pages, all statically generated.

| Cluster | Count | Route |
|---|---|---|
| Home | 1 | `/` |
| Fleet detail | 6 | `/fleet/[slug]` |
| Outstation routes | 10 | `/outstation/[slug]` |
| Outstation hub | 1 | `/outstation` |
| Pickup areas | 8 | `/urbania-rental/[slug]` |
| Use cases | 6 | `/[useCase]` |
| Pricing | 1 | `/pricing` |
| About, contact | 2 | `/about`, `/contact` |
| Policies | 3 | `/privacy-policy`, `/cancellation-policy`, `/terms` |

Plus 6 Google Ads landing pages at `/lp/[slug]` which are **noindex, excluded
from the sitemap and disallowed in robots.txt** — they must never compete with
the organic pages.

## How it is put together

- **Next.js App Router, TypeScript, Tailwind v4.** Every page static; no
  database, no CMS.
- **All content lives in `/data` as typed files.** Adding a route or a pickup
  area is one object in an array — the page, the sitemap entry, the footer
  link and the internal links all follow automatically.
- **Design tokens** are CSS variables in `app/globals.css`, exposed to Tailwind
  via `@theme inline`. Tailwind v4 is configured in CSS, so there is no
  `tailwind.config.ts`.

### Five rules worth knowing before you edit

**1. Prices come from `data/fleet.ts`. Never hardcode one in a component.**
Route fares are computed by `lib/pricing.ts`. `npm test` asserts the published
trip fares; if you change a rate and a test fails, that is the test working.

**2. Call and WhatsApp links go through `<CallLink>` / `<WhatsAppLink>`.**
They fire the GA4 event and the Google Ads conversion before navigating. A raw
`<a href="tel:...">` is a conversion that never got counted.

**3. Gold is never text on a light background.** `--accent` (#F0B048, sampled
from the approved hero design) is about 2:1 on white — unreadable. Use
`--accent-deep` (#C98B22) for large display text like the word "Bengaluru" in
the hero, `--accent-ink` (#8A5E0C) for small text and icons on light surfaces,
and `--accent` only on dark backgrounds or as a fill behind ink-coloured text.

**4. Animation is CSS, never a JavaScript library.** Content is server-rendered
visible and animates from there, so nothing is invisible while JS loads and the
LCP image paints on the first frame. Scroll reveals use `animation-timeline:
view()` behind an `@supports` guard; browsers without it just show the content.
Everything respects `prefers-reduced-motion`.

**5. Never invent facts.** No review text, no rating, no "15 years of
experience", no customer counts. Sections that need data we do not have are
switched off by a flag in `data/site.ts` rather than filled with placeholders.

## Adding content

**A new outstation route** — add one object to `data/routes.ts`. You get a full
page at `/outstation/<slug>`, a fare table for all six vans, a sitemap entry, a
footer link and cross-links from every other route page.

**A new pickup area** — add one object to `data/areas.ts`. Same deal at
`/urbania-rental/<slug>`.

**A new use case** — add one object to `data/use-cases.ts`, which becomes a
top-level page. Unknown slugs 404 (`dynamicParams = false`).

**A new ad landing page** — add one object to `data/landing-pages.ts`.

## Lead capture

The enquiry form posts to `/api/enquiry`, which validates, rate-limits, checks
a honeypot and emails the lead via Resend. On success the visitor lands on
`/thank-you`, which fires the Google Ads form conversion.

If `RESEND_API_KEY` or `ENQUIRY_TO_EMAIL` is missing the submission still
succeeds and is logged server-side — a misconfigured deploy loses a
notification, never a lead. If the request fails outright the form offers
WhatsApp instead.

## Structure

```
app/
  page.tsx                      home
  fleet/[slug]/                 6 vehicle pages
  outstation/                   hub + 10 route pages
  urbania-rental/[slug]/        8 pickup-area pages
  [useCase]/                    6 use-case pages
  lp/[slug]/                    6 ad landing pages (noindex)
  pricing/ about/ contact/
  privacy-policy/ cancellation-policy/ terms/
  thank-you/                    form conversion page (noindex)
  api/enquiry/                  lead handler
  sitemap.ts robots.ts opengraph-image.tsx
components/
data/      fleet routes areas use-cases faqs reasons badges reviews site
lib/       pricing whatsapp analytics schema enquiry
tests/     fare assertions
```

## Deploying

See **`docs/DEPLOY.md`** for the full checklist — push, Vercel project,
environment variables, domain and post-launch SEO.

## Before launch

1. Fill in everything in `docs/PLACEHOLDERS.md` and flip the flags in
   `data/site.ts`.
2. Read `docs/ASSETS_TODO.md` — the cabin photos are a retouched stopgap.
3. Set the environment variables and confirm all three conversions in GA4
   DebugView.
4. See `docs/HANDOVER.md` for deployment and post-launch SEO steps.
