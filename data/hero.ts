/** The four trust points on the strip under the hero CTAs. */
export const heroFeatures = [
  { icon: 'seats', title: '9 – 16', sub: 'Seats' },
  { icon: 'ac', title: 'AC', sub: 'Comfort' },
  { icon: 'group', title: 'Ideal for', sub: 'Group Travel' },
  { icon: 'shield', title: 'Experienced', sub: 'Drivers' },
] as const;

/** The five services on the floating card, each linking into its own page. */
export const heroServices = [
  {
    icon: 'plane',
    title: 'Airport Transfers',
    sub: 'On-time, hassle-free',
    href: '/urbania-airport-transfer-bangalore',
  },
  {
    icon: 'city',
    title: 'Bengaluru City Tours',
    sub: 'Comfortable group travel',
    href: '/urbania-for-family-trip-bangalore',
  },
  {
    icon: 'mountain',
    title: 'Outstation Trips',
    sub: 'Mysore, Coorg & more',
    href: '/outstation',
  },
  {
    icon: 'people',
    title: 'Corporate & Events',
    sub: 'Team outings, functions',
    href: '/urbania-for-corporate-travel-bangalore',
  },
  {
    icon: 'temple',
    title: 'Pilgrimage Tours',
    sub: 'Temples and spiritual trips',
    href: '/urbania-for-pilgrimage-tours-bangalore',
  },
] as const;

export type HeroIcon =
  | (typeof heroFeatures)[number]['icon']
  | (typeof heroServices)[number]['icon'];
