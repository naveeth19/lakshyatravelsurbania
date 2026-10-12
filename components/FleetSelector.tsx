'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { CallLink, WhatsAppLink } from './ContactLink';
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from './Icons';
import {
  DRIVER_ALLOWANCE_PER_DAY,
  EXTRAS_NOTE,
  OUTSTATION_MIN_KM_PER_DAY,
  TIER_SEATING,
  fleet as allVans,
  tiers,
  type Tier,
  type Van,
} from '@/data/fleet';
import { formatINR, oneDayOutstationFrom } from '@/lib/pricing';
import { vanMessage } from '@/lib/whatsapp';

export type Mode = 'local' | 'outstation';

interface Props {
  vans?: Van[];
  initialSlug?: string;
  initialMode?: Mode;
  /** Landing-page slug, appended to the WhatsApp message. */
  trackingRef?: string;
}

export function FleetSelector({
  vans = allVans,
  initialSlug,
  initialMode = 'local',
  trackingRef,
}: Props) {
  const [slug, setSlug] = useState(initialSlug ?? vans[0].slug);
  const [mode, setMode] = useState<Mode>(initialMode);
  const listRef = useRef<HTMLDivElement>(null);

  const van = useMemo(() => vans.find((v) => v.slug === slug) ?? vans[0], [vans, slug]);
  const grouped = useMemo(
    () => tiers.map((t) => [t, vans.filter((v) => v.tier === t)] as const).filter(([, v]) => v.length),
    [vans],
  );

  // Arrow keys walk the whole list, across tier groups.
  function onListKeyDown(e: React.KeyboardEvent) {
    const keys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const i = vans.findIndex((v) => v.slug === slug);
    const fwd = e.key === 'ArrowDown' || e.key === 'ArrowRight';
    const next = fwd ? (i + 1) % vans.length : (i - 1 + vans.length) % vans.length;
    setSlug(vans[next].slug);
    listRef.current?.querySelectorAll<HTMLButtonElement>('button[data-van]')[next]?.focus();
  }

  const isLocal = mode === 'local';
  const headlineLabel = isLocal ? '8 hr / 80 km in the city' : 'Outstation, per kilometre';
  const headlineValue = isLocal
    ? formatINR(van.local8h80km)
    : `${formatINR(van.outstationPerKm)}/km`;

  const supporting = isLocal
    ? [
        { label: '12 hr / 100 km', value: formatINR(van.local12h100km) },
        { label: 'Extra kilometre', value: `${formatINR(van.extraKm)}/km` },
        { label: 'Extra hour', value: formatINR(van.extraHour) },
      ]
    : [
        { label: 'Minimum per day', value: `${OUTSTATION_MIN_KM_PER_DAY} km` },
        { label: 'Driver allowance', value: `${formatINR(DRIVER_ALLOWANCE_PER_DAY)}/day` },
        { label: 'One day from', value: formatINR(oneDayOutstationFrom(van)) },
      ];

  return (
    <div className="panel elev-2 overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,370px)_minmax(0,1fr)]">
        {/* ---------- Picker ---------- */}
        <div
          ref={listRef}
          onKeyDown={onListKeyDown}
          className="border-b border-[var(--line)] bg-[var(--surface-2)] p-5 md:p-6 lg:border-b-0 lg:border-r"
        >
          {grouped.map(([tier, group]) => (
            <div key={tier} className="mb-7 last:mb-0">
              <div className="mb-3.5 flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: tier === 'Luxury Maharaja' ? 'var(--accent)' : 'var(--teal)' }}
                />
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--subtle)]">
                  {tier}
                </h3>
              </div>

              {/* Two across on phones so all six fit without scrolling */}
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                {group.map((v) => {
                  const selected = v.slug === van.slug;
                  return (
                    <button
                      key={v.slug}
                      type="button"
                      data-van
                      aria-pressed={selected}
                      onClick={() => setSlug(v.slug)}
                      className={`group relative overflow-hidden rounded-2xl border p-3.5 text-left transition-all duration-200 lg:flex lg:items-center lg:gap-3.5 ${
                        selected
                          ? 'border-[var(--ink)] bg-[var(--ink)] shadow-[0_12px_28px_-16px_rgba(7,15,19,.85)]'
                          : 'border-[var(--line)] bg-white hover:border-[var(--ink)]/25 hover:shadow-[0_8px_20px_-14px_rgba(7,15,19,.5)]'
                      }`}
                    >
                      {/* Saffron rail marks the active row */}
                      <span
                        aria-hidden
                        className={`absolute inset-y-0 left-0 w-[3px] transition-opacity duration-200 ${
                          selected ? 'bg-[var(--accent)] opacity-100' : 'opacity-0'
                        }`}
                      />

                      <span
                        aria-hidden
                        className={`numeral grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[17px] transition-colors ${
                          selected
                            ? 'bg-[var(--accent)] text-[var(--ink)]'
                            : 'bg-[var(--cream)] text-[var(--text)]'
                        }`}
                      >
                        {v.seats}
                      </span>

                      <span className="mt-2.5 block min-w-0 lg:mt-0 lg:flex-1">
                        <span
                          className={`block text-[14.5px] font-semibold leading-tight ${
                            selected ? 'text-[var(--on-dark)]' : 'text-[var(--text)]'
                          }`}
                        >
                          {v.shortName}
                        </span>
                        <span
                          className={`numeral mt-0.5 block text-[13px] ${
                            selected ? 'text-[var(--accent)]' : 'text-[var(--subtle)]'
                          }`}
                        >
                          {formatINR(v.local8h80km)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <p className="mt-6 border-t border-[var(--line)] pt-4 text-[12.5px] leading-snug text-[var(--subtle)]">
            Prices shown are the 8 hr / 80 km city package.
          </p>
        </div>

        {/* ---------- Detail ---------- */}
        <div key={van.slug} className="panel-in p-5 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pill bg-[var(--ink)] text-[var(--on-dark)]">{van.tier}</span>
            {van.badge && (
              <span className="pill bg-[var(--accent)] text-[var(--ink)]">{van.badge}</span>
            )}
          </div>

          <h3 className="h3 mt-4">{van.name}</h3>
          <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-[var(--muted)]">
            {van.description}
          </p>

          {/* Spec strip replaces the old seat-map graphic */}
          <dl className="mt-6 flex flex-wrap gap-2">
            <Spec label="Capacity" value={`${van.seats} + driver`} />
            <Spec label="Layout" value={van.seatPlan} />
            <Spec label="Comfort" value={TIER_SEATING[van.tier as Tier]} />
          </dl>

          <ModeToggle mode={mode} setMode={setMode} />

          {/* One headline figure, three supporting — not four equal boxes */}
          <div className="mt-5 overflow-hidden rounded-[20px] border border-[var(--line)]">
            <div className="bg-[var(--ink)] px-6 py-6">
              <p className="text-[12.5px] uppercase tracking-[0.12em] text-[var(--on-dark-subtle)]">
                {headlineLabel}
              </p>
              <p className="numeral mt-2 text-[clamp(38px,5vw,54px)] leading-none text-[var(--accent)]">
                {headlineValue}
              </p>
              {!isLocal && (
                <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--on-dark-muted)]">
                  A one-day trip starts at{' '}
                  <strong className="font-semibold text-[var(--on-dark)]">
                    {formatINR(oneDayOutstationFrom(van))}
                  </strong>{' '}
                  — 300 km plus the driver allowance.
                </p>
              )}
            </div>

            <dl className="grid grid-cols-1 divide-y divide-[var(--line)] bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {supporting.map((s) => (
                <div key={s.label} className="px-5 py-4">
                  <dt className="text-[12px] leading-snug text-[var(--subtle)]">{s.label}</dt>
                  <dd className="numeral mt-1 text-[18px]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-3 text-[12.5px] leading-snug text-[var(--subtle)]">{EXTRAS_NOTE}</p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <WhatsAppLink
              location="fleet-selector"
              vanSlug={van.slug}
              message={vanMessage(van, mode, trackingRef)}
              className="magnetic btn btn-lg btn-wa min-w-0 flex-1"
            >
              <WhatsAppIcon />
              Book on WhatsApp
            </WhatsAppLink>
            <CallLink
              location="fleet-selector"
              className="magnetic btn btn-lg btn-accent shrink-0 sm:w-auto"
            >
              <PhoneIcon />
              Call
            </CallLink>
          </div>

          <Link
            href={`/fleet/${van.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[var(--teal)] underline-offset-4 hover:underline"
          >
            Full details and photos
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-3.5 py-2">
      <dt className="inline text-[12px] text-[var(--subtle)]">{label}: </dt>
      <dd className="inline text-[12.5px] font-semibold text-[var(--text)]">{value}</dd>
    </div>
  );
}

function ModeToggle({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const options: { key: Mode; label: string }[] = [
    { key: 'local', label: 'Local, within city' },
    { key: 'outstation', label: 'Outstation' },
  ];

  return (
    <div
      role="group"
      aria-label="Pricing type"
      data-index={mode === 'local' ? 0 : 1}
      className="seg mt-7 grid grid-cols-2 gap-1 rounded-full border border-[var(--line)] bg-[var(--surface-2)] p-1"
    >
      <span aria-hidden className="seg-indicator" />
      {options.map((o) => {
        const active = mode === o.key;
        return (
          <button
            key={o.key}
            type="button"
            aria-pressed={active}
            onClick={() => setMode(o.key)}
            className="relative z-10 h-11 rounded-full px-2 text-[14px] font-semibold transition-colors sm:text-[14.5px]"
            style={{ color: active ? '#fff' : 'var(--muted)' }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
