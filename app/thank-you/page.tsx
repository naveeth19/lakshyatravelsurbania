import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { CallLink } from '@/components/ContactLink';
import { PhoneIcon } from '@/components/Icons';
import { ConversionPing } from '@/components/ConversionPing';
import { site } from '@/data/site';
import { featuredRoutes } from '@/data/routes';

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your enquiry has reached us. We will call you back shortly.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <ConversionPing />
      <main id="main" className="bg-[var(--ink)] pb-[84px] md:pb-0">
        <section className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
          <span
            aria-hidden
            className="grid h-20 w-20 place-items-center rounded-full bg-[var(--accent)] text-[var(--ink)]"
          >
            <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>

          <h1 className="h1 mt-9 max-w-3xl text-[var(--on-dark)]">Got it. Talk in a minute.</h1>

          <p className="lede lede-dark mt-6 max-w-xl">
            Your enquiry is with us. We will call you back on the number you gave, usually
            within a few minutes. If you are in a hurry, ring us directly.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CallLink location="thank-you" className="btn btn-lg btn-accent">
              <PhoneIcon />
              Call {site.phoneDisplay}
            </CallLink>
            <Link href="/" className="btn btn-lg btn-outline-dark">
              Back to the site
            </Link>
          </div>

          <div className="mt-16 w-full max-w-3xl">
            <p className="text-[13px] uppercase tracking-[0.14em] text-[var(--on-dark-subtle)]">
              While you wait
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
              {featuredRoutes.map((r) => (
                <li key={r.slug}>
                  <Link href={`/outstation/${r.slug}`} className="pill pill-dark hover:border-[var(--accent)]">
                    Bengaluru to {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
