import type { ReactNode } from "react";

// Antes cada bloque aparecía con un fundido al hacer scroll. Siguiendo la
// skill frontend-design ("un solo momento orquestado"), el movimiento queda
// reservado para la selva animada y las respuestas a acciones del usuario.
// Se mantiene el componente para no tocar cada sección.
const tags = { div: "div", li: "li", article: "article" } as const;

export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof typeof tags;
}) {
  const Cmp = tags[as];
  return <Cmp className={className}>{children}</Cmp>;
}
