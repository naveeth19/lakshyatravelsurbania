'use client';

import { useEffect, useState } from 'react';
import { CallLink, WhatsAppLink } from './ContactLink';
import { PhoneIcon, WhatsAppIcon } from './Icons';

/**
 * Sticky call and WhatsApp bar for phones.
 *
 * It stays out of the way until the hero has been scrolled past, so the first
 * screen is the design and nothing else. A page marks where its hero ends with
 * `data-hero-end`; without that marker the bar simply shows straight away,
 * which is also what happens if JavaScript never runs.
 */
export function MobileCallBar({ message }: { message: string }) {
  // null means "no decision yet" — CSS decides until the observer first fires.
  const [shown, setShown] = useState<boolean | null>(null);

  useEffect(() => {
    // No hero to wait for: CSS already leaves the bar visible, so there is
    // nothing to set here.
    const marker = document.querySelector('[data-hero-end]');
    if (!marker) return;

    // The first callback arrives asynchronously, so nothing is set during the
    // effect itself.
    const io = new IntersectionObserver(
      ([entry]) => setShown(entry.boundingClientRect.top < 0),
      { rootMargin: '0px', threshold: 0 },
    );

    io.observe(marker);
    return () => io.disconnect();
  }, []);

  const visible = shown !== false;

  return (
    <div
      data-shown={shown === null ? undefined : String(shown)}
      className="contact-bar fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-white/96 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!visible}
    >
      <div className="flex gap-2.5 px-3 py-2.5">
        <CallLink
          location="mobile-bar"
          tabIndex={visible ? undefined : -1}
          className="btn btn-hero btn-accent flex-1"
        >
          <PhoneIcon />
          Call now
        </CallLink>
        <WhatsAppLink
          location="mobile-bar"
          message={message}
          tabIndex={visible ? undefined : -1}
          className="btn btn-hero btn-wa flex-1"
        >
          <WhatsAppIcon />
          WhatsApp
        </WhatsAppLink>
      </div>
    </div>
  );
}
