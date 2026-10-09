import { formatBs } from "@/lib/site";

/** Precio con "Bs" pequeño. `strike` lo muestra tachado (precio regular). */
export function Price({
  value,
  strike = false,
  className = "",
}: {
  value: number;
  strike?: boolean;
  className?: string;
}) {
  if (strike) {
    return (
      <s className={`tabular-nums ${className}`} aria-label={`Antes Bs ${formatBs(value)}`}>
        Bs {formatBs(value)}
      </s>
    );
  }
  return (
    <span className={`inline-flex items-baseline gap-1 tabular-nums ${className}`}>
      <span className="text-[0.45em] font-bold uppercase tracking-wide opacity-70">Bs</span>
      {formatBs(value)}
    </span>
  );
}
