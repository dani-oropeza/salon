"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Sendero punteado que se "recorre" a medida que se hace scroll por la
 * sección (vertical en móvil, horizontal en escritorio). Solo anima
 * transform (scale), así que es barato. Con reduced-motion queda completo.
 */
export function Trail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  const dashesV =
    "repeating-linear-gradient(to bottom, var(--amber) 0 7px, transparent 7px 15px)";
  const dashesH =
    "repeating-linear-gradient(to right, var(--amber) 0 7px, transparent 7px 15px)";

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {/* Vertical (móvil/tablet) */}
      <span className="absolute bottom-6 left-[1.6rem] top-2 w-[2px] -translate-x-1/2 opacity-25 lg:hidden" style={{ backgroundImage: dashesV }} />
      <motion.span
        className="absolute bottom-6 left-[1.6rem] top-2 w-[2px] -translate-x-1/2 origin-top lg:hidden"
        style={{ backgroundImage: dashesV, scaleY: progress }}
      />
      {/* Horizontal (escritorio) */}
      <span className="absolute left-[10%] right-[10%] top-[1.6rem] hidden h-[2px] -translate-y-1/2 opacity-25 lg:block" style={{ backgroundImage: dashesH }} />
      <motion.span
        className="absolute left-[10%] right-[10%] top-[1.6rem] hidden h-[2px] -translate-y-1/2 origin-left lg:block"
        style={{ backgroundImage: dashesH, scaleX: progress }}
      />
    </div>
  );
}
