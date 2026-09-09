import type { NombreIcono } from "@/components/ui/ServiceIcon";
import type { NombreFoto } from "./fotos";

export type PasoProceso = { paso: string; titulo: string; detalle: string };
export type ItemLista = { titulo: string; detalle: string };
export type ParFaq = { p: string; r: string };

export type Servicio = {
  slug: string;
  nombre: string;
  nombreCorto: string;
  icono: NombreIcono;
  /** < 60 caracteres */
  titleSeo: string;
  /** < 155 caracteres */
  descriptionSeo: string;
  h1: string;
  claim: string;
  resumenHome: string;
  entradilla: string;
  cuerpo: string[];
  incluye: ItemLista[];
  paraQuien: ItemLista[];
  proceso: PasoProceso[];
  /** ids de `certificaciones.ts` */
  certificaciones: string[];
  faq: ParFaq[];
  /** slugs de servicios relacionados */
  relacionados: string[];
  palabrasClave: string[];
  /**
   * Foto real del servicio. Si falta, la página muestra el hueco con la cota
   * de lo que hay que aportar en lugar de una imagen de stock.
   * TODO (Alex): faltan las de fontanería, climatización, aerotermia y lampistería.
   */
  foto?: { nombre: NombreFoto; alt: string; posicion?: string };
};

export const servicios: Servicio[] = [
  /* ================================================================
     01 · ELECTRICIDAD
     ================================================================ */
  {
    slug: "electricidad",
    nombre: "Electricidad",
    nombreCorto: "Electricidad",
    icono: "electricidad",
    titleSeo: "Electricista en Barcelona | Boletines y cuadros | ZSol",
    descriptionSeo:
      "Electricista autorizado en Barcelona: instalaciones completas, cuadros, automatismos, boletines y ampliaciones de potencia. Presupuesto en menos de 24 h.",
    h1: "Electricista autorizado en Barcelona",
    claim: "Instalaciones completas, cuadros, automatismos y certificaciones.",
    resumenHome:
      "Instalaciones completas, cuadros eléctricos, automatismos, boletines y resolución de averías.",
    entradilla:
      "Instalaciones eléctricas ejecutadas y firmadas por un instalador con carnet REBT, no por un intermediario que subcontrata la obra. Desde una avería puntual en una vivienda del Eixample hasta la instalación completa de un local, un cuadro nuevo o el boletín que te pide la compañía para dar de alta el suministro.",
    cuerpo: [
      "Una instalación eléctrica mal resuelta no se nota el primer día: se nota tres años después, cuando un diferencial salta sin motivo aparente, cuando una regleta se calienta detrás de un falso techo o cuando llega la inspección y aparece que el cuadro no cumple el Reglamento Electrotécnico de Baja Tensión. La mayor parte de las averías que me llegan no son averías: son instalaciones que nacieron mal y han aguantado hasta que han dejado de aguantar.",
      "Trabajo con el reglamento delante y con el criterio de quien ha estado en obra desde 2012. Eso significa dimensionar las secciones de cable por cálculo y no por costumbre, separar circuitos de verdad en lugar de colgarlo todo del mismo magnetotérmico, dejar el cuadro etiquetado circuito por circuito y entregar el esquema unifilar actualizado. Cuando el trabajo se documenta, el siguiente que entre en esa instalación (o tú, dentro de cinco años) sabe exactamente qué hay.",
      "En vivienda, lo más habitual es la renovación completa de instalaciones antiguas: fincas del ensanche con montantes de aluminio, sin toma de tierra útil o con un cuadro de dos elementos que ya no da para una cocina de inducción y una bomba de calor. La reforma se planifica por fases para que la vivienda no se quede sin luz más tiempo del imprescindible, y se cierra con el certificado de instalación eléctrica (CIE) que legaliza lo hecho.",
      "En local y actividad, el punto crítico suele ser la potencia y la protección: adecuar el cuadro general, resolver el alumbrado de emergencia, dejar el cableado ordenado y accesible en bandeja, y montar los automatismos que el negocio necesita para funcionar sin depender de alguien que pulse un interruptor. En comunidad de vecinos, los trabajos recurrentes son la revisión de cuartos de contadores, la sustitución del alumbrado de zonas comunes por luminarias LED con detección de presencia y la puesta a punto de la línea de servicios generales.",
      "También resuelvo lo que nadie quiere coger: la avería que no aparece. Fugas a tierra intermitentes, cortocircuitos que solo se manifiestan con la instalación caliente, sobretensiones que están matando electrónica. Se localizan midiendo, aislando circuito a circuito y descartando, no cambiando piezas a ver si suena la flauta. Cuando la causa aparece, se explica y se documenta, para que no vuelva.",
    ],
    incluye: [
      {
        titulo: "Instalación eléctrica completa",
        detalle:
          "Vivienda, local o nave: trazado, canalización, cableado, mecanismos y puesta en marcha, con esquema unifilar de la instalación entregada.",
      },
      {
        titulo: "Cuadros eléctricos y protecciones",
        detalle:
          "Sustitución y ampliación de cuadros, separación real de circuitos, diferenciales superinmunizados, protección contra sobretensiones y etiquetado completo.",
      },
      {
        titulo: "Boletín eléctrico y CIE",
        detalle:
          "Certificado de instalación eléctrica firmado por instalador autorizado, memoria técnica cuando procede y tramitación para el alta o el cambio de titularidad del suministro.",
      },
      {
        titulo: "Ampliación de potencia",
        detalle:
          "Estudio de la carga real, adecuación de la instalación al nuevo valor contratado y documentación necesaria para que la distribuidora acepte el cambio.",
      },
      {
        titulo: "Automatismos y control",
        detalle:
          "Contactores, temporizadores, detección de presencia, telerruptores y cuadros de maniobra para instalaciones que tienen que funcionar solas.",
      },
      {
        titulo: "Iluminación",
        detalle:
          "Diseño y montaje de iluminación interior y exterior, sustitución a LED, alumbrado de emergencia y regulación por zonas.",
      },
      {
        titulo: "Resolución de averías",
        detalle:
          "Localización de derivaciones, fugas a tierra y cortocircuitos con instrumentación, no por sustitución a ciegas. Se entrega el diagnóstico por escrito.",
      },
      {
        titulo: "Puntos de recarga y cargas nuevas",
        detalle:
          "Preparación de la instalación para vehículo eléctrico, bomba de calor o cocina de inducción, verificando que el cuadro y la acometida lo soportan.",
      },
    ],
    paraQuien: [
      {
        titulo: "Vivienda",
        detalle:
          "Reformas integrales, renovación de instalaciones antiguas, cuadros obsoletos, averías y legalización para el alta de luz.",
      },
      {
        titulo: "Local u oficina",
        detalle:
          "Adecuación eléctrica para apertura, alumbrado de emergencia, potencia adaptada a la actividad y cableado ordenado y ampliable.",
      },
      {
        titulo: "Comunidad de vecinos",
        detalle:
          "Servicios generales, cuartos de contadores, alumbrado de escalera y garaje, y puesta al día de instalaciones comunitarias.",
      },
      {
        titulo: "Nave industrial",
        detalle:
          "Líneas de fuerza, cuadros secundarios, automatismos de maquinaria y mantenimiento eléctrico preventivo.",
      },
    ],
    proceso: [
      {
        paso: "01",
        titulo: "Contacto",
        detalle:
          "Me cuentas qué necesitas por el formulario, WhatsApp o teléfono. Respondo en menos de 24 horas con una primera valoración y las dudas técnicas que haga falta resolver.",
      },
      {
        paso: "02",
        titulo: "Visita y valoración",
        detalle:
          "Veo la instalación real: cuadro, acometida, estado del cableado y condicionantes del inmueble. De ahí sale un presupuesto cerrado, con materiales y plazos, sin partidas abiertas.",
      },
      {
        paso: "03",
        titulo: "Ejecución",
        detalle:
          "Trabajo planificado por fases para minimizar el tiempo sin suministro, con la obra protegida y recogida cada día. Cualquier desviación se comunica antes de ejecutarla.",
      },
      {
        paso: "04",
        titulo: "Certificación y entrega",
        detalle:
          "Mediciones finales, cuadro etiquetado, esquema unifilar y certificado de instalación eléctrica cuando el trabajo lo requiere. Te queda documentado qué se ha hecho.",
      },
    ],
    certificaciones: ["rebt", "asesor-energetico", "recurso-preventivo", "agente-descargo"],
    faq: [
      {
        p: "¿Qué es exactamente un boletín eléctrico y cuándo lo necesito?",
        r: "El boletín, formalmente Certificado de Instalación Eléctrica (CIE), es el documento que firma un instalador autorizado para acreditar que una instalación cumple el REBT. Te lo van a pedir para dar de alta un suministro nuevo, para reactivar uno que lleva mucho tiempo de baja, para ampliar potencia por encima del límite del boletín anterior y en algunos cambios de titularidad. Tiene una vigencia limitada, así que si el tuyo tiene muchos años probablemente haya que emitir uno nuevo.",
      },
      {
        p: "¿Puedes ampliarme la potencia contratada?",
        r: "Sí, pero la ampliación no es solo una gestión administrativa. Antes hay que comprobar que la instalación aguanta el nuevo valor: sección de la derivación individual, calibre del interruptor general, estado del cuadro y de la puesta a tierra. Primero se revisa, se adecúa lo que haga falta y se emite el certificado; con ese documento la comercializadora ya puede tramitar el cambio con la distribuidora.",
      },
      {
        p: "Me salta el diferencial sin motivo aparente. ¿Eso se puede localizar?",
        r: "Casi siempre sí. Un diferencial que salta es un diferencial que está midiendo una fuga real de corriente, aunque no se vea. Se localiza midiendo el aislamiento circuito a circuito y descartando por partes, a veces dejando la instalación en carga porque la fuga solo aparece con humedad o con el termo funcionando. Es un trabajo de método, no de cambiar piezas hasta acertar.",
      },
      {
        p: "¿Hace falta cambiar toda la instalación de un piso antiguo?",
        r: "No siempre. Depende del estado del cableado, de si hay toma de tierra útil y de qué se va a conectar. Hay pisos donde tiene sentido renovar cuadro y circuitos críticos y conservar el resto, y otros donde reformar por partes sale más caro que hacerlo bien de una vez. Lo veo en la visita y te digo con franqueza cuál de los dos casos es el tuyo.",
      },
      {
        p: "¿Trabajas con comunidades de vecinos y con administradores de fincas?",
        r: "Sí. En comunidad el trabajo habitual es servicios generales, cuarto de contadores, alumbrado de escalera y garaje, y puesta al día de instalaciones que llevan décadas sin tocarse. Presupuesto detallado por partidas para que la junta pueda aprobarlo, y trabajo coordinado con el administrador y con los horarios de la finca.",
      },
      {
        p: "¿Preparas la instalación para un punto de recarga de coche eléctrico?",
        r: "Sí. Lo importante es el paso previo: verificar que la acometida y el cuadro soportan la nueva carga, y decidir si hace falta control dinámico de potencia para no quedarte sin suministro cuando el coche carga. Se ejecuta la línea, la protección dedicada y la puesta a tierra, y se deja documentado como parte de la instalación.",
      },
    ],
    relacionados: ["climatizacion", "aerotermia", "lampisteria"],
    palabrasClave: [
      "electricista Barcelona",
      "boletín eléctrico Barcelona",
      "certificado de instalación eléctrica",
      "ampliación de potencia Barcelona",
      "cuadro eléctrico Barcelona",
      "instalador autorizado baja tensión",
    ],
    foto: {
      nombre: "alex-retrato-obra",
      alt: "Alex Zsurzs con ropa de trabajo de ZSURZS Instalaciones en una obra, con el metro en el cinturón",
      posicion: "50% 20%",
    },
  },

  /* ================================================================
     02 · FONTANERÍA
     ================================================================ */
  {
    slug: "fontaneria",
    nombre: "Fontanería",
    nombreCorto: "Fontanería",
    icono: "fontaneria",
    titleSeo: "Fontanero en Barcelona | Fugas y reformas | ZSolutions",
    descriptionSeo:
      "Fontanero en Barcelona: instalaciones de agua, desagües, sustitución de tuberías, griferías y detección de fugas sin romper. Presupuesto en menos de 24 h.",
    h1: "Fontanero en Barcelona",
    claim: "Sistemas de agua, desagües y detección de fugas.",
    resumenHome:
      "Sistemas de agua, desagües, sustitución de tuberías, griferías y detección de fugas.",
    entradilla:
      "Instalaciones de agua bien planteadas, con materiales que no dan sorpresas y uniones que se pueden inspeccionar. Y cuando el problema ya existe, localización de la fuga antes de romper: en una finca antigua, picar la pared equivocada cuesta mucho más que buscar bien.",
    cuerpo: [
      "La fontanería es el oficio donde peor envejece una mala decisión. Un tramo de tubería empotrado sin registro, una unión hecha con prisa detrás de un alicatado o una pendiente de desagüe mal calculada no fallan hoy: fallan cuando el piso ya está reformado y el daño se lo come el vecino de abajo. Por eso trabajo con el criterio de dejar la instalación registrable siempre que la obra lo permita, y de documentar por dónde pasa cada línea.",
      "En sustitución de instalaciones antiguas, el trabajo típico en Barcelona es cambiar montantes y derivaciones de plomo, hierro galvanizado o cobre viejo por multicapa o polipropileno, según lo que pida la instalación. No es solo tirar tubo nuevo: hay que replantear el trazado para que las derivaciones tengan presión estable, colocar llaves de corte por estancia (y no una sola llave general que obligue a dejar toda la casa sin agua para cambiar un grifo) y resolver la salida de desagües respetando pendientes y ventilación.",
      "La detección de fugas merece capítulo aparte. Antes de picar, se descarta: se cierra por sectores, se mide caudal en el contador, se comprueba la evolución de la humedad y se acota la zona. Solo cuando la fuga está localizada con criterio se abre, y se abre lo mínimo. Este orden ahorra obra, ahorra dinero y, sobre todo, evita el escenario clásico de romper tres paredes buscando algo que estaba en la cuarta.",
      "En reforma de baño y cocina, la fontanería es lo que condiciona todo lo demás. Alturas de tomas, separación entre agua fría y caliente, distancia a la instalación eléctrica, salida de electrodomésticos y ventilación de bajantes. Cuando esas cotas se replantean antes de alicatar, la reforma sale a la primera; cuando se improvisan, aparecen los parches que se ven durante años.",
      "También hago el trabajo silencioso: sustitución de griferías y mecanismos de cisterna que gotean y se comen la factura, montaje de grupos de presión donde la última planta no tiene caudal, instalación y sustitución de termos y calentadores, y puesta a punto de la instalación antes de una venta o un alquiler para que no aparezcan sorpresas en la entrega.",
    ],
    incluye: [
      {
        titulo: "Instalación de agua fría y caliente",
        detalle:
          "Trazado nuevo en vivienda, local o comunidad, con llaves de corte por estancia y materiales adecuados a la presión y la temperatura de la instalación.",
      },
      {
        titulo: "Sustitución de tuberías",
        detalle:
          "Cambio de instalaciones de plomo, hierro galvanizado o cobre deteriorado por multicapa o polipropileno, con replanteo del trazado y registro donde es posible.",
      },
      {
        titulo: "Desagües y evacuación",
        detalle:
          "Redes de desagüe, sustitución de bajantes, corrección de pendientes, sifones y ventilación para eliminar olores y retornos.",
      },
      {
        titulo: "Detección de fugas",
        detalle:
          "Localización por sectorización, control de contador y seguimiento de la humedad antes de abrir. Se pica lo mínimo y solo donde está la fuga.",
      },
      {
        titulo: "Griferías y sanitarios",
        detalle:
          "Sustitución de grifería, mecanismos de cisterna, inodoros, platos de ducha y mamparas, con las tomas dejadas a cota correcta.",
      },
      {
        titulo: "Termos, calentadores y grupos de presión",
        detalle:
          "Instalación y sustitución de producción de agua caliente sanitaria y de grupos de presión para plantas altas con caudal insuficiente.",
      },
      {
        titulo: "Reforma de baño y cocina",
        detalle:
          "Replanteo completo de fontanería antes del alicatado, coordinado con la instalación eléctrica y con la salida de electrodomésticos.",
      },
      {
        titulo: "Soldadura blanda y fuerte",
        detalle:
          "Uniones ejecutadas con la técnica que pide cada material e instalación, incluida soldadura fuerte para líneas frigoríficas y de cobre a presión.",
      },
    ],
    paraQuien: [
      {
        titulo: "Vivienda",
        detalle:
          "Reformas de baño y cocina, cambio de instalaciones antiguas, fugas, falta de presión y sustitución de aparatos.",
      },
      {
        titulo: "Local u oficina",
        detalle:
          "Instalaciones nuevas para actividad, aseos, office, evacuación y adecuación previa a la apertura.",
      },
      {
        titulo: "Comunidad de vecinos",
        detalle:
          "Montantes generales, bajantes, fugas en zonas comunes y sustituciones programadas por fases sin dejar la finca sin agua.",
      },
      {
        titulo: "Nave industrial",
        detalle:
          "Redes de agua, aseos y vestuarios, evacuación y mantenimiento de instalaciones hidráulicas.",
      },
    ],
    proceso: [
      {
        paso: "01",
        titulo: "Contacto",
        detalle:
          "Cuéntame qué pasa y desde cuándo. En fugas, el histórico importa: cuándo aparece la mancha, si empeora al usar agua caliente, si el contador se mueve con todo cerrado.",
      },
      {
        paso: "02",
        titulo: "Visita y valoración",
        detalle:
          "Inspección real de la instalación, sectorización y comprobación de presión y caudal. Presupuesto cerrado con el alcance de obra que hace falta abrir, si hay que abrir.",
      },
      {
        paso: "03",
        titulo: "Ejecución",
        detalle:
          "Corte de agua acotado en el tiempo, protección de la zona y ejecución con prueba de presión antes de cerrar cualquier tramo empotrado.",
      },
      {
        paso: "04",
        titulo: "Certificación y entrega",
        detalle:
          "Prueba de estanqueidad, comprobación de caudales en todos los puntos y entrega del trazado de la instalación para que sepas por dónde pasa todo.",
      },
    ],
    certificaciones: ["fontaneria", "soldadura", "recurso-preventivo"],
    faq: [
      {
        p: "Tengo una mancha de humedad. ¿Hay que picar para saber de dónde viene?",
        r: "No de entrada. Lo primero es descartar: cerrar por sectores, ver si el contador sigue girando con todo cerrado, comprobar si la humedad cambia al usar agua caliente y revisar la posibilidad de que venga de un desagüe o de una filtración exterior en lugar de una tubería a presión. Solo cuando la zona está acotada se abre, y se abre lo justo.",
      },
      {
        p: "¿Merece la pena cambiar toda la instalación de agua de un piso antiguo?",
        r: "Si la instalación es de plomo o de hierro galvanizado en mal estado, sí: son materiales que se van estrangulando por dentro y acaban dando baja presión y averías repetidas. Si es cobre en buen estado, muchas veces basta con sustituir tramos concretos y añadir llaves de corte. La diferencia se ve en la visita, comprobando presión real en los puntos más desfavorables.",
      },
      {
        p: "En el último piso apenas sale agua. ¿Tiene solución?",
        r: "Casi siempre. Primero hay que distinguir si es un problema de presión de red, de sección de tubería insuficiente o de obstrucción por incrustación. Según el caso, la solución pasa por sustituir la derivación, corregir el trazado o instalar un grupo de presión correctamente dimensionado. Poner un grupo sin diagnosticar es la manera rápida de gastar dinero y seguir igual.",
      },
      {
        p: "¿Puedes coordinar la fontanería con la reforma que ya tengo en marcha?",
        r: "Sí, y es lo recomendable. La fontanería marca cotas que condicionan alicatado, mobiliario y electrodomésticos, así que cuanto antes se replantee, menos parches habrá después. Trabajo coordinado con el resto de oficios y dejo las tomas señalizadas y comprobadas antes de que se cierre nada.",
      },
      {
        p: "¿Qué material usas para las tuberías?",
        r: "Depende de la instalación. En vivienda suelo trabajar con multicapa por su estabilidad y su facilidad de trazado, y con polipropileno cuando la instalación lo pide. El cobre sigue teniendo sentido en tramos concretos y en instalaciones donde ya existe. Lo que no hago es mezclar materiales incompatibles sin las transiciones adecuadas: ahí es donde nacen las corrosiones.",
      },
      {
        p: "¿Atiendes urgencias de fuga?",
        r: "Las gestiono según disponibilidad y avisando siempre con franqueza del plazo real. Si no puedo llegar a tiempo, lo digo en el momento en lugar de dejarte esperando: en una fuga activa, media hora de indecisión cuesta más que una llamada honesta. Mientras tanto te indico cómo cortar por sectores para limitar el daño.",
      },
    ],
    relacionados: ["climatizacion", "lampisteria", "aerotermia"],
    palabrasClave: [
      "fontanero Barcelona",
      "detección de fugas Barcelona",
      "cambio de tuberías Barcelona",
      "reforma de baño Barcelona",
      "fontanería comunidad de vecinos",
    ],
  },

  /* ================================================================
     03 · CLIMATIZACIÓN
     ================================================================ */
  {
    slug: "climatizacion",
    nombre: "Climatización",
    nombreCorto: "Climatización",
    icono: "climatizacion",
    titleSeo: "Aire acondicionado en Barcelona | Instalador RITE y F-Gas",
    descriptionSeo:
      "Instalador de aire acondicionado, calefacción y ventilación en Barcelona. Conductos, mantenimiento y carga de gas con habilitación RITE y F-Gas.",
    h1: "Instalador de aire acondicionado y climatización en Barcelona",
    claim: "Aire acondicionado, calefacción y ventilación con habilitación RITE y F-Gas.",
    resumenHome:
      "Aire acondicionado, calefacción, ventilación, conductos, mantenimiento y cargas de gas.",
    entradilla:
      "Climatización instalada por un profesional con carnet de instalador RITE y habilitación de gases fluorados. Eso no es un adorno del presupuesto: manipular refrigerante sin esa habilitación es ilegal, y una instalación mal cargada consume de más, rinde de menos y acaba rompiendo el compresor.",
    cuerpo: [
      "La mayoría de instalaciones de aire acondicionado que reviso tienen el mismo problema: se eligió el equipo por precio y no por cálculo. Una máquina sobredimensionada arranca y para constantemente, no deshumidifica bien y desgasta el compresor; una infradimensionada trabaja al máximo todo el verano y no llega nunca a la temperatura de consigna. El cálculo de carga térmica (orientación, superficie, aislamiento, superficie acristalada y ocupación) es lo que separa una instalación que funciona de una que se soporta.",
      "El segundo problema es el montaje. Distancias y desniveles entre unidad interior y exterior fuera de rango, líneas frigoríficas sin aislar bien, abocardados hechos con prisa, vacío insuficiente antes de abrir el circuito y desagües de condensados con pendiente inversa. Cada uno de esos detalles es invisible el día de la puesta en marcha y determinante a los dos veranos. Yo hago vacío en condiciones, compruebo estanqueidad y dejo el desagüe con pendiente y sifón donde corresponde.",
      "En conductos y ventilación, el trabajo es de replanteo: dimensionar la red para el caudal que realmente hace falta, repartir las rejillas para que no haya zonas muertas ni corrientes molestas, y dejar registros para poder limpiar. Una red de conductos bien equilibrada se nota en que no hay que subir la potencia para que llegue a la habitación del fondo. En vivienda, además, la ventilación mecánica bien resuelta es la diferencia entre una casa que renueva aire y una casa con condensaciones.",
      "En calefacción trabajo tanto instalaciones por radiadores como suelo radiante y sistemas por bomba de calor. Cuando la vivienda lo permite, la conversación honesta es hacia dónde conviene ir: mantener la caldera, sustituirla o pasar a aerotermia. Esa decisión depende del aislamiento, del uso real y de la instalación existente, y la explico con números en la mano, sin empujar hacia el sistema más caro por defecto.",
      "El mantenimiento cierra el círculo. Limpieza de filtros y baterías, comprobación de presiones y temperaturas, revisión de estanqueidad del circuito frigorífico, control del desagüe y verificación eléctrica de la unidad. La mayoría de las averías caras de climatización empiezan como un mantenimiento que no se hizo: una batería sucia obliga al compresor a trabajar fuera de rango durante meses.",
    ],
    incluye: [
      {
        titulo: "Instalación de aire acondicionado",
        detalle:
          "Split, multisplit y conductos, con cálculo previo de carga térmica, líneas frigoríficas aisladas, vacío correcto y prueba de estanqueidad.",
      },
      {
        titulo: "Redes de conductos",
        detalle:
          "Diseño y montaje de conductos, plenums, rejillas y difusores, con equilibrado de caudales y registros para limpieza y mantenimiento.",
      },
      {
        titulo: "Ventilación",
        detalle:
          "Ventilación mecánica en vivienda, local y aseos, extracción forzada y renovación de aire para eliminar condensaciones y humedad.",
      },
      {
        titulo: "Calefacción",
        detalle:
          "Radiadores, suelo radiante y sistemas por bomba de calor, con equilibrado de circuitos y control por zonas.",
      },
      {
        titulo: "Carga y recuperación de gas refrigerante",
        detalle:
          "Manipulación de gases fluorados con habilitación F-Gas: detección de fugas, recuperación, carga por peso y registro de la intervención.",
      },
      {
        titulo: "Mantenimiento preventivo",
        detalle:
          "Revisiones periódicas de filtros, baterías, presiones, desagües y parte eléctrica, con informe del estado real de cada equipo.",
      },
      {
        titulo: "Sustitución de equipos",
        detalle:
          "Retirada del equipo antiguo con recuperación del refrigerante, adecuación de líneas y montaje del nuevo con puesta en marcha documentada.",
      },
      {
        titulo: "Reparación de averías",
        detalle:
          "Diagnóstico de falta de rendimiento, fugas de refrigerante, fallos de placa y problemas de condensados, midiendo antes de sustituir.",
      },
    ],
    paraQuien: [
      {
        titulo: "Vivienda",
        detalle:
          "Instalación de aire acondicionado por estancias o por conductos, calefacción, ventilación y sustitución de equipos antiguos.",
      },
      {
        titulo: "Local u oficina",
        detalle:
          "Climatización dimensionada para la ocupación real del negocio, con reparto por zonas y mantenimiento programado.",
      },
      {
        titulo: "Comunidad de vecinos",
        detalle:
          "Ventilación de zonas comunes, garajes y trasteros, y coordinación de instalaciones individuales en fachada e interior de patios.",
      },
      {
        titulo: "Nave industrial",
        detalle:
          "Climatización y renovación de aire en espacios de gran volumen, con soluciones de extracción y aportación adaptadas a la actividad.",
      },
    ],
    proceso: [
      {
        paso: "01",
        titulo: "Contacto",
        detalle:
          "Me dices qué espacio hay que climatizar y cómo se usa. Con eso ya se descartan soluciones que no encajan antes de perder tiempo en visitas.",
      },
      {
        paso: "02",
        titulo: "Visita y valoración",
        detalle:
          "Cálculo de carga térmica, comprobación del recorrido de líneas y desagües, y de la ubicación viable de la unidad exterior. Presupuesto con el equipo concreto propuesto.",
      },
      {
        paso: "03",
        titulo: "Ejecución",
        detalle:
          "Montaje con líneas aisladas, vacío en condiciones, prueba de estanqueidad y desagüe con pendiente comprobada. Sin atajos en la parte que no se ve.",
      },
      {
        paso: "04",
        titulo: "Certificación y entrega",
        detalle:
          "Puesta en marcha con toma de presiones y temperaturas, registro de la carga de refrigerante y documentación RITE cuando la instalación lo requiere.",
      },
    ],
    certificaciones: ["rite", "fgas", "conductos", "soldadura", "asesor-energetico"],
    faq: [
      {
        p: "¿Por qué es importante que el instalador tenga carnet RITE y F-Gas?",
        r: "Porque son obligatorios. El carnet de instalador RITE habilita para ejecutar y mantener instalaciones térmicas, y la habilitación de gases fluorados es imprescindible para manipular refrigerante. Sin ellas no se puede firmar la instalación ni cargar gas legalmente, y en caso de siniestro el seguro tiene un motivo perfecto para no cubrir. Yo tengo las dos.",
      },
      {
        p: "Mi aire acondicionado enfría menos que antes. ¿Es falta de gas?",
        r: "A veces sí, pero un circuito frigorífico es estanco: si falta gas es porque hay una fuga, así que recargar sin buscarla es tirar el dinero. También puede ser una batería sucia, un filtro saturado, un ventilador que ha perdido revoluciones o una sonda que lee mal. Se mide presión y temperatura antes de tocar nada, y el diagnóstico se explica con esos valores.",
      },
      {
        p: "¿Split, multisplit o conductos?",
        r: "Depende del uso y de la obra disponible. Los splits independientes dan control por estancia y son la opción sencilla en reforma parcial. El multisplit ahorra unidades exteriores cuando la fachada es un problema, a costa de que un fallo afecta a varias estancias. Los conductos dan el mejor confort y el aspecto más limpio, pero necesitan falso techo y un replanteo serio. Lo veo en la visita.",
      },
      {
        p: "¿Cada cuánto hay que hacer mantenimiento?",
        r: "Como criterio general, una revisión antes de la temporada de frío y otra antes de la de calor, con limpieza de filtros más frecuente si el entorno es polvoriento o hay mascotas. En instalaciones sujetas al RITE, la periodicidad y el alcance del mantenimiento vienen marcados por la normativa según la potencia del equipo, y eso se te concreta por escrito.",
      },
      {
        p: "¿Puedo poner la unidad exterior en el patio de luces o en la fachada?",
        r: "Depende de la normativa municipal, de los estatutos de la comunidad y de las condiciones técnicas: la máquina necesita ventilación libre, acceso para mantenimiento y una fijación segura, y no puede verter condensados a la vía pública ni al patio del vecino. En la visita compruebo qué ubicaciones son viables y cuáles van a dar problemas antes de que los den.",
      },
      {
        p: "¿Hacéis la instalación en fachada sin andamio?",
        r: "Sí, y es una de las ventajas de combinar climatización con trabajos verticales. Con acceso por cuerda certificado se resuelven las unidades exteriores, los pasos de línea y los soportes en altura sin montar andamio ni ocupar la vía pública, lo que reduce mucho el coste y el plazo de la intervención.",
      },
    ],
    relacionados: ["aerotermia", "electricidad", "trabajos-verticales"],
    palabrasClave: [
      "instalador aire acondicionado Barcelona",
      "carga de gas aire acondicionado Barcelona",
      "instalador RITE Barcelona",
      "instalador F-Gas Barcelona",
      "conductos aire acondicionado Barcelona",
    ],
  },

  /* ================================================================
     04 · AEROTERMIA
     ================================================================ */
  {
    slug: "aerotermia",
    nombre: "Aerotermia",
    nombreCorto: "Aerotermia",
    icono: "aerotermia",
    titleSeo: "Instalador de aerotermia en Barcelona | ZSolutions",
    descriptionSeo:
      "Instalación de aerotermia en Barcelona con asesoramiento energético honesto: cálculo previo, emisores, agua caliente y puesta en marcha documentada.",
    h1: "Instalador de aerotermia en Barcelona",
    claim: "Calefacción, refrigeración y agua caliente con una sola máquina, bien calculada.",
    resumenHome:
      "Instalación de sistemas de aerotermia, asesoramiento energético, eficiencia y ahorro.",
    entradilla:
      "La aerotermia funciona muy bien cuando el cálculo se hace antes de comprar la máquina, y decepciona cuando se instala como quien cambia una caldera por otra. Aquí te digo primero si tu vivienda es candidata, y solo después hablamos de equipos.",
    cuerpo: [
      "Una bomba de calor aerotérmica extrae energía del aire exterior y la lleva al interior para calefacción, refrigeración y agua caliente sanitaria. Su rendimiento se mide en COP y SCOP: por cada kWh eléctrico consumido entrega varios kWh de calor. Ese es el argumento real de la tecnología. El matiz que casi nadie explica es que el rendimiento depende de la temperatura a la que trabaje el sistema: cuanto más baja sea la temperatura de impulsión, mejor rinde. Por eso la aerotermia y el suelo radiante se llevan tan bien, y por eso conectar una bomba de calor a radiadores antiguos pensados para trabajar a alta temperatura da resultados mediocres.",
      "Antes de proponer nada, calculo la demanda térmica real de la vivienda y reviso los emisores existentes. Con esos dos datos ya se sabe si la instalación va a funcionar tal cual, si hay que sustituir emisores por unos de baja temperatura, o si el edificio necesita antes una mejora de aislamiento para que la inversión tenga sentido. Si tu caso no es bueno para aerotermia, te lo digo: prefiero perder una instalación a firmar uno de esos sistemas que el cliente acaba odiando en enero.",
      "El agua caliente sanitaria es el otro punto que decide la satisfacción con el sistema. Hay que dimensionar el acumulador para el consumo real de la casa, no para el folleto, y prever la función de protección frente a legionela. Un depósito corto convierte una instalación buena en una fuente diaria de quejas, y uno excesivo penaliza consumo y espacio.",
      "La parte eléctrica es tan importante como la hidráulica, y es donde tener carnet REBT ahorra sorpresas. Una bomba de calor supone una carga nueva y significativa: hay que revisar la potencia contratada, la sección de la línea, la protección dedicada y la puesta a tierra. He visto instalaciones perfectas hidráulicamente que saltaban cada vez que arrancaba el apoyo eléctrico porque nadie miró el cuadro.",
      "Al cierre, la instalación se pone en marcha midiendo: temperaturas de impulsión y retorno, caudales, presiones del circuito y consumos reales. Se ajustan las curvas de calefacción para el edificio concreto y te explico cómo funciona el control, porque un sistema bien configurado y mal manejado consume igual que uno mal instalado. Y se documenta todo, incluida la parte que exige el RITE.",
    ],
    incluye: [
      {
        titulo: "Estudio previo y cálculo de demanda",
        detalle:
          "Cálculo de la carga térmica de la vivienda, revisión de emisores y aislamiento, y valoración honesta de si la aerotermia es la solución adecuada.",
      },
      {
        titulo: "Instalación de la bomba de calor",
        detalle:
          "Montaje de la unidad exterior e interior, circuito hidráulico, vasos de expansión, seguridad y aislamiento de tuberías.",
      },
      {
        titulo: "Emisores de baja temperatura",
        detalle:
          "Suelo radiante, radiadores de baja temperatura o fancoils, dimensionados para que el sistema trabaje en su rango de mejor rendimiento.",
      },
      {
        titulo: "Agua caliente sanitaria",
        detalle:
          "Acumulador dimensionado al consumo real de la vivienda, con la protección antilegionela y el aislamiento correctos.",
      },
      {
        titulo: "Adecuación eléctrica",
        detalle:
          "Revisión de potencia contratada, línea dedicada, protecciones y puesta a tierra para la nueva carga, con certificado cuando procede.",
      },
      {
        titulo: "Control y zonificación",
        detalle:
          "Termostatos, control por zonas y ajuste de curvas de calefacción adaptadas al edificio, no los valores de fábrica.",
      },
      {
        titulo: "Sustitución de caldera",
        detalle:
          "Retirada de la caldera existente, adaptación del circuito y puesta en marcha del nuevo sistema con el menor tiempo posible sin servicio.",
      },
      {
        titulo: "Asesoramiento energético",
        detalle:
          "Análisis de consumos, comparativa realista frente a la instalación actual y orden recomendado de las mejoras a acometer.",
      },
    ],
    paraQuien: [
      {
        titulo: "Vivienda unifamiliar",
        detalle:
          "El escenario más favorable: calefacción, refrigeración y agua caliente con un solo sistema y espacio para emisores de baja temperatura.",
      },
      {
        titulo: "Piso en reforma",
        detalle:
          "Cuando la reforma permite cambiar emisores y pasar tuberías, la aerotermia entra bien y el ahorro se nota desde el primer invierno.",
      },
      {
        titulo: "Comunidad de vecinos",
        detalle:
          "Sustitución de sistemas centralizados de combustible por soluciones aerotérmicas, con estudio previo y presupuesto por partidas para la junta.",
      },
      {
        titulo: "Local u oficina",
        detalle:
          "Climatización y agua caliente para actividad con consumo estable, donde el ahorro de explotación amortiza la instalación.",
      },
    ],
    proceso: [
      {
        paso: "01",
        titulo: "Contacto",
        detalle:
          "Me cuentas qué sistema tienes ahora y qué te gasta. Con la factura y el tipo de emisores ya se puede orientar bastante antes de la visita.",
      },
      {
        paso: "02",
        titulo: "Visita y valoración",
        detalle:
          "Cálculo de demanda, revisión de emisores, de la ubicación de la unidad exterior y del cuadro eléctrico. Propuesta con equipo concreto y estimación de consumo.",
      },
      {
        paso: "03",
        titulo: "Ejecución",
        detalle:
          "Instalación hidráulica y eléctrica coordinadas, con el circuito purgado y equilibrado, y el tiempo sin calefacción o sin agua caliente reducido al mínimo.",
      },
      {
        paso: "04",
        titulo: "Certificación y entrega",
        detalle:
          "Puesta en marcha con mediciones, ajuste de curvas, documentación RITE y una explicación clara de cómo manejar el sistema para que rinda.",
      },
    ],
    certificaciones: ["rite", "fgas", "rebt", "aerotermia", "asesor-energetico"],
    faq: [
      {
        p: "¿La aerotermia funciona bien en el clima de Barcelona?",
        r: "Sí. El clima mediterráneo es de los más favorables para esta tecnología porque las temperaturas exteriores en invierno rara vez bajan al rango donde el rendimiento cae de verdad. En Cataluña interior o en zonas de montaña el planteamiento cambia y hay que dimensionar con más margen, pero en el área metropolitana la bomba de calor trabaja la mayor parte del año en su zona buena.",
      },
      {
        p: "¿Puedo poner aerotermia con los radiadores que ya tengo?",
        r: "Depende de a qué temperatura estén dimensionados. Los radiadores antiguos de hierro pensados para trabajar a alta temperatura obligan a la bomba a impulsar caliente, y ahí el rendimiento cae mucho. A veces basta con ampliar superficie de emisión en las estancias críticas, y otras hay que sustituirlos. Es exactamente el tipo de cosa que se decide midiendo, no suponiendo.",
      },
      {
        p: "¿Cuánto voy a ahorrar realmente?",
        r: "No te voy a dar una cifra genérica porque depende de tu consumo actual, del sistema que sustituyes, del aislamiento de la vivienda y de la tarifa eléctrica que tengas. Lo que sí hago es una estimación con tus datos reales: facturas, superficie, emisores y uso. Una estimación con números tuyos vale algo; un porcentaje de folleto, no.",
      },
      {
        p: "¿Hace ruido la unidad exterior?",
        r: "Genera ruido, como cualquier equipo con ventilador y compresor, y por eso la ubicación importa tanto como la máquina. Se estudia la distancia a ventanas y a dormitorios propios y del vecino, los apoyos antivibratorios y la orientación de la descarga de aire. Un montaje pensado desde el principio evita el conflicto vecinal que muchas instalaciones acaban teniendo.",
      },
      {
        p: "¿Hay que reforzar la instalación eléctrica?",
        r: "Muy a menudo, sí. Una bomba de calor es una carga importante y hay que comprobar potencia contratada, sección de la línea, protecciones y puesta a tierra. Como también soy instalador eléctrico autorizado, esa parte va incluida en el mismo proyecto y no depende de coordinar a un tercero a mitad de obra.",
      },
      {
        p: "¿Sirve también para refrigerar en verano?",
        r: "Sí, si el sistema y los emisores están preparados para ello. Con fancoils el frío se aprovecha bien; con suelo radiante refrescante hay que trabajar con control de humedad para evitar condensaciones. Se plantea desde el diseño, porque añadirlo después casi siempre significa rehacer parte de la instalación.",
      },
    ],
    relacionados: ["climatizacion", "electricidad", "fontaneria"],
    palabrasClave: [
      "instalador aerotermia Barcelona",
      "aerotermia Barcelona precio",
      "sustituir caldera por aerotermia",
      "bomba de calor Barcelona",
      "asesor energético Barcelona",
    ],
  },

  /* ================================================================
     05 · TRABAJOS VERTICALES
     ================================================================ */
  {
    slug: "trabajos-verticales",
    nombre: "Trabajos verticales",
    nombreCorto: "Verticales",
    icono: "verticales",
    titleSeo: "Trabajos verticales en Barcelona | IRATA Nivel 3",
    descriptionSeo:
      "Trabajos verticales en Barcelona con técnico IRATA e ITRA Nivel 3: fachadas, instalaciones en altura y espacios confinados, sin andamio.",
    h1: "Trabajos verticales en Barcelona",
    claim: "Intervenciones en altura con equipo certificado IRATA e ITRA Nivel 3.",
    resumenHome:
      "Intervenciones en altura con equipo certificado, fachadas y espacios confinados, sin andamio.",
    entradilla:
      "Acceso por cuerda para resolver en días lo que con andamio son semanas de montaje, licencia y ocupación de vía pública. Con titulación IRATA Nivel 3 e ITRA Nivel 3, que es el nivel que habilita para supervisar equipos y planificar rescate, no solo para colgarse.",
    cuerpo: [
      "El trabajo vertical no es una forma más barata de subir: es una forma distinta de plantear la intervención. Cuando el trabajo es puntual, disperso por la fachada o urgente, montar un andamio significa licencia municipal, ocupación de la calle, plazos de montaje y desmontaje y un coste fijo que muchas veces supera al de la reparación en sí. Con acceso por cuerda se llega al punto exacto, se trabaja y se recoge el mismo día.",
      "La titulación importa y conviene entender por qué. IRATA e ITRA son los dos esquemas internacionales de referencia en acceso por cuerda, y el Nivel 3 es el grado de técnico supervisor: habilita para dirigir equipos, montar sistemas complejos de anclajes y desviaciones, y planificar y ejecutar rescate en altura. Un equipo sin nivel 3 no debería estar trabajando en suspensión, porque si algo va mal, el rescate es lo que separa un susto de una tragedia.",
      "En fachada, las intervenciones habituales son revisión y reparación de elementos deteriorados, sellado de juntas y grietas, sustitución de piezas sueltas, retirada de elementos con riesgo de desprendimiento, montaje de anclajes y soportes, y todo el trabajo de instalaciones que hay que hacer por el exterior del edificio: paso de líneas, colocación de unidades exteriores de climatización, luminarias, cableado y sujeciones.",
      "La combinación de trabajos verticales con instalaciones es lo que hace distinta esta forma de trabajar. Un técnico vertical convencional sube y baja, pero necesita que suba otro para hacer la parte eléctrica o frigorífica. Aquí sube el mismo profesional que va a ejecutar la instalación: menos coordinación, menos días de acceso y una sola persona respondiendo del resultado.",
      "Los espacios confinados son la otra especialidad, y la más seria de todas. Depósitos, arquetas, pozos, colectores y galerías técnicas concentran los riesgos peores: atmósferas deficientes en oxígeno o con gases tóxicos, dificultad de evacuación y necesidad de un plan de rescate operativo antes de que nadie entre. Trabajo con certificación específica de espacios confinados y con formación sanitaria PHTLS, que es la que se aplica cuando hay que atender a alguien mientras llega la ayuda. En este tipo de intervención, el procedimiento no es papeleo: es lo único que hay.",
    ],
    incluye: [
      {
        titulo: "Instalaciones en altura",
        detalle:
          "Electricidad, climatización y fontanería ejecutadas por acceso por cuerda: paso de líneas, unidades exteriores, luminarias, soportes y anclajes.",
      },
      {
        titulo: "Fachadas",
        detalle:
          "Revisión, sellado de juntas y grietas, reparación puntual, retirada de elementos con riesgo de desprendimiento y trabajos de mantenimiento sin andamio.",
      },
      {
        titulo: "Espacios confinados",
        detalle:
          "Intervenciones en depósitos, pozos, arquetas y galerías con certificación ITRA Confined Spaces, control de atmósfera y plan de rescate previo.",
      },
      {
        titulo: "Inspección y diagnóstico",
        detalle:
          "Inspección visual y fotográfica de fachadas, cubiertas y patios interiores, con informe del estado y de las intervenciones prioritarias.",
      },
      {
        titulo: "Instalación de líneas de vida y anclajes",
        detalle:
          "Montaje de puntos de anclaje y sistemas de acceso permanentes para el mantenimiento futuro del edificio.",
      },
      {
        titulo: "Trabajos en cubierta y patios interiores",
        detalle:
          "Acceso a zonas donde no entra maquinaria: patios de luces, medianeras, torres y cubiertas de difícil acceso.",
      },
      {
        titulo: "Rescate y plan de emergencia",
        detalle:
          "Planificación de rescate en altura y en espacio confinado por técnico de Nivel 3, con formación sanitaria PHTLS aplicada a la intervención.",
      },
      {
        titulo: "Apoyo a otros gremios",
        detalle:
          "Acceso, aseguramiento y supervisión para equipos que necesitan llegar a un punto en altura sin medios propios.",
      },
    ],
    paraQuien: [
      {
        titulo: "Comunidad de vecinos",
        detalle:
          "Fachadas, patios de luces y elementos con riesgo de desprendimiento, sin montar andamio ni cortar la calle.",
      },
      {
        titulo: "Administrador de fincas",
        detalle:
          "Inspecciones documentadas y reparaciones puntuales con informe fotográfico para presentar a la junta.",
      },
      {
        titulo: "Empresa e industria",
        detalle:
          "Mantenimiento en altura, depósitos, silos, galerías técnicas y espacios confinados con procedimiento de trabajo y rescate.",
      },
      {
        titulo: "Otros instaladores",
        detalle:
          "Apoyo técnico a empresas que tienen el trabajo pero no el acceso: un equipo certificado para llegar donde no llega su medio habitual.",
      },
    ],
    proceso: [
      {
        paso: "01",
        titulo: "Contacto",
        detalle:
          "Con fotos del edificio y una descripción del punto a intervenir se puede valorar bastante antes de pisar el sitio, incluida la viabilidad del acceso.",
      },
      {
        paso: "02",
        titulo: "Visita y valoración",
        detalle:
          "Estudio de los puntos de anclaje disponibles, de la vía de acceso y de los riesgos. Presupuesto con el método de acceso definido y el plan de trabajo.",
      },
      {
        paso: "03",
        titulo: "Ejecución",
        detalle:
          "Montaje de cabeceras con doble línea, señalización de la zona inferior, ejecución del trabajo y plan de rescate operativo durante toda la intervención.",
      },
      {
        paso: "04",
        titulo: "Certificación y entrega",
        detalle:
          "Reportaje fotográfico del antes y el después, informe del trabajo realizado y recomendaciones de mantenimiento para el edificio.",
      },
    ],
    certificaciones: [
      "irata-3",
      "itra-3",
      "itra-confined",
      "espacios-confinados",
      "phtls-naemt",
      "phtls-ivsas",
      "recurso-preventivo",
      "pemp",
    ],
    faq: [
      {
        p: "¿Qué significa IRATA Nivel 3 y por qué debería importarme?",
        r: "IRATA es el esquema internacional de referencia en trabajo por acceso mediante cuerdas, y el Nivel 3 es el de técnico supervisor: habilita para montar sistemas complejos, dirigir a otros técnicos y, sobre todo, planificar y ejecutar el rescate. Es el nivel que permite que un equipo trabaje legal y seguro en suspensión. Si contratas trabajo vertical, es lo primero que deberías pedir que te acrediten.",
      },
      {
        p: "¿Sale más barato que montar un andamio?",
        r: "En intervenciones puntuales, dispersas o urgentes, normalmente sí, porque desaparecen el montaje, el desmontaje, el alquiler por días y la licencia de ocupación de vía pública. En rehabilitaciones completas de fachada, donde hay que trabajar de forma continuada sobre toda la superficie, el andamio sigue siendo la solución correcta. Te lo digo con franqueza en la valoración, aunque implique no cogerlo yo.",
      },
      {
        p: "¿Hace falta permiso de la comunidad o del ayuntamiento?",
        r: "Para el acceso por cuerda hace falta la autorización de la propiedad o de la comunidad, y hay que acordar el uso de la cubierta y de los puntos de anclaje. La ventaja frente al andamio es que normalmente no se ocupa la vía pública, lo que evita el trámite de licencia de ocupación. Según el tipo de obra puede seguir siendo necesaria una comunicación al ayuntamiento, y eso se aclara antes de empezar.",
      },
      {
        p: "¿Podéis hacer la instalación eléctrica o de aire acondicionado directamente desde la cuerda?",
        r: "Sí, y es la razón de ser de esta combinación. Sube el mismo profesional que ejecuta la instalación, con carnet REBT, RITE y F-Gas además de la titulación vertical. Eso elimina la coordinación entre dos empresas, reduce los días de acceso y deja un solo responsable del resultado final.",
      },
      {
        p: "¿Qué es un espacio confinado y por qué necesita un tratamiento aparte?",
        r: "Es un recinto con aberturas limitadas de entrada y salida, ventilación natural desfavorable y no previsto para ocupación continuada: depósitos, pozos, arquetas, galerías. El riesgo principal no es la altura, es la atmósfera: falta de oxígeno o presencia de gases. Entrar exige medición previa, ventilación, vigilancia desde el exterior y un plan de rescate montado antes de que nadie baje. Trabajo con certificación específica para ello.",
      },
      {
        p: "¿Trabajáis fuera de Barcelona?",
        r: "Sí. El área habitual es Barcelona y su área metropolitana, y me desplazo por Cataluña para intervenciones que lo justifiquen, especialmente en espacios confinados e industria, donde la especialización es más escasa. El desplazamiento se refleja en el presupuesto de forma transparente, sin sorpresas al final.",
      },
    ],
    relacionados: ["climatizacion", "electricidad", "lampisteria"],
    palabrasClave: [
      "trabajos verticales Barcelona",
      "reparación de fachada sin andamio",
      "IRATA nivel 3 Barcelona",
      "espacios confinados Barcelona",
      "trabajos en altura Barcelona",
    ],
    foto: {
      nombre: "alex-espacio-confinado",
      alt: "Alex Zsurzs y otro técnico trabajando suspendidos por cuerda dentro de un depósito de hormigón, montando instrumentación",
      posicion: "55% 45%",
    },
  },

  /* ================================================================
     06 · LAMPISTERÍA
     ================================================================ */
  {
    slug: "lampisteria",
    nombre: "Lampistería",
    nombreCorto: "Lampistería",
    icono: "lampisteria",
    titleSeo: "Lampista en Barcelona | Mantenimiento integral | ZSolutions",
    descriptionSeo:
      "Lampista en Barcelona para vivienda y comunidad: mantenimiento e instalaciones de agua, luz y clima con un solo interlocutor certificado.",
    h1: "Lampista en Barcelona",
    claim: "Un solo interlocutor para el agua, la luz y el clima de tu edificio.",
    resumenHome:
      "Servicio integral de mantenimiento e instalaciones para vivienda y comunidad.",
    entradilla:
      "En Cataluña, lampista es el oficio que resuelve la instalación completa de una casa o de una finca: agua, electricidad y clima. Es exactamente lo que hago, con la diferencia de que las tres partes las firma la misma persona certificada, y no tres subcontratas que se echan la culpa entre ellas.",
    cuerpo: [
      "El problema de la mayoría de mantenimientos no es técnico, es de coordinación. Llamas al electricista, que dice que el problema es de fontanería; llamas al fontanero, que dice que es del aire acondicionado; y a la tercera visita ya has pagado tres desplazamientos y sigues igual. Cuando la misma persona tiene carnet eléctrico, carnet RITE y habilitación de gases fluorados, ese ciclo desaparece: se diagnostica una vez y se resuelve.",
      "Para una vivienda, la lampistería es el servicio de cabecera: una avería eléctrica, un grifo que gotea, un termo que ha dejado de calentar, un aire acondicionado que gotea por dentro, una luminaria fundida en una escalera. Cosas pequeñas por separado, pero que en conjunto marcan la diferencia entre una casa que funciona y una casa donde siempre hay algo pendiente.",
      "Para una comunidad de vecinos, es el mantenimiento que evita las derramas. El alumbrado de zonas comunes, el cuarto de contadores, el grupo de presión, la bomba de achique del garaje, las bajantes, los extractores de los trasteros. Casi todas las averías caras de una finca dan aviso antes: un mantenimiento con criterio detecta la señal y la corrige mientras todavía es barata.",
      "Trabajo con presupuesto previo también en lo pequeño. Antes de tocar nada te digo qué he encontrado, qué opciones hay y qué cuesta cada una, incluida la opción de no hacer nada si el problema no lo justifica. En un oficio donde el cliente no puede juzgar el diagnóstico, la única forma honesta de trabajar es explicar el porqué de cada decisión con palabras que se entiendan.",
      "Y cuando el trabajo se sale de lo pequeño, no hay que buscar a otro. La misma visita puede acabar siendo una renovación de cuadro, un cambio de montante o la instalación de climatización que la vivienda necesita, con la ventaja de que quien lo va a ejecutar ya conoce la instalación de primera mano.",
    ],
    incluye: [
      {
        titulo: "Mantenimiento de vivienda",
        detalle:
          "Revisión y reparación de instalaciones de agua, electricidad y clima, con diagnóstico y presupuesto antes de intervenir.",
      },
      {
        titulo: "Mantenimiento de comunidad",
        detalle:
          "Zonas comunes, cuarto de contadores, alumbrado de escalera y garaje, grupo de presión, bombas de achique y extracción de trasteros.",
      },
      {
        titulo: "Averías generales",
        detalle:
          "Localización y reparación de averías eléctricas, de agua y de climatización, con la ventaja de un único diagnóstico para las tres.",
      },
      {
        titulo: "Pequeñas reformas",
        detalle:
          "Sustitución de aparatos, cambios de grifería y mecanismos, puntos de luz nuevos y adecuaciones puntuales de instalación.",
      },
      {
        titulo: "Puesta a punto antes de alquilar o vender",
        detalle:
          "Revisión completa de la vivienda para entregarla sin averías pendientes y con la documentación de instalación en regla.",
      },
      {
        titulo: "Adecuación de locales",
        detalle:
          "Trabajos de instalación necesarios para poner un local en marcha o para adaptarlo a una actividad nueva.",
      },
      {
        titulo: "Informes para administradores",
        detalle:
          "Informe del estado real de las instalaciones de la finca, con prioridades y presupuesto por partidas para llevar a junta.",
      },
      {
        titulo: "Coordinación de oficios",
        detalle:
          "Cuando hace falta obra o pintura, coordinación con el resto de gremios para que no se pisen los trabajos ni los plazos.",
      },
    ],
    paraQuien: [
      {
        titulo: "Vivienda",
        detalle:
          "El servicio de cabecera para todo lo que falla en una casa, sin tener que decidir tú a qué gremio corresponde.",
      },
      {
        titulo: "Comunidad de vecinos",
        detalle:
          "Mantenimiento preventivo y correctivo de zonas comunes, con informe y presupuesto claros para la junta.",
      },
      {
        titulo: "Administrador de fincas",
        detalle:
          "Un interlocutor único para las instalaciones de varias fincas, con avisos gestionados y trabajos documentados.",
      },
      {
        titulo: "Local u oficina",
        detalle:
          "Mantenimiento de las instalaciones del negocio para que una avería no se convierta en un día sin abrir.",
      },
    ],
    proceso: [
      {
        paso: "01",
        titulo: "Contacto",
        detalle:
          "Explicas el aviso por el formulario, WhatsApp o teléfono. Para comunidades, se puede canalizar directamente a través del administrador.",
      },
      {
        paso: "02",
        titulo: "Visita y valoración",
        detalle:
          "Diagnóstico en el sitio y presupuesto antes de tocar nada, incluida la opción de no intervenir si el problema no lo justifica.",
      },
      {
        paso: "03",
        titulo: "Ejecución",
        detalle:
          "Reparación con la zona protegida y recogida al terminar. Si aparece algo distinto de lo previsto, se comunica antes de seguir.",
      },
      {
        paso: "04",
        titulo: "Certificación y entrega",
        detalle:
          "Comprobación final de lo intervenido, informe de lo realizado y, cuando el trabajo lo requiere, el certificado correspondiente.",
      },
    ],
    certificaciones: ["rebt", "rite", "fgas", "fontaneria", "recurso-preventivo"],
    faq: [
      {
        p: "¿Qué diferencia hay entre un lampista y un electricista o un fontanero?",
        r: "En Cataluña, lampista es el término tradicional del profesional que se ocupa de las instalaciones de una vivienda o una finca en conjunto: agua, electricidad y, hoy, también clima. Un electricista cubre la parte eléctrica y un fontanero la de agua. Lo que ofrezco es el alcance de lampista con las habilitaciones formales de las tres especialidades, que no siempre van juntas.",
      },
      {
        p: "¿Hacéis contratos de mantenimiento para comunidades?",
        r: "Sí. Se define qué elementos entran en la revisión, con qué periodicidad y qué se incluye en cada visita, y se entrega informe del estado tras cada una. La ventaja para la comunidad es previsibilidad: las averías dejan de aparecer como sorpresas y las inversiones se pueden planificar en el presupuesto anual en lugar de en una derrama de urgencia.",
      },
      {
        p: "¿Atendéis avisos pequeños o solo trabajos grandes?",
        r: "Atiendo avisos pequeños. Buena parte de la relación con clientes y administradores nace de un aviso menor bien resuelto. Lo que sí hago siempre es dar precio antes de intervenir, para que un trabajo pequeño no se convierta en una factura desagradable.",
      },
      {
        p: "¿Trabajáis con administradores de fincas?",
        r: "Sí, y es una parte importante del trabajo. Para un administrador la ventaja es tener un solo interlocutor para agua, luz y clima de varias fincas, con avisos gestionados, informes por escrito y presupuestos desglosados por partidas listos para llevar a junta.",
      },
      {
        p: "¿Podéis hacer también la parte de obra o de pintura?",
        r: "La ejecución de obra y pintura no es mi oficio, así que no la vendo como si lo fuera. Lo que sí hago es coordinar con los gremios necesarios para que el trabajo de instalación encaje con el resto y no haya que abrir dos veces la misma pared. Prefiero decirte que algo no es lo mío antes que hacerlo regular.",
      },
      {
        p: "¿En qué zonas dais servicio de lampistería?",
        r: "Barcelona ciudad y área metropolitana de forma habitual, y el resto de las zonas de actuación según el tipo de trabajo. Para mantenimiento recurrente, la proximidad importa: cuanto más cerca esté la finca, más rápido se puede atender un aviso, y eso se tiene en cuenta al aceptar un contrato de mantenimiento.",
      },
    ],
    relacionados: ["electricidad", "fontaneria", "climatizacion"],
    palabrasClave: [
      "lampista Barcelona",
      "lampistería Barcelona",
      "mantenimiento comunidad de vecinos Barcelona",
      "reparaciones vivienda Barcelona",
    ],
  },
];

/* -----------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------------- */

export const slugsServicios = servicios.map((s) => s.slug);

export function getServicio(slug: string): Servicio | undefined {
  return servicios.find((s) => s.slug === slug);
}

/** Orden en el que se muestran las 6 tarjetas en la home. */
export const ordenHome = [
  "electricidad",
  "fontaneria",
  "climatizacion",
  "aerotermia",
  "trabajos-verticales",
  "lampisteria",
] as const;

export const serviciosHome = ordenHome
  .map((slug) => servicios.find((s) => s.slug === slug))
  .filter((s): s is Servicio => Boolean(s));
