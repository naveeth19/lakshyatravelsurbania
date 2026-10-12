import Link from 'next/link';
import { CountUp } from './CountUp';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';
import { ArrowRightIcon } from './Icons';
import { specGroups, specPromise, CONFIGURATION_COUNT } from '@/data/specs';
import { fleet } from '@/data/fleet';

/**
 * Makes the "one platform" claim concrete: the spec axes we can combine,
 * and an honest split between the six we publish rates for and the rest we
 * arrange.
 */
export function OnePlatform() {
  return (
    <section
      id="platform"
      className="mesh-dark grain section relative scroll-mt-24 overflow-hidden"
    >
      <div className="shell relative z-[2]">
        <SectionHead
          dark
          eyebrow="One stop"
          title={
            <>
              Every Urbania spec,
              <br />
              arranged from one number.
            </>
          }
          sub="Most operators show you what is parked in their yard. We start from what your group actually needs, then source it."
        />

        {/* Spec axes */}
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specGroups.map((g, i) => (
            <Reveal as="li" key={g.key} delay={(i % 4) * 0.05} className="h-full">
              <div className="tilt spotlight beam elev-2 h-full rounded-[20px] border border-[var(--line-dark)] bg-[var(--ink-2)] p-7">
                <div className="tilt-layer-sm">
                  <span className="numeral block text-[13px] text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="h4 mt-4 text-[var(--on-dark)]">{g.label}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--on-dark-subtle)]">
                    {g.note}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {g.options.map((o) => (
                      <li
                        key={o}
                        className="rounded-full border border-[var(--line-dark)] bg-[rgba(255,255,255,.04)] px-2.5 py-1 text-[12.5px] text-[var(--on-dark-muted)]"
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* The honest split */}
        <Reveal>
          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
            <div className="tilt spotlight elev-3 rounded-[20px] border border-[var(--accent)]/35 bg-[rgba(233,162,59,.07)] p-8">
              <div className="tilt-layer-sm">
                <p className="numeral text-[clamp(52px,7vw,82px)] leading-none text-[var(--accent)]">
                  <CountUp to={CONFIGURATION_COUNT} suffix="+" />
                </p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--on-dark-muted)]">
                  specs we can arrange across seating, comfort tier, seat type and cabin
                  extras — far more than any single yard keeps parked.
                </p>
                <p className="mt-5 border-t border-[var(--line-dark)] pt-5 text-[14px] text-[var(--on-dark-subtle)]">
                  <strong className="font-semibold text-[var(--on-dark)]">
                    {fleet.length} of them
                  </strong>{' '}
                  we run ourselves with rates published on this site. The rest we arrange from a
                  vetted network, at a fare fixed before you book.
                </p>
              </div>
            </div>

            <ol className="grid gap-4 sm:grid-cols-3">
              {specPromise.map((s, i) => (
                <li
                  key={s.title}
                  className="tilt spotlight elev-2 flex h-full flex-col rounded-[20px] border border-[var(--line-dark)] bg-[var(--ink-2)] p-7"
                >
                  <div className="tilt-layer-sm flex h-full flex-col">
                    <span
                      aria-hidden
                      className="numeral grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] text-[16px] text-[var(--ink)]"
                    >
                      {i + 1}
                    </span>
                    <h3 className="h4 mt-5 text-[var(--on-dark)]">{s.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--on-dark-muted)]">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link href="#quote" className="magnetic btn btn-lg btn-accent">
              Tell us your spec
              <ArrowRightIcon />
            </Link>
            <Link href="/pricing" className="btn btn-lg btn-outline-dark">
              See published rates
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
