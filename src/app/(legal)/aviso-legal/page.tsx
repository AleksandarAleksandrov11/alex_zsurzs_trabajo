import type { Metadata } from "next";
import { DocumentoLegal } from "@/components/sections/DocumentoLegal";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaMigas } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import { avisoLegal } from "@/content/legal";

const migas = [{ label: "Aviso legal", href: "/aviso-legal" }];

export const metadata: Metadata = crearMetadata({
  title: "Aviso legal | ZSolutions",
  description:
    "Datos identificativos del titular, condiciones de uso, propiedad intelectual y responsabilidad del sitio web de ZSolutions.",
  path: "/aviso-legal",
});

export default function AvisoLegalPage() {
  return (
    <>
      <JsonLd datos={schemaMigas(migas)} />
      <DocumentoLegal
        titulo="Aviso legal"
        entradilla="Información exigida por la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), y condiciones de uso de este sitio web."
        actualizado={avisoLegal.actualizado}
        secciones={avisoLegal.secciones}
        migas={migas}
        conFichaTitular
      />
    </>
  );
}
