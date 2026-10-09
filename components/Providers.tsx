"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Respeta "reducir movimiento" del sistema en todas las animaciones.
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
