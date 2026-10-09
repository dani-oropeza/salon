"use client";

import { useEffect } from "react";

/**
 * Pausa las animaciones CSS decorativas (lianas, luciérnagas, Tiki, mono)
 * de las secciones que no están en pantalla. Marca con `data-anim-zone` las
 * secciones animadas; aquí se les agrega `data-paused` cuando salen de vista.
 */
export function AnimationPauser() {
  useEffect(() => {
    const zones = document.querySelectorAll<HTMLElement>("[data-anim-zone]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute("data-paused", !e.isIntersecting);
      },
      { rootMargin: "120px 0px" },
    );
    zones.forEach((z) => io.observe(z));
    return () => io.disconnect();
  }, []);
  return null;
}
