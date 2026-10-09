// Genera las versiones web del video de una fiesta real a partir del
// original en 4K (assets-raw/video/, ~1 GB, no se versiona).
// Ejecutar: npm run video
//
// Salidas:
//   public/videos/fiesta-avance.mp4   loop mudo de ~9 s (se reproduce solo)
//   public/videos/fiesta-720.mp4      video completo para celulares
//   public/videos/fiesta-1080.mp4     video completo para pantallas grandes
//   assets/images/video/portada.jpg   imagen de portada (next/image)
//
// Todo en H.264 + AAC con "faststart" (los metadatos van al inicio, así el
// navegador empieza a reproducir antes de terminar de descargar).
import { spawn } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "assets-raw", "video", "RECORTADO.mp4");
const outDir = join(root, "public", "videos");
const posterDir = join(root, "assets", "images", "video");
mkdirSync(outDir, { recursive: true });
mkdirSync(posterDir, { recursive: true });

// Tomas del avance: [inicio en segundos, duración]. Se evita el cartel con el
// nombre de la cumpleañera (0:39–0:42) y el truco con fuego (1:26).
const clips = [
  [13.52, 0.95], // trampolines (la toma dura ~1 s: corte en 14.51)
  [18.1, 1.5], // show del payaso con los niños
  [63.0, 1.5], // juego de la soga frente al templo
  [91.2, 1.5], // lluvia de burbujas
  [97.8, 1.5], // soplando las velas en el trono
  [8.0, 1.5], // el salón completo (cierra el loop)
];
const POSTER_AT = 63.6;

function run(args, label) {
  return new Promise((resolve, reject) => {
    const t0 = Date.now();
    process.stdout.write(`… ${label}\n`);
    const p = spawn(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
    p.on("exit", (code) => {
      if (code !== 0) return reject(new Error(`${label}: ffmpeg salió con código ${code}`));
      resolve((Date.now() - t0) / 1000);
    });
  });
}

const size = (f) => `${(statSync(f).size / 1024 / 1024).toFixed(1)} MB`;

async function teaser() {
  const out = join(outDir, "fiesta-avance.mp4");
  const inputs = clips.flatMap(([ss, t]) => ["-ss", String(ss), "-t", String(t), "-i", src]);
  const scaled = clips.map((_, i) => `[${i}:v]scale=960:-2,fps=30,setsar=1[v${i}]`).join(";");
  const concat = clips.map((_, i) => `[v${i}]`).join("") + `concat=n=${clips.length}:v=1:a=0[out]`;
  const secs = await run(
    [
      ...inputs,
      "-filter_complex", `${scaled};${concat}`,
      "-map", "[out]",
      "-an",
      "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      out,
    ],
    "avance (loop mudo)",
  );
  console.log(`  ✓ ${out} ${size(out)} (${secs.toFixed(0)} s)`);
}

async function full(height, crf, maxrate, audio, name) {
  const out = join(outDir, name);
  const secs = await run(
    [
      "-i", src,
      "-vf", `scale=-2:${height}`,
      "-c:v", "libx264", "-preset", "slow", "-crf", String(crf),
      "-maxrate", maxrate, "-bufsize", `${parseInt(maxrate) * 2}k`,
      "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", audio, "-ac", "2",
      "-movflags", "+faststart",
      out,
    ],
    `video completo ${height}p`,
  );
  console.log(`  ✓ ${out} ${size(out)} (${secs.toFixed(0)} s)`);
}

async function poster() {
  const out = join(posterDir, "portada.jpg");
  await run(["-ss", String(POSTER_AT), "-i", src, "-frames:v", "1", "-vf", "scale=1600:-2", "-q:v", "3", out], "portada");
  console.log(`  ✓ ${out} ${size(out)}`);
}

// `npm run video -- --avance` regenera solo el avance (para ajustar tomas).
if (process.argv.includes("--avance")) {
  await teaser();
} else {
  await poster();
  await teaser();
  await full(720, 24, "1800k", "96k", "fiesta-720.mp4");
  await full(1080, 23, "4200k", "128k", "fiesta-1080.mp4");
}
console.log("Listo.");
