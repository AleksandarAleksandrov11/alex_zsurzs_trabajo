import { site } from "./site";

export const formacion = {
  h1: "Formación para instaladores",
  claim: "Lo que se aprende en obra, explicado por alguien que sigue en obra.",
  entradilla:
    "Desde 2024 comparto mi experiencia con instaladores que quieren elevar su nivel y trabajar de forma más profesional. No es formación de aula: es lo que he aprendido resolviendo instalaciones reales desde 2012, con los errores incluidos.",
  cuerpo: [
    "El sector tiene un problema de transmisión de conocimiento. Se aprende mirando a quien tienes al lado, y si quien tienes al lado hace las cosas regular, aprendes a hacerlas regular. Yo empecé así, como peón de obra en 2012, y tardé años en desaprender cosas que había dado por buenas simplemente porque nadie me había explicado por qué se hacían de otra manera.",
    "Lo que enseño es lo que me habría ahorrado esos años: criterio para decidir, no recetas para copiar. Por qué se dimensiona un circuito como se dimensiona, cómo se diagnostica una avería midiendo en lugar de sustituyendo, qué mira una inspección, cómo se documenta un trabajo para que el cliente entienda lo que ha pagado, y cómo se presupuesta sin regalar horas ni inflar partidas.",
    "También hay una parte que casi nadie enseña y que decide si un instalador vive bien de esto o no: cómo tratar con el cliente, cómo explicar lo técnico sin condescendencia, cómo decir que no a un trabajo que no te corresponde y cómo construir una reputación que traiga trabajo sin depender de portales de captación.",
    "Y desarrollo herramientas que resuelven problemas concretos de obra, los mismos que me he encontrado yo durante años. La idea es simple: si algo me ha costado tiempo o dinero descubrir, prefiero que a ti no te cueste lo mismo.",
  ],
  bloques: [
    {
      titulo: "Criterio técnico",
      detalle:
        "Dimensionado, diagnóstico por medición y normativa aplicada a la obra real, no a un examen. El porqué detrás de cada decisión.",
    },
    {
      titulo: "Documentación y certificación",
      detalle:
        "Qué documentos genera cada instalación, cómo se emiten y por qué entregarlos bien cambia la relación con el cliente.",
    },
    {
      titulo: "Trato con cliente y presupuestos",
      detalle:
        "Cómo explicar lo técnico, cómo valorar un trabajo sin regalar horas y cómo construir reputación sin depender de portales.",
    },
    {
      titulo: "Herramientas de obra",
      detalle:
        "Recursos y herramientas desarrollados a partir de problemas reales encontrados en instalación durante más de diez años.",
    },
  ],
  /** La formación y los productos viven en el proyecto hermano. */
  enlaceTienda: site.tienda,
  ctaTienda: "Ver formación y herramientas",
  nota:
    "La formación y las herramientas se gestionan desde el proyecto personal de Alex Zsurzs, fuera de esta web de servicios.",
} as const;
