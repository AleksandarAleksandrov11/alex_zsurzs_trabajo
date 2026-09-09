"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Mail, Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import {
  hrefEmail,
  hrefTelefono,
  hrefWhatsApp,
  mensajeWhatsApp,
  navPrincipal,
  navLegal,
  site,
  telefonoVisible,
} from "@/content/site";
import { EASE_BRAND } from "@/lib/motion";
import { numeroSeccion } from "@/lib/utils";

export function MobileMenu() {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();
  const reducido = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);
  const telefono = telefonoVisible();

  useEffect(() => setAbierto(false), [pathname]);

  useEffect(() => {
    if (!abierto) return;

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        botonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
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
    };

    document.addEventListener("keydown", alTeclado);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener("keydown", alTeclado);
    };
  }, [abierto]);

  return (
    <>
      <button
        ref={botonRef}
        type="button"
        onClick={() => setAbierto(true)}
        aria-expanded={abierto}
        aria-label="Abrir menú"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/20 text-fg transition-colors hover:border-white/50 lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {abierto ? (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="grano fixed inset-0 z-100 flex flex-col bg-bg lg:hidden"
            initial={reducido ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={reducido ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reducido ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reducido ? 0.15 : 0.45, ease: EASE_BRAND }}
            style={{
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div className="grid-plano absolute inset-0 opacity-40" aria-hidden="true" />

            <div className="container-brand relative flex h-20 shrink-0 items-center justify-between">
              <BrandLogo variante="horizontal" className="text-fg" />
              <button
                type="button"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar menú"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/20 text-fg"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Navegación principal"
              className="container-brand relative flex-1 overflow-y-auto py-6"
            >
              <ul className="flex flex-col">
                {navPrincipal.map((enlace, i) => (
                  <li key={enlace.href} className="border-b border-white/10">
                    <Link
                      href={enlace.href}
                      className="flex items-baseline gap-4 py-5 text-3xl text-fg"
                    >
                      <span className="num-seccion">{numeroSeccion(i)}</span>
                      <span className="font-display">{enlace.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink href="/contacto" tamano="lg" className="w-full">
                  Solicitar presupuesto
                </ButtonLink>
                <ButtonLink
                  href={hrefWhatsApp(mensajeWhatsApp)}
                  variante="secundario"
                  tamano="lg"
                  className="w-full"
                >
                  Escribir por WhatsApp
                </ButtonLink>
              </div>

              <div className="mt-8 flex flex-col gap-3 text-sm text-fg-muted">
                {telefono ? (
                  <a href={hrefTelefono()} className="flex min-h-11 items-center gap-3">
                    <Phone className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                    {telefono}
                  </a>
                ) : null}
                {site.nap.email ? (
                  <a href={hrefEmail()} className="flex min-h-11 items-center gap-3">
                    <Mail className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                    {site.nap.email}
                  </a>
                ) : null}
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 pb-6 text-xs text-fg-muted/60">
                {navLegal.map((enlace) => (
                  <li key={enlace.href}>
                    <Link href={enlace.href} className="hover:text-fg">
                      {enlace.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
