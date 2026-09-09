"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { aparecer, sinMovimiento, viewportUnaVez } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Etiqueta HTML resultante. */
  as?: "div" | "li" | "section" | "article" | "header";
};

export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const reducido = useReducedMotion();
  const Componente = motion[as];

  return (
    <Componente
      className={className}
      variants={reducido ? sinMovimiento : aparecer}
      initial="oculto"
      whileInView="visible"
      viewport={viewportUnaVez}
      transition={{ delay }}
    >
      {children}
    </Componente>
  );
}
