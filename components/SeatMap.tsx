/**
 * Top-down cabin plan. `seatPlan` lists rows back-first, so it is reversed
 * here to put the front of the van at the top of the drawing. Seats pop in
 * one by one on a CSS stagger — no JavaScript involved.
 */
export function SeatMap({ seatPlan }: { seatPlan: string }) {
  const rows = seatPlan.split('-').map(Number).reverse();
  const backIndex = rows.length - 1;

  let seatIndex = 0;

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div
        className="relative w-full max-w-[216px] rounded-t-[88px] rounded-b-[22px] border border-[var(--line)] bg-[var(--surface-2)] px-4 pb-5 pt-5"
        role="img"
        aria-label={`Seat plan, ${seatPlan}, front row first`}
      >
        <div aria-hidden className="mx-auto mb-2 h-1.5 w-[58%] rounded-full bg-[var(--line)]" />

        <div className="mb-3 flex justify-end pr-1">
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-lg border border-dashed border-[var(--subtle)] text-[var(--subtle)]"
            title="Driver"
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="2.4" />
            </svg>
          </span>
        </div>

        <div className="space-y-2">
          {rows.map((count, r) => {
            const isBack = r === backIndex;
            const cells = isBack ? Array.from({ length: count }, () => true) : layoutRow(count);
            return (
              <div
                key={r}
                className="grid gap-1.5"
                style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
              >
                {cells.map((filled, c) => {
                  if (!filled) return <span key={c} aria-hidden />;
                  const i = seatIndex++;
                  return (
                    <span
                      key={c}
                      aria-hidden
                      className="seat aspect-square rounded-[7px] bg-[var(--accent)]"
                      style={{ animationDelay: `${i * 40}ms` }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Middle rows keep an aisle: 1 = gap gap seat, 2 = seat gap seat, 3 = seat seat gap seat. */
function layoutRow(count: number): boolean[] {
  if (count === 1) return [false, false, true];
  if (count === 2) return [true, false, true];
  if (count === 3) return [true, true, false, true];
  return Array.from({ length: count }, () => true);
}
