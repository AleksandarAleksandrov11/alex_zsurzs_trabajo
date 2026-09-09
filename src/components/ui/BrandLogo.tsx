import { cn } from "@/lib/utils";

/*
 * TODO (Alex): sustituir por los SVG oficiales del manual de identidad.
 * Esta es una construcción fiel a lo descrito en el manual (la Z con el rayo
 * y las dos líneas de fuga), pero NO es el archivo original. En cuanto
 * facilites los SVG oficiales, se reemplaza el contenido de este componente
 * sin tocar ninguna página: todas usan `BrandLogo`.
 *
 * Normas del manual respetadas aquí:
 * · Área de seguridad reservada mediante el propio viewBox.
 * · Una sola tinta (currentColor): azul corporativo, blanco o negro.
 * · Nunca en naranja. Nunca contorneado, enmarcado ni deformado
 *   (`preserveAspectRatio` por defecto mantiene la proporción).
 */

type Props = {
  className?: string;
  /** Con marca denominativa al lado (horizontal) o solo el isotipo. */
  variante?: "horizontal" | "isotipo" | "vertical";
  /** Añade el lema bajo la marca, como permite el apartado 06 del manual. */
  conLema?: boolean;
  title?: string;
};

function Isotipo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 96"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {/* Z con el rayo calado en la diagonal */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 8h72v14L40 70h40v14H8V70l40-48H8V8Zm50 22L42 50h8l-11 15 20-22h-9l8-11Z"
      />
      {/* Dos líneas de fuga: progresión, velocidad, eficiencia */}
      <path d="M86 30h26v9H86z" opacity=".95" />
      <path d="M86 47h18v9H86z" opacity=".65" />
    </svg>
  );
}

function Denominativo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display leading-none tracking-tight", className)}>
      ZSolutions
    </span>
  );
}

export function BrandLogo({
  className,
  variante = "horizontal",
  conLema = false,
  title = "ZSolutions",
}: Props) {
  if (variante === "isotipo") {
    return (
      <span className={cn("inline-flex text-current", className)} title={title}>
        <Isotipo className="h-full w-auto" />
      </span>
    );
  }

  if (variante === "vertical") {
    return (
      <span
        className={cn("inline-flex flex-col items-center gap-3 text-current", className)}
        title={title}
      >
        <Isotipo className="h-12 w-auto" />
        <Denominativo className="text-2xl" />
        {conLema ? (
          <span className="text-eyebrow text-fg-muted/70">Instalaciones</span>
        ) : null}
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-center gap-2.5 text-current", className)}
      title={title}
    >
      <Isotipo className="h-7 w-auto shrink-0" />
      <span className="flex flex-col">
        <Denominativo className="text-xl" />
        {conLema ? (
          <span className="text-eyebrow text-current/60 -mt-0.5">Instalaciones</span>
        ) : null}
      </span>
    </span>
  );
}
