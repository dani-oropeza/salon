// Textos de secciones: beneficios, cronograma sugerido, pasos de reserva,
// preguntas frecuentes y galería.
import type { StaticImageData } from "next/image";
import { capacity, EVENT_HOURS, policies, promo, formatBs } from "./site";
import { events, venue } from "./images";

/** Por qué elegirnos: lo que más le importa a una mamá o papá al reservar. */
export const reasons = [
  {
    icon: "Sparkles",
    title: "Llegas y ya está todo decorado",
    text: "La temática de aventura es permanente: templo maya, lianas, tikis y luces. Te ahorras decoración y montaje.",
  },
  {
    icon: "ShieldCheck",
    title: "Juegos seguros",
    text: "Zonas de juego cerradas con malla de protección, bordes acolchados y espacios a la vista de los adultos.",
  },
  {
    icon: "CookingPot",
    title: "Trae tu propia comida",
    text: "Cocina equipada, freezer, mesón y parrilla: sirve el menú que tú elijas, sin cargos por catering.",
  },
  {
    icon: "Armchair",
    title: "Los adultos también disfrutan",
    text: "Mesas de tronco, sala exterior con juegos de mesa y parrilla para que la familia la pase igual de bien.",
  },
];

/** Cronograma sugerido de una fiesta de 5 horas. */
export const timeline = [
  {
    time: "0:00",
    title: "Bienvenida y juego libre",
    text: "Los invitados llegan y corren directo al parque, los resbalines y los trampolines.",
    icon: "Footprints",
  },
  {
    time: "1:00",
    title: "Show y animación",
    text: "Juegos, concursos y burbujas gigantes con el payaso (paquetes Aventura y Selva VIP).",
    icon: "PartyPopper",
  },
  {
    time: "2:30",
    title: "Hora de comer",
    text: "Se sirve la comida en las mesas bajo los árboles; los adultos encienden la parrilla.",
    icon: "Utensils",
  },
  {
    time: "3:30",
    title: "Torta en el trono",
    text: "El cumpleañero sube al trono del templo para cantar, soplar las velas y la sesión de fotos.",
    icon: "Cake",
  },
  {
    time: "4:30",
    title: "Regalos y despedida",
    text: "Se abren los regalos del baúl, últimos saltos y fotos en el jeep antes de despedirse.",
    icon: "Gift",
  },
];

export type Faq = { q: string; a: string };

// PENDIENTE: validar cada respuesta con el negocio.
export const faqs: Faq[] = [
  {
    q: "¿Cuántos niños y adultos entran?",
    a: `Contamos con ${capacity.kidsSeated} sillas temáticas para niños y ${capacity.adultsSeated} sillas con 5 mesas de tronco para adultos. El aforo cómodo recomendado es de hasta ${capacity.totalGuests} personas entre niños y adultos.`,
  },
  {
    q: "¿Puedo llevar mi propia comida, bebidas y torta?",
    a: "¡Sí! Tienes a disposición cocina, freezer, cajonería, mesón y parrillero para preparar y servir lo que quieras. No cobramos derecho de catering.",
  },
  {
    q: "¿El salón es exclusivo para mi fiesta?",
    a: `Sí. Durante tu turno de ${EVENT_HOURS} horas todo el salón, los juegos y los ambientes son solo para tus invitados.`,
  },
  {
    q: "¿Necesito decorar?",
    a: "No hace falta: la temática de aventura (templo maya, trono, lianas, tikis e iluminación) ya está incluida. Si quieres, puedes sumar globos o detalles con el nombre del cumpleañero.",
  },
  {
    q: "¿Cómo reservo mi fecha?",
    a: `Escríbenos por WhatsApp con la fecha, el turno y el paquete que te interesa. Confirmamos la disponibilidad y aseguras la fecha con un anticipo del ${policies.depositPercent}%. El saldo se paga ${policies.balanceDue}.`,
  },
  {
    q: "¿Con cuánta anticipación debo reservar?",
    a: `Los sábados y domingos se llenan primero: te recomendamos reservar con al menos ${policies.recommendedBookingWeeks} semanas de anticipación. Entre semana suele haber más disponibilidad.`,
  },
  {
    q: "¿Puedo extender la fiesta más de 5 horas?",
    a: "Sí, puedes sumar horas adicionales al reservar, sujeto a la disponibilidad del turno siguiente.",
  },
  {
    q: "¿Para qué edades es ideal?",
    a: "Los juegos están pensados para niños de 2 a 12 años. Los más pequeños pueden disfrutar la piscina de pelotas siempre acompañados de un adulto.",
  },
  {
    q: "¿Qué pasa si necesito cambiar la fecha?",
    a: `Puedes reprogramar avisándonos con al menos ${policies.rescheduleNoticeDays} días de anticipación, sujeto a disponibilidad.`,
  },
  ...(promo.active
    ? [
        {
          q: `¿Cómo funciona la ${promo.label.toLowerCase()}?`,
          a: `Por la apertura del salón, todos los paquetes tienen Bs ${formatBs(promo.amount)} de descuento. El precio promocional se respeta al reservar con anticipo mientras la promo esté vigente.`,
        },
      ]
    : []),
];

export type GalleryItem = {
  src: StaticImageData;
  alt: string;
  kind: "fiestas" | "salon";
  /** Ocupa dos columnas/filas en el mosaico de escritorio. */
  span?: "wide" | "tall";
};

export const gallery: GalleryItem[] = [
  { src: events.temploPayaso, alt: "Cumpleañero con el payaso frente al templo maya", kind: "fiestas", span: "wide" },
  { src: venue.temploVertical, alt: "Templo maya iluminado con luces cálidas", kind: "salon", span: "tall" },
  { src: events.jeepFotos, alt: "Niñas y cumpleañero saludando desde el jeep de safari", kind: "fiestas" },
  { src: venue.arbolesMesas, alt: "Mesas para niños bajo árboles con lianas", kind: "salon" },
  { src: events.trampolinesEvento, alt: "Niñas saltando en los trampolines", kind: "fiestas" },
  { src: events.juegoAnimadora, alt: "Cumpleañero jugando con la animadora", kind: "fiestas", span: "tall" },
  { src: venue.temploLianas, alt: "Vista del templo, los tikis y las lianas", kind: "salon", span: "wide" },
  { src: events.fiestaRonda, alt: "Niños y familias disfrutando del show", kind: "fiestas" },
  { src: events.tronoCumpleanero, alt: "Cumpleañero sentado en el trono del templo", kind: "fiestas" },
  { src: venue.patioJeep, alt: "Patio temático con jeep, tipi y letrero Mundo Aventura", kind: "salon" },
  { src: events.burbujas, alt: "Payaso haciendo burbujas gigantes", kind: "fiestas", span: "tall" },
  { src: venue.estanteTiki, alt: "Estante iluminado y tiki frente al mural de selva", kind: "salon" },
  { src: events.payasoMicrofono, alt: "El cumpleañero habla al micrófono con el payaso", kind: "fiestas" },
  { src: venue.fachadaLetrero, alt: "Letrero de Mundo Aventura en el patio", kind: "salon" },
  { src: events.ninosJuego, alt: "Niños sonriendo durante los juegos", kind: "fiestas" },
  { src: venue.lucesCuerda, alt: "Focos vintage colgando de cuerdas", kind: "salon" },
];
