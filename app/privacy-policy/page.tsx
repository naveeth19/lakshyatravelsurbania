import type { Metadata } from 'next';
import { PolicyLayout } from '@/components/PolicyLayout';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: `How ${site.name} collects and uses the information you share when booking a Force Urbania.`,
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy policy">
      <p>
        This policy explains what {site.name} collects when you contact us about a
        Force Urbania booking, and what we do with it.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Your name, phone number and any trip details you share by call or WhatsApp.</li>
        <li>Pickup and drop locations, travel dates and group size, so we can quote and plan the trip.</li>
        <li>
          Basic analytics about how this website is used, including pages viewed and
          whether you tapped Call or WhatsApp.
        </li>
        <li>
          Advertising identifiers such as a Google click id, when you arrive from a
          Google Ads advert, so we can tell which adverts are working.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To give you a quote and run the trip you book.</li>
        <li>To contact you about that booking.</li>
        <li>To measure and improve our website and advertising.</li>
      </ul>
      <p>We do not sell your information, and we do not send marketing messages you did not ask for.</p>

      <h2>Cookies and analytics</h2>
      <p>
        This website uses Google Analytics and Google Ads conversion tracking. These
        set cookies in your browser to count visits and attribute enquiries to
        adverts. You can block or delete these cookies in your browser settings; the
        site works either way.
      </p>

      <h2>Sharing</h2>
      <p>
        Trip details are shared with the driver assigned to your booking. Beyond that,
        information is shared only where the law requires it.
      </p>

      <h2>Keeping your information</h2>
      <p>
        We keep booking records for as long as we need them to run the booking and to meet our
        tax and legal obligations, and no longer. Enquiries that never become bookings are
        cleared out once they are plainly stale.
      </p>

      <h2>Your choices</h2>
      <p>
        To ask what we hold about you, to correct it, or to have it deleted, call or
        WhatsApp {site.phoneDisplayFull}.
      </p>

      <h2>Contact</h2>
      <p>
        {site.name}
        {site.showLegalDetails
          ? `, operated by ${site.legalName}, GSTIN ${site.gstin}, ${site.address}, Bengaluru`
          : ''}
        . Call or WhatsApp {site.phoneDisplayFull}.
      </p>
    </PolicyLayout>
  );
}
