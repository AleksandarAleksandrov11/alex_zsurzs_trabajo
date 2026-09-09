"use client";

import Link from "next/link";
import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { track } from "@vercel/analytics";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Factory,
  HelpCircle,
  Home as HomeIcon,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceIcon, type NombreIcono } from "@/components/ui/ServiceIcon";
import { SocialIcon, type RedSocial } from "@/components/ui/SocialIcon";
import { ProgressBar } from "@/components/forms/ProgressBar";
import {
  CampoArea,
  CampoTexto,
  GrupoOpciones,
  OpcionRadio,
} from "@/components/forms/FormField";
import { enviarPresupuesto, type EstadoPresupuesto } from "@/actions/presupuesto";
import {
  etiquetasCanal,
  etiquetasEspacio,
  etiquetasOrigen,
  etiquetasServicio,
  etiquetasUrgencia,
  opcionesCanal,
  opcionesEspacio,
  opcionesOrigen,
  opcionesServicio,
  opcionesUrgencia,
  paso1,
  paso2,
  paso3,
  paso4,
  paso5,
  erroresDesde,
  type Canal,
  type ErroresCampo,
  type Espacio,
  type Origen,
  type Servicio,
  type Urgencia,
} from "@/lib/validation";
import { site } from "@/content/site";
import { EASE_BRAND } from "@/lib/motion";

const CLAVE_SESION = "zs_presupuesto";

const TITULOS = [
  "¿En qué puedo ayudarte?",
  "¿Para qué espacio?",
  "Cuéntame el detalle",
  "¿Cómo contactamos?",
  "¿Cómo te llamo?",
];

type Formulario = {
  servicio: Servicio | "";
  espacio: Espacio | "";
  ubicacion: string;
  detalle: string;
  urgencia: Urgencia | "";
  canal: Canal | "";
  comentarios: string;
  nombre: string;
  telefono: string;
  email: string;
  origen: Origen | "";
  privacidad: boolean;
};

const INICIAL: Formulario = {
  servicio: "",
  espacio: "",
  ubicacion: "",
  detalle: "",
  urgencia: "",
  canal: "",
  comentarios: "",
  nombre: "",
  telefono: "",
  email: "",
  origen: "",
  privacidad: false,
};

const iconosServicio: Record<Servicio, NombreIcono | null> = {
  climatizacion: "climatizacion",
  electricidad: "electricidad",
  fontaneria: "fontaneria",
  lampisteria: "lampisteria",
  "trabajos-verticales": "verticales",
  "no-seguro": null,
};

const iconosEspacio: Record<Espacio, typeof HomeIcon> = {
  vivienda: HomeIcon,
  local: Building2,
  comunidad: Users,
  nave: Factory,
};

const iconosCanal: Record<Canal, typeof Phone> = {
  whatsapp: MessageCircle,
  llamada: Phone,
  email: Mail,
};

const redesOrigen: Partial<Record<Origen, RedSocial>> = {
  instagram: "instagram",
  tiktok: "tiktok",
  youtube: "youtube",
  google: "web",
};

const esquemasPorPaso = [paso1, paso2, paso3, paso4, paso5];

export function QuoteWizard() {
  const [paso, setPaso] = useState(0);
  const [datos, setDatos] = useState<Formulario>(INICIAL);
  const [errores, setErrores] = useState<ErroresCampo>({});
  const [tocado, setTocado] = useState(false);
  const [abiertoEn] = useState(() => Date.now());

  const reducido = useReducedMotion();
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const primerRender = useRef(true);

  const [estado, accion, pendiente] = useActionState<EstadoPresupuesto, FormData>(
    enviarPresupuesto,
    { estado: "inicial" },
  );

  /* --- Persistencia en sessionStorage: no se pierde nada al recargar --- */
  useEffect(() => {
    try {
      const guardado = sessionStorage.getItem(CLAVE_SESION);
      if (guardado) setDatos({ ...INICIAL, ...JSON.parse(guardado) });
    } catch {
      /* Modo privado o almacenamiento bloqueado: se sigue sin persistencia. */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(CLAVE_SESION, JSON.stringify(datos));
    } catch {
      /* Sin persistencia, el formulario sigue funcionando igual. */
    }
  }, [datos]);

  /* --- Foco al cambiar de paso --- */
  useEffect(() => {
    if (primerRender.current) {
      primerRender.current = false;
      return;
    }
    tituloRef.current?.focus();
  }, [paso]);

  /* --- Evento de conversión --- */
  useEffect(() => {
    if (estado.estado !== "ok") return;
    track("presupuesto_enviado", { servicio: datos.servicio || "sin-definir" });
    try {
      sessionStorage.removeItem(CLAVE_SESION);
    } catch {
      /* Nada que limpiar si el almacenamiento no está disponible. */
    }
  }, [estado, datos.servicio]);

  const actualizar = useCallback(
    <C extends keyof Formulario>(campo: C, valor: Formulario[C]) => {
      setDatos((prev) => ({ ...prev, [campo]: valor }));
      setErrores((prev) => {
        if (!prev[campo]) return prev;
        const siguiente = { ...prev };
        delete siguiente[campo];
        return siguiente;
      });
    },
    [],
  );

  const validarPaso = useCallback(
    (indice: number): boolean => {
      const analisis = esquemasPorPaso[indice].safeParse(datos);
      if (analisis.success) {
        setErrores({});
        return true;
      }
      setErrores(erroresDesde(analisis.error));
      return false;
    },
    [datos],
  );

  const avanzar = useCallback(() => {
    setTocado(true);
    if (!validarPaso(paso)) return;
    setTocado(false);
    setPaso((p) => Math.min(p + 1, TITULOS.length - 1));
  }, [paso, validarPaso]);

  const retroceder = useCallback(() => {
    setErrores({});
    setTocado(false);
    setPaso((p) => Math.max(p - 1, 0));
  }, []);

  /* Validación en tiempo real a partir del primer intento del paso. */
  useEffect(() => {
    if (!tocado) return;
    const analisis = esquemasPorPaso[paso].safeParse(datos);
    setErrores(analisis.success ? {} : erroresDesde(analisis.error));
  }, [datos, paso, tocado]);

  /* ---------------------------------------------------------------
   * Confirmación
   * --------------------------------------------------------------- */
  if (estado.estado === "ok") {
    return (
      <div
        className="relative overflow-hidden rounded-[2px] border border-brand-blue/45 bg-brand-blue-deep/30 p-8 sm:p-12"
        role="status"
        aria-live="polite"
      >
        <div className="grid-plano absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-[2px] border border-brand-blue bg-brand-blue text-white">
            <Check className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="mt-7 text-4xl">Gracias.</h2>
          <p className="mt-5 max-w-xl text-lg text-fg-muted">
            Revisaré tu solicitud y te contactaré en menos de 24 horas con una primera
            valoración. Sin compromiso.
          </p>
          <p className="mt-6 font-display text-lg">
            {site.fundador} · {site.nombre}
          </p>
        </div>
      </div>
    );
  }

  const ultimo = paso === TITULOS.length - 1;

  return (
    <form
      action={accion}
      className="rounded-[2px] border border-white/10 bg-surface/40 p-6 sm:p-8 md:p-10"
      noValidate
    >
      {/* Campos que viajan al servidor */}
      <input type="hidden" name="servicio" value={datos.servicio} />
      <input type="hidden" name="espacio" value={datos.espacio} />
      <input type="hidden" name="ubicacion" value={datos.ubicacion} />
      <input type="hidden" name="detalle" value={datos.detalle} />
      <input type="hidden" name="urgencia" value={datos.urgencia} />
      <input type="hidden" name="canal" value={datos.canal} />
      <input type="hidden" name="comentarios" value={datos.comentarios} />
      <input type="hidden" name="nombre" value={datos.nombre} />
      <input type="hidden" name="telefono" value={datos.telefono} />
      <input type="hidden" name="email" value={datos.email} />
      <input type="hidden" name="origen" value={datos.origen} />
      <input type="hidden" name="privacidad" value={datos.privacidad ? "true" : ""} />
      <input type="hidden" name="abiertoEn" value={abiertoEn} />

      {/* Honeypot: invisible para personas, irresistible para bots */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="zs-empresa">No rellenar</label>
        <input
          id="zs-empresa"
          type="text"
          name="empresa"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <ProgressBar paso={paso} total={TITULOS.length} titulos={TITULOS} />

      <h2
        ref={tituloRef}
        tabIndex={-1}
        className="mt-8 text-3xl focus:outline-none"
        aria-live="polite"
      >
        <span className="num-seccion mr-3">
          {String(paso + 1).padStart(2, "0")}
        </span>
        {TITULOS[paso]}
      </h2>

      <div className="mt-8">
        {/* Paso 1 · Servicio */}
        <Panel activo={paso === 0} reducido={reducido}>
          <GrupoOpciones
            leyenda="Elige el servicio que necesitas"
            error={errores.servicio}
            columnas={3}
          >
            {opcionesServicio.map((opcion) => {
              const icono = iconosServicio[opcion];
              return (
                <OpcionRadio
                  key={opcion}
                  nombre="ui-servicio"
                  valor={opcion}
                  seleccionado={datos.servicio === opcion}
                  onChange={(v) => actualizar("servicio", v as Servicio)}
                  titulo={etiquetasServicio[opcion]}
                  icono={
                    icono ? (
                      <ServiceIcon nombre={icono} className="h-4 w-4" />
                    ) : (
                      <HelpCircle className="h-4 w-4" aria-hidden="true" />
                    )
                  }
                />
              );
            })}
          </GrupoOpciones>
        </Panel>

        {/* Paso 2 · Espacio */}
        <Panel activo={paso === 1} reducido={reducido}>
          <GrupoOpciones
            leyenda="Tipo de espacio"
            error={errores.espacio}
            columnas={2}
          >
            {opcionesEspacio.map((opcion) => {
              const Icono = iconosEspacio[opcion];
              return (
                <OpcionRadio
                  key={opcion}
                  nombre="ui-espacio"
                  valor={opcion}
                  seleccionado={datos.espacio === opcion}
                  onChange={(v) => actualizar("espacio", v as Espacio)}
                  titulo={etiquetasEspacio[opcion]}
                  icono={<Icono className="h-4 w-4" aria-hidden="true" />}
                />
              );
            })}
          </GrupoOpciones>

          <CampoTexto
            className="mt-8"
            etiqueta="¿Dónde está?"
            nombre="ui-ubicacion"
            valor={datos.ubicacion}
            onChange={(v) => actualizar("ubicacion", v)}
            error={errores.ubicacion}
            ayuda="Con la población y el barrio me sobra para orientarme. No hace falta la dirección exacta."
            requerido
            placeholder="Barcelona, Eixample"
            autoComplete="address-level2"
          />
        </Panel>

        {/* Paso 3 · Detalle */}
        <Panel activo={paso === 2} reducido={reducido}>
          <CampoArea
            etiqueta="Cuéntame qué necesitas"
            nombre="ui-detalle"
            valor={datos.detalle}
            onChange={(v) => actualizar("detalle", v)}
            error={errores.detalle}
            ayuda="Cuanto más concreto, mejor será la valoración: qué falla, desde cuándo, qué has probado y qué te gustaría conseguir."
            requerido
            maximo={2000}
            placeholder="Por ejemplo: el diferencial salta desde hace dos semanas, sobre todo cuando funciona el termo. Piso de los años setenta en Gràcia, cuadro original."
          />

          <div className="mt-8">
            <GrupoOpciones
              leyenda="¿Para cuándo lo necesitas?"
              error={errores.urgencia}
              columnas={2}
            >
              {opcionesUrgencia.map((opcion) => (
                <OpcionRadio
                  key={opcion}
                  nombre="ui-urgencia"
                  valor={opcion}
                  seleccionado={datos.urgencia === opcion}
                  onChange={(v) => actualizar("urgencia", v as Urgencia)}
                  titulo={etiquetasUrgencia[opcion]}
                />
              ))}
            </GrupoOpciones>
          </div>
        </Panel>

        {/* Paso 4 · Canal */}
        <Panel activo={paso === 3} reducido={reducido}>
          <GrupoOpciones
            leyenda="¿Por dónde prefieres que te conteste?"
            error={errores.canal}
            columnas={3}
          >
            {opcionesCanal.map((opcion) => {
              const Icono = iconosCanal[opcion];
              return (
                <OpcionRadio
                  key={opcion}
                  nombre="ui-canal"
                  valor={opcion}
                  seleccionado={datos.canal === opcion}
                  onChange={(v) => actualizar("canal", v as Canal)}
                  titulo={etiquetasCanal[opcion]}
                  icono={<Icono className="h-4 w-4" aria-hidden="true" />}
                />
              );
            })}
          </GrupoOpciones>

          <CampoArea
            className="mt-8"
            etiqueta="Algo más que deba saber"
            nombre="ui-comentarios"
            valor={datos.comentarios}
            onChange={(v) => actualizar("comentarios", v)}
            error={errores.comentarios}
            filas={4}
            maximo={500}
            ayuda="Horarios en los que te va bien, restricciones de la comunidad, acceso al edificio… lo que creas que ayuda."
          />
        </Panel>

        {/* Paso 5 · Datos */}
        <Panel activo={paso === 4} reducido={reducido}>
          <div className="grid gap-6 sm:grid-cols-2">
            <CampoTexto
              className="sm:col-span-2"
              etiqueta="Nombre"
              nombre="ui-nombre"
              valor={datos.nombre}
              onChange={(v) => actualizar("nombre", v)}
              error={errores.nombre}
              requerido
              autoComplete="name"
              placeholder="Nombre y apellido"
            />
            <CampoTexto
              etiqueta="Teléfono o WhatsApp"
              nombre="ui-telefono"
              tipo="tel"
              inputMode="tel"
              valor={datos.telefono}
              onChange={(v) => actualizar("telefono", v)}
              error={errores.telefono}
              autoComplete="tel"
              placeholder="600 000 000"
            />
            <CampoTexto
              etiqueta="Email"
              nombre="ui-email"
              tipo="email"
              inputMode="email"
              valor={datos.email}
              onChange={(v) => actualizar("email", v)}
              error={errores.email}
              autoComplete="email"
              placeholder="tu@correo.com"
            />
          </div>

          <p className="mt-2 text-xs text-fg-muted/60">
            Con uno de los dos me basta, pero si dejas los dos es más fácil localizarte.
          </p>

          <div className="mt-8">
            <GrupoOpciones leyenda="¿Cómo nos conociste?" columnas={3}>
              {opcionesOrigen.map((opcion) => {
                const red = redesOrigen[opcion];
                return (
                  <OpcionRadio
                    key={opcion}
                    nombre="ui-origen"
                    valor={opcion}
                    seleccionado={datos.origen === opcion}
                    onChange={(v) => actualizar("origen", v as Origen)}
                    titulo={etiquetasOrigen[opcion]}
                    icono={red ? <SocialIcon red={red} className="h-4 w-4" /> : undefined}
                  />
                );
              })}
            </GrupoOpciones>
          </div>

          {/* RGPD: obligatoria y nunca premarcada */}
          <div className="mt-8">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={datos.privacidad}
                onChange={(e) => actualizar("privacidad", e.target.checked)}
                aria-invalid={Boolean(errores.privacidad)}
                aria-describedby="error-privacidad"
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#2F4AA0]"
              />
              <span className="text-sm text-fg-muted">
                He leído y acepto la{" "}
                <Link
                  href="/politica-de-privacidad"
                  className="text-fg underline underline-offset-4 hover:text-brand-orange"
                >
                  política de privacidad
                </Link>
                . Tus datos se usan solo para responderte a esta solicitud.
              </span>
            </label>
            <p id="error-privacidad" aria-live="polite">
              {errores.privacidad ? (
                <span className="mt-2 block text-sm text-brand-orange">
                  {errores.privacidad}
                </span>
              ) : null}
            </p>
          </div>
        </Panel>
      </div>

      {/* Error global del servidor */}
      <div aria-live="assertive">
        {estado.estado === "error" ? (
          <p className="mt-8 rounded-[2px] border border-brand-orange/50 bg-brand-orange/10 p-4 text-sm text-brand-orange">
            {estado.mensaje}
          </p>
        ) : null}
      </div>

      {/* Navegación */}
      <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <span className={paso === 0 ? "hidden sm:block sm:invisible" : ""}>
          <Button
            type="button"
            variante="secundario"
            onClick={retroceder}
            disabled={paso === 0 || pendiente}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Atrás
          </Button>
        </span>

        {ultimo ? (
          <Button type="submit" tamano="lg" disabled={pendiente}>
            {pendiente ? "Enviando…" : "Enviar solicitud"}
            <Send className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button type="button" tamano="lg" onClick={avanzar}>
            Continuar
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </form>
  );
}

/**
 * Panel de paso.
 *
 * Los cinco pasos permanecen montados (así el formulario conserva su estado y
 * los datos viajan completos), pero los inactivos quedan ocultos e `inert`,
 * de modo que ni el teclado ni un lector de pantalla llegan a ellos.
 * Solo se animan `opacity` y `transform`.
 */
function Panel({
  activo,
  reducido,
  children,
}: {
  activo: boolean;
  reducido: boolean | null;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      hidden={!activo}
      inert={!activo}
      initial={false}
      animate={activo ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
      transition={{ duration: reducido ? 0.15 : 0.4, ease: EASE_BRAND }}
    >
      {children}
    </motion.div>
  );
}
