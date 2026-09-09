import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.nombre} · Instalaciones en ${site.nap.ciudad}`,
    short_name: site.nombre,
    description: site.descripcionCorta,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0F0F10",
    theme_color: "#0F0F10",
    lang: "es-ES",
    dir: "ltr",
    categories: ["business", "utilities"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Solicitar presupuesto", url: "/contacto" },
      { name: "Servicios", url: "/servicios" },
      { name: "Zonas de actuación", url: "/zonas" },
    ],
  };
}
