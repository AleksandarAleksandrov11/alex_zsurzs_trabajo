"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { hrefWhatsApp, mensajeWhatsApp, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Botón flotante discreto. Aparece tras el primer scroll para no tapar el
 * hero, y nunca se anima de forma que retrase el acceso al contacto.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alScroll = () => setVisible(window.scrollY > 400);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  const destino = hrefWhatsApp(mensajeWhatsApp);
  const esWhatsApp = Boolean(site.nap.whatsapp);

  return (
    <a
      href={destino}
      {...(esWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={
        esWhatsApp ? "Escribir por WhatsApp" : "Ir al formulario de presupuesto"
      }
      className={cn(
        "fixed right-4 z-80 inline-flex h-13 w-13 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg transition-[opacity,transform,background-color] duration-300 hover:bg-brand-blue-hover",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
