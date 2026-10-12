import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileCallBar } from '@/components/MobileCallBar';
import { PageHero } from '@/components/PageHero';
import { QuoteSection } from '@/components/QuoteSection';
import { Faq } from '@/components/Faq';
import { Reveal } from '@/components/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { reasons } from '@/data/reasons';
import { fleet } from '@/data/fleet';
import { GENERIC_MESSAGE } from '@/lib/whatsapp';
import { companyFaqs } from '@/data/faqs';
import { JsonLd, breadcrumbListSchema, faqSchema, localBusinessSchema } from '@/lib/schema';

const trail = [{ href: '/', label: 'Home' }, { label: 'About' }];

export const metadata: Metadata = {
  title: 'About Us | Urbania Rental in Bengaluru',
  description: `Who we are: a Force Urbania rental operator in Bengaluru running ${fleet.length} cabins from 9 to 16 seats, with experienced drivers and rates published upfront.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main" className="pb-[84px] md:pb-0">
        <PageHero
          eyebrow="About"
          title="We move groups, and that is all we do."
          sub="One vehicle, done properly. Six Force Urbania cabins from 9 to 16 seats, experienced drivers, and every rate published on the website rather than quoted on request."
          trail={trail}
          waMessage={GENERIC_MESSAGE}
          stats={[
            { value: `${fleet.length}`, label: 'cabins in the fleet' },
            { value: '9–16', label: 'seats per vehicle' },
            { value: '24/7', label: 'phone answered' },
            { value: '100%', label: 'rates published upfront' },
          ]}
        />

        <section className="section">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div>
                <p className="eyebrow mb-5">What we do</p>
                <h2 className="h2">Group travel, without the usual nonsense.</h2>
                <div className="prose mt-7">
                  <p>
                    Most people booking a vehicle for ten or fifteen passengers have had the same
                    experience: a number quoted on the phone, a different number on the day, and
                    a vehicle that turns out to be older and smaller than the photograph
                    suggested.
                  </p>
                  <p>
                    We built this business around removing those three problems. Every rate for
                    every van is on this website, including the per-kilometre outstation rate,
                    the driver allowance and exactly which extras are billed on top. The fare we
                    confirm before the trip is the fare on the invoice afterwards.
                  </p>
                  <h3>Why only the Urbania</h3>
                  <p>
                    The Force Urbania is the right vehicle for a group of nine to sixteen with
                    luggage: it has the headroom to stand up in, proper air conditioning, and
                    reclining or pushback seats rather than bus benches. Running one model means
                    our drivers know it inside out and our maintenance is straightforward.
                  </p>
                  <h3>Drivers</h3>
                  <p>
                    Every trip comes with a driver — there is no self-drive option, and there
                    will not be. Our drivers are verified and have years of experience on
                    Karnataka and South India highways, including the ghat sections to Coorg,
                    Ooty, Chikmagalur and Munnar that make up a large share of our work.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <figure className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[var(--surface-2)]">
                <Image
                  src="/images/van-side-profile.webp"
                  alt="A Force Urbania from the side, showing its full length and passenger windows"
                  fill
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </section>

        <section className="section bg-[var(--ink)]">
          <div className="shell">
            <SectionHead
              dark
              eyebrow="How we work"
              title="Six things we hold ourselves to."
            />
            <ul className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-[var(--line-dark)] bg-[var(--line-dark)] sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((r, i) => (
                <Reveal as="li" key={r.title} delay={(i % 3) * 0.06} className="bg-[var(--ink)] p-8">
                  <span className="numeral block text-[13px] text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="h4 mt-5 text-[var(--on-dark)]">{r.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--on-dark-muted)]">
                    {r.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHead
              eyebrow="The fleet"
              title="Six cabins, every rate published."
              action={
                <Link href="/pricing" className="btn btn-outline">
                  See the full rate card
                </Link>
              }
            />
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {fleet.map((v) => (
                <li key={v.slug}>
                  <Link href={`/fleet/${v.slug}`} className="card lift flex items-center gap-4 p-5">
                    <span
                      aria-hidden
                      className="numeral grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--cream)] text-[18px]"
                    >
                      {v.seats}
                    </span>
                    <span>
                      <span className="block font-semibold">{v.name}</span>
                      <span className="mt-0.5 block text-[13px] text-[var(--subtle)]">
                        {v.tier}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Faq items={companyFaqs} title="About us: common questions" />

        <QuoteSection source="about" />
      </main>
      <Footer />
      <MobileCallBar message={GENERIC_MESSAGE} />
      <JsonLd data={[localBusinessSchema(), breadcrumbListSchema(trail), faqSchema(companyFaqs)]} />
    </>
  );
}
