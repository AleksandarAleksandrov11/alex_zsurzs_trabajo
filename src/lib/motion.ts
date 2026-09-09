import type { Transition, Variants } from "motion/react";

/**
 * Sistema de animación de ZSolutions.
 *
 * Reglas:
 * · Solo `transform` y `opacity`. Nunca width/height/top/left.
 * · Un único efecto protagonista por sección.
 * · Nada que retrase la lectura de un teléfono, un WhatsApp o un precio.
 * · `prefers-reduced-motion` se respeta en cada componente que anima.
 */

export const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

export const transicion: Transition = {
  duration: 0.7,
  ease: EASE_BRAND,
};

export const transicionCorta: Transition = {
  duration: 0.35,
  ease: EASE_BRAND,
};

/** Configuración común de `whileInView`. */
export const viewportUnaVez = { once: true, amount: 0.2 } as const;

export const aparecer: Variants = {
  oculto: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transicion },
};

export const aparecerLateral: Variants = {
  oculto: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: transicion },
};

export const escalaSuave: Variants = {
  oculto: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: transicion },
};

/** Contenedor con entrada escalonada (0.06–0.1 s). */
export function contenedorStagger(stagger = 0.08, delay = 0): Variants {
  return {
    oculto: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** Revelado de titular por líneas, con máscara. */
export const lineaTitular: Variants = {
  oculto: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE_BRAND } },
};

/** Variantes sin movimiento, para `prefers-reduced-motion`. */
export const sinMovimiento: Variants = {
  oculto: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};
