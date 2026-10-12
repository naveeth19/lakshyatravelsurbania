import { reasons } from '@/data/reasons';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function WhyUs() {
  return (
    <section id="why" className="mesh-dark grain section relative scroll-mt-24 overflow-hidden">
      <div className="shell relative z-[2]">
        <SectionHead
          dark
          eyebrow="Why us"
          title={
            <>
              Booked once,
              <br />
              booked again.
            </>
          }
          sub="Why families, wedding planners and office teams keep coming back."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-[var(--line-dark)] bg-[var(--line-dark)] sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal
              as="li"
              key={r.title}
              delay={(i % 3) * 0.06}
              className="spotlight group bg-[var(--ink)] p-8 transition-colors duration-300 hover:bg-[var(--ink-2)]"
            >
              <span className="numeral block text-[13px] text-[var(--accent)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="h4 mt-5 text-[var(--on-dark)]">{r.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--on-dark-muted)]">
                {r.body}
              </p>
              <span className="mt-6 inline-block text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--on-dark-subtle)]">
                {r.tag}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
