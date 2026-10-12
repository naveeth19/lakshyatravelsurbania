import Image from 'next/image';
import { CallLink, WhatsAppLink } from './ContactLink';
import { PhoneIcon, WhatsAppIcon } from './Icons';
import { Reveal } from './Reveal';
import { genericMessage } from '@/lib/whatsapp';
import { site } from '@/data/site';

export function FinalCta({
  trackingRef,
  title = "Tell us the date. We'll handle the road.",
  body = 'One message with your date, route and group size. You get the van, the driver and a fixed fare.',
}: {
  trackingRef?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="section-tight">
      <div className="shell">
        <Reveal>
          <div className="grain-light elev-3 relative grid overflow-hidden rounded-[28px] bg-[var(--accent)] md:grid-cols-[1.08fr_1fr]">
            <div className="relative z-10 p-8 md:p-14">
              <h2 className="h2 text-[var(--ink)]">{title}</h2>
              <p className="mt-5 max-w-[32rem] text-[17px] leading-relaxed text-[var(--ink)]/80">
                {body}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CallLink location="final-cta" className="magnetic btn btn-lg btn-ink w-full sm:w-auto">
                  <PhoneIcon />
                  Call {site.phoneDisplay}
                </CallLink>
                <WhatsAppLink
                  location="final-cta"
                  message={genericMessage(trackingRef)}
                  className="magnetic btn btn-lg btn-wa w-full sm:w-auto"
                >
                  <WhatsAppIcon />
                  Book on WhatsApp
                </WhatsAppLink>
              </div>
            </div>

            <div className="relative mt-2 h-[190px] md:mt-0 md:h-auto">
              <Image
                src="/images/van-sticker.webp"
                alt=""
                aria-hidden
                width={1040}
                height={688}
                loading="lazy"
                sizes="(max-width: 768px) 90vw, 46vw"
                className="absolute bottom-0 right-0 w-[115%] max-w-none translate-x-[8%] md:top-1/2 md:w-[128%] md:-translate-y-1/2"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
