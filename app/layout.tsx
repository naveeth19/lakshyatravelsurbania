import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import { Analytics } from '@/components/Analytics';
import { Interactive } from '@/components/Interactive';
import { site } from '@/data/site';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-bricolage',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Force Urbania on Rent in Bengaluru from ₹6,500 | 9–16 Seater',
    template: '%s | Urbania Hire',
  },
  description:
    'Hire a Luxury Maharaja or Premium Force Urbania in Bengaluru with an experienced driver. 9 to 16 seats, rates published upfront, 24/7. Call 80880 58825.',
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: site.name,
    url: site.url,
    title:
      'Force Urbania on Rent in Bengaluru, 9 to 16 Seater from ₹6,500',
    description:
      'Luxury Maharaja and Premium Force Urbanias with experienced drivers. Every rate published upfront. Call 80880 58825.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--ink)] focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <Interactive />
        <Analytics />
      </body>
    </html>
  );
}
