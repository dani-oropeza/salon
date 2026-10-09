/**
 * Flecos de hojas puntiagudas en el borde de una sección clara, del mismo
 * color que la sección oscura vecina: parece que la selva "se derrama" sobre
 * la sección (en lugar de un corte recto). Dos capas para dar profundidad.
 *
 * position="top": hojas que cuelgan desde arriba (la sección oscura está encima).
 * position="bottom": hojas que crecen hacia arriba (la sección oscura está debajo).
 */
export function LeafFringe({
  position = "top",
  color,
  back = "var(--jungle-700)",
  className = "",
}: {
  position?: "top" | "bottom";
  color: string;
  back?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-[1] h-16 md:h-20 ${
        position === "top" ? "top-0" : "bottom-0 rotate-180"
      } ${className}`}
    >
      <div className="leaf-fringe leaf-fringe-back absolute inset-x-0 top-0 h-full" style={{ backgroundColor: back }} />
      <div className="leaf-fringe absolute inset-x-0 -top-px h-[78%]" style={{ backgroundColor: color }} />
    </div>
  );
}
