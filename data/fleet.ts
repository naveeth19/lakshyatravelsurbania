export type Tier = 'Luxury Maharaja' | 'Premium';

export interface Van {
  slug: string;
  tier: Tier;
  seats: number;
  name: string;
  shortName: string;
  badge?: string;
  /** Back row first, e.g. '3-2-2-2' */
  seatPlan: string;
  local8h80km: number;
  local12h100km: number;
  extraKm: number;
  extraHour: number;
  outstationPerKm: number;
  description: string;
  idealFor: string[];
  images: string[];
}

export const OUTSTATION_MIN_KM_PER_DAY = 300;
export const DRIVER_ALLOWANCE_PER_DAY = 700;
export const EXTRAS_NOTE =
  'GST, tolls, parking, state permit and driver bata extra as applicable.';

/** Short label for the spec chips, where the full note is too long. */
export const TIER_SEATING: Record<Tier, string> = {
  'Luxury Maharaja': 'Leather recliners',
  Premium: 'Pushback seats',
};

export const TIER_NOTES: Record<Tier, string> = {
  'Luxury Maharaja': 'Leather recliners, ambient lighting, most legroom.',
  Premium: 'Pushback seats, strong AC, big luggage space.',
};

export const fleet: Van[] = [
  {
    slug: 'force-urbania-9-seater-maharaja',
    tier: 'Luxury Maharaja',
    seats: 9,
    name: 'Force Urbania 9 Seater Maharaja',
    shortName: '9 seater',
    badge: 'Customer favourite',
    seatPlan: '3-2-2-2',
    local8h80km: 9500,
    local12h100km: 12500,
    extraKm: 48,
    extraHour: 600,
    outstationPerKm: 48,
    description:
      'Nine leather recliners and the most room per passenger in the fleet. Made for VIP guests, executives and long highway days.',
    idealFor: ['VIP and guest pickups', 'Executive travel', 'Long highway days', 'Small families with luggage'],
    images: [],
  },
  {
    slug: 'force-urbania-10-seater-maharaja',
    tier: 'Luxury Maharaja',
    seats: 10,
    name: 'Force Urbania 10 Seater Maharaja',
    shortName: '10 seater',
    seatPlan: '2-2-2-2-2',
    local8h80km: 9000,
    local12h100km: 12000,
    extraKm: 46,
    extraHour: 550,
    outstationPerKm: 46,
    description:
      'Ten captain chairs with extra recline, for corporate teams and family trips that cover a lot of road.',
    idealFor: ['Corporate team travel', 'Family trips', 'Multi-day itineraries', 'Airport transfers for guests'],
    images: [],
  },
  {
    slug: 'force-urbania-12-seater-maharaja',
    tier: 'Luxury Maharaja',
    seats: 12,
    name: 'Force Urbania 12 Seater Maharaja',
    shortName: '12 seater',
    badge: 'Wedding favourite',
    seatPlan: '3-2-2-2-2-1',
    local8h80km: 8500,
    local12h100km: 11500,
    extraKm: 45,
    extraHour: 500,
    outstationPerKm: 45,
    description:
      'Maharaja comfort for twelve. The usual pick for wedding guests and visiting delegations.',
    idealFor: ['Wedding guest movement', 'Visiting delegations', 'Corporate offsites', 'Temple trips in comfort'],
    images: [],
  },
  {
    slug: 'force-urbania-10-seater',
    tier: 'Premium',
    seats: 10,
    name: 'Force Urbania 10 Seater',
    shortName: '10 seater',
    badge: 'Lowest fare',
    seatPlan: '4-2-2-2',
    local8h80km: 6500,
    local12h100km: 9500,
    extraKm: 34,
    extraHour: 350,
    outstationPerKm: 34,
    description:
      'Comfortable pushback seats and strong AC at the lowest fare in the fleet. Great for airport runs and family outings.',
    idealFor: ['Airport pickups and drops', 'Family outings', 'City sightseeing', 'Budget-conscious groups'],
    images: [],
  },
  {
    slug: 'force-urbania-12-seater',
    tier: 'Premium',
    seats: 12,
    name: 'Force Urbania 12 Seater',
    shortName: '12 seater',
    badge: 'Most booked',
    seatPlan: '4-3-3-2',
    local8h80km: 7000,
    local12h100km: 10000,
    extraKm: 35,
    extraHour: 400,
    outstationPerKm: 35,
    description:
      "Twelve seats with room for everyone's luggage. The sensible choice for mid-size groups, pilgrimages and weekend trips.",
    idealFor: ['Weekend getaways', 'Pilgrimage trips', 'Mid-size groups with luggage', 'Office outings'],
    images: [],
  },
  {
    slug: 'force-urbania-16-seater-modified',
    tier: 'Premium',
    seats: 16,
    name: 'Force Urbania 16 Seater Modified',
    shortName: '16 seater, modified',
    badge: 'Biggest group',
    seatPlan: '4-3-3-3-3',
    local8h80km: 8000,
    local12h100km: 11000,
    extraKm: 36,
    extraHour: 480,
    outstationPerKm: 36,
    description:
      'Upgraded seats and a refreshed cabin for big groups on long itineraries, from college trips to destination weddings.',
    idealFor: ['Large groups of 13 to 16', 'College and school trips', 'Destination weddings', 'Long multi-day tours'],
    images: [],
  },
];

export const tiers: Tier[] = ['Luxury Maharaja', 'Premium'];

export function vanBySlug(slug: string): Van | undefined {
  return fleet.find((v) => v.slug === slug);
}

export const cheapestLocalFare = Math.min(...fleet.map((v) => v.local8h80km));
export const cheapestOutstationPerKm = Math.min(...fleet.map((v) => v.outstationPerKm));
