import type { Tier } from './fleet';

export interface UseCase {
  /** Top-level slug, e.g. /urbania-for-wedding-bangalore */
  slug: string;
  name: string;
  footerLabel: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  /** Three reasons this use case suits an Urbania. */
  points: { title: string; body: string }[];
  /** What the operator should tell us when booking. */
  checklist: string[];
  /** Vans we usually put on this job. */
  recommendSlugs: string[];
  preferTier?: Tier;
  /** Prefilled WhatsApp intent. */
  waIntent: string;
}

export const useCases: UseCase[] = [
  {
    slug: 'urbania-for-wedding-bangalore',
    name: 'Weddings',
    footerLabel: 'Urbania for weddings',
    h1: 'Force Urbania on rent for weddings in Bengaluru',
    title: 'Urbania on Rent for Weddings in Bengaluru',
    description:
      'Force Urbania hire for wedding guest transport in Bengaluru. Luxury Maharaja cabins, multiple vans, published rates. Call 80880 58825.',
    intro:
      'Wedding transport fails in the gaps: the guests who land at midnight, the baraat that leaves forty minutes late, the elderly relatives who cannot manage a step up. A Maharaja Urbania handles all three, and booking several of them means the whole party moves together instead of trickling in.',
    points: [
      {
        title: 'Guests arrive together',
        body: 'One van carries nine to sixteen people with luggage. Three cars carrying the same group arrive at three different times, and someone is always lost.',
      },
      {
        title: 'The cabin looks the part',
        body: 'Leather recliners and ambient lighting in the Maharaja cabins. It photographs well and it is comfortable for relatives who are dressed up and travelling in heat.',
      },
      {
        title: 'Multi-day and multi-van',
        body: 'Mehendi, sangeet, muhurtham and reception are usually different venues on different days. We hold the same vans and the same drivers across all of them.',
      },
    ],
    checklist: [
      'Dates and the venue for each function',
      'How many guests move, and from where',
      'Whether any van is needed overnight at a hotel',
      'Airport or railway pickups, with flight or train numbers',
      'Whether you want the vehicles decorated — we can allow it, within reason',
    ],
    recommendSlugs: [
      'force-urbania-12-seater-maharaja',
      'force-urbania-9-seater-maharaja',
      'force-urbania-16-seater-modified',
    ],
    preferTier: 'Luxury Maharaja',
    waIntent: 'Hi, I need Urbanias for a wedding in Bengaluru.',
  },
  {
    slug: 'urbania-for-corporate-travel-bangalore',
    name: 'Corporate',
    footerLabel: 'Corporate and offsites',
    h1: 'Force Urbania on rent for corporate travel in Bengaluru',
    title: 'Urbania for Corporate Travel in Bengaluru',
    description:
      'Force Urbania hire for corporate offsites and team travel in Bengaluru. 9 to 16 seats, GST invoice, published rates. Call 80880 58825.',
    intro:
      'Offsites, client visits and team movement between campuses all have the same problem: a group of ten to sixteen people who need to arrive at the same time, in one piece, with laptops and bags. That is precisely what this vehicle is for.',
    points: [
      {
        title: 'The whole team in one vehicle',
        body: 'Nobody gets separated, nobody expenses six different cab receipts, and the conversation continues on the road.',
      },
      {
        title: 'Built for the long offsite drive',
        body: 'Coorg, Chikmagalur and Wayanad are four to seven hours each way. Pushback or recliner seats and strong air conditioning make that a different experience from a cramped cab.',
      },
      {
        title: 'Clean paperwork',
        body: 'Rates are published, the invoice carries GST, and tolls and permits are itemised rather than bundled into a vague total.',
      },
    ],
    checklist: [
      'Dates, pickup points and the destination',
      'Headcount, and whether luggage is involved',
      'Whether the van stays with the group through the offsite',
      'Billing name and GST details for the invoice',
      'Any fixed arrival time, such as a session start or a flight',
    ],
    recommendSlugs: [
      'force-urbania-12-seater',
      'force-urbania-10-seater-maharaja',
      'force-urbania-16-seater-modified',
    ],
    waIntent: 'Hi, I need an Urbania for corporate travel in Bengaluru.',
  },
  {
    slug: 'urbania-airport-transfer-bangalore',
    name: 'Airport transfers',
    footerLabel: 'Airport transfers',
    h1: 'Force Urbania for Bengaluru airport pickup and drop',
    title: 'Urbania for Bengaluru Airport Pickup and Drop',
    description:
      'Force Urbania transfers to Kempegowda International Airport, Bengaluru. Group travel with luggage, any hour, published rates. Call 80880 58825.',
    intro:
      'Kempegowda International Airport is a long way from most of Bengaluru — an hour from Indiranagar, closer to two from Electronic City. For a group of ten with checked bags, one Urbania is cheaper, calmer and far more predictable than three cabs booked separately.',
    points: [
      {
        title: 'Luggage actually fits',
        body: 'Sixteen people with sixteen suitcases is a real booking we take. The cabin has dedicated luggage space rather than bags stacked on laps.',
      },
      {
        title: 'Any hour, including 4 AM',
        body: 'Most international departures leave in the small hours and most arrivals land at night. We run around the clock, which is the entire point of this service.',
      },
      {
        title: 'One-way is fine',
        body: 'You are not paying for the empty return leg. Drop at the terminal and we are done.',
      },
    ],
    checklist: [
      'Flight number and scheduled time',
      'Terminal 1 or Terminal 2',
      'Pickup address and the number of passengers',
      'Rough luggage count, so we send the right size',
      'A contact number reachable on landing',
    ],
    recommendSlugs: [
      'force-urbania-10-seater',
      'force-urbania-12-seater',
      'force-urbania-16-seater-modified',
    ],
    waIntent: 'Hi, I need an Urbania for a Bengaluru airport transfer.',
  },
  {
    slug: 'urbania-for-pilgrimage-tours-bangalore',
    name: 'Pilgrimage',
    footerLabel: 'Temple and pilgrimage trips',
    h1: 'Force Urbania on rent for pilgrimage trips from Bengaluru',
    title: 'Urbania for Pilgrimage Trips from Bengaluru',
    description:
      'Force Urbania hire for Tirupati, Dharmasthala and Kukke Subramanya trips from Bengaluru. Overnight departures, published rates.',
    intro:
      'Pilgrimage trips run on their own clock. Departures are often at midnight or two in the morning so the group reaches the temple for an early darshan, and the passengers are frequently a wide spread of ages. Both of those things argue for a comfortable van and a driver who has done the route before.',
    points: [
      {
        title: 'Overnight departures are routine',
        body: 'A one or two in the morning start is normal for Tirupati. Passengers sleep on the way up and on the way back.',
      },
      {
        title: 'Comfortable for older travellers',
        body: 'Reclining seats and a manageable step height matter a great deal when the group includes grandparents.',
      },
      {
        title: 'Drivers who know the ghat roads',
        body: 'Kukke Subramanya, Dharmasthala and the Tirumala ghat are all routes our drivers run regularly.',
      },
    ],
    checklist: [
      'Temples in the order you want to visit them',
      'Departure date and time',
      'Number of passengers and their rough age mix',
      'Whether the van waits during darshan or returns later',
      'Any overnight halt, so the driver can plan rest',
    ],
    recommendSlugs: [
      'force-urbania-12-seater',
      'force-urbania-9-seater-maharaja',
      'force-urbania-16-seater-modified',
    ],
    waIntent: 'Hi, I need an Urbania for a pilgrimage trip from Bengaluru.',
  },
  {
    slug: 'urbania-for-college-trip-bangalore',
    name: 'School and college',
    footerLabel: 'School and college trips',
    h1: 'Force Urbania on rent for school and college trips in Bengaluru',
    title: 'Urbania for School and College Trips, Bengaluru',
    description:
      'Force Urbania hire for college tours and school excursions from Bengaluru. 16 seater available, verified drivers, published rates.',
    intro:
      'Student groups are the most price-sensitive bookings we take and the most straightforward to run well. A 16-seater splits sixteen ways comes to very little per head, and one vehicle means one headcount instead of chasing a convoy.',
    points: [
      {
        title: 'Lowest cost per head',
        body: 'The 16 seater carries the largest group for the lowest per-person fare in the fleet. Split sixteen ways, a Coorg weekend is genuinely affordable.',
      },
      {
        title: 'One vehicle, one headcount',
        body: 'Whoever is responsible for the group counts heads once. Nobody is in a different car on a different road.',
      },
      {
        title: 'Verified drivers',
        body: 'Every driver is verified and experienced on highways. For a group of students travelling without many adults, that matters.',
      },
    ],
    checklist: [
      'Institution name and the staff member in charge',
      'Dates and the full itinerary',
      'Number of students and accompanying staff',
      'Whether an overnight halt is involved',
      'Any permission letter the institution needs from us',
    ],
    recommendSlugs: [
      'force-urbania-16-seater-modified',
      'force-urbania-12-seater',
      'force-urbania-10-seater',
    ],
    waIntent: 'Hi, I need an Urbania for a college or school trip from Bengaluru.',
  },
  {
    slug: 'urbania-for-family-trip-bangalore',
    name: 'Family trips',
    footerLabel: 'Family outings',
    h1: 'Force Urbania on rent for family trips from Bengaluru',
    title: 'Urbania on Rent for Family Trips from Bengaluru',
    description:
      'Force Urbania hire for family holidays and day outings from Bengaluru. 9 to 16 seats, comfortable for all ages. Call 80880 58825.',
    intro:
      'Extended family travel is where this vehicle quietly does its best work. Grandparents, parents and children all travel together, the luggage goes in the back rather than on somebody’s lap, and nobody in the family has to spend six hours driving.',
    points: [
      {
        title: 'Everyone travels together',
        body: 'Three generations in one cabin instead of split across cars by who fits where.',
      },
      {
        title: 'Nobody in the family has to drive',
        body: 'The person who would otherwise have driven the ghat road to Coorg gets to look out of the window instead.',
      },
      {
        title: 'Room for the luggage',
        body: 'Family trips travel heavy. There is dedicated space for it, which a seven-seater car does not have once all seven seats are used.',
      },
    ],
    checklist: [
      'Destination and travel dates',
      'Total number of travellers, including children',
      'Whether anyone needs help with the step up',
      'Pickup address, and any second pickup on the way',
      'Return date, or whether it is a one-way drop',
    ],
    recommendSlugs: [
      'force-urbania-12-seater',
      'force-urbania-9-seater-maharaja',
      'force-urbania-10-seater',
    ],
    waIntent: 'Hi, I need an Urbania for a family trip from Bengaluru.',
  },
];

export function findUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}
