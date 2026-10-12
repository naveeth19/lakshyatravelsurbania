import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { CallLink, WhatsAppLink } from './ContactLink';
import { PhoneIcon, WhatsAppIcon } from './Icons';
import { site } from '@/data/site';

/** Dark hero used by every inner page, so the whole site reads as one thing. */
export function PageHero({
  eyebrow,
  title,
  sub,
  trail,
  stats,
  waMessage,
  aside,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  trail: Crumb[];
  stats?: { value: string; label: string }[];
  waMessage: string;
  aside?: ReactNode;
}) {
  return (
    <section className="mesh-dark grain relative isolate overflow-hidden text-[var(--on-dark)]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[78%] top-[40%] -z-10 aspect-square w-[min(900px,100vw)]"
        style={{
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle at 50% 50%, rgba(233,162,59,.24) 0%, rgba(233,162,59,.08) 45%, rgba(233,162,59,0) 70%)',
        }}
      />

      <div className="shell relative z-[2] pb-14 pt-8 md:pb-20 md:pt-10">
        <Breadcrumbs trail={trail} dark />

        <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
          <div>
            {eyebrow && <p className="eyebrow eyebrow-light mb-5">{eyebrow}</p>}
            <h1 className="h1 text-[clamp(38px,5.2vw,72px)] text-[var(--on-dark)]">{title}</h1>
            {sub && <p className="lede lede-dark mt-6 max-w-[42rem]">{sub}</p>}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CallLink location="page-hero" className="btn btn-lg btn-accent w-full sm:w-auto">
                <PhoneIcon />
                Call {site.phoneDisplay}
              </CallLink>
              <WhatsAppLink
                location="page-hero"
                message={waMessage}
                className="btn btn-lg btn-wa w-full sm:w-auto"
              >
                <WhatsAppIcon />
                WhatsApp us
              </WhatsAppLink>
            </div>
          </div>

          {aside}
        </div>

        {stats && stats.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-[var(--line-dark)] pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="numeral text-[clamp(22px,2.4vw,30px)] leading-none text-[var(--on-dark)]">
                  {s.value}
                </dt>
                <dd className="mt-2 text-[12.5px] leading-snug text-[var(--on-dark-subtle)]">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
