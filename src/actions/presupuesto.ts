"use server";

import { headers } from "next/headers";
import { enviarSolicitud } from "@/lib/mail";
import { comprobarLimite } from "@/lib/rate-limit";
import { erroresDesde, esquemaPresupuesto, type ErroresCampo } from "@/lib/validation";

export type EstadoPresupuesto =
  | { estado: "inicial" }
  | { estado: "ok" }
  | { estado: "error"; mensaje: string; errores?: ErroresCampo };

/** Tiempo mínimo razonable para rellenar cinco pasos, en milisegundos. */
const MINIMO_CUMPLIMENTACION = 3500;

export async function enviarPresupuesto(
  _previo: EstadoPresupuesto,
  formData: FormData,
): Promise<EstadoPresupuesto> {
  /* 1 · Validación en servidor. Nunca se confía en la del cliente. */
  const analisis = esquemaPresupuesto.safeParse(Object.fromEntries(formData));

  if (!analisis.success) {
    return {
      estado: "error",
      mensaje: "Faltan datos o hay algo que revisar en el formulario.",
      errores: erroresDesde(analisis.error),
    };
  }

  const datos = analisis.data;

  /* 2 · Honeypot: campo invisible que solo rellenan los bots. */
  if (datos.empresa) {
    /* Se responde como si todo hubiera ido bien, para no darle pistas. */
    return { estado: "ok" };
  }

  /* 3 · Envío instantáneo: también es señal de bot. */
  const transcurrido = datos.abiertoEn ? Date.now() - datos.abiertoEn : Infinity;
  if (transcurrido < MINIMO_CUMPLIMENTACION) {
    return { estado: "ok" };
  }

  /* 4 · Límite por IP. */
  const cabeceras = await headers();
  const ip =
    cabeceras.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    cabeceras.get("x-real-ip") ||
    "desconocida";

  const limite = comprobarLimite(ip);
  if (!limite.permitido) {
    const minutos = Math.max(1, Math.ceil(limite.esperaSegundos / 60));
    return {
      estado: "error",
      mensaje: `Has enviado varias solicitudes seguidas. Vuelve a intentarlo en ${minutos} minutos, o escríbeme directamente por WhatsApp.`,
    };
  }

  /* 5 · Envío. */
  const envio = await enviarSolicitud(datos);

  if (!envio.ok) {
    return {
      estado: "error",
      mensaje:
        envio.motivo === "sin-configurar"
          ? "Ahora mismo no puedo procesar el formulario. Escríbeme por WhatsApp o por teléfono y lo resolvemos igual."
          : "No he podido enviar la solicitud. Inténtalo de nuevo en un minuto o escríbeme por WhatsApp.",
    };
  }

  return { estado: "ok" };
}
