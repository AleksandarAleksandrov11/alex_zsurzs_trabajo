import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { ProcesoSteps } from "@/components/sections/ProcesoSteps";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { TarjetaProyecto } from "@/components/sections/ProjectsSection";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Foto } from "@/components/ui/Foto";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaFaq, schemaMigas, schemaServicio } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import { getServicio, servicios } from "@/content/servicios";
import { getCertificaciones } from "@/content/certificaciones";
import { proyectosPorServicio } from "@/content/proyectos";
import { zonasDestacadas } from "@/content/zonas";
import { hrefWhatsApp, site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

/* Los slugs de servicio son un conjunto cerrado y conocido: cualquier otro
   debe dar 404 directamente, sin pasar por una función en servidor. Además de
   ser lo correcto, evita que direcciones inventadas generen páginas vacías. */
export const dynamicParams = false;

export function generateStaticParams() {
  return servicios.map((servicio) => ({ slug: servicio.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) return {};

  return crearMetadata({
    title: servicio.titleSeo,
    description: servicio.descriptionSeo,
    path: `/servicios/${servicio.slug}`,
  });
}

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) notFound();

  const migas = [
    { label: "Servicios", href: "/servicios" },
    { label: servicio.nombre, href: `/servicios/${servicio.slug}` },
  ];

  const acreditaciones = getCertificaciones(servicio.certificaciones);
  const relacionados = servicio.relacionados
    .map((s) => getServicio(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const trabajos = proyectosPorServicio(servicio.slug).slice(0, 3);
  const zonas = zonasDestacadas.slice(0, 4);

  return (
    <>
      <JsonLd
        datos={[
          schemaServicio(servicio),
          schemaFaq(servicio.faq),
          schemaMigas(migas),
        ]}
      />

      {/* Hero del servicio */}
      <header className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="grid-plano absolute inset-0 opacity-70" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 80% 0%, rgba(35,54,111,.72) 0%, transparent 62%)",
            }}
          />
        </div>

        <div className="container-brand">
          <Breadcrumbs migas={migas} />

          <div className="mt-8 flex items-center gap-4">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-[2px] border border-brand-blue/50 bg-brand-blue/10 text-brand-blue">
              <ServiceIcon nombre={servicio.icono} className="h-7 w-7" />
            </span>
            <p className="text-eyebrow text-brand-orange">{servicio.nombre}</p>
          </div>

          <h1 className="mt-7 max-w-4xl text-6xl">{servicio.h1}</h1>
          <p className="mt-6 max-w-2xl text-xl text-fg-muted">{servicio.claim}</p>
          <p className="mt-6 max-w-3xl text-lg text-fg-muted">{servicio.entradilla}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contacto" tamano="lg">
              Solicitar presupuesto
            </ButtonLink>
            <ButtonLink
              href={hrefWhatsApp(
                `Hola Alex, me interesa el servicio de ${servicio.nombre.toLowerCase()}.`,
              )}
              variante="secundario"
              tamano="lg"
            >
              WhatsApp
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            {acreditaciones.slice(0, 5).map((acreditacion) => (
              <li
                key={acreditacion.id}
                className="text-eyebrow flex items-center gap-2.5 text-fg-muted/75"
              >
                <span className="h-1.5 w-1.5 bg-brand-blue" aria-hidden="true" />
                {acreditacion.siglas}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Cuerpo editorial */}
      <section className="pb-section" aria-labelledby="titulo-detalle">
        <div className="container-brand">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] lg:gap-16">
            <Reveal>
              <h2 id="titulo-detalle" className="sr-only">
                En qué consiste el servicio de {servicio.nombre.toLowerCase()}
              </h2>
              <div className="prosa max-w-2xl text-lg">
                {servicio.cuerpo.map((parrafo) => (
                  <p key={parrafo.slice(0, 40)}>{parrafo}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:pt-2">
              {servicio.foto ? (
                <Foto
                  nombre={servicio.foto.nombre}
                  alt={servicio.foto.alt}
                  ratio="4 / 5"
                  sizes="(max-width: 1024px) 62vw, 420px"
                  objectPosition={servicio.foto.posicion}
                  className="rounded-[2px] border border-white/10"
                />
              ) : (
                <MediaPlaceholder
                  descripcion={`Foto real de un trabajo de ${servicio.nombre.toLowerCase()} ejecutado por Alex.`}
                  medidas="1200 × 1500 px · 4:5"
                  ratio="4 / 5"
                />
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-section" aria-labelledby="titulo-incluye">
        <div className="container-brand">
          <SectionHeading
            numero="01"
            eyebrow="Qué incluye"
            titulo={<span id="titulo-incluye">Trabajos concretos, no promesas</span>}
          />

          <RevealGroup
            as="ul"
            className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-white/10 bg-white/10 md:grid-cols-2"
            stagger={0.05}
          >
            {servicio.incluye.map((item) => (
              <RevealItem as="li" key={item.titulo} className="bg-bg p-6 sm:p-7">
                <h3 className="flex items-start gap-3 text-lg font-bold font-sans">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-brand-blue"
                    aria-hidden="true"
                  />
                  {item.titulo}
                </h3>
                <p className="mt-2 pl-7 text-sm text-fg-muted">{item.detalle}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Para quién */}
      <section className="py-section" aria-labelledby="titulo-paraquien">
        <div className="container-brand">
          <SectionHeading
            numero="02"
            eyebrow="Para quién"
            titulo={<span id="titulo-paraquien">Dónde encaja este servicio</span>}
          />

          <RevealGroup
            as="ul"
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.07}
          >
            {servicio.paraQuien.map((item) => (
              <RevealItem
                as="li"
                key={item.titulo}
                className="barrido-z rounded-[2px] border border-white/10 bg-surface/50 p-6 transition-colors hover:border-brand-blue/60"
              >
                <h3 className="text-xl">{item.titulo}</h3>
                <p className="mt-3 text-sm text-fg-muted">{item.detalle}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ProcesoSteps pasos={servicio.proceso} numero="03" />

      {/* Certificaciones aplicables */}
      <section className="py-section" aria-labelledby="titulo-acreditaciones">
        <div className="container-brand">
          <SectionHeading
            numero="04"
            eyebrow="Acreditaciones aplicables"
            titulo={
              <span id="titulo-acreditaciones">
                Lo que habilita para firmar este trabajo
              </span>
            }
          />

          <RevealGroup
            as="ul"
            className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {acreditaciones.map((acreditacion) => (
              <RevealItem
                as="li"
                key={acreditacion.id}
                className="rounded-[2px] border border-white/10 bg-surface/40 p-6"
              >
                <span className="font-display text-xs tracking-wider text-brand-blue">
                  {acreditacion.siglas}
                </span>
                <h3 className="mt-2 text-lg font-bold font-sans">
                  {acreditacion.nombre}
                </h3>
                <p className="mt-2 text-sm text-fg-muted">{acreditacion.detalle}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Trabajos de este servicio */}
      <section className="py-section" aria-labelledby="titulo-trabajos">
        <div className="container-brand">
          <SectionHeading
            numero="05"
            eyebrow="Trabajos reales"
            titulo={
              <span id="titulo-trabajos">
                {servicio.nombre} ejecutada en obra
              </span>
            }
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
                  Aquí van los trabajos de {servicio.nombre.toLowerCase()} con su reto y
                  su solución. No se publican proyectos inventados: en cuanto haya fotos
                  y datos reales, aparecen automáticamente en esta sección y en la
                  galería.
                </p>
                <ButtonLink href="/proyectos" variante="secundario" className="mt-6">
                  Ver la galería
                </ButtonLink>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <FAQ
        preguntas={servicio.faq}
        numero="06"
        titulo={`Preguntas sobre ${servicio.nombre.toLowerCase()}`}
        eyebrow="Dudas habituales"
      />

      {/* Enlazado interno */}
      <section className="py-section" aria-labelledby="titulo-enlaces">
        <div className="container-brand">
          <h2 id="titulo-enlaces" className="sr-only">
            Servicios relacionados y zonas de actuación
          </h2>

          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="text-eyebrow mb-6 flex items-center gap-3 text-fg-muted/50">
                Servicios relacionados
                <span className="cota flex-1" aria-hidden="true" />
              </h3>
              <ul className="flex flex-col border-t border-white/10">
                {relacionados.map((otro) => (
                  <li key={otro.slug} className="border-b border-white/10">
                    <Link
                      href={`/servicios/${otro.slug}`}
                      className="group flex items-center justify-between gap-4 py-5"
                    >
                      <span>
                        <span className="block font-display text-xl">{otro.nombre}</span>
                        <span className="mt-1 block text-sm text-fg-muted">
                          {otro.claim}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-fg-muted/50 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-orange"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-eyebrow mb-6 flex items-center gap-3 text-fg-muted/50">
                {servicio.nombre} por zona
                <span className="cota flex-1" aria-hidden="true" />
              </h3>
              <ul className="flex flex-col border-t border-white/10">
                {zonas.map((zona) => (
                  <li key={zona.slug} className="border-b border-white/10">
                    <Link
                      href={`/zonas/${zona.slug}`}
                      className="group flex items-center justify-between gap-4 py-5"
                    >
                      <span>
                        <span className="block font-display text-xl">
                          {servicio.nombreCorto} en {zona.ciudad}
                        </span>
                        <span className="mt-1 block text-sm text-fg-muted">
                          {zona.comarca}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-fg-muted/50 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-orange"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/zonas"
                    className="inline-flex min-h-11 items-center py-5 text-sm text-fg-muted hover:text-brand-orange"
                  >
                    Ver todas las zonas de actuación
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        titulo={`¿Necesitas ${servicio.nombre.toLowerCase()}?`}
        descripcion={`Cuéntame el trabajo y respondo en ${site.respuesta} con una primera valoración. Sin coste y sin compromiso.`}
      />
    </>
  );
}
