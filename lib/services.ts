// Los 15 servicios del salón (catálogo PDF), agrupados en 5 categorías.
// Todos están incluidos en cualquier paquete.
import type { StaticImageData } from "next/image";
import { services as img } from "./images";

export type ServiceGroupId = "salon" | "decoracion" | "juegos" | "cocina" | "comodidades";

export type Service = {
  name: string;
  description: string;
  /** Cantidad destacada (ej. "36 sillas"). */
  badge?: string;
  image: StaticImageData;
};

export type ServiceGroup = {
  id: ServiceGroupId;
  label: string;
  /** Nombre de ícono lucide-react. */
  icon: string;
  summary: string;
  items: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "salon",
    label: "Salón",
    icon: "Crown",
    summary: "Ambientes temáticos para el cumpleañero, los niños y los adultos.",
    items: [
      {
        name: "Trono del cumpleañero",
        description:
          "Un espectacular trono de templo maya para que el protagonista viva un momento único y tenga las mejores fotos de su celebración.",
        badge: "Único",
        image: img.trono,
      },
      {
        name: "Árboles, mesas y sillas para niños",
        description:
          "Mesas y sillas inspiradas en la naturaleza, bajo árboles con lianas: un ambiente mágico, cómodo y divertido para los invitados.",
        badge: "36 sillas",
        image: img.mesasNinos,
      },
      {
        name: "Troncos, mesas y sillas para adultos",
        description:
          "Área rústica y elegante con mesas de tronco y madera, para que papás y familiares disfruten cómodamente.",
        badge: "45 sillas · 5 mesas",
        image: img.mesasAdultos,
      },
    ],
  },
  {
    id: "decoracion",
    label: "Decoración",
    icon: "Sparkles",
    summary: "Piezas temáticas listas para lucir la torta, los dulces y los regalos.",
    items: [
      {
        name: "Complemento temático",
        description:
          "Cilindros decorativos de aventura, ideales para exhibir dulces, masitas y la torta.",
        badge: "3 cilindros",
        image: img.cilindros,
      },
      {
        name: "Estantes para canastas",
        description:
          "Estantes iluminados para exhibir canastas, regalos y recuerdos de forma ordenada y vistosa.",
        badge: "2 estantes",
        image: img.estantes,
      },
      {
        name: "Baúl para regalos",
        description:
          "Un baúl del tesoro donde los invitados dejan regalos y sobres. ¡También es parte de la decoración!",
        badge: "1 baúl",
        image: img.baul,
      },
    ],
  },
  {
    id: "juegos",
    label: "Juegos",
    icon: "Footprints",
    summary: "Tres zonas de juego protegidas con malla para gastar energía.",
    items: [
      {
        name: "Parque con obstáculos",
        description:
          "Un circuito de aventura para explorar, trepar y desarrollar coordinación en un espacio seguro y lleno de emoción.",
        image: img.parqueObstaculos,
      },
      {
        name: "Resbalines y piscina de pelotas",
        description:
          "La atracción favorita: resbalines que terminan en una gran piscina de pelotas para horas de diversión.",
        image: img.resbalines,
      },
      {
        name: "Trampolines",
        description:
          "Zona de saltos para moverse, reír y llenarse de adrenalina, con bordes acolchados y malla de protección.",
        image: img.trampolines,
      },
    ],
  },
  {
    id: "cocina",
    label: "Cocina y parrilla",
    icon: "CookingPot",
    summary: "Trae tu comida: tienes cocina equipada, freezer, mesón y parrilla.",
    items: [
      {
        name: "Mesón",
        description:
          "Amplio mesón para servir comida y bebidas y organizar todos los detalles de la fiesta con comodidad.",
        image: img.meson,
      },
      {
        name: "Parrillero",
        description:
          "Zona de parrilla para preparar un buen asado y compartir con la familia durante la celebración.",
        image: img.parrillero,
      },
      {
        name: "Freezer, cocina y cajonería",
        description:
          "Área equipada con freezer, cocina y espacio de almacenamiento para preparar y conservar los alimentos.",
        image: img.cocina,
      },
    ],
  },
  {
    id: "comodidades",
    label: "Comodidades",
    icon: "Sofa",
    summary: "Detalles pensados para que los adultos también la pasen bien.",
    items: [
      {
        name: "Zona de fotos",
        description:
          "Patio temático con jeep de safari, tipi y escenarios únicos para fotos inolvidables.",
        image: img.zonaFotos,
      },
      {
        name: "Baños hombres / mujeres",
        description:
          "Baños independientes y completamente equipados, con cambiador de pañales y la temática del salón.",
        badge: "Con cambiador",
        image: img.banos,
      },
      {
        name: "Sala exterior",
        description:
          "Área de descanso acogedora para papás y acompañantes, con juegos de mesa disponibles.",
        badge: "11 asientos",
        image: img.salaExterior,
      },
    ],
  },
];

export const totalServices = serviceGroups.reduce((n, g) => n + g.items.length, 0);
