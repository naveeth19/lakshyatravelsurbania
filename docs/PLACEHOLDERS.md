# Placeholders

Nothing bracketed renders on the site any more. Sections that need data we do
not have are **switched off** by a flag rather than shown with `[brackets]`, so
the site is launchable as it stands and gets better as each item below lands.

## Switched off until you have the data

### 1. Reviews and rating — `site.showReviews`
- **Flag:** `data/site.ts` → `showReviews: false`
- **Data:** `data/reviews.ts` → three real Google reviews (text, name, trip
  type), plus `ratingPlaceholder` and `reviewCountPlaceholder`
- **Currently:** the whole Reviews section does not render on any page
- **To enable:** paste three genuine reviews verbatim, set the real rating and
  count, then set `showReviews: true`

> Do not write these. Invented testimonials are a legal problem as well as a
> trust problem, and Google treats fake review markup as a manual-action risk.

### 2. Legal details — `site.showLegalDetails`
- **Flag:** `data/site.ts` → `showLegalDetails: false`
- **Data:** `legalName`, `gstin`, `address` in the same file
- **Currently:** the footer, contact page, policy pages and the
  `LocalBusiness` structured data all omit these lines
- **To enable:** fill the three values and set `showLegalDetails: true`

The office address matters more than the other two: a real, consistent address
is one of the strongest local-SEO signals, and it should match your Google
Business Profile exactly.

## Needs your input, but not blocking

### 3. Policy dates
`PolicyLayout` takes an optional `updated` prop. Pass a real date to the three
policy pages once a solicitor or the owner has signed them off. Until then the
"Last updated" line is simply omitted.

### 4. Cancellation and refund specifics
`/cancellation-policy` currently describes the approach honestly without
committing to notice windows or percentages. Replace it with the real terms
when they are decided.

### 5. Per-van interior photos
`data/fleet.ts` → each van's `images` array is empty, so the fleet selector
falls back to the animated seat map. Add a photo path to a van and the photo
replaces the seat map automatically. See `ASSETS_TODO.md`.

## Environment variables

None of these are in the repo. See `.env.example`.

| Variable | Needed for |
|---|---|
| `NEXT_PUBLIC_GA4_ID` | GA4 analytics |
| `NEXT_PUBLIC_GADS_ID` | Google Ads conversion tracking |
| `NEXT_PUBLIC_GADS_CALL_LABEL` | call conversion |
| `NEXT_PUBLIC_GADS_WA_LABEL` | WhatsApp conversion |
| `NEXT_PUBLIC_GADS_FORM_LABEL` | form conversion, fires on `/thank-you` |
| `RESEND_API_KEY` | emailing enquiries |
| `ENQUIRY_TO_EMAIL` | where enquiries go (comma-separate for several) |
| `ENQUIRY_FROM_EMAIL` | sender; must be a domain verified in Resend |

Until the analytics variables are set, no tracking script loads at all. Calls
and WhatsApp messages still work, they are simply not counted.
