import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileCallBar } from './MobileCallBar';
import { GENERIC_MESSAGE } from '@/lib/whatsapp';

export function PolicyLayout({
  title,
  updated,
  children,
}: {
  title: string;
  /** Omit until the policy is genuinely dated; a bracketed date helps nobody. */
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" className="pb-[84px] md:pb-0">
        <article className="shell max-w-[760px] py-16 md:py-24">
          <h1 className="h1 text-[clamp(34px,5vw,58px)]">{title}</h1>
          {updated && (
            <p className="mt-4 text-[14px] text-[var(--subtle)]">Last updated {updated}</p>
          )}
          <div className="prose mt-10">
            {children}
          </div>
        </article>
      </main>
      <Footer />
      <MobileCallBar message={GENERIC_MESSAGE} />
    </>
  );
}
