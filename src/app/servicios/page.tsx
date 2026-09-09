import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { CTASection } from "@/components/sections/CTASection";
import { WhyUs } from "@/components/sections/WhyUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaMigas } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import { servicios } from "@/content/servicios";
import { numeroSeccion } from "@/lib/utils";

const migas = [{ label: "Servicios", href: "/servicios" }];

export const metadata: Metadata = crearMetadata({
  title: "Servicios de instalación en Barcelona | ZSolutions",
  description:
    "Electricidad, fontanería, climatización, aerotermia, trabajos verticales y lampistería en Barcelona y Cataluña, con las habilitaciones en regla.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <JsonLd datos={schemaMigas(migas)} />

      <header className="pt-36 pb-12 md:pt-44">
        <div className="container-brand">
          <Breadcrumbs migas={migas} />
          <p className="text-eyebrow mt-8 mb-5 text-brand-orange">Servicios</p>
          <h1 className="max-w-4xl text-6xl">Seis oficios, un solo responsable</h1>
          <p className="mt-7 max-w-2xl text-lg text-fg-muted">
            Cada servicio con su habilitación oficial en regla. Cuando un trabajo toca
            dos disciplinas, y en instalaciones pasa constantemente, no hay que coordinar
            a dos empresas ni esperar a que se pongan de acuerdo sobre de quién es el
            problema.
          </p>
        </div>
      </header>

      <section className="pb-section" aria-label="Listado de servicios">
        <div className="container-brand">
          <RevealGroup as="ul" className="flex flex-col border-t border-white/10">
            {servicios.map((servicio, i) => (
              <RevealItem as="li" key={servicio.slug} className="border-b border-white/10">
                <Link
                  href={`/servicios/${servicio.slug}`}
                  className="barrido-z group grid gap-6 py-9 transition-colors hover:bg-surface/40 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.15fr)_2rem] md:items-center md:gap-10 md:px-4"
                >
                  <span className="num-seccion">{numeroSeccion(i)}</span>

                  <span className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] border border-white/12 text-brand-blue transition-colors group-hover:border-brand-blue/60 group-hover:text-fg">
                      <ServiceIcon nombre={servicio.icono} />
                    </span>
                    <span className="font-display text-3xl">{servicio.nombre}</span>
                  </span>

                  <span className="text-fg-muted">{servicio.claim}</span>

                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-fg-muted/50 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-orange"
                    aria-hidden="true"
                  />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <WhyUs numero="02" />
      <CTASection />
    </>
  );
}
