import type { Faq } from '@/data/faqs';
import {
  DRIVER_ALLOWANCE_PER_DAY,
  OUTSTATION_MIN_KM_PER_DAY,
  TIER_NOTES,
  TIER_SEATING,
  cheapestLocalFare,
  fleet,
  type Van,
} from '@/data/fleet';
import { routeFareFrom, routeFareForVan, type Route } from '@/data/routes';
import type { Area } from '@/data/areas';
import type { UseCase } from '@/data/use-cases';
import { formatINR, oneDayOutstationFrom } from '@/lib/pricing';
import { site } from '@/data/site';

/**
 * Page-specific FAQs, generated from the same data the pages render.
 *
 * Every page used to repeat the same four generic questions, which is
 * duplicate content across thirty-odd pages and wasted FAQ schema. These are
 * unique per page and answer the questions people actually type, and because
 * the figures are computed rather than written out, a rate change updates the
 * answers everywhere at once.
 */

const cheapest = fleet.reduce((a, b) => (a.outstationPerKm <= b.outstationPerKm ? a : b));
const biggest = fleet.reduce((a, b) => (a.seats >= b.seats ? a : b));

/* ---------------------------------------------------------------- routes */

export function routeFaqs(route: Route): Faq[] {
  const ref = fleet.find((v) => v.slug === 'force-urbania-12-seater')!;
  const from = formatINR(routeFareFrom(route));
  const cheapestFare = formatINR(routeFareForVan(route, cheapest.outstationPerKm));
  const biggestFare = formatINR(routeFareForVan(route, biggest.outstationPerKm));
  const nights = route.days - 1;

  const faqs: Faq[] = [
    {
      q: `How much does a Bengaluru to ${route.name} trip cost in a Force Urbania?`,
      a: `A ${route.days}-day trip starts at ${from} in a Premium 12-seater at ${formatINR(ref.outstationPerKm)} per kilometre. The lowest fare in the fleet is ${cheapestFare} in the ${cheapest.seats}-seater, and the ${biggest.seats}-seater works out at ${biggestFare}. Each of those includes the driver allowance of ${formatINR(DRIVER_ALLOWANCE_PER_DAY)} per day. Tolls, parking, state permits and GST are extra.`,
    },
    {
      q: `How long does it take to drive from Bengaluru to ${route.name}?`,
      a: `About ${route.duration} one way, covering roughly ${route.distanceKm} km. ${route.via.length ? `The route runs through ${route.via.slice(0, -1).join(', ')} and ${route.via[route.via.length - 1]}. ` : ''}Traffic getting out of Bengaluru is the biggest variable, which is why most groups leave early.`,
    },
    {
      q: `How many days do I need for a ${route.name} trip?`,
      a:
        route.days === 1
          ? `${route.name} works as a single long day from Bengaluru. We quote it as a one-day trip, and most groups leave very early and are back the same night.`
          : `We quote ${route.name} as a ${route.days}-day trip with ${nights} ${nights === 1 ? 'night' : 'nights'} away, which is the comfortable minimum. You can stretch it longer — each extra day adds ${OUTSTATION_MIN_KM_PER_DAY} km of billing plus one more driver allowance.`,
    },
    {
      q: `Why does a ${route.approxRoundKm} km round trip to ${route.name} bill ${route.billableKm} km?`,
      a:
        route.billableKm > route.approxRoundKm
          ? `Outstation trips bill a minimum of ${OUTSTATION_MIN_KM_PER_DAY} km per day. A ${route.days}-day trip therefore carries a floor of ${route.billableKm} km even though the actual driving is closer to ${route.approxRoundKm} km. That floor covers the vehicle being committed to you for the full ${route.days} days.`
          : `It bills the distance actually covered, roughly ${route.billableKm} km, because that is already above the ${OUTSTATION_MIN_KM_PER_DAY} km per day minimum that applies to outstation trips.`,
    },
    {
      q: `Do I need a state permit for a ${route.name} trip?`,
      a: route.needsPermit
        ? `Yes. The route enters ${route.permitStates.join(' and ')}, so an interstate permit applies. The cost depends on the state and how long you are there, and we tell you the figure before you book rather than adding it at the end.`
        : `No. ${route.name} is inside Karnataka, so no interstate permit is needed. You still pay tolls and parking at actual, and GST on the fare.`,
    },
    {
      q: `When is the best time to visit ${route.name}?`,
      a: route.bestTime,
    },
  ];

  return faqs;
}

/* ----------------------------------------------------------------- areas */

export function areaFaqs(area: Area): Faq[] {
  return [
    {
      q: `Do you pick up from ${area.name}?`,
      a: `Yes, every day and at any hour. Common pickup points include ${area.landmarks.slice(0, 3).join(', ')} and anywhere else in ${area.name}. Give us the exact address when you book and the driver will be there.`,
    },
    {
      q: `How long does it take to reach Bengaluru airport from ${area.name}?`,
      a: `Kempegowda International Airport is roughly ${area.airportKm} km from ${area.name}, which is ${area.airportTime} depending on traffic and the hour. For an early flight we normally suggest leaving a clear hour on top of that.`,
    },
    {
      q: `How much does it cost to hire an Urbania in ${area.name}?`,
      a: `City packages start at ${formatINR(cheapestLocalFare)} for 8 hours and 80 km in a Premium 10-seater, up to ${formatINR(Math.max(...fleet.map((v) => v.local8h80km)))} for the Luxury Maharaja cabins. Outstation trips from ${area.name} are billed per kilometre from ${formatINR(cheapest.outstationPerKm)} per km.`,
    },
    {
      q: `Can a 16-seater get into my street in ${area.name}?`,
      a: `${area.pickupNote} Either way it costs you nothing — tell us the building or the landmark and the driver will sort out where to wait.`,
    },
    {
      q: `Can I book a one-way drop from ${area.name}?`,
      a: `Yes. Pickup in ${area.name} and drop wherever you need, in the city or outside it. You are not charged for an empty return leg on a one-way booking. Share the route on WhatsApp and we will quote it.`,
    },
  ];
}

/* ------------------------------------------------------------- use cases */

export function faqsForUseCase(useCase: UseCase): Faq[] {
  const recommended = useCase.recommendSlugs
    .map((s) => fleet.find((v) => v.slug === s))
    .filter(Boolean) as Van[];
  const lead = recommended[0];
  const subject = useCase.name.toLowerCase();

  return [
    {
      q: `Which Urbania is best for ${useCase.name.toLowerCase()}?`,
      a: lead
        ? `We usually send the ${lead.name} — ${lead.seats} seats, ${TIER_SEATING[lead.tier].toLowerCase()}, ${formatINR(lead.local8h80km)} for 8 hours and 80 km in the city. ${recommended.length > 1 ? `The ${recommended[1].name} is the other common pick.` : ''} If you are not sure, describe the group and we will suggest one.`
        : `Tell us the group size and what the day looks like, and we will suggest the right cabin.`,
    },
    {
      q: `Can I book more than one Urbania for ${subject}?`,
      a: `Yes, and it is common for ${subject}. Multiple vans travel together with the same arrival time, and we hold the same drivers across multi-day bookings so nobody has to re-explain the plan each morning.`,
    },
    {
      q: `What do you need from me to confirm an Urbania booking for ${subject}?`,
      a: `${useCase.checklist.slice(0, 3).join('; ')}. The more of that we have upfront, the more accurate the fare and the fewer surprises on the day.`,
    },
    {
      q: `How far in advance should I book an Urbania for ${subject}?`,
      a: `As early as you can, particularly for weekends and the wedding season, when the good cabins go first. That said, we run 24 hours a day and take short-notice bookings constantly — if you need a van tonight, call ${site.phoneDisplay} rather than assuming it is too late.`,
    },
    {
      q: `Does an Urbania booked for ${subject} come with a driver?`,
      a: `Always. Every booking comes with an experienced, verified driver, and there is no self-drive option. On outstation trips the driver allowance of ${formatINR(DRIVER_ALLOWANCE_PER_DAY)} per day covers his food and stay.`,
    },
  ];
}

/* ------------------------------------------------------------------ vans */

export function vanFaqs(van: Van): Faq[] {
  return [
    {
      q: `How many people fit in the ${van.name}?`,
      a: `${van.seats} passengers plus the driver, in a ${van.seatPlan} layout counted from the front. There is dedicated luggage space, so you are not stacking bags on laps.`,
    },
    {
      q: `What does the ${van.name} cost in Bengaluru?`,
      a: `${formatINR(van.local8h80km)} for 8 hours and 80 km, or ${formatINR(van.local12h100km)} for 12 hours and 100 km. Beyond the package it is ${formatINR(van.extraKm)} per extra kilometre and ${formatINR(van.extraHour)} per extra hour.`,
    },
    {
      q: `What is the outstation rate for the ${van.name}?`,
      a: `${formatINR(van.outstationPerKm)} per kilometre, with a minimum of ${OUTSTATION_MIN_KM_PER_DAY} km billed per day plus a driver allowance of ${formatINR(DRIVER_ALLOWANCE_PER_DAY)} per day. A one-day outstation trip therefore starts at ${formatINR(oneDayOutstationFrom(van))}.`,
    },
    {
      q: `What is the cabin like in the ${van.name}?`,
      a: `${TIER_NOTES[van.tier]} ${van.description}`,
    },
    {
      q: `Is the ${van.name} available for one-way drops?`,
      a: `Yes. Pickup anywhere in Bengaluru and drop wherever you need, with no charge for an empty return leg. Share the route on WhatsApp and we will quote it.`,
    },
  ];
}
