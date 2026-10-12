# Assets: what shipped, what was held back, what is still needed

## Client-supplied assets (October 2026)

These replaced the earlier placeholders and are the basis of the current design.

| File | Source | Used on |
|---|---|---|
| `hero-desktop.webp` (1920px, 142 KB) | `Hero desktop version.png` | Hero background, ≥768px |
| `hero-desktop-sm.webp` (1280px, 87 KB) | same | Hero background, smaller desktops |
| `hero-mobile.webp` (900px, 106 KB) | `Hero Mobile version.png` | Hero background, phones |
| `hero-mobile-sm.webp` (640px, 68 KB) | same | Hero background, small phones |
| `logo.webp` / `logo-sm.webp` | `Urbania Hire Bengaluru Logo.png` | Header, every page |

The hero uses a `<picture>` element with `media` queries so **only one crop is
ever downloaded**. Two CSS-hidden `next/image` tags would both fetch, which
doubled the hero bytes on every device.

## Rule applied

No image on this site shows another operator's branding. Several of the
supplied photographs had an operator logo printed on the seat headrests and
cushions. Those logos were removed before the images were used, and the photos
that could not be cleaned were left out of the build entirely.

## Shipped

| File | Used on | Note |
|---|---|---|
| `van-sticker.webp` | hero, final CTA band | Studio render, transparent background, trimmed. 134 KB, the LCP image. |
| `van-og.png` | `opengraph-image.tsx` | PNG copy of the same render. The OG renderer cannot decode WebP. |
| `cabin-rows.webp` | gallery, fleet pages | **Retouched.** Six logos removed: four headrests, two cushions. |
| `cabin-aisle.webp` | gallery, fleet pages | **Retouched.** Six logos removed: five headrests, one cushion. |
| `cabin-recliner.webp` | gallery, fleet pages | **Retouched.** Two logos removed: one headrest, one cushion. |
| `van-front-three-quarter.webp` | gallery, fleet pages | Clean exterior. No retouching. |
| `van-side-profile.webp` | available, unused | Clean exterior. |
| `van-night.webp` | available, unused | Clean exterior, evening. |

The retouching replaces each logo with leather sampled from the surrounding
seat, softly feathered. At the size the images are displayed it reads as a
highlight on the upholstery. At full resolution the repairs are visible on
close inspection, so **these are a stopgap, not a final asset.**

## Held back, and why

| Source photo | Problem |
|---|---|
| Interior, front rows (`4.23.29 PM (1)`) | Seven operator logos, two of them cut by the frame at the image edge. Retouching left visible residue. Excluded. |
| Interior, cabin rows wide (`4.23.32 PM (1)`) | Retouched and **shipped** as `cabin-rows.webp`; six marks removed including a large cushion logo. |
| Interior, single seat (`4.23.33 PM`) | Large operator logo on the headrest and a second brand mark on the cushion, both too prominent to repair convincingly. Excluded. |
| Interior, cockpit (`4.23.32 PM`, `4.23.33 PM (1)`) | No branding, but the van is mid-fitting: seats in plastic wrap, a building site and a bystander through the windscreen. Not sellable. Excluded. |
| Exterior at a forecourt (`4.24.26 PM`) | Operator name lettered across the windscreen. Excluded. |
| Exterior with GPS stamp (`4.24.26 PM (1)`) | Burnt-in location and timestamp watermark. Excluded. |
| AI cabin renders (`9seater.png`, `12seater.png`) | Both carry a third-party "PKN" logo on every headrest. Shipping another company's mark is worse than shipping no photo. Excluded. |

## Still needed from the client

1. **Unbranded cabin photographs, highest priority.** The three retouched
   images should be replaced. Either re-shoot with the headrest covers removed,
   or supply the originals so the logos can be removed properly rather than
   blurred.
2. **Interior photos for the Premium 10, 12 and 16 seater.** All six vans
   currently share the same gallery, and the fleet selector falls back to the
   seat map for every one of them. Per-van photos are the single biggest
   improvement available to the fleet pages.
   Drop them in `public/images/` and add the paths to that van's `images`
   array in `data/fleet.ts`; the seat map steps aside automatically.
3. **A clean exterior shot with no number plate visible**, or confirmation
   that showing the registration is fine. The current exteriors show it.
4. **Photographs of the Luxury Maharaja cabin specifically.** The gallery is
   headed "Step inside the Maharaja cabin" and the current photos are the
   closest match available, not confirmed Maharaja interiors.


## Status at handover

Shipped and in use: `van-sticker.webp`, `van-og.png`, `cabin-rows.webp`,
`cabin-aisle.webp`, `cabin-recliner.webp`, `van-front-three-quarter.webp`.
Available but unused: `van-side-profile.webp` (used on `/about`),
`van-night.webp`.

The three cabin photographs are **retouched stopgaps**, not final assets. They
are good enough to launch with and should be replaced.
