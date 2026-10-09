/**
 * Adorno de sección: un brote de hojas tallado (en lugar de una etiqueta en
 * mayúsculas, que es un rasgo genérico). El título ya nombra la sección, así
 * que es puramente decorativo.
 */
export function Eyebrow({
  tone = "dark",
  className = "",
}: {
  children?: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const a = tone === "light" ? "var(--leaf-500)" : "var(--leaf-600)";
  const b = tone === "light" ? "var(--amber)" : "var(--jungle-700)";
  return (
    <svg viewBox="0 0 56 22" aria-hidden focusable="false" className={`h-[1.375rem] w-14 ${className}`}>
      <path d="M4 17 C 16 15, 30 10, 52 5" stroke={b} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M16 15 C 14 9, 18 4, 24 3 C 25 9, 21 13, 16 15 Z" fill={a} />
      <path d="M27 12 C 30 17, 36 19, 41 17 C 38 12, 32 10, 27 12 Z" fill={b} />
      <path d="M36 9 C 35 4, 39 0, 45 0 C 45 5, 41 8, 36 9 Z" fill={a} />
      <circle cx="52" cy="5" r="2.4" fill={b} />
    </svg>
  );
}
