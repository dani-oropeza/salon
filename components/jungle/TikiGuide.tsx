"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TikiFace } from "./TikiFace";

// Lo que dice el Tiki. El primero aparece solo; el resto, al tocarlo.
const lines = [
  "¡Hola, explorador! Soy Tiki, guardián del templo.",
  "El cumpleañero se sienta en mi trono.",
  "Psst… hay un mono columpiándose más abajo.",
  "Tres zonas de juego: ¡nadie se aburre!",
  "Elige tu paquete, escríbenos y te espero en la fiesta.",
];

/**
 * Mascota guía: el Tiki flota, parpadea y "habla" con globos de diálogo.
 * Al tocarlo salta y dice la siguiente frase.
 * El contenedor no fija `position`: quien lo usa lo ubica (absolute, etc.).
 */
export function TikiGuide({
  className = "",
  bubbleSide = "left",
}: {
  className?: string;
  bubbleSide?: "left" | "right";
}) {
  const [index, setIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [talking, setTalking] = useState(false);
  const [hop, setHop] = useState(0);
  const timers = useRef<number[]>([]);

  const say = (i: number) => {
    timers.current.forEach(clearTimeout);
    setIndex(i);
    setShowBubble(true);
    setTalking(true);
    timers.current = [
      window.setTimeout(() => setTalking(false), 1400),
      window.setTimeout(() => setShowBubble(false), 9000),
    ];
  };

  // Saludo inicial, cuando ya terminó la entrada del hero.
  useEffect(() => {
    const list = timers.current;
    list.push(
      window.setTimeout(() => {
        setShowBubble(true);
        setTalking(true);
      }, 1600),
      window.setTimeout(() => setTalking(false), 3000),
      window.setTimeout(() => setShowBubble(false), 10600),
    );
    return () => list.forEach(clearTimeout);
  }, []);

  return (
    <div className={`pointer-events-none ${className}`}>
      <AnimatePresence>
        {showBubble && (
          <motion.p
            key="bubble"
            role="status"
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            // Móvil: arriba del Tiki y angosto (no tapa la foto). Escritorio: al costado.
            className={`absolute bottom-full right-0 mb-1 w-max max-w-[10.5rem] origin-bottom-right rounded-2xl rounded-br-md bg-cream px-3.5 py-2.5 text-[0.8rem] font-bold leading-snug text-ink shadow-lift lg:bottom-[88%] lg:mb-0 lg:max-w-[13.5rem] lg:text-[0.82rem] ${
              bubbleSide === "left"
                ? "lg:right-[55%]"
                : "lg:left-[55%] lg:right-auto lg:origin-bottom-left lg:rounded-br-2xl lg:rounded-bl-md"
            }`}
          >
            {/* Un solo globo: cambia el texto (no se apilan globos viejos) */}
            <span key={index} className="animate-fade-up block" style={{ animationDuration: "0.35s" }}>
              {lines[index]}
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Tiki, el guía de Mundo Aventura. Toca para escuchar otro dato."
        onClick={() => {
          setHop((h) => h + 1);
          say((index + 1) % lines.length);
        }}
        className="tiki-bob pointer-events-auto block h-full w-full rounded-full focus-visible:outline-offset-4"
      >
        <motion.span
          key={hop}
          className="block h-full w-full"
          initial={hop ? { y: 0, rotate: 0 } : false}
          animate={hop ? { y: [0, -18, 0], rotate: [0, -6, 4, 0] } : undefined}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <TikiFace talking={talking} className="h-full w-full drop-shadow-[0_10px_18px_rgb(0_0_0/0.4)]" />
        </motion.span>
      </motion.button>
    </div>
  );
}
