'use client';

import { CallLink, WhatsAppLink } from './ContactLink';
import { PhoneIcon, WhatsAppIcon } from './Icons';

export function MobileCallBar({ message }: { message: string }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line-dark)] bg-[var(--ink)]/96 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex gap-2.5 px-3 py-2.5">
        <CallLink location="mobile-bar" className="btn btn-accent flex-1">
          <PhoneIcon />
          Call now
        </CallLink>
        <WhatsAppLink location="mobile-bar" message={message} className="btn btn-wa flex-1">
          <WhatsAppIcon />
          WhatsApp
        </WhatsAppLink>
      </div>
    </div>
  );
}
