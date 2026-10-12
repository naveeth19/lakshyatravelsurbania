import { describe, expect, it } from 'vitest';
import { fleet, DRIVER_ALLOWANCE_PER_DAY, OUTSTATION_MIN_KM_PER_DAY } from '@/data/fleet';
import { routes, routeFareFrom, ROUTE_REFERENCE_VAN_SLUG } from '@/data/routes';
import { formatINR, oneDayOutstationFrom, tripFare } from '@/lib/pricing';

describe('tripFare', () => {
  it('bills the greater of actual and minimum distance, plus driver allowance', () => {
    expect(tripFare(35, 540, 2)).toBe(35 * 600 + 1400);
    expect(tripFare(35, 700, 2)).toBe(35 * 700 + 1400);
  });
});

describe('published trip fares', () => {
  const expected: Record<string, number> = {
    mysore: 11200,
    coorg: 22400,
    chikmagalur: 22400,
    tirupati: 18900,
    ooty: 33600,
    pondicherry: 23450,
  };

  it('quotes every trip on the Premium 12-seater at ₹35/km', () => {
    const ref = fleet.find((v) => v.slug === ROUTE_REFERENCE_VAN_SLUG);
    expect(ref?.outstationPerKm).toBe(35);
  });

  for (const [slug, fare] of Object.entries(expected)) {
    it(`${slug} is ${formatINR(fare)}`, () => {
      const route = routes.find((r) => r.slug === slug);
      expect(route, `route "${slug}" is missing from data/routes.ts`).toBeDefined();
      expect(routeFareFrom(route!)).toBe(fare);
    });
  }
});

describe('oneDayOutstationFrom', () => {
  it('is 300 km at the van rate plus one driver allowance', () => {
    for (const van of fleet) {
      expect(oneDayOutstationFrom(van)).toBe(
        van.outstationPerKm * OUTSTATION_MIN_KM_PER_DAY + DRIVER_ALLOWANCE_PER_DAY,
      );
    }
  });

  it('starts at ₹10,900 for the cheapest van', () => {
    expect(Math.min(...fleet.map(oneDayOutstationFrom))).toBe(10900);
  });
});

describe('formatINR', () => {
  it('uses the Indian digit grouping', () => {
    expect(formatINR(9500)).toBe('₹9,500');
    expect(formatINR(1250000)).toBe('₹12,50,000');
  });
});

describe('fleet data', () => {
  it('has six vans with unique slugs', () => {
    expect(fleet).toHaveLength(6);
    expect(new Set(fleet.map((v) => v.slug)).size).toBe(6);
  });

  it('has a seat plan that adds up to the seat count', () => {
    for (const van of fleet) {
      const total = van.seatPlan.split('-').reduce((a, b) => a + Number(b), 0);
      expect(total, van.slug).toBe(van.seats);
    }
  });
});
