import Image from "next/image";
import { events } from "@/lib/images";
import { startingPrice } from "@/lib/packages";
import { formatBs } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "./ui/Reveal";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { btn } from "./ui/buttons";

export function FinalCta() {
  return (
    <section aria-label="Reserva tu fecha" className="relative isolate overflow-hidden bg-jungle-950 text-cream">
      <Image
        src={events.temploPayaso}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-10 object-cover object-[50%_35%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-jungle-950 via-jungle-950/75 to-jungle-950/40" />

      <div className="mx-auto flex min-h-[520px] max-w-6xl flex-col items-center justify-end px-5 pb-16 pt-28 text-center md:min-h-[560px] md:justify-center md:pb-24">
        <Reveal className="flex flex-col items-center">
          <h2 className="max-w-3xl text-[2.4rem] font-semibold leading-[1.04] md:text-[3.6rem]">
            ¿Listos para la aventura? Las mejores fechas vuelan
          </h2>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-cream/80">
            Asegura el día de su cumpleaños hoy. 5 horas de fiesta, todo el salón para ustedes, desde
            Bs {formatBs(startingPrice)}.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={btn.primary}>
              <WhatsAppIcon className="h-5 w-5" />
              Reservar por WhatsApp
            </a>
            <a href="#paquetes" className={btn.ghostLight}>
              Ver paquetes
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
