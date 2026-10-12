import { fleet } from '@/data/fleet';
import { routes } from '@/data/routes';

export interface EnquiryInput {
  name: string;
  phone: string;
  tripType: string;
  travelDate: string;
  pickup: string;
  destination: string;
  passengers: string;
  vanSlug: string;
  message: string;
  /** Which page the form was submitted from. */
  source: string;
  /** Google click id and campaign tags, if the visitor came from an ad. */
  ref: string;
  /** Honeypot. Real people leave this empty. */
  company: string;
}

export const TRIP_TYPES = [
  'Local, within Bengaluru',
  'Outstation trip',
  'Airport transfer',
  'Wedding',
  'Corporate or offsite',
  'Other',
] as const;

export const PASSENGER_BANDS = ['1 to 9', '10 to 12', '13 to 16', 'More than 16'] as const;

export interface ValidationResult {
  ok: boolean;
  errors: Partial<Record<keyof EnquiryInput, string>>;
  clean: EnquiryInput;
}

const str = (v: unknown, max = 400) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Indian mobile numbers, with or without +91 and spacing. */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  if (local.length !== 10) return null;
  if (!/^[6-9]/.test(local)) return null;
  return local;
}

export function validateEnquiry(body: Record<string, unknown>): ValidationResult {
  const clean: EnquiryInput = {
    name: str(body.name, 120),
    phone: str(body.phone, 40),
    tripType: str(body.tripType, 60),
    travelDate: str(body.travelDate, 40),
    pickup: str(body.pickup, 200),
    destination: str(body.destination, 200),
    passengers: str(body.passengers, 40),
    vanSlug: str(body.vanSlug, 80),
    message: str(body.message, 1500),
    source: str(body.source, 200),
    ref: str(body.ref, 400),
    company: str(body.company, 100),
  };

  const errors: ValidationResult['errors'] = {};

  if (clean.name.length < 2) errors.name = 'Please tell us your name.';

  const phone = normalisePhone(clean.phone);
  if (!phone) errors.phone = 'Enter a 10-digit Indian mobile number.';
  else clean.phone = phone;

  if (!clean.travelDate) errors.travelDate = 'Which date do you travel?';

  if (clean.vanSlug && !fleet.some((v) => v.slug === clean.vanSlug)) clean.vanSlug = '';

  return { ok: Object.keys(errors).length === 0, errors, clean };
}

/** Human-readable label for whatever the enquiry refers to. */
export function describeEnquiry(e: EnquiryInput): string {
  const van = fleet.find((v) => v.slug === e.vanSlug);
  const route = routes.find((r) => e.destination.toLowerCase().includes(r.name.toLowerCase()));
  const bits = [e.tripType || 'Enquiry'];
  if (route) bits.push(`Bengaluru to ${route.name}`);
  if (van) bits.push(van.name);
  return bits.join(' · ');
}

export function enquiryEmailText(e: EnquiryInput): string {
  const van = fleet.find((v) => v.slug === e.vanSlug);
  return [
    `New enquiry from the website`,
    ``,
    `Name:        ${e.name}`,
    `Phone:       +91 ${e.phone}`,
    `Trip type:   ${e.tripType || '—'}`,
    `Travel date: ${e.travelDate}`,
    `Pickup:      ${e.pickup || '—'}`,
    `Destination: ${e.destination || '—'}`,
    `Passengers:  ${e.passengers || '—'}`,
    `Vehicle:     ${van ? van.name : 'Not specified'}`,
    ``,
    `Message:`,
    e.message || '—',
    ``,
    `---`,
    `Page:    ${e.source || '—'}`,
    `Ad ref:  ${e.ref || 'organic / direct'}`,
    `Call back on +91 ${e.phone}`,
  ].join('\n');
}

export function enquiryEmailHtml(e: EnquiryInput): string {
  const van = fleet.find((v) => v.slug === e.vanSlug);
  const row = (k: string, v: string) =>
    `<tr><td style="padding:7px 16px 7px 0;color:#5E7078;font:14px system-ui;white-space:nowrap">${k}</td>` +
    `<td style="padding:7px 0;color:#11212A;font:600 15px system-ui">${escapeHtml(v)}</td></tr>`;

  return `<div style="font:15px system-ui;color:#11212A;max-width:560px">
  <p style="font:700 20px system-ui;margin:0 0 4px">New website enquiry</p>
  <p style="color:#5E7078;margin:0 0 20px">${escapeHtml(describeEnquiry(e))}</p>
  <table style="border-collapse:collapse;width:100%">
    ${row('Name', e.name)}
    ${row('Phone', '+91 ' + e.phone)}
    ${row('Trip type', e.tripType || '—')}
    ${row('Travel date', e.travelDate)}
    ${row('Pickup', e.pickup || '—')}
    ${row('Destination', e.destination || '—')}
    ${row('Passengers', e.passengers || '—')}
    ${row('Vehicle', van ? van.name : 'Not specified')}
  </table>
  ${e.message ? `<p style="margin:20px 0 0"><strong>Message</strong><br>${escapeHtml(e.message).replace(/\n/g, '<br>')}</p>` : ''}
  <hr style="border:0;border-top:1px solid #E4E2DC;margin:22px 0">
  <p style="color:#5E7078;font-size:13px;margin:0">
    Page: ${escapeHtml(e.source || '—')}<br>
    Ad ref: ${escapeHtml(e.ref || 'organic / direct')}
  </p>
  <p style="margin:18px 0 0">
    <a href="tel:+91${e.phone}" style="background:#E9A23B;color:#0E1A1F;text-decoration:none;padding:11px 20px;border-radius:999px;font-weight:600;display:inline-block">Call +91 ${e.phone}</a>
  </p>
</div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
