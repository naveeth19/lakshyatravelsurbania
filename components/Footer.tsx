import Link from 'next/link';
import { CallLink, WhatsAppLink } from './ContactLink';
import { WhatsAppIcon } from './Icons';
import { fleet } from '@/data/fleet';
import { site } from '@/data/site';
import { GENERIC_MESSAGE } from '@/lib/whatsapp';
import { routes } from '@/data/routes';
import { areas } from '@/data/areas';
import { useCases } from '@/data/use-cases';

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--on-dark)]">
      <div className="shell py-16 md:py-20">
        {/* Contact band */}
        <div className="flex flex-col gap-7 border-b border-[var(--line-dark)] pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow eyebrow-light mb-4">Talk to a human</p>
            <CallLink
              location="footer"
              className="numeral block text-[clamp(32px,5vw,56px)] leading-none text-[var(--on-dark)] transition-colors hover:text-[var(--accent)]"
            >
              {site.phoneDisplayFull}
            </CallLink>
            <p className="mt-3 text-[15px] text-[var(--on-dark-muted)]">
              Answered 24 hours a day, every day of the year.
            </p>
          </div>
          <WhatsAppLink location="footer" message={GENERIC_MESSAGE} className="btn btn-lg btn-wa">
            <WhatsAppIcon />
            Message on WhatsApp
          </WhatsAppLink>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <FooterCol title="Our Urbanias">
            {fleet.map((v) => (
              <FooterLink key={v.slug} href={`/fleet/${v.slug}`}>
                {v.shortName} {v.tier === 'Luxury Maharaja' ? 'Maharaja' : 'Premium'}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Outstation trips">
            {routes.map((r) => (
              <FooterLink key={r.slug} href={`/outstation/${r.slug}`}>
                Bengaluru to {r.name}
              </FooterLink>
            ))}
            <FooterLink href="/outstation">All outstation routes</FooterLink>
          </FooterCol>

          <FooterCol title="Pickup areas">
            {areas.slice(0, 8).map((a) => (
              <FooterLink key={a.slug} href={`/urbania-rental/${a.slug}`}>
                {a.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink href="/pricing">Rates and packages</FooterLink>
            {useCases.map((u) => (
              <FooterLink key={u.slug} href={`/${u.slug}`}>
                {u.footerLabel}
              </FooterLink>
            ))}
            <FooterLink href="/about">About us</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-5 border-t border-[var(--line-dark)] pt-8 text-[13.5px] text-[var(--on-dark-subtle)] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-[var(--on-dark-muted)]">{site.name}</p>
            {site.showLegalDetails && (
              <p>
                Operated by {site.legalName} · GSTIN {site.gstin}
                <br />
                {site.address}, Bengaluru
              </p>
            )}
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/cancellation-policy" className="hover:text-[var(--on-dark)]">
              Cancellation policy
            </Link>
            <Link href="/privacy-policy" className="hover:text-[var(--on-dark)]">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--on-dark)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
        {title}
      </h2>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[14.5px] text-[var(--on-dark-muted)] transition-colors hover:text-[var(--on-dark)]"
      >
        {children}
      </Link>
    </li>
  );
}
