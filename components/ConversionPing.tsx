'use client';

import { useEffect } from 'react';
import { trackFormLead } from '@/lib/analytics';

/** Fires the form-submission conversion once, when the thank-you page loads. */
export function ConversionPing() {
  useEffect(() => {
    trackFormLead();
  }, []);
  return null;
}
