import { Breadcrumbs, type Miga } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import {
  avisoRevisionLegal,
  datosFiscales,
  encargadosTratamiento,
  type SeccionLegal,
} from "@/content/legal";
import { site } from "@/content/site";
import { DOMINIO_ACTUAL } from "@/lib/seo";

type Props = {
  titulo: string;
  entradilla: string;
  actualizado: string;
  secciones: SeccionLegal[];
  migas: Miga[];
  /** Muestra la ficha de datos del titular bajo la primera sección. */
  conFichaTitular?: boolean;
  /** Muestra la tabla de encargados del tratamiento. */
  conEncargados?: boolean;
  children?: React.ReactNode;
};

function DatoTitular({ etiqueta, valor }: { etiqueta: string; valor: string | null }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/10 py-3 sm:flex-row sm:gap-6 sm:py-2.5">
      <dt className="text-eyebrow shrink-0 pt-1 text-fg-muted/50 sm:w-52">{etiqueta}</dt>
      <dd className="text-sm text-fg">
        {valor ?? <Badge tono="pendiente">TODO · lo aporta Alex</Badge>}
      </dd>
    </div>
  );
}

export function DocumentoLegal({
  titulo,
  entradilla,
  actualizado,
  secciones,
  migas,
  conFichaTitular = false,
  conEncargados = false,
  children,
}: Props) {
  return (
    <>
      <header className="pt-36 pb-10 md:pt-44">
        <div className="container-brand">
          <Breadcrumbs migas={migas} />
          <p className="text-eyebrow mt-8 mb-5 text-brand-orange">Información legal</p>
          <h1 className="max-w-3xl text-5xl">{titulo}</h1>
          <p className="mt-6 max-w-2xl text-lg text-fg-muted">{entradilla}</p>
          <p className="mt-6 text-sm text-fg-muted/60">
            Última actualización:{" "}
            {actualizado.startsWith("TODO") ? (
              <Badge tono="pendiente">{actualizado}</Badge>
            ) : (
              actualizado
            )}
          </p>
        </div>
      </header>

      <section className="pb-section">
        <div className="container-brand">
          <Reveal className="rounded-[2px] border border-brand-orange/35 bg-brand-orange/[0.07] p-5">
            <p className="text-sm text-fg-muted">
              <strong className="text-brand-orange">Nota para Alex.</strong>{" "}
              {avisoRevisionLegal}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.28fr)_minmax(0,1fr)] lg:gap-16">
            {/* Índice */}
            <nav aria-label="Índice del documento" className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="text-eyebrow mb-4 text-fg-muted/50">Contenido</h2>
              <ol className="flex flex-col border-l border-white/10 pl-4 text-sm">
                {secciones.map((seccion) => (
                  <li key={seccion.titulo}>
                    <a
                      href={`#${slugSeccion(seccion.titulo)}`}
                      className="flex min-h-11 items-center text-fg-muted transition-colors hover:text-fg"
                    >
                      {seccion.titulo}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div>
              {conFichaTitular ? (
                <div className="mb-12 rounded-[2px] border border-white/10 bg-surface/40 p-6">
                  <h2 className="text-eyebrow mb-5 text-fg-muted/50">
                    Datos del titular
                  </h2>
                  <dl>
                    <DatoTitular
                      etiqueta="Titular"
                      valor={datosFiscales.titular}
                    />
                    <DatoTitular etiqueta="NIF / CIF" valor={datosFiscales.nif} />
                    <DatoTitular etiqueta="Domicilio" valor={datosFiscales.domicilio} />
                    <DatoTitular etiqueta="Email" valor={datosFiscales.email} />
                    <DatoTitular etiqueta="Teléfono" valor={datosFiscales.telefono} />
                    <DatoTitular
                      etiqueta="Nombre comercial"
                      valor={datosFiscales.nombreComercial}
                    />
                    <DatoTitular etiqueta="Dominio" valor={DOMINIO_ACTUAL} />
                    <DatoTitular etiqueta="Actividad" valor={datosFiscales.actividad} />
                    <DatoTitular
                      etiqueta="Registro"
                      valor={datosFiscales.registro}
                    />
                  </dl>
                </div>
              ) : null}

              <div className="flex flex-col gap-10">
                {secciones.map((seccion) => (
                  <section
                    key={seccion.titulo}
                    id={slugSeccion(seccion.titulo)}
                    className="scroll-mt-32"
                  >
                    <h2 className="text-2xl">{seccion.titulo}</h2>
                    {seccion.parrafos ? (
                      <div className="prosa mt-4">
                        {seccion.parrafos.map((parrafo) => (
                          <p key={parrafo.slice(0, 40)}>{parrafo}</p>
                        ))}
                      </div>
                    ) : null}
                    {seccion.lista ? (
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {seccion.lista.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-fg-muted"
                          >
                            <span
                              className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brand-blue"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}

                {conEncargados ? (
                  <section id="encargados" className="scroll-mt-32">
                    <h2 className="text-2xl">Encargados del tratamiento</h2>
                    <ul className="mt-4 flex flex-col gap-3">
                      {encargadosTratamiento.map((encargado) => (
                        <li
                          key={encargado.nombre}
                          className="rounded-[2px] border border-white/10 bg-surface/40 p-5"
                        >
                          <p className="font-bold">{encargado.nombre}</p>
                          <p className="mt-2 text-sm text-fg-muted">
                            {encargado.finalidad}
                          </p>
                          <p className="mt-1 text-xs text-fg-muted/60">
                            {encargado.ubicacion}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {children}

                <p className="border-t border-white/10 pt-8 text-sm text-fg-muted/60">
                  {site.nombre} · {site.nap.ciudad}, {site.nap.comunidad}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function slugSeccion(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
