import { site } from "@/content/site";
import { certificaciones } from "@/content/certificaciones";
import { servicios, type Servicio } from "@/content/servicios";
import { zonas, type Zona } from "@/content/zonas";
import type { ParFaq } from "@/content/servicios";
import { BASE_URL } from "@/lib/seo";

export type JsonLdObjeto = Record<string, unknown>;

const ID_NEGOCIO = `${BASE_URL}/#negocio`;
const ID_PERSONA = `${BASE_URL}/#alex-zsurzs`;
const ID_WEB = `${BASE_URL}/#website`;

/** Quita las claves cuyo valor es null o undefined, para no publicar huecos. */
function limpio(objeto: JsonLdObjeto): JsonLdObjeto {
  return Object.fromEntries(
    Object.entries(objeto).filter(([, v]) => v !== null && v !== undefined),
  );
}

/**
 * LocalBusiness principal. Tipo `Electrician` con `additionalType` para
 * climatización, que es como Google entiende un negocio multiservicio.
 *
 * Los campos de NAP que aún son `null` NO se emiten: es preferible un schema
 * incompleto a uno con datos inventados que no coincidan con el Perfil de
 * Empresa de Google.
 */
export function schemaNegocioLocal(): JsonLdObjeto {
  const direccion = limpio({
    "@type": "PostalAddress",
    streetAddress: site.nap.calle,
    postalCode: site.nap.codigoPostal,
    addressLocality: site.nap.ciudad,
    addressRegion: site.nap.provincia,
    addressCountry: site.nap.pais,
  });

  return limpio({
    "@context": "https://schema.org",
    "@type": ["Electrician", "HVACBusiness", "Plumber"],
    "@id": ID_NEGOCIO,
    name: site.nombre,
    legalName: site.nap.razonSocial,
    alternateName: site.nombreCompleto,
    description: site.descripcionCorta,
    url: BASE_URL,
    telephone: site.nap.telefono,
    email: site.nap.email,
    vatID: site.nap.nif,
    priceRange: site.priceRange,
    currenciesAccepted: "EUR",
    address: direccion,
    geo: site.nap.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: site.nap.geo.lat,
          longitude: site.nap.geo.lng,
        }
      : undefined,
    openingHours: site.nap.horario,
    founder: { "@id": ID_PERSONA },
    employee: { "@id": ID_PERSONA },
    areaServed: zonas.map((zona) => ({
      "@type": "City",
      name: zona.ciudad,
      containedInPlace: { "@type": "AdministrativeArea", name: zona.comarca },
    })),
    knowsAbout: servicios.map((servicio) => servicio.nombre),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de instalación",
      itemListElement: servicios.map((servicio) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: servicio.nombre,
          description: servicio.claim,
          url: `${BASE_URL}/servicios/${servicio.slug}`,
        },
      })),
    },
    sameAs: [site.redes.instagram, site.redes.tiktok, site.redes.youtube],
  });
}

export function schemaPersona(): JsonLdObjeto {
  return limpio({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ID_PERSONA,
    name: site.fundador,
    jobTitle: "Instalador certificado y formador",
    description:
      "Instalador especializado en electricidad, fontanería, climatización y trabajos verticales, afincado en Barcelona.",
    url: `${BASE_URL}/sobre-alex`,
    worksFor: { "@id": ID_NEGOCIO },
    homeLocation: { "@type": "Place", name: `${site.nap.ciudad}, ${site.nap.comunidad}` },
    hasCredential: certificaciones.map((certificacion) => ({
      "@type": "EducationalOccupationalCredential",
      name: certificacion.nombre,
      credentialCategory: certificacion.siglas,
    })),
    sameAs: [
      site.redes.instagram,
      site.redes.tiktok,
      site.redes.youtube,
      site.redes.webPersonal,
    ],
  });
}

export function schemaWebSite(): JsonLdObjeto {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ID_WEB,
    url: BASE_URL,
    name: site.nombre,
    inLanguage: "es-ES",
    publisher: { "@id": ID_NEGOCIO },
  };
}

export function schemaServicio(servicio: Servicio): JsonLdObjeto {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servicio.nombre,
    serviceType: servicio.nombre,
    description: servicio.descriptionSeo,
    url: `${BASE_URL}/servicios/${servicio.slug}`,
    provider: { "@id": ID_NEGOCIO },
    areaServed: zonas.map((zona) => ({ "@type": "City", name: zona.ciudad })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Trabajos de ${servicio.nombre.toLowerCase()}`,
      itemListElement: servicio.incluye.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.titulo, description: item.detalle },
      })),
    },
  };
}

export function schemaZona(zona: Zona): JsonLdObjeto {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Instalaciones en ${zona.ciudad}`,
    description: zona.descriptionSeo,
    url: `${BASE_URL}/zonas/${zona.slug}`,
    provider: { "@id": ID_NEGOCIO },
    areaServed: {
      "@type": "City",
      name: zona.ciudad,
      containedInPlace: { "@type": "AdministrativeArea", name: zona.comarca },
    },
  };
}

export function schemaFaq(preguntas: ParFaq[]): JsonLdObjeto {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map((par) => ({
      "@type": "Question",
      name: par.p,
      acceptedAnswer: { "@type": "Answer", text: par.r },
    })),
  };
}

export function schemaMigas(migas: { label: string; href: string }[]): JsonLdObjeto {
  const completo = [{ label: "Inicio", href: "/" }, ...migas];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: completo.map((miga, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: miga.label,
      item: `${BASE_URL}${miga.href === "/" ? "" : miga.href}`,
    })),
  };
}
