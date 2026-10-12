import type { Route } from '@/data/routes';

/** Simple drawn line from Bengaluru to the destination, via the main towns. */
export function RouteMap({ route }: { route: Route }) {
  const stops = ['Bengaluru', ...route.via, route.name];
  const n = stops.length;

  return (
    <div className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
      <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--subtle)]">
        The drive
      </p>

      {/* Horizontal on desktop */}
      <div className="mt-7 hidden md:block">
        <svg
          viewBox={`0 0 ${(n - 1) * 100 + 20} 86`}
          className="w-full"
          role="img"
          aria-label={`Route from ${stops.join(', then ')}`}
        >
          <line
            className="route-line"
            x1="10"
            y1="22"
            x2={(n - 1) * 100 + 10}
            y2="22"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1000"
          />
          {stops.map((s, i) => {
            const x = i * 100 + 10;
            const terminal = i === 0 || i === n - 1;
            return (
              <g key={s}>
                <circle
                  cx={x}
                  cy="22"
                  r={terminal ? 7 : 4.5}
                  fill={terminal ? 'var(--accent)' : 'var(--surface)'}
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                />
                {/* Alternate rows so long town names never collide */}
                <text
                  x={x}
                  y={i % 2 === 0 ? 46 : 66}
                  textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
                  fontSize="11.5"
                  fontWeight={terminal ? 700 : 500}
                  fill={terminal ? 'var(--text)' : 'var(--subtle)'}
                >
                  {s}
                </text>
                {i % 2 === 1 && (
                  <line
                    x1={x}
                    y1="30"
                    x2={x}
                    y2="54"
                    stroke="var(--line)"
                    strokeWidth="1"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Vertical on phones */}
      <ol className="mt-6 md:hidden">
        {stops.map((s, i) => {
          const terminal = i === 0 || i === n - 1;
          return (
            <li key={s} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <span
                  aria-hidden
                  className={`mt-1.5 block rounded-full border-[2.5px] border-[var(--accent)] ${
                    terminal ? 'h-3.5 w-3.5 bg-[var(--accent)]' : 'h-2.5 w-2.5 bg-[var(--surface)]'
                  }`}
                />
                {i < n - 1 && <span aria-hidden className="w-[2.5px] flex-1 bg-[var(--accent)]" />}
              </div>
              <span
                className={`pb-5 text-[15px] ${
                  terminal ? 'font-semibold text-[var(--text)]' : 'text-[var(--muted)]'
                }`}
              >
                {s}
              </span>
            </li>
          );
        })}
      </ol>

      <dl className="mt-4 grid grid-cols-2 gap-5 border-t border-[var(--line)] pt-6 sm:grid-cols-3">
        <div>
          <dt className="text-[12.5px] text-[var(--subtle)]">One way</dt>
          <dd className="numeral mt-1 text-[21px]">{route.distanceKm} km</dd>
        </div>
        <div>
          <dt className="text-[12.5px] text-[var(--subtle)]">Driving time</dt>
          <dd className="numeral mt-1 text-[21px]">{route.duration}</dd>
        </div>
        <div>
          <dt className="text-[12.5px] text-[var(--subtle)]">Trip length</dt>
          <dd className="numeral mt-1 text-[21px]">
            {route.days} {route.days === 1 ? 'day' : 'days'}
          </dd>
        </div>
      </dl>
    </div>
  );
}
