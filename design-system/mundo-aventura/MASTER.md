# Mundo Aventura: sistema de diseño (fuente de verdad)

Generado con la skill **ui-ux-pro-max** y ajustado a la marca real. La herramienta
sugirió "Memphis + azul + Baloo/Comic Neue" para fiestas infantiles; se descartó
porque no tiene nada que ver con el salón. Se usó **Nature Distilled / Organic
Biophilic** con paleta sacada de las fotos del lugar.

## Público y objetivo
- Quien decide y paga es mamá o papá (25–45 años) y casi siempre llega desde el
  celular (Instagram, Facebook o WhatsApp).
- Preguntas que la web responde en orden: ¿cómo es? → ¿cuánto cuesta? → ¿qué incluye?
  → ¿entran mis invitados? → ¿hay fecha? → ¿dónde queda?
- Conversión: botones "Reservar" → WhatsApp con mensaje prellenado (general o por
  paquete). No hay backend. El cotizador se quitó a pedido del cliente (2026-10-07).

## Paleta (tokens en `app/globals.css`)
| Token | Hex | Origen | Uso |
|---|---|---|---|
| sand-50 / 100 / 200 | #FBF6EE / #F4EADB / #E9DAC1 | Piedra del templo | Fondos claros, bordes |
| ink / ink-soft | #1E1A14 / #5E5446 | — | Texto (16:1 / 6.9:1) |
| jungle-950 / 900 / 700 | #0B1A11 / #10241A / #1F5133 | Selva, murales | Secciones inmersivas, botón secundario |
| leaf-500 / 600 | #8BC063 / #3F7A2A | Lianas | Checks, acentos |
| amber | #F2B04A | LEDs del templo | Acentos sobre fondo oscuro, insignias |
| sunset / 600 / 700 | #F08A2C / #B84E17 / #9A4013 | Letrero naranja | CTA principal (con texto ink, 6.9:1) |
| wood | #7A4A26 | Tiki del logo | Reservado |

## Tipografía
- **Fredoka** (display, eje `wdth` al 92 %, semicondensada para parecerse al logo), 600.
- **Nunito Sans** para el cuerpo: 16px base, interlineado 1.6.
- Escala: H1 2.6rem → 3.95rem · H2 2.15rem → 3rem · H3 1.2rem.

## Capa de identidad: "selva tallada" (v2)
Siguiendo la skill **frontend-design** ("concentra la audacia en un solo lugar"):
- **Estilo:** todo lo decorativo parece tallado en madera o piedra, como el Tiki y la
  greca. Siluetas planas con cortes (máscaras SVG), sin degradados ni contornos.
- **Piezas** (`components/jungle/`):
  - `TikiFace`: el logo redibujado por partes, como sticker troquelado.
  - `TikiGuide`: mascota que parpadea, habla con globos y salta al tocarla.
  - `Vine`: lianas que se mecen.
  - `Monstera`: hojas con cortes, como en el catálogo PDF.
  - `Fireflies`: luciérnagas ámbar, que hacen eco de los LED del templo.
  - `SwingingMonkey`: mono en una liana que saluda.
  - `LeafFringe`: hojas puntiagudas que unen secciones oscuras y claras.
  - `Trail`: sendero punteado que se recorre con el scroll.
- **Dónde está el movimiento:** solo en el hero, en el cronograma y en lo que
  responde al usuario. Se quitaron los fundidos en cada sección.
- **Rasgos genéricos eliminados:** etiquetas en MAYÚSCULAS sobre los títulos
  (reemplazadas por un brote de hojas), flechas → en los botones, palabras resaltadas
  con otro color en el titular (ahora una liana se dibuja debajo) y textos unidos con " · ".
- **Rendimiento:** solo se anima `transform` y `opacity`; las secciones fuera de
  pantalla pausan sus animaciones (`AnimationPauser` + `data-anim-zone`); y se
  respeta la opción de reducir movimiento del sistema.

## Motivos de marca
- **Greca maya** (`.greca`, mask SVG con currentColor): en las etiquetas de sección y
  en los separadores.
- Grano sutil en las secciones claras (`.grain`) y brillo ámbar en las oscuras (`.glow-amber`).
- Radios grandes (24–36px) y sombras cálidas suaves (`shadow-soft`, `shadow-lift`).

## Ritmo de secciones
Hero (oscuro) → Bienvenida (claro) → Servicios (arena) → Cronograma (oscuro) →
Paquetes (claro) → Galería (oscuro) → FAQ (claro) →
Contacto (arena) → CTA final (foto) → Footer (oscuro).

## Patrones móviles
- Hero: foto arriba con fundido y texto superpuesto abajo; CTA a todo el ancho.
- Servicios: pestañas deslizables + carrusel con la tarjeta siguiente asomando.
- Paquetes: carrusel que arranca centrado en el destacado, con selector arriba.
- Barra inferior global (precio "desde" + "Reservar" por WhatsApp) que se oculta
  sobre el contacto y el footer.

## Reglas
- Botones de al menos 44px de alto y foco visible (anillo naranja de 3px).
- `prefers-reduced-motion` respetado (MotionConfig + CSS).
- Íconos SVG de lucide; nada de emojis en la interfaz.
- Imágenes con importación estática, placeholder blur y `sizes` correctos; el hero con `fetchPriority="high"`.
