// Imágenes importadas estáticamente: next/image obtiene ancho/alto y
// genera el placeholder "blur" automáticamente (sin saltos de layout).
// Las fuentes originales están en assets-raw/ → `npm run images`.

import temploPanoramica from "@/assets/images/venue/templo-panoramica.jpg";
import temploLianas from "@/assets/images/venue/templo-lianas.jpg";
import temploVertical from "@/assets/images/venue/templo-vertical.jpg";
import arbolesMesas from "@/assets/images/venue/arboles-mesas.jpg";
import estanteTiki from "@/assets/images/venue/estante-tiki.jpg";
import patioJeep from "@/assets/images/venue/patio-jeep.jpg";
import fachadaLetrero from "@/assets/images/venue/fachada-letrero.jpg";
import lucesCuerda from "@/assets/images/venue/luces-cuerda.jpg";
import patioTipi from "@/assets/images/venue/patio-tipi.jpg";

import temploPayaso from "@/assets/images/events/templo-payaso.jpg";
import tronoCumpleanero from "@/assets/images/events/trono-cumpleanero.jpg";
import jeepFotos from "@/assets/images/events/jeep-fotos.jpg";
import fiestaRonda from "@/assets/images/events/fiesta-ronda.jpg";
import trampolinesEvento from "@/assets/images/events/trampolines.jpg";
import payasoMicrofono from "@/assets/images/events/payaso-microfono.jpg";
import ninosJuego from "@/assets/images/events/ninos-juego.jpg";
import juegoAnimadora from "@/assets/images/events/juego-animadora.jpg";
import burbujas from "@/assets/images/events/burbujas.jpg";

import trono from "@/assets/images/services/trono.jpg";
import mesasNinos from "@/assets/images/services/mesas-ninos.jpg";
import mesasAdultos from "@/assets/images/services/mesas-adultos.jpg";
import cilindros from "@/assets/images/services/cilindros.jpg";
import estantes from "@/assets/images/services/estantes.jpg";
import baul from "@/assets/images/services/baul.jpg";
import parqueObstaculos from "@/assets/images/services/parque-obstaculos.jpg";
import resbalines from "@/assets/images/services/resbalines.jpg";
import trampolines from "@/assets/images/services/trampolines.jpg";
import meson from "@/assets/images/services/meson.jpg";
import parrillero from "@/assets/images/services/parrillero.jpg";
import cocina from "@/assets/images/services/cocina.jpg";
import zonaFotos from "@/assets/images/services/zona-fotos.jpg";
import banos from "@/assets/images/services/banos.jpg";
import salaExterior from "@/assets/images/services/sala-exterior.jpg";

import portadaVideo from "@/assets/images/video/portada.jpg";

import logo from "@/assets/brand/logo.png";
import logoLight from "@/assets/brand/logo-light.png";
import tiki from "@/assets/brand/tiki.png";
import tikiLight from "@/assets/brand/tiki-light.png";
import wordmark from "@/assets/brand/wordmark.png";
import wordmarkLight from "@/assets/brand/wordmark-light.png";

export const brand = { logo, logoLight, tiki, tikiLight, wordmark, wordmarkLight };

/** Portada del video de la fiesta (generada por `npm run video`). */
export const media = { portadaVideo };

export const venue = {
  temploPanoramica,
  temploLianas,
  temploVertical,
  arbolesMesas,
  estanteTiki,
  patioJeep,
  fachadaLetrero,
  lucesCuerda,
  patioTipi,
};

export const events = {
  temploPayaso,
  tronoCumpleanero,
  jeepFotos,
  fiestaRonda,
  trampolinesEvento,
  payasoMicrofono,
  ninosJuego,
  juegoAnimadora,
  burbujas,
};

export const services = {
  trono,
  mesasNinos,
  mesasAdultos,
  cilindros,
  estantes,
  baul,
  parqueObstaculos,
  resbalines,
  trampolines,
  meson,
  parrillero,
  cocina,
  zonaFotos,
  banos,
  salaExterior,
};
