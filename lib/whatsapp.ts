import { site, formatBs } from "./site";

/** Link a WhatsApp con un mensaje prellenado. */
export function waLink(text?: string): string {
  const msg =
    text ?? `¡Hola, ${site.name}! Quiero información para celebrar un cumpleaños. ¿Me ayudan?`;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

/** Mensaje corto para consultar por un paquete específico. */
export function packageMessage(name: string, price: number): string {
  return `¡Hola, ${site.name}! Me interesa el *Paquete ${name}* (Bs ${formatBs(price)}). ¿Qué fechas tienen disponibles?`;
}
