/**
 * Luciérnagas: puntos ámbar que flotan y titilan (eco de las luces LED del
 * templo). Posiciones pseudoaleatorias con semilla fija → sin desfases de
 * hidratación. Solo anima transform y opacity.
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Fireflies({
  count = 14,
  seed = 7,
  className = "",
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const rand = mulberry32(seed);
  const flies = Array.from({ length: count }, (_, i) => ({
    i,
    left: rand() * 100,
    top: rand() * 100,
    size: 3 + rand() * 3,
    drift: 6 + rand() * 6,
    blink: 2.2 + rand() * 2.8,
    delay: -rand() * 8,
    dx: (rand() - 0.5) * 40,
    dy: -(10 + rand() * 30),
  }));

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {flies.map((f) => (
        <span
          key={f.i}
          className="firefly absolute"
          style={
            {
              left: `${f.left}%`,
              top: `${f.top}%`,
              "--dx": `${f.dx}px`,
              "--dy": `${f.dy}px`,
              animationDuration: `${f.drift}s`,
              animationDelay: `${f.delay}s`,
            } as React.CSSProperties
          }
        >
          <span
            className="firefly-glow block rounded-full"
            style={{
              width: f.size,
              height: f.size,
              animationDuration: `${f.blink}s`,
              animationDelay: `${f.delay}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
