/**
 * El Tiki del logo, redibujado en SVG por piezas para poder animarlo
 * (parpadeo, boca que "habla"). Se muestra como sticker troquelado: las
 * piezas originales (madera oscura + madera clara) sobre una silueta crema,
 * igual que el logo impreso sobre blanco. Así se lee sobre fotos, fondos
 * oscuros y claros.
 */
type Part = { d: string; kind: "dark" | "wood"; stroke?: number; cap?: "round" };

const DARK = "#4a2a16";
const WOOD = "#9c6532";
const PAPER = "#fbf3e4";

const crown: Part[] = [
  { d: "M6 104 A 37 26 -22 0 1 76 75 Z", kind: "dark" },
  { d: "M96 62 A 38 24 -8 0 1 170 52 Z", kind: "dark" },
  { d: "M190 45 A 38 22 -3 0 1 266 41 Z", kind: "dark" },
  { d: "M286 46 A 38 22 4 0 1 362 48 Z", kind: "dark" },
];
const face: Part[] = [
  // Banda de la frente
  { d: "M22 116 C 120 90, 250 68, 352 68 C 366 68, 366 92, 352 93 C 250 96, 130 116, 32 142 C 14 146, 8 120, 22 116 Z", kind: "wood" },
  // "T" de cejas y nariz
  { d: "M14 172 C 120 148, 280 134, 386 138 C 400 139, 402 174, 388 177 C 334 180, 292 183, 250 187 L 247 360 C 247 381, 238 392, 225 392 L 206 392 C 194 392, 188 381, 188 366 L 186 197 C 130 203, 70 212, 22 222 C 4 226, -2 177, 14 172 Z", kind: "dark" },
  // Cejas claras
  { d: "M58 212 L 176 199 L 178 238 C 140 241, 92 249, 62 254 C 50 255, 48 214, 58 212 Z", kind: "wood" },
  { d: "M258 189 L 380 180 C 393 180, 395 208, 384 212 C 340 222, 292 228, 260 234 Z", kind: "wood" },
  // Mejillas
  { d: "M92 386 L 180 378 L 184 456 L 140 428 C 120 423, 98 422, 92 412 Z", kind: "wood" },
  { d: "M298 358 L 382 350 C 388 382, 386 420, 378 442 L 345 402 C 330 397, 305 397, 300 394 Z", kind: "wood" },
  { d: "M132 442 C 150 432, 172 434, 178 444 L 178 468 L 134 468 Z", kind: "wood" },
  { d: "M318 406 C 336 402, 356 406, 362 414 L 360 446 L 316 446 Z", kind: "wood" },
  // Nariz
  { d: "M190 472 A 58 40 -6 0 1 306 458 Z", kind: "dark" },
];
const eyeL: Part[] = [
  { d: "M36 302 A 74 62 -4 0 1 184 292 Z", kind: "dark" },
  { d: "M52 342 C 80 314, 150 306, 182 320 C 185 332, 185 354, 181 369 C 140 381, 80 373, 52 342 Z", kind: "dark" },
];
const eyeR: Part[] = [
  { d: "M270 272 A 70.5 58 -8 0 1 410 250 Z", kind: "dark" },
  { d: "M278 302 C 310 284, 380 278, 410 288 C 400 322, 360 346, 300 342 C 286 336, 278 320, 278 302 Z", kind: "dark" },
];
const mouth: Part[] = [
  {
    d: "M60 494 C 200 472, 380 454, 470 450 C 490 449, 498 462, 498 480 L 496 600 C 496 616, 486 626, 470 626 C 380 628, 230 634, 120 650 C 90 655, 70 668, 50 680 C 38 687, 34 660, 38 640 L 42 514 C 42 502, 50 496, 60 494 Z",
    kind: "dark",
    stroke: 24,
  },
  { d: "M88 550 L 160 545 L 160 564 L 86 568 Z", kind: "wood" },
  { d: "M178 543 L 262 537 L 262 556 L 178 561 Z", kind: "wood" },
  { d: "M278 523 L 356 515 L 356 534 L 279 541 Z", kind: "wood" },
  { d: "M304 590 C 286 574, 252 582, 258 600 C 264 616, 240 628, 214 616", kind: "wood", stroke: 18, cap: "round" },
];

function Piece({ p }: { p: Part }) {
  const color = p.kind === "dark" ? DARK : WOOD;
  return p.stroke ? (
    <path d={p.d} fill="none" stroke={color} strokeWidth={p.stroke} strokeLinejoin="round" strokeLinecap={p.cap} />
  ) : (
    <path d={p.d} fill={color} />
  );
}

const all = [...crown, ...face, ...eyeL, ...eyeR, ...mouth];

export function TikiFace({ className = "", talking = false }: { className?: string; talking?: boolean }) {
  return (
    <svg viewBox="-34 -34 580 768" aria-hidden focusable="false" className={className}>
      {/* Silueta troquelada: las mismas piezas con un trazo grueso crema */}
      <g fill={PAPER} stroke={PAPER} strokeWidth="58" strokeLinejoin="round" strokeLinecap="round">
        {all.map((p) => (
          <path key={p.d} d={p.d} strokeWidth={58 + (p.stroke ?? 0)} fill={p.stroke ? "none" : PAPER} />
        ))}
        {/* Relleno del interior (para que no queden huecos en el sticker) */}
        <path d="M30 120 L 380 80 L 410 280 L 380 450 L 490 470 L 490 620 L 60 660 L 40 480 L 30 300 Z" />
      </g>

      <g>
        {crown.map((p) => (
          <Piece key={p.d} p={p} />
        ))}
        {face.map((p) => (
          <Piece key={p.d} p={p} />
        ))}
      </g>
      <g className="tiki-eye">
        {eyeL.map((p) => (
          <Piece key={p.d} p={p} />
        ))}
      </g>
      <g className="tiki-eye">
        {eyeR.map((p) => (
          <Piece key={p.d} p={p} />
        ))}
      </g>
      <g className={`tiki-mouth ${talking ? "is-talking" : ""}`}>
        {mouth.map((p) => (
          <Piece key={p.d} p={p} />
        ))}
      </g>
    </svg>
  );
}
