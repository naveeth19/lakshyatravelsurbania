import Image from 'next/image';
import Link from 'next/link';
import { WhatsAppLink } from './ContactLink';
import { ArrowRightIcon } from './Icons';
import { Reveal } from './Reveal';
import { popularFleet, TIER_SEATING, type Van } from '@/data/fleet';
import { formatINR } from '@/lib/pricing';
import { vanMessage } from '@/lib/whatsapp';

/**
 * Scannable showcase of four vehicles, straight after the hero. The full
 * interactive selector lives further down at #fleet; this exists to put real
 * prices in front of someone within one scroll.
 */
export function PopularVehicles({ trackingRef }: { trackingRef?: string }) {
  return (
    <section className="section-tight bg-[var(--surface)]">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <div>
              <p className="eyebrow mb-4">Travel in comfort</p>
              <h2 className="h2">Popular vehicles</h2>
            </div>
            <Link
              href="/#fleet"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--accent-ink)] underline-offset-4 hover:underline"
            >
              View all vehicles
              <ArrowRightIcon />
            </Link>
          </div>
        </Reveal>

        {/*
          Swipe rail on phones so four cards do not become four screens;
          a plain grid from the sm breakpoint up.
        */}
        <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {popularFleet.map((van, i) => (
            <Reveal
              as="li"
              key={van.slug}
              delay={(i % 4) * 0.05}
              className="w-[78vw] shrink-0 snap-start sm:w-auto"
            >
              <VehicleCard van={van} trackingRef={trackingRef} />
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 text-[13px] text-[var(--subtle)]">
          Prices are the 8 hr / 80 km city package. Tolls, parking, state permits and GST
          are extra.
        </p>
      </div>
    </section>
  );
}

function VehicleCard({ van, trackingRef }: { van: Van; trackingRef?: string }) {
  const rows: [string, string][] = [
    ['8 hrs / 80 km (local)', formatINR(van.local8h80km)],
    ['Extra hour', formatINR(van.extraHour)],
    ['Extra km', formatINR(van.extraKm)],
  ];

  return (
    <article className="card tilt spotlight elev-1 flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[0_24px_52px_-28px_rgba(13,17,19,.45)]">
      {/* Photo + price badge */}
      <div className="relative bg-[var(--surface-2)] px-4 pb-2 pt-5">
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[var(--accent)] px-3.5 py-1.5 text-[14px] font-bold text-[var(--ink)] shadow-[0_6px_16px_-8px_rgba(240,176,72,.9)]">
          {formatINR(van.local8h80km)}
        </span>
        <Image
          src="/images/van-sticker.webp"
          alt={`${van.name}, ${van.seats} seater`}
          width={1040}
          height={688}
          loading="lazy"
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 23vw"
          className="h-auto w-full"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="min-h-[40px] text-[16.5px] font-bold leading-tight text-[var(--text)]">
          {van.name}
        </h3>
        <p className="mt-1.5 text-[13px] text-[var(--subtle)]">
          AC / {van.seats} seater / {TIER_SEATING[van.tier]}
        </p>

        <dl className="mt-4 border-t border-[var(--line)] pt-3.5">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-3 py-1.5">
              <dt className="text-[13px] text-[var(--muted)]">{label}</dt>
              <dd className="text-[14px] font-semibold tabular-nums text-[var(--text)]">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto">
          <div className="flex items-baseline justify-between gap-3 border-t border-dashed border-[var(--line)] pt-3.5">
            <span className="text-[13.5px] font-semibold text-[var(--text)]">Starting from</span>
            <span className="numeral text-[19px] text-[var(--accent-ink)]">
              {formatINR(van.outstationPerKm)}/km
            </span>
          </div>

          <WhatsAppLink
            location="popular-vehicles"
            vanSlug={van.slug}
            message={vanMessage(van, 'local', trackingRef)}
            className="btn btn-accent mt-4 w-full"
          >
            Book now
          </WhatsAppLink>

          <Link
            href={`/fleet/${van.slug}`}
            className="mt-2.5 block text-center text-[13.5px] font-semibold text-[var(--teal)] underline-offset-4 hover:underline"
          >
            Full details
          </Link>
        </div>
      </div>
    </article>
  );
}
