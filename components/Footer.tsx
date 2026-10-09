import Image from "next/image";
import { nav, site, shifts } from "@/lib/site";
import { brand } from "@/lib/images";
import { waLink } from "@/lib/whatsapp";
import { SocialLinks } from "./Contact";

export function Footer() {
  return (
    <footer className="relative bg-jungle-950 pb-28 pt-16 text-cream md:pb-12">
      <div aria-hidden className="greca absolute inset-x-0 top-0 h-4 text-amber/20" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-12 md:px-6">
        <div className="md:col-span-5">
          <Image src={brand.logoLight} alt={site.name} className="h-20 w-auto" sizes="150px" />
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-cream/70">
            {site.category} en {site.city}. Un espacio seguro, divertido y acogedor para celebrar
            cumpleaños inolvidables.
          </p>
          <div className="mt-5">
            <SocialLinks tone="light" />
          </div>
        </div>

        <nav aria-label="Secciones" className="md:col-span-3">
          <h2 className="font-display text-lg font-semibold text-amber">
            Explora
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="inline-flex min-h-10 items-center text-[0.95rem] text-cream/80 hover:text-cream">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-display text-lg font-semibold text-amber">
            Contacto
          </h2>
          <ul className="mt-4 space-y-2 text-[0.95rem] text-cream/80">
            <li>{site.address}</li>
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                WhatsApp {site.whatsappDisplay}
              </a>
            </li>
            {shifts.map((s) => (
              <li key={s.id} className="tabular-nums">
                {s.label}: {s.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-cream/10 px-5 pt-6 text-[0.8rem] text-cream/50 sm:flex-row sm:justify-between md:px-6">
        <p>© {new Date().getFullYear()} {site.name}. Todos los derechos reservados.</p>
        <p>Precios en bolivianos (Bs), sujetos a cambio.</p>
      </div>
    </footer>
  );
}
