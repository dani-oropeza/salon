import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 exige declarar las calidades permitidas. 75 = general,
    // 85 = foto principal del hero (se ve a pantalla completa en móvil).
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
