import { cn } from "@/lib/utils";

/*
 * Iconos identificativos de servicio.
 *
 * TODO (Alex): el manual (apartado 07) incluye cuatro iconos oficiales
 * —instalaciones eléctricas, fontanería, aire acondicionado y trabajos
 * verticales— en composición vertical y horizontal. Cuando me pases esos
 * archivos se sustituyen aquí. Los de aerotermia y lampistería no existen
 * en el manual y se han construido con el mismo lenguaje geométrico.
 */

export type NombreIcono =
  | "electricidad"
  | "fontaneria"
  | "climatizacion"
  | "aerotermia"
  | "verticales"
  | "lampisteria";

type Props = {
  nombre: NombreIcono;
  className?: string;
};

const trazos: Record<NombreIcono, React.ReactNode> = {
  electricidad: (
    <>
      <path d="M13.5 3 6 13.5h4.5L9.5 21 18 10.5h-4.75L13.5 3Z" />
      <path d="M3 6.5h2.5M3 17.5h3.5M21 6.5h-2M21 17.5h-1.5" opacity=".55" />
    </>
  ),
  fontaneria: (
    <>
      <path d="M4 8.5h6.5v7H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z" />
      <path d="M10.5 10.5H15V6.75a2.25 2.25 0 0 1 2.25-2.25H21" />
      <path d="M10.5 13.5H15v3.75A2.25 2.25 0 0 0 17.25 19.5H21" opacity=".55" />
      <path d="M13 8.5v7" opacity=".55" />
    </>
  ),
  climatizacion: (
    <>
      <rect x="3" y="4.5" width="18" height="8" rx="1.5" />
      <path d="M6 8.5h12" opacity=".55" />
      <path d="M6.5 16c1.6 0 1.6 2.5 3.2 2.5M13.3 16c1.6 0 1.6 2.5 3.2 2.5" />
      <path d="M6.5 19.5c1.6 0 1.6 1.5 3.2 1.5M13.3 19.5c1.6 0 1.6 1.5 3.2 1.5" opacity=".55" />
    </>
  ),
  aerotermia: (
    <>
      <circle cx="9" cy="12" r="6" />
      <path d="M9 6.5c1.8 1.4 1.8 3.6 0 5.5M9 17.5c-1.8-1.4-1.8-3.6 0-5.5M14 12c-1.4 1.8-3.6 1.8-5 0M4 12c1.4-1.8 3.6-1.8 5 0" />
      <path d="M18 8.5v7M18 8.5l-1.75 2M18 8.5l1.75 2M18 15.5l-1.75-2M18 15.5l1.75-2" opacity=".8" />
    </>
  ),
  verticales: (
    <>
      <path d="M6 2v20" />
      <path d="M6 6.5c4 0 6 2 6 5s2 5 6 5" opacity=".55" />
      <circle cx="15.5" cy="9" r="2.5" />
      <path d="M15.5 11.5v4M13 20l2.5-4.5L18 20" />
    </>
  ),
  lampisteria: (
    <>
      <path d="M3 9.5h18v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-9Z" />
      <path d="M8.5 9.5V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v3.5" />
      <path d="M3 13.5h18" opacity=".55" />
      <path d="M12 12v3" />
    </>
  ),
};

export function ServiceIcon({ nombre, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      {trazos[nombre]}
    </svg>
  );
}
