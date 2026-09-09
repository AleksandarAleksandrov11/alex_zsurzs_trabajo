import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import type { PasoProceso } from "@/content/servicios";

type Props = {
  pasos: PasoProceso[];
  numero?: string;
  titulo?: string;
};

export function ProcesoSteps({
  pasos,
  numero = "03",
  titulo = "Cómo trabajo",
}: Props) {
  return (
    <section className="py-section" aria-labelledby="titulo-proceso">
      <div className="container-brand">
        <SectionHeading
          numero={numero}
          eyebrow="Proceso"
          titulo={<span id="titulo-proceso">{titulo}</span>}
          descripcion="Cuatro pasos, siempre los mismos. Sabes en todo momento en cuál estás y qué pasa después."
        />

        <RevealGroup
          as="ol"
          className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {pasos.map((paso) => (
            <RevealItem
              as="li"
              key={paso.paso}
              className="relative flex flex-col gap-4 bg-bg p-7"
            >
              <span
                className="rayas-z absolute right-0 top-0 h-1 w-16 opacity-60"
                aria-hidden="true"
              />
              <span className="font-display text-4xl text-brand-blue">{paso.paso}</span>
              <h3 className="text-xl">{paso.titulo}</h3>
              <p className="text-sm text-fg-muted">{paso.detalle}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
