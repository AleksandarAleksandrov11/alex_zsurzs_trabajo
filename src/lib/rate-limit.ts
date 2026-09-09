/**
 * Limitador de envíos por IP, en memoria.
 *
 * Es una defensa de primera línea, no un sistema distribuido: en Vercel cada
 * instancia serverless tiene su propio mapa, así que un atacante decidido
 * podría repartir peticiones entre instancias. Se combina a propósito con el
 * honeypot y con el tiempo mínimo de cumplimentación, que sí son globales.
 *
 * TODO (opcional): si el volumen de spam lo justifica, sustituir por Upstash
 * Redis o Vercel KV sin tocar el resto del código: la firma no cambia.
 */

type Registro = { marcas: number[] };

const VENTANA_MS = 60 * 60 * 1000; // 1 hora
const MAX_POR_VENTANA = 5;
const LIMITE_MAPA = 5000;

const registros = new Map<string, Registro>();

export type ResultadoLimite = {
  permitido: boolean;
  restantes: number;
  /** Segundos que faltan para poder volver a enviar. */
  esperaSegundos: number;
};

export function comprobarLimite(clave: string): ResultadoLimite {
  const ahora = Date.now();

  /* Purga sencilla para que el mapa no crezca sin control. */
  if (registros.size > LIMITE_MAPA) {
    for (const [k, v] of registros) {
      if (v.marcas.every((m) => ahora - m > VENTANA_MS)) registros.delete(k);
    }
  }

  const registro = registros.get(clave) ?? { marcas: [] };
  const vigentes = registro.marcas.filter((m) => ahora - m < VENTANA_MS);

  if (vigentes.length >= MAX_POR_VENTANA) {
    const masAntigua = Math.min(...vigentes);
    registros.set(clave, { marcas: vigentes });
    return {
      permitido: false,
      restantes: 0,
      esperaSegundos: Math.ceil((VENTANA_MS - (ahora - masAntigua)) / 1000),
    };
  }

  vigentes.push(ahora);
  registros.set(clave, { marcas: vigentes });

  return {
    permitido: true,
    restantes: MAX_POR_VENTANA - vigentes.length,
    esperaSegundos: 0,
  };
}
