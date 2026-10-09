"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { startingPrice } from "@/lib/packages";
import { EVENT_HOURS, promo, formatBs } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { btn } from "./ui/buttons";

/**
 * Móvil: barra inferior con precio "desde" + Reservar (WhatsApp).
 * Escritorio: botón flotante de WhatsApp.
 * Se muestran tras pasar el hero y se ocultan sobre el contacto y el
 * footer (allí ya hay llamados a la acción y estorbarían).
 */
export function FloatingActions() {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const blockers = ["contacto"]
      .map((id) => document.getElementById(id))
      .concat(document.querySelector("footer") as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];

    const visible = new Set<Element>();
    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), {
      rootMargin: "0px 0px -40% 0px",
    });
    const blockIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setBlocked(visible.size > 0);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    if (hero) heroIo.observe(hero);
    blockers.forEach((b) => blockIo.observe(b));
    return () => {
      heroIo.disconnect();
      blockIo.disconnect();
    };
  }, []);

  const show = pastHero && !blocked;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Móvil / tablet */}
          <motion.div
            key="bar"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-18px_rgb(30_26_20/0.4)] backdrop-blur-md lg:hidden"
          >
            <div className="mx-auto flex max-w-xl items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.78rem] font-bold text-sunset-600">
                  {promo.active ? promo.label : `${EVENT_HOURS} horas de fiesta`}
                </p>
                <p className="font-display text-xl font-semibold leading-tight text-ink">
                  Desde Bs {formatBs(startingPrice)}
                </p>
              </div>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btn.primary} shrink-0 !px-5`}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Reservar
              </a>
            </div>
          </motion.div>

          {/* Escritorio */}
          <motion.a
            key="fab"
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_16px_36px_-12px_rgb(37_211_102/0.7)] transition-transform hover:scale-105 lg:inline-flex"
          >
            <WhatsAppIcon className="h-7 w-7" />
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
