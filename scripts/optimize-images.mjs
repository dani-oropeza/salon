// Optimiza las fotos originales (assets-raw/) para la web y genera las
// variantes del logo con fondo transparente.
// Ejecutar: npm run images
//
// - Las fotos de evento vienen en 60 MP (~60 MB c/u): se reducen a 2000px
//   de lado largo (next/image luego sirve AVIF/WebP del tamaño justo).
// - Las fotos de servicios se extrajeron del PDF del catálogo.
// - El logo original tiene fondo blanco: se convierte "blanco → alfa"
//   (como Color-to-Alpha de GIMP) para conservar los bordes suaves.
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const raw = (p) => join(root, "assets-raw", p);
// Se importan estáticamente desde /assets (next/image genera blur + tamaños).
const out = (p) => join(root, "assets", p);

// [origen, destino, lado largo máx.]
const photos = [
  // Ambientes
  ["IMG_5292.JPG.jpeg", "images/venue/templo-panoramica.jpg", 1600],
  ["IMG_5286.JPG.jpeg", "images/venue/templo-lianas.jpg", 1600],
  ["IMG_5285.JPG.jpeg", "images/venue/templo-vertical.jpg", 1600],
  ["IMG_5290.JPG.jpeg", "images/venue/arboles-mesas.jpg", 1600],
  ["IMG_5291.JPG.jpeg", "images/venue/estante-tiki.jpg", 1600],
  ["IMG_5293.JPG.jpeg", "images/venue/patio-jeep.jpg", 1600],
  ["IMG_5289.JPG.jpeg", "images/venue/fachada-letrero.jpg", 1600],
  ["IMG_5287.JPG.jpeg", "images/venue/luces-cuerda.jpg", 1600],
  ["IMG_5288.JPG.jpeg", "images/venue/patio-tipi.jpg", 1600],
  // Eventos reales
  ["IMG_5016.JPEG", "images/events/templo-payaso.jpg", 2400],
  ["IMG_5001.JPEG", "images/events/trono-cumpleanero.jpg", 2000],
  ["IMG_5019.JPEG", "images/events/jeep-fotos.jpg", 2000],
  ["IMG_5032.JPEG", "images/events/fiesta-ronda.jpg", 2000],
  ["IMG_5041.JPEG", "images/events/trampolines.jpg", 2000],
  ["IMG_5015.JPEG", "images/events/payaso-microfono.jpg", 2000],
  ["IMG_5002.JPEG", "images/events/ninos-juego.jpg", 2000],
  ["IMG_5020.JPEG", "images/events/juego-animadora.jpg", 2000],
  ["IMG_5021.JPEG", "images/events/burbujas.jpg", 2000],
  // Servicios (extraídas del catálogo PDF)
  ["pdf/p3_1_369.jpeg", "images/services/trono.jpg", 1400],
  ["pdf/p3_3_375.jpeg", "images/services/mesas-ninos.jpg", 1400],
  ["pdf/p3_2_372.jpeg", "images/services/mesas-adultos.jpg", 1400],
  ["pdf/p4_1_387.jpeg", "images/services/cilindros.jpg", 1400],
  ["pdf/p4_4_399.jpeg", "images/services/estantes.jpg", 1400],
  ["pdf/p4_3_396.jpeg", "images/services/baul.jpg", 1400],
  ["pdf/p5_3_414.jpeg", "images/services/parque-obstaculos.jpg", 1400],
  ["pdf/p5_4_417.jpeg", "images/services/resbalines.jpg", 1400],
  ["pdf/p5_2_411.jpeg", "images/services/trampolines.jpg", 1400],
  ["pdf/p6_1_426.jpeg", "images/services/meson.jpg", 1400],
  ["pdf/p6_3_432.jpeg", "images/services/parrillero.jpg", 1400],
  ["pdf/p6_4_435.jpeg", "images/services/cocina.jpg", 1400],
  ["pdf/p7_3_450.jpeg", "images/services/zona-fotos.jpg", 1400],
  ["pdf/p7_4_453.jpeg", "images/services/banos.jpg", 1400],
  ["pdf/p7_2_447.jpeg", "images/services/sala-exterior.jpg", 1400],
];

async function optimizePhotos() {
  for (const [src, dest, max] of photos) {
    if (!existsSync(raw(src))) {
      console.warn("  ✗ falta", src);
      continue;
    }
    mkdirSync(dirname(out(dest)), { recursive: true });
    const info = await sharp(raw(src), { limitInputPixels: false })
      .rotate()
      .resize(max, max, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(out(dest));
    console.log(`  ✓ ${dest} ${info.width}×${info.height} ${(info.size / 1024).toFixed(0)} KB`);
  }
}

// El PNG original ya trae transparencia: solo se reduce y se lee en RGBA.
async function loadRgba(input, width) {
  const { data, info } = await sharp(input, { limitInputPixels: false })
    .resize({ width })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { rgba: data, width: info.width, height: info.height };
}

// Versión para fondos oscuros: los tonos casi negros pasan a crema.
function toLight({ rgba, width, height }) {
  const copy = Buffer.from(rgba);
  for (let j = 0; j < copy.length; j += 4) {
    if (copy[j + 3] === 0) continue;
    const r = copy[j], g = copy[j + 1], b = copy[j + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (lum < 70) {
      // Mezcla hacia crema según qué tan oscuro sea.
      const t = Math.min(1, (70 - lum) / 45);
      copy[j] = Math.round(r + (0xf6 - r) * t);
      copy[j + 1] = Math.round(g + (0xec - g) * t);
      copy[j + 2] = Math.round(b + (0xd9 - b) * t);
    }
  }
  return { rgba: copy, width, height };
}

const toPng = ({ rgba, width, height }) =>
  sharp(rgba, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 });

// Etiqueta las piezas conectadas (alfa > 40) del logo. Sirve para descartar
// motas sueltas y para separar la máscara tiki de las letras.
function components({ rgba, width, height }) {
  const label = new Int32Array(width * height).fill(-1);
  const comps = [];
  const stack = [];
  for (let start = 0; start < width * height; start++) {
    if (label[start] !== -1 || rgba[start * 4 + 3] <= 40) continue;
    const c = { id: comps.length, n: 0, sx: 0, x0: width, y0: height, x1: 0, y1: 0 };
    label[start] = c.id;
    stack.push(start);
    while (stack.length) {
      const p = stack.pop();
      const x = p % width, y = (p / width) | 0;
      c.n++; c.sx += x;
      if (x < c.x0) c.x0 = x; if (x > c.x1) c.x1 = x;
      if (y < c.y0) c.y0 = y; if (y > c.y1) c.y1 = y;
      for (const q of [p - 1, p + 1, p - width, p + width]) {
        if (q < 0 || q >= width * height) continue;
        if (Math.abs((q % width) - x) > 1) continue;
        if (label[q] === -1 && rgba[q * 4 + 3] > 40) { label[q] = c.id; stack.push(q); }
      }
    }
    comps.push(c);
  }
  return { label, comps };
}

// Conserva solo las piezas que cumplan `keep` y recorta al contenido.
async function isolate(img, keep, pad = 0) {
  const { label, comps } = components(img);
  const kept = new Set(comps.filter(keep).map((c) => c.id));
  const rgba = Buffer.from(img.rgba);
  let x0 = img.width, y0 = img.height, x1 = 0, y1 = 0;
  for (let p = 0; p < img.width * img.height; p++) {
    const a = rgba[p * 4 + 3];
    if (a === 0) continue;
    // Los bordes semitransparentes (alfa ≤ 40) siguen a su vecino etiquetado.
    let id = label[p];
    if (id === -1) id = label[p - 1] ?? label[p + 1] ?? -1;
    if (id === -1 || !kept.has(id)) { rgba[p * 4 + 3] = 0; continue; }
    const x = p % img.width, y = (p / img.width) | 0;
    if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  const left = Math.max(0, x0 - pad), top = Math.max(0, y0 - pad);
  return toPng({ rgba, width: img.width, height: img.height }).extract({
    left, top,
    width: Math.min(img.width - left, x1 - x0 + 1 + pad * 2),
    height: Math.min(img.height - top, y1 - y0 + 1 + pad * 2),
  });
}

async function logos() {
  const src = raw("LOGO MUNDO AVENTURA mejorado.png");
  mkdirSync(out("brand"), { recursive: true });

  const base = await loadRgba(src, 1800);
  const light = toLight(base);
  const notSpeck = (c) => c.n > 60;
  // La máscara tiki ocupa el tercio izquierdo; las letras empiezan después.
  const isTiki = (c) => c.n > 60 && c.sx / c.n < base.width * 0.36;

  await (await isolate(base, notSpeck, 4)).toFile(out("brand/logo.png"));
  await (await isolate(light, notSpeck, 4)).toFile(out("brand/logo-light.png"));
  const tiki = await (await isolate(base, isTiki, 4)).toBuffer();
  await sharp(tiki).toFile(out("brand/tiki.png"));
  await (await isolate(light, isTiki, 4)).toFile(out("brand/tiki-light.png"));
  // Solo las letras "MUNDO AVENTURA" (para la barra de navegación compacta).
  const isWord = (c) => c.n > 60 && !isTiki(c);
  await (await isolate(base, isWord, 2)).toFile(out("brand/wordmark.png"));
  await (await isolate(light, isWord, 2)).toFile(out("brand/wordmark-light.png"));

  // Íconos de la app: tiki centrado sobre arena.
  const icon = async (size, file, pad) => {
    const inner = Math.round(size * (1 - pad * 2));
    const mark = await sharp(tiki).resize(inner, inner, { fit: "contain", background: "#0000" }).toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: "#f6ecd9" } })
      .composite([{ input: mark, gravity: "center" }])
      .png()
      .toFile(join(root, file));
  };
  await icon(512, "app/icon.png", 0.1);
  await icon(180, "app/apple-icon.png", 0.12);

  // Imagen para compartir en redes (WhatsApp, Facebook): 1200×630.
  await sharp(raw("IMG_5016.JPEG"), { limitInputPixels: false })
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(root, "app/opengraph-image.jpg"));
  console.log("  ✓ logos e íconos");
}

// `npm run images -- --logos` regenera solo los logos.
if (!process.argv.includes("--logos")) {
  console.log("Optimizando fotos…");
  await optimizePhotos();
}
console.log("Generando logos…");
await logos();
