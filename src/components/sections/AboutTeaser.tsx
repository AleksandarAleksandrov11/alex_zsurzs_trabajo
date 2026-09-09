import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Foto } from "@/components/ui/Foto";
import { bioAlex } from "@/content/trayectoria";
import { certificaciones } from "@/content/certificaciones";
import { servicios } from "@/content/servicios";
import { site } from "@/content/site";

const ANIO_INICIO = 2012;

export function AboutTeaser({ numero = "06" }: { numero?: string }) {
  const anios = new Date().getFullYear() - ANIO_INICIO;

  return (
    <section className="py-section" aria-labelledby="titulo-alex">
      <div className="container-brand">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div className="relative max-w-md">
              <Foto
                nombre="alex-retrato-obra"
                alt="Alex Zsurzs, con la sudadera de trabajo de ZSURZS Instalaciones, en una obra en Barcelona"
                ratio="4 / 5"
                sizes="(max-width: 1024px) 62vw, 380px"
                className="rounded-[2px] border border-white/10"
                objectPosition="50% 22%"
              />
              <span
                className="rayas-z absolute -bottom-4 -right-4 hidden h-16 w-40 opacity-70 sm:block"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              numero={numero}
              eyebrow="Quién está detrás"
              titulo={<span id="titulo-alex">{site.fundador}</span>}
            />

            <p className="mt-6 text-lg text-fg-muted">{bioAlex}</p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[2px] border border-white/10 bg-white/10 sm:grid-cols-3">
              <div className="bg-bg p-5">
                <dt className="text-eyebrow text-fg-muted/50">En obra desde</dt>
                <dd className="mt-2 font-display text-3xl text-fg">{ANIO_INICIO}</dd>
              </div>
              <div className="bg-bg p-5">
                <dt className="text-eyebrow text-fg-muted/50">Años de oficio</dt>
                <dd className="mt-2 font-display text-3xl text-fg">
                  <AnimatedCounter valor={anios} />
                </dd>
              </div>
              <div className="bg-bg p-5">
                <dt className="text-eyebrow text-fg-muted/50">Acreditaciones</dt>
                <dd className="mt-2 font-display text-3xl text-fg">
                  <AnimatedCounter valor={certificaciones.length} />
                </dd>
              </div>
              <div className="col-span-2 bg-bg p-5 sm:col-span-3">
                <dt className="text-eyebrow text-fg-muted/50">Especialidades</dt>
                <dd className="mt-2 text-sm text-fg-muted">
                  {servicios.map((servicio) => servicio.nombre).join(" · ")}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/sobre-alex" variante="secundario">
                Ver la trayectoria completa
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/formacion" variante="fantasma">
                Formación para instaladores
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
