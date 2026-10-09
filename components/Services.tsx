"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { serviceGroups, totalServices, type ServiceGroupId } from "@/lib/services";
import { EVENT_HOURS } from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Icon } from "./ui/Icon";
import { LeafFringe } from "./jungle/LeafFringe";

export function Services() {
  const [active, setActive] = useState<ServiceGroupId>(serviceGroups[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Navegación con flechas entre pestañas (patrón WAI-ARIA tabs).
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + serviceGroups.length) % serviceGroups.length;
    setActive(serviceGroups[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="servicios" className="grain relative bg-sand-100 pb-28 pt-20 md:pb-36 md:pt-28">
      <LeafFringe position="bottom" color="var(--jungle-900)" />
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <SectionHeading
          eyebrow="Todo incluido"
          title={`${totalServices} servicios en cada paquete`}
          subtitle={`Elijas el paquete que elijas, todo el salón es tuyo durante ${EVENT_HOURS} horas: ambientes, decoración, juegos y cocina.`}
        />

        {/* Pestañas */}
        <Reveal className="mt-10">
          <div
            role="tablist"
            aria-label="Categorías de servicios"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0"
          >
            {serviceGroups.map((g, i) => {
              const selected = g.id === active;
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${g.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${g.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(g.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[0.92rem] font-bold transition-[background-color,color,box-shadow] duration-200 ${
                    selected
                      ? "bg-jungle-700 text-cream shadow-soft"
                      : "bg-cream text-ink-soft ring-1 ring-inset ring-ink/10 hover:text-ink hover:ring-ink/20"
                  }`}
                >
                  <Icon name={g.icon} className="h-4 w-4" />
                  {g.label}
                  <span
                    className={`rounded-full px-1.5 text-[0.7rem] tabular-nums ${
                      selected ? "bg-cream/15" : "bg-ink/[0.06]"
                    }`}
                  >
                    {g.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Paneles (todos en el DOM para SEO; solo uno visible) */}
        {serviceGroups.map((g) => (
          <div
            key={g.id}
            role="tabpanel"
            id={`panel-${g.id}`}
            aria-labelledby={`tab-${g.id}`}
            hidden={g.id !== active}
            className="mt-8"
          >
            <p className="animate-fade-up text-center text-[0.95rem] font-semibold text-ink-soft">
              {g.summary}
            </p>

            <ul className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0">
              {g.items.map((s, i) => (
                <li
                  key={s.name}
                  className="animate-fade-up w-[78%] shrink-0 snap-center sm:w-auto"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <article className="group h-full overflow-hidden rounded-[1.75rem] bg-cream shadow-soft ring-1 ring-ink/5">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 33vw, 78vw"
                        placeholder="blur"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent"
                      />
                      {s.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-amber px-3 py-1 text-[0.75rem] font-extrabold text-ink shadow-soft">
                          {s.badge}
                        </span>
                      )}
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-cream/90 px-2.5 py-1 text-[0.72rem] font-bold text-jungle-700 backdrop-blur">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                        Incluido
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[1.2rem] font-semibold leading-snug text-ink">{s.name}</h3>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
                        {s.description}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Reveal className="mt-10 flex justify-center">
          <a
            href="#paquetes"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.95rem] font-bold text-jungle-700 underline-offset-4 hover:underline"
          >
            Ver qué suma cada paquete
          </a>
        </Reveal>
      </div>
    </section>
  );
}
