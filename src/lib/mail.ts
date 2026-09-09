import { Resend } from "resend";
import { site } from "@/content/site";
import {
  etiquetasCanal,
  etiquetasEspacio,
  etiquetasOrigen,
  etiquetasServicio,
  etiquetasUrgencia,
  type DatosPresupuesto,
} from "@/lib/validation";

/* Variables de entorno documentadas en el README y en .env.example */
const CLAVE = process.env.RESEND_API_KEY;
const REMITENTE = process.env.EMAIL_REMITENTE;
const DESTINATARIO = process.env.EMAIL_DESTINATARIO ?? site.nap.email ?? undefined;

/** Escapa el contenido antes de meterlo en el HTML del correo. */
function escapar(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fila(etiqueta: string, valor: string): string {
  return `<tr>
    <td style="padding:10px 16px;border-bottom:1px solid #e6e6e6;color:#23366F;font-weight:bold;width:34%;vertical-align:top;">${escapar(etiqueta)}</td>
    <td style="padding:10px 16px;border-bottom:1px solid #e6e6e6;color:#111;vertical-align:top;">${escapar(valor).replace(/\n/g, "<br>")}</td>
  </tr>`;
}

function envoltorio(titulo: string, cuerpo: string): string {
  return `<!doctype html>
<html lang="es"><body style="margin:0;padding:24px;background:#f4f5f8;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e0e2e8;">
    <tr>
      <td style="background:#23366F;padding:22px 24px;color:#fff;">
        <div style="font-size:20px;font-weight:bold;letter-spacing:.5px;">${escapar(site.nombre)}</div>
        <div style="font-size:13px;opacity:.85;margin-top:4px;">${escapar(titulo)}</div>
      </td>
    </tr>
    <tr><td style="padding:8px 0;">${cuerpo}</td></tr>
    <tr>
      <td style="padding:18px 24px;border-top:1px solid #e6e6e6;color:#666;font-size:12px;">
        ${escapar(site.nombre)} · ${escapar(site.fundador)} · ${escapar(site.nap.ciudad)}
      </td>
    </tr>
  </table>
</body></html>`;
}

export type ResultadoEnvio =
  | { ok: true }
  | { ok: false; motivo: "sin-configurar" | "error-envio" };

export async function enviarSolicitud(
  datos: DatosPresupuesto,
): Promise<ResultadoEnvio> {
  if (!CLAVE || !REMITENTE || !DESTINATARIO) {
    /* Sin credenciales no se puede enviar. Se registra y se avisa arriba para
       que la interfaz ofrezca WhatsApp o teléfono como alternativa. */
    console.error(
      "[presupuesto] Falta configuración de correo. Revisa RESEND_API_KEY, EMAIL_REMITENTE y EMAIL_DESTINATARIO.",
    );
    return { ok: false, motivo: "sin-configurar" };
  }

  const resend = new Resend(CLAVE);

  const detalle = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${fila("Servicio", etiquetasServicio[datos.servicio])}
    ${fila("Tipo de espacio", etiquetasEspacio[datos.espacio])}
    ${fila("Ubicación", datos.ubicacion)}
    ${fila("Urgencia", etiquetasUrgencia[datos.urgencia])}
    ${fila("Descripción", datos.detalle)}
    ${fila("Canal preferido", etiquetasCanal[datos.canal])}
    ${datos.comentarios ? fila("Comentarios", datos.comentarios) : ""}
    ${fila("Nombre", datos.nombre)}
    ${datos.telefono ? fila("Teléfono / WhatsApp", datos.telefono) : ""}
    ${datos.email ? fila("Email", datos.email) : ""}
    ${datos.origen ? fila("Cómo nos conoció", etiquetasOrigen[datos.origen]) : ""}
  </table>`;

  try {
    /* Ojo: el SDK de Resend NO lanza en los errores de la API (clave inválida,
       dominio sin verificar, límite alcanzado): los devuelve en `error`. Si
       solo se capturase la excepción, un envío fallido pasaría por bueno y
       Alex nunca recibiría la solicitud. */
    const { error } = await resend.emails.send({
      from: REMITENTE,
      to: DESTINATARIO,
      replyTo: datos.email || undefined,
      subject: `Presupuesto · ${etiquetasServicio[datos.servicio]} · ${datos.ubicacion} · ${datos.nombre}`,
      html: envoltorio("Nueva solicitud de presupuesto", detalle),
    });

    if (error) {
      console.error("[presupuesto] Resend rechazó el aviso a Alex:", error);
      return { ok: false, motivo: "error-envio" };
    }
  } catch (error) {
    console.error("[presupuesto] Error de red enviando el aviso a Alex", error);
    return { ok: false, motivo: "error-envio" };
  }

  /* Autorespuesta al cliente. Si falla, no se invalida la solicitud: el aviso
     importante, el de Alex, ya ha salido. */
  if (datos.email) {
    const cuerpo = `<div style="padding:24px;color:#111;line-height:1.6;">
      <p>Hola ${escapar(datos.nombre)},</p>
      <p>He recibido tu solicitud sobre <strong>${escapar(etiquetasServicio[datos.servicio])}</strong> en ${escapar(datos.ubicacion)}.</p>
      <p>La reviso y te contacto en <strong>${escapar(site.respuesta)}</strong> con una primera valoración. Sin compromiso.</p>
      <p style="margin-top:24px;">Un saludo,<br><strong>${escapar(site.fundador)}</strong><br>${escapar(site.nombre)}</p>
    </div>
    <div style="padding:0 24px 8px;">${detalle}</div>`;

    try {
      const { error } = await resend.emails.send({
        from: REMITENTE,
        to: datos.email,
        subject: `He recibido tu solicitud · ${site.nombre}`,
        html: envoltorio("Confirmación de tu solicitud", cuerpo),
      });
      if (error) console.error("[presupuesto] Resend rechazó la autorespuesta:", error);
    } catch (error) {
      console.error("[presupuesto] Error de red enviando la autorespuesta", error);
    }
  }

  return { ok: true };
}
