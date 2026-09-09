import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  hrefTelefono,
  hrefWhatsApp,
  mensajeWhatsApp,
  site,
  telefonoVisible,
} from "@/content/site";

type Props = {
  titulo?: string;
  descripcion?: string;
};

export function CTASection({
  titulo = "Cuéntame qué necesitas",
  descripcion = `Respondo en ${site.respuesta} con una primera valoración. Sin coste y sin compromiso. Si el trabajo no me corresponde, también te lo diré.`,
}: Props) {
  const telefono = telefonoVisible();

  return (
    <section className="pb-section" aria-labelledby="titulo-cta">
      <div className="container-brand">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2px] border border-brand-blue/40 bg-brand-blue-deep/35 px-6 py-14 sm:px-12 md:py-20">
            <div className="grid-plano absolute inset-0 opacity-50" aria-hidden="true" />
            <div
              className="rayas-z absolute -right-10 -top-10 h-56 w-96 opacity-25"
              style={{ maskImage: "linear-gradient(to left, black, transparent)" }}
              aria-hidden="true"
            />

            <div className="relative max-w-2xl">
              <p className="text-eyebrow mb-5 text-brand-orange">Siguiente paso</p>
              <h2 id="titulo-cta" className="text-5xl">
                {titulo}
              </h2>
              <p className="mt-6 text-lg text-fg-muted">{descripcion}</p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink href="/contacto" tamano="lg">
                  Solicitar presupuesto
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href={hrefWhatsApp(mensajeWhatsApp)}
                  variante="secundario"
                  tamano="lg"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </ButtonLink>
                {telefono ? (
                  <ButtonLink href={hrefTelefono()} variante="secundario" tamano="lg">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {telefono}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
