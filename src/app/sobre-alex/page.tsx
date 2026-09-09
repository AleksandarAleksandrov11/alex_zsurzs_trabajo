import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Foto } from "@/components/ui/Foto";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/sections/Timeline";
import { Certifications } from "@/components/sections/Certifications";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaMigas, schemaPersona } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import { bioAlex } from "@/content/trayectoria";
import { site } from "@/content/site";

const migas = [{ label: "Sobre Alex", href: "/sobre-alex" }];

export const metadata: Metadata = crearMetadata({
  title: "Alex Zsurzs · Instalador certificado en Barcelona",
  description:
    "De peón de obra en 2012 a instalador certificado con REBT, RITE, F-Gas e IRATA Nivel 3. Trayectoria, certificaciones y forma de trabajar.",
  path: "/sobre-alex",
});

export default function SobreAlexPage() {
  return (
    <>
      <JsonLd datos={[schemaPersona(), schemaMigas(migas)]} />

      <header className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="grid-plano absolute inset-0 opacity-70" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 85% 5%, rgba(35,54,111,.6) 0%, transparent 62%)",
            }}
          />
        </div>

        <div className="container-brand">
          <Breadcrumbs migas={migas} />

          <div className="mt-8 grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-16">
            <div>
              <p className="text-eyebrow mb-5 text-brand-orange">Quién está detrás</p>
              <h1 className="text-7xl">{site.fundador}</h1>
              <p className="mt-7 max-w-2xl text-xl text-fg-muted">{bioAlex}</p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contacto" tamano="lg">
                  Solicitar presupuesto
                </ButtonLink>
                <ButtonLink href="/formacion" variante="secundario" tamano="lg">
                  Formación para instaladores
                </ButtonLink>
              </div>
            </div>

            <Reveal>
              <Foto
                nombre="alex-cubierta-barcelona"
                alt="Alex Zsurzs sentado en el pretil de una cubierta de Barcelona con el arnés y el casco de trabajos verticales, al atardecer"
                ratio="4 / 5"
                sizes="(max-width: 1024px) 62vw, 440px"
                objectPosition="50% 30%"
                className="rounded-[2px] border border-white/10"
              />
            </Reveal>
          </div>
        </div>
      </header>

      {/* Cómo trabaja */}
      <section className="py-section" aria-labelledby="titulo-metodo">
        <div className="container-brand">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                numero="01"
                eyebrow="Forma de trabajar"
                titulo={<span id="titulo-metodo">Aprendí el oficio desde abajo</span>}
              />

              <div className="prosa mt-8 max-w-2xl text-lg">
                <p>
                  Empecé en 2012 como peón de obra. No es una frase de currículum: es la
                  razón por la que sé lo que pasa cuando un plano se convierte en una
                  pared real, cuando el hueco previsto no existe y cuando alguien decide
                  resolverlo rápido en lugar de resolverlo bien. He estado en las dos
                  posiciones y he aprendido a distinguirlas.
                </p>
                <p>
                  Durante años vi la misma escena repetida: instalaciones ejecutadas por
                  gente sin habilitación, cuadros sin etiquetar, cargas de refrigerante
                  hechas sin carnet y trabajos en altura sin plan de rescate. Nada de eso
                  se nota el día de la entrega. Se nota tres años después, cuando el
                  cliente paga por segunda vez el mismo trabajo, o el día que alguien se
                  hace daño.
                </p>
                <p>
                  Por eso me saqué las habilitaciones y por eso las mantengo al día:
                  electricista especialista en baja tensión, instalador RITE, gases
                  fluorados, asesor energético, y en trabajo en altura IRATA e ITRA Nivel
                  3 con especialización en espacios confinados. No son adornos del
                  presupuesto: son lo que permite ejecutar, firmar y legalizar.
                </p>
                <p>
                  Mi forma de trabajar cabe en tres reglas.{" "}
                  <strong>Se mide antes de decidir</strong>, porque cambiar piezas hasta
                  acertar es caro y poco serio.{" "}
                  <strong>Se explica antes de ejecutar</strong>, y si algo se desvía de lo
                  previsto te lo cuento antes de hacerlo, no en la factura.{" "}
                  <strong>Se documenta al terminar</strong>, porque una instalación sin
                  documentar es un problema para el siguiente que entre, y ese siguiente
                  puedes ser tú dentro de cinco años.
                </p>
                <p>
                  Y hay una cuarta que no es técnica: si un trabajo no me corresponde, lo
                  digo. Prefiero perder un encargo a hacerlo regular o a cobrar un
                  desplazamiento que no te aporta nada.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-6">
              <figure>
                <Foto
                  nombre="alex-premio-sector-oficios"
                  alt="Alex Zsurzs sosteniendo el galardón de los Premios Sector Oficios en la categoría de instalaciones"
                  ratio="3 / 4"
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="rounded-[2px] border border-white/10"
                />
                <figcaption className="mt-3 text-sm text-fg-muted/70">
                  Galardón de los Premios Sector Oficios, categoría de instalaciones.
                  {/* TODO (Alex): confirma la denominación y el año exactos del premio
                      antes de publicar, para poder citarlo con precisión. */}
                </figcaption>
              </figure>

              <Foto
                nombre="alex-retrato-taller"
                alt="Alex Zsurzs en un momento de descanso durante una jornada de trabajo"
                ratio="4 / 5"
                sizes="(max-width: 1024px) 90vw, 420px"
                objectPosition="50% 25%"
                className="rounded-[2px] border border-white/10"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Timeline numero="02" />

      <Certifications
        numero="03"
        detallado
        titulo="Certificaciones y formación profesional"
        descripcion="Más de diez años formándome en el sector para ofrecer soluciones reales y seguras en obra. Cada acreditación con lo que realmente habilita a hacer."
      />

      <CTASection
        titulo="¿Hablamos de tu instalación?"
        descripcion={`Cuéntame qué necesitas y respondo en ${site.respuesta} con una primera valoración. Sin coste y sin compromiso.`}
      />
    </>
  );
}
