import { badges } from '@/data/badges';

export function BadgeMarquee() {
  const row = [...badges, ...badges];
  return (
    <div
      className="marquee overflow-hidden border-y border-[var(--line)] bg-[var(--accent)] py-3.5"
      aria-label="What every booking includes"
    >
      <div className="marquee-track">
        {row.map((badge, i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i >= badges.length}>
            <span className="whitespace-nowrap px-6 text-[14.5px] font-semibold text-[var(--ink)]">
              {badge}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ink)]/45" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
