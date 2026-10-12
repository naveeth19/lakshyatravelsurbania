'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts up once, the first time it scrolls into view. Renders the final
 * value on the server so the number is correct with JavaScript disabled and
 * never causes layout shift.
 */
export function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1100,
  format = 'plain',
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  /* A string, not a function: props crossing into a client component
     must be serialisable. */
  format?: 'plain' | 'inr';
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        setValue(0);
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const shown =
    format === 'inr' ? '₹' + value.toLocaleString('en-IN') : value.toLocaleString('en-IN');

  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
