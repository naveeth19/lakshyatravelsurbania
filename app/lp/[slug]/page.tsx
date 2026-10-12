import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { FleetSection } from '@/components/FleetSection';
import { Wordmark } from '@/components/Header';
import { CallLink, WhatsAppLink } from '@/components/ContactLink';
import { MobileCallBar } from '@/components/MobileCallBar';
import { PhoneIcon, ShieldCheckIcon, WhatsAppIcon } from '@/components/Icons';
import { Reveal } from '@/components/Reveal';
import { Reviews } from '@/components/Reviews';
import { QuoteSection } from '@/components/QuoteSection';
import { fleet } from '@/data/fleet';
import { shortFaqs } from '@/data/faqs';
import { topReasons } from '@/data/reasons';
import { site } from '@/data/site';
import { landingPageBySlug, landingPages } from '@/data/landing-pages';
import { genericMessage } from '@/lib/whatsapp';

export function generateStaticParams() {
  return landingPages.map((lp) => ({ slug: lp.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lp = landingPageBySlug(slug);
  if (!lp) return {};

  return {
    title: lp.title,
    description: lp.sub,
    // Ad landing pages must never compete with the organic pages.
    robots: { index: false, follow: false, nocache: true },
    alternates: {},
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lp = landingPageBySlug(slug);
  if (!lp) notFound();

  const vans = lp.filterSlugs
    ? fleet.filter((v) => lp.filterSlugs!.includes(v.slug))
    : lp.filterTier
      ? fleet.filter((v) => v.tier === lp.filterTier)
      : fleet;

  const message = genericMessage(lp.slug);

  return (
    <>
      {/* Logo and a call pill only — no nav to leak clicks. */}
      <header className="sticky top-0 z-40 border-b border-[var(--line-dark)] bg-[var(--ink)]">
        <div className="shell flex h-[68px] items-center justify-between gap-4">
          <Wordmark href={`/lp/${lp.slug}`} />
          <CallLink location="lp-header" className="btn btn-accent h-11 min-h-11 px-4 text-[15px]">
            <PhoneIcon />
            <span className="tabular-nums">{site.phoneDisplay}</span>
          </CallLink>
        </div>
      </header>

      <main id="main" className="pb-[84px] md:pb-0">
        {/* First screen ------------------------------------------ */}
        <section className="relative isolate overflow-hidden bg-[var(--ink)] text-[var(--on-dark)]">
          <div className="shell grid items-center gap-8 pb-6 pt-9 md:pb-14 md:pt-14 lg:grid-cols-[1.05fr_1fr]">
            <div className="relative z-10">
              <span className="pill pill-dark">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden />
                Available today, 24/7 across Bengaluru
              </span>

              <h1 className="h1 mt-5 text-[clamp(36px,5.1vw,66px)] text-[var(--on-dark)]">{lp.h1}</h1>

              <p className="mt-4 flex flex-wrap items-baseline gap-2">
                <span className="numeral text-[32px] text-[var(--accent)]">{lp.priceAnchor}</span>
                <span className="text-[15px] text-[var(--on-dark-subtle)]">driver included</span>
              </p>

              <p className="lede lede-dark mt-5 max-w-[34rem]">{lp.sub}</p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <CallLink location="lp-hero" className="btn btn-lg btn-accent w-full sm:w-auto">
                  <PhoneIcon />
                  Call {site.phoneDisplay}
                </CallLink>
                <WhatsAppLink
                  location="lp-hero"
                  message={message}
                  className="btn btn-lg btn-wa w-full sm:w-auto"
                >
                  <WhatsAppIcon />
                  Book on WhatsApp
                </WhatsAppLink>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {lp.trustChips.map((chip) => (
                  <li key={chip} className="pill pill-dark">
                    <ShieldCheckIcon className="text-[var(--accent)]" width={15} height={15} />
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto aspect-[4/3] w-full max-w-[580px]">
              <div
                aria-hidden
                className="absolute left-1/2 top-[46%] -z-10 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(233,162,59,.28) 0%, rgba(233,162,59,.1) 45%, rgba(233,162,59,0) 70%)',
                }}
              />
              <Image
                src="/images/van-sticker.webp"
                alt={`Force Urbania available for ${lp.h1.toLowerCase()}`}
                width={1040}
                height={688}
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="absolute inset-x-0 top-1/2 h-auto w-full -translate-y-1/2"
              />
            </div>
          </div>
        </section>

        <FleetSection
          vans={vans}
          initialSlug={lp.preselect}
          initialMode={lp.defaultMode}
          trackingRef={lp.slug}
          title={vans.length === 1 ? 'The rates, in full.' : 'Pick your cabin. See the rate.'}
          sub="Every package and per-km rate is published here. What you see is what you pay."
        />

        {/* Three trust cards ------------------------------------- */}
        <section className="section bg-[var(--ink)]">
          <div className="shell">
            <ul className="grid gap-px overflow-hidden rounded-[22px] border border-[var(--line-dark)] bg-[var(--line-dark)] md:grid-cols-3">
              {topReasons.map((r, i) => (
                <Reveal as="li" key={r.title} delay={i * 0.06} className="bg-[var(--ink)] p-8">
                    <span className="numeral block text-[13px] text-[var(--accent)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="h4 mt-5 text-[var(--on-dark)]">{r.title}</h2>
                    <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--on-dark-muted)]">
                      {r.body}
                    </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <QuoteSection
          source={`lp-${lp.slug}`}
          vanSlug={lp.preselect}
          tripType={lp.defaultMode === 'outstation' ? 'Outstation trip' : ''}
          title="Get your fare in one message."
          sub="Send your date, route and group size. We reply with a fixed, all-in fare — usually within a few minutes."
        />

        <Reviews limit={2} />
        <Faq items={shortFaqs} title="Good to know" />
        <FinalCta trackingRef={lp.slug} />
      </main>

      <footer className="border-t border-[var(--line-dark)] bg-[var(--ink)] py-10">
        <div className="shell flex flex-col gap-3 text-[13.5px] text-[var(--on-dark-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.name}
            {site.showLegalDetails && ` · Operated by ${site.legalName} · GSTIN ${site.gstin}`}
          </p>
          <CallLink location="lp-footer" className="font-semibold text-[var(--on-dark)]">
            Call or WhatsApp 24/7: {site.phoneDisplayFull}
          </CallLink>
        </div>
      </footer>

      <MobileCallBar message={message} />
    </>
  );
}
