import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  /** Activa el barrido diagonal a la inclinación de la Z. */
  interactiva?: boolean;
};

export function Card({ children, className, href, interactiva = true }: Props) {
  const clases = cn(
    "group relative block rounded-[2px] border border-white/10 bg-surface/70 p-6 transition-colors duration-300 sm:p-8",
    interactiva &&
      "barrido-z hover:border-brand-blue/70 focus-within:border-brand-blue/70",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={clases}>
        {children}
      </Link>
    );
  }

  return <div className={clases}>{children}</div>;
}
