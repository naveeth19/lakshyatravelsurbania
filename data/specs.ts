/**
 * What "30+ configurations" actually means, spelled out. We publish rates for
 * six bookable vans; beyond those we arrange specs to order. This file is the
 * honest breakdown behind the number on the home page.
 */

export interface SpecGroup {
  key: string;
  label: string;
  /** Short line under the group heading. */
  note: string;
  options: string[];
}

export const specGroups: SpecGroup[] = [
  {
    key: 'seating',
    label: 'Seating',
    note: 'Nine to sixteen passengers, plus the driver.',
    options: ['9 seater', '10 seater', '12 seater', '13 seater', '14 seater', '16 seater'],
  },
  {
    key: 'tier',
    label: 'Comfort tier',
    note: 'How the cabin is finished and how much room each passenger gets.',
    options: ['Luxury Maharaja', 'Semi-luxury', 'Premium pushback', 'Modified cabin'],
  },
  {
    key: 'seats',
    label: 'Seat type',
    note: 'The single biggest difference on a long highway day.',
    options: ['Leather recliner', 'Captain chair', 'Pushback', 'Standard'],
  },
  {
    key: 'extras',
    label: 'Cabin extras',
    note: 'Specify what the group actually needs.',
    options: ['Ambient lighting', 'Extra luggage space', 'Wooden flooring', 'Curtains and blinds'],
  },
];

/**
 * The headline figure, in one place so the hero and this section can never
 * disagree.
 *
 * This is a BUSINESS-SUPPLIED number, not a derived one: it is the count of
 * distinct specs the operator says they can arrange. The axes above are an
 * illustration of what varies, not the arithmetic behind it. Confirm the
 * figure before launch and change it here if it is wrong — it appears on the
 * home page and is a public claim.
 */
export const CONFIGURATION_COUNT = 30;

export const specPromise = [
  {
    title: 'Tell us the spec',
    body: 'Seat count, comfort tier, seat type and anything the group needs on board. If you are not sure, describe the trip and we will suggest it.',
  },
  {
    title: 'We source it',
    body: 'Six cabins we run ourselves with rates published on this site, and a vetted network across Bengaluru for everything else.',
  },
  {
    title: 'One fixed fare',
    body: 'Whichever vehicle it ends up being, you get one number before you commit, and that is the number on the invoice.',
  },
];
