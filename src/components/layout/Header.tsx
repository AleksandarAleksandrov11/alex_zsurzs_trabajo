"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { hrefTelefono, navPrincipal, site, telefonoVisible } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [compacto, setCompacto] = useState(false);
  const pathname = usePathname();
  const telefono = telefonoVisible();

  useEffect(() => {
    const alScroll = () => setCompacto(window.scrollY > 24);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
        compacto
          ? "border-b border-white/10 bg-bg/85 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className={cn(
          "container-brand flex items-center justify-between gap-4 transition-[height] duration-300",
          compacto ? "h-16" : "h-20 md:h-24",
        )}
      >
        <Link
          href="/"
          className="flex min-h-11 shrink-0 items-center text-fg transition-opacity hover:opacity-80"
          aria-label={`${site.nombre} · Inicio`}
        >
          <BrandLogo
            variante="horizontal"
            className={cn("transition-transform duration-300", compacto && "scale-95")}
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navPrincipal.map((enlace) => {
              const activo =
                pathname === enlace.href || pathname.startsWith(`${enlace.href}/`);
              return (
                <li key={enlace.href}>
                  <Link
                    href={enlace.href}
                    aria-current={activo ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-11 items-center px-3.5 text-sm transition-colors",
                      activo ? "text-fg" : "text-fg-muted/80 hover:text-fg",
                    )}
                  >
                    {enlace.label}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 bottom-3 h-px origin-left bg-brand-blue transition-transform duration-300",
                        activo ? "scale-x-100" : "scale-x-0",
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {telefono ? (
            <a
              href={hrefTelefono()}
              className="hidden min-h-11 items-center gap-2 px-3 text-sm text-fg-muted transition-colors hover:text-fg md:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {telefono}
            </a>
          ) : null}

          {/* El wrapper controla la visibilidad: aplicar `hidden` sobre el
              propio botón no gana a su `inline-flex` de base. */}
          <span className="hidden sm:block">
            <ButtonLink href="/contacto">Solicitar presupuesto</ButtonLink>
          </span>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
