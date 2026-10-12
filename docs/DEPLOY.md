# Deploy checklist

Work top to bottom. Nothing here needs a code change.

---

## 1. Push the code

The repo root is this folder, `urbania-hire-bengaluru`. **Do not push the parent
folder** — it is named after a previous operator and has nothing to do with the
site.

```bash
cd urbania-hire-bengaluru
git add -A
git commit -m "Production build"
gh repo create urbania-hire-bengaluru --private --source=. --push
```

Already verified: `node_modules`, `.next` and real `.env` files are ignored.
`.env.example` **is** committed on purpose, so whoever deploys knows which
variables exist.

## 2. Create the Vercel project

```bash
npm i -g vercel
vercel link
vercel --prod
```

Framework preset, build command and output directory are all detected
automatically. Nothing to configure.

## 3. Environment variables

In the Vercel dashboard → Settings → Environment Variables, add these for
**Production** and **Preview**. Every one is optional: the site builds and runs
without them, it simply does not track or email.

| Variable | What breaks without it |
|---|---|
| `NEXT_PUBLIC_GA4_ID` | No analytics at all |
| `NEXT_PUBLIC_GADS_ID` | No Google Ads conversions |
| `NEXT_PUBLIC_GADS_CALL_LABEL` | Call conversion not counted |
| `NEXT_PUBLIC_GADS_WA_LABEL` | WhatsApp conversion not counted |
| `NEXT_PUBLIC_GADS_FORM_LABEL` | Form conversion not counted |
| `RESEND_API_KEY` | Enquiries accepted but no email sent |
| `ENQUIRY_TO_EMAIL` | Same — nobody is notified |
| `ENQUIRY_FROM_EMAIL` | Falls back to the Resend sandbox sender |

**Redeploy after adding them.** `NEXT_PUBLIC_*` variables are baked in at build
time, so they do not apply to an existing deployment.

## 4. Domain

Add `forceurbaniahireinbengaluru.com` and `www.forceurbaniahireinbengaluru.com`
in Vercel → Settings → Domains, then point the registrar at Vercel. SSL is
automatic. Set one as primary so the other redirects.

**Then change `url` in `data/site.ts`** if the live domain differs from
`https://forceurbaniahireinbengaluru.com`. That value drives every canonical
tag, the sitemap and all structured data — a wrong value there quietly breaks
SEO across all 38 pages.

## 5. Before you call it live

- [ ] Open the site and submit a test enquiry — confirm the email arrives
- [ ] Tap Call and WhatsApp on a real phone
- [ ] Check `/sitemap.xml` and `/robots.txt` load on the live domain
- [ ] Confirm `/lp/urbania-outstation` says `noindex` in its page source
- [ ] GA4 → DebugView: confirm `click_call`, `click_whatsapp`, `generate_lead`
- [ ] Run PageSpeed Insights on the live URL (local numbers are not meaningful)

## 6. After launch

1. **Google Search Console** — add the domain, verify by DNS, submit the sitemap
2. **Google Business Profile** — create or claim it, same name/phone/address as
   the site, character for character
3. Fill in what is still switched off: see `PLACEHOLDERS.md`

## Local commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, catches type errors
npm start          # serve the production build
npm test           # fare assertions
npm run lint
npm run typecheck
```
