import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { QuoteWizard } from "@/components/forms/QuoteWizard";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaMigas } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import {
  hrefEmail,
  hrefTelefono,
  hrefWhatsApp,
  mensajeWhatsApp,
  site,
  telefonoVisible,
} from "@/content/site";
import { barraConfianza } from "@/content/site";

const migas = [{ label: "Contacto", href: "/contacto" }];

export const metadata: Metadata = crearMetadata({
  title: "Solicitar presupuesto | ZSolutions · Barcelona",
  description:
    "Cuéntame qué necesitas en cinco pasos y respondo en menos de 24 horas con una primera valoración. Sin coste y sin compromiso.",
  path: "/contacto",
});

export default function ContactoPage() {
  const telefono = telefonoVisible();

  return (
    <>
      <JsonLd datos={schemaMigas(migas)} />

      <header className="pt-36 pb-12 md:pt-44">
        <div className="container-brand">
          <Breadcrumbs migas={migas} />
          <p className="text-eyebrow mt-8 mb-5 text-brand-orange">Presupuesto</p>
          <h1 className="max-w-4xl text-6xl">Cuéntame qué necesitas</h1>
          <p className="mt-7 max-w-2xl text-lg text-fg-muted">
            Cinco pasos cortos. Cuanto mejor entienda el trabajo, más útil será la
            primera valoración, y menos vueltas daremos después. Respondo en{" "}
            {site.respuesta}.
          </p>
        </div>
      </header>

      <section className="pb-section" aria-label="Formulario de presupuesto">
        <div className="container-brand">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-12">
            <QuoteWizard />

            {/* Alternativas siempre visibles */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-[2px] border border-white/10 bg-surface/40 p-6">
                <h2 className="text-eyebrow mb-5 text-fg-muted/50">
                  ¿Prefieres el camino corto?
                </h2>

                <ul className="flex flex-col gap-3">
                  <li>
                    <a
                      href={hrefWhatsApp(mensajeWhatsApp)}
                      {...(site.nap.whatsapp
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex min-h-14 items-center gap-3 rounded-[2px] border border-white/12 px-4 text-sm transition-colors hover:border-brand-blue"
                    >
                      <MessageCircle
                        className="h-4 w-4 shrink-0 text-brand-blue"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block font-bold">WhatsApp</span>
                        <span className="block text-xs text-fg-muted">
                          {site.nap.whatsapp
                            ? "Escríbeme directamente"
                            : "Pendiente de número"}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    {telefono ? (
                      <a
                        href={hrefTelefono()}
                        className="flex min-h-14 items-center gap-3 rounded-[2px] border border-white/12 px-4 text-sm transition-colors hover:border-brand-blue"
                      >
                        <Phone
                          className="h-4 w-4 shrink-0 text-brand-blue"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="block font-bold">{telefono}</span>
                          <span className="block text-xs text-fg-muted">
                            Llamada directa
                          </span>
                        </span>
                      </a>
                    ) : (
                      <div className="flex min-h-14 items-center gap-3 rounded-[2px] border border-dashed border-white/12 px-4 text-sm">
                        <Phone
                          className="h-4 w-4 shrink-0 text-fg-muted/50"
                          aria-hidden="true"
                        />
                        <Badge tono="pendiente">TODO · teléfono</Badge>
                      </div>
                    )}
                  </li>

                  <li>
                    {site.nap.email ? (
                      <a
                        href={hrefEmail()}
                        className="flex min-h-14 items-center gap-3 rounded-[2px] border border-white/12 px-4 text-sm transition-colors hover:border-brand-blue"
                      >
                        <Mail
                          className="h-4 w-4 shrink-0 text-brand-blue"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="block font-bold">{site.nap.email}</span>
                          <span className="block text-xs text-fg-muted">
                            Correo electrónico
                          </span>
                        </span>
                      </a>
                    ) : (
                      <div className="flex min-h-14 items-center gap-3 rounded-[2px] border border-dashed border-white/12 px-4 text-sm">
                        <Mail
                          className="h-4 w-4 shrink-0 text-fg-muted/50"
                          aria-hidden="true"
                        />
                        <Badge tono="pendiente">TODO · email</Badge>
                      </div>
                    )}
                  </li>
                </ul>
              </div>

              <div className="rounded-[2px] border border-white/10 bg-surface/40 p-6">
                <h2 className="text-eyebrow mb-5 text-fg-muted/50">Con quién hablas</h2>
                <ul className="flex flex-col gap-2.5">
                  {barraConfianza.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-fg-muted">
                      <span className="h-1.5 w-1.5 shrink-0 bg-brand-blue" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-fg-muted/60">
                  Quien recibe esta solicitud es {site.fundador}, no una centralita.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
