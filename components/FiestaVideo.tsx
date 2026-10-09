"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Pause, Play, X } from "lucide-react";
import { media } from "@/lib/images";
import { Vine } from "./jungle/Vine";
import { Monstera } from "./jungle/Monstera";

const TEASER = "/videos/fiesta-avance.mp4";
const FULL_720 = "/videos/fiesta-720.mp4";
const FULL_1080 = "/videos/fiesta-1080.mp4";
const DURATION = "1:46";

type NetworkInfo = { saveData?: boolean };

/** El avance mudo solo se reproduce si el usuario no pidió menos movimiento ni ahorro de datos. */
function canAutoplay() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = (navigator as Navigator & { connection?: NetworkInfo }).connection?.saveData;
  return !reduce && !saveData;
}

/** Celular o ahorro de datos → 720p; pantallas grandes → 1080p. */
function pickFullSource() {
  const saveData = (navigator as Navigator & { connection?: NetworkInfo }).connection?.saveData;
  return window.innerWidth >= 1024 && !saveData ? FULL_1080 : FULL_720;
}

/**
 * Video de una fiesta real: un avance mudo en loop (≈9 s, ~2 MB) que se
 * reproduce solo al estar en pantalla, y el video completo con sonido que
 * recién se descarga al tocar "Ver video".
 */
export function FiestaVideo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const teaserRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [teaserOn, setTeaserOn] = useState(false); // el avance está reproduciéndose
  const [userPaused, setUserPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullSrc, setFullSrc] = useState<string | null>(null);

  // Avance: carga diferida y play/pause según visibilidad.
  useEffect(() => {
    const card = cardRef.current;
    const video = teaserRef.current;
    if (!card || !video || !canAutoplay()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused && !open) {
          if (!video.getAttribute("src")) video.src = TEASER;
          video.play().then(() => setTeaserOn(true)).catch(() => setTeaserOn(false));
        } else {
          video.pause();
          setTeaserOn(false);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(card);
    return () => io.disconnect();
  }, [userPaused, open]);

  // Modal: Escape para cerrar, bloquea el scroll y enfoca el botón de cerrar.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggleTeaser = () => {
    const video = teaserRef.current;
    if (!video) return;
    if (teaserOn) {
      video.pause();
      setTeaserOn(false);
      setUserPaused(true);
    } else {
      if (!video.getAttribute("src")) video.src = TEASER;
      setUserPaused(false);
      video.play().then(() => setTeaserOn(true)).catch(() => {});
    }
  };

  const openFull = () => {
    setFullSrc(pickFullSource());
    setOpen(true);
  };

  return (
    <div className="mx-auto mt-20 max-w-4xl md:mt-24">
      <div className="mb-6 text-center">
        <h3 className="text-[1.75rem] font-semibold leading-tight md:text-[2.2rem]">Mira una fiesta real</h3>
        <p className="mx-auto mt-2 max-w-md text-[0.98rem] leading-relaxed text-cream/75">
          {DURATION} minutos de aventura: así se vivió un cumpleaños en el salón.
        </p>
      </div>

      <div ref={cardRef} className="relative">
        {/* Selva alrededor del marco */}
        <Vine
          length={130}
          delay={-3}
          className="pointer-events-none absolute -top-2 left-6 z-[3] md:left-10"
          stem="#3d7a3a"
          leafA="#5f9e3c"
          leafB="var(--leaf-500)"
        />
        <Monstera
          className="pointer-events-none absolute -bottom-10 -right-8 z-[3] w-28 rotate-[-130deg] md:-right-12 md:w-36"
          color="#24603a"
        />

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-jungle-950 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] ring-2 ring-amber/40 sm:aspect-video">
          <Image
            src={media.portadaVideo}
            alt="Niños jugando a la soga frente al templo maya durante una fiesta"
            fill
            sizes="(min-width: 896px) 896px, 100vw"
            placeholder="blur"
            className="object-cover"
          />
          <video
            ref={teaserRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            tabIndex={-1}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              teaserOn ? "opacity-100" : "opacity-0"
            }`}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-jungle-950/80 via-jungle-950/10 to-jungle-950/20" />

          {/* Ver el video completo */}
          <button
            type="button"
            onClick={openFull}
            className="group absolute inset-0 flex flex-col items-center justify-end gap-3 pb-8 text-cream sm:justify-center sm:pb-0"
            aria-label={`Ver el video completo con sonido (${DURATION})`}
          >
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-sunset text-ink shadow-glow transition-transform duration-200 group-hover:scale-105 group-active:scale-95 md:h-24 md:w-24">
              <Play className="ml-1 h-8 w-8 fill-current md:h-10 md:w-10" aria-hidden />
            </span>
            <span className="rounded-full bg-jungle-950/60 px-4 py-1.5 text-[0.9rem] font-bold backdrop-blur-sm">
              Ver video con sonido ({DURATION})
            </span>
          </button>

          {/* Pausar / reanudar el avance (contenido que se mueve solo) */}
          <button
            type="button"
            onClick={toggleTeaser}
            aria-label={teaserOn ? "Pausar el avance" : "Reproducir el avance"}
            className="absolute right-3 top-3 z-[2] inline-flex h-11 w-11 items-center justify-center rounded-full bg-jungle-950/55 text-cream backdrop-blur-sm transition-colors hover:bg-jungle-950/80"
          >
            {teaserOn ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Reproductor a pantalla completa. Va en un portal a <body>: la sección
          crea su propio contexto de apilamiento y el menú quedaría encima. */}
      {open &&
        fullSrc &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Video de una fiesta en Mundo Aventura"
            className="animate-fade-up fixed inset-0 z-[70] flex flex-col bg-jungle-950/95 backdrop-blur-md"
            style={{ animationDuration: "0.25s" }}
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <div className="flex justify-end px-4 pt-[max(1rem,env(safe-area-inset-top))]">
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar video"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center px-2 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
              <video
                src={fullSrc}
                poster={media.portadaVideo.src}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="max-h-full w-full max-w-6xl rounded-2xl bg-black shadow-2xl"
              >
                Tu navegador no puede reproducir este video.
              </video>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
