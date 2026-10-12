import { ratingPlaceholder, reviewCountPlaceholder, reviews, type Review } from '@/data/reviews';
import { site } from '@/data/site';
import { StarIcon } from './Icons';
import { Reveal } from './Reveal';

/**
 * Hidden until real Google reviews are supplied. Flip site.showReviews once
 * data/reviews.ts holds genuine review text — never invent it.
 */
export function Reviews({ limit = 3 }: { limit?: number }) {
  if (!site.showReviews) return null;

  const shown: Review[] = reviews.slice(0, limit);

  return (
    <section className="section bg-[var(--surface)]">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col items-center gap-5 text-center">
            <p className="eyebrow">Reviews</p>
            <h2 className="h2">Riders say it best.</h2>
            <p className="pill border border-[var(--line)] bg-[var(--cream)] text-[var(--text)]">
              <span className="flex text-[var(--accent-ink)]" role="img" aria-label="Five out of five">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} />
                ))}
              </span>
              <span className="font-semibold tabular-nums">{ratingPlaceholder}</span>
              <span className="text-[var(--muted)]">from {reviewCountPlaceholder} Google reviews</span>
            </p>
          </div>
        </Reveal>

        <ul className={`mt-14 grid gap-4 ${limit <= 2 ? 'sm:grid-cols-2' : 'md:grid-cols-3'}`}>
          {shown.map((r, i) => (
            <Reveal as="li" key={i} delay={i * 0.06} className="card h-full p-7">
              <span className="flex text-[var(--accent-ink)]" role="img" aria-label="Five out of five">
                {Array.from({ length: 5 }, (_, s) => (
                  <StarIcon key={s} />
                ))}
              </span>
              <blockquote className="mt-5 text-[16.5px] leading-relaxed text-[var(--text)]">
                {r.text}
              </blockquote>
              <footer className="mt-6 border-t border-[var(--line)] pt-4 text-[14px]">
                <span className="font-semibold">{r.name}</span>
                <span className="text-[var(--subtle)]"> · {r.trip}</span>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
