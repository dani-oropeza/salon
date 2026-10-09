# Mundo Aventura · Web

Sitio de una sola página para **Mundo Aventura**, salón de fiestas infantiles temático
(selva y templo maya). Muestra servicios, paquetes y precios; las reservas se hacen
por WhatsApp con mensajes prellenados.

Stack (el mismo de EcoValle): Next.js 16 (App Router) · React 19 · TypeScript ·
Tailwind CSS v4 · framer-motion · lucide-react.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run images   # regenera fotos y logos desde assets-raw/ (usa sharp)
npm run video    # genera avance + video 720p/1080p desde assets-raw/video/ (usa ffmpeg-static)
```

## Estructura

| Ruta | Contenido |
|---|---|
| `lib/site.ts` | Datos del negocio: contacto, turnos, aforo, promo, políticas de reserva |
| `lib/packages.ts` | Paquetes, adicionales y la lógica de precios (promo, ahorro, precio por niño) |
| `lib/services.ts` | Los 15 servicios del catálogo, en 5 categorías |
| `lib/content.ts` | Textos: beneficios, cronograma, pasos de reserva, FAQ, galería |
| `lib/whatsapp.ts` | Links y mensajes prellenados de WhatsApp (general y por paquete) |
| `components/` | Una sección por archivo; `components/ui/` tiene las piezas base |
| `assets/` | Fotos optimizadas y logos (se importan de forma estática y generan blur) |
| `assets-raw/` | Originales (fotos de 60 MP, logo, PDF, video 4K de ~1 GB). No se versionan |
| `public/videos/` | Video de una fiesta real: avance mudo (~2 MB), 720p (~21 MB) y 1080p (~48 MB) |
| `design-system/` | Decisiones de diseño (paleta, tipografía, patrones) |

Los datos que hay que confirmar con el negocio están en **[PENDIENTES.md](PENDIENTES.md)**.
