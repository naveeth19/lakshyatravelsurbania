import type { Metadata } from 'next';
import { PolicyLayout } from '@/components/PolicyLayout';
import { site } from '@/data/site';
import {
  DRIVER_ALLOWANCE_PER_DAY,
  EXTRAS_NOTE,
  OUTSTATION_MIN_KM_PER_DAY,
} from '@/data/fleet';
import { formatINR } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Terms of service',
  description: `Booking terms for Force Urbania hire with ${site.name}, covering fares, billing, driver hours and liability.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms of service">
      <p>
        These terms apply to every Force Urbania booking made with {site.name}. Booking a
        vehicle with us, by phone, WhatsApp or the enquiry form on this website, means you accept
        them.
      </p>

      <h2>Bookings</h2>
      <p>
        A booking is confirmed only when we confirm it back to you with a vehicle, a date and a
        fare. An enquiry submitted through this website is a request, not a confirmed booking.
      </p>

      <h2>Fares and billing</h2>
      <ul>
        <li>
          Local packages are billed as published: a fixed package for 8 hours and 80 km, or 12
          hours and 100 km, with extra hours and extra kilometres charged at the published rate.
        </li>
        <li>
          Outstation trips are billed per kilometre, with a minimum of {OUTSTATION_MIN_KM_PER_DAY}{' '}
          km charged per day, plus a driver allowance of {formatINR(DRIVER_ALLOWANCE_PER_DAY)} per
          day.
        </li>
        <li>
          Distance is counted from the garage to the garage unless we have agreed otherwise in
          writing before the trip.
        </li>
        <li>{EXTRAS_NOTE}</li>
      </ul>

      <h2>Driver hours and rest</h2>
      <p>
        Our drivers need rest. On multi-day trips we expect a reasonable overnight break, and we
        may decline an itinerary that cannot be driven safely. This is not negotiable, and it is
        the main reason we occasionally say no to a schedule.
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>Smoking, alcohol and any illegal substance are not permitted in the vehicle.</li>
        <li>
          Any damage to the vehicle caused by passengers, including cleaning beyond normal use,
          is chargeable.
        </li>
        <li>
          The number of passengers must not exceed the vehicle&rsquo;s seating capacity. We will
          refuse to travel overloaded.
        </li>
        <li>Luggage is carried at your own risk. Please do not leave valuables in the vehicle.</li>
      </ul>

      <h2>Delays and things outside our control</h2>
      <p>
        We plan for traffic, but we cannot guarantee journey times. Road closures, weather,
        protests, forest-reserve night bans and vehicle breakdown are outside our control. If a
        vehicle breaks down we will arrange a replacement as quickly as we can.
      </p>

      <h2>Cancellation</h2>
      <p>
        Cancellation and refund terms are set out separately on our cancellation policy page.
      </p>

      <h2>Liability</h2>
      <p>
        Our liability is limited to the value of the booking. We are not liable for consequential
        losses such as missed flights, missed events or onward bookings, though we will always do
        what we reasonably can to avoid them.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, and any dispute falls under the
        jurisdiction of the courts of Bengaluru, Karnataka.
      </p>

      <h2>Contact</h2>
      <p>
        {site.name}
        {site.showLegalDetails ? `, operated by ${site.legalName}, GSTIN ${site.gstin}` : ''}. Call
        or WhatsApp {site.phoneDisplayFull}, 24 hours a day.
      </p>
    </PolicyLayout>
  );
}
