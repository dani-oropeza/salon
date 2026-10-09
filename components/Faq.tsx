"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { WhatsAppIcon } from "./ui/BrandIcons";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" className="grain relative bg-sand-50 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-6 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              align="left"
              eyebrow="Preguntas frecuentes"
              title="Todo lo que necesitas saber"
              subtitle="¿No encuentras tu respuesta? Escríbenos y te ayudamos en minutos."
            />
            <Reveal className="mt-6">
              <a
                href={waLink("¡Hola, Mundo Aventura! Tengo una consulta sobre el salón.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-jungle-700 px-6 font-bold text-cream transition-colors hover:bg-jungle-800"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Hacer una consulta
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal className="lg:col-span-8">
          <ul className="divide-y divide-ink/10 rounded-[2rem] bg-cream px-5 shadow-soft ring-1 ring-ink/5 sm:px-8">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      id={`faq-btn-${i}`}
                      className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left font-sans text-[1.02rem] font-bold text-ink"
                    >
                      {f.q}
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ${
                          isOpen ? "rotate-45 bg-sunset text-ink" : "bg-sand-100 text-ink-soft"
                        }`}
                      >
                        <Plus className="h-4 w-4" aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-12 text-[0.95rem] leading-relaxed text-ink-soft">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
