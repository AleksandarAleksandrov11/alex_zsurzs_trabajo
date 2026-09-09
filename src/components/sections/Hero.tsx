"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Foto } from "@/components/ui/Foto";
import type { NombreFoto } from "@/content/fotos";
import { EASE_BRAND } from "@/lib/motion";
import { barraConfianza, hrefWhatsApp, mensajeWhatsApp } from "@/content/site";

type Props = {
  eyebrow: string;
  /** Cada string es una línea del titular, revelada con máscara. */
  lineas: string[];
  descripcion: string;
  /** Solo la home lleva el hero a pantalla completa. */
  completo?: boolean;
  conBarraConfianza?: boolean;
  /** Fotografía real de fondo. Si no hay, queda la composición gráfica. */
  foto?: { nombre: NombreFoto; alt: string; posicion?: string };
};

export function Hero({
  eyebrow,
  lineas,
  descripcion,
  completo = false,
  conBarraConfianza = false,
  foto,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reducido = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Parallax suave: 15 % como máximo, y desactivado si se pide menos movimiento. */
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reducido ? "0%" : "15%"]);
  const escala = useTransform(scrollYProgress, [0, 1], [1.05, reducido ? 1.05 : 1]);

  return (
    <section
      ref={ref}
      className="relative isolate flex flex-col justify-end overflow-hidden"
      style={{
        minHeight: completo ? "100dvh" : undefined,
        paddingTop: completo ? "clamp(8rem, 18vh, 12rem)" : "clamp(8rem, 16vh, 11rem)",
        paddingBottom: completo ? "clamp(3rem, 8vh, 6rem)" : "clamp(3rem, 6vh, 4.5rem)",
      }}
    >
      {/* Fondo: fotografía real de obra con la capa de color corporativo
          al 60–80 %, como pide el apartado 05 del manual. Si no hay foto,
          queda la composición gráfica sola. */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y, scale: escala }}
        aria-hidden="true"
      >
        {foto ? (
          <Foto
            nombre={foto.nombre}
            alt=""
            priority
            tratamiento="bn"
            /* Va detrás de una capa corporativa muy densa. En móvil se declara
               un `sizes` deliberadamente por debajo del ancho real: el navegador
               descarga y decodifica una variante mucho menor, no se aprecia
               diferencia bajo la capa y el LCP baja de forma notable. */
            sizes="(max-width: 767px) 55vw, 100vw"
            calidad={62}
            className="absolute inset-0 h-full w-full"
            objectPosition={foto.posicion ?? "62% 30%"}
          />
        ) : null}
        {foto ? <div className="capa-corporativa absolute inset-0" /> : null}
        <div className="grid-plano absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background: foto
              ? "linear-gradient(100deg, rgba(15,15,16,.94) 0%, rgba(15,15,16,.72) 42%, rgba(35,54,111,.45) 100%)"
              : "radial-gradient(75% 62% at 78% 6%, rgba(35,54,111,.85) 0%, transparent 60%), radial-gradient(60% 55% at 8% 92%, rgba(47,74,160,.35) 0%, transparent 62%)",
          }}
        />
        <div
          className="rayas-z absolute -right-24 top-1/4 h-72 w-[36rem] opacity-30"
          style={{ maskImage: "linear-gradient(to left, black, transparent)" }}
        />
        {/* Viñeteado */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 50%, transparent 40%, rgba(15,15,16,.85) 100%)",
          }}
        />
      </motion.div>

      <div className="container-brand relative">
        <motion.p
          className="text-eyebrow mb-6 flex items-center gap-3 text-brand-orange"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <span className="rayas-z inline-block h-3 w-10" aria-hidden="true" />
          {eyebrow}
        </motion.p>

        <h1 className="max-w-5xl text-7xl">
          {lineas.map((linea, i) => (
            <span key={linea} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={reducido ? { opacity: 0 } : { y: "110%" }}
                animate={reducido ? { opacity: 1 } : { y: "0%" }}
                transition={{
                  duration: reducido ? 0.15 : 0.85,
                  delay: reducido ? 0 : 0.08 + i * 0.09,
                  ease: EASE_BRAND,
                }}
              >
                {linea}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-7 max-w-2xl text-lg text-fg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {descripcion}
        </motion.p>

        {/* Los CTA aparecen con un fundido corto: nunca se hacen esperar. */}
        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.38 }}
        >
          <ButtonLink href="/contacto" tamano="lg">
            Solicitar presupuesto
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink
            href={hrefWhatsApp(mensajeWhatsApp)}
            variante="secundario"
            tamano="lg"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </ButtonLink>
        </motion.div>

        {conBarraConfianza ? (
          <motion.div
            className="mt-12 border-t border-white/10 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {barraConfianza.map((item) => (
                <li
                  key={item}
                  className="text-eyebrow flex items-center gap-2.5 text-fg-muted/75"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 bg-brand-blue"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
