'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CallLink } from './ContactLink';
import { PhoneIcon } from './Icons';
import { site } from '@/data/site';

const links = [
  { href: '/#fleet', label: 'Fleet' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/outstation', label: 'Outstation' },
  { href: '/#why', label: 'Why Us' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Never leave the menu open behind a route change or a resize to desktop.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const mq = window.matchMedia('(min-width: 1024px)');
    mq.addEventListener('change', close);
    document.body.style.overflow = 'hidden';
    return () => {
      mq.removeEventListener('change', close);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_8px_30px_-18px_rgba(13,17,19,.3)]' : ''
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-5 md:h-[88px]">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Full pill from md up, gold circle on phones, as in the design */}
          <CallLink
            location="header"
            className="magnetic btn btn-accent hidden h-12 min-h-12 px-5 text-[15px] md:inline-flex"
          >
            <PhoneIcon />
            <span className="tabular-nums">{site.phoneDisplay}</span>
          </CallLink>

          <CallLink
            location="header-mobile"
            aria-label={`Call ${site.phoneDisplayFull}`}
            className="btn btn-accent grid h-11 w-11 min-h-11 place-items-center !p-0 md:hidden"
          >
            <PhoneIcon />
          </CallLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-xl text-[var(--text)] transition-colors hover:bg-[var(--surface-2)] lg:hidden"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M3.5 7h17" />
                  <path d="M3.5 12h17" />
                  <path d="M3.5 17h17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-[var(--line)] bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col py-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-[var(--line)] py-3.5 text-[16px] font-medium text-[var(--text)] last:border-0"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Wordmark({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex shrink-0 items-center" aria-label={`${site.name}, home`}>
      <Image
        src="/images/logo.webp"
        alt=""
        width={1086}
        height={362}
        priority
        sizes="(max-width: 768px) 165px, 245px"
        className="h-[40px] w-auto md:h-[56px]"
      />
    </Link>
  );
}
