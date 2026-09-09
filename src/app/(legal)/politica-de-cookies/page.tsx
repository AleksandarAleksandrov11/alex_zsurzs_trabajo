import type { Metadata } from "next";
import { DocumentoLegal } from "@/components/sections/DocumentoLegal";
import { TablaCookies } from "@/components/sections/TablaCookies";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaMigas } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import { politicaCookies } from "@/content/legal";

const migas = [{ label: "Política de cookies", href: "/politica-de-cookies" }];

export const metadata: Metadata = crearMetadata({
  title: "Política de cookies | ZSolutions",
  description:
    "Qué se almacena en tu dispositivo al visitar ZSolutions, con qué finalidad, durante cuánto tiempo y cómo cambiar tu decisión cuando quieras.",
  path: "/politica-de-cookies",
});

export default function PoliticaCookiesPage() {
  return (
    <>
      <JsonLd datos={schemaMigas(migas)} />
      <DocumentoLegal
        titulo="Política de cookies"
        entradilla="Esta web se ha diseñado para almacenar lo mínimo en tu dispositivo. Aquí tienes el detalle de qué se guarda, para qué, cuánto dura y cómo cambiarlo."
        actualizado={politicaCookies.actualizado}
        secciones={politicaCookies.secciones}
        migas={migas}
      >
        <TablaCookies />
      </DocumentoLegal>
    </>
  );
}
