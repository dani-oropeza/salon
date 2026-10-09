import { useId } from "react";

/**
 * Hoja de monstera en estilo "tallado": silueta plana con las nervaduras y
 * los agujeros recortados (como las piezas del tiki del logo). La hoja cuelga
 * hacia abajo desde el tallo; rotala con `className` para ubicarla.
 */
export function Monstera({
  className = "",
  color = "var(--jungle-700)",
  style,
}: {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  const id = useId().replace(/:/g, "");
  const slitsLeft = [
    "M12 72 Q 50 78 92 62",
    "M8 106 Q 50 110 92 96",
    "M20 140 Q 56 142 93 128",
    "M48 170 Q 72 168 95 156",
  ];
  // Espejo horizontal de las ranuras (x → 200 − x).
  const mirror = (d: string) => d.replace(/(\d+(?:\.\d+)?) (\d+(?:\.\d+)?)/g, (_, x, y) => `${200 - Number(x)} ${y}`);

  return (
    <svg
      viewBox="0 0 200 230"
      aria-hidden
      className={className}
      style={style}
      focusable="false"
    >
      <defs>
        <mask id={`m-${id}`} maskUnits="userSpaceOnUse">
          <rect width="200" height="230" fill="white" />
          <g stroke="black" strokeWidth="7" strokeLinecap="round" fill="none">
            {slitsLeft.map((d) => (
              <path key={d} d={d} />
            ))}
            {slitsLeft.map((d) => (
              <path key={`r${d}`} d={mirror(d)} />
            ))}
            <path d="M100 40 L100 214" strokeWidth="3.5" />
          </g>
          <g fill="black">
            <ellipse cx="76" cy="84" rx="6" ry="4" />
            <ellipse cx="79" cy="117" rx="5.5" ry="4" />
            <ellipse cx="124" cy="84" rx="6" ry="4" />
            <ellipse cx="121" cy="117" rx="5.5" ry="4" />
            <ellipse cx="118" cy="148" rx="5" ry="3.5" />
          </g>
        </mask>
      </defs>
      {/* Tallo */}
      <path d="M100 0 C 98 14, 101 26, 100 40" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Hoja */}
      <path
        mask={`url(#m-${id})`}
        fill={color}
        d="M100 40 C 84 22, 38 20, 18 58 C -2 98, 14 168, 60 200 C 80 213, 92 220, 100 226 C 108 220, 120 213, 140 200 C 186 168, 202 98, 182 58 C 162 20, 116 22, 100 40 Z"
      />
    </svg>
  );
}
