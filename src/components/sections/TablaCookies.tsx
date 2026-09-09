import { AbrirPreferenciasCookies } from "@/components/layout/CookieBanner";
import { categoriasCookies } from "@/content/legal";

export function TablaCookies() {
  return (
    <section id="detalle-por-categorias" className="scroll-mt-32">
      <h2 className="text-2xl">Detalle por categorías</h2>

      <div className="mt-6 flex flex-col gap-6">
        {categoriasCookies.map((categoria) => (
          <div
            key={categoria.id}
            className="rounded-[2px] border border-white/10 bg-surface/40 p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xl">{categoria.titulo}</h3>
              <span className="text-eyebrow text-brand-orange">
                {categoria.siempreActiva ? "Siempre activas" : "Requiere consentimiento"}
              </span>
            </div>
            <p className="mt-3 text-sm text-fg-muted">{categoria.descripcion}</p>

            {/* La tabla desborda en horizontal dentro de su contenedor, nunca la página */}
            <div className="mt-5 -mx-2 overflow-x-auto px-2">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Elementos almacenados en la categoría {categoria.titulo}
                </caption>
                <thead>
                  <tr className="border-b border-white/12">
                    <th scope="col" className="py-2.5 pr-4 text-eyebrow text-fg-muted/50">
                      Nombre
                    </th>
                    <th scope="col" className="py-2.5 pr-4 text-eyebrow text-fg-muted/50">
                      Finalidad
                    </th>
                    <th scope="col" className="py-2.5 text-eyebrow text-fg-muted/50">
                      Duración
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoria.ejemplos.map((ejemplo) => (
                    <tr key={ejemplo.nombre} className="border-b border-white/8">
                      <td className="py-3 pr-4 align-top font-display text-xs text-brand-blue">
                        {ejemplo.nombre}
                      </td>
                      <td className="py-3 pr-4 align-top text-fg-muted">
                        {ejemplo.finalidad}
                      </td>
                      <td className="py-3 align-top whitespace-nowrap text-fg-muted">
                        {ejemplo.duracion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[2px] border border-brand-blue/40 bg-brand-blue-deep/25 p-6">
        <h3 className="text-xl">Cambiar mi decisión</h3>
        <p className="mt-3 text-sm text-fg-muted">
          Puedes revisar o modificar tu elección cuando quieras. Se guarda 12 meses.
        </p>
        <div className="mt-5 inline-flex min-h-11 items-center rounded-[2px] border border-white/25 px-4 text-sm transition-colors hover:border-white/60">
          <AbrirPreferenciasCookies />
        </div>
      </div>
    </section>
  );
}
