/**
 * Call and WhatsApp clicks are the only conversions this site has, so every
 * one of them is reported to GA4 and to Google Ads as a separate conversion.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
const CALL_LABEL = process.env.NEXT_PUBLIC_GADS_CALL_LABEL;
const WA_LABEL = process.env.NEXT_PUBLIC_GADS_WA_LABEL;
const FORM_LABEL = process.env.NEXT_PUBLIC_GADS_FORM_LABEL;

const REF_KEY = 'uhb:ref';

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') window.gtag(...args);
  else window.dataLayer.push(args);
}

function page(): string {
  return typeof window === 'undefined' ? '' : window.location.pathname;
}

function adsConversion(label?: string) {
  if (!GADS_ID || !label) return;
  gtag('event', 'conversion', { send_to: `${GADS_ID}/${label}` });
}

export function trackCall(location: string) {
  gtag('event', 'click_call', { location, page: page(), ...storedRef() });
  adsConversion(CALL_LABEL);
}

export function trackWhatsApp(location: string, vanSlug?: string) {
  gtag('event', 'click_whatsapp', {
    location,
    van: vanSlug ?? '',
    page: page(),
    ...storedRef(),
  });
  adsConversion(WA_LABEL);
}

export function trackFormLead() {
  gtag('event', 'generate_lead', { page: page(), ...storedRef() });
  adsConversion(FORM_LABEL);
}

/** Click ids and campaign tags, captured once per session from the URL. */
export interface AdRef {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export function captureAdRef() {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const keys = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const found: AdRef = {};
    for (const key of keys) {
      const value = params.get(key);
      if (value) found[key as keyof AdRef] = value;
    }
    if (Object.keys(found).length === 0) return;
    const existing = storedRef();
    sessionStorage.setItem(REF_KEY, JSON.stringify({ ...existing, ...found }));
  } catch {
    /* Private mode or blocked storage — tracking is best effort. */
  }
}

export function storedRef(): AdRef {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(REF_KEY);
    return raw ? (JSON.parse(raw) as AdRef) : {};
  } catch {
    return {};
  }
}
