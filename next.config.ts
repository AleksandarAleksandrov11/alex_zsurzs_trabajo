import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
