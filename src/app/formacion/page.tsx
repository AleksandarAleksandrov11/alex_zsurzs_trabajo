import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Foto } from "@/components/ui/Foto";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaMigas } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import { formacion } from "@/content/formacion";
import { site } from "@/content/site";
import { numeroSeccion } from "@/lib/utils";

const migas = [{ label: "Formación", href: "/formacion" }];

export const metadata: Metadata = crearMetadata({
  title: "Formación para instaladores | Alex Zsurzs · ZSolutions",
  description:
    "Formación práctica para instaladores que quieren elevar su nivel: criterio técnico, documentación, trato con cliente y herramientas nacidas en obra.",
  path: "/formacion",
});

export default function FormacionPage() {
  return (
    <>
      <JsonLd datos={schemaMigas(migas)} />

      <header className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="grid-plano absolute inset-0 opacity-70" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 20% 0%, rgba(35,54,111,.6) 0%, transparent 62%)",
            }}
          />
        </div>

        <div className="container-brand">
          <Breadcrumbs migas={migas} />
          <p className="text-eyebrow mt-8 mb-5 text-brand-orange">
            Para profesionales del sector
          </p>
          <h1 className="max-w-4xl text-6xl">{formacion.h1}</h1>
          <p className="mt-6 max-w-2xl text-xl text-fg-muted">{formacion.claim}</p>
          <p className="mt-6 max-w-3xl text-lg text-fg-muted">{formacion.entradilla}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={formacion.enlaceTienda} tamano="lg">
              {formacion.ctaTienda}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/sobre-alex" variante="secundario" tamano="lg">
              Quién imparte la formación
            </ButtonLink>
          </div>
        </div>
      </header>

      <section className="pb-section" aria-labelledby="titulo-formacion">
        <div className="container-brand">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)] lg:gap-16">
            <Reveal>
              <h2 id="titulo-formacion" className="sr-only">
                Por qué esta formación
              </h2>
              <div className="prosa max-w-2xl text-lg">
                {formacion.cuerpo.map((parrafo) => (
                  <p key={parrafo.slice(0, 40)}>{parrafo}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Foto
                nombre="alex-espacio-confinado"
                alt="Dos técnicos trabajando suspendidos por cuerda dentro de un depósito, con el equipo de seguridad completo"
                ratio="3 / 4"
                sizes="(max-width: 1024px) 62vw, 420px"
                objectPosition="55% 40%"
                className="rounded-[2px] border border-white/10"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-section" aria-labelledby="titulo-bloques">
        <div className="container-brand">
          <SectionHeading
            numero="01"
            eyebrow="Qué se trabaja"
            titulo={<span id="titulo-bloques">Cuatro bloques, todos de obra</span>}
          />

          <RevealGroup
            as="ul"
            className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-white/10 bg-white/10 sm:grid-cols-2"
            stagger={0.07}
          >
            {formacion.bloques.map((bloque, i) => (
              <RevealItem as="li" key={bloque.titulo} className="bg-bg p-7 sm:p-8">
                <span className="num-seccion">{numeroSeccion(i)}</span>
                <h3 className="mt-4 text-2xl">{bloque.titulo}</h3>
                <p className="mt-3 text-fg-muted">{bloque.detalle}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12">
            <div className="rounded-[2px] border border-white/10 bg-surface/50 p-7">
              <p className="text-fg-muted">{formacion.nota}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={formacion.enlaceTienda}>
                  {formacion.ctaTienda}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={site.redes.instagram} variante="secundario">
                  Instagram
                </ButtonLink>
                <ButtonLink href={site.redes.youtube} variante="secundario">
                  YouTube
                </ButtonLink>
                <ButtonLink href={site.redes.tiktok} variante="secundario">
                  TikTok
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        titulo="¿Necesitas una instalación, no formación?"
        descripcion="La parte de servicio de ZSolutions sigue igual de disponible. Cuéntame el trabajo y respondo en menos de 24 horas."
      />
    </>
  );
}
