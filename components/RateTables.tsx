import {
  DRIVER_ALLOWANCE_PER_DAY,
  EXTRAS_NOTE,
  OUTSTATION_MIN_KM_PER_DAY,
  type Van,
} from '@/data/fleet';
import { formatINR, oneDayOutstationFrom } from '@/lib/pricing';

function Table({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="card overflow-hidden">
      <h3 className="border-b border-[var(--line)] bg-[var(--surface-2)] px-5 py-3.5 font-[family-name:var(--font-display)] text-[17px] font-semibold">
        {title}
      </h3>
      <dl className="divide-y divide-[var(--line)]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 px-5 py-3.5">
            <dt className="text-[15px] text-[var(--muted)]">{k}</dt>
            <dd className="font-[family-name:var(--font-display)] text-[18px] font-bold tabular-nums tracking-[-0.3px]">
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function RateTables({ van }: { van: Van }) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Table
          title="Local, within Bengaluru"
          rows={[
            ['8 hr / 80 km package', formatINR(van.local8h80km)],
            ['12 hr / 100 km package', formatINR(van.local12h100km)],
            ['Extra kilometre', `${formatINR(van.extraKm)}/km`],
            ['Extra hour', formatINR(van.extraHour)],
          ]}
        />
        <Table
          title="Outstation"
          rows={[
            ['Rate per kilometre', `${formatINR(van.outstationPerKm)}/km`],
            ['Minimum billed per day', `${OUTSTATION_MIN_KM_PER_DAY} km`],
            ['Driver allowance', `${formatINR(DRIVER_ALLOWANCE_PER_DAY)}/day`],
            ['One day starts at', formatINR(oneDayOutstationFrom(van))],
          ]}
        />
      </div>
      <p className="mt-4 text-[13px] text-[var(--subtle)]">{EXTRAS_NOTE}</p>
    </div>
  );
}
