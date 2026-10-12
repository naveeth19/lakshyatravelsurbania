import { ImageResponse } from 'next/og';
import { routes, routeBySlug, routeFareFrom } from '@/data/routes';
import { formatINR } from '@/lib/pricing';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Force Urbania outstation trip from Bengaluru';

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

/** A share card per route, so links carry the destination, fare and duration. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = routeBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0E1A1F',
          padding: 72,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -300,
            top: -260,
            width: 760,
            height: 760,
            borderRadius: 760,
            background: 'rgba(233,162,59,0.12)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: '#E9A23B', display: 'flex' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#F4F1EA' }}>Urbania Hire</div>
            <div style={{ fontSize: 14, color: '#7A939D', letterSpacing: 2 }}>BENGALURU</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 900 }}>
          <div style={{ fontSize: 22, color: '#E9A23B', letterSpacing: 3, display: 'flex' }}>
            {route ? `${route.days}-DAY OUTSTATION TRIP` : 'OUTSTATION TRIP'}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              color: '#F4F1EA',
            }}
          >
            {`Bengaluru to ${route ? route.name : 'anywhere'}`}
          </div>
          {route && (
            <div style={{ marginTop: 22, fontSize: 28, color: '#9DB2BB', display: 'flex' }}>
              {`${route.distanceKm} km each way · ${route.duration} · from ${formatINR(routeFareFrom(route))}`}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              background: '#E9A23B',
              color: '#0E1A1F',
              fontSize: 25,
              fontWeight: 700,
              padding: '15px 28px',
              borderRadius: 999,
            }}
          >
            Call 80880 58825
          </div>
          <div style={{ display: 'flex', fontSize: 20, color: '#7A939D' }}>
            forceurbaniahireinbengaluru.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
