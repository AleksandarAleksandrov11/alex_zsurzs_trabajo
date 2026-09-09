import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const revalidate = 86400;

const AZUL = "#2F4AA0";
const AZUL_PROFUNDO = "#23366F";
const NARANJA = "#FF7A1A";
const FONDO = "#0F0F10";

/**
 * Righteous se lee del propio repositorio, no de Google Fonts.
 *
 * Depender de una descarga externa en tiempo de ejecución significaba que
 * cualquier corte de red dejaba las miniaturas sociales con la tipografía por
 * defecto, y añadía latencia en cada arranque en frío. El archivo va incluido
 * en el paquete mediante `outputFileTracingIncludes` en `next.config.ts`.
 *
 * Righteous se distribuye bajo licencia SIL Open Font License 1.1.
 */
let cache: Buffer | null = null;

async function cargarRighteous(): Promise<Buffer | null> {
  if (cache) return cache;
  try {
    cache = await readFile(
      path.join(process.cwd(), "src/app/api/og/Righteous-Regular.ttf"),
    );
    return cache;
  } catch (error) {
    console.error("[og] No se ha podido leer la tipografía", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const titulo = (searchParams.get("t") ?? site.nombre).slice(0, 90);
  const subtitulo = (searchParams.get("s") ?? site.descripcionCorta).slice(0, 140);

  const righteous = await cargarRighteous();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: FONDO,
          backgroundImage: `radial-gradient(90% 70% at 78% 8%, ${AZUL_PROFUNDO} 0%, transparent 62%)`,
          padding: "64px 72px",
          color: "#fff",
          fontFamily: righteous ? "Righteous" : "sans-serif",
        }}
      >
        {/* Retícula técnica */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.045) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Cabecera de marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="58" height="46" viewBox="0 0 120 96" fill="#fff">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 8h72v14L40 70h40v14H8V70l40-48H8V8Zm50 22L42 50h8l-11 15 20-22h-9l8-11Z"
            />
            <path d="M86 30h26v9H86z" />
            <path d="M86 47h18v9H86z" opacity=".6" />
          </svg>
          <div style={{ display: "flex", fontSize: 40, letterSpacing: "-0.02em" }}>
            {site.nombre}
          </div>
        </div>

        {/* Titular */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div
            style={{
              display: "flex",
              fontSize: titulo.length > 52 ? 62 : 76,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {titulo}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 28,
              lineHeight: 1.4,
              color: "#E6E6E6",
              fontFamily: "sans-serif",
              maxWidth: 900,
            }}
          >
            {subtitulo}
          </div>
        </div>

        {/* Pie con barra de confianza */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", width: 120, height: 8, background: AZUL }} />
          <div style={{ display: "flex", width: 44, height: 8, background: NARANJA }} />
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#E6E6E6",
              fontFamily: "sans-serif",
              letterSpacing: "0.12em",
            }}
          >
            REBT · RITE · F-GAS · IRATA 3 · BARCELONA
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: righteous
        ? [
            {
              name: "Righteous",
              data: righteous as unknown as ArrayBuffer,
              style: "normal",
              weight: 400,
            },
          ]
        : [],
    },
  );
}
