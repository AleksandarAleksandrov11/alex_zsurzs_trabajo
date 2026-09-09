import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { site } from "@/content/site";
import { RIGHTEOUS_BASE64 } from "./righteous";

/**
 * Runtime edge, no Node.
 *
 * `next/og` arrastra binarios WebAssembly (Satori y resvg). En el runtime de
 * Node hay que trazarlos y copiarlos dentro de la función, que es justo la
 * fase en la que fallaba el despliegue. En edge van integrados en el propio
 * runtime: es además la configuración para la que está pensado `next/og`.
 *
 * Sin `revalidate`: es una ruta dinámica que depende de la query. La caché se
 * controla con la cabecera de la respuesta, que es lo que lee el CDN.
 */
export const runtime = "edge";

const AZUL = "#2F4AA0";
const AZUL_PROFUNDO = "#23366F";
const NARANJA = "#FF7A1A";
const FONDO = "#0F0F10";

/**
 * Righteous va incrustada en el propio módulo, en base64.
 *
 * Antes se leía del disco, lo que obligaba a declararla en
 * `outputFileTracingIncludes`. El build terminaba bien, pero Vercel fallaba
 * justo después, al ensamblar la función a partir de las trazas. Incrustada
 * no hay ni sistema de archivos ni trazas de por medio.
 *
 * Se decodifica una sola vez por instancia.
 */
let cache: ArrayBuffer | null = null;

function cargarRighteous(): ArrayBuffer | null {
  if (cache) return cache;
  try {
    const binario = atob(RIGHTEOUS_BASE64);
    const bytes = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
    cache = bytes.buffer;
    return cache;
  } catch (error) {
    /* Sin tipografía de marca la imagen se genera igual, con la de sistema. */
    console.error("[og] No se ha podido decodificar la tipografía", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const titulo = (searchParams.get("t") ?? site.nombre).slice(0, 90);
  const subtitulo = (searchParams.get("s") ?? site.descripcionCorta).slice(0, 140);

  const righteous = cargarRighteous();

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
      /* Un año en el CDN: la imagen solo depende de la query, que cambia con
         el título. En el navegador no se cachea, para poder invalidarla. */
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=31536000, immutable",
      },
      fonts: righteous
        ? [
            { name: "Righteous", data: righteous, style: "normal", weight: 400 },
          ]
        : [],
    },
  );
}
