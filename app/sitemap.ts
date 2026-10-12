import type { MetadataRoute } from 'next';
import { fleet } from '@/data/fleet';
import { routes } from '@/data/routes';
import { areas } from '@/data/areas';
import { useCases } from '@/data/use-cases';
import { site } from '@/data/site';

/**
 * Ad landing pages under /lp and the /thank-you page are deliberately absent:
 * both are noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },

    { url: url('/pricing'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/outstation'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },

    ...fleet.map((v) => ({
      url: url(`/fleet/${v.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    ...routes.map((r) => ({
      url: url(`/outstation/${r.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    ...useCases.map((u) => ({
      url: url(`/${u.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    ...areas.map((a) => ({
      url: url(`/urbania-rental/${a.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    { url: url('/about'), lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: url('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/cancellation-policy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/privacy-policy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
