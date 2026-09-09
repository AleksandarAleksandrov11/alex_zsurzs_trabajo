"use client";

import { useId, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type BaseProps = {
  etiqueta: string;
  error?: string;
  ayuda?: string;
  requerido?: boolean;
  className?: string;
};

const claseControl =
  "min-h-12 w-full rounded-[2px] border bg-white/[0.03] px-4 py-3 text-base text-fg placeholder:text-fg-muted/40 transition-colors focus:outline-none focus-visible:border-brand-blue";

function Mensajes({
  error,
  ayuda,
  idError,
  idAyuda,
}: {
  error?: string;
  ayuda?: string;
  idError: string;
  idAyuda: string;
}) {
  return (
    <>
      {ayuda ? (
        <p id={idAyuda} className="mt-2 text-xs text-fg-muted/60">
          {ayuda}
        </p>
      ) : null}
      <p id={idError} aria-live="polite" className="min-h-0">
        {error ? (
          <span className="mt-2 flex items-center gap-2 text-sm text-brand-orange">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </span>
        ) : null}
      </p>
    </>
  );
}

type CampoTextoProps = BaseProps & {
  nombre: string;
  valor: string;
  onChange: (valor: string) => void;
  tipo?: "text" | "tel" | "email";
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "text" | "tel" | "email";
};

export function CampoTexto({
  etiqueta,
  nombre,
  valor,
  onChange,
  error,
  ayuda,
  requerido,
  tipo = "text",
  autoComplete,
  placeholder,
  inputMode,
  className,
}: CampoTextoProps) {
  const id = useId();

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-bold">
        {etiqueta}
        {requerido ? (
          <span className="ml-1 text-brand-orange" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-fg-muted/50">Opcional</span>
        )}
      </label>
      <input
        id={id}
        name={nombre}
        type={tipo}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={valor}
        required={requerido}
        aria-required={requerido}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-error ${ayuda ? `${id}-ayuda` : ""}`.trim()}
        onChange={(e) => onChange(e.target.value)}
        className={cn(claseControl, error ? "border-brand-orange" : "border-white/15")}
      />
      <Mensajes error={error} ayuda={ayuda} idError={`${id}-error`} idAyuda={`${id}-ayuda`} />
    </div>
  );
}

type CampoAreaProps = BaseProps & {
  nombre: string;
  valor: string;
  onChange: (valor: string) => void;
  filas?: number;
  placeholder?: string;
  maximo?: number;
};

export function CampoArea({
  etiqueta,
  nombre,
  valor,
  onChange,
  error,
  ayuda,
  requerido,
  filas = 6,
  placeholder,
  maximo,
  className,
}: CampoAreaProps) {
  const id = useId();

  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="block text-sm font-bold">
          {etiqueta}
          {requerido ? (
            <span className="ml-1 text-brand-orange" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        {maximo ? (
          <span className="text-xs text-fg-muted/50" aria-hidden="true">
            {valor.length} / {maximo}
          </span>
        ) : null}
      </div>
      <textarea
        id={id}
        name={nombre}
        rows={filas}
        maxLength={maximo}
        placeholder={placeholder}
        value={valor}
        required={requerido}
        aria-required={requerido}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-error ${ayuda ? `${id}-ayuda` : ""}`.trim()}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          claseControl,
          "resize-y leading-relaxed",
          error ? "border-brand-orange" : "border-white/15",
        )}
      />
      <Mensajes error={error} ayuda={ayuda} idError={`${id}-error`} idAyuda={`${id}-ayuda`} />
    </div>
  );
}

type OpcionProps = {
  nombre: string;
  valor: string;
  seleccionado: boolean;
  onChange: (valor: string) => void;
  titulo: string;
  descripcion?: string;
  icono?: ReactNode;
};

/** Tarjeta de opción: un radio real con estética de ficha técnica. */
export function OpcionRadio({
  nombre,
  valor,
  seleccionado,
  onChange,
  titulo,
  descripcion,
  icono,
}: OpcionProps) {
  return (
    <label
      className={cn(
        "group flex min-h-16 cursor-pointer items-start gap-4 rounded-[2px] border p-4 transition-colors",
        seleccionado
          ? "border-brand-blue bg-brand-blue/12"
          : "border-white/12 bg-white/[0.02] hover:border-white/35",
      )}
    >
      <input
        type="radio"
        name={nombre}
        value={valor}
        checked={seleccionado}
        onChange={() => onChange(valor)}
        className="sr-only"
      />
      <span
        className={cn(
          "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[2px] border transition-colors",
          seleccionado
            ? "border-brand-blue bg-brand-blue text-white"
            : "border-white/25 text-fg-muted/70",
        )}
        aria-hidden="true"
      >
        {icono ?? (
          <span
            className={cn("h-2 w-2", seleccionado ? "bg-white" : "bg-transparent")}
          />
        )}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold">{titulo}</span>
        {descripcion ? (
          <span className="mt-1 block text-xs text-fg-muted">{descripcion}</span>
        ) : null}
      </span>
    </label>
  );
}

export function GrupoOpciones({
  leyenda,
  error,
  children,
  columnas = 2,
}: {
  leyenda: string;
  error?: string;
  children: ReactNode;
  columnas?: 1 | 2 | 3;
}) {
  const id = useId();
  return (
    <fieldset aria-describedby={`${id}-error`} aria-invalid={Boolean(error)}>
      <legend className="mb-4 text-sm font-bold">{leyenda}</legend>
      <div
        className={cn(
          "grid gap-3",
          columnas === 2 && "sm:grid-cols-2",
          columnas === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {children}
      </div>
      <p id={`${id}-error`} aria-live="polite">
        {error ? (
          <span className="mt-3 flex items-center gap-2 text-sm text-brand-orange">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </span>
        ) : null}
      </p>
    </fieldset>
  );
}
