import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function PhoneIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden {...base} {...p}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3 5.2 2 2 0 0 1 5 3h1.5Z" />
    </svg>
  );
}

export function WhatsAppIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={19} height={19} aria-hidden fill="currentColor" {...p}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.85c0 1.9.5 3.73 1.46 5.35L2 22.5l5.45-1.6a9.8 9.8 0 0 0 4.59 1.16h.01c5.43 0 9.84-4.4 9.84-9.85 0-2.63-1.03-5.1-2.9-6.96A9.77 9.77 0 0 0 12.04 2Zm0 1.84a7.96 7.96 0 0 1 5.66 2.35 7.92 7.92 0 0 1 2.35 5.66c0 4.42-3.6 8.01-8.02 8.01a8.17 8.17 0 0 1-4.15-1.13l-.3-.18-3.08.9.83-3-.2-.31a7.9 7.9 0 0 1-1.22-4.29c0-4.42 3.6-8.01 8.13-8.01Zm-2.4 4.23c-.17 0-.45.07-.69.33-.24.26-.9.88-.9 2.15s.92 2.5 1.05 2.67c.13.17 1.8 2.76 4.37 3.86.61.26 1.09.42 1.46.54.61.2 1.17.17 1.61.1.5-.07 1.5-.61 1.72-1.21.21-.6.21-1.1.15-1.21-.07-.1-.24-.17-.5-.3-.26-.13-1.5-.74-1.74-.83-.23-.08-.4-.12-.57.13-.17.26-.65.83-.8 1-.14.17-.29.2-.55.07-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.27-1.51-1.42-1.77-.15-.26-.02-.4.11-.53.12-.12.26-.3.4-.46.12-.15.16-.26.25-.43.08-.17.04-.33-.02-.46-.07-.13-.57-1.4-.78-1.9-.2-.5-.42-.44-.57-.44h-.49Z" />
    </svg>
  );
}

export function ShieldCheckIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden {...base} {...p}>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 8.1 7 9.5 4.1-1.4 7-5.2 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function RouteIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden {...base} {...p}>
      <circle cx="6.5" cy="5.5" r="2.5" />
      <circle cx="17.5" cy="18.5" r="2.5" />
      <path d="M9 5.5h5a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h5" />
    </svg>
  );
}

export function ClockIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function TagIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden {...base} {...p}>
      <path d="M3 12.5V4a1 1 0 0 1 1-1h8.5a1 1 0 0 1 .7.3l7.5 7.5a1 1 0 0 1 0 1.4l-8.5 8.5a1 1 0 0 1-1.4 0L3.3 13.2a1 1 0 0 1-.3-.7Z" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SparkleIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden {...base} {...p}>
      <path d="M12 3.5 13.7 9 19 10.5 13.7 12 12 17.5 10.3 12 5 10.5 10.3 9 12 3.5Z" />
    </svg>
  );
}

export function ArrowsIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden {...base} {...p}>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </svg>
  );
}

export function SeatIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden {...base} {...p}>
      <path d="M7 4v8a3 3 0 0 0 3 3h5" />
      <path d="M17 11v7a2 2 0 0 1-2 2H9" />
    </svg>
  );
}

export function ChevronIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden {...base} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArrowRightIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden {...base} {...p}>
      <path d="M4 12h15m-5-5 5 5-5 5" />
    </svg>
  );
}

export function StarIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden fill="currentColor" {...p}>
      <path d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.4l6.2-.9L12 2.8Z" />
    </svg>
  );
}
