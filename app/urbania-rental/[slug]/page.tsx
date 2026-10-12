import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Faq } from '@/components/Faq';
import { FleetSection } from '@/components/FleetSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileCallBar } from '@/components/MobileCallBar';
import { PageHero } from '@/components/PageHero';
import { QuoteSection } from '@/components/QuoteSection';
import { RelatedLinks } from '@/components/RelatedLinks';
import { Reveal } from '@/components/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { areas, areaBySlug } from '@/data/areas';
import { featuredRoutes, routeFareFrom } from '@/data/routes';
import { shortFaqs } from '@/data/faqs';
import { areaFaqs } from '@/lib/page-faqs';
import { cheapestLocalFare } from '@/data/fleet';
import { site } from '@/data/site';
import { formatINR } from '@/lib/pricing';
import { JsonLd, areaServiceSchema, breadcrumbListSchema, faqSchema } from '@/lib/schema';

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) return {};

  const title = `Urbania on Rent in ${area.name}, Bengaluru from ${formatINR(cheapestLocalFare)}`;
  return {
    title: { absolute: title },
    description: `9 to 16 seater Force Urbania hire in ${area.name}, Bengaluru. Door pickup, airport runs, outstation trips, rates upfront. Call ${site.phoneDisplay}.`,
    alternates: { canonical: `/urbania-rental/${area.slug}` },
    openGraph: { title, description: area.blurb, url: `${site.url}/urbania-rental/${area.slug}` },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) notFound();

  const wa = `Hi, I need a Force Urbania with pickup in ${area.name}, Bengaluru. Date:  Drop:  No. of people: `;
  const nearby = area.nearby.map(areaBySlug).filter(Boolean);
  // Rendered list keeps two evergreen questions for readers; the schema
  // carries only what is unique to this URL, since duplicate FAQPage
  // markup across pages is ignored by search engines.
  const uniqueFaqs = areaFaqs(area);
  const faqs = [...uniqueFaqs, ...shortFaqs.slice(0, 2)];

  const trail = [
    { href: '/', label: 'Home' },
    { href: '/#fleet', label: 'Bengaluru' },
    { label: area.name },
  ];

  return (
    <>
      <Header />
      <main id="main" className="pb-[84px] md:pb-0">
        <PageHero
          eyebrow="Pickup area"
          title={`Force Urbania on rent in ${area.name}`}
          sub={area.blurb}
          trail={trail}
          waMessage={wa}
          stats={[
            { value: formatINR(cheapestLocalFare), label: 'from, 8 hr / 80 km' },
            { value: `${area.airportKm} km`, label: 'to the airport' },
            { value: area.airportTime.split(' to ')[0], label: 'typical airport run' },
            { value: '24/7', label: 'including 4 AM pickups' },
          ]}
        />

        <section className="section">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div>
                <p className="eyebrow mb-5">{area.name}</p>
                <h2 className="h2">Group travel out of {area.name}.</h2>
                <p className="lede mt-6">{area.intro}</p>
                <div className="prose mt-8">
                  <h3>Getting a 16-seater in and out</h3>
                  <p>{area.pickupNote}</p>
                  <h3>What groups here usually book</h3>
                  <p>{area.commonTrips}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-7 md:p-8">
                <h3 className="h4">Common pickup points</h3>
                <ul className="mt-5 space-y-3">
                  {area.landmarks.map((l) => (
                    <li key={l} className="flex items-start gap-3 text-[15.5px] text-[var(--muted)]">
                      <span
                        aria-hidden
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                      />
                      {l}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-[var(--line)] pt-6">
                  <h3 className="h4">To the airport</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--muted)]">
                    Kempegowda International Airport is about {area.airportKm} km from{' '}
                    {area.name}, which is {area.airportTime} depending on traffic and the hour.
                    For an early flight we normally suggest leaving a clear hour on top of that.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <FleetSection
          title={`Vans available in ${area.name}`}
          sub="Pick a cabin to see the seats, the city package and the outstation fare. Every rate is published."
        />

        <section className="section bg-[var(--ink)]">
          <div className="shell">
            <SectionHead
              dark
              eyebrow="Popular from here"
              title={`Weekend trips from ${area.name}.`}
              sub="Fares in a Premium 12-seater, driver allowance included."
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredRoutes.map((r, i) => (
                <Reveal as="li" key={r.slug} delay={(i % 3) * 0.06}>
                  <a
                    href={`/outstation/${r.slug}`}
                    className="card-dark lift flex h-full items-center justify-between gap-4 p-6"
                  >
                    <span>
                      <span className="block font-semibold text-[var(--on-dark)]">
                        {area.name} to {r.name}
                      </span>
                      <span className="mt-1 block text-[13.5px] text-[var(--on-dark-subtle)]">
                        {r.days} {r.days === 1 ? 'day' : 'days'} · {r.distanceKm} km each way
                      </span>
                    </span>
                    <span className="numeral shrink-0 text-[19px] text-[var(--accent)]">
                      {formatINR(routeFareFrom(r))}
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <QuoteSection
          source={`area-${area.slug}`}
          pickup={area.name}
          title={`Get a fare for a ${area.name} pickup.`}
          sub="Tell us the date, where you are going and how many of you there are. We reply with a fixed fare."
        />

        <Faq items={faqs} title={`Urbania hire in ${area.name}: common questions`} />

        <RelatedLinks
          title="Other areas we pick up from"
          items={[
            ...nearby.map((a) => ({
              href: `/urbania-rental/${a!.slug}`,
              label: a!.name,
              note: a!.blurb,
            })),
            ...areas
              .filter((a) => a.slug !== area.slug && !area.nearby.includes(a.slug))
              .slice(0, 3)
              .map((a) => ({
                href: `/urbania-rental/${a.slug}`,
                label: a.name,
                note: a.blurb,
              })),
          ]}
        />
      </main>
      <Footer />
      <MobileCallBar message={wa} />
      <JsonLd
        data={[areaServiceSchema(area), breadcrumbListSchema(trail), faqSchema(uniqueFaqs)]}
      />
    </>
  );
}
