import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Miga = { label: string; href: string };

type Props = {
  /** Sin incluir "Inicio": se añade automáticamente. */
  migas: Miga[];
};

export function Breadcrumbs({ migas }: Props) {
  const completo: Miga[] = [{ label: "Inicio", href: "/" }, ...migas];

  return (
    <nav aria-label="Ruta de navegación" className="text-xs">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-fg-muted/60">
        {completo.map((miga, i) => {
          const ultimo = i === completo.length - 1;
          return (
            <li key={miga.href} className="flex items-center gap-1.5">
              {i > 0 ? (
                <ChevronRight
                  className="h-3 w-3 shrink-0 opacity-50"
                  aria-hidden="true"
                />
              ) : null}
              {ultimo ? (
                <span aria-current="page" className="inline-flex min-h-11 items-center text-fg-muted">
                  {miga.label}
                </span>
              ) : (
                <Link
                  href={miga.href}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-fg focus-visible:text-fg"
                >
                  {miga.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
