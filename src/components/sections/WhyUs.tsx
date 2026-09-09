import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { numeroSeccion } from "@/lib/utils";

const argumentos = [
  {
    titulo: "Instalador certificado, no intermediario",
    detalle:
      "Quien te visita, quien presupuesta y quien firma la instalación es la misma persona. Carnet REBT, RITE y F-Gas, más IRATA e ITRA Nivel 3 para trabajo en altura. Nada se vende para colocárselo después a un tercero.",
  },
  {
    titulo: "Presupuesto en menos de 24 horas",
    detalle:
      "Respondo con una primera valoración en menos de un día, y si hace falta visita, la concreto en esa misma respuesta. Sin coste y sin compromiso. Si el trabajo no me corresponde, te lo digo en lugar de hacerte perder una semana.",
  },
  {
    titulo: "Trabajo documentado y certificado",
    detalle:
      "Certificado de instalación eléctrica, esquema unifilar, documentación RITE, registro de carga de refrigerante o reportaje fotográfico en altura, según el trabajo. Documentar forma parte del precio, no es un extra.",
  },
  {
    titulo: "Te atiende Alex, directamente",
    detalle:
      "Un único interlocutor de principio a fin. Sin centralita, sin comerciales y sin que nadie te explique por teléfono algo que no ha visto. Si algo se desvía de lo previsto, te lo cuento antes de ejecutarlo.",
  },
];

export function WhyUs({ numero = "02" }: { numero?: string }) {
  return (
    <section
      className="relative overflow-hidden py-section"
      aria-labelledby="titulo-porque"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(35,54,111,.22) 45%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="container-brand">
        <SectionHeading
          numero={numero}
          eyebrow="Por qué ZSolutions"
          titulo={
            <span id="titulo-porque">
              La diferencia no está en el precio, está en quién sube
            </span>
          }
        />

        <RevealGroup
          as="ul"
          className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2"
          stagger={0.09}
        >
          {argumentos.map((argumento, i) => (
            <RevealItem as="li" key={argumento.titulo} className="relative pl-14">
              <span
                className="absolute left-0 top-0 font-display text-3xl text-brand-blue"
                aria-hidden="true"
              >
                {numeroSeccion(i)}
              </span>
              <span
                className="absolute left-3 top-12 bottom-1 w-px bg-linear-to-b from-brand-blue/50 to-transparent"
                aria-hidden="true"
              />
              <h3 className="text-2xl">{argumento.titulo}</h3>
              <p className="mt-3 text-fg-muted">{argumento.detalle}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
