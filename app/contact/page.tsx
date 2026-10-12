import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileCallBar } from '@/components/MobileCallBar';
import { PageHero } from '@/components/PageHero';
import { QuoteForm } from '@/components/QuoteForm';
import { CallLink, WhatsAppLink } from '@/components/ContactLink';
import { PhoneIcon, WhatsAppIcon, ClockIcon } from '@/components/Icons';
import { Reveal } from '@/components/Reveal';
import { Faq } from '@/components/Faq';
import { areas } from '@/data/areas';
import { site } from '@/data/site';
import { GENERIC_MESSAGE } from '@/lib/whatsapp';
import { contactFaqs } from '@/data/faqs';
import { JsonLd, breadcrumbListSchema, faqSchema, localBusinessSchema } from '@/lib/schema';

const trail = [{ href: '/', label: 'Home' }, { label: 'Contact' }];

export const metadata: Metadata = {
  title: 'Contact Us | Call 80880 58825, 24/7',
  description: `Call or WhatsApp ${site.phoneDisplayFull} any hour of the day to book a Force Urbania in Bengaluru. Or send your trip details and we will call you back.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="pb-[84px] md:pb-0">
        <PageHero
          eyebrow="Contact"
          title="Talk to us"
          sub="One number, answered around the clock. Call it, message it, or leave your details and we will ring you back."
          trail={trail}
          waMessage={GENERIC_MESSAGE}
        />

        <section className="section">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div>
                <h2 className="h3">The quickest way</h2>
                <CallLink
                  location="contact-page"
                  className="numeral mt-5 block text-[clamp(32px,5vw,52px)] leading-none transition-colors hover:text-[var(--accent)]"
                >
                  {site.phoneDisplayFull}
                </CallLink>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <CallLink location="contact-page" className="btn btn-lg btn-accent">
                    <PhoneIcon />
                    Call now
                  </CallLink>
                  <WhatsAppLink
                    location="contact-page"
                    message={GENERIC_MESSAGE}
                    className="btn btn-lg btn-wa"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </WhatsAppLink>
                </div>

                {/* A plain list: dt/dd must be direct children of dl, and these
                    groups need an icon alongside, so a list is the honest markup. */}
                <ul className="mt-12 space-y-6 border-t border-[var(--line)] pt-8">
                  <li className="flex gap-4">
                    <ClockIcon className="mt-1 shrink-0 text-[var(--accent-ink)]" />
                    <div>
                      <h3 className="font-semibold">Hours</h3>
                      <p className="mt-1 text-[15.5px] text-[var(--muted)]">
                        Open 24 hours, every day of the year, including the 4 AM airport runs
                        and the 1 AM Tirupati departures.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <PhoneIcon className="mt-1 shrink-0 text-[var(--accent-ink)]" />
                    <div>
                      <h3 className="font-semibold">Where we operate</h3>
                      <p className="mt-1 text-[15.5px] text-[var(--muted)]">
                        Pickup anywhere in Bengaluru, and outstation trips across Karnataka,
                        Tamil Nadu, Kerala, Andhra Pradesh and Goa.
                      </p>
                    </div>
                  </li>

                  {site.showLegalDetails && (
                    <li className="flex gap-4">
                      <span aria-hidden className="mt-1 w-[18px] shrink-0" />
                      <div>
                        <h3 className="font-semibold">Registered office</h3>
                        <p className="mt-1 text-[15.5px] text-[var(--muted)]">
                          {site.legalName}
                          <br />
                          {site.address}, Bengaluru
                          <br />
                          GSTIN {site.gstin}
                        </p>
                      </div>
                    </li>
                  )}
                </ul>

                <div className="mt-10 border-t border-[var(--line)] pt-8">
                  <h3 className="h4">Areas we pick up from</h3>
                  <p className="mt-3 text-[15px] text-[var(--muted)]">
                    {areas.map((a) => a.name).join(' · ')} — and everywhere else in the city.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
                <h2 className="h3">Or leave your details</h2>
                <p className="mt-2 text-[15px] text-[var(--muted)]">
                  We call back within a few minutes during the day, and first thing in the
                  morning if you send it overnight.
                </p>
                <div className="mt-7">
                  <QuoteForm source="contact" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        <Faq items={contactFaqs} title="Getting in touch: common questions" />
      </main>
      <Footer />
      <MobileCallBar message={GENERIC_MESSAGE} />
      <JsonLd data={[localBusinessSchema(), breadcrumbListSchema(trail), faqSchema(contactFaqs)]} />
    </>
  );
}
