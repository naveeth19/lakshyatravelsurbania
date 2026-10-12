import type { Tier } from './fleet';

export interface LandingPage {
  slug: string;
  h1: string;
  sub: string;
  /** Shown as the price anchor chip on the first screen. */
  priceAnchor: string;
  /** Slug of the van the fleet selector opens on. */
  preselect: string;
  /** When set, the selector only lists vans of this tier. */
  filterTier?: Tier;
  /** When set, only these van slugs are listed. */
  filterSlugs?: string[];
  /** Which pricing tab the selector opens on. */
  defaultMode?: 'local' | 'outstation';
  title: string;
  trustChips: [string, string];
}

export const landingPages: LandingPage[] = [
  {
    slug: 'urbania-on-rent-bangalore',
    h1: 'Force Urbania on rent in Bengaluru',
    sub: 'Nine to sixteen seats, an experienced driver on every trip, and every rate published on this page.',
    priceAnchor: 'from ₹6,500 / 8 hr',
    preselect: 'force-urbania-12-seater',
    title: 'Force Urbania on Rent in Bengaluru | Call 80880 58825',
    trustChips: ['Only experienced drivers', 'Open 24/7'],
  },
  {
    slug: 'luxury-urbania-maharaja',
    h1: 'Luxury Maharaja Urbania in Bengaluru',
    sub: 'Leather recliners, ambient lighting and the most legroom in the fleet, for nine to twelve guests.',
    priceAnchor: 'from ₹8,500 / 8 hr',
    preselect: 'force-urbania-12-seater-maharaja',
    filterTier: 'Luxury Maharaja',
    title: 'Luxury Maharaja Urbania on Rent in Bengaluru | Call 80880 58825',
    trustChips: ['Leather recliners', 'Only experienced drivers'],
  },
  {
    slug: '16-seater-urbania',
    h1: '16 seater Urbania on rent in Bengaluru',
    sub: 'The biggest cabin in the fleet, with upgraded seats and room for everyone and their luggage.',
    priceAnchor: '₹8,000 / 8 hr',
    preselect: 'force-urbania-16-seater-modified',
    filterSlugs: ['force-urbania-16-seater-modified'],
    title: '16 Seater Urbania on Rent in Bengaluru from ₹8,000 | Call 80880 58825',
    trustChips: ['Seats 16 plus driver', 'Big luggage space'],
  },
  {
    slug: 'urbania-airport-transfer',
    h1: 'Urbania for Bengaluru airport pickups',
    sub: 'Kempegowda International Airport runs at any hour, with the driver tracking your flight.',
    priceAnchor: 'from ₹6,500',
    preselect: 'force-urbania-10-seater',
    title: 'Urbania for Bengaluru Airport Pickup and Drop | Call 80880 58825',
    trustChips: ['4 AM runs, no problem', 'One-way drops welcome'],
  },
  {
    slug: 'urbania-outstation',
    h1: 'Urbania for outstation trips from Bengaluru',
    sub: 'Coorg, Ooty, Tirupati, Goa. Per-km rates published for every van, driver allowance included in the quote.',
    priceAnchor: 'from ₹34/km',
    preselect: 'force-urbania-12-seater',
    defaultMode: 'outstation',
    title: 'Urbania for Outstation Trips from Bengaluru from ₹34/km | Call 80880 58825',
    trustChips: ['Most trusted for outstation', 'Drivers who know the ghats'],
  },
  {
    slug: 'urbania-for-wedding',
    h1: 'Urbania for weddings in Bengaluru',
    sub: 'Move the baraat, the guests and the family in a cabin that looks the part. Multi-van bookings welcome.',
    priceAnchor: 'from ₹8,500 / 8 hr',
    preselect: 'force-urbania-12-seater-maharaja',
    filterTier: 'Luxury Maharaja',
    title: 'Urbania on Rent for Weddings in Bengaluru | Call 80880 58825',
    trustChips: ['Wedding favourite', 'Multiple vans available'],
  },
];

export function landingPageBySlug(slug: string): LandingPage | undefined {
  return landingPages.find((lp) => lp.slug === slug);
}
