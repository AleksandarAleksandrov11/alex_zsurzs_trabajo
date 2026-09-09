import type { ParFaq } from "./servicios";

export type ServicioDemandado = {
  /** slug de `servicios.ts` */
  slug: string;
  motivo: string;
};

export type Zona = {
  slug: string;
  ciudad: string;
  /** Cómo se nombra en titulares y breadcrumbs. */
  nombreLargo: string;
  comarca: string;
  /** < 60 caracteres */
  titleSeo: string;
  /** < 155 caracteres */
  descriptionSeo: string;
  h1: string;
  claim: string;
  entradilla: string;
  /** Análisis real del parque edificado y de sus problemas de instalación. */
  cuerpo: string[];
  serviciosDemandados: ServicioDemandado[];
  desplazamiento: string;
  /** Barrios, distritos o municipios vecinos que entran en la misma salida. */
  cubre: string[];
  barrios?: { nombre: string; detalle: string }[];
  faq: ParFaq[];
  /** Aparece en el mapa de la home. */
  destacada: boolean;
};

export const zonas: Zona[] = [
  /* ================================================================ */
  {
    slug: "barcelona",
    ciudad: "Barcelona",
    nombreLargo: "Barcelona ciudad",
    comarca: "Barcelonès",
    titleSeo: "Electricista y lampista en Barcelona | ZSolutions",
    descriptionSeo:
      "Instalador certificado en Barcelona ciudad: electricidad, fontanería, climatización y trabajos verticales en los diez distritos. Presupuesto en 24 h.",
    h1: "Instalaciones en Barcelona ciudad",
    claim: "Los diez distritos, con el criterio que exige cada tipo de finca.",
    entradilla:
      "Barcelona no es un parque edificado, son varios superpuestos. Una finca de 1890 en Ciutat Vella, un edificio del ensanche de 1920, un bloque de los sesenta en Nou Barris y una promoción reciente en Sant Martí plantean problemas de instalación completamente distintos, y tratarlos igual es la raíz de la mayoría de las chapuzas que acabo reparando.",
    cuerpo: [
      "En el Eixample y en las fincas de finales del XIX y principios del XX el condicionante es el edificio: patios de luces estrechos, montantes que se han ido parcheando durante un siglo, techos altos que complican el trazado y comunidades con normas sobre lo que puede y no puede colgarse en la fachada o en el patio. En electricidad, lo habitual es encontrar instalaciones sin toma de tierra útil y cuadros que se quedaron cortos hace veinte años. En climatización, el reto casi nunca es la máquina: es dónde ubicar legalmente la unidad exterior y cómo llevar la línea hasta ella sin destrozar una escalera protegida.",
      "En los barrios de bloque de los años cincuenta a setenta, de Nou Barris a la Verneda pasando por buena parte de Sant Andreu y Horta-Guinardó, el problema cambia de naturaleza. Aquí las instalaciones se hicieron rápido y baratas: secciones de cable justas, ausencia de circuitos separados, tuberías de hierro galvanizado que llevan décadas estrangulándose por dentro y bajantes de fibrocemento en muchos casos. Son viviendas donde una renovación bien hecha del cuadro y de los circuitos críticos cambia por completo la seguridad de la casa, y donde el diagnóstico previo evita gastar en lo que no toca.",
      "En la zona alta (Sarrià-Sant Gervasi, Les Corts, parte de Gràcia) aparece otro perfil: viviendas grandes, más superficie a climatizar, instalaciones de calefacción antiguas por radiadores y clientes que se plantean el paso a aerotermia. Ahí el trabajo empieza con un cálculo honesto de demanda y con la revisión de los emisores existentes, porque conectar una bomba de calor a radiadores de alta temperatura es la forma más rápida de que el sistema decepcione.",
      "En Ciutat Vella, la variable es el acceso. Calles estrechas donde no entra maquinaria, patios interiores imposibles y fachadas protegidas donde no se puede montar andamio sin un procedimiento largo. Es el escenario donde el acceso por cuerda deja de ser una alternativa y pasa a ser la única forma razonable de llegar al punto: sube el técnico, se resuelve la instalación o la reparación de fachada y se recoge el mismo día, sin ocupar la vía pública.",
      "Y en las promociones del frente marítimo y de Sant Martí, la conversación gira alrededor del mantenimiento: instalaciones relativamente nuevas pero expuestas a ambiente salino, con unidades exteriores en cubierta y en fachada que se degradan más rápido de lo que sus propietarios esperan. Un mantenimiento con criterio en ese entorno alarga la vida de los equipos varios años.",
    ],
    serviciosDemandados: [
      {
        slug: "electricidad",
        motivo:
          "Renovación de instalaciones antiguas, cuadros que se han quedado cortos y boletines para dar de alta el suministro tras una reforma.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Instalación de aire acondicionado en fincas donde la ubicación de la unidad exterior es el verdadero problema técnico y normativo.",
      },
      {
        slug: "trabajos-verticales",
        motivo:
          "Fachadas y patios de luces sin espacio para andamio, y paso de instalaciones por el exterior del edificio.",
      },
      {
        slug: "fontaneria",
        motivo:
          "Sustitución de montantes y derivaciones de hierro galvanizado o plomo en fincas anteriores a los años ochenta.",
      },
    ],
    desplazamiento:
      "Base de operaciones. Es la zona de respuesta más rápida y donde puedo encajar avisos cortos con más margen.",
    cubre: [
      "Los diez distritos de la ciudad",
      "Área metropolitana inmediata",
    ],
    barrios: [
      {
        nombre: "Eixample",
        detalle:
          "Fincas de principios del XX con montantes centenarios, patios estrechos y comunidades con criterio propio sobre la fachada.",
      },
      {
        nombre: "Gràcia",
        detalle:
          "Edificios bajos y estrechos, escaleras difíciles y mucha reforma de vivienda pequeña donde cada centímetro de trazado cuenta.",
      },
      {
        nombre: "Sarrià-Sant Gervasi",
        detalle:
          "Viviendas grandes con calefacción por radiadores y demanda creciente de aerotermia y climatización por conductos.",
      },
      {
        nombre: "Sants-Montjuïc",
        detalle:
          "Mezcla de finca antigua y bloque de los sesenta, con bastante local comercial en adecuación para actividad.",
      },
      {
        nombre: "Sant Martí",
        detalle:
          "Promociones recientes y rehabilitación industrial del 22@, con instalaciones expuestas a ambiente marino.",
      },
      {
        nombre: "Les Corts",
        detalle:
          "Bloques de los sesenta y setenta junto a vivienda de mayor superficie, con renovación de cuadros y climatización por conductos.",
      },
      {
        nombre: "Horta-Guinardó",
        detalle:
          "Topografía en pendiente, bloques de posguerra y patios complicados donde el acceso por cuerda resuelve mucho.",
      },
      {
        nombre: "Nou Barris",
        detalle:
          "Bloque de los sesenta con instalaciones eléctricas justas de origen y mucha comunidad con servicios generales por actualizar.",
      },
      {
        nombre: "Sant Andreu",
        detalle:
          "Casco antiguo de casas bajas junto a bloques de los setenta, con mucha reforma de vivienda familiar.",
      },
      {
        nombre: "Ciutat Vella",
        detalle:
          "Fachadas protegidas, calles sin acceso para maquinaria y patios interiores donde solo se llega por cuerda.",
      },
    ],
    faq: [
      {
        p: "¿Puedo poner aire acondicionado en una finca antigua del Eixample?",
        r: "Casi siempre sí, pero la parte difícil no es la máquina: es dónde va la unidad exterior y por dónde pasa la línea frigorífica. Hay que revisar los estatutos de la comunidad, la normativa municipal sobre fachadas y la viabilidad técnica del recorrido. En la visita compruebo qué ubicaciones son legalmente y técnicamente viables antes de que compres nada.",
      },
      {
        p: "Mi finca es de 1920 y el cuadro es original. ¿Hay que cambiarlo todo?",
        r: "El cuadro, casi con seguridad. Los circuitos, depende de lo que se encuentre al abrir una caja de registro y de si existe toma de tierra útil. Muchas veces la solución sensata es renovar cuadro y circuitos críticos (cocina, baño, tomas de fuerza) y conservar el alumbrado si está en buen estado. Se decide con mediciones de aislamiento, no a ojo.",
      },
      {
        p: "¿Trabajáis con comunidades de vecinos de Barcelona?",
        r: "Sí, y es una parte importante del trabajo en la ciudad: servicios generales, cuartos de contadores, alumbrado de escalera y garaje, y reparaciones de fachada y patio por acceso por cuerda. Entrego presupuesto desglosado por partidas para que se pueda llevar a junta y aprobar sin sorpresas.",
      },
    ],
    destacada: true,
  },

  /* ================================================================ */
  {
    slug: "hospitalet-de-llobregat",
    ciudad: "L'Hospitalet de Llobregat",
    nombreLargo: "L'Hospitalet de Llobregat",
    comarca: "Barcelonès",
    titleSeo: "Electricista y lampista en L'Hospitalet | ZSolutions",
    descriptionSeo:
      "Instalador certificado en L'Hospitalet de Llobregat: electricidad, fontanería, climatización y trabajos verticales. Presupuesto en menos de 24 h.",
    h1: "Instalaciones en L'Hospitalet de Llobregat",
    claim: "La ciudad más densa de Europa, con el parque de bloque que eso implica.",
    entradilla:
      "L'Hospitalet es una de las ciudades más densas de Europa, y esa densidad define el trabajo: mucho bloque de los años sesenta y setenta levantado deprisa para alojar a la inmigración industrial, con instalaciones que nacieron al mínimo y que hoy tienen que sostener una vida doméstica que no existía cuando se hicieron.",
    cuerpo: [
      "El parque de vivienda dominante en Collblanc, la Torrassa, Santa Eulàlia o Bellvitge es bloque de los sesenta y setenta: pisos compactos, techos bajos, patinillos estrechos y una instalación eléctrica original pensada para una nevera, una televisión y poco más. Hoy esas mismas viviendas tienen inducción, lavavajillas, secadora y aire acondicionado. El resultado son cuadros saturados, circuitos compartidos que no deberían compartirse y una toma de tierra que en muchos casos no existe o no es efectiva.",
      "En fontanería, el patrón se repite: hierro galvanizado en montantes y derivaciones, con décadas de incrustación que reducen el diámetro útil y producen esa combinación tan reconocible de baja presión y averías repetidas en el mismo tramo. Cuando aparece una fuga en una de estas instalaciones, sustituir el metro que ha fallado suele ser una tirita: lo que tiene sentido económico es replantear la derivación completa y dejarla con llaves de corte por estancia.",
      "Bellvitge y Gornal, con sus bloques altos, plantean además un tema de acceso. Las intervenciones en fachada, en patios y en las instalaciones exteriores de esos edificios se resuelven mucho mejor por acceso por cuerda que con andamio, sobre todo cuando el trabajo es puntual: sellado de juntas, sujeción de elementos, sustitución de luminarias o colocación de unidades exteriores de climatización.",
      "El otro gran bloque de trabajo en la ciudad es la comunidad de vecinos. Muchas fincas de esta época llegan ahora al momento en el que hay que actualizar servicios generales, cuartos de contadores y alumbrado de zonas comunes, y donde un mantenimiento con criterio evita las derramas de urgencia. Trabajo con presupuesto por partidas precisamente para que la junta pueda decidir con la información delante.",
      "L'Hospitalet tiene además una densidad comercial alta, con locales que cambian de actividad con frecuencia. Ahí lo habitual es la adecuación eléctrica para la apertura: potencia adaptada a la nueva actividad, alumbrado de emergencia, cableado ordenado en bandeja y el certificado de instalación que hace falta para poner el negocio en marcha.",
    ],
    serviciosDemandados: [
      {
        slug: "electricidad",
        motivo:
          "Renovación de cuadros saturados y de instalaciones sin toma de tierra en bloque de los sesenta y setenta.",
      },
      {
        slug: "fontaneria",
        motivo:
          "Sustitución de derivaciones de hierro galvanizado con baja presión y averías recurrentes.",
      },
      {
        slug: "lampisteria",
        motivo:
          "Mantenimiento de comunidades: servicios generales, alumbrado de escalera y garaje, y grupos de presión.",
      },
      {
        slug: "trabajos-verticales",
        motivo:
          "Intervenciones puntuales en los bloques altos de Bellvitge y Gornal sin necesidad de andamio.",
      },
    ],
    desplazamiento:
      "Continuidad urbana con Barcelona: acceso directo por Gran Via y Collblanc, con tiempos equivalentes a moverse dentro de la ciudad.",
    cubre: [
      "Centre",
      "Collblanc – la Torrassa",
      "Santa Eulàlia",
      "Bellvitge – Gornal",
      "Sant Josep",
      "La Florida – Pubilla Cases",
      "Can Serra",
    ],
    faq: [
      {
        p: "Mi piso de los setenta no tiene toma de tierra. ¿Se puede resolver?",
        r: "Sí, y es de los trabajos con mejor relación entre coste y seguridad. Se comprueba primero si el edificio dispone de puesta a tierra en el cuarto de contadores y en qué estado está; según el caso, se conecta la vivienda a la existente o se plantea la solución adecuada para el inmueble. Es el paso previo imprescindible para que los diferenciales protejan de verdad.",
      },
      {
        p: "Tengo poca presión de agua en un piso alto. ¿Hay solución sin obra grande?",
        r: "Depende del origen. Si la causa es una derivación estrangulada por incrustación, la única solución real es sustituir ese tramo, y en un bloque suele hacerse por el patinillo con obra acotada. Si el problema es de presión de red en las últimas plantas, la solución es un grupo de presión bien dimensionado. Lo importante es medir antes: instalar un grupo sobre una tubería obstruida no arregla nada.",
      },
      {
        p: "¿Podéis hacer la adecuación eléctrica de un local para abrir un negocio?",
        r: "Sí. Incluye el estudio de la potencia que va a necesitar la actividad, el cuadro con las protecciones adecuadas, el alumbrado de emergencia y señalización, el cableado ordenado y ampliable, y el certificado de instalación eléctrica firmado por instalador autorizado, que es lo que te van a pedir para la puesta en marcha.",
      },
    ],
    destacada: true,
  },

  /* ================================================================ */
  {
    slug: "badalona",
    ciudad: "Badalona",
    nombreLargo: "Badalona",
    comarca: "Barcelonès",
    titleSeo: "Electricista y lampista en Badalona | ZSolutions",
    descriptionSeo:
      "Instalador certificado en Badalona: electricidad, fontanería, climatización, aerotermia y trabajos verticales. Presupuesto en menos de 24 horas.",
    h1: "Instalaciones en Badalona",
    claim: "Del casco antiguo en pendiente al frente marítimo, cada zona pide otra cosa.",
    entradilla:
      "Badalona junta en pocos kilómetros tres realidades muy distintas: el casco antiguo en pendiente sobre el mar, los barrios de bloque de la expansión industrial y un frente marítimo de promoción más reciente. Cada una plantea un problema de instalación diferente, y el ambiente salino los agrava todos.",
    cuerpo: [
      "En Dalt la Vila y el centro histórico, el trabajo se parece al de un casco antiguo cualquiera: calles estrechas, edificios bajos con estructura antigua, escaleras que complican el acceso de material y fachadas donde montar andamio es un trámite largo. Es terreno natural para el acceso por cuerda cuando hay que resolver algo puntual en altura, y para reformas de vivienda donde el trazado de instalaciones se decide centímetro a centímetro.",
      "En Llefià, La Salut, Sant Roc o Artigues domina el bloque de los sesenta y setenta levantado durante la expansión industrial, con el mismo patrón que en el resto del Barcelonès norte: instalaciones eléctricas de origen insuficientes, ausencia de circuitos separados y fontanería de hierro galvanizado. Aquí la intervención con más impacto suele ser la renovación completa del cuadro con separación real de circuitos y la sustitución de las derivaciones de agua.",
      "El frente marítimo y las promociones más recientes tienen un problema propio: la corrosión. El aerosol marino ataca las carcasas y las baterías de las unidades exteriores de aire acondicionado, los soportes metálicos y las cajas de conexión exteriores. Los equipos que en el interior durarían quince años, aquí duran bastante menos si nadie los mantiene. Un lavado de baterías y una revisión de estanqueidad periódicos son la diferencia entre sustituir un equipo o conservarlo.",
      "Badalona conserva además tejido industrial y logístico en la franja litoral y en el sector de Montigalà, con naves donde el trabajo habitual es distinto: líneas de fuerza, cuadros secundarios, automatismos de maquinaria, ventilación y mantenimiento eléctrico. También aparecen aquí los espacios confinados (depósitos, arquetas y galerías técnicas) que exigen certificación específica para intervenir.",
      "La topografía de la ciudad, que sube desde el mar hasta la sierra de la Marina, añade un detalle práctico: en los barrios altos hay mucha vivienda unifamiliar y adosada, con más superficie a climatizar y con espacio real para plantear aerotermia con emisores de baja temperatura. Es de las zonas del Barcelonès donde ese tipo de instalación tiene más sentido.",
    ],
    serviciosDemandados: [
      {
        slug: "climatizacion",
        motivo:
          "Mantenimiento y sustitución de equipos degradados por ambiente salino en la franja litoral.",
      },
      {
        slug: "electricidad",
        motivo:
          "Renovación de cuadros y circuitos en el bloque de los sesenta y setenta de Llefià, La Salut y Sant Roc.",
      },
      {
        slug: "aerotermia",
        motivo:
          "Vivienda unifamiliar y adosada en los barrios altos, con espacio para emisores de baja temperatura.",
      },
      {
        slug: "trabajos-verticales",
        motivo:
          "Fachadas del casco antiguo y bloques altos donde el andamio no compensa para trabajos puntuales.",
      },
    ],
    desplazamiento:
      "Acceso directo por la C-31 y por la ronda litoral. Zona de trabajo habitual junto con Sant Adrià y Santa Coloma en la misma salida.",
    cubre: [
      "Centre i Dalt la Vila",
      "Llefià",
      "La Salut",
      "Sant Roc",
      "Artigues",
      "Montigalà",
      "Canyadó i front marítim",
      "Bufalà",
    ],
    faq: [
      {
        p: "El aire acondicionado se me oxida por estar cerca del mar. ¿Se puede evitar?",
        r: "Frenar, sí; evitar del todo, no. La sal acelera la corrosión de baterías, carcasas y soportes, y el remedio real es el mantenimiento: lavado periódico de baterías, revisión de la fijación y protección de las partes metálicas expuestas. En instalaciones nuevas cerca del mar tiene sentido elegir equipos y soportes preparados para ambiente salino desde el principio.",
      },
      {
        p: "¿Tiene sentido poner aerotermia en una casa de los barrios altos de Badalona?",
        r: "En vivienda unifamiliar con superficie y con posibilidad de instalar emisores de baja temperatura, suele ser de los mejores casos posibles. El clima del litoral es favorable y una sola máquina cubre calefacción, refrigeración y agua caliente. Lo que decide es la demanda térmica real de la casa y el estado de los emisores existentes, y eso se calcula antes de proponer equipo.",
      },
      {
        p: "¿Hacéis trabajos en naves industriales de Badalona?",
        r: "Sí: líneas de fuerza, cuadros secundarios, automatismos, ventilación y mantenimiento eléctrico. También intervenciones en espacios confinados como depósitos, arquetas y galerías técnicas, para las que trabajo con certificación específica y plan de rescate previo a cualquier entrada.",
      },
    ],
    destacada: true,
  },

  /* ================================================================ */
  {
    slug: "santa-coloma-de-gramenet",
    ciudad: "Santa Coloma de Gramenet",
    nombreLargo: "Santa Coloma de Gramenet",
    comarca: "Barcelonès",
    titleSeo: "Electricista y lampista en Santa Coloma | ZSolutions",
    descriptionSeo:
      "Instalador certificado en Santa Coloma de Gramenet: electricidad, fontanería y climatización en bloque denso. Presupuesto en menos de 24 horas.",
    h1: "Instalaciones en Santa Coloma de Gramenet",
    claim: "Bloque denso en pendiente: instalaciones justas de origen que hoy no dan.",
    entradilla:
      "Santa Coloma creció muy rápido entre los años sesenta y setenta, en pendiente y con muy poco suelo. El resultado es un parque de vivienda compacto, con instalaciones dimensionadas al mínimo de la época y comunidades que ahora afrontan la actualización de todo a la vez.",
    cuerpo: [
      "La vivienda tipo de la ciudad es el piso de bloque de entre 55 y 75 metros, con techos bajos, patinillos estrechos y una instalación eléctrica original de dos o tres circuitos. Cuando en esa vivienda entran una cocina de inducción, un aire acondicionado y una secadora, el cuadro se convierte en el cuello de botella. La intervención con mejor retorno es siempre la misma: cuadro nuevo con separación real de circuitos, diferenciales adecuados y comprobación de la puesta a tierra.",
      "El desnivel de la ciudad tiene consecuencias directas en fontanería. En los bloques situados en la parte alta, la presión en las últimas plantas es un problema recurrente, y con frecuencia se confunde con un problema de red cuando en realidad es una derivación estrangulada por incrustación. Distinguir una cosa de la otra requiere medir presión y caudal en el punto más desfavorable, no suponer.",
      "En comunidad de vecinos, Santa Coloma concentra mucho trabajo de servicios generales: cuartos de contadores que llevan décadas sin tocarse, alumbrado de escalera aún con mecanismos antiguos, grupos de presión al final de su vida útil y garajes con ventilación y bombas de achique que solo se revisan cuando fallan. Es exactamente el tipo de instalación donde el mantenimiento preventivo sale mucho más barato que la derrama.",
      "La densidad y la pendiente hacen además que montar andamio sea complicado y caro en muchas fincas. Para reparaciones de fachada, sellados, sujeción de elementos con riesgo de desprendimiento o instalación de unidades exteriores en altura, el acceso por cuerda resuelve en un día lo que de otra forma implica licencia, ocupación de calle y semanas de plazo.",
      "Por último, hay mucho local pequeño en planta baja con actividad cambiante. La adecuación eléctrica de esos locales (potencia, protecciones, alumbrado de emergencia y certificado) es un trabajo recurrente y con un requisito claro: hacerlo bien a la primera para que la apertura no se retrase.",
    ],
    serviciosDemandados: [
      {
        slug: "electricidad",
        motivo:
          "Cuadros de dos o tres circuitos que no soportan el equipamiento doméstico actual.",
      },
      {
        slug: "lampisteria",
        motivo:
          "Mantenimiento de comunidades: contadores, alumbrado de escalera, grupos de presión y garajes.",
      },
      {
        slug: "fontaneria",
        motivo:
          "Baja presión en plantas altas por derivaciones incrustadas, típica del parque de los sesenta en pendiente.",
      },
      {
        slug: "trabajos-verticales",
        motivo:
          "Fachadas en calles estrechas y con desnivel donde el andamio es inviable o desproporcionado.",
      },
    ],
    desplazamiento:
      "A pocos minutos de Barcelona por la C-58 y la Ronda de Dalt. Se atiende habitualmente en la misma salida que Badalona y Sant Adrià.",
    cubre: [
      "Centre",
      "Fondo",
      "Santa Rosa",
      "Singuerlín",
      "Riu Nord i Riu Sud",
      "Les Oliveres",
      "Can Franquesa",
    ],
    faq: [
      {
        p: "¿Cuánto se tarda en cambiar el cuadro eléctrico de un piso?",
        r: "En una vivienda estándar, la sustitución del cuadro con separación de circuitos suele resolverse en una jornada, dejando la casa con suministro al final del día. Si además hay que tirar circuitos nuevos o resolver la puesta a tierra, el plazo crece y se planifica por fases para que no te quedes sin luz más tiempo del imprescindible. El plazo concreto va en el presupuesto.",
      },
      {
        p: "¿Podéis presentar el presupuesto directamente a la comunidad?",
        r: "Sí. Entrego el presupuesto desglosado por partidas, con el alcance de cada una explicado en lenguaje comprensible para la junta, y si hace falta asisto a la reunión para resolver dudas técnicas. Para el administrador es más fácil defender una propuesta cuando cada línea se entiende.",
      },
      {
        p: "El garaje de mi comunidad tiene problemas de ventilación y de bomba de achique. ¿Lo lleváis?",
        r: "Sí, entra dentro del mantenimiento de comunidad: extracción forzada, detección, cuadros de maniobra y bombas de achique con sus automatismos. Son elementos que casi nadie revisa hasta que fallan, y suelen fallar el día que más falta hacen. Una revisión periódica con informe evita ese escenario.",
      },
    ],
    destacada: true,
  },

  /* ================================================================ */
  {
    slug: "sant-adria-de-besos",
    ciudad: "Sant Adrià de Besòs",
    nombreLargo: "Sant Adrià de Besòs",
    comarca: "Barcelonès",
    titleSeo: "Electricista y lampista en Sant Adrià de Besòs",
    descriptionSeo:
      "Instalador certificado en Sant Adrià de Besòs: electricidad, climatización, trabajos verticales y espacios confinados. Presupuesto en 24 horas.",
    h1: "Instalaciones en Sant Adrià de Besòs",
    claim: "Litoral, industria y espacios confinados en muy pocos kilómetros.",
    entradilla:
      "Sant Adrià es un municipio pequeño con una mezcla poco común: vivienda de bloque, frente marítimo, el corredor del Besòs y una herencia industrial que sigue viva en forma de instalaciones técnicas, depósitos y galerías. Es de las zonas donde más se nota tener certificación de espacios confinados.",
    cuerpo: [
      "En la parte residencial, el parque dominante es bloque de los sesenta y setenta (La Mina, Sant Joan Baptista, La Catalana en su versión rehabilitada) con los problemas habituales de esa época: instalaciones eléctricas de origen escaso, ausencia de circuitos separados y fontanería metálica al final de su vida útil. La renovación de cuadro con separación real de circuitos y la sustitución de derivaciones de agua son los dos trabajos que más se repiten.",
      "La proximidad al mar añade el factor corrosión, igual que en Badalona: las unidades exteriores de climatización, los soportes y las cajas de conexión expuestas se degradan más rápido de lo previsto. En el frente marítimo, un plan de mantenimiento con lavado de baterías y revisión de fijaciones alarga años la vida de los equipos y evita la sustitución prematura.",
      "El corredor del Besòs y las instalaciones técnicas asociadas concentran el trabajo más especializado: depósitos, arquetas, colectores y galerías donde el riesgo principal no es la altura sino la atmósfera. Entrar en un espacio confinado exige medición previa de la atmósfera, ventilación, vigilancia desde el exterior y un plan de rescate montado antes de que nadie baje. Trabajo con certificación ITRA Confined Spaces de nivel 3 y con formación sanitaria PHTLS precisamente para este tipo de intervención.",
      "También hay tejido de nave y actividad logística, con necesidades distintas de la vivienda: líneas de fuerza, cuadros secundarios, automatismos, alumbrado industrial y ventilación. En estos entornos el valor no está solo en ejecutar, sino en dejar la instalación documentada y etiquetada para que el mantenimiento posterior no dependa de la memoria de nadie.",
      "Por su tamaño, Sant Adrià se atiende en la misma salida que Badalona y Santa Coloma, lo que permite tiempos de respuesta cortos para avisos de mantenimiento y para comunidades con contrato.",
    ],
    serviciosDemandados: [
      {
        slug: "trabajos-verticales",
        motivo:
          "Espacios confinados en depósitos, arquetas y galerías del entorno del Besòs, con plan de rescate previo.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Mantenimiento de equipos expuestos a ambiente salino en el frente marítimo.",
      },
      {
        slug: "electricidad",
        motivo:
          "Renovación de instalaciones en bloque de los sesenta y setenta y trabajo eléctrico en nave.",
      },
      {
        slug: "lampisteria",
        motivo:
          "Mantenimiento integral de comunidades con un solo interlocutor para agua, luz y clima.",
      },
    ],
    desplazamiento:
      "Contiguo a Barcelona por la ronda litoral. Se atiende en la misma ruta que Badalona y Santa Coloma.",
    cubre: ["Sant Adrià centre", "La Mina", "La Catalana", "Sant Joan Baptista", "Besòs"],
    faq: [
      {
        p: "¿Qué hace falta para entrar a trabajar en un espacio confinado?",
        r: "Medición previa de la atmósfera para descartar deficiencia de oxígeno y presencia de gases, ventilación forzada si hace falta, un vigilante en el exterior con comunicación permanente, equipo de acceso y, sobre todo, un plan de rescate operativo antes de que nadie entre. No es papeleo: en un espacio confinado el rescate improvisado es la causa principal de que un accidente se convierta en varios.",
      },
      {
        p: "¿Dais servicio a naves y a industria además de a vivienda?",
        r: "Sí. En nave el trabajo habitual es líneas de fuerza, cuadros secundarios, automatismos de maquinaria, alumbrado y ventilación, además de intervenciones en altura y en espacios confinados. Se entrega documentado y etiquetado, porque en industria el coste real de una instalación sin documentar aparece en la primera parada no programada.",
      },
      {
        p: "¿Cuánto tardáis en atender un aviso en Sant Adrià?",
        r: "Es zona de trabajo habitual y contigua a Barcelona, así que los tiempos son de los mejores de toda el área. El plazo concreto depende de la carga de trabajo de esa semana, y te lo digo con franqueza al responder, en menos de 24 horas, en lugar de darte una fecha que luego no pueda cumplir.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "cornella-de-llobregat",
    ciudad: "Cornellà de Llobregat",
    nombreLargo: "Cornellà de Llobregat",
    comarca: "Baix Llobregat",
    titleSeo: "Electricista y lampista en Cornellà de Llobregat",
    descriptionSeo:
      "Instalador certificado en Cornellà de Llobregat: electricidad, fontanería, climatización y mantenimiento de comunidades. Presupuesto en 24 horas.",
    h1: "Instalaciones en Cornellà de Llobregat",
    claim: "Residencial denso y actividad terciaria en el mismo municipio.",
    entradilla:
      "Cornellà combina barrios residenciales densos levantados durante la industrialización del Baix Llobregat con un sector terciario y de oficinas que ha crecido mucho alrededor de Almeda y del eje del Llobregat. Son dos tipos de cliente con necesidades opuestas y con un punto en común: instalaciones que llevan años pidiendo actualización.",
    cuerpo: [
      "En Sant Ildefons, Gavarra o Riera, la vivienda tipo es el bloque de los años sesenta y setenta con las carencias clásicas de la época. El cuadro eléctrico original se queda corto en cuanto entra equipamiento moderno, y la fontanería metálica acumula décadas de incrustación. La renovación de cuadro con separación de circuitos y la sustitución de derivaciones son los trabajos más frecuentes, y ambos se pueden ejecutar sin obra grande si se planifican bien.",
      "El área de Almeda y los edificios de oficinas del entorno cambian por completo el perfil del trabajo: climatización por conductos, zonificación, ventilación mecánica, alumbrado de emergencia y mantenimiento programado. Aquí lo que se valora es la disponibilidad y la documentación: una oficina no puede permitirse una avería de clima sin diagnóstico rápido, y el responsable de mantenimiento necesita saber qué se ha hecho y cuándo.",
      "Cornellà tiene además bastante comunidad de vecinos de tamaño medio y grande, con servicios generales que llegan al momento de la actualización: cuartos de contadores, alumbrado de zonas comunes con detección de presencia, grupos de presión y garajes. Para la junta, la diferencia está en recibir un informe del estado real con prioridades y presupuesto por partidas, en lugar de una lista de averías sueltas.",
      "El entorno del Llobregat aporta también actividad industrial y logística, con naves donde el trabajo es de líneas de fuerza, cuadros secundarios y automatismos, y con instalaciones técnicas que a veces requieren acceso en altura o entrada en espacios confinados.",
      "Por ubicación, Cornellà encaja en la misma ruta de trabajo que Esplugues, Sant Joan Despí y Sant Boi, lo que permite agrupar visitas y responder rápido a avisos de mantenimiento en la zona.",
    ],
    serviciosDemandados: [
      {
        slug: "electricidad",
        motivo:
          "Renovación de cuadros en bloque de los sesenta y adecuación eléctrica de oficinas y locales.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Climatización por conductos y ventilación en el sector terciario de Almeda y entorno.",
      },
      {
        slug: "lampisteria",
        motivo:
          "Mantenimiento programado de comunidades y de edificios de oficinas con un solo interlocutor.",
      },
      {
        slug: "fontaneria",
        motivo:
          "Sustitución de derivaciones metálicas y resolución de fugas en parque residencial denso.",
      },
    ],
    desplazamiento:
      "Acceso directo por la B-23 y la ronda de Dalt. Ruta habitual junto con Esplugues, Sant Joan Despí y Sant Boi.",
    cubre: ["Centre", "Almeda", "Sant Ildefons", "Gavarra", "Riera", "Fontsanta", "Fatjó"],
    faq: [
      {
        p: "¿Hacéis mantenimiento de climatización para oficinas?",
        r: "Sí, con revisiones programadas de filtros, baterías, presiones, desagües y parte eléctrica, e informe del estado de cada equipo tras cada visita. En instalaciones sujetas al RITE, el alcance y la periodicidad vienen marcados por normativa según la potencia, y eso se concreta por escrito en el contrato de mantenimiento.",
      },
      {
        p: "¿Podéis intervenir fuera del horario de oficina?",
        r: "En trabajos que afectan a la actividad, se planifica el horario para minimizar el impacto, incluidas intervenciones fuera del horario laboral cuando el trabajo lo justifica. Se acuerda antes y se refleja en el presupuesto: prefiero que el coste esté claro desde el principio a que aparezca como un recargo al final.",
      },
      {
        p: "¿Qué incluye un informe del estado de las instalaciones de una comunidad?",
        r: "Revisión del cuarto de contadores y servicios generales, alumbrado de zonas comunes, grupo de presión, garaje con su ventilación y achique, y estado general de las instalaciones visibles. Se entrega con las intervenciones ordenadas por prioridad y con presupuesto por partidas, para que la junta pueda aprobar por fases si lo prefiere.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "sant-boi-de-llobregat",
    ciudad: "Sant Boi de Llobregat",
    nombreLargo: "Sant Boi de Llobregat",
    comarca: "Baix Llobregat",
    titleSeo: "Electricista y lampista en Sant Boi de Llobregat",
    descriptionSeo:
      "Instalador certificado en Sant Boi de Llobregat: electricidad, fontanería, climatización y aerotermia en vivienda y nave. Presupuesto en 24 horas.",
    h1: "Instalaciones en Sant Boi de Llobregat",
    claim: "Casco antiguo, bloque y polígono, con mucha vivienda de superficie.",
    entradilla:
      "Sant Boi mezcla un casco antiguo consolidado, barrios de bloque de la expansión de los setenta, zonas de vivienda unifamiliar en la parte alta y un tejido de polígono importante junto al Llobregat. Esa variedad hace que aquí aparezcan casi todos los tipos de trabajo que hago.",
    cuerpo: [
      "En la parte residencial de bloque (Camps Blancs, Marianao, Ciutat Cooperativa) el patrón es el conocido del área metropolitana: cuadros originales insuficientes, circuitos compartidos y fontanería metálica con incrustación. La renovación de cuadro con separación real de circuitos y comprobación de la puesta a tierra sigue siendo la intervención con mejor relación entre coste y seguridad.",
      "Las zonas de vivienda unifamiliar y adosada, más presentes aquí que en los municipios del Barcelonès, abren la puerta a un tipo de trabajo distinto: calefacción, aerotermia y climatización por conductos en viviendas con superficie suficiente para que el sistema tenga sentido. En estos casos el proyecto empieza siempre por el cálculo de demanda y por revisar los emisores existentes, porque una bomba de calor conectada a radiadores de alta temperatura rinde mal por definición.",
      "El casco antiguo aporta el tipo de reforma donde el trazado de instalaciones se decide con criterio: paredes gruesas, distribuciones heredadas y la necesidad de dejar la instalación registrable donde se pueda. Es también donde más aparece la sustitución completa de instalaciones de agua antiguas.",
      "El tejido de polígono junto al río concentra el trabajo industrial: líneas de fuerza, cuadros secundarios, automatismos de maquinaria, alumbrado y ventilación, además de intervenciones en altura para mantenimiento de naves y de instalaciones exteriores. En este entorno, el acceso por cuerda evita el montaje de plataformas para trabajos puntuales en cubierta y en fachada.",
      "Sant Boi se atiende en la misma ruta que Cornellà, Sant Joan Despí y El Prat, lo que permite agrupar visitas de valoración y mantener tiempos de respuesta razonables para avisos de mantenimiento.",
    ],
    serviciosDemandados: [
      {
        slug: "aerotermia",
        motivo:
          "Vivienda unifamiliar y adosada con superficie suficiente y espacio para emisores de baja temperatura.",
      },
      {
        slug: "electricidad",
        motivo:
          "Renovación de instalaciones en bloque de los setenta y trabajo eléctrico industrial en polígono.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Climatización por conductos en vivienda de superficie y ventilación en nave.",
      },
      {
        slug: "fontaneria",
        motivo:
          "Sustitución de instalaciones de agua antiguas en el casco antiguo y en el parque de bloque.",
      },
    ],
    desplazamiento:
      "Acceso por la C-245 y la B-23. Ruta habitual del Baix Llobregat junto con Cornellà, Sant Joan Despí y El Prat.",
    cubre: [
      "Centre i casc antic",
      "Marianao",
      "Camps Blancs",
      "Ciutat Cooperativa",
      "Vinyets",
      "Polígons del Llobregat",
    ],
    faq: [
      {
        p: "Tengo una casa unifamiliar con caldera de gas. ¿Me interesa la aerotermia?",
        r: "Es uno de los escenarios donde más sentido tiene, pero no de forma automática. Depende de la demanda térmica real de la casa, del aislamiento y sobre todo de los emisores: con suelo radiante o radiadores de baja temperatura el sistema rinde muy bien; con radiadores antiguos de alta temperatura, mucho peor. Lo calculo antes de proponer nada y te digo con franqueza si tu caso es bueno o no.",
      },
      {
        p: "¿Trabajáis en polígonos industriales?",
        r: "Sí: líneas de fuerza, cuadros secundarios, automatismos de maquinaria, alumbrado industrial y ventilación, además de mantenimiento en altura de cubiertas e instalaciones exteriores mediante acceso por cuerda. Todo se entrega documentado y etiquetado para que el mantenimiento posterior no dependa de la memoria de nadie.",
      },
      {
        p: "¿Podéis climatizar una casa entera por conductos?",
        r: "Sí, siempre que haya falso techo o espacio para pasar la red. Es la solución con mejor confort y aspecto más limpio, pero exige un replanteo serio: dimensionado de la red, reparto de rejillas para que no queden zonas muertas y registros para poder limpiar. Se valora en la visita, junto con la alternativa de splits si la obra disponible no da para conductos.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "esplugues-de-llobregat",
    ciudad: "Esplugues de Llobregat",
    nombreLargo: "Esplugues de Llobregat",
    comarca: "Baix Llobregat",
    titleSeo: "Electricista y lampista en Esplugues de Llobregat",
    descriptionSeo:
      "Instalador certificado en Esplugues de Llobregat: electricidad, climatización, aerotermia y mantenimiento de comunidades. Presupuesto en 24 horas.",
    h1: "Instalaciones en Esplugues de Llobregat",
    claim: "Ladera, vivienda de superficie y comunidades con servicios generales exigentes.",
    entradilla:
      "Esplugues es un municipio en ladera, pegado a Barcelona, con una mezcla de vivienda unifamiliar en la parte alta, bloques de buena superficie y un sector sanitario y terciario de peso. El desnivel y el tamaño de las viviendas condicionan casi todas las decisiones de instalación.",
    cuerpo: [
      "En la parte alta (Ciutat Diagonal, La Mallola y entorno) predomina la vivienda unifamiliar y el chalet, con superficies grandes y sistemas de calefacción por radiadores que llegan al final de su vida útil. Es el escenario donde la aerotermia se plantea con más frecuencia, y donde más importa hacer el cálculo antes de comprar: la demanda de una casa de dos plantas con mucha superficie acristalada no se estima a ojo.",
      "En la zona de bloque, las viviendas suelen tener más metros que la media metropolitana, lo que cambia el planteamiento de la climatización: aquí tienen sentido los conductos y la zonificación, en lugar de acumular splits por estancia. La instalación por conductos exige espacio de falso techo y un replanteo serio de la red, y por eso conviene decidirlo antes de que la reforma esté en marcha.",
      "El desnivel del municipio tiene el mismo efecto que en otras ciudades en pendiente: presión de agua irregular en las plantas altas de algunos edificios y necesidad de grupos de presión correctamente dimensionados. La regla es la misma siempre: medir presión y caudal en el punto más desfavorable antes de decidir, porque un grupo instalado sobre una derivación obstruida no resuelve nada.",
      "Las comunidades de Esplugues suelen tener servicios generales de cierta entidad: garajes con ventilación y achique, ascensores, alumbrado de zonas comunes amplias y, en algunos casos, instalaciones de riego y jardinería. El mantenimiento con informe periódico es el formato que mejor funciona, porque permite planificar inversiones en el presupuesto anual en lugar de afrontarlas como derramas.",
      "Por proximidad a Barcelona, Esplugues es de las zonas de respuesta más rápida fuera de la ciudad, y se atiende en la misma ruta que Cornellà y Sant Joan Despí.",
    ],
    serviciosDemandados: [
      {
        slug: "aerotermia",
        motivo:
          "Vivienda unifamiliar de superficie en la parte alta, con sistemas de calefacción antiguos por sustituir.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Climatización por conductos y zonificación en viviendas de más metros que la media metropolitana.",
      },
      {
        slug: "lampisteria",
        motivo:
          "Mantenimiento de comunidades con servicios generales amplios: garaje, ventilación, achique y zonas comunes.",
      },
      {
        slug: "electricidad",
        motivo:
          "Ampliaciones de potencia y adecuación de cuadros para nuevas cargas en vivienda grande.",
      },
    ],
    desplazamiento:
      "Contiguo a Barcelona por la Diagonal y la ronda de Dalt. Tiempos de respuesta equivalentes a los de la ciudad.",
    cubre: [
      "Centre",
      "Ciutat Diagonal",
      "La Mallola",
      "Can Vidalet",
      "El Gall",
      "Finestrelles",
    ],
    faq: [
      {
        p: "¿Cuándo hace falta ampliar la potencia contratada?",
        r: "Cuando la suma de lo que puede funcionar a la vez supera lo contratado y el interruptor general empieza a saltar: típicamente al añadir inducción, bomba de calor, punto de recarga de coche o aire acondicionado en varias estancias. Antes de tramitar nada hay que comprobar que la instalación aguanta el nuevo valor: derivación individual, cuadro y puesta a tierra. Primero se adecúa, luego se certifica y después se tramita.",
      },
      {
        p: "¿Se puede pasar de radiadores a aerotermia sin obra grande?",
        r: "A veces sí. Si los radiadores existentes tienen superficie suficiente para trabajar a temperatura más baja, se puede aprovechar buena parte de la instalación. Si no, hay que ampliar superficie de emisión en las estancias críticas o sustituirlos. Lo que no recomiendo es instalar la bomba de calor y ver qué pasa: se calcula antes y se sabe a qué atenerse.",
      },
      {
        p: "¿Ofrecéis contratos de mantenimiento a comunidades de Esplugues?",
        r: "Sí. Se define qué elementos entran, con qué periodicidad y qué incluye cada visita, y se entrega informe tras cada revisión. La ventaja para la comunidad es la previsibilidad: las inversiones se planifican en el presupuesto anual en lugar de aparecer como derramas de urgencia.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "el-prat-de-llobregat",
    ciudad: "El Prat de Llobregat",
    nombreLargo: "El Prat de Llobregat",
    comarca: "Baix Llobregat",
    titleSeo: "Electricista y lampista en El Prat de Llobregat",
    descriptionSeo:
      "Instalador certificado en El Prat de Llobregat: electricidad, climatización, ventilación industrial y trabajos verticales. Presupuesto en 24 horas.",
    h1: "Instalaciones en El Prat de Llobregat",
    claim: "Delta, logística y ambiente húmedo y salino: instalaciones que sufren más.",
    entradilla:
      "El Prat tiene una condición ambiental propia dentro del área metropolitana: delta, nivel freático alto, humedad y proximidad al mar. Eso se traduce en instalaciones que envejecen antes, en garajes con problemas de achique y en un tejido logístico enorme alrededor del aeropuerto y del puerto.",
    cuerpo: [
      "En vivienda, el municipio combina el casco urbano tradicional con promociones más recientes en Sant Cosme y en el entorno de la Ribera. La humedad ambiental y el nivel freático se notan en dos sitios concretos: en las plantas bajas y garajes, donde las bombas de achique y su automatismo dejan de ser un accesorio y pasan a ser crítico, y en la corrosión acelerada de partes metálicas de instalaciones exteriores.",
      "El ambiente salino afecta especialmente a las unidades exteriores de climatización, igual que en el litoral norte. La diferencia aquí es que se suma humedad alta, lo que acelera la degradación de baterías, carcasas y soportes. Un mantenimiento periódico con lavado de baterías y revisión de fijaciones es lo que separa un equipo que llega a su vida útil de uno que se sustituye a media vida.",
      "El peso del tejido logístico e industrial es el rasgo diferencial del municipio. En nave, el trabajo habitual es líneas de fuerza, cuadros secundarios, automatismos, alumbrado industrial y, sobre todo, ventilación y renovación de aire en espacios de gran volumen. También aparecen aquí, con más frecuencia que en otros municipios, los espacios confinados: depósitos, arquetas, colectores y galerías técnicas donde la intervención exige medición de atmósfera y plan de rescate.",
      "Las cubiertas de nave y las instalaciones exteriores en altura son otro trabajo recurrente. Para intervenciones puntuales, el acceso por cuerda evita el montaje de plataformas elevadoras y permite resolver en una jornada lo que de otro modo implica alquiler de maquinaria y permisos internos.",
      "El Prat se atiende en la ruta del Baix Llobregat, junto con Sant Boi y Cornellà, con acceso directo por la C-31 y la C-32.",
    ],
    serviciosDemandados: [
      {
        slug: "climatizacion",
        motivo:
          "Mantenimiento y sustitución de equipos degradados por humedad y ambiente salino, y ventilación industrial.",
      },
      {
        slug: "trabajos-verticales",
        motivo:
          "Cubiertas de nave, instalaciones exteriores en altura y espacios confinados del entorno logístico.",
      },
      {
        slug: "electricidad",
        motivo:
          "Instalación y mantenimiento eléctrico industrial, y automatismos de bombeo y achique.",
      },
      {
        slug: "fontaneria",
        motivo:
          "Achique y evacuación en plantas bajas y garajes, condicionados por el nivel freático del delta.",
      },
    ],
    desplazamiento:
      "Acceso directo por la C-31 y la C-32. Se atiende en la misma ruta del Baix Llobregat que Sant Boi y Cornellà.",
    cubre: [
      "Centre",
      "Sant Cosme",
      "La Ribera",
      "Zona aeroportuaria",
      "Polígons logístics",
    ],
    faq: [
      {
        p: "El garaje se me inunda cuando llueve fuerte. ¿Qué se puede hacer?",
        r: "Lo primero es comprobar si el problema es de capacidad de la bomba, del automatismo que la arranca, de la red de evacuación o de la entrada de agua. En zonas con nivel freático alto es habitual que la bomba funcione pero esté mal dimensionada o que el flotador falle sin que nadie lo note hasta el día de la tormenta. Se revisa el conjunto, no solo la bomba.",
      },
      {
        p: "¿Hacéis mantenimiento de climatización en naves?",
        r: "Sí, incluida la ventilación y renovación de aire en espacios de gran volumen, que es lo que más se pide en el entorno logístico. Se planifica el alcance y la periodicidad según el uso y la normativa aplicable, y se entrega informe del estado de cada equipo tras cada revisión.",
      },
      {
        p: "¿Podéis trabajar en cubierta de nave sin plataforma elevadora?",
        r: "Sí, mediante acceso por cuerda con técnico de nivel 3, que es especialmente útil en intervenciones puntuales o en cubiertas donde la plataforma no llega o no puede posicionarse. Se estudian los puntos de anclaje disponibles y se monta el sistema con doble línea y plan de rescate operativo durante toda la intervención.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "castelldefels",
    ciudad: "Castelldefels",
    nombreLargo: "Castelldefels",
    comarca: "Baix Llobregat",
    titleSeo: "Electricista y lampista en Castelldefels | ZSolutions",
    descriptionSeo:
      "Instalador certificado en Castelldefels: aerotermia, climatización, piscina y electricidad en vivienda unifamiliar. Presupuesto en menos de 24 horas.",
    h1: "Instalaciones en Castelldefels",
    claim: "Unifamiliar, mar y segunda residencia: otro tipo de instalación por completo.",
    entradilla:
      "Castelldefels es territorio de vivienda unifamiliar, con mucha casa de superficie entre la playa y las laderas del Garraf, y una proporción alta de segunda residencia. Eso cambia radicalmente el trabajo respecto al área metropolitana densa: aquí manda la climatización, la aerotermia y el mantenimiento de instalaciones que pasan meses sin uso.",
    cuerpo: [
      "La vivienda unifamiliar con jardín es el caso más favorable para la aerotermia de toda el área: superficie suficiente, espacio para la unidad exterior, posibilidad real de instalar suelo radiante o emisores de baja temperatura y un clima litoral que mantiene la bomba de calor trabajando en su rango bueno casi todo el año. Cuando además hay piscina, la conversación sobre climatizarla y sobre el consumo asociado entra sola en el proyecto.",
      "La proximidad al mar impone la misma disciplina que en el resto del litoral, pero agravada: las casas de primera línea sufren corrosión seria en unidades exteriores, soportes, cajas de conexión y luminarias de exterior. Aquí el mantenimiento no es opcional si se quiere que los equipos lleguen a su vida útil, y en instalación nueva tiene sentido elegir material preparado para ambiente salino desde el principio.",
      "La segunda residencia añade un problema propio: instalaciones que pasan meses paradas. Un circuito de agua sin uso, un termo apagado, una bomba de calor sin arrancar y una piscina desatendida generan averías específicas que se evitan con puestas a punto de apertura y cierre de temporada. Es un trabajo poco glamuroso y con mucho retorno para el propietario.",
      "En electricidad, la vivienda unifamiliar tiene sus propias necesidades: potencia suficiente para clima, piscina, cocina y punto de recarga de vehículo eléctrico; cuadro con separación real de circuitos por zonas; iluminación exterior; automatismos de riego y de puerta de garaje; y protección contra sobretensiones, que en casas con mucha electrónica y equipos de climatización deja de ser un extra para ser sentido común.",
      "Castelldefels se atiende en la ruta del litoral sur junto con Gavà, Sitges y Vilanova, con acceso por la C-32 y la C-31.",
    ],
    serviciosDemandados: [
      {
        slug: "aerotermia",
        motivo:
          "El caso más favorable del área: unifamiliar con superficie, espacio para emisores de baja temperatura y clima litoral.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Climatización por conductos en casa grande y mantenimiento reforzado por ambiente salino.",
      },
      {
        slug: "electricidad",
        motivo:
          "Potencia y cuadros para vivienda unifamiliar con clima, piscina, iluminación exterior y punto de recarga.",
      },
      {
        slug: "lampisteria",
        motivo:
          "Puestas a punto de apertura y cierre de temporada en segunda residencia.",
      },
    ],
    desplazamiento:
      "Acceso por la C-32 y la C-31. Ruta del litoral sur, compartida con Gavà, Sitges y Vilanova i la Geltrú.",
    cubre: [
      "Centre",
      "Platja de Castelldefels",
      "Bellamar",
      "Montmar",
      "Can Roca",
      "Vista Alegre",
    ],
    faq: [
      {
        p: "¿La aerotermia sirve también para climatizar la piscina?",
        r: "Hay bombas de calor específicas para piscina y también sistemas que integran esa demanda en la instalación general, pero la decisión no es automática: climatizar una piscina supone una demanda energética considerable y hay que dimensionarla, valorar la cubierta térmica y contar con el consumo real. Se plantea con números antes de decidir, no como un extra del presupuesto.",
      },
      {
        p: "Tengo la casa cerrada varios meses al año. ¿Qué mantenimiento necesita?",
        r: "Sobre todo puestas a punto de apertura y cierre: purgado y comprobación del circuito de agua, revisión del termo o de la producción de agua caliente, arranque y verificación de la climatización, revisión del cuadro eléctrico y comprobación de protecciones. Las averías más caras en segunda residencia casi siempre vienen de instalaciones que han estado paradas sin preparación.",
      },
      {
        p: "¿Instaláis punto de recarga para coche eléctrico en vivienda unifamiliar?",
        r: "Sí. Lo importante es el paso previo: verificar que la acometida y el cuadro soportan la nueva carga junto con el resto de consumos de la casa, y decidir si conviene control dinámico de potencia. Se ejecuta la línea dedicada, la protección y la puesta a tierra, y queda documentado como parte de la instalación eléctrica.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "sitges",
    ciudad: "Sitges",
    nombreLargo: "Sitges",
    comarca: "Garraf",
    titleSeo: "Electricista y lampista en Sitges | ZSolutions",
    descriptionSeo:
      "Instalador certificado en Sitges: climatización, aerotermia, electricidad y mantenimiento de segunda residencia y hostelería. Presupuesto en 24 h.",
    h1: "Instalaciones en Sitges",
    claim: "Casco histórico protegido, segunda residencia y hostelería estacional.",
    entradilla:
      "Sitges plantea tres retos a la vez: un casco histórico con protección patrimonial donde no se puede instalar cualquier cosa en cualquier sitio, una gran proporción de segunda residencia y una hostelería muy estacional que no se puede permitir una avería en temporada alta.",
    cuerpo: [
      "En el casco histórico, la restricción manda. Fachadas protegidas, calles estrechas sin acceso para maquinaria y normativa municipal estricta sobre elementos visibles desde la vía pública. Colocar una unidad exterior de climatización o pasar una línea por el exterior exige estudiar antes qué está permitido y qué no, y muchas veces la única solución viable pasa por acceso por cuerda a patios interiores o por soluciones de conductos que eviten elementos en fachada.",
      "La segunda residencia domina buena parte del parque, con casas que pasan meses cerradas. Eso genera un tipo de avería característico: circuitos de agua parados, termos apagados que arrancan mal, equipos de clima que llevan sin funcionar toda la temporada baja y cuadros con protecciones que nadie ha comprobado. Las puestas a punto de apertura y cierre de temporada evitan buena parte de esas incidencias.",
      "La hostelería es el tercer bloque, y el más exigente en tiempos. Un restaurante o un hotel en temporada alta no puede esperar tres días a que se diagnostique una avería de clima o de agua caliente. Lo que valoran estos clientes es un mantenimiento preventivo bien planificado fuera de temporada y un diagnóstico rápido cuando algo falla, y ambas cosas se organizan por contrato, no improvisando en agosto.",
      "El ambiente marino añade la exigencia de mantenimiento reforzado en unidades exteriores, soportes y luminarias de exterior, igual que en el resto del litoral. En instalación nueva cerca del mar, elegir material adecuado desde el principio ahorra sustituciones prematuras.",
      "Sitges está en la ruta del litoral sur, con acceso por la C-32. Por distancia, se organiza en visitas agrupadas: la valoración y la ejecución se planifican para aprovechar el desplazamiento, y eso se refleja de forma transparente en el presupuesto.",
    ],
    serviciosDemandados: [
      {
        slug: "climatizacion",
        motivo:
          "Instalación en casco protegido sin elementos visibles en fachada y mantenimiento preventivo para hostelería.",
      },
      {
        slug: "aerotermia",
        motivo:
          "Vivienda unifamiliar y segunda residencia con superficie y clima litoral favorable.",
      },
      {
        slug: "lampisteria",
        motivo:
          "Puestas a punto de apertura y cierre de temporada en vivienda cerrada buena parte del año.",
      },
      {
        slug: "trabajos-verticales",
        motivo:
          "Patios interiores y fachadas del casco histórico donde no se puede montar andamio.",
      },
    ],
    desplazamiento:
      "Acceso por la C-32. Se planifican visitas agrupadas para aprovechar el desplazamiento, con el coste reflejado con transparencia en el presupuesto.",
    cubre: [
      "Centre i casc antic",
      "Vinyet",
      "Terramar",
      "Aiguadolç",
      "Vallpineda",
      "Les Botigues de Sitges",
    ],
    faq: [
      {
        p: "¿Se puede instalar aire acondicionado en el casco histórico de Sitges?",
        r: "Normalmente sí, pero con condiciones. La normativa municipal y la protección patrimonial limitan qué elementos pueden verse desde la vía pública, así que hay que estudiar ubicaciones alternativas en patios interiores o cubiertas, y en algunos casos plantear conductos para evitar unidades visibles. Lo compruebo antes de proponer equipo, para no venderte una instalación que luego no se puede ejecutar.",
      },
      {
        p: "¿Dais servicio de mantenimiento a hostelería?",
        r: "Sí, y el formato que mejor funciona es el mantenimiento preventivo planificado fuera de temporada, con revisión completa de clima, agua caliente y parte eléctrica antes de que empiece la carga fuerte. Es la forma realista de reducir las averías en el momento en el que más caro sale tenerlas.",
      },
      {
        p: "¿Cobráis desplazamiento hasta Sitges?",
        r: "El desplazamiento se refleja en el presupuesto de forma transparente y se optimiza agrupando visitas cuando es posible. Prefiero que lo veas desglosado desde el principio a que aparezca camuflado en otra partida: es información que necesitas para decidir si te compensa.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "vilanova-i-la-geltru",
    ciudad: "Vilanova i la Geltrú",
    nombreLargo: "Vilanova i la Geltrú",
    comarca: "Garraf",
    titleSeo: "Electricista y lampista en Vilanova i la Geltrú",
    descriptionSeo:
      "Instalador certificado en Vilanova i la Geltrú: electricidad, climatización, aerotermia e industria. Presupuesto en menos de 24 horas.",
    h1: "Instalaciones en Vilanova i la Geltrú",
    claim: "Capital del Garraf: ciudad consolidada, puerto e industria propia.",
    entradilla:
      "Vilanova no es un municipio dormitorio: es una ciudad con casco consolidado, puerto pesquero y deportivo, universidad y un tejido industrial propio. Eso significa que aquí conviven la reforma de vivienda urbana, el mantenimiento de segunda residencia junto al mar y el trabajo eléctrico industrial.",
    cuerpo: [
      "El casco urbano tiene edificación consolidada de distintas épocas, con bastante finca de principios y mediados del siglo XX en la que las instalaciones han ido creciendo por acumulación. En reforma de vivienda, la parte crítica suele ser la misma que en cualquier ciudad con parque antiguo: cuadro insuficiente, ausencia de circuitos separados, puesta a tierra dudosa y fontanería metálica con incrustación.",
      "La franja litoral y la zona de Ribes Roges concentran vivienda de temporada, con el patrón habitual de la segunda residencia: instalaciones paradas durante meses, corrosión acelerada por ambiente salino y necesidad de puestas a punto de apertura y cierre. Es un mantenimiento sencillo que evita las averías caras de principio de temporada.",
      "El tejido industrial y el entorno portuario aportan trabajo técnico distinto: líneas de fuerza, cuadros secundarios, automatismos, alumbrado industrial, ventilación y mantenimiento eléctrico. En entorno portuario e industrial aparecen además espacios confinados (depósitos, arquetas, galerías) donde la intervención exige certificación específica, medición de atmósfera y plan de rescate.",
      "En vivienda unifamiliar de la periferia hay margen real para aerotermia, con las mismas condiciones que en el resto del litoral: superficie suficiente, espacio para la unidad exterior y posibilidad de emisores de baja temperatura. La distancia respecto a Barcelona hace que aquí tenga aún más sentido plantear el proyecto completo de una vez, en lugar de por intervenciones sueltas.",
      "Vilanova se atiende en la ruta del litoral sur por la C-32, con visitas agrupadas para optimizar el desplazamiento.",
    ],
    serviciosDemandados: [
      {
        slug: "electricidad",
        motivo:
          "Reforma de vivienda en casco consolidado y trabajo eléctrico industrial y portuario.",
      },
      {
        slug: "aerotermia",
        motivo:
          "Vivienda unifamiliar de periferia con superficie y condiciones favorables de clima litoral.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Instalación y mantenimiento en vivienda de temporada y en actividad, con exigencia por ambiente salino.",
      },
      {
        slug: "trabajos-verticales",
        motivo:
          "Espacios confinados y mantenimiento en altura en entorno industrial y portuario.",
      },
    ],
    desplazamiento:
      "Acceso por la C-32. Ruta del litoral sur, con visitas agrupadas junto a Sitges y Castelldefels.",
    cubre: [
      "Centre",
      "La Geltrú",
      "Ribes Roges",
      "Sant Joan",
      "Molí de Vent",
      "Polígons industrials",
    ],
    faq: [
      {
        p: "¿Trabajáis con empresas e industria en Vilanova?",
        r: "Sí: instalación y mantenimiento eléctrico industrial, automatismos, alumbrado y ventilación, además de trabajos en altura y en espacios confinados con certificación específica. En industria, lo que más se agradece es dejar la instalación documentada y etiquetada, porque el coste real de lo indocumentado aparece en la primera parada no programada.",
      },
      {
        p: "¿Merece la pena la aerotermia en una casa del Garraf?",
        r: "En unifamiliar con superficie y posibilidad de emisores de baja temperatura, suele salir bien: el clima litoral es favorable y una sola máquina cubre calefacción, refrigeración y agua caliente. Lo decisivo es el cálculo de demanda y el estado de los emisores actuales, y eso se hace antes de proponer equipo, no después.",
      },
      {
        p: "¿Cómo organizáis los trabajos a esta distancia de Barcelona?",
        r: "Agrupando: la visita de valoración se planifica junto con otras de la zona y la ejecución se organiza en jornadas completas en lugar de en visitas cortas repetidas. Así el desplazamiento pesa menos en el presupuesto y el plazo es más previsible para ti.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "sant-cugat-del-valles",
    ciudad: "Sant Cugat del Vallès",
    nombreLargo: "Sant Cugat del Vallès",
    comarca: "Vallès Occidental",
    titleSeo: "Electricista y lampista en Sant Cugat del Vallès",
    descriptionSeo:
      "Instalador certificado en Sant Cugat del Vallès: aerotermia, climatización por conductos, domótica y electricidad en vivienda unifamiliar.",
    h1: "Instalaciones en Sant Cugat del Vallès",
    claim: "Vivienda unifamiliar de superficie y exigencia alta de acabado.",
    entradilla:
      "Sant Cugat concentra mucha vivienda unifamiliar y adosada de superficie, con un nivel de exigencia alto en acabado y en documentación del trabajo. Es la zona donde más sentido tienen los proyectos completos de climatización por conductos, aerotermia y control por zonas.",
    cuerpo: [
      "La casa tipo de las urbanizaciones (Mira-sol, La Floresta, Valldoreix, Golf) tiene dos o tres plantas, superficie amplia y a menudo mucha superficie acristalada. Eso hace que el cálculo de demanda térmica sea imprescindible: estimar a ojo en una vivienda así lleva sistemáticamente a equipos mal dimensionados que rinden mal en las estancias extremas y consumen de más.",
      "Es también donde la aerotermia da su mejor resultado: espacio para la unidad exterior, posibilidad de suelo radiante o emisores de baja temperatura, y demanda de calefacción, refrigeración y agua caliente que justifica el sistema completo. En muchas de estas casas el punto de partida es una caldera antigua o una instalación por radiadores de alta temperatura, y el proyecto empieza revisando si los emisores existentes se pueden aprovechar.",
      "La climatización por conductos con zonificación es el otro trabajo característico, porque estas viviendas tienen falso techo o espacio para pasar la red y porque el confort por zonas importa cuando hay dormitorios en plantas distintas con orientaciones opuestas. Un sistema zonificado bien equilibrado evita el clásico problema de tener que enfriar toda la casa para que llegue a la habitación del fondo.",
      "En la parte eléctrica, la casa unifamiliar plantea necesidades propias: potencia suficiente para clima, inducción y punto de recarga de vehículo eléctrico; cuadro con separación por plantas y zonas; iluminación interior y exterior; automatismos de riego, puerta y persianas; y protección contra sobretensiones para proteger electrónica y equipos de climatización.",
      "La Floresta y Valldoreix añaden un matiz: entorno más boscoso, parcelas con desnivel y viviendas donde el acceso para material no siempre es directo. Se planifica en la visita, porque afecta a plazos y a la forma de ejecutar.",
    ],
    serviciosDemandados: [
      {
        slug: "aerotermia",
        motivo:
          "Unifamiliar con superficie, espacio para emisores de baja temperatura y sistemas antiguos por sustituir.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Conductos con zonificación en viviendas de varias plantas y orientaciones opuestas.",
      },
      {
        slug: "electricidad",
        motivo:
          "Cuadros por zonas, automatismos, iluminación exterior y punto de recarga de vehículo eléctrico.",
      },
      {
        slug: "fontaneria",
        motivo:
          "Reformas de baño y cocina con exigencia alta de acabado y de replanteo previo.",
      },
    ],
    desplazamiento:
      "Acceso por los túneles de Vallvidrera y la AP-7. Ruta del Vallès, compartida con Cerdanyola y Sabadell.",
    cubre: [
      "Centre",
      "Mira-sol",
      "Valldoreix",
      "La Floresta",
      "Sant Francesc",
      "Golf i Can Trabal",
    ],
    faq: [
      {
        p: "¿Qué ventaja real tiene zonificar la climatización?",
        r: "Que cada zona pide frío o calor cuando lo necesita, en lugar de climatizar toda la casa para que llegue a la peor estancia. En una vivienda de varias plantas con orientaciones distintas, la diferencia se nota en confort y en consumo. Requiere compuertas motorizadas, termostatos por zona y un equilibrado serio de la red, así que hay que plantearlo en el diseño, no añadirlo después.",
      },
      {
        p: "¿Cuánto tarda una instalación completa de aerotermia en una casa?",
        r: "Depende de si hay que sustituir emisores y de la complejidad del circuito. Una sustitución de caldera aprovechando emisores existentes es un trabajo corto; instalar suelo radiante en una casa habitada es una obra en toda regla. En la visita se define el alcance y el plazo se cierra en el presupuesto, con las fases y el tiempo previsto sin servicio.",
      },
      {
        p: "¿Hacéis la parte eléctrica y la de clima en el mismo proyecto?",
        r: "Sí, y es una de las razones por las que este tipo de vivienda encaja bien con mi forma de trabajar. Una bomba de calor es una carga eléctrica importante y la instalación tiene que estar preparada. Al tener carnet REBT, RITE y F-Gas, la parte eléctrica, la térmica y la manipulación de refrigerante van en el mismo proyecto y con un solo responsable.",
      },
    ],
    destacada: true,
  },

  /* ================================================================ */
  {
    slug: "cerdanyola-del-valles",
    ciudad: "Cerdanyola del Vallès",
    nombreLargo: "Cerdanyola del Vallès",
    comarca: "Vallès Occidental",
    titleSeo: "Electricista y lampista en Cerdanyola del Vallès",
    descriptionSeo:
      "Instalador certificado en Cerdanyola del Vallès: electricidad, climatización, aerotermia y mantenimiento en vivienda, oficina y nave.",
    h1: "Instalaciones en Cerdanyola del Vallès",
    claim: "Universidad, parque tecnológico y barrios residenciales muy distintos entre sí.",
    entradilla:
      "Cerdanyola tiene una composición poco habitual: barrios residenciales consolidados, urbanizaciones dispersas en la falda de Collserola, el campus universitario y un parque científico y tecnológico. Cada uno de esos entornos pide un tipo de instalación diferente.",
    cuerpo: [
      "En el núcleo urbano predomina el bloque de mediados de siglo y de los años setenta, con las carencias habituales: cuadros insuficientes, circuitos compartidos y fontanería metálica al final de su vida útil. La renovación de cuadro y la sustitución de derivaciones concentran la mayor parte de los avisos de vivienda.",
      "Las urbanizaciones de la parte alta (Bellaterra y entorno de Collserola) son otro mundo: vivienda unifamiliar con parcela, superficie amplia y a menudo con calefacción por radiadores o sistemas antiguos. Es el terreno natural de la aerotermia y de la climatización por conductos, con la ventaja de que hay espacio real para la unidad exterior y para plantear emisores de baja temperatura.",
      "El parque científico y tecnológico y el entorno universitario aportan trabajo de tipo terciario: climatización por conductos, ventilación mecánica, alumbrado de emergencia, cuadros para equipamiento y mantenimiento programado con documentación. En estos entornos, la trazabilidad del mantenimiento no es un detalle: es un requisito.",
      "También hay tejido de nave y actividad en polígono, con el trabajo industrial habitual: líneas de fuerza, cuadros secundarios, automatismos de maquinaria, alumbrado y ventilación de gran volumen, además de intervenciones en altura en cubiertas e instalaciones exteriores.",
      "Cerdanyola queda en la ruta del Vallès junto con Sant Cugat y Sabadell, con acceso por la AP-7 y la C-58, lo que permite agrupar visitas de valoración de la comarca en una misma salida.",
    ],
    serviciosDemandados: [
      {
        slug: "climatizacion",
        motivo:
          "Conductos y ventilación en entorno terciario, universitario y en vivienda de urbanización.",
      },
      {
        slug: "aerotermia",
        motivo:
          "Unifamiliar con parcela en Bellaterra y la falda de Collserola, con espacio para emisores de baja temperatura.",
      },
      {
        slug: "electricidad",
        motivo:
          "Renovación de cuadros en bloque urbano y trabajo eléctrico en oficina y nave.",
      },
      {
        slug: "lampisteria",
        motivo:
          "Mantenimiento de comunidades y de edificios con instalaciones que exigen documentación.",
      },
    ],
    desplazamiento:
      "Acceso por la AP-7 y la C-58. Ruta del Vallès junto con Sant Cugat y Sabadell.",
    cubre: [
      "Centre",
      "Bellaterra",
      "Serraparera",
      "Canaletes",
      "Les Fontetes",
      "Parc tecnològic",
    ],
    faq: [
      {
        p: "¿Hacéis mantenimiento con informe para edificios de oficinas?",
        r: "Sí. Cada revisión deja registro de lo comprobado, de los valores medidos y del estado de cada equipo, con las actuaciones recomendadas ordenadas por prioridad. En instalaciones sujetas al RITE, el alcance y la periodicidad se ajustan a lo que marca la normativa según la potencia instalada.",
      },
      {
        p: "Vivo en una casa de Bellaterra con radiadores antiguos. ¿Puedo pasar a aerotermia?",
        r: "Depende de la superficie de emisión de esos radiadores. Si están dimensionados para trabajar a alta temperatura, la bomba de calor rendirá mal a menos que se amplíe la emisión o se sustituyan en las estancias críticas. Se calcula la demanda de la casa, se comprueban los emisores y se te dice con franqueza si el cambio compensa tal cual o si requiere inversión adicional.",
      },
      {
        p: "¿Atendéis polígonos y naves de Cerdanyola?",
        r: "Sí: líneas de fuerza, cuadros secundarios, automatismos, alumbrado industrial, ventilación de gran volumen y mantenimiento en altura de cubiertas e instalaciones exteriores mediante acceso por cuerda cuando la intervención es puntual.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "sabadell",
    ciudad: "Sabadell",
    nombreLargo: "Sabadell",
    comarca: "Vallès Occidental",
    titleSeo: "Electricista y lampista en Sabadell | ZSolutions",
    descriptionSeo:
      "Instalador certificado en Sabadell: electricidad, climatización, aerotermia e instalaciones en naves y vapores rehabilitados.",
    h1: "Instalaciones en Sabadell",
    claim: "Herencia textil: naves rehabilitadas, techos altos y volúmenes difíciles.",
    entradilla:
      "Sabadell es una ciudad industrial con historia propia, y eso se nota en el edificio: vapores textiles rehabilitados, naves reconvertidas en vivienda o en actividad, techos altos y volúmenes que no se climatizan ni se iluminan como un piso convencional.",
    cuerpo: [
      "La rehabilitación de espacio industrial es el rasgo más característico del trabajo aquí. Un antiguo vapor o una nave convertida en loft, en oficina o en local plantea problemas que no aparecen en vivienda estándar: altura libre grande que dispara la demanda de climatización, estructura vista donde el trazado de instalaciones queda a la vista y hay que resolverlo con criterio estético, y una envolvente que muchas veces aísla mal.",
      "En esos volúmenes, la climatización no se resuelve poniendo una máquina más grande. Hay que decidir entre conductos, cassettes o soluciones industriales según la altura y el uso, calcular la carga de verdad y pensar la difusión del aire para que no haya estratificación (todo el calor arriba y frío abajo). Es el tipo de instalación donde el cálculo previo separa un resultado bueno de uno caro y mediocre.",
      "El parque residencial convencional de la ciudad tiene el perfil habitual de una ciudad grande y consolidada: mucho bloque de los sesenta y setenta con cuadros insuficientes y fontanería metálica, junto a finca más antigua en el centro y promociones recientes en la periferia. La renovación de cuadro con separación de circuitos es, de nuevo, la intervención más frecuente y la de mejor retorno.",
      "El clima del Vallès es más continental que el del litoral: inviernos más fríos y veranos más calurosos que en Barcelona. Eso importa al dimensionar aerotermia, porque el punto de diseño no es el mismo que en la costa y conviene calcular con margen en calefacción. Sigue siendo una solución muy válida, pero mal dimensionada decepciona más aquí que junto al mar.",
      "El tejido industrial activo aporta el trabajo eléctrico de nave: líneas de fuerza, cuadros secundarios, automatismos de maquinaria, alumbrado industrial y ventilación, además de mantenimiento en altura de cubiertas e instalaciones exteriores.",
    ],
    serviciosDemandados: [
      {
        slug: "climatizacion",
        motivo:
          "Volúmenes altos de nave y vapor rehabilitado, donde la difusión del aire y el cálculo previo lo son todo.",
      },
      {
        slug: "electricidad",
        motivo:
          "Instalación en rehabilitación industrial con trazado visto, y renovación de cuadros en parque residencial.",
      },
      {
        slug: "aerotermia",
        motivo:
          "Vivienda unifamiliar del Vallès, con dimensionado adaptado a un invierno más frío que el del litoral.",
      },
      {
        slug: "trabajos-verticales",
        motivo:
          "Mantenimiento de cubiertas y fachadas de nave sin montar plataforma para trabajos puntuales.",
      },
    ],
    desplazamiento:
      "Acceso por la C-58. Ruta del Vallès Occidental, compartida con Terrassa y Cerdanyola.",
    cubre: [
      "Centre",
      "Gràcia",
      "Ca n'Oriac",
      "La Creu Alta",
      "Sant Oleguer",
      "Polígons industrials",
    ],
    faq: [
      {
        p: "¿Cómo se climatiza un loft con techos muy altos?",
        r: "Con cálculo previo y pensando la difusión del aire, no con una máquina más grande. En alturas libres importantes aparece la estratificación: el aire caliente se queda arriba y la zona ocupada no se beneficia. Según el uso, la solución pasa por conductos bien repartidos, equipos con alcance suficiente o sistemas de impulsión pensados para gran volumen. Se decide midiendo el espacio, no por catálogo.",
      },
      {
        p: "¿La aerotermia funciona igual de bien en el Vallès que en la costa?",
        r: "Funciona bien, pero hay que dimensionarla para un invierno más frío. El punto de diseño de calefacción no es el mismo que en el litoral, y un equipo justo que en Barcelona pasaría desapercibido aquí se nota los días fríos. Con el cálculo hecho con los datos correctos, el resultado es igual de bueno.",
      },
      {
        p: "¿Trabajáis en naves y en rehabilitación industrial?",
        r: "Sí, y es una parte importante del trabajo en Sabadell: instalación eléctrica en estructura vista, líneas de fuerza, cuadros secundarios, automatismos, alumbrado y ventilación de gran volumen. Cuando el trazado queda visto, el criterio de ejecución importa tanto como el técnico, y se acuerda contigo antes de empezar.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "terrassa",
    ciudad: "Terrassa",
    nombreLargo: "Terrassa",
    comarca: "Vallès Occidental",
    titleSeo: "Electricista y lampista en Terrassa | ZSolutions",
    descriptionSeo:
      "Instalador certificado en Terrassa: electricidad, climatización, aerotermia e instalaciones en nave e industria. Presupuesto en 24 horas.",
    h1: "Instalaciones en Terrassa",
    claim: "Ciudad extensa con mucha unifamiliar y un invierno que se nota.",
    entradilla:
      "Terrassa es una ciudad extensa, con más vivienda unifamiliar y adosada que la media del área metropolitana y con un clima claramente más continental. Esas dos características cambian el planteamiento de la climatización y hacen que aquí la calefacción pese tanto como la refrigeración.",
    cuerpo: [
      "En vivienda unifamiliar y adosada, que abunda en los barrios periféricos y urbanizaciones, la demanda de calefacción es real: los inviernos del Vallès Occidental son más fríos que los del litoral y las casas de dos plantas con superficie tienen pérdidas importantes si el aislamiento no acompaña. Cuando se plantea aerotermia hay que dimensionar con el punto de diseño correcto y revisar si los emisores actuales pueden trabajar a baja temperatura.",
      "La rehabilitación de patrimonio industrial, con los vapores modernistas y las naves reconvertidas, plantea el mismo reto que en Sabadell: alturas libres grandes, estructura vista, envolventes que aíslan mal y trazados de instalación que quedan a la vista y hay que resolver con criterio. La climatización de estos volúmenes exige cálculo y una difusión de aire pensada para evitar la estratificación.",
      "El parque de bloque de la ciudad tiene el perfil habitual: mucho edificio de los sesenta y setenta con cuadros insuficientes, circuitos compartidos y fontanería metálica con incrustación, además de comunidades que afrontan ahora la actualización de servicios generales y de alumbrado de zonas comunes.",
      "El tejido industrial sigue muy activo, con polígonos importantes donde el trabajo es de líneas de fuerza, cuadros secundarios, automatismos de maquinaria, alumbrado industrial, ventilación y mantenimiento eléctrico. También aparecen espacios confinados en instalaciones técnicas, depósitos y galerías, que exigen certificación específica para intervenir.",
      "Terrassa se atiende en la ruta del Vallès Occidental por la C-58, agrupando visitas con Sabadell y Cerdanyola cuando es posible.",
    ],
    serviciosDemandados: [
      {
        slug: "aerotermia",
        motivo:
          "Unifamiliar y adosado con demanda real de calefacción por el clima continental del Vallès.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Volúmenes de nave y vapor rehabilitado, y conductos en vivienda de superficie.",
      },
      {
        slug: "electricidad",
        motivo:
          "Trabajo eléctrico industrial en polígono y renovación de cuadros en parque residencial.",
      },
      {
        slug: "trabajos-verticales",
        motivo:
          "Cubiertas de nave, instalaciones exteriores en altura y espacios confinados en industria.",
      },
    ],
    desplazamiento:
      "Acceso por la C-58. Se agrupan visitas con Sabadell y Cerdanyola en la misma salida al Vallès.",
    cubre: [
      "Centre",
      "Ca n'Aurell",
      "Sant Pere",
      "Les Fonts",
      "Can Palet",
      "Polígons industrials",
    ],
    faq: [
      {
        p: "En Terrassa hace más frío en invierno. ¿Afecta al dimensionado?",
        r: "Sí, y bastante. El punto de diseño de calefacción es más exigente que en el litoral, así que un equipo dimensionado con datos de Barcelona se queda corto los días fríos. Se calcula con los datos climáticos correctos y con la demanda real de la vivienda, que es lo único que evita esa decepción.",
      },
      {
        p: "¿Podéis instalar climatización en una nave rehabilitada?",
        r: "Sí. La clave está en el cálculo de carga para el volumen real y en la difusión del aire, porque en alturas libres grandes el problema típico es la estratificación. Según el uso, la solución puede ser conductos, equipos de gran alcance o sistemas industriales, y se decide sobre el espacio concreto, no por catálogo.",
      },
      {
        p: "¿Dais servicio a industria en polígonos de Terrassa?",
        r: "Sí: líneas de fuerza, cuadros secundarios, automatismos de maquinaria, alumbrado y ventilación, además de trabajos en altura y en espacios confinados con certificación específica y plan de rescate previo a cualquier entrada.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "mollet-del-valles",
    ciudad: "Mollet del Vallès",
    nombreLargo: "Mollet del Vallès",
    comarca: "Vallès Oriental",
    titleSeo: "Electricista y lampista en Mollet del Vallès",
    descriptionSeo:
      "Instalador certificado en Mollet del Vallès: electricidad, climatización, aerotermia y mantenimiento en vivienda, comunidad y nave.",
    h1: "Instalaciones en Mollet del Vallès",
    claim: "Nudo de comunicaciones del Vallès Oriental, con residencial y polígono a la vez.",
    entradilla:
      "Mollet es la puerta del Vallès Oriental y un nudo de comunicaciones que concentra residencial de bloque, vivienda unifamiliar en la periferia y polígonos industriales activos. La combinación permite atender en una misma zona trabajos de vivienda, de comunidad y de nave.",
    cuerpo: [
      "El parque residencial del centro y de los barrios consolidados es mayoritariamente de los sesenta a los ochenta, con la casuística conocida: cuadros eléctricos dimensionados para otra época, ausencia de separación de circuitos y fontanería metálica con incrustación en las derivaciones. Aquí la renovación de cuadro y la sustitución de derivaciones siguen siendo la intervención con mejor relación entre coste y mejora real.",
      "La condición de nudo viario tiene una consecuencia práctica que se nota en el presupuesto: desde Mollet se llega con facilidad a buena parte del Vallès Oriental, así que los trabajos de la comarca se pueden agrupar en la misma salida. Para un contrato de mantenimiento eso significa tiempos de respuesta razonables sin que el desplazamiento se coma la factura, que es justo lo que suele fallar cuando se contrata a alguien de Barcelona para una finca de aquí.",
      "En la periferia hay vivienda unifamiliar y adosada donde la aerotermia y la climatización por conductos tienen recorrido, con la misma advertencia que en el resto del Vallès: el invierno es más frío que en el litoral y el dimensionado tiene que reflejarlo. Un sistema calculado con datos de costa se queda corto en enero.",
      "Las comunidades de tamaño medio son otro bloque importante: servicios generales, alumbrado de escalera y garaje, grupos de presión y ventilación y achique de aparcamientos. El mantenimiento con informe periódico permite planificar en el presupuesto anual y evita las derramas por avería.",
      "Los polígonos del entorno aportan trabajo industrial: líneas de fuerza, cuadros secundarios, automatismos de maquinaria, alumbrado industrial y ventilación de gran volumen, además de mantenimiento en altura de cubiertas e instalaciones exteriores mediante acceso por cuerda.",
      "Mollet se atiende en la ruta del Vallès Oriental junto con Granollers, con acceso directo por la AP-7 y la C-17, lo que permite agrupar visitas de valoración de la comarca.",
    ],
    serviciosDemandados: [
      {
        slug: "electricidad",
        motivo:
          "Renovación de cuadros en parque residencial consolidado y trabajo eléctrico en polígono.",
      },
      {
        slug: "lampisteria",
        motivo:
          "Mantenimiento de comunidades de tamaño medio con servicios generales por actualizar.",
      },
      {
        slug: "aerotermia",
        motivo:
          "Unifamiliar y adosado de periferia, con dimensionado adaptado al invierno del Vallès.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Conductos en vivienda de superficie y ventilación en nave y actividad.",
      },
    ],
    desplazamiento:
      "Acceso por la AP-7 y la C-17. Ruta del Vallès Oriental, compartida con Granollers.",
    cubre: ["Centre", "Can Borrell", "Lourdes", "Plana Lledó", "Santa Rosa", "Polígons"],
    faq: [
      {
        p: "¿Qué incluye un contrato de mantenimiento para una comunidad?",
        r: "Se define a medida, pero lo habitual es revisión del cuarto de contadores y servicios generales, alumbrado de zonas comunes, grupo de presión, ventilación y achique del garaje, y comprobación de protecciones. Cada visita deja informe del estado y una lista de actuaciones recomendadas por prioridad, con presupuesto por partidas.",
      },
      {
        p: "¿Atendéis avisos de urgencia en Mollet?",
        r: "Los gestiono según disponibilidad y siempre avisando del plazo real. Si no puedo llegar en el tiempo que necesitas, te lo digo en el momento en lugar de dejarte esperando, y te indico cómo limitar el daño mientras tanto. En una avería activa, una respuesta honesta vale más que una promesa incumplida.",
      },
      {
        p: "¿Trabajáis en polígonos del Vallès Oriental?",
        r: "Sí: instalación y mantenimiento eléctrico industrial, automatismos, alumbrado, ventilación de gran volumen y trabajos en altura en cubiertas e instalaciones exteriores. Se entrega documentado y etiquetado para facilitar el mantenimiento posterior.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "granollers",
    ciudad: "Granollers",
    nombreLargo: "Granollers",
    comarca: "Vallès Oriental",
    titleSeo: "Electricista y lampista en Granollers | ZSolutions",
    descriptionSeo:
      "Instalador certificado en Granollers: electricidad, climatización, aerotermia, comercio e industria. Presupuesto en menos de 24 horas.",
    h1: "Instalaciones en Granollers",
    claim: "Capital comarcal con mucho comercio en planta baja e industria alrededor.",
    entradilla:
      "Granollers es capital de comarca, con un centro comercial muy activo, un parque residencial variado y un cinturón industrial potente. Esa mezcla hace que aquí el trabajo de adecuación de locales pese tanto como el de vivienda.",
    cuerpo: [
      "El comercio en planta baja del centro genera un flujo constante de adecuaciones: locales que cambian de actividad y necesitan revisar potencia, cuadro y protecciones, alumbrado de emergencia y señalización, cableado ordenado y ampliable, y el certificado de instalación eléctrica que se exige para la puesta en marcha. Es un trabajo con plazos ajustados, porque cada semana de retraso en abrir es dinero perdido para el negocio.",
      "En vivienda, la ciudad combina finca de centro de distintas épocas, bloque de los sesenta y setenta y promociones más recientes en la periferia. Los trabajos frecuentes son los de siempre en parque consolidado: cuadros que se han quedado cortos, ausencia de circuitos separados, puesta a tierra por comprobar y sustitución de instalaciones de agua metálicas.",
      "El clima del Vallès Oriental, como el del Occidental, es más continental que el del litoral, con inviernos más marcados. En unifamiliar y adosado, eso hace que la calefacción tenga peso real en el proyecto y que el dimensionado de aerotermia tenga que hacerse con el punto de diseño correcto, no con datos de costa.",
      "El cinturón industrial aporta el trabajo de nave: líneas de fuerza, cuadros secundarios, automatismos de maquinaria, alumbrado industrial, ventilación de gran volumen y mantenimiento eléctrico preventivo. Aparecen también aquí espacios confinados en instalaciones técnicas, depósitos y galerías, que requieren certificación específica y plan de rescate.",
      "Granollers se atiende en la ruta del Vallès Oriental junto con Mollet, con acceso por la AP-7 y la C-17.",
    ],
    serviciosDemandados: [
      {
        slug: "electricidad",
        motivo:
          "Adecuación eléctrica de locales comerciales con certificado y plazos ajustados de apertura.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Climatización de local comercial y de vivienda, y ventilación en nave.",
      },
      {
        slug: "aerotermia",
        motivo:
          "Unifamiliar y adosado con demanda de calefacción propia del clima del Vallès Oriental.",
      },
      {
        slug: "trabajos-verticales",
        motivo:
          "Mantenimiento en altura y espacios confinados en el cinturón industrial de la comarca.",
      },
    ],
    desplazamiento:
      "Acceso por la AP-7 y la C-17. Ruta del Vallès Oriental, compartida con Mollet del Vallès.",
    cubre: [
      "Centre",
      "Can Bassa",
      "Sant Miquel",
      "Congost",
      "Palou",
      "Polígons industrials",
    ],
    faq: [
      {
        p: "Voy a abrir un local. ¿Qué necesito de la parte eléctrica?",
        r: "Básicamente: una potencia adecuada a la actividad real, un cuadro con las protecciones correctas, alumbrado de emergencia y señalización, y el certificado de instalación eléctrica firmado por instalador autorizado. Conviene revisar todo eso antes de firmar el alquiler, porque una instalación insuficiente puede suponer un coste que cambia los números del proyecto.",
      },
      {
        p: "¿En cuánto tiempo podéis tener listo un local?",
        r: "Depende del alcance y del estado de partida, y por eso el plazo va cerrado en el presupuesto tras la visita, no antes. Lo que sí hago es decirte desde el principio si el plazo que necesitas es realista: en apertura de negocio, una fecha optimista mal calculada hace más daño que una fecha larga bien avisada.",
      },
      {
        p: "¿Hacéis mantenimiento eléctrico industrial?",
        r: "Sí, con revisión programada de cuadros, protecciones, líneas y automatismos, y con informe del estado tras cada intervención. El objetivo es detectar el problema antes de la parada, que es donde está el coste real para una empresa.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "mataro",
    ciudad: "Mataró",
    nombreLargo: "Mataró",
    comarca: "Maresme",
    titleSeo: "Electricista y lampista en Mataró | ZSolutions",
    descriptionSeo:
      "Instalador certificado en Mataró: electricidad, climatización, aerotermia y mantenimiento en litoral del Maresme. Presupuesto en 24 horas.",
    h1: "Instalaciones en Mataró",
    claim: "Capital del Maresme: casco denso, litoral salino y herencia textil.",
    entradilla:
      "Mataró combina un casco antiguo denso, una franja litoral con todo lo que implica el ambiente salino y una herencia industrial textil que ha dejado naves y volúmenes rehabilitados. Es una ciudad con parque edificado muy variado en poco espacio.",
    cuerpo: [
      "El casco antiguo tiene calles estrechas, edificación entre medianeras y fincas con instalaciones que han crecido por acumulación durante décadas. En reforma de vivienda, aquí el trabajo empieza por entender qué hay antes de decidir: comprobar la puesta a tierra, medir aislamiento de circuitos y revisar el estado real de la instalación de agua. Y el acceso, como en todo casco antiguo, condiciona plazos y forma de trabajar.",
      "La franja litoral impone el mismo régimen de mantenimiento que el resto de la costa: corrosión acelerada en unidades exteriores de climatización, soportes, cajas de conexión y luminarias de exterior. Los equipos que nadie mantiene en primera línea de mar no llegan a su vida útil, y la diferencia la marca un lavado periódico de baterías y una revisión de fijaciones.",
      "La herencia textil ha dejado naves y espacios industriales rehabilitados donde el reto es el volumen: alturas libres grandes, envolventes que aíslan regular y necesidad de una difusión de aire pensada para evitar la estratificación. Se resuelve con cálculo previo, no con más potencia.",
      "En el resto de la ciudad, el parque de bloque de los sesenta y setenta presenta la casuística habitual del área metropolitana: cuadros insuficientes, circuitos compartidos, fontanería metálica incrustada y comunidades que llegan al momento de actualizar servicios generales y alumbrado de zonas comunes.",
      "Mataró se atiende por la C-32 en la ruta del Maresme. Al estar más lejos de la base, se planifican visitas agrupadas y jornadas completas, y el desplazamiento se refleja con transparencia en el presupuesto.",
    ],
    serviciosDemandados: [
      {
        slug: "climatizacion",
        motivo:
          "Mantenimiento reforzado por ambiente salino en la franja litoral y climatización de volúmenes rehabilitados.",
      },
      {
        slug: "electricidad",
        motivo:
          "Reforma de vivienda en casco antiguo y renovación de cuadros en parque de bloque.",
      },
      {
        slug: "aerotermia",
        motivo:
          "Vivienda unifamiliar del Maresme con clima litoral favorable y espacio para emisores de baja temperatura.",
      },
      {
        slug: "lampisteria",
        motivo:
          "Mantenimiento de comunidades y puestas a punto de vivienda de temporada.",
      },
    ],
    desplazamiento:
      "Acceso por la C-32. Ruta del Maresme, con visitas agrupadas y jornadas completas para optimizar el desplazamiento.",
    cubre: [
      "Centre",
      "Eixample",
      "Cerdanyola",
      "Rocafonda",
      "Front marítim",
      "Polígons industrials",
    ],
    faq: [
      {
        p: "¿Cada cuánto hay que mantener un aire acondicionado en primera línea de mar?",
        r: "Con más frecuencia que tierra adentro. Como criterio, además de la revisión antes de cada temporada, conviene un lavado de baterías y una comprobación de fijaciones y de partes metálicas expuestas, porque la sal ataca justo esos puntos. En instalación nueva junto al mar, elegir equipos y soportes preparados para ambiente salino cambia mucho la vida útil.",
      },
      {
        p: "¿Trabajáis en el Maresme además de en Mataró?",
        r: "Sí, la ruta del Maresme se organiza por la C-32 y se atienden municipios de la comarca en la misma salida cuando el trabajo lo justifica. Al planificar visitas agrupadas, el desplazamiento pesa menos en el presupuesto y el plazo es más previsible.",
      },
      {
        p: "¿Cómo se decide si una instalación antigua se repara o se renueva?",
        r: "Midiendo. Aislamiento de los circuitos, estado de la puesta a tierra, presión y caudal en los puntos más desfavorables de la instalación de agua, y estado real de lo que se ve al abrir una caja de registro. Con esos datos se ve si tiene sentido intervenir por partes o si renovar de una vez sale más barato a medio plazo.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "manresa",
    ciudad: "Manresa",
    nombreLargo: "Manresa",
    comarca: "Bages",
    titleSeo: "Electricista y lampista en Manresa | ZSolutions",
    descriptionSeo:
      "Instalador certificado en Manresa: aerotermia dimensionada para clima continental, electricidad, climatización e industria del Bages.",
    h1: "Instalaciones en Manresa",
    claim: "Interior de Cataluña: el invierno manda en todas las decisiones.",
    entradilla:
      "Manresa está en el interior, y eso cambia las prioridades. Aquí la calefacción no es un complemento del aire acondicionado: es el sistema principal, y cualquier proyecto de climatización o aerotermia que se dimensione con criterios de costa nace mal.",
    cuerpo: [
      "El clima del Bages es netamente continental: inviernos fríos con heladas y veranos calurosos y secos. Para la aerotermia eso significa un punto de diseño de calefacción bastante más exigente que en Barcelona, con la necesidad de calcular con margen y de valorar cómo se comporta la bomba de calor en los días más fríos. Sigue siendo una solución válida y eficiente, pero mal dimensionada aquí decepciona de verdad, no como en el litoral, donde el error se disimula.",
      "El parque edificado incluye casco antiguo de piedra con paredes gruesas, edificación de bloque de la expansión industrial y vivienda unifamiliar en la periferia y en los municipios del entorno. Las paredes gruesas del casco antiguo tienen una inercia térmica considerable, lo que influye en cómo se plantea la calefacción: sistemas que trabajan de forma continuada suelen dar mejor resultado que los de arranque y parada.",
      "En electricidad, el trabajo habitual combina reforma de vivienda en parque antiguo (cuadros insuficientes, ausencia de circuitos separados, puesta a tierra por comprobar) con instalación en unifamiliar y con el trabajo industrial de los polígonos del entorno.",
      "El tejido industrial del Bages aporta líneas de fuerza, cuadros secundarios, automatismos de maquinaria, alumbrado industrial y ventilación, además de intervenciones en altura y en espacios confinados en instalaciones técnicas, depósitos y galerías.",
      "Manresa está a distancia real de Barcelona, así que el trabajo se organiza en jornadas completas y visitas agrupadas. Para proyectos completos de instalación tiene todo el sentido; para un aviso corto de mantenimiento, lo honesto es decir que probablemente te conviene alguien más cerca, y así te lo diré.",
    ],
    serviciosDemandados: [
      {
        slug: "aerotermia",
        motivo:
          "Clima continental con demanda de calefacción alta: el dimensionado correcto es aquí determinante.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Calefacción y refrigeración en vivienda de casco antiguo con mucha inercia térmica y en unifamiliar.",
      },
      {
        slug: "electricidad",
        motivo:
          "Reforma en parque antiguo, instalación en unifamiliar y trabajo eléctrico industrial en polígono.",
      },
      {
        slug: "trabajos-verticales",
        motivo:
          "Mantenimiento en altura y espacios confinados en instalaciones industriales del Bages.",
      },
    ],
    desplazamiento:
      "Acceso por la C-16. Se trabaja en jornadas completas y visitas agrupadas; para avisos cortos de mantenimiento, te diré con franqueza si te conviene alguien más cercano.",
    cubre: ["Centre històric", "Escodines", "Barri Antic", "Bases de Manresa", "Polígons del Bages"],
    faq: [
      {
        p: "¿La aerotermia aguanta bien un invierno del interior?",
        r: "Sí, siempre que esté dimensionada para ello. Las bombas de calor actuales trabajan a temperaturas exteriores bajas, pero su capacidad cae a medida que baja el termómetro, así que el equipo tiene que elegirse por su rendimiento en el punto de diseño de la zona y no por el dato de catálogo en condiciones favorables. Ese cálculo es la diferencia entre un sistema que cumple y uno que decepciona en enero.",
      },
      {
        p: "Tengo una casa de piedra con paredes muy gruesas. ¿Qué sistema me conviene?",
        r: "La inercia térmica de esas paredes hace que la casa tarde en calentarse y en enfriarse. Suelen funcionar mejor los sistemas que trabajan de forma continuada a temperatura moderada, como el suelo radiante, que los que arrancan y paran buscando temperatura rápido. Se valora con el cálculo de demanda y con el uso real que le das a la vivienda.",
      },
      {
        p: "¿Os desplazáis hasta Manresa para cualquier trabajo?",
        r: "Para proyectos completos de instalación, sí, organizados en jornadas completas. Para un aviso corto de mantenimiento, lo honesto es decirte que probablemente te sale mejor alguien de la zona, y prefiero decírtelo antes que cobrarte un desplazamiento que no te aporta nada.",
      },
    ],
    destacada: false,
  },

  /* ================================================================ */
  {
    slug: "girona",
    ciudad: "Girona",
    nombreLargo: "Girona",
    comarca: "Gironès",
    titleSeo: "Instalador certificado en Girona | ZSolutions",
    descriptionSeo:
      "Instalaciones en Girona para proyectos que justifican el desplazamiento: aerotermia, climatización, trabajos verticales y espacios confinados.",
    h1: "Instalaciones en Girona",
    claim: "Proyectos completos y trabajo especializado que justifica el desplazamiento.",
    entradilla:
      "Girona está fuera del radio de trabajo diario, y conviene decirlo claro desde el principio. Me desplazo para proyectos completos de instalación y para trabajo especializado (trabajos verticales, espacios confinados, aerotermia bien calculada) donde la especialización compensa el desplazamiento. Para un aviso corto, te conviene alguien de la zona.",
    cuerpo: [
      "El motivo por el que aparece Girona en las zonas de actuación es la especialización. El trabajo vertical de nivel 3 y, sobre todo, la intervención certificada en espacios confinados son servicios con oferta limitada fuera del área metropolitana, y son trabajos que se planifican con antelación y se ejecutan en jornadas completas. Ahí el desplazamiento no distorsiona el presupuesto.",
      "Lo mismo ocurre con los proyectos completos de instalación en vivienda unifamiliar: aerotermia con cálculo de demanda, climatización por conductos con zonificación y la parte eléctrica asociada. Son trabajos de varios días que se organizan en bloque, no visitas sueltas, y en los que tener las tres habilitaciones (REBT, RITE y F-Gas) en la misma persona evita coordinar a tres empresas a distancia.",
      "El clima del Gironès es más continental que el del litoral barcelonés, con inviernos más fríos, y eso influye directamente en el dimensionado de la calefacción y de la aerotermia. Es el mismo criterio que aplico en el Bages o en el Vallès: el punto de diseño manda, y un cálculo con datos de costa produce sistemas que se quedan cortos.",
      "En industria, el trabajo típico es el de nave: líneas de fuerza, cuadros secundarios, automatismos, alumbrado, ventilación y mantenimiento en altura de cubiertas e instalaciones exteriores, además de las entradas en espacios confinados que exigen procedimiento y plan de rescate.",
      "La regla que aplico es simple y te la digo antes de que preguntes: si el trabajo no justifica el desplazamiento, te lo diré y te ahorraré el presupuesto. Prefiero perder un encargo a cobrarte un traslado que no te aporta valor.",
    ],
    serviciosDemandados: [
      {
        slug: "trabajos-verticales",
        motivo:
          "Espacios confinados e intervención en altura de nivel 3, con oferta limitada fuera del área metropolitana.",
      },
      {
        slug: "aerotermia",
        motivo:
          "Proyectos completos en vivienda unifamiliar, dimensionados para un invierno más frío que el del litoral.",
      },
      {
        slug: "climatizacion",
        motivo:
          "Instalaciones por conductos con zonificación planificadas en jornadas completas.",
      },
      {
        slug: "electricidad",
        motivo:
          "Parte eléctrica asociada a los proyectos completos y trabajo industrial en nave.",
      },
    ],
    desplazamiento:
      "Fuera del radio diario. Se atiende por la AP-7 para proyectos completos y trabajo especializado, planificados con antelación y en jornadas completas.",
    cubre: [
      "Girona ciutat",
      "Gironès",
      "Proyectos completos y trabajo especializado en la provincia",
    ],
    faq: [
      {
        p: "¿Trabajáis realmente en Girona o solo aparece en la lista?",
        r: "Trabajo, pero con una condición clara: proyectos completos y trabajo especializado que justifiquen el desplazamiento, planificados con antelación y ejecutados en jornadas completas. No atiendo avisos cortos de mantenimiento a esta distancia, y te lo digo de entrada para que no pierdas tiempo.",
      },
      {
        p: "¿Qué tipo de trabajo compensa a esta distancia?",
        r: "Sobre todo intervención en espacios confinados y trabajo vertical de nivel 3, donde la oferta certificada es más escasa, y proyectos completos de instalación en vivienda unifamiliar (aerotermia, conductos y la parte eléctrica asociada) que ocupan varios días seguidos.",
      },
      {
        p: "¿Cómo se calcula el desplazamiento en el presupuesto?",
        r: "Desglosado y a la vista, nunca camuflado en otras partidas. Si al valorar el trabajo veo que el desplazamiento lo hace poco razonable para ti, te lo digo antes de emitir el presupuesto.",
      },
    ],
    destacada: false,
  },
];

/* -----------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------------- */

export const slugsZonas = zonas.map((z) => z.slug);

export function getZona(slug: string): Zona | undefined {
  return zonas.find((z) => z.slug === slug);
}

export const zonasDestacadas = zonas.filter((z) => z.destacada);

/** Zonas agrupadas por comarca, para el hub y el pie de página. */
export function zonasPorComarca(): { comarca: string; zonas: Zona[] }[] {
  const mapa = new Map<string, Zona[]>();
  for (const z of zonas) {
    const lista = mapa.get(z.comarca) ?? [];
    lista.push(z);
    mapa.set(z.comarca, lista);
  }
  return [...mapa.entries()].map(([comarca, lista]) => ({ comarca, zonas: lista }));
}
