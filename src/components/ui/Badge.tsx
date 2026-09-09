import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Estética de ficha técnica, con código a la izquierda. */
  codigo?: string;
  tono?: "neutro" | "acento" | "pendiente";
};

export function Badge({ children, className, codigo, tono = "neutro" }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[2px] border px-2.5 py-1.5 text-2xs uppercase",
        tono === "neutro" && "border-white/15 bg-white/[0.03] text-fg-muted",
        tono === "acento" && "border-brand-orange/40 bg-brand-orange/10 text-brand-orange",
        tono === "pendiente" &&
          "border-dashed border-brand-orange/50 bg-transparent text-brand-orange",
        className,
      )}
    >
      {codigo ? (
        <span className="font-display text-brand-orange/80">{codigo}</span>
      ) : null}
      {children}
    </span>
  );
}
