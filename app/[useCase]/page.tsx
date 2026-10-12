import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Faq } from '@/components/Faq';
import { FleetSection } from '@/components/FleetSection';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { Header } from '@/components/Header';
import { MobileCallBar } from '@/components/MobileCallBar';
import { PageHero } from '@/components/PageHero';
import { QuoteSection } from '@/components/QuoteSection';
import { RelatedLinks } from '@/components/RelatedLinks';
import { Reveal } from '@/components/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { useCases, findUseCase } from '@/data/use-cases';
import { fleet, vanBySlug, cheapestLocalFare } from '@/data/fleet';
import { shortFaqs } from '@/data/faqs';
import { faqsForUseCase } from '@/lib/page-faqs';
import { site } from '@/data/site';
import { formatINR } from '@/lib/pricing';
import { JsonLd, breadcrumbListSchema, faqSchema, serviceSchemaForUseCase } from '@/lib/schema';

export function generateStaticParams() {
  return useCases.map((u) => ({ useCase: u.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ useCase: string }>;
}): Promise<Metadata> {
  const { useCase } = await params;
  const u = findUseCase(useCase);
  if (!u) return {};

  return {
    title: { absolute: u.title },
    description: u.description,
    alternates: { canonical: `/${u.slug}` },
    openGraph: { title: u.title, description: u.description, url: `${site.url}/${u.slug}` },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ useCase: string }>;
}) {
  const { useCase } = await params;
  const u = findUseCase(useCase);
  if (!u) notFound();

  const wa = `${u.waIntent} Date:  Pickup:  Drop:  No. of people: `;
  const recommended = u.recommendSlugs.map(vanBySlug).filter(Boolean);
  const vans = u.preferTier ? fleet.filter((v) => v.tier === u.preferTier) : fleet;
  // Rendered list keeps two evergreen questions for readers; the schema
  // carries only what is unique to this URL, since duplicate FAQPage
  // markup across pages is ignored by search engines.
  const uniqueFaqs = faqsForUseCase(u);
  const faqs = [...uniqueFaqs, ...shortFaqs.slice(0, 2)];

  const trail = [{ href: '/', label: 'Home' }, { label: u.name }];

  return (
    <>
      <Header />
      <main id="main" className="pb-[84px] md:pb-0">
        <PageHero
          eyebrow={u.name}
          title={u.h1}
          sub={u.intro}
          trail={trail}
          waMessage={wa}
          stats={[
            { value: formatINR(cheapestLocalFare), label: 'from, 8 hr / 80 km' },
            { value: '9–16', label: 'seats per vehicle' },
            { value: '24/7', label: 'any hour, any day' },
            { value: 'Multi-van', label: 'bookings welcome' },
          ]}
        />

        <section className="section">
          <div className="shell">
            <SectionHead
              eyebrow="Why this van"
              title={`What makes an Urbania right for ${u.name.toLowerCase()}.`}
            />
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {u.points.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 0.06} className="card h-full p-7">
                  <span className="numeral text-[13px] text-[var(--accent-ink)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="h4 mt-4">{p.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--muted)]">{p.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <FleetSection
          vans={vans}
          initialSlug={recommended[0]?.slug}
          title="The vans we usually send"
          sub="Every rate is published. Pick a cabin to see the seats, the city package and the outstation fare."
        />

        <section className="section bg-[var(--ink)]">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div>
                <p className="eyebrow eyebrow-light mb-5">Booking</p>
                <h2 className="h2 text-[var(--on-dark)]">What to tell us when you book.</h2>
                <p className="lede lede-dark mt-6">
                  The more of this we have upfront, the more accurate the fare and the fewer
                  surprises on the day.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="space-y-px overflow-hidden rounded-[22px] border border-[var(--line-dark)] bg-[var(--line-dark)]">
                {u.checklist.map((c, i) => (
                  <li key={c} className="flex items-start gap-4 bg-[var(--ink)] p-5">
                    <span className="numeral w-7 shrink-0 text-[15px] text-[var(--accent)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15.5px] leading-relaxed text-[var(--on-dark-muted)]">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <Gallery />

        <QuoteSection
          source={`use-case-${u.slug}`}
          tripType={u.name}
          vanSlug={recommended[0]?.slug}
          title={`Get a fare for your ${u.name.toLowerCase()} booking.`}
          sub="Send the details and we reply with a fixed, all-in fare. No obligation and no follow-up spam."
        />

        <Faq items={faqs} title={`${u.name}: common questions`} />

        <RelatedLinks
          title="We also handle"
          items={useCases
            .filter((o) => o.slug !== u.slug)
            .map((o) => ({ href: `/${o.slug}`, label: o.name, note: o.footerLabel }))}
        />
      </main>
      <Footer />
      <MobileCallBar message={wa} />
      <JsonLd
        data={[serviceSchemaForUseCase(u), breadcrumbListSchema(trail), faqSchema(uniqueFaqs)]}
      />
    </>
  );
}
