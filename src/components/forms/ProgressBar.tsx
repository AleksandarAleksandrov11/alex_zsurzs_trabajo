"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_BRAND } from "@/lib/motion";

type Props = {
  paso: number;
  total: number;
  titulos: string[];
};

export function ProgressBar({ paso, total, titulos }: Props) {
  const reducido = useReducedMotion();
  const progreso = (paso + 1) / total;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-eyebrow text-brand-orange">
          Paso {paso + 1} de {total}
        </p>
        <p className="text-eyebrow text-fg-muted/50">{titulos[paso]}</p>
      </div>

      {/* Solo se anima `transform`, nunca `width`. */}
      <div
        className="relative mt-3 h-1 w-full overflow-hidden bg-white/10"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={paso + 1}
        aria-label="Progreso del formulario"
      >
        <motion.span
          className="absolute inset-0 origin-left bg-brand-blue"
          initial={false}
          animate={{ scaleX: progreso }}
          transition={{ duration: reducido ? 0.15 : 0.45, ease: EASE_BRAND }}
        />
      </div>

      <ol className="mt-3 flex gap-1.5" aria-hidden="true">
        {titulos.map((titulo, i) => (
          <li
            key={titulo}
            className={`h-0.5 flex-1 transition-colors duration-300 ${
              i <= paso ? "bg-brand-blue/60" : "bg-white/10"
            }`}
          />
        ))}
      </ol>
    </div>
  );
}
