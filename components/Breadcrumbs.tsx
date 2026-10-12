import Link from 'next/link';

export interface Crumb {
  href?: string;
  label: string;
}

export function Breadcrumbs({ trail, dark }: { trail: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center gap-2 text-[13.5px] ${
          dark ? 'text-[var(--on-dark-subtle)]' : 'text-[var(--subtle)]'
        }`}
      >
        {trail.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {c.href ? (
              <Link
                href={c.href}
                className={dark ? 'hover:text-[var(--on-dark)]' : 'hover:text-[var(--text)]'}
              >
                {c.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={dark ? 'text-[var(--on-dark)]' : 'text-[var(--text)]'}
              >
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
