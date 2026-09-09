import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";
import { servicios } from "@/content/servicios";
import { zonas } from "@/content/zonas";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const estaticas: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/servicios`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/zonas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/proyectos`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/sobre-alex`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/formacion`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contacto`, changeFrequency: "yearly", priority: 0.9 },
    { url: `${BASE_URL}/aviso-legal`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/politica-de-privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/politica-de-cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const paginasServicio: MetadataRoute.Sitemap = servicios.map((servicio) => ({
    url: `${BASE_URL}/servicios/${servicio.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const paginasZona: MetadataRoute.Sitemap = zonas.map((zona) => ({
    url: `${BASE_URL}/zonas/${zona.slug}`,
    changeFrequency: "monthly",
    priority: zona.destacada ? 0.8 : 0.6,
  }));

  return [...estaticas, ...paginasServicio, ...paginasZona].map((entrada) => ({
    ...entrada,
    lastModified: ahora,
  }));
}
