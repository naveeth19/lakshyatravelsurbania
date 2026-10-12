'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PASSENGER_BANDS, TRIP_TYPES } from '@/lib/enquiry';
import { fleet } from '@/data/fleet';
import { storedRef, trackWhatsApp } from '@/lib/analytics';
import { waLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './Icons';

type Errors = Partial<Record<string, string>>;

interface Props {
  /** Which page this form sits on, recorded with the lead. */
  source: string;
  /** Preselect a van, e.g. on a fleet detail page. */
  vanSlug?: string;
  /** Prefill the destination, e.g. on a route page. */
  destination?: string;
  /** Prefill the trip type. */
  tripType?: string;
  /** Prefill the pickup, e.g. on an area page. */
  pickup?: string;
  dark?: boolean;
  compact?: boolean;
}

export function QuoteForm({
  source,
  vanSlug = '',
  destination = '',
  tripType = '',
  pickup = '',
  dark,
  compact,
}: Props) {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [failed, setFailed] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: fd.get('name'),
      phone: fd.get('phone'),
      tripType: fd.get('tripType'),
      travelDate: fd.get('travelDate'),
      pickup: fd.get('pickup'),
      destination: fd.get('destination'),
      passengers: fd.get('passengers'),
      vanSlug: fd.get('vanSlug'),
      message: fd.get('message'),
      company: fd.get('company'),
      source,
      ref: JSON.stringify(storedRef()),
    };

    setState('sending');
    setErrors({});

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.errors ?? {});
        setState('error');
        return;
      }

      if (!res.ok) {
        setState('error');
        setFailed(true);
        return;
      }

      router.push('/thank-you');
    } catch {
      // Network failure. Offer WhatsApp rather than losing the enquiry.
      setState('error');
      setFailed(true);
    }
  }

  const label = `block text-[13px] font-semibold mb-1.5 ${
    dark ? 'text-[var(--on-dark-muted)]' : 'text-[var(--muted)]'
  }`;

  const field = `w-full rounded-xl border px-4 py-3 text-[15.5px] outline-none transition-colors ${
    dark
      ? 'border-[var(--line-dark)] bg-[rgba(255,255,255,.05)] text-[var(--on-dark)] placeholder:text-[var(--on-dark-subtle)] focus:border-[var(--accent)]'
      : 'border-[var(--line)] bg-white text-[var(--text)] placeholder:text-[var(--subtle)] focus:border-[var(--accent)]'
  }`;

  const err = (k: string) =>
    errors[k] ? (
      <p className="mt-1.5 text-[13px] font-medium text-[#C0392B]" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      {/* Honeypot, hidden from people and from screen readers. */}
      <div aria-hidden className="hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <input type="hidden" name="vanSlug" defaultValue={vanSlug} />

      <div>
        <label className={label} htmlFor={`${source}-name`}>
          Your name
        </label>
        <input
          id={`${source}-name`}
          name="name"
          className={field}
          placeholder="Name"
          autoComplete="name"
          required
        />
        {err('name')}
      </div>

      <div>
        <label className={label} htmlFor={`${source}-phone`}>
          Mobile number
        </label>
        <input
          id={`${source}-phone`}
          name="phone"
          type="tel"
          inputMode="numeric"
          className={field}
          placeholder="10-digit mobile"
          autoComplete="tel"
          required
        />
        {err('phone')}
      </div>

      <div>
        <label className={label} htmlFor={`${source}-date`}>
          Travel date
        </label>
        <input
          id={`${source}-date`}
          name="travelDate"
          type="date"
          className={field}
          required
        />
        {err('travelDate')}
      </div>

      <div>
        <label className={label} htmlFor={`${source}-passengers`}>
          Passengers
        </label>
        <select id={`${source}-passengers`} name="passengers" className={field} defaultValue="">
          <option value="">Select</option>
          {PASSENGER_BANDS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {!compact && (
        <>
          <div>
            <label className={label} htmlFor={`${source}-trip`}>
              Trip type
            </label>
            <select
              id={`${source}-trip`}
              name="tripType"
              className={field}
              defaultValue={tripType}
            >
              <option value="">Select</option>
              {TRIP_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={label} htmlFor={`${source}-van`}>
              Preferred vehicle
            </label>
            <select id={`${source}-van`} name="vanSlug" className={field} defaultValue={vanSlug}>
              <option value="">Not sure, suggest one</option>
              {fleet.map((v) => (
                <option key={v.slug} value={v.slug}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div>
        <label className={label} htmlFor={`${source}-pickup`}>
          Pickup
        </label>
        <input
          id={`${source}-pickup`}
          name="pickup"
          className={field}
          placeholder="Area in Bengaluru"
          defaultValue={pickup}
        />
      </div>

      <div>
        <label className={label} htmlFor={`${source}-destination`}>
          Destination
        </label>
        <input
          id={`${source}-destination`}
          name="destination"
          className={field}
          placeholder="Where to?"
          defaultValue={destination}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={label} htmlFor={`${source}-message`}>
          Anything else? <span className="font-normal">(optional)</span>
        </label>
        <textarea
          id={`${source}-message`}
          name="message"
          rows={3}
          className={field}
          placeholder="Itinerary, timings, number of bags…"
        />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={state === 'sending'} className="btn btn-lg btn-accent w-full">
          {state === 'sending' ? 'Sending…' : 'Get my fare'}
        </button>

        <p
          className={`mt-3 text-center text-[13px] ${
            dark ? 'text-[var(--on-dark-subtle)]' : 'text-[var(--subtle)]'
          }`}
        >
          We reply within a few minutes. No spam, no newsletters.
        </p>

        {failed && (
          <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--accent-soft)] p-4 text-center">
            <p className="text-[14.5px] text-[var(--text)]">
              Something went wrong at our end. Send the same details on WhatsApp and we will
              pick it up straight away.
            </p>
            <a
              href={waLink(
                'Hi, I tried the enquiry form on your website and it did not go through. Date:  Pickup:  Drop:  No. of people: ',
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp('form-fallback')}
              className="btn btn-wa mt-3"
            >
              <WhatsAppIcon />
              Send on WhatsApp
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
