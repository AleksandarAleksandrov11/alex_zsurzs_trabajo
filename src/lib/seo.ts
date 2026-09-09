import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * URL base del sitio.
 *
 * Se resuelve en tiempo de compilación, que es cuando se generan las 47 rutas
 * estáticas, el sitemap y las URL de las imágenes Open Graph.
 *
 * No hay ningún dominio escrito a fuego: la web se autodescribe con la
 * dirección en la que está servida. Así funciona correctamente hoy en la URL
 * que da Vercel y seguirá funcionando el día que se apunte el dominio
 * definitivo, sin tocar código.
 *
 * Orden de prioridad:
 *  1. `NEXT_PUBLIC_SITE_URL`, el dominio definitivo cuando ya esté apuntado.
 *  2. El dominio de producción del proyecto en Vercel.
 *  3. La URL única de la previsualización, para que cada preview se autodescriba.
 *  4. `localhost` en desarrollo.
 */
function resolverBaseUrl(): string {
  const limpiar = (valor: string) =>
    (valor.startsWith("http") ? valor : `https://${valor}`).replace(/\/+$/, "");

  if (process.env.NEXT_PUBLIC_SITE_URL) return limpiar(process.env.NEXT_PUBLIC_SITE_URL);

  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return limpiar(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }

  if (process.env.VERCEL_URL) return limpiar(process.env.VERCEL_URL);

  return "http://localhost:3000";
}

export const BASE_URL = resolverBaseUrl();

/** El dominio en el que está servida la web, sin protocolo. */
export const DOMINIO_ACTUAL = BASE_URL.replace(/^https?:\/\//, "");

/**
 * Si la web se abre o no a los buscadores.
 *
 * Por defecto solo se indexa cuando está en su dominio definitivo. Indexar una
 * dirección provisional de Vercel tiene un coste real: cuando llegue el
 * dominio bueno, Google ya tendrá una copia compitiendo con él por las mismas
 * búsquedas, y hay que deshacerlo a base de redirecciones y reindexación.
 *
 * Se activa de dos formas:
 *  · Definiendo `NEXT_PUBLIC_SITE_URL`, que es lo que harás al apuntar el
 *    dominio. Es el camino recomendado.
 *  · Forzándolo con `NEXT_PUBLIC_PERMITIR_INDEXACION=true`, si prefieres que
 *    la dirección provisional entre en Google desde ya, asumiendo lo anterior.
 *
 * Las previsualizaciones nunca se indexan, se ponga lo que se ponga.
 *
 * Nota: con la indexación cerrada, Lighthouse baja la puntuación de SEO a
 * unos 69 puntos por el `noindex`. No es un fallo de la web: es exactamente
 * lo que se le ha pedido. Con el dominio puesto vuelve a 100.
 */
export const ES_INDEXABLE =
  (Boolean(process.env.NEXT_PUBLIC_SITE_URL) ||
    process.env.NEXT_PUBLIC_PERMITIR_INDEXACION === "true") &&
  process.env.VERCEL_ENV !== "preview";



type Args = {
  /** Sin el sufijo de marca: se añade solo cuando cabe. */
  title: string;
  description: string;
  /** Ruta absoluta del sitio, empezando por "/". */
  path: string;
  /** Excluir de los índices (páginas técnicas). */
  noIndex?: boolean;
};

/**
 * Miniatura para redes sociales.
 *
 * Es una imagen estática de marca, no generada al vuelo. La ruta `/api/og`
 * que la componía con `next/og` se ha retirado: ese paquete arrastra binarios
 * WebAssembly que hay que empaquetar dentro de la función, y era lo único que
 * quedaba en la fase de despliegue en la que Vercel fallaba. El fichero de
 * `public/og.png` es exactamente el diseño que generaba aquella ruta.
 *
 * TODO: recuperar la miniatura por página cuando el despliegue esté asentado.
 * Hoy todas las páginas comparten la misma, que es lo que hace la mayoría de
 * sitios y no penaliza nada.
 */
export function urlOg(): string {
  return `${BASE_URL}/og.png`;
}

export function crearMetadata({
  title,
  description,
  path,
  noIndex = false,
}: Args): Metadata {
  const url = `${BASE_URL}${path === "/" ? "" : path}`;
  const imagen = urlOg();

  /* Cuidado: en el API de metadatos de Next, una página que declara la clave
     `robots` sobrescribe la del layout, aunque su valor sea `undefined`. Por
     eso aquí se resuelve siempre de forma explícita en lugar de delegar. */
  const indexable = ES_INDEXABLE && !noIndex;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.nombre,
      url,
      title,
      description,
      images: [{ url: imagen, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagen],
    },
  };
}
