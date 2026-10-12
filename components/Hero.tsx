import Link from 'next/link';
import { CallLink, WhatsAppLink } from './ContactLink';
import { HeroIcon } from './HeroIcons';
import { PhoneIcon, WhatsAppIcon } from './Icons';
import { Words } from './Words';
import { heroFeatures, heroServices } from '@/data/hero';
import { genericMessage } from '@/lib/whatsapp';
import { site } from '@/data/site';

const Chevron = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

/**
 * Server-rendered. The entrance runs on CSS keyframes so the headline and the
 * LCP background paint on the first frame rather than waiting for hydration.
 */
export function Hero({ trackingRef }: { trackingRef?: string }) {
  const message = genericMessage(trackingRef);

  return (
    <section className="relative isolate">
      {/*
        Preload the crop this device will actually use. React hoists these into
        <head>, which restores the head start that next/image's `priority` gave
        us before the switch to <picture>.
      */}
      <link
        rel="preload"
        as="image"
        imageSrcSet="/images/hero-mobile-sm.webp 640w, /images/hero-mobile.webp 900w"
        imageSizes="100vw"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        imageSrcSet="/images/hero-desktop-sm.webp 1280w, /images/hero-desktop.webp 1920w"
        imageSizes="100vw"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      {/*
        One screen on a phone. 100svh (not dvh) is the height with the browser
        chrome showing, so the hero never needs scrolling to be seen whole.
      */}
      <div className="relative isolate flex min-h-[calc(100svh-var(--header-h))] flex-col md:min-h-[min(88vh,840px)]">
      {/* ---------- Background ---------- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/*
          A plain <picture>, not two next/image tags: a CSS-hidden <Image>
          still downloads, so the old markup fetched both crops on every
          device. The files are pre-optimised at build time.
        */}
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/images/hero-desktop-sm.webp 1280w, /images/hero-desktop.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/images/hero-mobile.webp"
            srcSet="/images/hero-mobile-sm.webp 640w, /images/hero-mobile.webp 900w"
            sizes="100vw"
            alt="A Force Urbania parked in front of Vidhana Soudha in Bengaluru at sunrise"
            width={900}
            height={1599}
            fetchPriority="high"
            decoding="async"
            className="hero-photo absolute inset-y-0 left-0 h-full w-full object-cover object-[62%_center] md:object-left"
          />
        </picture>

        {/* Scrims: keep the headline readable over the photo at every width */}
        <div
          aria-hidden
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,.97) 0%, rgba(255,255,255,.93) 30%, rgba(255,255,255,.55) 46%, rgba(255,255,255,.08) 60%, rgba(255,255,255,0) 70%)',
          }}
        />
        <div aria-hidden className="hero-scrim absolute inset-0 hidden md:block" />
      </div>

      {/* ---------- Copy ---------- */}
      <div className="shell pb-4 pt-5 md:pb-0 md:pt-14 lg:pt-16">
        <div className="max-w-[640px]">
          <p
            className="fade-up inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/92 px-4 py-2 text-[13.5px] font-medium text-[var(--text)] shadow-[0_2px_14px_-6px_rgba(13,17,19,.3)]"
            style={{ animationDelay: '0s' }}
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--whatsapp)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--whatsapp)]" />
            </span>
            Available 24/7 across Bengaluru
          </p>

          <h1 className="h1 mt-4 text-[clamp(36px,5.6vw,72px)] text-[var(--text)] md:mt-5">
            <span className="block">
              <Words text="Force Urbania" delay={0.08} />
            </span>
            <span className="block">
              <Words text="Hire in" delay={0.08 + 2 * 0.055} />{' '}
              <Words
                text="Bengaluru"
                delay={0.08 + 3 * 0.055}
                className="text-[var(--accent-deep)]"
              />
            </span>
          </h1>

          <p
            className="fade-up mt-3.5 text-[clamp(17.5px,2vw,26px)] font-bold tracking-[-0.02em] text-[var(--text)] md:mt-5"
            style={{ animationDelay: '.42s' }}
          >
            Spacious. Comfortable. Reliable.
          </p>

          <p
            className="fade-up mt-2 max-w-[30rem] text-[clamp(14.5px,1.3vw,18px)] leading-relaxed text-[var(--muted)] md:mt-2.5"
            style={{ animationDelay: '.5s' }}
          >
            9 to 16 seater Urbania for city travel, airport transfers, outstation trips and
            group tours.
          </p>

          <div
            className="fade-up mt-5 flex flex-col gap-2 sm:mt-7 sm:flex-row sm:gap-3"
            style={{ animationDelay: '.58s' }}
          >
            <span className="magnetic relative inline-flex w-full sm:w-auto">
              <span
                aria-hidden
                className="call-ring pointer-events-none absolute inset-0"
              />
              <CallLink location="hero" className="btn btn-hero btn-lg btn-accent w-full sm:w-auto">
                <PhoneIcon />
                Call {site.phoneDisplay}
                <Chevron />
              </CallLink>
            </span>

            <WhatsAppLink
              location="hero"
              message={message}
              className="magnetic btn btn-hero btn-lg w-full border border-[var(--line)] bg-white text-[var(--text)] shadow-[0_6px_20px_-10px_rgba(13,17,19,.35)] hover:bg-[var(--surface-2)] sm:w-auto"
            >
              <WhatsAppIcon className="text-[var(--whatsapp)]" />
              Book on WhatsApp
              <Chevron />
            </WhatsAppLink>
          </div>
        </div>

        {/* ---------- Feature strip ---------- */}
        <ul
          className="fade-up mt-6 grid grid-cols-2 gap-x-3 gap-y-3.5 rounded-2xl border border-white/60 bg-white/88 p-4 shadow-[0_8px_30px_-18px_rgba(13,17,19,.35)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[var(--line)] md:mt-10 md:w-fit md:px-6 md:py-4"
          style={{ animationDelay: '.68s' }}
        >
          {heroFeatures.map((f) => (
            <li key={f.sub} className="flex items-center gap-2.5 sm:px-3 sm:first:pl-0">
              <HeroIcon name={f.icon} className="h-5 w-5 shrink-0 text-[var(--text)] md:h-[23px] md:w-[23px]" />
              <span className="leading-tight">
                <span className="block whitespace-nowrap text-[12.5px] font-bold text-[var(--text)] md:text-[13.5px]">{f.title}</span>
                <span className="block whitespace-nowrap text-[11.5px] text-[var(--muted)] md:text-[12px]">{f.sub}</span>
              </span>
            </li>
          ))}
        </ul>

      </div>

        {/* Fills whatever is left of the screen, so the photo finishes the hero */}
        <div aria-hidden className="min-h-[70px] flex-1 md:hidden" />

        {/* Marks where the hero ends, for the sticky contact bar */}
        <div data-hero-end aria-hidden className="h-px w-full" />
      </div>

      {/* ---------- Services card ---------- */}
      <div className="shell relative z-10 pb-10 pt-6 md:-mt-[150px] md:pb-16 md:pt-0">
        <ul className="grid grid-cols-5 gap-x-1 rounded-[20px] border border-[var(--line)] bg-white px-2 py-5 shadow-[0_24px_60px_-30px_rgba(13,17,19,.45)] md:gap-0 md:divide-x md:divide-[var(--line)] md:rounded-[22px] md:py-6">
          {heroServices.map((s) => (
            <li key={s.title} className="px-0.5 md:px-5">
              <Link
                href={s.href}
                className="group flex h-full flex-col items-center gap-2 text-center md:flex-row md:gap-3.5 md:text-left"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--text)] transition-colors group-hover:bg-[var(--accent)] md:h-auto md:w-auto md:rounded-none md:bg-transparent md:group-hover:bg-transparent">
                  <HeroIcon name={s.icon} className="h-[19px] w-[19px] md:h-6 md:w-6" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[10.5px] font-bold leading-[1.25] text-[var(--text)] md:text-[14.5px]">
                    {s.title}
                  </span>
                  <span className="mt-0.5 hidden text-[12.5px] text-[var(--muted)] sm:block">
                    {s.sub}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
