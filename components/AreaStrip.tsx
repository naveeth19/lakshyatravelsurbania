import Link from 'next/link';
import { areas } from '@/data/areas';
import { ArrowRightIcon } from './Icons';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function AreaStrip() {
  return (
    <section className="section-tight bg-[var(--surface)]">
      <div className="shell">
        <SectionHead
          eyebrow="Pickup"
          title="We pick up anywhere in Bengaluru."
          sub="Door pickup across the city, and one-way drops wherever you need to go."
        />

        <ul className="mt-10 flex flex-wrap gap-2.5">
          {areas.map((a) => (
            <Reveal as="li" key={a.slug}>
              <Link
                href={`/urbania-rental/${a.slug}`}
                className="magnetic pill border border-[var(--line)] bg-[var(--cream)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
              >
                {a.name}
                <ArrowRightIcon className="text-[var(--subtle)]" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
