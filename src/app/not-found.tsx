import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { navPrincipal } from "@/content/site";
import { servicios } from "@/content/servicios";
import { zonasDestacadas } from "@/content/zonas";

export const metadata: Metadata = {
  title: "Página no encontrada | ZSolutions",
  description: "La página que buscas no existe o ha cambiado de dirección.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden py-32">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-plano absolute inset-0 opacity-70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 75% 10%, rgba(35,54,111,.6) 0%, transparent 62%)",
          }}
        />
        <div className="rayas-z absolute -left-20 bottom-24 h-40 w-96 opacity-25" />
      </div>

      <div className="container-brand">
        <p className="text-eyebrow mb-5 text-brand-orange">Error 404</p>
        <h1 className="max-w-3xl text-7xl">Aquí no hay nada instalado</h1>
        <p className="mt-7 max-w-xl text-lg text-fg-muted">
          La página que buscas no existe o ha cambiado de dirección. Estos son los
          caminos más cortos para llegar a lo que necesitas.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" tamano="lg">
            Volver al inicio
          </ButtonLink>
          <ButtonLink href="/contacto" variante="secundario" tamano="lg">
            Solicitar presupuesto
          </ButtonLink>
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-3">
          <nav aria-label="Servicios">
            <h2 className="text-eyebrow mb-4 text-fg-muted/50">Servicios</h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {servicios.map((servicio) => (
                <li key={servicio.slug}>
                  <Link
                    href={`/servicios/${servicio.slug}`}
                    className="inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
                  >
                    {servicio.nombre}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Zonas principales">
            <h2 className="text-eyebrow mb-4 text-fg-muted/50">Zonas principales</h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {zonasDestacadas.map((zona) => (
                <li key={zona.slug}>
                  <Link
                    href={`/zonas/${zona.slug}`}
                    className="inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
                  >
                    {zona.ciudad}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/zonas" className="text-fg hover:text-brand-orange">
                  Ver todas
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Secciones de la web">
            <h2 className="text-eyebrow mb-4 text-fg-muted/50">La web</h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {navPrincipal.map((enlace) => (
                <li key={enlace.href}>
                  <Link
                    href={enlace.href}
                    className="inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
                  >
                    {enlace.label}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
