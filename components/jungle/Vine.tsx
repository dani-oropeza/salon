/**
 * Liana colgante con hojas alternadas, generada de forma determinística
 * (mismo resultado en servidor y cliente). Se mece desde su punto de anclaje
 * superior con la animación CSS `.animate-sway`.
 */
export function Vine({
  length = 200,
  sway = true,
  delay = 0,
  duration = 7,
  flip = false,
  className = "",
  stem = "var(--jungle-800)",
  leafA = "var(--jungle-700)",
  leafB = "var(--leaf-600)",
}: {
  length?: number;
  sway?: boolean;
  delay?: number;
  duration?: number;
  flip?: boolean;
  className?: string;
  stem?: string;
  leafA?: string;
  leafB?: string;
}) {
  const W = 60;
  const cx = W / 2;
  const amp = 5;
  const step = 18;

  // Tallo ondulado (seno suave) desde arriba hacia abajo.
  const pts: [number, number][] = [];
  for (let y = 0; y <= length; y += 6) {
    pts.push([cx + Math.sin(y / 28) * amp * (flip ? -1 : 1), y]);
  }
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y}`).join(" ");

  // Hojas alternadas, más chicas hacia la punta.
  const leaves = [];
  for (let y = 16, i = 0; y < length - 4; y += step, i++) {
    const x = cx + Math.sin(y / 28) * amp * (flip ? -1 : 1);
    const side = i % 2 === 0 ? 1 : -1;
    const t = y / length;
    const s = 1.05 - t * 0.45;
    const angle = side * (38 + (i % 3) * 8);
    leaves.push({ x, y, s, angle, fill: i % 3 === 1 ? leafB : leafA, key: y });
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${length + 14}`}
      width={W}
      height={length + 14}
      aria-hidden
      focusable="false"
      className={`${sway ? "animate-sway" : ""} ${className}`}
      style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    >
      <path d={d} stroke={stem} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {leaves.map((l) => (
        <g key={l.key} transform={`translate(${l.x.toFixed(1)} ${l.y}) rotate(${l.angle}) scale(${l.s.toFixed(2)})`}>
          {/* Hoja lanceolada con nervio central recortado */}
          <path d="M0 0 C 5 -7, 17 -8, 24 0 C 17 8, 5 7, 0 0 Z" fill={l.fill} />
          <path d="M2 0 L 19 0" stroke="var(--jungle-950)" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      ))}
      {/* Brote final */}
      <circle cx={pts[pts.length - 1][0]} cy={length + 2} r="3" fill={leafB} />
    </svg>
  );
}
