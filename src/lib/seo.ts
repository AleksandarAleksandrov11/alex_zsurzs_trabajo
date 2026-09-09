import type { Metadata } from "next";
import { site } from "@/content/site";

export const BASE_URL = site.url;

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
