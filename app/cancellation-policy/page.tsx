import type { Metadata } from 'next';
import { PolicyLayout } from '@/components/PolicyLayout';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Cancellation policy',
  description: `Cancellation and refund terms for Force Urbania bookings with ${site.name}.`,
  alternates: { canonical: '/cancellation-policy' },
};

export default function CancellationPolicyPage() {
  return (
    <PolicyLayout title="Cancellation policy">
      <p className="rounded-2xl bg-[var(--accent-soft)] px-5 py-4 text-[var(--text)]">
        Cancellation terms depend on how much notice we have and whether the vehicle was
        held exclusively for you. Call {site.phoneDisplayFull} and we will tell you exactly
        where you stand — we would rather say it plainly than hide it in small print.
      </p>

      <h2>Cancelling a booking</h2>
      <p>
        Tell us as soon as you know. With reasonable notice there is normally nothing to pay,
        because the vehicle can be put on another job. Cancelling at very short notice, once a
        driver has been assigned and the vehicle held for you, may attract a charge that
        reflects what we have already committed.
      </p>

      <h2>Refunds</h2>
      <p>
        Any advance you have paid is returned by the same method you used, less any charge that
        applies under the paragraph above. We process refunds promptly rather than sitting on
        them.
      </p>

      <h2>Changes to a booking</h2>
      <p>
        Dates, routes, pickup times and even the vehicle can usually be changed, and we would
        far rather move a booking than lose it. A change that increases the distance or the
        duration will change the fare, and we will tell you the new figure before confirming.
        To request a change, call or WhatsApp {site.phoneDisplayFull} as early as you can.
      </p>

      <h2>If we have to cancel</h2>
      <p>
        If a vehicle breaks down or a driver becomes unavailable, our first move is always to
        send a replacement. If we genuinely cannot get you a vehicle, you pay nothing and any
        advance is refunded in full. We will tell you as early as we know rather than on the
        morning of the trip.
      </p>

      <h2>Contact</h2>
      <p>
        {site.name}
        {site.showLegalDetails ? `, operated by ${site.legalName}` : ''}. Call or WhatsApp{' '}
        {site.phoneDisplayFull}, 24 hours a day.
      </p>
    </PolicyLayout>
  );
}
