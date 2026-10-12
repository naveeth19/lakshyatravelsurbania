import dynamic from 'next/dynamic';
import type { Mode } from './FleetSelector';

/*
 * The selector is the heaviest client component on the page and sits well
 * below the fold. Splitting its chunk keeps it out of the critical path, so it
 * stops competing with the hero for the main thread. It still renders on the
 * server, so the markup and its prices are in the HTML for crawlers.
 */
const FleetSelector = dynamic(() => import('./FleetSelector').then((m) => m.FleetSelector));
import { CallLink } from './ContactLink';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';
import type { Van } from '@/data/fleet';

export function FleetSection({
  vans,
  initialSlug,
  initialMode,
  trackingRef,
  title = 'Six Urbanias. Every rate on the table.',
  sub = 'Pick a cabin to see the seats, the city package and the outstation fare. What you see is what you pay.',
}: {
  vans?: Van[];
  initialSlug?: string;
  initialMode?: Mode;
  trackingRef?: string;
  title?: string;
  sub?: string;
}) {
  return (
    <section id="fleet" className="mesh-cream section scroll-mt-24">
      <div className="shell">
        <SectionHead
          eyebrow="The fleet"
          title={title}
          sub={sub}
          action={
            <CallLink location="fleet-heading" className="btn btn-outline">
              Not sure? Call and we&apos;ll suggest one
            </CallLink>
          }
        />

        <Reveal>
          <div className="mt-14">
            <FleetSelector
              vans={vans}
              initialSlug={initialSlug}
              initialMode={initialMode}
              trackingRef={trackingRef}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
