import type { NextConfig } from 'next';

/**
 * Security headers. Vercel serves these on every response; they cost nothing
 * and are the kind of thing a buyer's developer will check for.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // The lockfile above this directory is unrelated; pin the workspace root.
  turbopack: { root: __dirname },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
