import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Numeración de sección del manual: "01", "02"… */
  numero?: string;
  eyebrow?: string;
  titulo: ReactNode;
  descripcion?: ReactNode;
  className?: string;
  alineacion?: "izquierda" | "centro";
  /** Nivel semántico real del encabezado. */
  como?: "h2" | "h3";
};

export function SectionHeading({
  numero,
  eyebrow,
  titulo,
  descripcion,
  className,
  alineacion = "izquierda",
  como: Como = "h2",
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        alineacion === "centro" && "mx-auto text-center",
        className,
      )}
    >
      {(numero || eyebrow) && (
        <div
          className={cn(
            "mb-5 flex items-center gap-3",
            alineacion === "centro" && "justify-center",
          )}
        >
          {numero ? <span className="num-seccion">{numero}.</span> : null}
          {eyebrow ? (
            <span className="text-eyebrow text-fg-muted/60">{eyebrow}</span>
          ) : null}
          <span
            className="rayas-z h-3 flex-1 max-w-24 opacity-70"
            aria-hidden="true"
          />
        </div>
      )}
      <Como className="text-4xl">{titulo}</Como>
      {descripcion ? (
        <div className="mt-5 text-lg text-fg-muted">{descripcion}</div>
      ) : null}
    </div>
  );
}
