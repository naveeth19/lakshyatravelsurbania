import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileCallBar } from '@/components/MobileCallBar';
import { PageHero } from '@/components/PageHero';
import { QuoteSection } from '@/components/QuoteSection';
import { Reveal } from '@/components/Reveal';
import { SectionHead } from '@/components/SectionHead';
import {
  DRIVER_ALLOWANCE_PER_DAY,
  EXTRAS_NOTE,
  OUTSTATION_MIN_KM_PER_DAY,
  TIER_NOTES,
  cheapestLocalFare,
  fleet,
  tiers,
} from '@/data/fleet';
import { routes, routeFareFrom } from '@/data/routes';
import { site } from '@/data/site';
import { formatINR, oneDayOutstationFrom } from '@/lib/pricing';
import { GENERIC_MESSAGE } from '@/lib/whatsapp';
import { pricingFaqs } from '@/data/faqs';
import { JsonLd, allVanSchemas, breadcrumbListSchema, faqSchema } from '@/lib/schema';

const trail = [{ href: '/', label: 'Home' }, { label: 'Pricing' }];

export const metadata: Metadata = {
  title: { absolute: 'Urbania Rent Price in Bengaluru | Full Rate Card' },
  description: `Full Force Urbania rate card for Bengaluru: 8 hr / 80 km packages, per-km outstation rates and driver allowance for all six vans. Call ${site.phoneDisplay}.`,
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="main" className="pb-[84px] md:pb-0">
        <PageHero
          eyebrow="Rate card"
          title="Force Urbania rent price in Bengaluru"
          sub="The whole rate card on one page. Local packages, per-kilometre outstation rates and every extra, for all six vans. No hidden numbers and nothing quoted on request."
          trail={trail}
          waMessage={GENERIC_MESSAGE}
          stats={[
            { value: formatINR(cheapestLocalFare), label: 'lowest 8 hr / 80 km package' },
            { value: '₹34/km', label: 'lowest outstation rate' },
            { value: `${formatINR(DRIVER_ALLOWANCE_PER_DAY)}`, label: 'driver allowance per day' },
            { value: `${OUTSTATION_MIN_KM_PER_DAY} km`, label: 'minimum billed per day' },
          ]}
        />

        {/* Local packages */}
        <section className="section">
          <div className="shell">
            <SectionHead
              eyebrow="Within the city"
              title="Local packages in Bengaluru."
              sub="For sightseeing, airport runs, wedding days and anything that stays inside the city."
            />

            <Reveal>
              <div className="mt-12 overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <caption className="sr-only">Local hire packages by vehicle</caption>
                  <thead>
                    <tr className="border-b border-[var(--line)]">
                      <Th>Vehicle</Th>
                      <Th>Seats</Th>
                      <Th>8 hr / 80 km</Th>
                      <Th>12 hr / 100 km</Th>
                      <Th>Extra km</Th>
                      <Th right>Extra hour</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {fleet.map((v) => (
                      <tr key={v.slug} className="border-b border-[var(--line)] last:border-0">
                        <th scope="row" className="py-4 pr-4 font-normal">
                          <Link
                            href={`/fleet/${v.slug}`}
                            className="font-semibold text-[var(--text)] underline-offset-4 hover:underline"
                          >
                            {v.name}
                          </Link>
                          <span className="mt-0.5 block text-[13px] text-[var(--subtle)]">
                            {v.tier}
                          </span>
                        </th>
                        <Td>{v.seats}</Td>
                        <Td strong>{formatINR(v.local8h80km)}</Td>
                        <Td strong>{formatINR(v.local12h100km)}</Td>
                        <Td>{formatINR(v.extraKm)}</Td>
                        <Td right>{formatINR(v.extraHour)}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <p className="mt-5 text-[13.5px] text-[var(--subtle)]">{EXTRAS_NOTE}</p>
          </div>
        </section>

        {/* Outstation */}
        <section className="section bg-[var(--surface)]">
          <div className="shell">
            <SectionHead
              eyebrow="Out of town"
              title="Outstation rates."
              sub="Billed per kilometre with a 300 km per day minimum, plus the driver allowance."
            />

            <Reveal>
              <div className="mt-12 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <caption className="sr-only">Outstation rates by vehicle</caption>
                  <thead>
                    <tr className="border-b border-[var(--line)]">
                      <Th>Vehicle</Th>
                      <Th>Seats</Th>
                      <Th>Per km</Th>
                      <Th right>One day from</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {fleet.map((v) => (
                      <tr key={v.slug} className="border-b border-[var(--line)] last:border-0">
                        <th scope="row" className="py-4 pr-4 font-normal">
                          <Link
                            href={`/fleet/${v.slug}`}
                            className="font-semibold text-[var(--text)] underline-offset-4 hover:underline"
                          >
                            {v.name}
                          </Link>
                        </th>
                        <Td>{v.seats}</Td>
                        <Td strong>{formatINR(v.outstationPerKm)}</Td>
                        <Td right strong>
                          {formatINR(oneDayOutstationFrom(v))}
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <p className="mt-5 text-[13.5px] text-[var(--subtle)]">
              &ldquo;One day from&rdquo; is 300 km at the vehicle rate plus one driver allowance.
            </p>
          </div>
        </section>

        {/* Popular routes */}
        <section className="section">
          <div className="shell">
            <SectionHead
              eyebrow="Worked examples"
              title="What real trips cost."
              sub="Premium 12-seater at ₹35/km, driver allowance included, tolls and permits extra."
            />
            <Reveal>
              <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {routes.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/outstation/${r.slug}`}
                      className="card lift flex items-center justify-between gap-4 p-5"
                    >
                      <span>
                        <span className="block font-semibold">Bengaluru to {r.name}</span>
                        <span className="mt-0.5 block text-[13px] text-[var(--subtle)]">
                          {r.days} {r.days === 1 ? 'day' : 'days'} · {r.billableKm} km billed
                        </span>
                      </span>
                      <span className="numeral shrink-0 text-[19px]">
                        {formatINR(routeFareFrom(r))}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* What's included */}
        <section className="section bg-[var(--ink)]">
          <div className="shell grid gap-10 md:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <p className="eyebrow eyebrow-light mb-5">Included</p>
                <h2 className="h3 text-[var(--on-dark)]">What the fare covers</h2>
                <ul className="mt-6 space-y-3">
                  {[
                    'The vehicle and an experienced driver',
                    'Fuel for the whole trip',
                    'The driver’s own food and stay on outstation trips',
                    'Unlimited stops along your route',
                    'A cleaned cabin and a checked air conditioner',
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-3 text-[15.5px] text-[var(--on-dark-muted)]">
                      <Tick />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <p className="eyebrow eyebrow-light mb-5">Extra</p>
                <h2 className="h3 text-[var(--on-dark)]">What is billed on top</h2>
                <ul className="mt-6 space-y-3">
                  {[
                    'Tolls and parking, at actual',
                    'State permits for trips leaving Karnataka',
                    'GST at the applicable rate',
                    'Entry fees at monuments, parks and reserves',
                    'Any distance or time beyond the booked package',
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-3 text-[15.5px] text-[var(--on-dark-muted)]">
                      <span
                        aria-hidden
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--on-dark-subtle)]"
                      />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Tier explainer */}
        <section className="section">
          <div className="shell max-w-[800px]">
            <h2 className="h2">Luxury Maharaja or Premium?</h2>
            <div className="prose mt-8">
              <p>
                Both tiers seat the same kind of group and come with the same driver and the same
                service. The difference is the cabin.
              </p>
              {tiers.map((t) => (
                <div key={t}>
                  <h3>{t}</h3>
                  <p>{TIER_NOTES[t]}</p>
                </div>
              ))}
              <p>
                In practice, Premium is the right answer for an airport run, a day of city
                sightseeing or a student group, and Maharaja earns its extra cost on long highway
                days and anything where guests are dressed up.
              </p>
            </div>
          </div>
        </section>

        <QuoteSection
          source="pricing"
          title="Want this priced for your exact trip?"
          sub="Send your dates, route and headcount. We reply with a fixed, all-in fare rather than a range."
        />

        <Faq items={pricingFaqs} title="Pricing: common questions" />
      </main>
      <Footer />
      <MobileCallBar message={GENERIC_MESSAGE} />
      <JsonLd data={[...allVanSchemas(), breadcrumbListSchema(trail), faqSchema(pricingFaqs)]} />
    </>
  );
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th
      scope="col"
      className={`py-3 pr-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--subtle)] ${
        right ? 'pr-0 text-right' : ''
      }`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  right,
  strong,
}: {
  children: React.ReactNode;
  right?: boolean;
  strong?: boolean;
}) {
  return (
    <td
      className={`py-4 pr-4 tabular-nums ${right ? 'pr-0 text-right' : ''} ${
        strong ? 'numeral text-[18px] text-[var(--text)]' : 'text-[var(--muted)]'
      }`}
    >
      {children}
    </td>
  );
}

function Tick() {
  return (
    <span
      aria-hidden
      className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent)]"
    >
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="var(--ink)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 12 4.5 4.5L19 7" />
      </svg>
    </span>
  );
}
