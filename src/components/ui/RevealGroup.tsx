"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  aparecer,
  contenedorStagger,
  sinMovimiento,
  viewportUnaVez,
} from "@/lib/motion";

type GroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
};

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: GroupProps) {
  const Componente = motion[as];
  return (
    <Componente
      className={className}
      variants={contenedorStagger(stagger)}
      initial="oculto"
      whileInView="visible"
      viewport={viewportUnaVez}
    >
      {children}
    </Componente>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
};

export function RevealItem({ children, className, as = "div" }: ItemProps) {
  const reducido = useReducedMotion();
  const Componente = motion[as];
  return (
    <Componente className={className} variants={reducido ? sinMovimiento : aparecer}>
      {children}
    </Componente>
  );
}
