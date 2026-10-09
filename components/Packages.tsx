"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Minus, Sparkles } from "lucide-react";
import {
  packages,
  extras,
  extraById,
  baseInclusions,
  currentPrice,
  pricePerKid,
  totalSavings,
  type ExtraId,
  type Package,
} from "@/lib/packages";
import { capacity, promo, formatBs } from "@/lib/site";
import { packageMessage, waLink } from "@/lib/whatsapp";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Price } from "./ui/Price";
import { Icon } from "./ui/Icon";
import { LeafFringe } from "./jungle/LeafFringe";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { btn } from "./ui/buttons";

// Adicionales que diferencian a los paquetes (se listan en cada tarjeta).
const tierExtras: ExtraId[] = ["payaso", "invitacion", "fotoVideo"];

function PackageCard({ p, index }: { p: Package; index: number }) {
  const dark = !!p.featured;
  const price = currentPrice(p);
  const savings = totalSavings(p);

  return (
    <Reveal
      as="article"
      delay={index * 0.08}
      className={`relative flex w-[82%] shrink-0 snap-center flex-col rounded-[2rem] p-6 sm:w-[58%] sm:p-7 lg:w-auto ${
        dark
          ? "bg-jungle-900 text-cream shadow-[0_40px_80px_-36px_rgb(16_36_26/0.9)] ring-2 ring-amber lg:-my-4 lg:py-10"
          : "bg-cream text-ink shadow-soft ring-1 ring-ink/[0.07]"
      }`}
    >
      {dark && (
        <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-amber px-4 py-1.5 text-[0.85rem] font-extrabold text-ink shadow-soft">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Más elegido
        </span>
      )}

      <header>
        <p
          className={`text-[0.9rem] font-bold ${
            dark ? "text-amber" : "text-sunset-600"
          }`}
        >
          Paquete
        </p>
        <h3 className="mt-1 text-[2rem] font-semibold leading-none">{p.name}</h3>
        <p className={`mt-2 text-[0.95rem] font-semibold ${dark ? "text-cream/75" : "text-ink-soft"}`}>
          {p.tagline}
        </p>
      </header>

      {/* Precio */}
      <div className={`mt-6 border-t pt-5 ${dark ? "border-cream/10" : "border-ink/[0.08]"}`}>
        {promo.active && (
          <div className="flex items-center gap-2 text-[0.85rem] font-semibold">
            <Price
              value={p.regularPrice}
              strike
              className={dark ? "text-cream/55" : "text-ink-soft"}
            />
            <span
              className={`rounded-full px-2 py-0.5 text-[0.72rem] font-extrabold ${
                dark ? "bg-amber/20 text-amber" : "bg-sunset/15 text-sunset-700"
              }`}
            >
              −Bs {formatBs(promo.amount)}
            </span>
          </div>
        )}
        <p className="mt-1 font-display text-[3.2rem] font-semibold leading-none">
          <Price value={price} />
        </p>
        <p className={`mt-2 text-[0.85rem] ${dark ? "text-cream/70" : "text-ink-soft"}`}>
          ≈ Bs {pricePerKid(p)} por niño{" "}
          <span className="opacity-80">(con {capacity.kidsSeated} niños)</span>
        </p>
      </div>

      {/* Incluye */}
      <ul className="mt-6 space-y-3 text-[0.95rem]">
        {baseInclusions.slice(0, 3).map((item) => (
          <li key={item} className="flex gap-3">
            <Check
              className={`mt-0.5 h-5 w-5 shrink-0 ${dark ? "text-leaf-500" : "text-leaf-600"}`}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
        {tierExtras.map((id) => {
          const included = p.includes.includes(id);
          return (
            <li
              key={id}
              className={`flex gap-3 ${included ? "font-bold" : dark ? "text-cream/40" : "text-ink/40"}`}
            >
              {included ? (
                <span
                  className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    dark ? "bg-amber text-ink" : "bg-sunset text-ink"
                  }`}
                >
                  <Icon name={extraById[id].icon} className="h-3 w-3" strokeWidth={2.6} />
                </span>
              ) : (
                <Minus className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              )}
              <span>
                {extraById[id].name}
                <span className="sr-only">{included ? " (incluido)" : " (no incluido)"}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <p className={`mt-6 text-[0.88rem] leading-relaxed ${dark ? "text-cream/70" : "text-ink-soft"}`}>
        {p.idealFor}
      </p>

      {/* Acciones */}
      <div className="mt-auto pt-6">
        {savings > 0 && (
          <p
            className={`mb-3 text-center text-[0.8rem] font-bold ${
              dark ? "text-amber" : "text-leaf-600"
            }`}
          >
            Ahorras Bs {formatBs(savings)}
            {p.includes.length > 0 ? " vs. contratar todo por separado" : " con la promo"}
          </p>
        )}
        <a
          href={waLink(packageMessage(p.name, price))}
          target="_blank"
          rel="noopener noreferrer"
          className={`${dark ? btn.primary : btn.secondary} w-full`}
        >
          <WhatsAppIcon className="h-5 w-5" />
          Reservar {p.name}
        </a>
        <p className={`mt-2 text-center text-[0.8rem] ${dark ? "text-cream/60" : "text-ink-soft"}`}>
          Te confirmamos la disponibilidad por WhatsApp
        </p>
      </div>
    </Reveal>
  );
}

export function Packages() {
  const scroller = useRef<HTMLDivElement>(null);
  const featuredIndex = Math.max(0, packages.findIndex((p) => p.featured));
  const [visible, setVisible] = useState(featuredIndex);

  // Móvil: carrusel deslizable que arranca centrado en el paquete destacado.
  // El selector superior indica qué tarjeta se está viendo.
  useEffect(() => {
    const el = scroller.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const target = cards[featuredIndex];
    el.scrollLeft = target.offsetLeft - (el.clientWidth - target.clientWidth) / 2;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setVisible(cards.indexOf(e.target as HTMLElement));
      },
      { root: el, threshold: 0.6 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [featuredIndex]);

  const goTo = (i: number) => {
    const el = scroller.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  };

  return (
    <section id="paquetes" className="grain relative bg-sand-50 pb-20 pt-28 md:pb-28 md:pt-36">
      <LeafFringe position="top" color="var(--jungle-900)" />
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <SectionHeading
          eyebrow="Paquetes"
          title="Elige el paquete para tu fiesta"
          subtitle={
            <>
              Todos incluyen el salón completo con sus 15 servicios y 5 horas de fiesta.
              {promo.active && (
                <>
                  {" "}
                  <strong className="font-bold text-sunset-700">
                    {promo.label}: Bs {formatBs(promo.amount)} menos en todos.
                  </strong>
                </>
              )}
            </>
          }
        />

        {/* Selector (solo móvil/tablet) */}
        <div className="mt-10 flex justify-center lg:hidden">
          <div role="group" aria-label="Ver paquete" className="inline-flex rounded-full bg-sand-100 p-1 ring-1 ring-inset ring-ink/10">
            {packages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                aria-pressed={visible === i}
                className={`min-h-10 rounded-full px-3.5 text-[0.85rem] font-bold transition-colors ${
                  visible === i ? "bg-jungle-700 text-cream shadow-soft" : "text-ink-soft"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scroller}
          className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 pt-6 lg:mx-0 lg:mt-14 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-6 lg:overflow-visible lg:p-0"
        >
          {packages.map((p, i) => (
            <PackageCard key={p.id} p={p} index={i} />
          ))}
        </div>
        <p className="text-center text-[0.8rem] font-semibold text-ink-soft lg:hidden">
          Desliza para comparar los paquetes
        </p>

        {/* Adicionales */}
        <Reveal className="mt-16 rounded-[2rem] bg-sand-100 p-6 ring-1 ring-ink/[0.06] sm:p-8 md:mt-20">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-[1.6rem] font-semibold leading-tight text-ink">
                Personaliza con adicionales
              </h3>
              <p className="mt-1 text-[0.95rem] text-ink-soft">
                Súmalos a cualquier paquete al reservar. Precios referenciales.
              </p>
            </div>
            <a
              href={waLink("¡Hola, Mundo Aventura! Quiero información sobre los adicionales para mi fiesta.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-bold text-jungle-700 underline-offset-4 hover:underline"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Consultar adicionales
            </a>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {extras.map((e) => (
              <li
                key={e.id}
                className="flex items-center gap-3 rounded-2xl bg-cream p-4 ring-1 ring-ink/[0.06] lg:flex-col lg:items-start"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sunset/15 text-sunset-700">
                  <Icon name={e.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold leading-snug text-ink">{e.name}</p>
                  <p className="text-[0.82rem] text-ink-soft">
                    Bs {formatBs(e.price)}
                    {e.stackable ? " / hora" : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
