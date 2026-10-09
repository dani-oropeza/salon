/**
 * Mono tallado colgando de una liana, se columpia como péndulo desde el
 * punto de anclaje superior. Formas planas en tonos madera.
 */
export function SwingingMonkey({ className = "", ropeLength = 90 }: { className?: string; ropeLength?: number }) {
  const fur = "#5b3519";
  const face = "#c99258";
  const r = ropeLength;
  return (
    <svg
      viewBox={`0 0 130 ${r + 140}`}
      aria-hidden
      focusable="false"
      className={`animate-pendulum ${className}`}
    >
      {/* Liana */}
      <path d={`M65 0 C 60 ${r * 0.3}, 70 ${r * 0.6}, 65 ${r}`} stroke="var(--jungle-800)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g fill="var(--jungle-700)">
        <path d={`M65 ${r * 0.28} c 8 -7 20 -6 24 1 c -8 6 -18 6 -24 -1 Z`} />
        <path d={`M65 ${r * 0.55} c -8 -7 -20 -6 -24 1 c 8 6 18 6 24 -1 Z`} />
      </g>

      <g transform={`translate(0 ${r - 70})`}>
        {/* Brazo agarrado a la liana */}
        <path d="M65 70 C 66 82, 70 92, 72 102" stroke={fur} strokeWidth="10" strokeLinecap="round" fill="none" />
        <circle cx="65" cy="69" r="6" fill={face} />
        {/* Cola enroscada */}
        <path d="M84 150 C 108 152, 114 176, 100 184 C 90 190, 84 180, 92 176" stroke={fur} strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Cuerpo */}
        <ellipse cx="72" cy="140" rx="19" ry="25" fill={fur} transform="rotate(10 72 140)" />
        <ellipse cx="74" cy="145" rx="10" ry="15" fill={face} transform="rotate(10 74 145)" />
        {/* Brazo que saluda */}
        <g className="monkey-wave">
          <path d="M60 126 C 46 132, 36 124, 32 110" stroke={fur} strokeWidth="9" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="108" r="5.5" fill={face} />
        </g>
        {/* Piernas */}
        <path d="M64 160 C 58 174, 52 182, 44 186" stroke={fur} strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M80 162 C 84 176, 90 182, 98 184" stroke={fur} strokeWidth="9" strokeLinecap="round" fill="none" />
        {/* Cabeza */}
        <circle cx="58" cy="108" r="21" fill={fur} />
        <circle cx="37" cy="104" r="8" fill={fur} />
        <circle cx="37" cy="104" r="4" fill={face} />
        <circle cx="79" cy="102" r="8" fill={fur} />
        <circle cx="79" cy="102" r="4" fill={face} />
        <path d="M44 108 C 44 98, 52 95, 58 100 C 64 95, 73 98, 72 108 C 72 120, 64 126, 58 126 C 51 126, 44 120, 44 108 Z" fill={face} />
        <g className="monkey-eyes" fill="#2a1609">
          <circle cx="52" cy="106" r="2.6" />
          <circle cx="64" cy="105" r="2.6" />
        </g>
        <path d="M51 116 C 55 120, 61 120, 65 115" stroke="#2a1609" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
