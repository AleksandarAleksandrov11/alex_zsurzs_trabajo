import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { proyectos, type Proyecto } from "@/content/proyectos";
import { getServicio } from "@/content/servicios";
import { getZona } from "@/content/zonas";

export function TarjetaProyecto({ proyecto }: { proyecto: Proyecto }) {
  const servicio = getServicio(proyecto.servicio);
  const zona = getZona(proyecto.zona);
  const portada = proyecto.imagenes[0];

  return (
    <article className="barrido-z group overflow-hidden rounded-[2px] border border-white/10 bg-surface/50 transition-colors hover:border-brand-blue/60">
      {portada ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={portada.src}
          alt={portada.alt}
          width={portada.ancho}
          height={portada.alto}
          loading="lazy"
          className="aspect-4/3 w-full object-cover"
        />
      ) : null}
      <div className="p-6">
        <p className="text-eyebrow text-brand-orange">
          {servicio?.nombre}
          {zona ? ` · ${zona.ciudad}` : ""}
        </p>
        <h3 className="mt-3 text-2xl">{proyecto.titulo}</h3>
        <p className="mt-3 text-sm text-fg-muted">{proyecto.reto}</p>
      </div>
    </article>
  );
}

export function ProjectsSection({ numero = "05" }: { numero?: string }) {
  const destacados = proyectos.filter((p) => p.destacado).slice(0, 3);

  return (
    <section className="py-section" aria-labelledby="titulo-proyectos">
      <div className="container-brand">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            numero={numero}
            eyebrow="Trabajos"
            titulo={<span id="titulo-proyectos">Obra real, no catálogo</span>}
            descripcion="Cada trabajo con su reto, su solución y su ubicación. Sin fotos de banco de imágenes y sin proyectos de otros."
          />
          <ButtonLink href="/proyectos" variante="secundario" className="shrink-0">
            Ver la galería
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        {destacados.length > 0 ? (
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destacados.map((proyecto) => (
              <RevealItem key={proyecto.slug}>
                <Link href={`/proyectos#${proyecto.slug}`}>
                  <TarjetaProyecto proyecto={proyecto} />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <Reveal className="mt-14">
            <div className="grid gap-6 md:grid-cols-3">
              <MediaPlaceholder
                descripcion="Instalación eléctrica o cuadro terminado. Foto del trabajo acabado."
                medidas="1600 × 1200 px · 4:3"
                ratio="4 / 3"
              />
              <MediaPlaceholder
                descripcion="Trabajo vertical en fachada o espacio confinado, con el equipo puesto."
                medidas="1600 × 1200 px · 4:3"
                ratio="4 / 3"
              />
              <MediaPlaceholder
                descripcion="Instalación de climatización o aerotermia terminada."
                medidas="1600 × 1200 px · 4:3"
                ratio="4 / 3"
              />
            </div>
            <p className="mt-6 max-w-2xl text-sm text-fg-muted/70">
              La galería está montada y funcionando: filtros por servicio y por zona,
              retícula y visor con navegación por teclado. Falta el contenido real, que
              no se inventa. En cuanto haya fotos y datos de trabajos ejecutados, se
              publican solos.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
