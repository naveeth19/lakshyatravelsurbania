import type { Metadata } from 'next';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileCallBar } from '@/components/MobileCallBar';
import { PageHero } from '@/components/PageHero';
import { QuoteSection } from '@/components/QuoteSection';
import { RouteGrid } from '@/components/RouteGrid';
import { routes } from '@/data/routes';
import { outstationFaqs } from '@/data/faqs';
import { site } from '@/data/site';
import { cheapestOutstationPerKm } from '@/data/fleet';
import { formatINR } from '@/lib/pricing';
import { GENERIC_MESSAGE } from '@/lib/whatsapp';
import { JsonLd, breadcrumbListSchema, faqSchema, serviceSchema } from '@/lib/schema';

const trail = [{ href: '/', label: 'Home' }, { label: 'Outstation' }];

export const metadata: Metadata = {
  title: { absolute: `Urbania Outstation Trips from Bengaluru from ${formatINR(cheapestOutstationPerKm)}/km` },
  description: `Force Urbania outstation hire from Bengaluru to Coorg, Ooty, Mysore, Tirupati and Goa. Per-km rates published upfront. Call ${site.phoneDisplay}.`,
  alternates: { canonical: '/outstation' },
};

export default function OutstationHubPage() {
  return (
    <>
      <Header />
      <main id="main" className="pb-[84px] md:pb-0">
        <PageHero
          eyebrow="Outstation"
          title="Outstation trips from Bengaluru"
          sub="Coorg, Ooty, Tirupati, Goa and everywhere between. Per-kilometre rates published for every van, driver allowance included in the quote, and a driver who has done the road before."
          trail={trail}
          waMessage={GENERIC_MESSAGE}
          stats={[
            { value: `${formatINR(cheapestOutstationPerKm)}/km`, label: 'from, Premium 10-seater' },
            { value: '300 km', label: 'minimum billed per day' },
            { value: '₹700', label: 'driver allowance per day' },
            { value: `${routes.length}`, label: 'routes with published fares' },
          ]}
        />

        <RouteGrid
          items={routes}
          eyebrow="Routes"
          heading="Every route, with the fare upfront."
          sub="Starting fares in a Premium 12-seater at ₹35/km. Each route page carries the full fare table for all six vans."
          showAllLink={false}
        />

        <section className="section bg-[var(--surface)]">
          <div className="shell max-w-[800px]">
            <h2 className="h2">How outstation billing works</h2>
            <div className="prose mt-8">
              <p>
                Outstation fares are billed per kilometre rather than as a fixed package, with a
                minimum of 300 km charged per day. That minimum is the part people most often
                miss: a two-day trip to Chikmagalur covers roughly 500 km of actual driving, but
                bills 600 km because two days carry a 600 km floor.
              </p>
              <p>
                On top of the distance there is a driver allowance of ₹700 per day, which covers
                the driver&rsquo;s food and accommodation while he is away from Bengaluru. Tolls,
                parking charges, state border permits and GST are billed at actual and itemised
                on the invoice rather than folded into a round number.
              </p>
              <h3>What a quote includes</h3>
              <ul>
                <li>The vehicle and an experienced driver for the whole trip</li>
                <li>Fuel and the driver&rsquo;s own costs</li>
                <li>Unlimited stops along the route — the van stays with your group</li>
              </ul>
              <h3>What is extra</h3>
              <ul>
                <li>Tolls and parking, at actual</li>
                <li>State permits for trips leaving Karnataka</li>
                <li>GST at the applicable rate</li>
                <li>Any entry fee at a monument, park or forest reserve</li>
              </ul>
              <p>
                Trips that leave Karnataka — Ooty, Tirupati, Goa, Wayanad, Munnar, Pondicherry —
                need a state permit, and the cost depends on the state and the duration. We tell
                you the figure before you book rather than adding it at the end.
              </p>
            </div>
          </div>
        </section>

        <QuoteSection
          source="outstation-hub"
          tripType="Outstation trip"
          title="Planning a trip we have not listed?"
          sub="Tell us the destination and dates. If a van can get there, we will price it the same way — per kilometre, published upfront."
        />

        <Faq items={outstationFaqs} title="Outstation travel: common questions" />
      </main>
      <Footer />
      <MobileCallBar message={GENERIC_MESSAGE} />
      <JsonLd
        data={[
          serviceSchema({
            name: 'Force Urbania outstation rental from Bengaluru',
            description:
              'Outstation minibus and tempo traveller rental with driver from Bengaluru across South India.',
            url: `${site.url}/outstation`,
          }),
          breadcrumbListSchema(trail),
          faqSchema(outstationFaqs),
        ]}
      />
    </>
  );
}
