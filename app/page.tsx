import { BadgeMarquee } from '@/components/BadgeMarquee';
import { Faq } from '@/components/Faq';
import { FleetSection } from '@/components/FleetSection';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MobileCallBar } from '@/components/MobileCallBar';
import { QuoteSection } from '@/components/QuoteSection';
import { Reviews } from '@/components/Reviews';
import { RouteGrid } from '@/components/RouteGrid';
import { WhyUs } from '@/components/WhyUs';
import { AreaStrip } from '@/components/AreaStrip';
import { OnePlatform } from '@/components/OnePlatform';
import { PopularVehicles } from '@/components/PopularVehicles';
import { featuredRoutes } from '@/data/routes';
import { JsonLd, allVanSchemas, faqSchema, localBusinessSchema } from '@/lib/schema';
import { GENERIC_MESSAGE } from '@/lib/whatsapp';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="pb-[84px] md:pb-0">
        <Hero />
        <PopularVehicles />
        <BadgeMarquee />
        <OnePlatform />
        <FleetSection initialSlug="force-urbania-9-seater-maharaja" />
        <WhyUs />
        <Gallery />
        <RouteGrid items={featuredRoutes} />
        <AreaStrip />
        <Reviews />
        <QuoteSection source="home" />
        <Faq />
      </main>
      <Footer />
      <MobileCallBar message={GENERIC_MESSAGE} />
      <JsonLd data={[localBusinessSchema(), faqSchema(), ...allVanSchemas()]} />
    </>
  );
}
