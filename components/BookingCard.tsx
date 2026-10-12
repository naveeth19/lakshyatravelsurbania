'use client';

import { useState } from 'react';
import { CallLink, WhatsAppLink } from './ContactLink';
import { PhoneIcon, WhatsAppIcon } from './Icons';
import type { Van } from '@/data/fleet';
import { formatINR, oneDayOutstationFrom } from '@/lib/pricing';
import { vanMessage } from '@/lib/whatsapp';

/** Sticky on desktop, inline on mobile — the MobileCallBar covers phones. */
export function BookingCard({ van }: { van: Van }) {
  const [mode, setMode] = useState<'local' | 'outstation'>('local');

  return (
    <div className="panel p-6 lg:sticky lg:top-24">
      <p className="text-[13px] text-[var(--subtle)]">
        {mode === 'local' ? '8 hr / 80 km in the city' : 'One day outstation, from'}
      </p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-[40px] font-bold leading-none tabular-nums tracking-[-1.2px]">
        {formatINR(mode === 'local' ? van.local8h80km : oneDayOutstationFrom(van))}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-1 rounded-full border border-[var(--line)] bg-[var(--surface-2)] p-1">
        {(['local', 'outstation'] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={`h-10 rounded-full text-[14px] font-semibold transition-colors ${
              mode === m ? 'bg-[var(--teal)] text-white' : 'text-[var(--muted)]'
            }`}
          >
            {m === 'local' ? 'Local' : 'Outstation'}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        <CallLink location="booking-card" className="btn btn-lg btn-accent w-full" />
        <WhatsAppLink
          location="booking-card"
          vanSlug={van.slug}
          message={vanMessage(van, mode)}
          className="btn btn-lg btn-wa w-full"
        >
          <WhatsAppIcon />
          Book on WhatsApp
        </WhatsAppLink>
      </div>

      <ul className="mt-5 space-y-2 border-t border-[var(--line)] pt-4 text-[14px] text-[var(--muted)]">
        <li className="flex items-center gap-2">
          <PhoneIcon className="shrink-0 text-[var(--teal)]" width={15} height={15} />
          Answered 24/7, every day
        </li>
        <li className="flex items-center gap-2">
          <WhatsAppIcon className="shrink-0 text-[var(--whatsapp)]" width={15} height={15} />
          Fixed fare confirmed before you book
        </li>
      </ul>
    </div>
  );
}
