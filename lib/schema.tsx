import { fleet, type Van } from '@/data/fleet';
import { faqs, type Faq } from '@/data/faqs';
import { site } from '@/data/site';
import { routeFareFrom, type Route } from '@/data/routes';
import type { Area } from '@/data/areas';
import type { UseCase } from '@/data/use-cases';
import type { Crumb } from '@/components/Breadcrumbs';

const ORG_ID = `${site.url}/#business`;

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoRental', 'LocalBusiness'],
    '@id': ORG_ID,
    name: site.name,
    url: site.url,
    telephone: site.phone,
    image: `${site.url}/images/van-sticker.webp`,
    priceRange: site.priceRange,
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      // streetAddress is omitted until a real one is supplied; a bracketed
      // placeholder in structured data is worse than no value at all.
      ...(site.showLegalDetails ? { streetAddress: site.address } : {}),
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'City', name: 'Bengaluru' },
      { '@type': 'State', name: 'Karnataka' },
    ],
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9716,
      longitude: 77.5946,
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: 12.9716, longitude: 77.5946 },
      geoRadius: '60000',
    },
    knowsLanguage: ['en', 'kn', 'hi', 'ta'],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  };
}

export function vanProductSchema(van: Van) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${van.name} on rent in Bengaluru`,
    description: van.description,
    url: `${site.url}/fleet/${van.slug}`,
    category: 'Vehicle rental',
    brand: { '@type': 'Brand', name: 'Force Motors' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: van.local8h80km,
      availability: 'https://schema.org/InStock',
      url: `${site.url}/fleet/${van.slug}`,
      seller: { '@id': ORG_ID },
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'INR',
        price: van.local8h80km,
        description: '8 hours / 80 km city package, driver included',
      },
    },
  };
}

export function faqSchema(items: Faq[] = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(van: Van) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Fleet', item: `${site.url}/#fleet` },
      { '@type': 'ListItem', position: 3, name: van.name, item: `${site.url}/fleet/${van.slug}` },
    ],
  };
}

export function allVanSchemas() {
  return fleet.map(vanProductSchema);
}

/** Renders one or more JSON-LD blocks. */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}


/** Breadcrumbs built from the same trail the page renders. */
export function breadcrumbListSchema(trail: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href === '/' ? '' : c.href}` } : {}),
    })),
  };
}

export function touristTripSchema(route: Route) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `Bengaluru to ${route.name} by Force Urbania`,
    description: route.intro,
    url: `${site.url}/outstation/${route.slug}`,
    touristType: 'Group travel',
    itinerary: {
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, item: { '@type': 'City', name: 'Bengaluru' } },
        ...route.via.map((v, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          item: { '@type': 'City', name: v },
        })),
        {
          '@type': 'ListItem',
          position: route.via.length + 2,
          item: { '@type': 'City', name: route.longName },
        },
      ],
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: routeFareFrom(route),
      availability: 'https://schema.org/InStock',
      url: `${site.url}/outstation/${route.slug}`,
      seller: { '@id': ORG_ID },
    },
    provider: { '@id': ORG_ID },
  };
}

export function serviceSchema({
  name,
  description,
  url,
  areaName,
}: {
  name: string;
  description: string;
  url: string;
  areaName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    serviceType: 'Minibus and tempo traveller rental with driver',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: areaName ?? 'Bengaluru' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        minPrice: Math.min(...fleet.map((v) => v.local8h80km)),
        maxPrice: Math.max(...fleet.map((v) => v.local12h100km)),
      },
      seller: { '@id': ORG_ID },
    },
  };
}

export function areaServiceSchema(area: Area) {
  return serviceSchema({
    name: `Force Urbania rental in ${area.name}, Bengaluru`,
    description: area.intro,
    url: `${site.url}/urbania-rental/${area.slug}`,
    areaName: `${area.name}, Bengaluru`,
  });
}

export function serviceSchemaForUseCase(useCase: UseCase) {
  return serviceSchema({
    name: useCase.h1,
    description: useCase.intro,
    url: `${site.url}/${useCase.slug}`,
  });
}
