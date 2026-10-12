export interface Reason {
  tag: string;
  title: string;
  body: string;
}

export const reasons: Reason[] = [
  {
    tag: 'Only experienced drivers',
    title: 'Drivers who know the ghats',
    body: 'Every driver is verified and has years on Karnataka and South India highways. Calm, courteous and on time.',
  },
  {
    tag: 'Most trusted for outstation',
    title: 'Built for long days on the road',
    body: 'Coorg, Ooty, Tirupati, Goa. Families and teams book us for the trips where comfort really matters.',
  },
  {
    tag: 'Transparent pricing',
    title: 'The rate you see is the rate you pay',
    body: 'Per-km rates and city packages are published for every van. Tolls and permits are itemised on the bill.',
  },
  {
    tag: 'Always on',
    title: 'Open 24/7, all year',
    body: 'Midnight airport pickups and 4 AM temple departures. Message at 11 PM, the van is there by morning.',
  },
  {
    tag: 'Spotless cabins',
    title: 'Cleaned before every trip',
    body: 'Seats, floor and windows are cleaned and the AC is checked before each pickup.',
  },
  {
    tag: 'Anywhere to anywhere',
    title: 'One-way trips welcome',
    body: 'Pickup anywhere in Bengaluru and drop wherever you need. No need to pay for the empty return.',
  },
];

/** The three used on the compact landing-page layout. */
export const topReasons = [reasons[0], reasons[2], reasons[3]];
