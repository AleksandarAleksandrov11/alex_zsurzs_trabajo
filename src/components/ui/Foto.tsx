import Image from "next/image";
import { fotos, type NombreFoto } from "@/content/fotos";
import { cn } from "@/lib/utils";

type Props = {
  /** Clave de `src/content/fotos.ts`. */
  nombre: NombreFoto;
  /** Texto alternativo real y descriptivo. Obligatorio. */
  alt: string;
  className?: string;
  /** `sizes` correcto para no descargar de más en móvil. */
  sizes?: string;
  /** Solo en el hero de la home. */
  priority?: boolean;
  /**
   * Tratamiento fotográfico del manual (apartado 05):
   * · "bn"    blanco y negro puro
   * · "duo"   desaturada con capa azul corporativo sutil
   * · "color" sin tratamiento, para galería
   */
  tratamiento?: "bn" | "duo" | "color";
  objectPosition?: string;
  ratio?: string;
  /** Calidad de compresión. Por defecto 74: en foto desaturada no se aprecia. */
  calidad?: number;
};

export function Foto({
  nombre,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  tratamiento = "duo",
  objectPosition,
  ratio,
  calidad = 74,
}: Props) {
  const foto = fotos[nombre];

  return (
    <div
      className={cn("relative overflow-hidden bg-surface", className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <Image
        src={foto.src}
        alt={alt}
        width={foto.ancho}
        height={foto.alto}
        sizes={sizes}
        priority={priority}
        quality={calidad}
        loading={priority ? undefined : "lazy"}
        placeholder="blur"
        blurDataURL={foto.blur}
        className={cn(
          "h-full w-full object-cover",
          tratamiento === "bn" && "grayscale",
          tratamiento === "duo" && "grayscale-[0.72] contrast-[1.06]",
        )}
        style={objectPosition ? { objectPosition } : undefined}
      />

      {/* Capa de color corporativo. El manual la permite entre el 60 % y el
          80 % cuando encima va texto; aquí, sin texto, se usa muy contenida
          para unificar la fotografía con la paleta. */}
      {tratamiento === "duo" ? (
        <div
          className="pointer-events-none absolute inset-0 mix-blend-color"
          style={{ backgroundColor: "rgba(47,74,160,.42)" }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
