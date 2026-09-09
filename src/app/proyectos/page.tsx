import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GaleriaProyectos } from "@/components/sections/GaleriaProyectos";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaMigas } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import { servicios } from "@/content/servicios";
import { zonas } from "@/content/zonas";

const migas = [{ label: "Proyectos", href: "/proyectos" }];

export const metadata: Metadata = crearMetadata({
  title: "Proyectos y trabajos realizados | ZSolutions",
  description:
    "Galería de instalaciones ejecutadas en Barcelona y Cataluña, filtrable por servicio y por zona. Cada trabajo con su reto y su solución.",
  path: "/proyectos",
});

export default function ProyectosPage() {
  /* Las etiquetas se resuelven aquí, en servidor, para no arrastrar los
     ficheros de contenido completos al bundle del cliente. */
  const etiquetasServicio = Object.fromEntries(
    servicios.map((servicio) => [servicio.slug, servicio.nombre]),
  );
  const etiquetasZona = Object.fromEntries(zonas.map((zona) => [zona.slug, zona.ciudad]));

  return (
    <>
      <JsonLd datos={schemaMigas(migas)} />

      <header className="pt-36 pb-12 md:pt-44">
        <div className="container-brand">
          <Breadcrumbs migas={migas} />
          <p className="text-eyebrow mt-8 mb-5 text-brand-orange">Proyectos</p>
          <h1 className="max-w-4xl text-6xl">Obra real, no catálogo</h1>
          <p className="mt-7 max-w-2xl text-lg text-fg-muted">
            Trabajos ejecutados, con el reto que planteaban y cómo se resolvieron.
            Filtrables por servicio y por zona.
          </p>
        </div>
      </header>

      <section className="pb-section" aria-label="Galería de proyectos">
        <div className="container-brand">
          <GaleriaProyectos
            etiquetasServicio={etiquetasServicio}
            etiquetasZona={etiquetasZona}
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
