export type HitoTrayectoria = {
  anio: string;
  titulo: string;
  detalle: string;
};

/** Trayectoria literal facilitada por Alex. No añadir hitos no confirmados. */
export const trayectoria: HitoTrayectoria[] = [
  {
    anio: "2012",
    titulo: "Empiezo desde cero",
    detalle:
      "Empiezo trabajando como peón de obra, aprendiendo desde dentro cómo funciona realmente una obra.",
  },
  {
    anio: "2015",
    titulo: "Aprendizaje en obra",
    detalle:
      "Empiezo a interesarme por el mundo de las instalaciones y comienzo a aprender electricidad, fontanería y climatización directamente en obra.",
  },
  {
    anio: "2018",
    titulo: "Especialización profesional",
    detalle:
      "Decido apostar por el sector de las instalaciones y obtengo certificaciones como RBT, RITE y carnet de gas.",
  },
  {
    anio: "2021",
    titulo: "Nace Z Solutions",
    detalle:
      "Creo mi marca Z Solutions, enfocada en desarrollar soluciones prácticas y apoyar a profesionales del sector.",
  },
  {
    anio: "2024",
    titulo: "Formación para profesionales",
    detalle:
      "Empiezo a compartir mi experiencia formando a instaladores que quieren elevar su nivel y trabajar de forma más profesional.",
  },
];

/** Bio literal facilitada por Alex. No reescribir. */
export const bioAlex =
  "Soy un profesional afincado en Barcelona, especializado en Electricidad, Fontanería, Climatización y Trabajos Verticales. Conozco el oficio desde abajo y mi misión es profesionalizar el sector. Ofrezco formación práctica real y desarrollo herramientas que resuelven los problemas que yo mismo he enfrentado en la obra durante años.";
