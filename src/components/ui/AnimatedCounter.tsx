"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type Props = {
  valor: number;
  sufijo?: string;
  prefijo?: string;
  duracion?: number;
  className?: string;
};

/** Contador que se anima una sola vez al entrar en viewport. */
export function AnimatedCounter({
  valor,
  sufijo = "",
  prefijo = "",
  duracion = 1200,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.5 });
  const reducido = useReducedMotion();
  const [actual, setActual] = useState(0);

  useEffect(() => {
    if (!enVista) return;
    if (reducido) {
      setActual(valor);
      return;
    }

    let frame = 0;
    const inicio = performance.now();

    const tick = (ahora: number) => {
      const progreso = Math.min((ahora - inicio) / duracion, 1);
      // easeOutExpo
      const eased = progreso === 1 ? 1 : 1 - Math.pow(2, -10 * progreso);
      setActual(Math.round(eased * valor));
      if (progreso < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enVista, valor, duracion, reducido]);

  return (
    <span ref={ref} className={className}>
      {prefijo}
      {actual}
      {sufijo}
    </span>
  );
}
