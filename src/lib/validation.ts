import { z } from "zod";

/* -----------------------------------------------------------------
 * Opciones del formulario. Mismo funnel que `contacto.zsolutions.es`,
 * cuya lógica se conserva a propósito.
 * ----------------------------------------------------------------- */

export const opcionesServicio = [
  "climatizacion",
  "electricidad",
  "fontaneria",
  "lampisteria",
  "trabajos-verticales",
  "no-seguro",
] as const;

export const opcionesEspacio = ["vivienda", "local", "comunidad", "nave"] as const;

export const opcionesUrgencia = [
  "urgente",
  "este-mes",
  "tres-meses",
  "sin-prisa",
] as const;

export const opcionesCanal = ["whatsapp", "llamada", "email"] as const;

export const opcionesOrigen = [
  "instagram",
  "tiktok",
  "google",
  "youtube",
  "recomendacion",
  "otros",
] as const;

export type Servicio = (typeof opcionesServicio)[number];
export type Espacio = (typeof opcionesEspacio)[number];
export type Urgencia = (typeof opcionesUrgencia)[number];
export type Canal = (typeof opcionesCanal)[number];
export type Origen = (typeof opcionesOrigen)[number];

/* -----------------------------------------------------------------
 * Esquemas por paso: permiten validar en tiempo real sin exigir
 * campos de pasos posteriores.
 * ----------------------------------------------------------------- */

const telefonoRegex = /^[+()\d\s.-]{9,20}$/;

export const paso1 = z.object({
  servicio: z.enum(opcionesServicio, {
    message: "Elige con qué necesitas ayuda.",
  }),
});

export const paso2 = z.object({
  espacio: z.enum(opcionesEspacio, {
    message: "Indica para qué tipo de espacio es.",
  }),
  ubicacion: z
    .string()
    .trim()
    .min(2, "Escribe al menos la población.")
    .max(120, "Máximo 120 caracteres."),
});

export const paso3 = z.object({
  detalle: z
    .string()
    .trim()
    .min(20, "Cuéntame un poco más: mínimo 20 caracteres.")
    .max(2000, "Máximo 2000 caracteres."),
  urgencia: z.enum(opcionesUrgencia, { message: "Indica para cuándo lo necesitas." }),
});

export const paso4 = z.object({
  canal: z.enum(opcionesCanal, { message: "Elige por dónde prefieres que te contacte." }),
  comentarios: z.string().trim().max(500, "Máximo 500 caracteres.").optional(),
});

export const paso5 = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(2, "Dime cómo te llamas.")
      .max(80, "Máximo 80 caracteres."),
    telefono: z
      .string()
      .trim()
      .max(20, "Máximo 20 caracteres.")
      .refine((v) => v === "" || telefonoRegex.test(v), "Ese teléfono no parece válido.")
      .optional()
      .default(""),
    email: z
      .string()
      .trim()
      .max(120, "Máximo 120 caracteres.")
      .refine(
        (v) => v === "" || z.email().safeParse(v).success,
        "Ese correo no parece válido.",
      )
      .optional()
      .default(""),
    origen: z.enum(opcionesOrigen).optional(),
    privacidad: z.literal(true, {
      message: "Necesito que aceptes la política de privacidad para poder responderte.",
    }),
  })
  .refine((v) => Boolean(v.telefono) || Boolean(v.email), {
    message: "Déjame al menos un teléfono o un correo para poder contestarte.",
    path: ["telefono"],
  });

/**
 * Un `FormData` solo transporta cadenas: los campos sin elegir llegan como
 * "" y las casillas marcadas como "true". Este ayudante convierte el vacío
 * en `undefined` para que los campos opcionales se comporten como tales.
 */
function opcional<T extends z.ZodType>(esquema: T) {
  return z.preprocess((v) => (v === "" ? undefined : v), esquema.optional());
}

/** Esquema completo, el que se valida SIEMPRE en el servidor. */
export const esquemaPresupuesto = z.object({
  servicio: z.enum(opcionesServicio),
  espacio: z.enum(opcionesEspacio),
  ubicacion: z.string().trim().min(2).max(120),
  detalle: z.string().trim().min(20).max(2000),
  urgencia: z.enum(opcionesUrgencia),
  canal: z.enum(opcionesCanal),
  comentarios: z.string().trim().max(500).optional().default(""),
  nombre: z.string().trim().min(2).max(80),
  telefono: z.string().trim().max(20).optional().default(""),
  email: z.string().trim().max(120).optional().default(""),
  origen: opcional(z.enum(opcionesOrigen)),
  /* La casilla llega como la cadena "true", no como booleano. */
  privacidad: z.literal("true").transform(() => true as const),
  /* Honeypot: se valida aparte en la Server Action, no aquí, para que un bot
     no reciba un error de formulario que le indique dónde está la trampa. */
  empresa: z.string().optional().default(""),
  /* Marca de tiempo de apertura del formulario, para descartar envíos instantáneos. */
  abiertoEn: z.coerce.number().int().nonnegative().optional().default(0),
});

export type DatosPresupuesto = z.infer<typeof esquemaPresupuesto>;

/* -----------------------------------------------------------------
 * Etiquetas legibles, compartidas por el formulario y por el email.
 * ----------------------------------------------------------------- */

export const etiquetasServicio: Record<Servicio, string> = {
  climatizacion: "Climatización",
  electricidad: "Electricidad",
  fontaneria: "Fontanería",
  lampisteria: "Lampistería",
  "trabajos-verticales": "Trabajos verticales",
  "no-seguro": "No estoy seguro",
};

export const etiquetasEspacio: Record<Espacio, string> = {
  vivienda: "Vivienda particular",
  local: "Local u oficina",
  comunidad: "Comunidad de vecinos",
  nave: "Nave industrial",
};

export const etiquetasUrgencia: Record<Urgencia, string> = {
  urgente: "Urgente esta semana",
  "este-mes": "Este mes",
  "tres-meses": "Próximos 3 meses",
  "sin-prisa": "Sin prisa",
};

export const etiquetasCanal: Record<Canal, string> = {
  whatsapp: "WhatsApp",
  llamada: "Llamada",
  email: "Email",
};

export const etiquetasOrigen: Record<Origen, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  google: "Google",
  youtube: "YouTube",
  recomendacion: "Recomendación",
  otros: "Otros",
};

/** Errores por campo, en el formato que consume el formulario. */
export type ErroresCampo = Partial<Record<string, string>>;

export function erroresDesde(error: z.ZodError): ErroresCampo {
  const salida: ErroresCampo = {};
  for (const incidencia of error.issues) {
    const campo = String(incidencia.path[0] ?? "_");
    if (!salida[campo]) salida[campo] = incidencia.message;
  }
  return salida;
}
