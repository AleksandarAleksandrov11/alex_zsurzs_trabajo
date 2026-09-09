import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ESLint no se ejecuta durante el build.
     No es dejadez: `next build` lo lanza por defecto, y su resolutor de
     importaciones depende de un módulo nativo (`unrs-resolver`) que según la
     versión de pnpm del proveedor puede quedarse sin compilar. Eso tumba un
     despliegue por un motivo que no tiene nada que ver con el código. El lint
     sigue siendo obligatorio, pero donde corresponde: `pnpm lint`, que además
     forma parte de `pnpm auditar`. */
  eslint: {
    ignoreDuringBuilds: true,
  },

  /* La comprobación de tipos sí se mantiene en el build: un error de tipos es
     un error de verdad y hasta hoy no ha fallado ninguno. */
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    /* AVIF primero: en las fotos de obra ahorra en torno a un 40 % frente a
       JPEG con la misma calidad percibida. WebP queda de reserva. */
    formats: ["image/avif", "image/webp"],
    /* Los anchos por defecto de Next incluyen tamaños que aquí no se usan
       nunca; recortarlos reduce el número de variantes generadas. */
    deviceSizes: [390, 640, 828, 1080, 1200, 1600, 1920],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  /* Redirecciones permanentes.
     Van aquí y no en `vercel.json` para que funcionen igual en local y en
     producción, y para que las auditorías puedan comprobarlas. */
  async redirects() {
    return [
      { source: "/presupuesto", destination: "/contacto", permanent: true },
      { source: "/sobre-mi", destination: "/sobre-alex", permanent: true },
      {
        source: "/servicios/lampista",
        destination: "/servicios/lampisteria",
        permanent: true,
      },
      {
        source: "/servicios/aire-acondicionado",
        destination: "/servicios/climatizacion",
        permanent: true,
      },
      {
        source: "/servicios/trabajos-en-altura",
        destination: "/servicios/trabajos-verticales",
        permanent: true,
      },
      {
        source: "/zonas/hospitalet",
        destination: "/zonas/hospitalet-de-llobregat",
        permanent: true,
      },
    ];
  },

  /* Cabeceras de seguridad. La política de permisos desactiva lo que esta web
     no necesita; Vercel añade HSTS por su cuenta en el dominio. */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
