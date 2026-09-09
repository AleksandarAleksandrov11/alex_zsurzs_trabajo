import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { trayectoria } from "@/content/trayectoria";

export function Timeline({ numero = "02" }: { numero?: string }) {
  return (
    <section className="py-section" aria-labelledby="titulo-trayectoria">
      <div className="container-brand">
        <SectionHeading
          numero={numero}
          eyebrow="Trayectoria"
          titulo={<span id="titulo-trayectoria">De peón de obra a instalador certificado</span>}
        />

        <RevealGroup as="ol" className="mt-14" stagger={0.09}>
          {trayectoria.map((hito, i) => (
            <RevealItem
              as="li"
              key={hito.anio}
              className="relative grid gap-4 border-t border-white/10 py-8 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-10 sm:py-10"
            >
              <div className="flex items-baseline gap-3 sm:flex-col sm:gap-2">
                <span className="font-display text-3xl text-brand-blue">{hito.anio}</span>
                <span className="num-seccion">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="text-2xl">{hito.titulo}</h3>
                <p className="mt-3 max-w-2xl text-fg-muted">{hito.detalle}</p>
              </div>
              <span
                className="absolute inset-x-0 top-0 h-px origin-left bg-brand-blue/60"
                style={{ width: `${((i + 1) / trayectoria.length) * 100}%` }}
                aria-hidden="true"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
