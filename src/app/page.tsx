import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { ZonesMap } from "@/components/sections/ZonesMap";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Certifications } from "@/components/sections/Certifications";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaFaq } from "@/lib/schema";
import { crearMetadata } from "@/lib/seo";
import { faqHome } from "@/content/faq";

export const metadata: Metadata = crearMetadata({
  title: "Electricista y lampista en Barcelona | ZSolutions",
  description:
    "Instalador certificado en Barcelona: electricidad, fontanería, climatización, aerotermia y trabajos verticales. Presupuesto en menos de 24 horas.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd datos={schemaFaq(faqHome)} />

      <Hero
        completo
        conBarraConfianza
        eyebrow="Instalador certificado · Barcelona y Cataluña"
        lineas={["Instalaciones", "certificadas", "en Barcelona"]}
        descripcion="Electricidad, fontanería, climatización, aerotermia y trabajos verticales. Ejecutado y firmado por un instalador con carnet, no vendido por un intermediario que subcontrata la obra."
        foto={{
          nombre: "alex-cubierta-barcelona",
          alt: "",
          posicion: "68% 28%",
        }}
      />

      <ServicesGrid numero="01" />
      <WhyUs numero="02" />
      <ZonesMap numero="03" />
      <ProjectsSection numero="04" />
      <AboutTeaser numero="05" />
      <Certifications numero="06" />
      <FAQ preguntas={faqHome} numero="07" />
      <CTASection />
    </>
  );
}
