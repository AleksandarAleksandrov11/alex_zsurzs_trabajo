"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { categoriasCookies } from "@/content/legal";
import {
  consentimientoMinimo,
  consentimientoTodo,
  guardarConsentimiento,
  leerConsentimiento,
  type Categorias,
} from "@/lib/cookies";
import { EASE_BRAND } from "@/lib/motion";

const EVENTO_ABRIR = "zs:abrir-cookies";

/* Las tres opciones caben en una fila también a 360 px sin perder el área
   táctil de 44 px ni el mismo peso visual que exige la AEPD. */
const compacto = "px-2 text-[0.625rem] leading-tight sm:px-5 sm:text-xs";

/** Enlace permanente del pie para cambiar la elección. */
export function AbrirPreferenciasCookies() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR))}
      className="flex min-h-11 items-center text-left text-fg-muted transition-colors hover:text-fg"
    >
      Configuración de cookies
    </button>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [panel, setPanel] = useState(false);
  const [seleccion, setSeleccion] = useState<Categorias>(consentimientoMinimo);
  const idTitulo = useId();
  const reducido = useReducedMotion();

  useEffect(() => {
    const guardado = leerConsentimiento();
    if (!guardado) {
      setVisible(true);
      return;
    }
    setSeleccion({
      necesarias: true,
      analiticas: guardado.analiticas,
      marketing: guardado.marketing,
    });
  }, []);

  useEffect(() => {
    const abrir = () => {
      setPanel(true);
      setVisible(true);
    };
    window.addEventListener(EVENTO_ABRIR, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR, abrir);
  }, []);

  const decidir = useCallback((categorias: Categorias) => {
    guardarConsentimiento(categorias);
    setVisible(false);
    setPanel(false);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby={idTitulo}
          className="fixed inset-x-0 bottom-0 z-90 px-3 pb-3"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          initial={reducido ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={reducido ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reducido ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reducido ? 0.15 : 0.4, ease: EASE_BRAND }}
        >
          <div className="container-brand !px-0">
            <div className="relative overflow-hidden rounded-[2px] border border-white/15 bg-surface/95 shadow-2xl backdrop-blur-lg">
              <div
                className="rayas-z absolute inset-x-0 top-0 h-1 opacity-70"
                aria-hidden="true"
              />

              <div className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
                  <div className="flex min-w-0 items-start gap-3 lg:flex-1">
                    <Cookie
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <h2 id={idTitulo} className="text-base font-bold font-sans">
                        Cookies y privacidad
                      </h2>
                      <p className="mt-1 text-sm text-fg-muted">
                        Solo lo imprescindible para que la web funcione.
                        <span className="hidden sm:inline">
                          {" "}
                          La analítica actual no instala cookies ni te identifica.
                        </span>{" "}
                        <Link
                          href="/politica-de-cookies"
                          className="text-fg underline underline-offset-4 hover:text-brand-orange"
                        >
                          Política de cookies
                        </Link>
                        .
                      </p>
                    </div>
                  </div>

                  {/* Tres opciones con el mismo peso visual (exigencia de la AEPD) */}
                  <div className="grid shrink-0 grid-cols-3 gap-2 lg:w-auto">
                    <Button
                      variante="secundario"
                      onClick={() => decidir(consentimientoMinimo)}
                      className={compacto}
                    >
                      Rechazar todas
                    </Button>
                    {panel ? (
                      <Button
                        variante="secundario"
                        onClick={() => decidir(seleccion)}
                        className={compacto}
                      >
                        Guardar selección
                      </Button>
                    ) : (
                      <Button
                        variante="secundario"
                        onClick={() => setPanel(true)}
                        className={compacto}
                      >
                        Configurar
                      </Button>
                    )}
                    <Button onClick={() => decidir(consentimientoTodo)} className={compacto}>
                      Aceptar todas
                    </Button>
                  </div>
                </div>

                {panel ? (
                  <ul className="mt-5 flex max-h-[45vh] flex-col gap-3 overflow-y-auto border-t border-white/10 pt-5">
                    {categoriasCookies.map((categoria) => {
                      const activa = categoria.siempreActiva
                        ? true
                        : seleccion[categoria.id as "analiticas" | "marketing"];
                      return (
                        <li
                          key={categoria.id}
                          className="rounded-[2px] border border-white/10 bg-white/[0.02] p-4"
                        >
                          <label className="flex cursor-pointer items-start gap-3">
                            <input
                              type="checkbox"
                              checked={activa}
                              disabled={categoria.siempreActiva}
                              onChange={(e) =>
                                setSeleccion((prev) => ({
                                  ...prev,
                                  [categoria.id]: e.target.checked,
                                }))
                              }
                              className="mt-1 h-5 w-5 shrink-0 accent-[#2F4AA0] disabled:opacity-60"
                            />
                            <span className="min-w-0">
                              <span className="block text-sm font-bold text-fg">
                                {categoria.titulo}
                                {categoria.siempreActiva ? (
                                  <span className="ml-2 text-2xs font-normal text-fg-muted/60">
                                    Siempre activas
                                  </span>
                                ) : null}
                              </span>
                              <span className="mt-1 block text-xs text-fg-muted">
                                {categoria.descripcion}
                              </span>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
