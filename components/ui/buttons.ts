// Clases compartidas de botones (todos ≥ 44px de alto para el dedo).
const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-bold tracking-[0.01em] transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export const btn = {
  /** Llamado principal: naranja del letrero con texto oscuro (6.9:1). */
  primary: `${base} bg-sunset text-ink shadow-glow hover:bg-amber`,
  /** Verde selva sobre fondos claros. */
  secondary: `${base} bg-jungle-700 text-cream hover:bg-jungle-800`,
  /** Contorno sobre fondos claros. */
  outline: `${base} border-2 border-ink/15 text-ink hover:border-ink/30 hover:bg-ink/[0.04]`,
  /** Vidrio sobre fotos/fondos oscuros. */
  ghostLight: `${base} border border-cream/30 bg-cream/10 text-cream backdrop-blur-md hover:bg-cream/20`,
};
