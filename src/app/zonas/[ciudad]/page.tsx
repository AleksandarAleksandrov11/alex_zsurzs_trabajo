import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin, Route } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { TarjetaProyecto } from "@/components/sections/ProjectsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaFaq, schemaMigas, schemaZona } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import { getZona, zonas } from "@/content/zonas";
import { getServicio } from "@/content/servicios";
import { proyectosPorZona } from "@/content/proyectos";
import { hrefWhatsApp, site } from "@/content/site";

type Props = { params: Promise<{ ciudad: string }> };

/* Los slugs de zona son un conjunto cerrado y conocido: cualquier otro
   debe dar 404 directamente, sin pasar por una función en servidor. Además de
   ser lo correcto, evita que direcciones inventadas generen páginas vacías. */
export const dynamicParams = false;

export function generateStaticParams() {
  return zonas.map((zona) => ({ ciudad: zona.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad } = await params;
  const zona = getZona(ciudad);
  if (!zona) return {};

  return crearMetadata({
    title: zona.titleSeo,
    description: zona.descriptionSeo,
    path: `/zonas/${zona.slug}`,
  });
}

export default async function ZonaPage({ params }: Props) {
  const { ciudad } = await params;
  const zona = getZona(ciudad);
  if (!zona) notFound();

  const migas = [
    { label: "Zonas", href: "/zonas" },
    { label: zona.ciudad, href: `/zonas/${zona.slug}` },
  ];

  const trabajos = proyectosPorZona(zona.slug).slice(0, 3);
  const otrasZonas = zonas
    .filter((z) => z.slug !== zona.slug && z.comarca === zona.comarca)
    .slice(0, 5);

  return (
    <>
      <JsonLd datos={[schemaZona(zona), schemaFaq(zona.faq), schemaMigas(migas)]} />

      <header className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="grid-plano absolute inset-0 opacity-70" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(65% 60% at 15% 0%, rgba(35,54,111,.65) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="container-brand">
          <Breadcrumbs migas={migas} />

          <p className="text-eyebrow mt-8 mb-5 flex items-center gap-2.5 text-brand-orange">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {zona.comarca}
          </p>

          <h1 className="max-w-4xl text-6xl">{zona.h1}</h1>
          <p className="mt-6 max-w-2xl text-xl text-fg-muted">{zona.claim}</p>
          <p className="mt-6 max-w-3xl text-lg text-fg-muted">{zona.entradilla}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contacto" tamano="lg">
              Solicitar presupuesto
            </ButtonLink>
            <ButtonLink
              href={hrefWhatsApp(
                `Hola Alex, escribo desde ${zona.ciudad} y me gustaría pedir presupuesto.`,
              )}
              variante="secundario"
              tamano="lg"
            >
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </header>

      {/* Contexto real de la zona */}
      <section className="pb-section" aria-labelledby="titulo-contexto">
        <div className="container-brand">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)] lg:gap-16">
            <Reveal>
              <h2 id="titulo-contexto" className="sr-only">
                Cómo son las instalaciones en {zona.ciudad}
              </h2>
              <div className="prosa max-w-2xl text-lg">
                {zona.cuerpo.map((parrafo) => (
                  <p key={parrafo.slice(0, 40)}>{parrafo}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-6">
              <div className="rounded-[2px] border border-white/10 bg-surface/50 p-6">
                <h3 className="text-eyebrow mb-4 flex items-center gap-2.5 text-brand-orange">
                  <Route className="h-3.5 w-3.5" aria-hidden="true" />
                  Desplazamiento
                </h3>
                <p className="text-sm text-fg-muted">{zona.desplazamiento}</p>
              </div>

              <div className="rounded-[2px] border border-white/10 bg-surface/50 p-6">
                <h3 className="text-eyebrow mb-4 text-fg-muted/50">
                  Qué cubre esta zona
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {zona.cubre.map((sitio) => (
                    <li
                      key={sitio}
                      className="rounded-[2px] border border-white/12 px-2.5 py-1.5 text-xs text-fg-muted"
                    >
                      {sitio}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Barrios (solo donde aporta) */}
      {zona.barrios ? (
        <section className="py-section" aria-labelledby="titulo-barrios">
          <div className="container-brand">
            <SectionHeading
              numero="01"
              eyebrow="Barrios y distritos"
              titulo={
                <span id="titulo-barrios">
                  Cada distrito de {zona.ciudad}, su propio problema
                </span>
              }
            />

            <RevealGroup
              as="ul"
              className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.04}
            >
              {zona.barrios.map((barrio) => (
                <RevealItem
                  as="li"
                  key={barrio.nombre}
                  className="rounded-[2px] border border-white/10 bg-surface/40 p-6"
                >
                  <h3 className="text-xl">{barrio.nombre}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{barrio.detalle}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      {/* Servicios más demandados */}
      <section className="py-section" aria-labelledby="titulo-demandados">
        <div className="container-brand">
          <SectionHeading
            numero={zona.barrios ? "02" : "01"}
            eyebrow="Lo que más se pide aquí"
            titulo={
              <span id="titulo-demandados">
                Servicios más demandados en {zona.ciudad}
              </span>
            }
          />

          <RevealGroup
            as="ul"
            className="mt-14 grid gap-6 sm:grid-cols-2"
            stagger={0.07}
          >
            {zona.serviciosDemandados.map((demandado) => {
              const servicio = getServicio(demandado.slug);
              if (!servicio) return null;
              return (
                <RevealItem as="li" key={demandado.slug}>
                  <Link
                    href={`/servicios/${servicio.slug}`}
                    className="barrido-z group flex h-full flex-col gap-4 rounded-[2px] border border-white/10 bg-surface/50 p-6 transition-colors hover:border-brand-blue/60 sm:p-7"
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] border border-white/12 text-brand-blue transition-colors group-hover:border-brand-blue/60 group-hover:text-fg">
                          <ServiceIcon nombre={servicio.icono} />
                        </span>
                        <span className="font-display text-2xl">
                          {servicio.nombre} en {zona.ciudad}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-fg-muted/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-orange"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm text-fg-muted">{demandado.motivo}</span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Trabajos en la zona */}
      <section className="py-section" aria-labelledby="titulo-trabajos-zona">
        <div className="container-brand">
          <SectionHeading
            numero={zona.barrios ? "03" : "02"}
            eyebrow="Trabajos realizados"
            titulo={<span id="titulo-trabajos-zona">Obra hecha en {zona.ciudad}</span>}
          />

          {trabajos.length > 0 ? (
            <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trabajos.map((proyecto) => (
                <RevealItem key={proyecto.slug}>
                  <TarjetaProyecto proyecto={proyecto} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <Reveal className="mt-14">
              <div className="rounded-[2px] border border-dashed border-white/15 bg-surface/40 p-8">
                <p className="text-eyebrow text-brand-orange">Pendiente de contenido</p>
                <p className="mt-3 max-w-2xl text-fg-muted">
                  Aquí van los trabajos realizados en {zona.ciudad}. No se publican
                  proyectos inventados ni se recicla obra de otra zona para rellenar: en
                  cuanto haya material real de este municipio, aparece aquí y en la
                  galería.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <FAQ
        preguntas={zona.faq}
        numero={zona.barrios ? "04" : "03"}
        titulo={`Preguntas frecuentes en ${zona.ciudad}`}
        eyebrow="Dudas de la zona"
      />

      {/* Zonas vecinas */}
      {otrasZonas.length > 0 ? (
        <section className="pb-section" aria-labelledby="titulo-vecinas">
          <div className="container-brand">
            <h2
              id="titulo-vecinas"
              className="text-eyebrow mb-6 flex items-center gap-3 text-fg-muted/50"
            >
              También trabajo en {zona.comarca}
              <span className="cota flex-1" aria-hidden="true" />
            </h2>
            <ul className="flex flex-wrap gap-2">
              {otrasZonas.map((otra) => (
                <li key={otra.slug}>
                  <Link
                    href={`/zonas/${otra.slug}`}
                    className="inline-flex min-h-11 items-center rounded-[2px] border border-white/12 px-3.5 text-sm text-fg-muted transition-colors hover:border-brand-blue hover:text-fg"
                  >
                    {otra.ciudad}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/zonas"
                  className="inline-flex min-h-11 items-center px-3.5 text-sm text-fg hover:text-brand-orange"
                >
                  Ver todas las zonas
                </Link>
              </li>
            </ul>
          </div>
        </section>
      ) : null}

      <CTASection
        titulo={`Instalaciones en ${zona.ciudad}`}
        descripcion={`Cuéntame qué necesitas y respondo en ${site.respuesta} con una primera valoración. Sin coste y sin compromiso.`}
      />
    </>
  );
}
