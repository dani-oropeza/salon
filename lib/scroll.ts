/** Desplaza suavemente hasta una sección (respeta reduced-motion vía CSS). */
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}
