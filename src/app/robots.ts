import type { MetadataRoute } from "next";
import { BASE_URL, ES_INDEXABLE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  /* Sin dominio definitivo, la dirección es provisional y no debe indexarse:
     dejar una copia en el índice de Google obliga después a limpiarla a base
     de redirecciones. Se abre solo al definir `NEXT_PUBLIC_SITE_URL`. */
  if (!ES_INDEXABLE) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* La ruta de imágenes OG se genera bajo demanda y no aporta nada
           al índice. */
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
