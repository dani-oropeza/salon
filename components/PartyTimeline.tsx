import Image from "next/image";
import { timeline } from "@/lib/content";
import { EVENT_HOURS } from "@/lib/site";
import { venue } from "@/lib/images";
import { SectionHeading } from "./ui/SectionHeading";
import { Icon } from "./ui/Icon";
import { Fireflies } from "./jungle/Fireflies";
import { SwingingMonkey } from "./jungle/SwingingMonkey";
import { Vine } from "./jungle/Vine";
import { Trail } from "./jungle/Trail";
import { FiestaVideo } from "./FiestaVideo";

export function PartyTimeline() {
  return (
    <section
      aria-label="Cronograma sugerido de la fiesta"
      data-anim-zone
      className="relative overflow-hidden bg-jungle-900 pb-24 pt-28 text-cream md:pb-32 md:pt-36"
    >
      {/* Templo de fondo, muy oscurecido */}
      <Image
        src={venue.temploPanoramica}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="object-cover opacity-[0.16]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-jungle-900 via-jungle-900/70 to-jungle-900" />
      <div aria-hidden className="glow-amber absolute inset-0" />
      <Fireflies count={18} seed={23} />

      {/* Lianas y el mono que se columpia */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[2]">
        <Vine length={120} delay={-2} className="absolute left-[5%] top-0" stem="#2c5a33" leafA="var(--leaf-600)" leafB="var(--leaf-500)" />
        <Vine length={200} delay={-4} flip className="absolute left-[22%] top-0 hidden md:block" stem="#2c5a33" leafA="var(--leaf-600)" leafB="var(--leaf-500)" />
        <SwingingMonkey className="absolute right-[5%] top-0 w-[5.5rem] md:right-[9%] md:w-[7.5rem]" ropeLength={70} />
      </div>

      <div className="relative z-[3] mx-auto max-w-6xl px-5 md:px-6">
        <SectionHeading
          tone="light"
          title={`Tu fiesta en ${EVENT_HOURS} horas`}
          subtitle="Una guía sugerida para aprovechar cada momento. Tú decides el ritmo; nosotros te ayudamos a organizarlo."
        />

        <div className="relative mt-14">
          <Trail />
          <ol className="relative grid gap-0 lg:grid-cols-5 lg:gap-6">
            {timeline.map((step) => (
              <li
                key={step.title}
                className="relative flex gap-5 pb-9 last:pb-0 lg:flex-col lg:items-center lg:pb-0 lg:text-center"
              >
                <span className="relative z-10 inline-flex h-[3.2rem] w-[3.2rem] shrink-0 items-center justify-center rounded-full bg-jungle-800 text-amber shadow-[0_0_30px_-6px_rgb(242_176_74/0.5)] ring-2 ring-amber/50">
                  <Icon name={step.icon} className="h-[1.35rem] w-[1.35rem]" />
                </span>
                <div className="pt-1 lg:pt-0">
                  <p className="font-display text-sm font-semibold tracking-wide text-amber tabular-nums">
                    {step.time} h
                  </p>
                  <h3 className="mt-1 text-[1.2rem] font-semibold leading-snug">{step.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-cream/70">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <FiestaVideo />
      </div>
    </section>
  );
}
