import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt =
  'Force Urbania on rent in Bengaluru, 9 to 16 seater, from ₹6,500';

export default async function OpengraphImage() {
  // Satori decodes PNG and JPEG, not WebP, so this uses the PNG copy.
  const van = await readFile(join(process.cwd(), 'public/images/van-og.png'));
  const src = `data:image/png;base64,${van.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F6F7F5',
          padding: 64,
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Saffron sun */}
        <div
          style={{
            position: 'absolute',
            right: -60,
            top: 110,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: '#FCEBD0',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: '#1F4E5F',
              display: 'flex',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#1E2A35' }}>
              Urbania Hire
            </div>
            <div style={{ fontSize: 15, color: '#5B6670' }}>Bengaluru</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 640 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: '#1E2A35',
            }}
          >
            The whole group. One beautiful van.
          </div>
          <div style={{ marginTop: 22, fontSize: 27, color: '#4A5560' }}>
            9 to 16 seats · from ₹6,500 for 8 hr / 80 km · 24/7
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              background: '#E9A23B',
              color: '#1E2A35',
              fontSize: 27,
              fontWeight: 700,
              padding: '16px 30px',
              borderRadius: 999,
            }}
          >
            Call 80880 58825
          </div>
          <div style={{ display: 'flex', fontSize: 21, color: '#5B6670' }}>
            forceurbaniahireinbengaluru.com
          </div>
        </div>

        <img
          src={src}
          alt=""
          width={720}
          height={476}
          style={{ position: 'absolute', right: -30, top: 180 }}
        />
      </div>
    ),
    size,
  );
}
