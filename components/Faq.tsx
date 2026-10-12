'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronIcon } from './Icons';
import { faqs as allFaqs, type Faq as FaqItem } from '@/data/faqs';

export function Faq({
  items = allFaqs,
  title = 'Good to know',
}: {
  items?: FaqItem[];
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-white">
      <div className="shell max-w-[820px]">
        <h2 className="h2 text-center">{title}</h2>

        <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {items.map((f, i) => {
            const expanded = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span className="font-[family-name:var(--font-display)] text-[18px] font-semibold leading-snug tracking-[-0.2px] md:text-[20px]">
                      {f.q}
                    </span>
                    <ChevronIcon
                      className={`shrink-0 text-[var(--subtle)] transition-transform duration-300 ${
                        expanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>

                {/* 0fr -> 1fr animates the height without measuring it. */}
                <div
                  className="acc-panel"
                  data-open={expanded}
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  {...(expanded ? {} : { inert: '' as unknown as boolean })}
                >
                  <div>
                    <p className="pb-5 pr-10 text-[16px] leading-relaxed text-[var(--muted)]">
                      {f.a}
                      {f.link && (
                        <>
                          {' '}
                          <Link
                            href={f.link.href}
                            className="font-semibold text-[var(--teal)] underline underline-offset-4"
                          >
                            {f.link.label}
                          </Link>
                          .
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
