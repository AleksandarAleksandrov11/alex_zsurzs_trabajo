import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variante = "primario" | "secundario" | "fantasma" | "acento";
type Tamano = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] font-sans font-bold uppercase tracking-[0.12em] transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variantes: Record<Variante, string> = {
  /* Azul = acción. Blanco sobre #2F4AA0 ≈ 8:1 de contraste. */
  primario: "bg-brand-blue text-white hover:bg-brand-blue-hover",
  secundario:
    "border border-white/25 bg-white/[0.03] text-fg hover:border-white/50 hover:bg-white/[0.07]",
  fantasma: "text-fg-muted hover:text-fg",
  /* Naranja = atención. Reservado a un único uso por pantalla. */
  acento: "bg-brand-orange text-[#1A0A00] hover:bg-brand-orange-hover",
};

const tamanos: Record<Tamano, string> = {
  /* Área táctil ≥ 44 px de alto en ambos tamaños. */
  md: "min-h-11 px-5 py-3 text-xs",
  lg: "min-h-[3.25rem] px-7 py-4 text-sm",
};

type ComunProps = {
  variante?: Variante;
  tamano?: Tamano;
  className?: string;
  children: ReactNode;
};

type BotonProps = ComunProps & Omit<ComponentProps<"button">, "className" | "children">;
type EnlaceProps = ComunProps &
  Omit<ComponentProps<typeof Link>, "className" | "children" | "href"> & {
    href: string;
  };

export function Button({
  variante = "primario",
  tamano = "md",
  className,
  children,
  ...props
}: BotonProps) {
  return (
    <button
      className={cn(base, variantes[variante], tamanos[tamano], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variante = "primario",
  tamano = "md",
  className,
  children,
  href,
  ...props
}: EnlaceProps) {
  const externo = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  if (externo) {
    return (
      <a
        href={href}
        className={cn(base, variantes[variante], tamanos[tamano], className)}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(base, variantes[variante], tamanos[tamano], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
