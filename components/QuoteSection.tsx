import dynamic from 'next/dynamic';

const QuoteForm = dynamic(() => import('./QuoteForm').then((m) => m.QuoteForm));
import { CallLink } from './ContactLink';
import { PhoneIcon } from './Icons';
import { Reveal } from './Reveal';
import { site } from '@/data/site';

export function QuoteSection({
  source,
  vanSlug,
  destination,
  tripType,
  pickup,
  title = 'Tell us the date. We handle the road.',
  sub = 'One form, one call back. You get the van, the driver and a fixed fare before you commit to anything.',
}: {
  source: string;
  vanSlug?: string;
  destination?: string;
  tripType?: string;
  pickup?: string;
  title?: string;
  sub?: string;
}) {
  return (
    <section id="quote" className="mesh-dark grain section relative scroll-mt-24 overflow-hidden">
      <div className="shell relative z-[2] grid gap-12 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <div>
            <p className="eyebrow eyebrow-light mb-5">Get a fare</p>
            <h2 className="h2 text-[var(--on-dark)]">{title}</h2>
            <p className="lede lede-dark mt-6">{sub}</p>

            <div className="mt-10 border-t border-[var(--line-dark)] pt-8">
              <p className="text-[13px] uppercase tracking-[0.14em] text-[var(--on-dark-subtle)]">
                Rather just call?
              </p>
              <CallLink
                location="quote-section"
                className="numeral mt-3 block text-[clamp(28px,4vw,44px)] leading-none text-[var(--on-dark)] transition-colors hover:text-[var(--accent)]"
              >
                {site.phoneDisplayFull}
              </CallLink>
              <p className="mt-3 flex items-center gap-2 text-[14.5px] text-[var(--on-dark-muted)]">
                <PhoneIcon width={15} height={15} className="text-[var(--accent)]" />
                Answered 24 hours a day
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="elev-3 rounded-[24px] border border-[var(--line-dark)] bg-[var(--ink-2)] p-6 md:p-8">
            <QuoteForm
              source={source}
              vanSlug={vanSlug}
              destination={destination}
              tripType={tripType}
              pickup={pickup}
              dark
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
