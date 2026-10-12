import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function SectionHead({
  eyebrow,
  title,
  sub,
  action,
  center,
  dark,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  action?: ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <Reveal>
      <div
        className={
          center
            ? 'flex flex-col items-center text-center'
            : 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between'
        }
      >
        <div className={center ? 'max-w-2xl' : 'max-w-[40rem]'}>
          {eyebrow && (
            <p className={`eyebrow mb-5 ${dark ? 'eyebrow-light' : ''}`}>{eyebrow}</p>
          )}
          <h2 className={`h2 ${dark ? 'text-[var(--on-dark)]' : 'text-[var(--text)]'}`}>{title}</h2>
          {sub && <p className={`lede mt-5 ${dark ? 'lede-dark' : ''}`}>{sub}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Reveal>
  );
}
