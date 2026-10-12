export interface Area {
  slug: string;
  name: string;
  /** Short line for cards and the footer. */
  blurb: string;
  /** Opening paragraph on the area page. */
  intro: string;
  /** Recognisable pickup points locals actually use. */
  landmarks: string[];
  /** Approximate drive to Kempegowda International Airport. */
  airportTime: string;
  airportKm: number;
  /** What groups from this area typically book. */
  commonTrips: string;
  /** A practical note about picking up a 7-metre van here. */
  pickupNote: string;
  /** Neighbouring areas, for internal linking. */
  nearby: string[];
}

export const areas: Area[] = [
  {
    slug: 'whitefield',
    name: 'Whitefield',
    blurb: 'Tech parks, apartment gates and early airport runs.',
    intro:
      'Whitefield generates more group travel than almost anywhere else in Bengaluru — offsites out of the tech parks, extended families in the apartment complexes, and a steady stream of airport runs at unsociable hours. It is also one of the furthest points from the airport, which is exactly why people book a van rather than three cabs.',
    landmarks: [
      'ITPL and Whitefield Main Road',
      'Phoenix Marketcity, Mahadevapura',
      'Prestige Shantiniketan',
      'Varthur and Gunjur',
      'Brookefield and Kundalahalli',
    ],
    airportTime: '1 hour 30 minutes to 2 hours',
    airportKm: 52,
    commonTrips:
      'Corporate offsites to Coorg and Chikmagalur, airport pickups for visiting teams, and weekend family runs to Mysore.',
    pickupNote:
      'Most apartment complexes here allow a 16-seater into the basement or porch, but a few do not. Tell us the tower name when you book and the driver will position at the gate instead of circling.',
    nearby: ['marathahalli', 'hsr-layout', 'indiranagar'],
  },
  {
    slug: 'electronic-city',
    name: 'Electronic City',
    blurb: 'Phase 1 and 2, with the elevated expressway in between.',
    intro:
      'Electronic City sits at the opposite end of the city from the airport, which makes a group van the sensible choice for any flight. The elevated expressway helps enormously northbound, and the Hosur Road corridor puts Tamil Nadu destinations closer than they are from anywhere else in Bengaluru.',
    landmarks: [
      'Infosys and Wipro campuses',
      'Electronic City Phase 1 and Phase 2',
      'Neeladri Road',
      'Bommasandra and Hebbagodi',
      'Konappana Agrahara',
    ],
    airportTime: '1 hour 45 minutes to 2 hours 15 minutes',
    airportKm: 62,
    commonTrips:
      'Airport transfers for teams, Tirupati overnight runs, and Hogenakkal or Yercaud weekends down the Hosur road.',
    pickupNote:
      'The elevated expressway does not permit stopping. Pickups happen at the service road or inside the campus gate — give us the gate number and we will be there.',
    nearby: ['hsr-layout', 'koramangala', 'bannerghatta-road'],
  },
  {
    slug: 'koramangala',
    name: 'Koramangala',
    blurb: 'Tight blocks, one-ways and a lot of weekend departures.',
    intro:
      'Koramangala packs a great deal into a small area, and a lot of our weekend outstation trips start here. The streets are narrow and one-way in places, so where the van waits matters more than in most parts of the city.',
    landmarks: [
      '80 Feet Road and Sony World Junction',
      'Forum Mall',
      'Koramangala 4th, 5th and 6th Blocks',
      'Jyoti Nivas College',
      'Ejipura and Adugodi',
    ],
    airportTime: '1 hour 15 minutes to 1 hour 45 minutes',
    airportKm: 44,
    commonTrips:
      'Friday-night departures to Coorg and Chikmagalur, birthday and reunion trips, and airport drops.',
    pickupNote:
      'Several internal roads are too tight for a 16-seater to turn in. We usually pick up from the nearest main road junction — it costs you a two-minute walk and saves twenty minutes of manoeuvring.',
    nearby: ['hsr-layout', 'indiranagar', 'electronic-city'],
  },
  {
    slug: 'hebbal',
    name: 'Hebbal',
    blurb: 'The best-placed part of the city for an airport run.',
    intro:
      'Hebbal is the closest major residential area to Kempegowda International Airport, which makes it the easiest part of Bengaluru to run early flights from. It is also the natural starting point for anything heading north — Hampi, Goa and Chikmagalur all leave this way.',
    landmarks: [
      'Hebbal Flyover and Esteem Mall',
      'Manyata Tech Park',
      'Sahakar Nagar and Kodigehalli',
      'RT Nagar',
      'Nagawara and Thanisandra',
    ],
    airportTime: '35 to 50 minutes',
    airportKm: 28,
    commonTrips:
      'Airport transfers at every hour, Hampi and Goa departures, and Manyata Tech Park offsites.',
    pickupNote:
      'Straightforward for a large vehicle. The flyover service roads give the driver somewhere to wait without blocking traffic.',
    nearby: ['yelahanka', 'indiranagar', 'marathahalli'],
  },
  {
    slug: 'marathahalli',
    name: 'Marathahalli',
    blurb: 'Outer Ring Road, and groups heading in every direction.',
    intro:
      'Marathahalli sits on the Outer Ring Road between Whitefield and the Sarjapur corridor, which makes it a convenient collection point when a group is scattered across east Bengaluru. We often pick up two or three stops around here before heading out of the city.',
    landmarks: [
      'Marathahalli Bridge',
      'Outer Ring Road and Kundalahalli Gate',
      'Brookefield',
      'Munnekolala and Doddanekkundi',
      'AECS Layout',
    ],
    airportTime: '1 hour 15 minutes to 1 hour 45 minutes',
    airportKm: 47,
    commonTrips:
      'Multi-stop group pickups, corporate travel, and weekend trips to Coorg, Wayanad and Mysore.',
    pickupNote:
      'Outer Ring Road is heavy at peak hours and stopping on the main carriageway is not practical. We pick up from the service road or a side street and will tell you exactly where.',
    nearby: ['whitefield', 'hsr-layout', 'indiranagar'],
  },
  {
    slug: 'indiranagar',
    name: 'Indiranagar',
    blurb: '100 Feet Road, leafy lanes and tight parking.',
    intro:
      'Indiranagar is central, well connected and genuinely awkward for a seven-metre vehicle. The main roads are fine; the numbered cross streets are not. We plan the pickup point carefully here, which is the whole reason the trip starts on time.',
    landmarks: [
      '100 Feet Road',
      'CMH Road and Indiranagar Metro',
      'Domlur',
      'Ulsoor and Halasuru Lake',
      'Old Airport Road',
    ],
    airportTime: '1 hour to 1 hour 30 minutes',
    airportKm: 38,
    commonTrips:
      'Airport transfers, wedding guest movement, and weekend getaways to Coorg and Pondicherry.',
    pickupNote:
      'Many cross streets have parking on both sides and no room for a 16-seater to turn. Expect to board from 100 Feet Road, CMH Road or the nearest wide cross.',
    nearby: ['koramangala', 'hebbal', 'whitefield'],
  },
  {
    slug: 'hsr-layout',
    name: 'HSR Layout',
    blurb: 'Sector grids, easy access and a lot of young groups.',
    intro:
      'HSR Layout is laid out on a proper grid with wide sector roads, which makes it one of the easier parts of Bengaluru to collect a large group from. It sits between Koramangala, Sarjapur Road and Electronic City, so it also works well as a meeting point.',
    landmarks: [
      'HSR Sectors 1 to 7',
      '27th Main and 14th Main',
      'Agara Lake',
      'Sarjapur Road junction',
      'BDA Complex',
    ],
    airportTime: '1 hour 20 minutes to 1 hour 50 minutes',
    airportKm: 48,
    commonTrips:
      'Group weekends to Coorg and Chikmagalur, startup offsites, and airport runs.',
    pickupNote:
      'Sector roads are wide and the van can usually come to the door. Gated communities sometimes need the flat number for security, so have it ready.',
    nearby: ['koramangala', 'electronic-city', 'marathahalli'],
  },
  {
    slug: 'yelahanka',
    name: 'Yelahanka',
    blurb: 'North Bengaluru, and the shortest hop to the airport.',
    intro:
      'Yelahanka is north of the city on the airport side, which makes it the quickest place in Bengaluru to catch a flight from and a natural launch point for Hampi, Goa and anything on the Hyderabad road.',
    landmarks: [
      'Yelahanka New Town',
      'Jakkur and Jakkur Aerodrome',
      'Doddaballapur Road',
      'Vidyaranyapura',
      'Air Force Station Yelahanka',
    ],
    airportTime: '25 to 40 minutes',
    airportKm: 22,
    commonTrips:
      'Early-morning airport drops, north Karnataka trips, and Nandi Hills day runs.',
    pickupNote:
      'Wide roads throughout and no real access problems for a 16-seater. The short airport distance means a 4 AM flight does not need a 1 AM pickup.',
    nearby: ['hebbal', 'marathahalli', 'indiranagar'],
  },
];

export function areaBySlug(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
