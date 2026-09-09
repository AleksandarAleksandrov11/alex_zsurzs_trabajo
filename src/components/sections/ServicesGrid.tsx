import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { serviciosHome } from "@/content/servicios";
import { numeroSeccion } from "@/lib/utils";

export function ServicesGrid({ numero = "01" }: { numero?: string }) {
  return (
    <section className="py-section" aria-labelledby="titulo-servicios">
      <div className="container-brand">
        <SectionHeading
          numero={numero}
          eyebrow="Qué hago"
          titulo={<span id="titulo-servicios">Seis oficios, un solo responsable</span>}
          descripcion="Cada uno con su habilitación en regla. Cuando un trabajo toca dos disciplinas, no hay que coordinar a dos empresas ni esperar a que se pongan de acuerdo."
        />

        <RevealGroup
          as="ul"
          className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {serviciosHome.map((servicio, i) => (
            <RevealItem as="li" key={servicio.slug} className="bg-bg">
              <Link
                href={`/servicios/${servicio.slug}`}
                className="barrido-z group flex h-full flex-col justify-between gap-8 p-7 transition-colors duration-300 hover:bg-surface/60 sm:p-8"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-[2px] border border-white/12 bg-white/[0.03] text-brand-blue transition-colors duration-300 group-hover:border-brand-blue/60 group-hover:text-fg">
                      <ServiceIcon nombre={servicio.icono} className="h-6 w-6" />
                    </span>
                    <span className="num-seccion pt-1">{numeroSeccion(i)}</span>
                  </div>

                  <h3 className="mt-7 text-2xl">{servicio.nombre}</h3>
                  <p className="mt-3 text-sm text-fg-muted">{servicio.resumenHome}</p>
                </div>

                <span className="text-eyebrow flex items-center gap-2 text-fg-muted/60 transition-colors group-hover:text-brand-orange">
                  Ver servicio
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
