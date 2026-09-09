import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Badge } from "@/components/ui/Badge";
import { AbrirPreferenciasCookies } from "@/components/layout/CookieBanner";
import {
  hrefEmail,
  hrefTelefono,
  navLegal,
  navPrincipal,
  site,
  telefonoVisible,
} from "@/content/site";
import { servicios } from "@/content/servicios";
import { zonas } from "@/content/zonas";

export function Footer() {
  const telefono = telefonoVisible();
  const anio = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-surface/40">
      <div className="rayas-z absolute inset-x-0 top-0 h-1 opacity-60" aria-hidden="true" />

      <div className="container-brand py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))] lg:gap-8">
          {/* Marca y NAP */}
          <div>
            <BrandLogo variante="horizontal" className="text-fg" conLema />
            <p className="mt-5 max-w-sm text-sm text-fg-muted">{site.descripcionCorta}</p>

            <address className="mt-6 flex flex-col gap-3 text-sm not-italic text-fg-muted">
              <span className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                <span>
                  {site.nap.calle ? (
                    <>
                      {site.nap.calle}
                      <br />
                      {site.nap.codigoPostal} {site.nap.ciudad}, {site.nap.provincia}
                    </>
                  ) : (
                    <>
                      {site.nap.ciudad}, {site.nap.comunidad}
                      <br />
                      <Badge tono="pendiente" className="mt-2">
                        TODO · dirección fiscal
                      </Badge>
                    </>
                  )}
                </span>
              </span>

              <span className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                {telefono ? (
                  <a href={hrefTelefono()} className="hover:text-fg">
                    {telefono}
                  </a>
                ) : (
                  <Badge tono="pendiente">TODO · teléfono</Badge>
                )}
              </span>

              <span className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                {site.nap.email ? (
                  <a href={hrefEmail()} className="hover:text-fg">
                    {site.nap.email}
                  </a>
                ) : (
                  <Badge tono="pendiente">TODO · email</Badge>
                )}
              </span>
            </address>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={site.redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Alex Zsurzs"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/15 text-fg-muted transition-colors hover:border-brand-blue hover:text-fg"
              >
                <SocialIcon red="instagram" />
              </a>
              <a
                href={site.redes.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Alex Zsurzs"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/15 text-fg-muted transition-colors hover:border-brand-blue hover:text-fg"
              >
                <SocialIcon red="tiktok" />
              </a>
              <a
                href={site.redes.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube de Alex Zsurzs"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/15 text-fg-muted transition-colors hover:border-brand-blue hover:text-fg"
              >
                <SocialIcon red="youtube" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <nav aria-label="Servicios">
            <h2 className="text-eyebrow mb-5 text-fg-muted/50">Servicios</h2>
            <ul className="flex flex-col text-sm">
              {servicios.map((servicio) => (
                <li key={servicio.slug}>
                  <Link
                    href={`/servicios/${servicio.slug}`}
                    className="flex min-h-11 items-center text-fg-muted transition-colors hover:text-fg"
                  >
                    {servicio.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Zonas */}
          <nav aria-label="Zonas de actuación">
            <h2 className="text-eyebrow mb-5 text-fg-muted/50">Zonas</h2>
            <ul className="flex flex-col text-sm">
              {zonas.slice(0, 9).map((zona) => (
                <li key={zona.slug}>
                  <Link
                    href={`/zonas/${zona.slug}`}
                    className="flex min-h-11 items-center text-fg-muted transition-colors hover:text-fg"
                  >
                    {zona.ciudad}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/zonas"
                  className="flex min-h-11 items-center text-fg transition-colors hover:text-brand-orange"
                >
                  Ver todas las zonas
                </Link>
              </li>
            </ul>
          </nav>

          {/* Web y legal */}
          <nav aria-label="Enlaces de la web">
            <h2 className="text-eyebrow mb-5 text-fg-muted/50">Web</h2>
            <ul className="flex flex-col text-sm">
              {navPrincipal.map((enlace) => (
                <li key={enlace.href}>
                  <Link
                    href={enlace.href}
                    className="flex min-h-11 items-center text-fg-muted transition-colors hover:text-fg"
                  >
                    {enlace.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contacto"
                  className="flex min-h-11 items-center text-fg-muted transition-colors hover:text-fg"
                >
                  Contacto
                </Link>
              </li>
            </ul>

            <h2 className="text-eyebrow mt-8 mb-5 text-fg-muted/50">Legal</h2>
            <ul className="flex flex-col text-sm">
              {navLegal.map((enlace) => (
                <li key={enlace.href}>
                  <Link
                    href={enlace.href}
                    className="flex min-h-11 items-center text-fg-muted transition-colors hover:text-fg"
                  >
                    {enlace.label}
                  </Link>
                </li>
              ))}
              <li>
                <AbrirPreferenciasCookies />
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-fg-muted/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {anio} {site.nombre}
            {site.nap.razonSocial ? ` · ${site.nap.razonSocial}` : ""} · Instalaciones en{" "}
            {site.nap.ciudad} y {site.nap.comunidad}.
          </p>
          <p>
            Proyecto personal de{" "}
            <a
              href={site.redes.webPersonal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center hover:text-fg"
            >
              {site.fundador}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
