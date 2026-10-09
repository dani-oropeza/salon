import Image from "next/image";
import { capacity, EVENT_HOURS } from "@/lib/site";
import { totalServices } from "@/lib/services";
import { reasons } from "@/lib/content";
import { venue, events } from "@/lib/images";
import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/Eyebrow";
import { Icon } from "./ui/Icon";
import { LeafFringe } from "./jungle/LeafFringe";

const stats = [
  { value: `${EVENT_HOURS} h`, label: "de fiesta" },
  { value: String(totalServices), label: "servicios incluidos" },
  { value: `${capacity.kidsSeated}+${capacity.adultsSeated}`, label: "niños y adultos sentados" },
  { value: "3", label: "zonas de juego" },
];

export function Welcome() {
  return (
    <section id="experiencia" className="grain relative bg-sand-50 pb-20 md:pb-28">
      <LeafFringe position="top" color="var(--jungle-950)" />
      {/* Cifras clave, montadas sobre el borde del hero */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <Reveal y={16} className="-mt-6 md:-mt-10">
          <dl className="grid grid-cols-2 overflow-hidden rounded-3xl bg-cream shadow-lift ring-1 ring-ink/5 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center px-3 py-5 text-center md:py-7 ${
                  i % 2 === 0 ? "border-r border-ink/[0.07]" : ""
                } ${i < 2 ? "border-b border-ink/[0.07] md:border-b-0" : ""} ${
                  i === 1 ? "md:border-r" : ""
                }`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[2rem] font-semibold leading-none text-jungle-700 md:text-[2.6rem]">
                  {s.value}
                </dd>
                <dd className="mt-1.5 text-[0.8rem] font-semibold leading-snug text-ink-soft md:text-sm">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl items-center gap-12 px-5 md:mt-24 md:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Collage */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mr-10 aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift sm:mr-24 lg:mr-16">
            <Image
              src={venue.temploVertical}
              alt="Templo maya del salón iluminado con luces cálidas"
              fill
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 70vw, 85vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-0 w-[52%] overflow-hidden rounded-[1.5rem] border-[6px] border-sand-50 shadow-lift sm:w-[46%]">
            <div className="relative aspect-[4/3]">
              <Image
                src={events.trampolinesEvento}
                alt="Niñas saltando felices en los trampolines"
                fill
                sizes="(min-width: 1024px) 260px, 50vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
          {/* Sello */}
          <div className="absolute -top-5 right-4 flex h-28 w-28 rotate-[8deg] flex-col items-center justify-center rounded-full bg-sunset text-center text-ink shadow-glow sm:right-16 lg:right-8">
            <span className="font-display text-[1.7rem] font-semibold leading-none">100%</span>
            <span className="mt-1 px-3 text-[0.75rem] font-extrabold leading-tight">
              temático y listo
            </span>
          </div>
        </Reveal>

        {/* Texto */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>Bienvenidos</Eyebrow>
            <h2 className="mt-4 text-[2.15rem] font-semibold leading-[1.05] text-ink md:text-[3rem]">
              Un lugar seguro, divertido y lleno de magia
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft md:text-[1.075rem]">
              Creamos experiencias inolvidables para niños y familias: ambientes llenos de aventura,
              espacios cómodos para los adultos y un servicio de calidad para que la fiesta salga
              perfecta.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-5 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 0.06} className="flex gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-jungle-700/10 text-jungle-700">
                    <Icon name={r.icon} className="h-[1.35rem] w-[1.35rem]" />
                  </span>
                  <div>
                    <h3 className="text-[1.15rem] font-semibold leading-snug text-ink">{r.title}</h3>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft">{r.text}</p>
                  </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
