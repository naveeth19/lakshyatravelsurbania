import {
  DRIVER_ALLOWANCE_PER_DAY,
  OUTSTATION_MIN_KM_PER_DAY,
  type Van,
} from '@/data/fleet';

/** Fare for a one-day outstation trip at the minimum billable distance. */
export function oneDayOutstationFrom(van: Van): number {
  return van.outstationPerKm * OUTSTATION_MIN_KM_PER_DAY + DRIVER_ALLOWANCE_PER_DAY;
}

/**
 * Distance is billed at a minimum of 300 km per day, plus a flat driver
 * allowance for each day on the road.
 */
export function tripFare(perKm: number, billableKm: number, days: number): number {
  return (
    perKm * Math.max(billableKm, OUTSTATION_MIN_KM_PER_DAY * days) +
    DRIVER_ALLOWANCE_PER_DAY * days
  );
}

export function formatINR(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}
