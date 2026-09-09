import { cn } from "@/lib/utils";

/*
 * Iconos de redes dibujados a mano: lucide-react ya no incluye marcas y no
 * quiero cargar una librería entera por tres glifos. Se usan solo como enlace
 * de icono, siempre acompañados de `aria-label`.
 */

export type RedSocial = "instagram" | "tiktok" | "youtube" | "web";

const trazos: Record<RedSocial, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <path
      d="M15.5 3.2c.4 2.1 1.9 3.5 4 3.7v2.7c-1.4.1-2.8-.3-4-1.1v5.9a5.4 5.4 0 1 1-4.6-5.3v2.9a2.5 2.5 0 1 0 1.8 2.4V3.2h2.8Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10.4 9.6v4.8l4.2-2.4-4.2-2.4Z" fill="currentColor" stroke="none" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.4 2.5 15.6 0 18M12 3c-2.5 2.4-2.5 15.6 0 18" />
    </>
  ),
};

export function SocialIcon({
  red,
  className,
}: {
  red: RedSocial;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    >
      {trazos[red]}
    </svg>
  );
}
