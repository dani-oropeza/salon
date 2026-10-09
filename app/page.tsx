import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Welcome } from "@/components/Welcome";
import { Services } from "@/components/Services";
import { PartyTimeline } from "@/components/PartyTimeline";
import { Packages } from "@/components/Packages";
import { Gallery } from "@/components/Gallery";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { AnimationPauser } from "@/components/jungle/AnimationPauser";
import { site, capacity } from "@/lib/site";
import { packages, currentPrice } from "@/lib/packages";

// Datos estructurados para Google (negocio local + ofertas).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: site.name,
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "BO" },
  maximumAttendeeCapacity: capacity.totalGuests,
  makesOffer: packages.map((p) => ({
    "@type": "Offer",
    name: `Paquete ${p.name}`,
    price: currentPrice(p),
    priceCurrency: "BOB",
  })),
};

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-sunset focus:px-5 focus:py-3 focus:font-bold focus:text-ink"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Welcome />
        <Services />
        <PartyTimeline />
        <Packages />
        <Gallery />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <FloatingActions />
      <AnimationPauser />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
