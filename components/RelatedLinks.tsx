import Link from 'next/link';
import { ArrowRightIcon } from './Icons';

export function RelatedLinks({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string; note?: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="section-tight bg-[var(--surface)]">
      <div className="shell">
        <h2 className="h3">{title}</h2>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                className="card spotlight beam elev-1 group flex items-center justify-between gap-4 p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span>
                  <span className="block font-semibold text-[var(--text)]">{i.label}</span>
                  {i.note && (
                    <span className="mt-0.5 block text-[13.5px] text-[var(--subtle)]">{i.note}</span>
                  )}
                </span>
                <ArrowRightIcon className="shrink-0 text-[var(--teal)] transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
