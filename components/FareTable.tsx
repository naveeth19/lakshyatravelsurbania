import Link from 'next/link';
import { fleet } from '@/data/fleet';
import { formatINR } from '@/lib/pricing';
import { routeFareForVan, type Route } from '@/data/routes';
import { DRIVER_ALLOWANCE_PER_DAY, EXTRAS_NOTE } from '@/data/fleet';

/** Every van's fare for one route. All figures computed, never hardcoded. */
export function FareTable({ route }: { route: Route }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <caption className="sr-only">
            Fares for a {route.days}-day Bengaluru to {route.name} trip, by vehicle
          </caption>
          <thead>
            <tr className="border-b border-[var(--line)]">
              <th scope="col" className="py-3 pr-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--subtle)]">
                Vehicle
              </th>
              <th scope="col" className="py-3 pr-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--subtle)]">
                Seats
              </th>
              <th scope="col" className="py-3 pr-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--subtle)]">
                Per km
              </th>
              <th scope="col" className="py-3 text-right text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--subtle)]">
                Trip fare from
              </th>
            </tr>
          </thead>
          <tbody>
            {fleet.map((van) => (
              <tr key={van.slug} className="border-b border-[var(--line)] last:border-0">
                <th scope="row" className="py-4 pr-4 font-normal">
                  <Link
                    href={`/fleet/${van.slug}`}
                    className="font-semibold text-[var(--text)] underline-offset-4 hover:underline"
                  >
                    {van.name}
                  </Link>
                  <span className="mt-0.5 block text-[13px] text-[var(--subtle)]">{van.tier}</span>
                </th>
                <td className="py-4 pr-4 tabular-nums text-[var(--muted)]">{van.seats}</td>
                <td className="py-4 pr-4 tabular-nums text-[var(--muted)]">
                  {formatINR(van.outstationPerKm)}
                </td>
                <td className="numeral py-4 text-right text-[19px]">
                  {formatINR(routeFareForVan(route, van.outstationPerKm))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl bg-[var(--accent-soft)] p-5 text-[14.5px] leading-relaxed text-[var(--text)]">
        <p>
          <strong className="font-semibold">How this is worked out.</strong> {route.billableKm} km
          billed at the vehicle&rsquo;s per-kilometre rate, plus a driver allowance of{' '}
          {formatINR(DRIVER_ALLOWANCE_PER_DAY)} per day for {route.days}{' '}
          {route.days === 1 ? 'day' : 'days'}. Outstation trips bill a minimum of 300 km per day,
          which is why a short two-day trip still bills 600 km.
        </p>
        <p className="mt-2 text-[13.5px] text-[var(--muted)]">{EXTRAS_NOTE}</p>
      </div>
    </div>
  );
}
