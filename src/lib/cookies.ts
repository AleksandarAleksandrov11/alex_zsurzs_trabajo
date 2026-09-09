"use client";

/**
 * Gestión del consentimiento de cookies.
 *
 * · Se guarda en una cookie propia de primera parte, `zs_consent`,
 *   con caducidad de 12 meses (lo que declara la política de cookies).
 * · `necesarias` siempre es true: sin ellas el sitio no puede prestarse.
 * · Ningún script no esencial debe cargarse antes de que esto devuelva
 *   `true` para su categoría. Ver `ConsentGate`.
 */

export const NOMBRE_COOKIE = "zs_consent";
export const VERSION_CONSENTIMIENTO = 1;
export const MESES_VIGENCIA = 12;
export const EVENTO_CONSENTIMIENTO = "zs:consentimiento";

export type Categorias = {
  necesarias: true;
  analiticas: boolean;
  marketing: boolean;
};

export type Consentimiento = Categorias & {
  v: number;
  ts: number;
};

export const consentimientoTodo: Categorias = {
  necesarias: true,
  analiticas: true,
  marketing: true,
};

export const consentimientoMinimo: Categorias = {
  necesarias: true,
  analiticas: false,
  marketing: false,
};

export function leerConsentimiento(): Consentimiento | null {
  if (typeof document === "undefined") return null;

  const bruto = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${NOMBRE_COOKIE}=`))
    ?.slice(NOMBRE_COOKIE.length + 1);

  if (!bruto) return null;

  try {
    const datos = JSON.parse(decodeURIComponent(bruto)) as Partial<Consentimiento>;
    if (datos.v !== VERSION_CONSENTIMIENTO) return null;
    return {
      necesarias: true,
      analiticas: Boolean(datos.analiticas),
      marketing: Boolean(datos.marketing),
      v: VERSION_CONSENTIMIENTO,
      ts: typeof datos.ts === "number" ? datos.ts : Date.now(),
    };
  } catch {
    return null;
  }
}

export function guardarConsentimiento(categorias: Categorias): Consentimiento {
  const valor: Consentimiento = {
    ...categorias,
    necesarias: true,
    v: VERSION_CONSENTIMIENTO,
    ts: Date.now(),
  };

  const maxAge = 60 * 60 * 24 * 30 * MESES_VIGENCIA;
  const seguro = typeof location !== "undefined" && location.protocol === "https:";

  document.cookie = [
    `${NOMBRE_COOKIE}=${encodeURIComponent(JSON.stringify(valor))}`,
    "path=/",
    `max-age=${maxAge}`,
    "SameSite=Lax",
    seguro ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMIENTO, { detail: valor }));
  return valor;
}
