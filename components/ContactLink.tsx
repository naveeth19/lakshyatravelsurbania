'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackCall, trackWhatsApp } from '@/lib/analytics';
import { site, telHref } from '@/data/site';
import { waLink } from '@/lib/whatsapp';
import { PhoneIcon, WhatsAppIcon } from './Icons';

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

interface CallProps extends AnchorProps {
  /** Where on the page the click happened, e.g. 'hero' or 'fleet-selector'. */
  location: string;
  children?: ReactNode;
}

/**
 * Every tel: link on the site goes through here so the conversion fires
 * before the browser hands off to the dialer.
 */
export function CallLink({ location, children, className, ...rest }: CallProps) {
  return (
    <a
      href={telHref}
      className={className}
      onClick={() => trackCall(location)}
      {...rest}
    >
      {children ?? (
        <>
          <PhoneIcon />
          Call {site.phoneDisplay}
        </>
      )}
    </a>
  );
}

interface WaProps extends AnchorProps {
  location: string;
  message: string;
  vanSlug?: string;
  children?: ReactNode;
}

/** Every wa.me link on the site goes through here, for the same reason. */
export function WhatsAppLink({
  location,
  message,
  vanSlug,
  children,
  className,
  ...rest
}: WaProps) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackWhatsApp(location, vanSlug)}
      {...rest}
    >
      {children ?? (
        <>
          <WhatsAppIcon />
          Book on WhatsApp
        </>
      )}
    </a>
  );
}
