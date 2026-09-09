import type { Metadata } from "next";
import { DocumentoLegal } from "@/components/sections/DocumentoLegal";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaMigas } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import { politicaPrivacidad } from "@/content/legal";

const migas = [{ label: "Política de privacidad", href: "/politica-de-privacidad" }];

export const metadata: Metadata = crearMetadata({
  title: "Política de privacidad | ZSolutions",
  description:
    "Cómo se tratan tus datos personales en ZSolutions: finalidad, base legítima, plazos de conservación, destinatarios y ejercicio de derechos.",
  path: "/politica-de-privacidad",
});

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <JsonLd datos={schemaMigas(migas)} />
      <DocumentoLegal
        titulo="Política de privacidad"
        entradilla="Cómo trato los datos que me facilitas, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD). En resumen: solo se usan para responderte, y no se ceden a nadie."
        actualizado={politicaPrivacidad.actualizado}
        secciones={politicaPrivacidad.secciones}
        migas={migas}
        conFichaTitular
        conEncargados
      />
    </>
  );
}
