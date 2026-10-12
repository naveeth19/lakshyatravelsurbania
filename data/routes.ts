import { vanBySlug } from './fleet';
import { tripFare } from '@/lib/pricing';

export interface RouteDay {
  title: string;
  body: string;
}

export interface Route {
  slug: string;
  /** Destination name as a rider would say it. */
  name: string;
  /** Full destination name for titles where it helps. */
  longName: string;
  /** Approximate one-way road distance from Bengaluru, in km. */
  distanceKm: number;
  /** Approximate one-way driving time. */
  duration: string;
  /** Typical trip length we quote for. */
  days: number;
  /** Approximate round-trip distance including local running. */
  approxRoundKm: number;
  /** Distance actually billed, after the 300 km per day minimum. */
  billableKm: number;
  /** One-line summary used on cards. */
  blurb: string;
  /** Opening paragraph on the route page. */
  intro: string;
  /** Places the trip usually covers. */
  highlights: { name: string; note: string }[];
  /** Day-by-day outline. */
  itinerary: RouteDay[];
  bestTime: string;
  /** Honest notes about the drive itself. */
  roadNotes: string;
  /** Towns the route passes through, for the map strip. */
  via: string[];
  /** Does the trip leave Karnataka and need an interstate permit? */
  needsPermit: boolean;
  /** States entered beyond Karnataka, for the permit answer. */
  permitStates: string[];
  /** Shown on the home page trip grid. */
  featured?: boolean;
}

export const routes: Route[] = [
  {
    slug: 'mysore',
    name: 'Mysore',
    longName: 'Mysuru',
    distanceKm: 150,
    duration: '3 to 3.5 hours',
    days: 1,
    approxRoundKm: 300,
    billableKm: 300,
    blurb: 'Palace, zoo and back the same evening.',
    intro:
      'Mysore is the easiest full day out of Bengaluru. The expressway has cut the drive to roughly three hours each way, which leaves a comfortable six or seven hours in the city itself. Most groups leave around six in the morning, see the palace and the zoo, eat well, and are home before midnight.',
    highlights: [
      { name: 'Mysore Palace', note: 'Closed to photography inside. Lit up on Sunday evenings.' },
      { name: 'Chamundi Hill', note: 'Temple and a view over the city. The van can go all the way up.' },
      { name: 'Mysore Zoo', note: 'One of the oldest in the country, and genuinely good.' },
      { name: 'Brindavan Gardens', note: 'About 20 km further out. Worth it for the evening fountain.' },
      { name: 'Srirangapatna', note: 'On the way back. Fort, temple and Tipu Sultan sites.' },
    ],
    itinerary: [
      {
        title: 'Early start from Bengaluru',
        body: 'Pickup anywhere in the city from 5 AM. Breakfast stop on the expressway near Maddur or Mandya.',
      },
      {
        title: 'Mysore city',
        body: 'Palace, zoo and lunch. Chamundi Hill in the afternoon if the group still has energy.',
      },
      {
        title: 'Return via Srirangapatna',
        body: 'A short stop on the way back, then home. Most groups are back between 10 PM and midnight.',
      },
    ],
    bestTime:
      'Any time of year. October to February is most comfortable. Dasara in September or October is spectacular but the city is extremely crowded and traffic doubles the drive.',
    roadNotes:
      'Almost the entire route is on the Bengaluru–Mysuru expressway, which is in good condition. There are no ghats and no permit issues since you stay inside Karnataka.',
    via: ['Ramanagara', 'Channapatna', 'Maddur', 'Mandya'],
    needsPermit: false,
    permitStates: [],
    featured: true,
  },
  {
    slug: 'coorg',
    name: 'Coorg',
    longName: 'Coorg (Kodagu)',
    distanceKm: 265,
    duration: '5.5 to 6.5 hours',
    days: 2,
    approxRoundKm: 540,
    billableKm: 600,
    blurb: 'Coffee estates and the Madikeri hills.',
    intro:
      'Coorg is the weekend the Urbania was made for. The last sixty kilometres climb through coffee country on roads that are narrow and winding, which is exactly where a big vehicle with an experienced driver beats three separate cars. Two days is the honest minimum; three is better.',
    highlights: [
      { name: 'Abbey Falls', note: 'Short walk from the road. Fullest just after the monsoon.' },
      { name: 'Raja’s Seat', note: 'Sunset point in Madikeri. Gets busy by 5 PM.' },
      { name: 'Dubare Elephant Camp', note: 'Morning visit. Involves a short boat crossing.' },
      { name: 'Talakaveri', note: 'Source of the Kaveri, about 45 km from Madikeri up a steep road.' },
      { name: 'Coffee estate stay', note: 'Most groups book an estate homestay rather than a town hotel.' },
    ],
    itinerary: [
      {
        title: 'Day 1 — Bengaluru to Madikeri',
        body: 'Leave by 6 AM, breakfast near Channarayapatna, reach Madikeri by early afternoon. Raja’s Seat for sunset.',
      },
      {
        title: 'Day 2 — Estates and falls',
        body: 'Dubare in the morning, Abbey Falls and the local market after lunch, then the drive home.',
      },
    ],
    bestTime:
      'October to March. The monsoon from June to September is beautiful but landslides occasionally close hill roads, and the estate tracks turn to slush.',
    roadNotes:
      'Good highway as far as Kushalnagar, then a steady climb with tight hairpins into Madikeri. Estate approach roads are often single track and unpaved. Tell us the exact homestay when you book so the driver knows what he is taking the van into.',
    via: ['Nelamangala', 'Hassan', 'Kushalnagar'],
    needsPermit: false,
    permitStates: [],
    featured: true,
  },
  {
    slug: 'ooty',
    name: 'Ooty',
    longName: 'Ooty (Udhagamandalam)',
    distanceKm: 270,
    duration: '6.5 to 7.5 hours',
    days: 3,
    approxRoundKm: 560,
    billableKm: 900,
    blurb: 'The Nilgiris at an unhurried pace.',
    intro:
      'Ooty sits at around 2,200 metres, and the road up is thirty-six hairpin bends through the Nilgiris. It is a long day in the van and worth doing over three days rather than two. The route crosses into Tamil Nadu, so a state permit applies and is billed on top of the fare.',
    highlights: [
      { name: 'Botanical Gardens', note: 'Central, easy, and good for a mixed-age group.' },
      { name: 'Doddabetta Peak', note: 'Highest point in the Nilgiris. Clear mornings only.' },
      { name: 'Nilgiri Mountain Railway', note: 'The toy train to Coonoor. Book ahead, it sells out.' },
      { name: 'Tea estates near Coonoor', note: 'Quieter than Ooty town and often the better half day.' },
      { name: 'Pykara Lake and Falls', note: 'About 20 km out, on the Mysore side.' },
    ],
    itinerary: [
      {
        title: 'Day 1 — Bengaluru to Ooty',
        body: 'Long driving day through Mysore and Bandipur. Arrive late afternoon and settle in.',
      },
      {
        title: 'Day 2 — Ooty and Coonoor',
        body: 'Gardens and Doddabetta in the morning, Coonoor tea estates after lunch.',
      },
      {
        title: 'Day 3 — Return',
        body: 'Pykara on the way out, then the drive back to Bengaluru.',
      },
    ],
    bestTime:
      'March to June for the classic hill-station season, and September to November after the rains. It can drop below 10°C at night in December and January.',
    roadNotes:
      'The route passes through Bandipur and Mudumalai tiger reserves, where night traffic is banned between 9 PM and 6 AM. That is a hard closure, so departure times matter. Tamil Nadu state permit and forest entry charges are extra.',
    via: ['Mysore', 'Gundlupet', 'Bandipur', 'Gudalur'],
    needsPermit: true,
    permitStates: ['Tamil Nadu'],
    featured: true,
  },
  {
    slug: 'tirupati',
    name: 'Tirupati',
    longName: 'Tirupati and Tirumala',
    distanceKm: 250,
    duration: '4.5 to 5.5 hours',
    days: 1,
    approxRoundKm: 520,
    billableKm: 520,
    blurb: 'Early start, darshan and home by night.',
    intro:
      'Tirupati is the most common single-day outstation run we do, and almost always starts between midnight and 2 AM so the group reaches Tirumala for an early darshan. The Urbania earns its keep here: people sleep on the way up and on the way back.',
    highlights: [
      { name: 'Sri Venkateswara Temple', note: 'Darshan timing depends entirely on the ticket you hold.' },
      { name: 'Tirumala ghat road', note: 'Separate up and down roads, both well maintained.' },
      { name: 'Sri Padmavathi Temple', note: 'At Tiruchanur, usually visited on the way back down.' },
      { name: 'ISKCON Tirupati', note: 'Easy stop if darshan finishes early.' },
    ],
    itinerary: [
      {
        title: 'Overnight departure',
        body: 'Pickup between midnight and 2 AM so you reach the hill before dawn.',
      },
      {
        title: 'Darshan',
        body: 'The van waits at the designated parking. Timing depends on your darshan ticket.',
      },
      {
        title: 'Return the same evening',
        body: 'Lunch on the way down, back in Bengaluru by late evening.',
      },
    ],
    bestTime:
      'Year round. Weekdays are considerably calmer than weekends, and festival periods can mean very long darshan queues.',
    roadNotes:
      'The route crosses into Andhra Pradesh, so a state permit applies. Book darshan tickets yourself in advance through the official TTD channels — we move you there and back, we do not arrange tickets.',
    via: ['Hoskote', 'Chintamani', 'Palamaner', 'Chittoor'],
    needsPermit: true,
    permitStates: ['Andhra Pradesh'],
    featured: true,
  },
  {
    slug: 'chikmagalur',
    name: 'Chikmagalur',
    longName: 'Chikmagalur (Chikkamagaluru)',
    distanceKm: 245,
    duration: '5 to 6 hours',
    days: 2,
    approxRoundKm: 500,
    billableKm: 600,
    blurb: 'Mullayanagiri, waterfalls and plantations.',
    intro:
      'Chikmagalur is Coorg without quite as many people. It is coffee country too, with the highest peak in Karnataka a short drive from town. A good two-day trip, and a very good three-day one if you want to add Kemmanagundi.',
    highlights: [
      { name: 'Mullayanagiri', note: 'Highest peak in Karnataka. The final stretch is steep and narrow.' },
      { name: 'Baba Budangiri', note: 'Ridge drive with wide views, often misty.' },
      { name: 'Hebbe Falls', note: 'Needs a jeep for the last few kilometres; the van waits at the base.' },
      { name: 'Coffee plantations', note: 'Several estates run short guided walks.' },
      { name: 'Hirekolale Lake', note: 'Quiet sunset spot close to town.' },
    ],
    itinerary: [
      {
        title: 'Day 1 — Bengaluru to Chikmagalur',
        body: 'Leave early, reach by afternoon, evening at Hirekolale Lake or the town.',
      },
      {
        title: 'Day 2 — Peaks and estates',
        body: 'Mullayanagiri and Baba Budangiri in the morning, a plantation visit after lunch, then home.',
      },
    ],
    bestTime:
      'September to February. The hills are greenest right after the monsoon, in September and October.',
    roadNotes:
      'Highway as far as Kadur, then hill roads. The last climb to Mullayanagiri is narrow with blind corners — our drivers know it, but it is not a road to rush. Entirely within Karnataka, so no state permit.',
    via: ['Nelamangala', 'Tiptur', 'Kadur'],
    needsPermit: false,
    permitStates: [],
    featured: true,
  },
  {
    slug: 'wayanad',
    name: 'Wayanad',
    longName: 'Wayanad, Kerala',
    distanceKm: 280,
    duration: '6 to 7 hours',
    days: 2,
    approxRoundKm: 570,
    billableKm: 600,
    blurb: 'Kerala green, caves and spice country.',
    intro:
      'Wayanad is the gentlest introduction to Kerala from Bengaluru — thick forest, spice plantations and a climb through Muthanga. It is a two-day trip at a push and a far better three-day one.',
    highlights: [
      { name: 'Edakkal Caves', note: 'Prehistoric carvings. A steep 1 km climb on foot from the parking.' },
      { name: 'Banasura Sagar Dam', note: 'Largest earthen dam in India, with boating.' },
      { name: 'Soochipara Falls', note: 'Three-tier waterfall, short trek in.' },
      { name: 'Pookode Lake', note: 'Easy, flat and good for older travellers.' },
      { name: 'Spice plantations', note: 'Cardamom, pepper and coffee, usually with a guided walk.' },
    ],
    itinerary: [
      {
        title: 'Day 1 — Bengaluru to Wayanad',
        body: 'Through Mysore and the Muthanga forest checkpost. Afternoon at Pookode Lake or the dam.',
      },
      {
        title: 'Day 2 — Caves and falls',
        body: 'Edakkal in the morning before it gets hot, Soochipara after lunch, then the drive back.',
      },
    ],
    bestTime:
      'October to May. The monsoon is intense here and forest roads can be slippery, though the waterfalls are at their best in September.',
    roadNotes:
      'Crosses into Kerala at Muthanga, so a Kerala state permit applies. The forest stretch has a night traffic ban, and speed limits inside the reserve are strictly enforced.',
    via: ['Mysore', 'Gundlupet', 'Muthanga'],
    needsPermit: true,
    permitStates: ['Kerala'],
  },
  {
    slug: 'pondicherry',
    name: 'Pondicherry',
    longName: 'Puducherry',
    distanceKm: 310,
    duration: '6 to 7 hours',
    days: 2,
    approxRoundKm: 630,
    billableKm: 630,
    blurb: 'French quarter, beaches and Auroville.',
    intro:
      'Pondicherry is a flat, easy drive with no ghats at all, which makes it one of the more comfortable long runs in the van. The French quarter is small enough to walk, so the Urbania mostly does the long legs and the Auroville trip.',
    highlights: [
      { name: 'French Quarter', note: 'White Town. Best walked early morning or after sunset.' },
      { name: 'Auroville', note: 'Matrimandir viewing needs a pass booked in advance.' },
      { name: 'Promenade Beach', note: 'Closed to vehicles in the evening, which is when to go.' },
      { name: 'Paradise Beach', note: 'Reached by a short boat ride from Chunnambar.' },
      { name: 'Sri Aurobindo Ashram', note: 'Quiet, and strict about timing and dress.' },
    ],
    itinerary: [
      {
        title: 'Day 1 — Bengaluru to Pondicherry',
        body: 'Via Krishnagiri and Tindivanam. Arrive mid-afternoon, evening on the promenade.',
      },
      {
        title: 'Day 2 — Auroville and back',
        body: 'Auroville and a beach in the morning, lunch in White Town, then the drive home.',
      },
    ],
    bestTime:
      'November to March. April and May are very humid on the coast.',
    roadNotes:
      'Tamil Nadu and Puducherry permits apply. The route is almost entirely four-lane highway and is one of the easier long drives from Bengaluru.',
    via: ['Hosur', 'Krishnagiri', 'Tiruvannamalai', 'Tindivanam'],
    needsPermit: true,
    permitStates: ['Tamil Nadu', 'Puducherry'],
    featured: true,
  },
  {
    slug: 'goa',
    name: 'Goa',
    longName: 'Goa',
    distanceKm: 560,
    duration: '10 to 11 hours',
    days: 3,
    approxRoundKm: 1120,
    billableKm: 1120,
    blurb: 'The long haul, done in one comfortable run.',
    intro:
      'Goa is a genuinely long drive and the trip where a 12 or 16 seater pays for itself. Groups that would otherwise take two or three cars travel together, sleep on the way, and arrive without anyone having driven for eleven hours.',
    highlights: [
      { name: 'North Goa beaches', note: 'Baga, Calangute, Anjuna. Busy, and close together.' },
      { name: 'South Goa beaches', note: 'Palolem and Agonda. Quieter, about 60 km further.' },
      { name: 'Old Goa churches', note: 'Basilica of Bom Jesus and Se Cathedral.' },
      { name: 'Dudhsagar Falls', note: 'Requires an official jeep from Mollem; private vehicles cannot enter.' },
      { name: 'Fort Aguada', note: 'Sunset over the Mandovi.' },
    ],
    itinerary: [
      {
        title: 'Day 1 — Bengaluru to Goa',
        body: 'A full driving day via Hubballi. Most groups leave before dawn and arrive by evening.',
      },
      {
        title: 'Day 2 — Beaches and forts',
        body: 'North or south depending on where you stay. The van stays with you all day.',
      },
      {
        title: 'Day 3 — Return',
        body: 'Early start for the drive back, with a long lunch stop on the way.',
      },
    ],
    bestTime:
      'November to February. The monsoon from June to September closes most water activity, and May is uncomfortably hot.',
    roadNotes:
      'Goa state permit applies. The route is mostly good four-lane highway, with a slower stretch through the Western Ghats. Three days is the practical minimum and four is much more relaxed.',
    via: ['Tumakuru', 'Davanagere', 'Hubballi', 'Belagavi'],
    needsPermit: true,
    permitStates: ['Goa'],
  },
  {
    slug: 'hampi',
    name: 'Hampi',
    longName: 'Hampi',
    distanceKm: 340,
    duration: '6.5 to 7.5 hours',
    days: 2,
    approxRoundKm: 690,
    billableKm: 690,
    blurb: 'Boulders, ruins and the Vijayanagara capital.',
    intro:
      'Hampi is a UNESCO World Heritage site spread over a very large area, which is the thing most first-time visitors underestimate. Having your own vehicle for the full two days is the difference between seeing four monuments and seeing fifteen.',
    highlights: [
      { name: 'Virupaksha Temple', note: 'Still an active temple, at the centre of Hampi Bazaar.' },
      { name: 'Vittala Temple', note: 'The stone chariot and musical pillars. Electric buggy for the last stretch.' },
      { name: 'Matanga Hill', note: 'Sunrise climb, roughly 30 minutes up.' },
      { name: 'Lotus Mahal and Elephant Stables', note: 'Inside the royal enclosure.' },
      { name: 'Tungabhadra Dam', note: 'Near Hosapete, where most groups stay.' },
    ],
    itinerary: [
      {
        title: 'Day 1 — Bengaluru to Hospete',
        body: 'Long highway drive. Afternoon at the royal enclosure and sunset from Hemakuta Hill.',
      },
      {
        title: 'Day 2 — Hampi and return',
        body: 'Early start for Vittala Temple and the bazaar, then the drive home after lunch.',
      },
    ],
    bestTime:
      'October to February. It is genuinely harsh from March to May, with daytime temperatures that make walking the ruins unpleasant.',
    roadNotes:
      'All within Karnataka, so no state permit. Good highway as far as Hosapete, then narrower local roads. There is a lot of walking at the site itself, so plan where the van drops and collects you.',
    via: ['Tumakuru', 'Chitradurga', 'Hosapete'],
    needsPermit: false,
    permitStates: [],
  },
  {
    slug: 'munnar',
    name: 'Munnar',
    longName: 'Munnar, Kerala',
    distanceKm: 470,
    duration: '9 to 10 hours',
    days: 3,
    approxRoundKm: 950,
    billableKm: 950,
    blurb: 'Tea country, high and cool.',
    intro:
      'Munnar is tea estates stacked up a hillside at around 1,600 metres, and the drive is the longest ghat section of any route we run regularly. Three days minimum, and worth taking four if the group includes children or older travellers.',
    highlights: [
      { name: 'Tea estates and museum', note: 'The Kannan Devan museum explains the whole process well.' },
      { name: 'Eravikulam National Park', note: 'Nilgiri tahr. Closed in February and March for calving.' },
      { name: 'Mattupetty Dam', note: 'Boating and the nearby echo point.' },
      { name: 'Top Station', note: 'About 32 km up, with views into Tamil Nadu on a clear day.' },
      { name: 'Attukad Falls', note: 'Close to town, best just after the rains.' },
    ],
    itinerary: [
      {
        title: 'Day 1 — Bengaluru to Munnar',
        body: 'A long day via Salem and Udumalaipettai, with the ghat climb at the end.',
      },
      {
        title: 'Day 2 — Estates and the park',
        body: 'Eravikulam in the morning, Mattupetty and Top Station in the afternoon.',
      },
      {
        title: 'Day 3 — Return',
        body: 'Early departure for the drive back to Bengaluru.',
      },
    ],
    bestTime:
      'September to March. Eravikulam National Park closes for roughly two months in February and March, so check before you plan around it.',
    roadNotes:
      'Tamil Nadu and Kerala permits both apply. The final ghat climb has sustained hairpins and is slow going. Night driving on that section is best avoided, which shapes the departure time.',
    via: ['Hosur', 'Salem', 'Udumalaipettai', 'Marayoor'],
    needsPermit: true,
    permitStates: ['Tamil Nadu', 'Kerala'],
  },
];

export function routeBySlug(slug: string): Route | undefined {
  return routes.find((r) => r.slug === slug);
}

/** Every route fare is quoted on the Premium 12-seater at its per-km rate. */
export const ROUTE_REFERENCE_VAN_SLUG = 'force-urbania-12-seater';

export function routeFareFrom(route: Route): number {
  const van = vanBySlug(ROUTE_REFERENCE_VAN_SLUG);
  if (!van) throw new Error(`Missing reference van: ${ROUTE_REFERENCE_VAN_SLUG}`);
  return tripFare(van.outstationPerKm, route.billableKm, route.days);
}

/** Fare for a specific van on a specific route. */
export function routeFareForVan(route: Route, perKm: number): number {
  return tripFare(perKm, route.billableKm, route.days);
}

export const featuredRoutes = routes.filter((r) => r.featured);
