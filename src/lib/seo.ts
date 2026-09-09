import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * URL base del sitio.
 *
 * Se resuelve en tiempo de compilación, que es cuando se generan las 47 rutas
 * estáticas, el sitemap y las URL de las imágenes Open Graph.
 *
 * Si esto quedara fijo en `zsolutions.es`, un despliegue en un dominio
 * `*.vercel.app` publicaría canonicals, sitemap y miniaturas sociales
 * apuntando a un dominio que todavía no resuelve: la web se vería, pero
 * las previsualizaciones al compartir el enlace saldrían rotas y Google
 * indexaría direcciones equivocadas.
 *
 * Orden de prioridad:
 *  1. `NEXT_PUBLIC_SITE_URL`, el dominio definitivo cuando ya está apuntado.
 *  2. El dominio de producción del proyecto en Vercel.
 *  3. La URL única de la previsualización, para que cada preview se autodescriba.
 *  4. `localhost` en desarrollo y, como último recurso, el dominio del proyecto.
 */
function resolverBaseUrl(): string {
  const limpiar = (valor: string) =>
    (valor.startsWith("http") ? valor : `https://${valor}`).replace(/\/+$/, "");

  if (process.env.NEXT_PUBLIC_SITE_URL) return limpiar(process.env.NEXT_PUBLIC_SITE_URL);

  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return limpiar(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }

  if (process.env.VERCEL_URL) return limpiar(process.env.VERCEL_URL);

  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";

  return site.url;
}

export const BASE_URL = resolverBaseUrl();

/** El dominio al que apunta la marca, con independencia de dónde esté servida. */
export const URL_CANONICA_MARCA = site.url;

type Args = {
  /** Sin el sufijo de marca: se añade solo cuando cabe. */
  title: string;
  description: string;
  /** Ruta absoluta del sitio, empezando por "/". */
  path: string;
  /** Título grande de la imagen OG. Por defecto, el `title`. */
  ogTitulo?: string;
  ogSubtitulo?: string;
  /** Excluir de los índices (páginas técnicas). */
  noIndex?: boolean;
};

export function urlOg(titulo: string, subtitulo?: string): string {
  const params = new URLSearchParams({ t: titulo });
  if (subtitulo) params.set("s", subtitulo);
  return `${BASE_URL}/api/og?${params.toString()}`;
}

export function crearMetadata({
  title,
  description,
  path,
  ogTitulo,
  ogSubtitulo,
  noIndex = false,
}: Args): Metadata {
  const url = `${BASE_URL}${path === "/" ? "" : path}`;
  const imagen = urlOg(ogTitulo ?? title, ogSubtitulo);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : undefined,
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
