import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito_Sans } from "next/font/google";
import { site } from "@/lib/site";
import { Providers } from "@/components/Providers";
import "./globals.css";

// Display redondeada con eje de ancho: la usamos semicondensada para que
// los títulos dialoguen con las letras talladas del logo.
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  axes: ["wdth"],
});

// Sans humanista muy legible para textos largos, precios y formularios.
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.category} en ${site.city}`,
  description: site.description,
  keywords: [
    "salón de fiestas infantiles",
    "cumpleaños infantil",
    "fiestas infantiles Cochabamba",
    "salón temático",
    "Mundo Aventura",
    "trampolines",
    "piscina de pelotas",
  ],
  openGraph: {
    title: `${site.name} · ${site.category}`,
    description: "Celebra su cumpleaños en un mundo de aventura. 5 horas de fiesta, todo incluido.",
    type: "website",
    locale: "es_BO",
    siteName: site.name,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#10241a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fredoka.variable} ${nunitoSans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-sand-50 text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
