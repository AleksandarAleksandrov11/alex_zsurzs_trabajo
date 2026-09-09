/**
 * Fuente única de verdad del sitio.
 * Regla del proyecto: ningún texto, URL ni dato de contacto escrito a fuego
 * en un componente. Todo sale de `src/content/`.
 */

/** Dato que debe aportar Alex. Mientras valga `null`, la web NO lo inventa. */
export type DatoPendiente = string | null;

export const site = {
  nombre: "ZSolutions",
  nombreCompleto: "ZSolutions · Instalaciones",
  fundador: "Alex Zsurzs",
  /**
   * TODO (Alex): dominio definitivo, cuando se contrate y apunte a Vercel.
   *
   * Mientras valga `null`, la web funciona igual en la URL que le dé Vercel:
   * canonicals, sitemap, JSON-LD y miniaturas sociales se generan solos a
   * partir del dominio donde esté servida. No hay ninguna dirección escrita
   * a fuego. Ver `resolverBaseUrl()` en `src/lib/seo.ts`.
   */
  dominio: null as DatoPendiente,
  locale: "es_ES",
  lang: "es",
  descripcionCorta:
    "Instalador certificado en Barcelona. Electricidad, fontanería, climatización, aerotermia y trabajos verticales.",
  lema: "Instalaciones hechas por quien conoce el oficio desde abajo.",

  /* ---------------------------------------------------------------
   * NAP (Name · Address · Phone).
   * Debe coincidir EXACTAMENTE con el Perfil de Empresa de Google.
   * --------------------------------------------------------------- */
  nap: {
    /** TODO (Alex): nombre fiscal o razón social exacta. */
    razonSocial: null as DatoPendiente,
    /** TODO (Alex): NIF / CIF. */
    nif: null as DatoPendiente,
    /** TODO (Alex): domicilio de la actividad (calle y número). */
    calle: null as DatoPendiente,
    /** TODO (Alex): código postal. */
    codigoPostal: null as DatoPendiente,
    ciudad: "Barcelona",
    provincia: "Barcelona",
    comunidad: "Cataluña",
    pais: "ES",
    /** TODO (Alex): teléfono de contacto en formato E.164, p. ej. "+34600000000". */
    telefono: null as DatoPendiente,
    /** TODO (Alex): WhatsApp en formato internacional sin "+", p. ej. "34600000000". */
    whatsapp: null as DatoPendiente,
    /** TODO (Alex): email de recepción de presupuestos. */
    email: null as DatoPendiente,
    /** TODO (Alex): horario real de atención. */
    horario: null as DatoPendiente,
    /** TODO (Alex): coordenadas del domicilio para el schema `geo`. */
    geo: null as { lat: number; lng: number } | null,
  },

  /** Franja de precios declarada en el schema. €€ = tarifa media de sector. */
  priceRange: "€€",

  redes: {
    instagram: "https://www.instagram.com/alex_zsurzs/",
    tiktok: "https://www.tiktok.com/@alex_zsurzs?lang=es-419",
    youtube: "https://www.youtube.com/@Alex_Zsurzs",
    webPersonal: "https://alexzsurzs.com/",
  },

  /** Tienda / formación (proyecto hermano). */
  tienda: "https://alexzsurzs.com/",

  /** Compromiso de respuesta que se repite en toda la web. */
  respuesta: "menos de 24 horas",
} as const;

export const barraConfianza = [
  "REBT",
  "RITE",
  "F-Gas",
  "IRATA Nivel 3",
  "+10 años en obra",
] as const;

/* -----------------------------------------------------------------
 * Helpers de contacto.
 * Si el dato aún no existe, el enlace cae al formulario en lugar de
 * apuntar a un `tel:` roto o a un número inventado.
 * ----------------------------------------------------------------- */

export function telefonoVisible(): string | null {
  return site.nap.telefono;
}

export function hrefTelefono(): string {
  return site.nap.telefono ? `tel:${site.nap.telefono.replace(/\s/g, "")}` : "/contacto";
}

export function hrefWhatsApp(mensaje?: string): string {
  if (!site.nap.whatsapp) return "/contacto";
  const base = `https://wa.me/${site.nap.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

export function hrefEmail(): string {
  return site.nap.email ? `mailto:${site.nap.email}` : "/contacto";
}

export const mensajeWhatsApp =
  "Hola Alex, he visto la web de ZSolutions y me gustaría pedir presupuesto.";

/* -----------------------------------------------------------------
 * Navegación
 * ----------------------------------------------------------------- */

export type EnlaceNav = { label: string; href: string };

export const navPrincipal: EnlaceNav[] = [
  { label: "Servicios", href: "/servicios" },
  { label: "Zonas", href: "/zonas" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Sobre Alex", href: "/sobre-alex" },
  { label: "Formación", href: "/formacion" },
];

export const navLegal: EnlaceNav[] = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Política de cookies", href: "/politica-de-cookies" },
];
