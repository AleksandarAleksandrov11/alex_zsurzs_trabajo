import { cn } from "@/lib/utils";

type Props = {
  /** Qué imagen real debe ocupar este hueco. Se muestra al usuario. */
  descripcion: string;
  /** Dimensiones recomendadas, p. ej. "1600 × 2000 px · 4:5". */
  medidas: string;
  className?: string;
  /** Proporción reservada, para que no haya salto de layout (CLS). */
  ratio?: string;
};

/**
 * Hueco de imagen real pendiente.
 *
 * El manual prohíbe el stock genérico y pide composición gráfica cuando no
 * hay foto real. Esto es esa composición: retícula técnica de plano de obra
 * con la cota de lo que falta, en lugar de una imagen comprada que no
 * representa el trabajo de Alex.
 */
export function MediaPlaceholder({
  descripcion,
  medidas,
  className,
  ratio = "4 / 5",
}: Props) {
  return (
    <div
      className={cn(
        "grid-plano relative flex flex-col justify-end overflow-hidden rounded-[2px] border border-dashed border-white/15 bg-surface",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 10%, rgba(47,74,160,.34), transparent 62%)",
        }}
        aria-hidden="true"
      />
      <div
        className="rayas-z pointer-events-none absolute -right-6 top-8 h-24 w-40 opacity-40"
        aria-hidden="true"
      />
      <div className="relative z-1 p-5">
        <div className="cota mb-3 w-16" aria-hidden="true" />
        <p className="text-eyebrow text-brand-orange">Imagen pendiente</p>
        <p className="mt-2 text-sm text-fg-muted">{descripcion}</p>
        <p className="mt-1 font-display text-xs text-fg-muted/50">{medidas}</p>
      </div>
    </div>
  );
}
