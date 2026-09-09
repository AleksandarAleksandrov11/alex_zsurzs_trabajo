export type GrupoCertificacion =
  | "oficiales"
  | "tecnica"
  | "seguridad"
  | "verticales"
  | "maquinaria";

export type Certificacion = {
  id: string;
  nombre: string;
  siglas: string;
  grupo: GrupoCertificacion;
  detalle: string;
};

export const gruposCertificacion: {
  id: GrupoCertificacion;
  titulo: string;
  descripcion: string;
}[] = [
  {
    id: "oficiales",
    titulo: "Certificaciones oficiales",
    descripcion:
      "Habilitaciones que permiten ejecutar, firmar y legalizar instalaciones. Son las que decide la administración, no el marketing.",
  },
  {
    id: "tecnica",
    titulo: "Especialización técnica",
    descripcion:
      "Formación específica sobre los sistemas que instalo a diario, más allá del mínimo exigido para ejercer.",
  },
  {
    id: "seguridad",
    titulo: "Seguridad y emergencias",
    descripcion:
      "Formación sanitaria y de intervención. En espacios confinados y en altura, el plan de rescate es parte del trabajo, no un anexo.",
  },
  {
    id: "verticales",
    titulo: "Trabajos verticales y rescate",
    descripcion:
      "Titulaciones internacionales de acceso por cuerda. El Nivel 3 es el grado de técnico supervisor, habilitado para dirigir equipos y ejecutar rescates.",
  },
  {
    id: "maquinaria",
    titulo: "Maquinaria y obra",
    descripcion:
      "Habilitaciones de obra que permiten trabajar de forma autónoma y asumir responsabilidad preventiva en el tajo.",
  },
];

export const certificaciones: Certificacion[] = [
  /* --- Oficiales --- */
  {
    id: "rebt",
    nombre: "Carnet de Electricista Especialista",
    siglas: "REBT",
    grupo: "oficiales",
    detalle:
      "Habilitación de instalador en baja tensión en categoría especialista. Permite ejecutar y firmar instalaciones eléctricas y emitir el certificado de instalación (CIE).",
  },
  {
    id: "rite",
    nombre: "Carnet de Instalador RITE",
    siglas: "RITE",
    grupo: "oficiales",
    detalle:
      "Habilitación para instalaciones térmicas en edificios: climatización, calefacción, ventilación y agua caliente sanitaria, incluido su mantenimiento.",
  },
  {
    id: "fgas",
    nombre: "Carnet de Gases Fluorados",
    siglas: "F-Gas",
    grupo: "oficiales",
    detalle:
      "Habilitación legal para manipular refrigerantes: detección de fugas, recuperación y carga de gas en circuitos frigoríficos.",
  },
  {
    id: "asesor-energetico",
    nombre: "Asesor Energético Especializado",
    siglas: "Energía",
    grupo: "oficiales",
    detalle:
      "Formación en eficiencia energética aplicada a instalaciones: análisis de consumos, dimensionado y criterios reales de ahorro.",
  },

  /* --- Especialización técnica --- */
  {
    id: "aerotermia",
    nombre: "Sistemas de Aerotermia",
    siglas: "Aerotermia",
    grupo: "tecnica",
    detalle:
      "Diseño, instalación y puesta en marcha de bombas de calor aerotérmicas para calefacción, refrigeración y agua caliente sanitaria.",
  },
  {
    id: "fontaneria",
    nombre: "Instalaciones de Fontanería y Agua",
    siglas: "Agua",
    grupo: "tecnica",
    detalle:
      "Formación específica en redes de agua fría y caliente, evacuación, presión y materiales de instalación.",
  },
  {
    id: "conductos",
    nombre: "Sistemas de Conductos y Ventilación",
    siglas: "Conductos",
    grupo: "tecnica",
    detalle:
      "Dimensionado y montaje de redes de conductos, difusión de aire y ventilación mecánica.",
  },
  {
    id: "soldadura",
    nombre: "Soldadura Blanda y Soldadura Fuerte",
    siglas: "Soldadura",
    grupo: "tecnica",
    detalle:
      "Ejecución de uniones por soldadura blanda y fuerte, imprescindible en líneas frigoríficas y en instalaciones de cobre a presión.",
  },

  /* --- Seguridad y emergencias --- */
  {
    id: "phtls-naemt",
    nombre: "PHTLS",
    siglas: "NAEMT",
    grupo: "seguridad",
    detalle:
      "Soporte vital prehospitalario en trauma según el estándar de la NAEMT, aplicado a la atención al accidentado antes de la llegada de los servicios de emergencia.",
  },
  {
    id: "phtls-ivsas",
    nombre: "PHTLS",
    siglas: "IVSAS",
    grupo: "seguridad",
    detalle:
      "Formación en soporte vital prehospitalario en trauma acreditada por IVSAS, orientada a intervención en entornos de trabajo.",
  },
  {
    id: "espacios-confinados",
    nombre: "Rescate en Espacios Confinados",
    siglas: "IVSAS",
    grupo: "seguridad",
    detalle:
      "Procedimientos de entrada, vigilancia y rescate en recintos con atmósfera potencialmente peligrosa y salida limitada.",
  },
  {
    id: "agente-descargo",
    nombre: "Agente de Descargo",
    siglas: "Descargo",
    grupo: "seguridad",
    detalle:
      "Habilitación para realizar maniobras de descargo y consignación de instalaciones eléctricas antes de intervenir sobre ellas.",
  },

  /* --- Trabajos verticales y rescate --- */
  {
    id: "irata-3",
    nombre: "IRATA Level 3",
    siglas: "IRATA 3",
    grupo: "verticales",
    detalle:
      "Nivel de técnico supervisor en acceso por cuerda: montaje de sistemas complejos, dirección de equipos y planificación y ejecución de rescate.",
  },
  {
    id: "itra-3",
    nombre: "ITRA Level 3",
    siglas: "ITRA 3",
    grupo: "verticales",
    detalle:
      "Titulación internacional de acceso por cuerda de nivel supervisor, equivalente en alcance de responsabilidad al nivel 3 de IRATA.",
  },
  {
    id: "itra-confined",
    nombre: "ITRA Confined Spaces Level 3",
    siglas: "ITRA CS3",
    grupo: "verticales",
    detalle:
      "Especialización de nivel supervisor en espacios confinados: acceso, aseguramiento, vigilancia y rescate en recintos cerrados.",
  },

  /* --- Maquinaria y obra --- */
  {
    id: "recurso-preventivo",
    nombre: "Recurso Preventivo",
    siglas: "60 h",
    grupo: "maquinaria",
    detalle:
      "Formación de 60 horas que habilita para ejercer como recurso preventivo en obra, vigilando el cumplimiento de las medidas de seguridad.",
  },
  {
    id: "pemp",
    nombre: "Operador de PEMP",
    siglas: "PEMP",
    grupo: "maquinaria",
    detalle:
      "Manejo de plataformas elevadoras móviles de personal, alternativa al acceso por cuerda cuando el entorno lo permite.",
  },
  {
    id: "carretilla",
    nombre: "Operador de Carretilla Elevadora",
    siglas: "Carretilla",
    grupo: "maquinaria",
    detalle:
      "Manejo de carretilla elevadora para movimiento de material en obra e industria.",
  },
  {
    id: "grua",
    nombre: "Operador de Grúa",
    siglas: "Grúa",
    grupo: "maquinaria",
    detalle:
      "Manejo de grúa para izado y posicionamiento de cargas en obra.",
  },
];

export function certificacionesPorGrupo(grupo: GrupoCertificacion) {
  return certificaciones.filter((c) => c.grupo === grupo);
}

export function getCertificaciones(ids: string[]): Certificacion[] {
  return ids
    .map((id) => certificaciones.find((c) => c.id === id))
    .filter((c): c is Certificacion => Boolean(c));
}
