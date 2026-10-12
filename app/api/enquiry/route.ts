import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  enquiryEmailHtml,
  enquiryEmailText,
  describeEnquiry,
  validateEnquiry,
} from '@/lib/enquiry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RESEND_KEY = process.env.RESEND_API_KEY;
const TO = process.env.ENQUIRY_TO_EMAIL;
const FROM = process.env.ENQUIRY_FROM_EMAIL ?? 'Urbania Hire <onboarding@resend.dev>';

/**
 * Small in-memory rate limit. These forms get hammered by bots, and this is
 * enough to take the edge off without adding a datastore. It resets whenever
 * the serverless instance recycles, which is fine for the volume this site
 * will see.
 */
const hits = new Map<string, { n: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now - entry.first > WINDOW_MS) {
    hits.set(ip, { n: 1, first: now });
    if (hits.size > 2000) hits.clear();
    return false;
  }

  entry.n += 1;
  return entry.n > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400 });
  }

  const { ok, errors, clean } = validateEnquiry(body);

  // Honeypot: a real person never fills a field they cannot see.
  if (clean.company) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!ok) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many enquiries from this connection. Please call us instead.' },
      { status: 429 },
    );
  }

  /*
   * Without a key configured the submission still succeeds. The form then
   * falls back to WhatsApp on the client, so a misconfigured deploy loses a
   * notification but never loses the lead.
   */
  if (!RESEND_KEY || !TO) {
    console.warn('[enquiry] RESEND_API_KEY or ENQUIRY_TO_EMAIL not set. Enquiry not emailed:', {
      name: clean.name,
      phone: clean.phone,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(RESEND_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO.split(',').map((t) => t.trim()),
      replyTo: undefined,
      subject: `New enquiry — ${clean.name}, +91 ${clean.phone} — ${describeEnquiry(clean)}`,
      text: enquiryEmailText(clean),
      html: enquiryEmailHtml(clean),
    });

    if (error) {
      console.error('[enquiry] Resend rejected the message:', error);
      return NextResponse.json({ ok: true, delivered: false });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[enquiry] Failed to send:', err);
    // Never fail the visitor's submission over our own mail problem.
    return NextResponse.json({ ok: true, delivered: false });
  }
}
