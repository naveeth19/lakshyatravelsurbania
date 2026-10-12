# Handover

Everything the new owner needs, in the order they need it.

---

## 1. Deploy

The site is a standard Next.js app. It has one server route (`/api/enquiry`),
so it needs a Node host — Vercel is the intended target and the free tier is
enough for this traffic.

```bash
npm i -g vercel
vercel link
vercel --prod
```

Then in the Vercel dashboard:

1. **Domain** — add `forceurbaniahireinbengaluru.com` and the `www` variant,
   and point the registrar's nameservers or A/CNAME records at Vercel. SSL is
   automatic.
2. **Environment variables** — add every variable from `.env.example` under
   Production (and Preview, if you want the form working on previews).
3. Redeploy so the variables take effect.

> **One thing to fix before you hand the repo over:** the project currently
> sits inside a parent folder named after the previous operator. Nothing in the
> shipped output contains that name — it only appears in local build metadata
> as an absolute path — but move `urbania-hire-bengaluru/` somewhere neutral
> before zipping or pushing, and the name disappears entirely.

## 2. Turn on tracking

Create in Google Ads three separate conversion actions: **Call**, **WhatsApp**
and **Form**. Each gives you a conversion label — the part after the slash in
the snippet. Put the account id in `NEXT_PUBLIC_GADS_ID` and the three labels in
the matching variables.

Verify before spending money:

1. Open the site with `?gclid=test123` on the end of the URL.
2. Open GA4 → Admin → DebugView.
3. Tap Call, tap WhatsApp, submit the form.
4. You should see `click_call`, `click_whatsapp` and `generate_lead`, each
   carrying the `location` and `gclid`.

If those three do not appear, the Ads campaign is flying blind. Do not launch
until they do.

## 3. Turn on the enquiry email

1. Create a Resend account and verify the sending domain.
2. `RESEND_API_KEY` = the API key.
3. `ENQUIRY_TO_EMAIL` = where leads go. Comma-separate for more than one.
4. `ENQUIRY_FROM_EMAIL` = something like `Urbania Hire <bookings@yourdomain.com>`
   on the verified domain.
5. Submit a test enquiry and confirm the email arrives.

Until this is done, enquiries are accepted and logged but nobody is notified.

## 4. Submit to Google

1. **Google Search Console** — add the domain, verify by DNS, submit
   `https://forceurbaniahireinbengaluru.com/sitemap.xml`.
2. **Google Business Profile** — create or claim it. Use the same business
   name, phone number and address as the website, character for character.
   Link it to the site. For a local service business this profile usually
   drives more calls than the website does.
3. **Bing Webmaster Tools** — takes five minutes and imports from Search
   Console.

Expect nothing for the first few weeks. Local service pages typically start
showing movement at six to twelve weeks and compound from there.

## 5. Day-to-day editing

Everything is a typed data file. You do not need to touch a component.

| Job | File |
|---|---|
| Change a price | `data/fleet.ts` |
| Add an outstation route | `data/routes.ts` |
| Add a pickup area | `data/areas.ts` |
| Add a use-case page | `data/use-cases.ts` |
| Add an ad landing page | `data/landing-pages.ts` |
| Change the phone number | `data/site.ts` |
| Edit the FAQ | `data/faqs.ts` |
| Add real reviews | `data/reviews.ts`, then flip `showReviews` |

After any change:

```bash
npm test          # catches a broken fare
npm run build     # catches everything else
vercel --prod
```

### Changing a price safely

Prices appear on the home page, the fleet pages, the pricing page and all ten
route pages. They all read from `data/fleet.ts`, so you change the number once.

`npm test` asserts the published fares. If you deliberately change a rate, the
test will fail — update the expected value in `tests/pricing.test.ts` in the
same commit so the next person knows the change was intentional.

## 6. Where the SEO value is

> Full detail, including what the code does and what only you can do, is in
> **`SEO.md`**. Read that before buying any link-building package.


The 38 indexable pages are the asset. The highest-intent ones are the ten
outstation routes, because "bangalore to coorg tempo traveller rate" is a
query from somebody about to book.

To grow it:

- **Add routes.** Dharmasthala, Kukke Subramanya, Yercaud, Sakleshpur,
  Gokarna, Hampi variants, Shirdi. One object each.
- **Add areas.** Bannerghatta Road, Sarjapur, Rajajinagar, Banashankari,
  JP Nagar, Kengeri.
- **Get reviews.** Ask every happy customer for a Google review, then switch
  the reviews section on. This moves both the map pack and the conversion rate.
- **Add guides.** Long-form travel guides that link into the route pages are
  the natural next cluster and the one deliberately left out of this build.

## 7. Known gaps

Be straight with whoever takes this on:

1. **Cabin photographs are retouched.** Operator logos were removed from the
   headrests and cushions. They pass at display size but not under close
   inspection. Re-shoot when you can — see `ASSETS_TODO.md`.
2. **No per-van photos.** All six vans share one gallery and fall back to the
   seat map in the selector. Per-van interiors are the single biggest
   improvement available.
3. **Reviews and legal details are switched off** pending real data. See
   `PLACEHOLDERS.md`.
4. **Lighthouse mobile performance is 90–96** depending on the page, against a
   target of 95. Accessibility, best practices and SEO are 100 / 96 / 100.
   Measurements were taken locally against a dev machine; re-measure on the
   real deployment with PageSpeed Insights before treating the number as final.
5. **No guides or blog yet** — the fourth SEO cluster is not built.

## 8. Quick reference

```bash
npm run dev        # local, http://localhost:3000
npm run build      # production build, catches type errors
npm start          # serve the production build
npm test           # fare assertions
npm run typecheck  # types only
```

Phone and WhatsApp number live in `data/site.ts` and are used everywhere —
change them in that one place.
