"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  EVENTO_CONSENTIMIENTO,
  leerConsentimiento,
  type Consentimiento,
} from "@/lib/cookies";

type Props = {
  categoria: "analiticas" | "marketing";
  children: ReactNode;
};

/**
 * Envoltorio para scripts que SÍ requieren consentimiento previo.
 *
 * Hoy no hay ninguno: Vercel Web Analytics funciona sin cookies y se
 * considera esencial, tal y como se documenta en la política de cookies.
 * Cuando se añada Google Analytics o el píxel de Meta, va aquí dentro:
 *
 *   <ConsentGate categoria="analiticas">
 *     <Script src="…" strategy="afterInteractive" />
 *   </ConsentGate>
 */
export function ConsentGate({ categoria, children }: Props) {
  const [consentimiento, setConsentimiento] = useState<Consentimiento | null>(null);

  useEffect(() => {
    setConsentimiento(leerConsentimiento());
    const alCambiar = (e: Event) => {
      setConsentimiento((e as CustomEvent<Consentimiento>).detail);
    };
    window.addEventListener(EVENTO_CONSENTIMIENTO, alCambiar);
    return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, alCambiar);
  }, []);

  if (!consentimiento?.[categoria]) return null;
  return <>{children}</>;
}
