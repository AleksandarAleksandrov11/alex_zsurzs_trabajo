import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ParFaq } from "@/content/servicios";
import { slugify } from "@/lib/utils";

type Props = {
  preguntas: ParFaq[];
  numero?: string;
  titulo?: string;
  eyebrow?: string;
};

/**
 * Acordeón con `<details>` nativo: accesible por teclado sin JavaScript y sin
 * animar `height`, que está prohibido en el sistema. Lo único que se anima es
 * opacidad y `translateY` del contenido (ver `.respuesta-faq` en globals.css).
 */
export function FAQ({
  preguntas,
  numero = "05",
  titulo = "Preguntas frecuentes",
  eyebrow = "Dudas habituales",
}: Props) {
  const idTitulo = `faq-${slugify(titulo)}`;

  return (
    <section className="py-section" aria-labelledby={idTitulo}>
      <div className="container-brand">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            numero={numero}
            eyebrow={eyebrow}
            titulo={<span id={idTitulo}>{titulo}</span>}
            className="lg:sticky lg:top-32 lg:self-start"
          />

          <div className="border-t border-white/10">
            {preguntas.map((par, i) => (
              <details
                key={par.p}
                className="faq-item group border-b border-white/10"
                open={i === 0}
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors hover:text-brand-orange">
                  <h3 className="text-lg font-bold font-sans">{par.p}</h3>
                  <Plus
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <div className="respuesta-faq">
                  <p className="pb-7 text-fg-muted lg:pr-10">{par.r}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
