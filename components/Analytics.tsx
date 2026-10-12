'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { captureAdRef } from '@/lib/analytics';

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;

export function Analytics() {
  useEffect(() => {
    captureAdRef();
  }, []);

  const tagId = GA4_ID || GADS_ID;
  if (!tagId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted'
          });
          gtag('js', new Date());
          ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ''}
          ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ''}
        `}
      </Script>
    </>
  );
}
