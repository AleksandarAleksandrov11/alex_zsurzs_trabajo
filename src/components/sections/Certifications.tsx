import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import {
  certificacionesPorGrupo,
  gruposCertificacion,
} from "@/content/certificaciones";

type Props = {
  numero?: string;
  /** En la home se muestra compacto; en Sobre Alex, con el detalle completo. */
  detallado?: boolean;
  titulo?: string;
  descripcion?: string;
};

export function Certifications({
  numero = "04",
  detallado = false,
  titulo = "Certificaciones y formación",
  descripcion = "Más de diez años formándome en el sector. Las habilitaciones oficiales no son un adorno del presupuesto: son lo que permite ejecutar, firmar y legalizar una instalación.",
}: Props) {
  return (
    <section
      className="relative py-section"
      aria-labelledby="titulo-certificaciones"
      id="certificaciones"
    >
      <div className="container-brand">
        <SectionHeading
          numero={numero}
          eyebrow="Acreditaciones"
          titulo={<span id="titulo-certificaciones">{titulo}</span>}
          descripcion={descripcion}
        />

        <div className="mt-14 flex flex-col gap-10">
          {gruposCertificacion.map((grupo) => {
            const lista = certificacionesPorGrupo(grupo.id);
            return (
              <div key={grupo.id}>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <h3 className="text-eyebrow text-brand-orange">{grupo.titulo}</h3>
                  {detallado ? (
                    <p className="max-w-xl text-sm text-fg-muted/70 sm:text-right">
                      {grupo.descripcion}
                    </p>
                  ) : null}
                </div>

                <RevealGroup
                  as="ul"
                  stagger={0.05}
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {lista.map((certificacion) => (
                    <RevealItem
                      as="li"
                      key={certificacion.id}
                      className="flex flex-col gap-2 rounded-[2px] border border-white/10 bg-surface/40 p-5 transition-colors hover:border-brand-blue/50"
                    >
                      <span className="font-display text-xs tracking-wider text-brand-blue">
                        {certificacion.siglas}
                      </span>
                      <span className="text-sm font-bold text-fg">
                        {certificacion.nombre}
                      </span>
                      {detallado ? (
                        <span className="mt-1 text-xs leading-relaxed text-fg-muted/80">
                          {certificacion.detalle}
                        </span>
                      ) : null}
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
