"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_BRAND } from "@/lib/motion";

/**
 * Transición entre páginas.
 *
 * `initial={false}` en AnimatePresence evita animar el primer render: la
 * carga inicial no se retrasa ni un milisegundo, así que no penaliza el LCP.
 * Solo se anima al cambiar de ruta, y con `prefers-reduced-motion` queda en
 * un fundido de 150 ms.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducido = useReducedMotion();

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={pathname}
        initial={reducido ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducido ? 0.15 : 0.32, ease: EASE_BRAND }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
