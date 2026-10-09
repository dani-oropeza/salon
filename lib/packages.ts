// Paquetes y adicionales.
//
// Precios de paquetes: catálogo PDF (precio regular y promo inauguración).
// Precios de adicionales: PENDIENTE. Se estimaron a partir de la diferencia
// entre paquetes, con un pequeño recargo al contratarlos por separado
// para que el paquete siempre convenga:
//   Aventura − Explorador  = Bs 800  → payaso + invitación   (suelto: 750 + 150 = 900)
//   Selva VIP − Aventura   = Bs 1.100 → foto y video          (suelto: 1.300)
import { capacity, promo } from "./site";

export type ExtraId = "payaso" | "invitacion" | "fotoVideo" | "horaExtra" | "pintacaritas";

export type Extra = {
  id: ExtraId;
  name: string;
  detail: string;
  price: number;
  icon: string;
  /** Se puede pedir más de una unidad (ej. horas extra). */
  stackable?: boolean;
};

export const extras: Extra[] = [
  {
    id: "payaso",
    name: "Show de payaso",
    detail: "Animación con juegos, concursos y burbujas",
    price: 750,
    icon: "PartyPopper",
  },
  {
    id: "invitacion",
    name: "Invitación virtual",
    detail: "Diseño temático personalizado para WhatsApp",
    price: 150,
    icon: "Mail",
  },
  {
    id: "fotoVideo",
    name: "Fotografía y video profesional",
    detail: "Cobertura del evento con fotos editadas y video",
    price: 1300,
    icon: "Camera",
  },
  {
    id: "pintacaritas",
    name: "Pintacaritas",
    detail: "Maquillaje artístico para los niños",
    price: 250,
    icon: "Palette",
  },
  {
    id: "horaExtra",
    name: "Hora adicional",
    detail: "Extiende la fiesta más allá de las 5 horas",
    price: 300,
    icon: "Hourglass",
    stackable: true,
  },
];

export const extraById = Object.fromEntries(extras.map((e) => [e.id, e])) as Record<ExtraId, Extra>;

export type PackageId = "explorador" | "aventura" | "selva-vip";

export type Package = {
  id: PackageId;
  name: string;
  tagline: string;
  idealFor: string;
  regularPrice: number;
  /** Adicionales que el paquete ya incluye. */
  includes: ExtraId[];
  featured?: boolean;
};

export const packages: Package[] = [
  {
    id: "explorador",
    name: "Explorador",
    tagline: "Todo el salón, a tu manera",
    idealFor: "Ideal si ya tienes animación o prefieres organizar la fiesta a tu estilo.",
    regularPrice: 2000,
    includes: [],
  },
  {
    id: "aventura",
    name: "Aventura",
    tagline: "El favorito de las familias",
    idealFor: "Ideal para que los niños no paren de reír: el payaso se encarga de la animación.",
    regularPrice: 2800,
    includes: ["payaso", "invitacion"],
    featured: true,
  },
  {
    id: "selva-vip",
    name: "Selva VIP",
    tagline: "La experiencia completa",
    idealFor: "Ideal para guardar cada momento: incluye fotógrafo y video profesional.",
    regularPrice: 3900,
    includes: ["payaso", "invitacion", "fotoVideo"],
  },
];

export const packageById = Object.fromEntries(packages.map((p) => [p.id, p])) as Record<
  PackageId,
  Package
>;

/** Lo que incluyen TODOS los paquetes (base del salón). */
export const baseInclusions = [
  "Salón exclusivo para tu evento",
  "5 horas de fiesta",
  "Los 15 servicios y ambientes",
  "Zona de juegos completa",
  "Cocina, freezer, mesón y parrilla",
];

/** Precio vigente (aplica la promo si está activa). */
export function currentPrice(p: Package): number {
  return promo.active ? p.regularPrice - promo.amount : p.regularPrice;
}

/** Cuánto costaría armar el paquete pidiendo los adicionales por separado. */
export function aLaCartePrice(p: Package): number {
  const base = packageById.explorador.regularPrice;
  return base + p.includes.reduce((sum, id) => sum + extraById[id].price, 0);
}

/** Ahorro total frente a contratar todo suelto a precio regular. */
export function totalSavings(p: Package): number {
  return aLaCartePrice(p) - currentPrice(p);
}

/** Costo aproximado por niño con el salón lleno (36 niños sentados). */
export function pricePerKid(p: Package): number {
  return Math.round(currentPrice(p) / capacity.kidsSeated);
}

export const startingPrice = Math.min(...packages.map(currentPrice));
