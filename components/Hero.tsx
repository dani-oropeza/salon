import Image from "next/image";
import { Clock, Crown, Star, Users } from "lucide-react";
import { capacity, EVENT_HOURS, promo, formatBs } from "@/lib/site";
import { startingPrice } from "@/lib/packages";
import { events, services } from "@/lib/images";
import { btn } from "./ui/buttons";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { waLink } from "@/lib/whatsapp";
import { Vine } from "./jungle/Vine";
import { Monstera } from "./jungle/Monstera";
import { Fireflies } from "./jungle/Fireflies";
import { TikiGuide } from "./jungle/TikiGuide";

const facts = [
  { icon: Clock, label: `${EVENT_HOURS} horas de fiesta` },
  { icon: Users, label: `Hasta ${capacity.kidsSeated} niños` },
  { icon: Crown, label: "Salón exclusivo" },
];

// Lianas en tonos más vivos para que se lean sobre la foto y el fondo oscuro.
const vineOnDark = { stem: "#3d7a3a", leafA: "#5f9e3c", leafB: "var(--leaf-500)" };

export function Hero() {
  return (
    <section
      id="inicio"
      data-anim-zone
      className="relative overflow-hidden bg-jungle-950 pb-4 text-cream lg:flex lg:min-h-[94vh] lg:items-center lg:pb-0"
    >
      {/* Brillo cálido de fondo (escritorio) */}
      <div aria-hidden className="glow-amber pointer-events-none absolute inset-0 hidden lg:block" />

      {/* Canopia: lianas colgando desde arriba (por encima de la foto) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[3] drop-shadow-[0_3px_3px_rgb(0_0_0/0.45)]">
        {/* móvil */}
        <Vine length={150} delay={-1} className="absolute left-[4%] top-0 lg:hidden" {...vineOnDark} />
        <Vine length={230} delay={-3.5} duration={8} flip className="absolute right-[6%] top-0 lg:hidden" {...vineOnDark} />
        <Vine length={96} delay={-2} duration={6} className="absolute right-[30%] top-0 lg:hidden" {...vineOnDark} />
        {/* escritorio */}
        <Vine length={300} delay={-2} className="absolute left-[2%] top-0 hidden lg:block" {...vineOnDark} />
        <Vine length={150} delay={-4} duration={6.5} flip className="absolute left-[47%] top-0 hidden lg:block" {...vineOnDark} />
        <Vine length={250} delay={-1} duration={8} className="absolute right-[24%] top-0 hidden xl:block" {...vineOnDark} />
        <Vine length={340} delay={-5} flip className="absolute right-[3%] top-0 hidden lg:block" {...vineOnDark} />
      </div>

      <Fireflies count={16} seed={11} className="z-[2]" />

      <div className="relative mx-auto w-full max-w-6xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-6 lg:pb-24 lg:pt-36">
        {/* ---- Foto: arriba a sangre en móvil, tarjeta vertical en escritorio ---- */}
        <div className="relative h-[60svh] min-h-[420px] w-full lg:order-2 lg:col-span-6 lg:h-auto lg:min-h-0">
          <div className="relative h-full w-full overflow-hidden [mask-image:linear-gradient(to_bottom,#000_55%,transparent_99%)] lg:mx-auto lg:[mask-image:none] lg:aspect-[4/5] lg:max-w-[30rem] lg:rounded-[2.25rem] lg:shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] lg:ring-1 lg:ring-cream/10">
            <Image
              src={events.juegoAnimadora}
              alt="Cumpleañero con traje de explorador jugando frente al templo maya iluminado"
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="(min-width: 1024px) 480px, 100vw"
              placeholder="blur"
              className="object-cover object-[50%_30%]"
            />
            {/* Oscurece arriba para que se lea el menú (móvil); el fundido
                inferior lo hace la máscara del contenedor, sin costuras. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-jungle-950/50 via-jungle-950/10 to-jungle-950/30 lg:hidden"
            />
          </div>

          {/* Hojas de monstera que enmarcan la foto */}
          <Monstera
            className="pointer-events-none absolute -right-14 top-[14%] z-[3] w-32 rotate-[-120deg] opacity-95 lg:-right-16 lg:top-auto lg:bottom-24 lg:w-44 lg:rotate-[-105deg]"
            color="var(--jungle-700)"
          />
          <Monstera
            className="pointer-events-none absolute -left-12 -top-6 z-[1] hidden w-40 rotate-[150deg] lg:block xl:-left-16"
            color="#24603a"
          />

          {/* Tiki guía */}
          <TikiGuide
            className="absolute bottom-[9.75rem] right-3 z-[4] h-[7rem] w-[5.2rem] lg:-right-6 lg:bottom-[-2.5rem] lg:h-[10rem] lg:w-[7.3rem]"
          />

          {/* Tarjetas flotantes (escritorio) */}
          <div className="absolute -left-6 bottom-10 z-[2] hidden w-56 rounded-2xl bg-sand-50 p-2.5 text-ink shadow-lift lg:block xl:-left-10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={services.trono}
                alt="Trono del cumpleañero"
                fill
                sizes="224px"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <p className="px-1.5 pb-1 pt-2.5 font-display text-[0.95rem] font-semibold leading-tight">
              Trono del cumpleañero
            </p>
            <p className="px-1.5 pb-1 text-xs text-ink-soft">Su gran momento, en el templo</p>
          </div>

          <div className="absolute -right-2 top-8 z-[2] hidden rounded-2xl bg-jungle-900/90 px-4 py-3 shadow-lift ring-1 ring-cream/10 backdrop-blur-md lg:block xl:-right-6">
            <p className="text-[0.75rem] font-bold text-amber">Desde</p>
            <p className="font-display text-3xl font-semibold leading-none">
              <span className="mr-1 text-sm font-bold opacity-70">Bs</span>
              {formatBs(startingPrice)}
            </p>
            <p className="mt-1 text-xs text-cream/70">por {EVENT_HOURS} horas con todo el salón</p>
          </div>
        </div>

        {/* ---- Texto ---- */}
        <div className="relative z-[3] -mt-36 px-5 pb-12 sm:px-8 lg:order-1 lg:col-span-6 lg:mt-0 lg:px-0 lg:pb-0">
          {promo.active && (
            <a
              href="#paquetes"
              className="animate-fade-up inline-flex min-h-11 items-center gap-2 rounded-full bg-amber/15 py-1.5 pl-1.5 pr-3.5 text-[0.8rem] font-bold text-amber ring-1 ring-inset ring-amber/30 backdrop-blur-sm transition-colors hover:bg-amber/25"
            >
              <span className="inline-flex h-6 items-center gap-1 rounded-full bg-amber px-2 text-[0.72rem] text-ink">
                <Star className="h-3 w-3 fill-current" aria-hidden />
                Promo
              </span>
              Bs {formatBs(promo.amount)} menos por inauguración
            </a>
          )}

          <h1
            className="animate-fade-up mt-5 text-[2.6rem] font-semibold leading-[1.02] sm:text-[3.2rem] lg:text-[3.5rem] xl:text-[3.95rem]"
            style={{ animationDelay: "80ms" }}
          >
            Celebra su cumpleaños en&nbsp;un{" "}
            <span className="relative whitespace-nowrap">
              mundo de aventura
              {/* Liana que se dibuja bajo el titular, con hojas que brotan */}
              <svg
                aria-hidden
                viewBox="0 0 300 26"
                preserveAspectRatio="none"
                className="absolute -bottom-4 left-0 h-6 w-full overflow-visible"
              >
                <path
                  className="draw-on"
                  pathLength={1}
                  d="M3 12 C 50 4, 90 18, 140 10 S 230 4, 297 12"
                  fill="none"
                  stroke="var(--leaf-500)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {[
                  { x: 52, y: 8, r: -30, d: "1.1s" },
                  { x: 118, y: 13, r: 35, d: "1.3s" },
                  { x: 182, y: 7, r: -25, d: "1.5s" },
                  { x: 246, y: 9, r: 30, d: "1.7s" },
                ].map((l, i) => (
                  <path
                    key={l.x}
                    className="leaf-pop"
                    style={{ animationDelay: l.d }}
                    transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
                    d="M0 0 C 4 -6, 13 -6, 18 0 C 13 6, 4 6, 0 0 Z"
                    fill={i % 2 ? "var(--leaf-500)" : "var(--leaf-600)"}
                  />
                ))}
              </svg>
            </span>
          </h1>

          <p
            className="animate-fade-up mt-8 max-w-lg text-[1.05rem] leading-relaxed text-cream/80 lg:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Templo maya, trono del cumpleañero, resbalines, piscina de pelotas y trampolines. Un salón
            temático listo para que tú solo te ocupes de disfrutar.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={btn.primary}>
              <WhatsAppIcon className="h-5 w-5" />
              Reservar por WhatsApp
            </a>
            <a href="#paquetes" className={btn.ghostLight}>
              Ver paquetes desde Bs {formatBs(startingPrice)}
            </a>
          </div>

          <ul
            className="animate-fade-up mt-8 flex flex-wrap gap-x-5 gap-y-2.5 text-[0.88rem] font-semibold text-cream/85"
            style={{ animationDelay: "320ms" }}
          >
            {facts.map(({ icon: I, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <I className="h-4 w-4 text-leaf-500" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Monstera que crece desde el borde inferior izquierdo (escritorio) */}
      <Monstera
        className="pointer-events-none absolute -bottom-10 -left-10 z-[2] hidden w-52 rotate-[200deg] lg:block"
        color="#1d4a2c"
      />

    </section>
  );
}
