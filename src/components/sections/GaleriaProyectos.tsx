"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { proyectos, type Proyecto } from "@/content/proyectos";
import { EASE_BRAND } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Filtro = { id: string; label: string };

const TODOS = "todos";

type Props = {
  /** Etiquetas resueltas en servidor: así el cliente no carga `servicios.ts`
   *  ni `zonas.ts` enteros, que son los ficheros de contenido más grandes. */
  etiquetasServicio: Record<string, string>;
  etiquetasZona: Record<string, string>;
};

export function GaleriaProyectos({ etiquetasServicio, etiquetasZona }: Props) {
  const [servicio, setServicio] = useState(TODOS);
  const [zona, setZona] = useState(TODOS);
  const [abierto, setAbierto] = useState<{ proyecto: number; imagen: number } | null>(
    null,
  );
  const reducido = useReducedMotion();
  const dialogoRef = useRef<HTMLDivElement>(null);
  const disparadorRef = useRef<HTMLButtonElement | null>(null);

  /* Solo se ofrecen filtros que tienen resultados. */
  const filtrosServicio = useMemo<Filtro[]>(() => {
    const usados = [...new Set(proyectos.map((p) => p.servicio))];
    return [
      { id: TODOS, label: "Todos los servicios" },
      ...usados.map((slug) => ({ id: slug, label: etiquetasServicio[slug] ?? slug })),
    ];
  }, [etiquetasServicio]);

  const filtrosZona = useMemo<Filtro[]>(() => {
    const usadas = [...new Set(proyectos.map((p) => p.zona))];
    return [
      { id: TODOS, label: "Todas las zonas" },
      ...usadas.map((slug) => ({ id: slug, label: etiquetasZona[slug] ?? slug })),
    ];
  }, [etiquetasZona]);

  const visibles = useMemo(
    () =>
      proyectos.filter(
        (p) =>
          (servicio === TODOS || p.servicio === servicio) &&
          (zona === TODOS || p.zona === zona),
      ),
    [servicio, zona],
  );

  const proyectoActivo: Proyecto | null =
    abierto !== null ? (visibles[abierto.proyecto] ?? null) : null;

  const cerrar = useCallback(() => {
    setAbierto(null);
    disparadorRef.current?.focus();
  }, []);

  const mover = useCallback(
    (paso: number) => {
      setAbierto((prev) => {
        if (!prev) return prev;
        const p = visibles[prev.proyecto];
        if (!p) return prev;
        const total = p.imagenes.length;
        return { ...prev, imagen: (prev.imagen + paso + total) % total };
      });
    },
    [visibles],
  );

  useEffect(() => {
    if (!proyectoActivo) return;

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
      if (e.key === "Tab" && dialogoRef.current) {
        const focusables =
          dialogoRef.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (focusables.length === 0) return;
        const primero = focusables[0];
        const ultimo = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    };

    document.addEventListener("keydown", alTeclado);
    dialogoRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener("keydown", alTeclado);
    };
  }, [proyectoActivo, cerrar, mover]);

  if (proyectos.length === 0) {
    return (
      <div className="rounded-[2px] border border-dashed border-white/15 bg-surface/40 p-8 sm:p-10">
        <p className="text-eyebrow text-brand-orange">Pendiente de contenido</p>
        <h2 className="mt-4 text-3xl">La galería está montada y vacía a propósito</h2>
        <div className="prosa mt-5 max-w-2xl">
          <p>
            Los filtros por servicio y por zona, la retícula y el visor con navegación por
            teclado ya funcionan. Lo que falta es el contenido real, y eso no se inventa:
            aquí no va a haber fotos de banco de imágenes ni proyectos de otros.
          </p>
          <p>
            Para publicar un trabajo hacen falta las fotos, el servicio, la zona, el año y
            dos frases sobre el reto y la solución. En cuanto estén, aparece solo en esta
            galería, en la página del servicio correspondiente y en la de la zona.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-col gap-5">
        <fieldset>
          <legend className="text-eyebrow mb-3 text-fg-muted/50">Por servicio</legend>
          <ul className="flex flex-wrap gap-2">
            {filtrosServicio.map((filtro) => (
              <li key={filtro.id}>
                <button
                  type="button"
                  onClick={() => setServicio(filtro.id)}
                  aria-pressed={servicio === filtro.id}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-[2px] border px-3.5 text-sm transition-colors",
                    servicio === filtro.id
                      ? "border-brand-blue bg-brand-blue text-white"
                      : "border-white/12 text-fg-muted hover:border-white/40 hover:text-fg",
                  )}
                >
                  {filtro.label}
                </button>
              </li>
            ))}
          </ul>
        </fieldset>

        <fieldset>
          <legend className="text-eyebrow mb-3 text-fg-muted/50">Por zona</legend>
          <ul className="flex flex-wrap gap-2">
            {filtrosZona.map((filtro) => (
              <li key={filtro.id}>
                <button
                  type="button"
                  onClick={() => setZona(filtro.id)}
                  aria-pressed={zona === filtro.id}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-[2px] border px-3.5 text-sm transition-colors",
                    zona === filtro.id
                      ? "border-brand-blue bg-brand-blue text-white"
                      : "border-white/12 text-fg-muted hover:border-white/40 hover:text-fg",
                  )}
                >
                  {filtro.label}
                </button>
              </li>
            ))}
          </ul>
        </fieldset>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-fg-muted/70">
        {visibles.length} {visibles.length === 1 ? "trabajo" : "trabajos"}
      </p>

      {/* Retícula */}
      <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibles.map((proyecto, i) => {
          const portada = proyecto.imagenes[0];
          return (
            <li key={proyecto.slug} id={proyecto.slug}>
              <button
                type="button"
                onClick={(e) => {
                  disparadorRef.current = e.currentTarget;
                  setAbierto({ proyecto: i, imagen: 0 });
                }}
                className="barrido-z group block w-full overflow-hidden rounded-[2px] border border-white/10 bg-surface/50 text-left transition-colors hover:border-brand-blue/60"
              >
                {portada ? (
                  <Image
                    src={portada.src}
                    alt={portada.alt}
                    width={portada.ancho}
                    height={portada.alto}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="aspect-4/3 w-full object-cover"
                  />
                ) : null}
                <span className="block p-6">
                  <span className="text-eyebrow block text-brand-orange">
                    {etiquetasServicio[proyecto.servicio]}
                    {" · "}
                    {etiquetasZona[proyecto.zona]}
                  </span>
                  <span className="mt-3 block font-display text-2xl">
                    {proyecto.titulo}
                  </span>
                  <span className="mt-3 block text-sm text-fg-muted">{proyecto.reto}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Visor */}
      <AnimatePresence>
        {proyectoActivo && abierto ? (
          <motion.div
            ref={dialogoRef}
            role="dialog"
            aria-modal="true"
            aria-label={proyectoActivo.titulo}
            className="fixed inset-0 z-100 flex flex-col bg-bg/97 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducido ? 0.15 : 0.25, ease: EASE_BRAND }}
          >
            <div className="container-brand flex h-20 shrink-0 items-center justify-between">
              <p className="text-eyebrow text-brand-orange">
                {abierto.imagen + 1} / {proyectoActivo.imagenes.length}
              </p>
              <button
                type="button"
                onClick={cerrar}
                aria-label="Cerrar el visor"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/20 text-fg"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="container-brand flex flex-1 items-center gap-4 overflow-hidden pb-6">
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label="Imagen anterior"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] border border-white/20 text-fg"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <figure className="flex min-w-0 flex-1 flex-col items-center gap-4">
                {proyectoActivo.imagenes[abierto.imagen] ? (
                  <Image
                    src={proyectoActivo.imagenes[abierto.imagen].src}
                    alt={proyectoActivo.imagenes[abierto.imagen].alt}
                    width={proyectoActivo.imagenes[abierto.imagen].ancho}
                    height={proyectoActivo.imagenes[abierto.imagen].alto}
                    sizes="90vw"
                    className="max-h-[62vh] w-auto object-contain"
                  />
                ) : null}
                <figcaption className="max-w-2xl text-center">
                  <span className="font-display text-2xl">{proyectoActivo.titulo}</span>
                  <span className="mt-2 block text-sm text-fg-muted">
                    {proyectoActivo.solucion}
                  </span>
                </figcaption>
              </figure>

              <button
                type="button"
                onClick={() => mover(1)}
                aria-label="Imagen siguiente"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] border border-white/20 text-fg"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
