import type { Metadata, Viewport } from "next";
import { Righteous } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaNegocioLocal, schemaPersona, schemaWebSite } from "@/lib/schema";
import { BASE_URL, ES_INDEXABLE } from "@/lib/seo";
import { site } from "@/content/site";
import "./globals.css";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-righteous",
  fallback: ["Arial Black", "Impact", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Electricista y lampista en Barcelona | ZSolutions",
    template: `%s`,
  },
  description: site.descripcionCorta,
  applicationName: site.nombre,
  authors: [{ name: site.fundador, url: site.redes.webPersonal }],
  creator: site.fundador,
  publisher: site.nombre,
  formatDetection: { telephone: true, address: false, email: false },
  /* Mientras la web no esté en su dominio definitivo se publica en `noindex`,
     para no dejar indexada una dirección provisional que después competiría
     con el dominio bueno. Se activa sola al definir `NEXT_PUBLIC_SITE_URL`. */
  robots: {
    index: ES_INDEXABLE,
    follow: true,
    googleBot: {
      index: ES_INDEXABLE,
      follow: true,
      "max-image-preview": "large",
    },
  },
  /* TODO (Alex): pegar aquí el código de verificación de Google Search Console.
     verification: { google: "…" }, */
};

export const viewport: Viewport = {
  themeColor: "#0F0F10",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={righteous.variable}>
      <body className="grano min-h-dvh bg-bg text-fg antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-[2px] focus:bg-brand-blue focus:px-4 focus:py-3 focus:text-sm focus:text-white"
        >
          Saltar al contenido principal
        </a>

        <JsonLd datos={[schemaNegocioLocal(), schemaPersona(), schemaWebSite()]} />

        <Header />
        <main id="contenido">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />

        <WhatsAppFloat />
        <CookieBanner />

        {/* Analítica sin cookies: se considera esencial y se documenta en la
            política de cookies. Los scripts que sí requieran consentimiento
            deben envolverse en <ConsentGate>. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
