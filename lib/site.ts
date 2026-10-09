// Configuración general del sitio Mundo Aventura.
//
// ⚠️ Los valores marcados con "PENDIENTE" son supuestos razonables para el
// diseño y deben confirmarse con el negocio antes de publicar.
// Ver PENDIENTES.md en la raíz del proyecto.

export const site = {
  name: "Mundo Aventura",
  // PENDIENTE: dominio final (se usa para las vistas previas en redes).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  category: "Salón de fiestas infantiles",
  tagline: "Celebra su cumpleaños en un mundo de aventura",
  description:
    "Salón de fiestas infantiles temático en Cochabamba: templo maya, trono del cumpleañero, parque de obstáculos, resbalines, piscina de pelotas y trampolines. 5 horas de fiesta con todo incluido desde Bs 1.500.",
  // PENDIENTE: número real de WhatsApp (formato internacional sin "+").
  whatsappNumber: "59170000000",
  whatsappDisplay: "+591 7000 0000",
  // PENDIENTE: ciudad y dirección exactas.
  city: "Cochabamba",
  country: "Bolivia",
  address: "Dirección por confirmar, Cochabamba",
  mapQuery: "Cochabamba, Bolivia",
  mapsUrl: undefined as string | undefined,
  lat: undefined as number | undefined,
  lng: undefined as number | undefined,
  // PENDIENTE: redes sociales reales (dejar en null para ocultar).
  social: {
    instagram: "https://instagram.com/" as string | null,
    facebook: "https://facebook.com/" as string | null,
    tiktok: "https://tiktok.com/" as string | null,
  },
};

/** Aforo según el mobiliario del catálogo. */
export const capacity = {
  kidsSeated: 36, // 36 sillas temáticas para niños
  adultsSeated: 45, // 45 sillas + 5 mesas de tronco para adultos
  /** Aforo cómodo recomendado (niños + adultos). PENDIENTE: confirmar. */
  totalGuests: 80,
};

/** Duración incluida en todos los paquetes. */
export const EVENT_HOURS = 5;

/**
 * Turnos de 5 horas. Hay 1 h entre turnos para limpieza y montaje.
 * PENDIENTE: confirmar horarios reales.
 */
export const shifts = [
  { id: "manana", label: "Turno mañana", time: "10:00 – 15:00", icon: "Sun" },
  { id: "tarde", label: "Turno tarde", time: "16:00 – 21:00", icon: "Sunset" },
] as const;

export type ShiftId = (typeof shifts)[number]["id"];

/** Promoción de inauguración: Bs 500 menos en cada paquete (del catálogo). */
export const promo = {
  active: true,
  label: "Promo inauguración",
  amount: 500,
  // PENDIENTE: fecha de fin (ISO, ej. "2026-12-31") o null si no tiene.
  until: null as string | null,
};

/**
 * Condiciones de reserva.
 * PENDIENTE: confirmar porcentajes, plazos y monto de garantía.
 */
export const policies = {
  depositPercent: 50, // anticipo para asegurar la fecha
  balanceDue: "el día del evento, antes de iniciar",
  rescheduleNoticeDays: 7,
  recommendedBookingWeeks: 3, // fines de semana se llenan antes
};

export const attentionHours = [
  // PENDIENTE: horario real de atención por WhatsApp / visitas.
  { days: "Lunes a viernes", hours: "09:00 – 19:00" },
  { days: "Sábados y domingos", hours: "09:00 – 21:00" },
];

export const nav = [
  { label: "Servicios", href: "#servicios" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Galería", href: "#galeria" },
  { label: "Preguntas", href: "#preguntas" },
  { label: "Ubicación", href: "#contacto" },
];

/** Formatea montos en bolivianos: 1500 → "1.500". */
export function formatBs(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
