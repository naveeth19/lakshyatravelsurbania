import type { CSSProperties, ReactNode } from 'react';

/**
 * Subtle rise as a section scrolls into view, driven by a CSS scroll timeline.
 *
 * Transform only, never opacity: a half-faded heading is a real contrast
 * failure for anyone who stops scrolling mid-animation. The markup is also
 * visible by default, so nothing here waits for JavaScript.
 *
 * `as` exists so the wrapper can be the list item itself — a <div> between
 * <ul> and <li> breaks the list for screen readers.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
}) {
  const style = delay
    ? ({ '--reveal-start': `${Math.round(delay * 160)}%` } as CSSProperties)
    : undefined;

  return (
    <Tag className={`reveal ${className ?? ''}`} style={style}>
      {children}
    </Tag>
  );
}
