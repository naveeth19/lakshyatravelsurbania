import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BadgeMarquee } from '@/components/BadgeMarquee';
import { BookingCard } from '@/components/BookingCard';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileCallBar } from '@/components/MobileCallBar';
import { RateTables } from '@/components/RateTables';
import { Reveal } from '@/components/Reveal';
import { SeatMap } from '@/components/SeatMap';
import { ArrowRightIcon } from '@/components/Icons';
import { TIER_NOTES, fleet, vanBySlug } from '@/data/fleet';
import { shortFaqs } from '@/data/faqs';
import { vanFaqs } from '@/lib/page-faqs';
import { gallery } from '@/data/gallery';
import { site } from '@/data/site';
import { formatINR } from '@/lib/pricing';
import { vanMessage } from '@/lib/whatsapp';
import { JsonLd, breadcrumbSchema, faqSchema, vanProductSchema } from '@/lib/schema';

export function generateStaticParams() {
  return fleet.map((van) => ({ slug: van.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const van = vanBySlug(slug);
  if (!van) return {};

  const title = `${van.name} Rent Bengaluru from ${formatINR(van.local8h80km)}`;
  return {
    title: { absolute: title },
    description: `${formatINR(van.local8h80km)} for 8 hr / 80 km in Bengaluru, ${formatINR(van.outstationPerKm)}/km outstation, driver included. ${van.seats} seats. Call ${site.phoneDisplay}.`,
    alternates: { canonical: `/fleet/${van.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: van.description,
      url: `${site.url}/fleet/${van.slug}`,
    },
  };
}

export default async function FleetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const van = vanBySlug(slug);
  if (!van) notFound();

  const others = fleet.filter((v) => v.slug !== van.slug);
  // Rendered list keeps two evergreen questions for readers; the schema
  // carries only what is unique to this URL, since duplicate FAQPage
  // markup across pages is ignored by search engines.
  const uniqueFaqs = vanFaqs(van);
  const faqs = [...uniqueFaqs, ...shortFaqs.slice(0, 2)];

  return (
    <>
      <Header />
      <main id="main" className="pb-[84px] md:pb-0">
        {/* Breadcrumb + hero ------------------------------------- */}
        <div className="shell pt-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-[var(--subtle)]">
              <li>
                <Link href="/" className="hover:text-[var(--ink)]">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#fleet" className="hover:text-[var(--ink)]">Fleet</Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-[var(--ink)]">{van.shortName}</li>
            </ol>
          </nav>
        </div>

        <section className="shell grid gap-10 pb-4 pt-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill bg-[var(--teal)] text-white">{van.tier}</span>
              {van.badge && (
                <span className="pill bg-[var(--accent)] text-[var(--ink)]">{van.badge}</span>
              )}
              <span className="pill border border-[var(--line)] bg-white text-[var(--muted)]">
                {van.seats} seats + driver
              </span>
            </div>

            <h1 className="h1 mt-5 text-[clamp(34px,5vw,58px)]">
              {van.name} in Bengaluru
            </h1>
            <p className="lede mt-5 max-w-[38rem]">{van.description}</p>
            <p className="mt-3 max-w-[38rem] text-[15px] text-[var(--muted)]">
              {TIER_NOTES[van.tier]} Pickup anywhere in Bengaluru, from Whitefield and
              Electronic City to Hebbal and Kempegowda International Airport.
            </p>

            {/* Gallery ------------------------------------------- */}
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.map((img) => (
                <figure
                  key={img.src}
                  className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-[var(--surface-2)]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 44vw, 22vw"
                    className="object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>

          <div className="lg:pt-4">
            <BookingCard van={van} />
          </div>
        </section>

        {/* Seats + rates ----------------------------------------- */}
        <section className="section">
          <div className="shell grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12">
            <Reveal>
              <div>
                <h2 className="h3">Seat plan</h2>
                <p className="mt-2 text-[15px] text-[var(--muted)]">
                  {van.seatPlan}, front row first. {van.seats} passenger seats plus the driver.
                </p>
                <div className="card mt-5 bg-[var(--surface-2)] py-4">
                  <SeatMap seatPlan={van.seatPlan} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <h2 className="h3">Rates</h2>
                <p className="mt-2 text-[15px] text-[var(--muted)]">
                  Published upfront, the same rate you pay on the day.
                </p>
                <div className="mt-5">
                  <RateTables van={van} />
                </div>

                <h2 className="h3 mt-10">Ideal for</h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {van.idealFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-[15px]"
                    >
                      <span
                        aria-hidden
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)]"
                      >
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--ink)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5 12 4.5 4.5L19 7" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <BadgeMarquee />
        <Faq items={faqs} title={`${van.shortName} Urbania: common questions`} />

        {/* Other vans -------------------------------------------- */}
        <section className="section">
          <div className="shell">
            <h2 className="h2">Other Urbanias</h2>
            <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {others.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/fleet/${v.slug}`}
                    className="card group flex h-full flex-col justify-between gap-5 p-5 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_16px_36px_-20px_rgba(30,42,53,.45)]"
                  >
                    <div>
                      <span
                        aria-hidden
                        className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--cream)] font-[family-name:var(--font-display)] text-[17px] font-bold"
                      >
                        {v.seats}
                      </span>
                      <p className="mt-3 font-[family-name:var(--font-display)] text-[16px] font-semibold leading-snug">
                        {v.name}
                      </p>
                      <p className="mt-1 text-[13px] text-[var(--subtle)]">{v.tier}</p>
                    </div>
                    <p className="flex items-center justify-between gap-2 text-[15px] font-semibold tabular-nums">
                      {formatINR(v.local8h80km)}
                      <ArrowRightIcon className="text-[var(--teal)] transition-transform duration-200 group-hover:translate-x-0.5" />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
      <MobileCallBar message={vanMessage(van, 'local')} />
      <JsonLd
        data={[vanProductSchema(van), breadcrumbSchema(van), faqSchema(uniqueFaqs)]}
      />
    </>
  );
}
