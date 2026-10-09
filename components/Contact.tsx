import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { attentionHours, shifts, site } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Icon } from "./ui/Icon";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "./ui/BrandIcons";

export function SocialLinks({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const links = [
    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  ].filter((l) => l.href);
  return (
    <ul className="flex gap-2">
      {links.map(({ href, label, Icon: I }) => (
        <li key={label}>
          <a
            href={href!}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} en ${label}`}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
              tone === "light"
                ? "bg-cream/10 text-cream hover:bg-cream/20"
                : "bg-ink/[0.06] text-ink hover:bg-ink/10"
            }`}
          >
            <I className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Contact() {
  const hasCoords = site.lat != null && site.lng != null;
  const query = hasCoords ? `${site.lat},${site.lng}` : site.mapQuery;
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${hasCoords ? 17 : 13}&hl=es&output=embed`;
  const mapsUrl =
    site.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

  return (
    <section id="contacto" className="grain relative bg-sand-100 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <SectionHeading
          eyebrow="Ubicación y contacto"
          title="Te esperamos en el salón"
          subtitle="Agenda una visita para conocer el salón antes de reservar. ¡A los niños les encanta!"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6 rounded-[2rem] bg-cream p-6 shadow-soft ring-1 ring-ink/5 sm:p-8">
              <div className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-jungle-700/10 text-jungle-700">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-sans text-base font-bold text-ink">Dirección</h3>
                  <p className="mt-0.5 text-[0.95rem] text-ink-soft">{site.address}</p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-[0.9rem] font-bold text-jungle-700 underline-offset-4 hover:underline"
                  >
                    Cómo llegar
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-jungle-700/10 text-jungle-700">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex-1">
                  <h3 className="font-sans text-base font-bold text-ink">Turnos de fiesta</h3>
                  <ul className="mt-1 space-y-1">
                    {shifts.map((s) => (
                      <li key={s.id} className="flex items-center justify-between gap-3 text-[0.95rem]">
                        <span className="inline-flex items-center gap-2 text-ink-soft">
                          <Icon name={s.icon} className="h-4 w-4 text-sunset-600" />
                          {s.label}
                        </span>
                        <span className="font-semibold tabular-nums text-ink">{s.time}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-4 font-sans text-base font-bold text-ink">Atención y visitas</h3>
                  <ul className="mt-1 space-y-1">
                    {attentionHours.map((h) => (
                      <li key={h.days} className="flex items-center justify-between gap-3 text-[0.95rem]">
                        <span className="text-ink-soft">{h.days}</span>
                        <span className="font-semibold tabular-nums text-ink">{h.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-jungle-700/10 text-jungle-700">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-sans text-base font-bold text-ink">WhatsApp</h3>
                  <p className="mt-0.5 text-[0.95rem] tabular-nums text-ink-soft">{site.whatsappDisplay}</p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
                <a
                  href={waLink("¡Hola, Mundo Aventura! Me gustaría agendar una visita para conocer el salón.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-jungle-700 px-5 font-bold text-cream transition-colors hover:bg-jungle-800"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Agendar visita
                </a>
                <SocialLinks />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-3">
            <div className="relative h-[300px] overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-ink/5 sm:h-[380px] lg:h-full lg:min-h-[420px]">
              <iframe
                src={embedSrc}
                title={`Mapa de ubicación de ${site.name}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
