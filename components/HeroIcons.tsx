import type { SVGProps } from 'react';
import type { HeroIcon } from '@/data/hero';

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const paths: Record<HeroIcon, React.ReactNode> = {
  seats: (
    <>
      <circle cx="8" cy="8" r="2.6" />
      <circle cx="15.5" cy="8.5" r="2.1" />
      <path d="M3.5 18.5c0-2.5 2-4.3 4.5-4.3s4.5 1.8 4.5 4.3" />
      <path d="M13.5 18.5c0-2 1.3-3.5 3.3-3.5s3.7 1.3 3.7 3.5" />
    </>
  ),
  ac: (
    <>
      <path d="M12 3v18M3 12h18" />
      <path d="m5.6 5.6 12.8 12.8M18.4 5.6 5.6 18.4" />
      <path d="M12 6.4 10 4.6M12 6.4l2-1.8M12 17.6l-2 1.8M12 17.6l2 1.8" />
    </>
  ),
  group: (
    <>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" />
      <path d="M3.5 12.5h17" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 5.5 6v5.3c0 4 2.7 7.6 6.5 8.8 3.8-1.2 6.5-4.8 6.5-8.8V6L12 3.2Z" />
      <path d="m9.3 11.8 2 2 3.4-3.6" />
    </>
  ),
  plane: <path d="M10.4 20.5 12 15l6.8-1.6a2 2 0 0 0 0-3.9L12 8 10.4 2.5a.7.7 0 0 0-1.3-.1L6.6 8.1 3 9a.9.9 0 0 0 0 1.8l3.6.9 2.5 5.7a.7.7 0 0 0 1.3-.1Z" transform="rotate(-45 12 12)" />,
  city: (
    <>
      <path d="M3.5 20.5V9.5l6-3.2v14.2" />
      <path d="M9.5 20.5V4l5.5 2.8v13.7" />
      <path d="M15 20.5V10l5.5 2.6v7.9" />
      <path d="M2.5 20.5h19" />
      <path d="M6 12h1M6 15.5h1M12 9.5h1M12 13h1M12 16.5h1M17.5 15h1" />
    </>
  ),
  mountain: (
    <>
      <path d="M2.5 19.5 9 8l4 6.5 2.3-3.5 6.2 8.5H2.5Z" />
      <path d="m7 12.2 2 1.4 2-1.4" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="2.8" />
      <circle cx="16.5" cy="9" r="2.2" />
      <path d="M3.5 19c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2" />
      <path d="M15.5 19c0-2.3 1.5-4 3.8-4 1 0 1.8.3 2.2.7" />
    </>
  ),
  temple: (
    <>
      <path d="M12 2.5 14.2 6H9.8L12 2.5Z" />
      <path d="M12 6v3" />
      <path d="M6 20.5V12l6-3.6 6 3.6v8.5" />
      <path d="M3.5 20.5h17" />
      <path d="M10.3 20.5v-4.3a1.7 1.7 0 0 1 3.4 0v4.3" />
    </>
  ),
};

export function HeroIcon({ name, ...rest }: { name: HeroIcon } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden {...base} {...rest}>
      {paths[name]}
    </svg>
  );
}
