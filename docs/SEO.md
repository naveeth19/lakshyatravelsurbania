# SEO: what is built, and what only you can do

## What is in the code

### 188 unique FAQ questions across 35 pages

Every indexable page except the three policy pages carries an FAQ, and
**no question is repeated on any other page**. That matters: duplicated
FAQ markup across thirty pages is ignored by search engines and can look
like boilerplate.

The answers are **generated from the same data the page renders**
(`lib/page-faqs.ts`), so a rate change in `data/fleet.ts` updates every
affected answer at once and nothing can drift out of date.

| Page type | Questions | Example |
|---|---|---|
| Route (×10) | 6 each | "Do I need a state permit for an Ooty trip?" |
| Area (×8) | 5 each | "Can a 16-seater get into my street in Koramangala?" |
| Use case (×6) | 5 each | "Which Urbania is best for weddings?" |
| Fleet (×6) | 5 each | "What is the outstation rate for the 12 Seater Maharaja?" |
| Home, pricing, outstation hub, about, contact | 5–6 each | distinct sets |

Two evergreen questions are still *shown* on detail pages for readers, but
deliberately left **out of the schema**, because FAQ structured data should be
unique per URL.

### Structured data

`LocalBusiness` / `AutoRental` with geo, service radius, opening hours and
languages · `Product` + `Offer` per van · `TouristTrip` + `Offer` per route ·
`Service` per area and use case · `FAQPage` per page · `BreadcrumbList`
sitewide.

### Technical

- 38 indexable pages, **0 duplicate titles, 0 duplicate descriptions**
- Every title ≤ 62 characters, every description ≤ 165 — neither truncates
- One `<h1>` per page, canonical on every page, valid JSON-LD everywhere
- **Zero orphan pages**; every page has 37 inbound internal links
- Per-route Open Graph share images, generated at build time
- `/lp/*` and `/thank-you` noindexed, out of the sitemap, disallowed in robots

## Backlinks: the honest part

**I cannot create backlinks.** They are links from other people's websites, and
nothing in this codebase can manufacture them. Anyone who tells you otherwise
is selling link spam, which now gets sites penalised rather than ranked.

What the code does is make links *worth something* when you earn them: clean
internal linking spreads authority from any page that gets linked to the rest
of the site.

Earning them, in rough order of effort to reward:

1. **Google Business Profile.** Not a backlink, but for a local service business
   this drives more calls than the website will. Same name, phone and address as
   the site, character for character. Do this first.
2. **Local directories.** JustDial, Sulekha, IndiaMART, Yellow Pages India.
   Low-quality links individually, but they build the name-address-phone
   consistency Google uses to trust a local business.
3. **Travel and wedding vendor listings.** WedMeGood, ShaadiSaga, Tripoto,
   Thrillophilia. Your wedding and outstation pages are the natural targets.
4. **Partner pages.** The homestays, resorts and estate stays in Coorg,
   Chikmagalur and Wayanad that you already drive guests to. A "how to get here"
   page linking to your route page helps both of you, and these are the most
   relevant links you can get.
5. **Corporate clients.** Companies that run offsites sometimes list preferred
   vendors on an intranet or a supplier page. Worth asking.
6. **Local press and blogs.** A Bengaluru weekend-getaway roundup linking to
   your Coorg or Ooty page.

The route pages are the natural link magnets, because "Bengaluru to Coorg,
with distances, drive time and real fares" is a genuinely useful page someone
might cite. That is why they were built with itineraries and road notes rather
than thin copy.

## What is still missing, and worth more than any link

1. **Reviews.** The single biggest lever you are not pulling. Ask every happy
   customer for a Google review. Once real ones exist, fill `data/reviews.ts`
   and flip `showReviews` in `data/site.ts` — the section is built and waiting.
2. **`sameAs` profiles.** `data/site.ts` has an empty `sameAs` array. Add your
   Google Business Profile, Instagram, Facebook and JustDial URLs. This is how
   Google ties the website and those profiles into one business entity.
3. **A real office address.** `showLegalDetails` is off because there is no
   address. A real, consistent address is one of the strongest local ranking
   signals there is.
4. **Guides.** The one SEO cluster deliberately not built. Long-form pieces like
   "Bengaluru to Coorg road trip guide" that link into the route pages would add
   topical depth and are the most linkable thing you could publish.

## Realistic timeline

Local service pages typically show nothing for four to six weeks, start moving
at eight to twelve, and compound from there. The thing that accelerates it is
reviews and the Business Profile, not more pages.
