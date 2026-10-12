import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Faq } from '@/components/Faq';
import { FareTable } from '@/components/FareTable';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileCallBar } from '@/components/MobileCallBar';
import { PageHero } from '@/components/PageHero';
import { QuoteSection } from '@/components/QuoteSection';
import { RelatedLinks } from '@/components/RelatedLinks';
import { Reveal } from '@/components/Reveal';
import { RouteMap } from '@/components/RouteMap';
import { SectionHead } from '@/components/SectionHead';
import { routes, routeBySlug, routeFareFrom } from '@/data/routes';
import { shortFaqs } from '@/data/faqs';
import { routeFaqs } from '@/lib/page-faqs';
import { site } from '@/data/site';
import { formatINR } from '@/lib/pricing';
import { tripMessage } from '@/lib/whatsapp';
import { JsonLd, breadcrumbListSchema, faqSchema, touristTripSchema } from '@/lib/schema';

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = routeBySlug(slug);
  if (!route) return {};

  const from = formatINR(routeFareFrom(route));
  // Kept under ~60 characters so Google does not truncate it in results.
  const title = `Bengaluru to ${route.name} Urbania Hire from ${from}`;

  return {
    title: { absolute: title },
    description: `Force Urbania hire from Bengaluru to ${route.name}: ${route.distanceKm} km each way, ${route.days}-day trip from ${from} with driver. Call ${site.phoneDisplay}.`,
    alternates: { canonical: `/outstation/${route.slug}` },
    openGraph: {
      title,
      description: route.blurb,
      url: `${site.url}/outstation/${route.slug}`,
    },
  };
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = routeBySlug(slug);
  if (!route) notFound();

  const from = formatINR(routeFareFrom(route));
  const wa = tripMessage(route.name, route.days);
  const others = routes.filter((r) => r.slug !== route.slug).slice(0, 6);
  // Rendered list keeps two evergreen questions for readers; the schema
  // carries only what is unique to this URL, since duplicate FAQPage
  // markup across pages is ignored by search engines.
  const uniqueFaqs = routeFaqs(route);
  const faqs = [...uniqueFaqs, ...shortFaqs.slice(0, 2)];

  const trail = [
    { href: '/', label: 'Home' },
    { href: '/outstation', label: 'Outstation' },
    { label: route.name },
  ];

  return (
    <>
      <Header />
      <main id="main" className="pb-[84px] md:pb-0">
        <PageHero
          eyebrow={`${route.days}-day trip`}
          title={`Bengaluru to ${route.name} in a Force Urbania`}
          sub={route.blurb}
          trail={trail}
          waMessage={wa}
          stats={[
            { value: `${route.distanceKm} km`, label: 'each way, approximately' },
            { value: route.duration, label: 'driving time one way' },
            { value: `${route.days}`, label: route.days === 1 ? 'day trip' : 'day trip' },
            { value: from, label: 'from, in a 12-seater' },
          ]}
        />

        {/* Intro + map */}
        <section className="section">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div>
                <p className="eyebrow mb-5">The trip</p>
                <h2 className="h2">
                  What the drive to {route.name} is actually like.
                </h2>
                <p className="lede mt-6">{route.intro}</p>

                <div className="prose mt-8">
                  <h3>Road and permits</h3>
                  <p>{route.roadNotes}</p>
                  <h3>When to go</h3>
                  <p>{route.bestTime}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <RouteMap route={route} />
            </Reveal>
          </div>
        </section>

        {/* Fares */}
        <section className="section bg-[var(--surface)]">
          <div className="shell">
            <SectionHead
              eyebrow="Fares"
              title={`Bengaluru to ${route.name} fare, by vehicle.`}
              sub={`Every rate below is published upfront. A ${route.days}-day trip bills ${route.billableKm} km plus the driver allowance.`}
            />
            <Reveal>
              <div className="mt-12">
                <FareTable route={route} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Highlights */}
        <section className="section">
          <div className="shell">
            <SectionHead
              eyebrow="What you see"
              title={`Places this trip usually covers.`}
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {route.highlights.map((h, i) => (
                <Reveal as="li" key={h.name} delay={(i % 3) * 0.06} className="card h-full p-6">
                  <span className="numeral text-[13px] text-[var(--accent-ink)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="h4 mt-4">{h.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{h.note}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Itinerary */}
        <section className="section bg-[var(--ink)]">
          <div className="shell">
            <SectionHead
              dark
              eyebrow="Itinerary"
              title="How the days usually run."
              sub="A starting point, not a fixed schedule. Tell us what you want to see and the driver works around it."
            />
            <ol className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-[var(--line-dark)] bg-[var(--line-dark)] md:grid-cols-3">
              {route.itinerary.map((d, i) => (
                <Reveal
                  as="li"
                  key={d.title}
                  delay={i * 0.06}
                  className="bg-[var(--ink)] p-8"
                >
                  <span className="numeral text-[44px] leading-none text-[var(--accent)]">
                    {i + 1}
                  </span>
                  <h3 className="h4 mt-5 text-[var(--on-dark)]">{d.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--on-dark-muted)]">
                    {d.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <QuoteSection
          source={`route-${route.slug}`}
          destination={route.name}
          tripType="Outstation trip"
          title={`Get your exact ${route.name} fare.`}
          sub={`Tell us your dates and group size and we will send a fixed, all-in fare for the ${route.days}-day trip. No obligation.`}
        />

        <Faq items={faqs} title={`Bengaluru to ${route.name}: common questions`} />

        <RelatedLinks
          title="Other trips from Bengaluru"
          items={others.map((r) => ({
            href: `/outstation/${r.slug}`,
            label: `Bengaluru to ${r.name}`,
            note: `${r.days} ${r.days === 1 ? 'day' : 'days'} · from ${formatINR(routeFareFrom(r))}`,
          }))}
        />

        <div className="shell pb-16">
          <Link href="/outstation" className="btn btn-outline">
            See all outstation routes
          </Link>
        </div>
      </main>
      <Footer />
      <MobileCallBar message={wa} />
      <JsonLd
        data={[
          touristTripSchema(route),
          breadcrumbListSchema(trail),
          faqSchema(uniqueFaqs),
        ]}
      />
    </>
  );
}
