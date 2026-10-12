import Image from 'next/image';
import { gallery } from '@/data/gallery';
import { WhatsAppLink } from './ContactLink';
import { ArrowRightIcon } from './Icons';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

const WALKTHROUGH_MESSAGE =
  'Hi, can you share a video walkthrough of the Urbania cabin? Date:  Pickup:  No. of people: ';

export function Gallery() {
  const [lead, ...rest] = gallery;

  return (
    <section className="section overflow-hidden">
      <div className="shell">
        <SectionHead
          eyebrow="Inside"
          title="Step inside the cabin."
          sub="Leather recliners, ambient lighting and room to actually stretch out."
          action={
            <WhatsAppLink
              location="gallery"
              message={WALKTHROUGH_MESSAGE}
              className="btn btn-outline"
            >
              Ask for a video walkthrough
              <ArrowRightIcon />
            </WhatsAppLink>
          }
        />

        {/* Bento: one tall lead image, three stacked beside it */}
        <Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr]">
            <figure className="parallax-slow elev-2 relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[var(--surface-2)] md:aspect-auto md:min-h-[520px]">
              <Image
                src={lead.src}
                alt={lead.alt}
                fill
                sizes="(max-width: 768px) 92vw, 48vw"
                className="object-cover"
                style={{ objectPosition: lead.position ?? 'center' }}
              />
            </figure>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {rest.map((img, i) => (
                <figure
                  key={img.src}
                  className={`relative overflow-hidden rounded-[22px] bg-[var(--surface-2)] ${
                    i === 2 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/5]'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 92vw, 24vw"
                    className="object-cover"
                    style={{ objectPosition: img.position ?? 'center' }}
                  />
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
