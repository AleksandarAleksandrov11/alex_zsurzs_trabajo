import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { ZonesMap } from "@/components/sections/ZonesMap";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaMigas } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import { zonasPorComarca } from "@/content/zonas";

const migas = [{ label: "Zonas", href: "/zonas" }];

export const metadata: Metadata = crearMetadata({
  title: "Zonas de actuación en Barcelona y Cataluña | ZSolutions",
  description:
    "Instalaciones en Barcelona, área metropolitana, Vallès, Baix Llobregat, Maresme, Garraf y resto de Cataluña. Cada zona con su página y su contexto real.",
  path: "/zonas",
});

export default function ZonasPage() {
  const porComarca = zonasPorComarca();

  return (
    <>
      <JsonLd datos={schemaMigas(migas)} />

      <header className="pt-36 pb-12 md:pt-44">
        <div className="container-brand">
          <Breadcrumbs migas={migas} />
          <p className="text-eyebrow mt-8 mb-5 text-brand-orange">Zonas de actuación</p>
          <h1 className="max-w-4xl text-6xl">Barcelona, área metropolitana y Cataluña</h1>
          <p className="mt-7 max-w-2xl text-lg text-fg-muted">
            No todas las zonas plantean el mismo trabajo. Un bloque de los sesenta en
            L&apos;Hospitalet, una finca del Eixample, una casa unifamiliar en Sant Cugat
            y una nave en El Prat tienen problemas de instalación distintos. Cada página
            explica qué se pide realmente en ese municipio.
          </p>
        </div>
      </header>

      <ZonesMap numero="01" />

      <section className="pb-section" aria-labelledby="titulo-listado-zonas">
        <div className="container-brand">
          <SectionHeading
            numero="02"
            eyebrow="Listado completo"
            titulo={<span id="titulo-listado-zonas">Zonas con página propia</span>}
            descripcion="Si tu municipio no aparece, pregúntame igualmente. Para un aviso corto muy lejos te diré con franqueza si te conviene alguien más cercano."
          />

          <div className="mt-14 flex flex-col gap-14">
            {porComarca.map((grupo) => (
              <div key={grupo.comarca}>
                <h3 className="text-eyebrow mb-6 flex items-center gap-3 text-fg-muted/50">
                  {grupo.comarca}
                  <span className="cota flex-1" aria-hidden="true" />
                  <span className="font-display text-brand-blue">
                    {String(grupo.zonas.length).padStart(2, "0")}
                  </span>
                </h3>

                <RevealGroup
                  as="ul"
                  className="grid gap-3 md:grid-cols-2"
                  stagger={0.05}
                >
                  {grupo.zonas.map((zona) => (
                    <RevealItem as="li" key={zona.slug}>
                      <Link
                        href={`/zonas/${zona.slug}`}
                        className="barrido-z group flex h-full items-start justify-between gap-6 rounded-[2px] border border-white/10 bg-surface/40 p-6 transition-colors hover:border-brand-blue/60 sm:p-7"
                      >
                        <span className="min-w-0">
                          <span className="block font-display text-2xl">
                            {zona.nombreLargo}
                          </span>
                          <span className="mt-2 block text-sm text-fg-muted">
                            {zona.claim}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="h-5 w-5 shrink-0 text-fg-muted/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-orange"
                          aria-hidden="true"
                        />
                      </Link>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
