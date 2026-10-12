import Link from 'next/link';
import { routes, routeFareFrom, type Route } from '@/data/routes';
import { formatINR } from '@/lib/pricing';
import { ArrowRightIcon } from './Icons';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function RouteGrid({
  items = routes,
  heading = 'Weekend plans, priced upfront.',
  sub = 'Starting fares in a Premium 12-seater, driver allowance included. Every route has its own page with the full itinerary.',
  eyebrow = 'Outstation',
  showAllLink = true,
}: {
  items?: Route[];
  heading?: string;
  sub?: string;
  eyebrow?: string;
  showAllLink?: boolean;
}) {
  return (
    <section id="trips" className="mesh-cream section scroll-mt-24">
      <div className="shell">
        <SectionHead
          eyebrow={eyebrow}
          title={heading}
          sub={sub}
          action={
            showAllLink ? (
              <Link href="/outstation" className="btn btn-outline">
                All routes
                <ArrowRightIcon />
              </Link>
            ) : undefined
          }
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <Reveal as="li" key={r.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={`/outstation/${r.slug}`}
                className="card tilt spotlight beam elev-1 group flex h-full min-w-0 flex-col p-6 sm:p-7 transition-shadow duration-300 hover:shadow-[0_28px_60px_-28px_rgba(7,15,19,.45)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
                  <h3 className="numeral text-[30px] leading-none">{r.name}</h3>
                  <span className="pill shrink-0 bg-[var(--accent-soft)] text-[var(--text)]">
                    {r.days} {r.days === 1 ? 'day' : 'days'}
                  </span>
                </div>

                <p className="mt-3 text-[14.5px] text-[var(--muted)]">{r.blurb}</p>
                <p className="mt-1.5 text-[13.5px] text-[var(--subtle)]">
                  {r.distanceKm} km each way · {r.duration}
                </p>

                <div className="mt-auto flex items-end justify-between gap-3 border-t border-[var(--line)] pt-5 mt-7">
                  <p>
                    <span className="block text-[12.5px] text-[var(--subtle)]">from</span>
                    <span className="numeral text-[27px]">{formatINR(routeFareFrom(r))}</span>
                  </p>
                  <span className="mb-1 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--teal)]">
                    See the trip
                    <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl text-[13px] leading-relaxed text-[var(--subtle)]">
          Approximate starting fares. Tolls, parking, state permits and GST are extra. Luxury
          Maharaja cabins cost more per kilometre.
        </p>
      </div>
    </section>
  );
}
