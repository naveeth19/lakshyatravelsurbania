/**
 * Splits a line into words so each can animate in on its own delay. Server
 * rendered, so the text is in the HTML for crawlers and visible without JS.
 */
export function Words({
  text,
  delay = 0,
  step = 0.055,
  className,
}: {
  text: string;
  delay?: number;
  step?: number;
  className?: string;
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className="word" style={{ animationDelay: `${delay + i * step}s` }}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </span>
  );
}
