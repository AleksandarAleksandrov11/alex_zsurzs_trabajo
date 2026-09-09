import { site } from "./site";

/* =================================================================
 * DATOS FISCALES — TODO (Alex)
 *
 * NINGUNO de estos datos se puede inventar: son de obligada publicación
 * por la LSSI-CE y por el RGPD, y un dato incorrecto es peor que un dato
 * ausente. Rellénalos antes de publicar la web.
 *
 * Mientras valgan `null`, las páginas legales muestran un aviso visible
 * de dato pendiente en su lugar.
 * ================================================================= */

export type DatoLegal = string | null;

export const datosFiscales = {
  /** TODO: nombre y apellidos o razón social del titular. */
  titular: null as DatoLegal,
  /** TODO: NIF / CIF. */
  nif: null as DatoLegal,
  /** TODO: domicilio social o profesional completo. */
  domicilio: null as DatoLegal,
  /** TODO: email de contacto para asuntos legales y ejercicio de derechos. */
  email: null as DatoLegal,
  /** TODO: teléfono de contacto. */
  telefono: null as DatoLegal,
  /** TODO: si estás inscrito en un registro mercantil o profesional, indícalo. */
  registro: null as DatoLegal,

  /* Estos sí son conocidos */
  actividad:
    "Instalación, mantenimiento y reparación de instalaciones eléctricas, de fontanería, de climatización y de trabajos verticales, así como formación técnica para profesionales del sector.",
  nombreComercial: site.nombre,
  /* El dominio no se escribe aquí: la página legal muestra aquel en el que
     la web está realmente publicada, que es lo que exige la LSSI-CE. */
} as const;

/** Proveedores que tratan datos por cuenta del titular. */
export const encargadosTratamiento = [
  {
    nombre: "Vercel Inc.",
    finalidad: "Alojamiento del sitio web y analítica de uso sin cookies.",
    ubicacion: "Estados Unidos, con cláusulas contractuales tipo de la Comisión Europea.",
  },
  {
    nombre: "Resend (Plus Five Five, Inc.)",
    finalidad: "Envío de los correos generados por el formulario de presupuesto.",
    ubicacion: "Estados Unidos, con cláusulas contractuales tipo de la Comisión Europea.",
  },
] as const;

/* =================================================================
 * CATEGORÍAS DE COOKIES
 * ================================================================= */

export type CategoriaCookie = {
  id: "necesarias" | "analiticas" | "marketing";
  titulo: string;
  descripcion: string;
  siempreActiva: boolean;
  /** Ejemplos concretos de lo que se instala en esta categoría. */
  ejemplos: { nombre: string; finalidad: string; duracion: string }[];
};

export const categoriasCookies: CategoriaCookie[] = [
  {
    id: "necesarias",
    titulo: "Necesarias",
    descripcion:
      "Imprescindibles para que la web funcione y para recordar tu decisión sobre las cookies. No se pueden desactivar porque sin ellas el sitio no puede prestarse.",
    siempreActiva: true,
    ejemplos: [
      {
        nombre: "zs_consent",
        finalidad:
          "Guarda tu elección sobre las categorías de cookies para no volver a preguntártelo en cada visita.",
        duracion: "12 meses",
      },
      {
        nombre: "sessionStorage: zs_presupuesto",
        finalidad:
          "Conserva lo que llevas escrito en el formulario de presupuesto para que no se pierda si recargas la página. Se borra al cerrar la pestaña y no sale de tu navegador.",
        duracion: "Sesión",
      },
    ],
  },
  {
    id: "analiticas",
    titulo: "Analíticas",
    descripcion:
      "Permiten entender qué páginas se visitan y desde dónde, para mejorar la web. La analítica que uso actualmente no instala cookies ni identifica a nadie, pero esta categoría queda preparada por si en el futuro se añade alguna herramienta que sí lo haga.",
    siempreActiva: false,
    ejemplos: [
      {
        nombre: "Vercel Web Analytics",
        finalidad:
          "Métricas agregadas de páginas vistas y rendimiento real. No utiliza cookies ni genera identificadores persistentes de usuario.",
        duracion: "No aplica: no instala cookies",
      },
    ],
  },
  {
    id: "marketing",
    titulo: "Marketing",
    descripcion:
      "Sirven para medir campañas y mostrar publicidad personalizada. Actualmente no se instala ninguna. La categoría existe para que, si algún día se añade, no se cargue nada antes de que lo autorices.",
    siempreActiva: false,
    ejemplos: [
      {
        nombre: "Ninguna en este momento",
        finalidad:
          "No hay cookies de marketing instaladas. Si se añadieran, se documentarían aquí antes de activarse.",
        duracion: "No aplica",
      },
    ],
  },
];

/* =================================================================
 * TEXTOS LEGALES
 *
 * AVISO: base sólida redactada para este proyecto, NO asesoramiento
 * jurídico. Debe revisarla un asesor antes de publicar.
 * ================================================================= */

export type SeccionLegal = {
  titulo: string;
  parrafos?: string[];
  lista?: string[];
};

export const avisoLegal: { actualizado: string; secciones: SeccionLegal[] } = {
  actualizado: "TODO: fecha de la última revisión",
  secciones: [
    {
      titulo: "1. Datos identificativos del titular",
      parrafos: [
        "En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos identificativos del titular de este sitio web.",
      ],
    },
    {
      titulo: "2. Objeto y ámbito de aplicación",
      parrafos: [
        "El presente aviso legal regula el acceso y el uso del sitio web accesible en el dominio indicado, así como los contenidos y servicios que a través de él se ponen a disposición de las personas usuarias.",
        "La navegación por este sitio atribuye la condición de usuario e implica la aceptación plena y sin reservas de todas las disposiciones de este aviso legal en la versión publicada en el momento del acceso. Si no estás de acuerdo con alguna de ellas, te pedimos que no utilices el sitio.",
        "El titular se reserva el derecho de modificar en cualquier momento la presentación, la configuración y los contenidos del sitio, así como las presentes condiciones, sin necesidad de preaviso.",
      ],
    },
    {
      titulo: "3. Condiciones de uso",
      parrafos: [
        "La persona usuaria se compromete a utilizar el sitio web y sus contenidos conforme a la ley, a este aviso legal, a la buena fe y al orden público.",
      ],
      lista: [
        "No utilizar los contenidos con fines o efectos ilícitos, lesivos de derechos e intereses de terceros o que puedan dañar, inutilizar o deteriorar el sitio web.",
        "No introducir ni difundir programas de datos susceptibles de provocar daños en los sistemas del titular o de terceros.",
        "No intentar acceder a áreas restringidas de los sistemas de información del titular ni a los datos de otras personas usuarias.",
        "No utilizar los formularios de contacto para el envío de comunicaciones comerciales no solicitadas.",
      ],
    },
    {
      titulo: "4. Propiedad intelectual e industrial",
      parrafos: [
        "Todos los contenidos del sitio web, entendiendo por tales de forma no exhaustiva los textos, fotografías, gráficos, iconos, marcas, nombres comerciales, tecnología, software y demás elementos, son titularidad del titular del sitio o de terceros que han autorizado su uso, y están protegidos por la normativa nacional e internacional de propiedad intelectual e industrial.",
        "La identidad visual corporativa, incluidos el logotipo, el isotipo y sus variantes, se rige por el manual de identidad visual de la marca. Queda expresamente prohibida su reproducción, distorsión, recoloreado o cualquier alteración de sus proporciones y elementos.",
        "El acceso al sitio no otorga a la persona usuaria ningún derecho ni titularidad sobre los contenidos. Queda prohibida su reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación sin autorización expresa y por escrito del titular.",
      ],
    },
    {
      titulo: "5. Exclusión de responsabilidad",
      parrafos: [
        "El titular actúa con la diligencia razonable para que la información publicada sea exacta y esté actualizada, pero no garantiza la ausencia de errores ni la vigencia permanente de los contenidos, especialmente en lo relativo a normativa técnica, que puede modificarse.",
        "La información técnica publicada en este sitio tiene carácter divulgativo y no sustituye a una valoración profesional realizada sobre la instalación concreta. Ninguna decisión sobre una instalación real debe tomarse únicamente a partir de los contenidos generales de esta web.",
        "El titular no se responsabiliza del uso que terceros hagan de la información publicada, ni de los daños derivados de interrupciones del servicio, virus u otros elementos ajenos a su control razonable.",
      ],
    },
    {
      titulo: "6. Enlaces a sitios de terceros",
      parrafos: [
        "Este sitio puede contener enlaces a páginas de terceros, incluidos perfiles en redes sociales y la web personal del fundador. El titular no controla ni se hace responsable de los contenidos, políticas de privacidad o prácticas de esos sitios, cuyo acceso se realiza bajo la exclusiva responsabilidad de la persona usuaria.",
      ],
    },
    {
      titulo: "7. Protección de datos",
      parrafos: [
        "El tratamiento de los datos personales recogidos a través de este sitio se rige por lo dispuesto en la política de privacidad, que forma parte inseparable de este aviso legal.",
      ],
    },
    {
      titulo: "8. Legislación aplicable y jurisdicción",
      parrafos: [
        "Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso de este sitio web, las partes se someten a los juzgados y tribunales del domicilio del titular, salvo que la normativa de consumo aplicable establezca un fuero distinto de carácter imperativo.",
      ],
    },
  ],
};

export const politicaPrivacidad: { actualizado: string; secciones: SeccionLegal[] } = {
  actualizado: "TODO: fecha de la última revisión",
  secciones: [
    {
      titulo: "1. Responsable del tratamiento",
      parrafos: [
        "El responsable del tratamiento de los datos personales recogidos a través de este sitio web es el titular identificado en el aviso legal, cuyos datos de contacto se reproducen a continuación.",
        "Puedes dirigirte a la dirección de correo electrónico indicada para cualquier cuestión relacionada con el tratamiento de tus datos o para ejercer tus derechos.",
      ],
    },
    {
      titulo: "2. Datos que se tratan y de dónde proceden",
      parrafos: [
        "Solo se tratan los datos que tú facilitas voluntariamente a través del formulario de solicitud de presupuesto o al contactar por correo electrónico, teléfono o WhatsApp. No se obtienen datos de terceros ni se elaboran perfiles.",
      ],
      lista: [
        "Datos identificativos y de contacto: nombre, teléfono o WhatsApp y dirección de correo electrónico.",
        "Datos sobre la solicitud: tipo de servicio, tipo de espacio, ubicación aproximada, descripción del trabajo, urgencia y canal de contacto preferido.",
        "Dato opcional sobre cómo nos has conocido, con finalidad exclusivamente estadística.",
        "Datos técnicos derivados de la navegación, tratados de forma agregada y sin identificarte, según se detalla en la política de cookies.",
      ],
    },
    {
      titulo: "3. Finalidad del tratamiento",
      parrafos: [
        "Los datos se tratan únicamente para atender tu solicitud: contactarte, elaborar la valoración o el presupuesto pedido, gestionar en su caso la prestación del servicio y conservar la comunicación como justificante de la relación.",
        "No se utilizan para enviarte comunicaciones comerciales salvo que lo solicites expresamente, ni se emplean para elaborar perfiles ni para tomar decisiones automatizadas.",
      ],
    },
    {
      titulo: "4. Base jurídica que legitima el tratamiento",
      lista: [
        "Consentimiento de la persona interesada, artículo 6.1.a del RGPD, otorgado al enviar el formulario tras aceptar expresamente esta política.",
        "Aplicación de medidas precontractuales a petición de la persona interesada, artículo 6.1.b del RGPD, cuando la solicitud es la elaboración de un presupuesto.",
        "Ejecución del contrato, artículo 6.1.b del RGPD, cuando el presupuesto se acepta y se presta el servicio.",
        "Cumplimiento de obligaciones legales, artículo 6.1.c del RGPD, en materia fiscal, contable y de seguridad de las instalaciones.",
      ],
    },
    {
      titulo: "5. Plazos de conservación",
      parrafos: [
        "Los datos de las solicitudes que no derivan en la prestación de un servicio se conservan durante el tiempo necesario para atenderlas y, como máximo, un año desde el último contacto, salvo que solicites antes su supresión.",
        "Cuando la solicitud da lugar a la prestación de un servicio, los datos se conservan mientras dure la relación y, después, durante los plazos de prescripción de las obligaciones legales aplicables, en particular las fiscales y contables, y las relativas a la documentación de las instalaciones ejecutadas.",
      ],
    },
    {
      titulo: "6. Destinatarios y transferencias internacionales",
      parrafos: [
        "No se ceden datos a terceros salvo obligación legal. Sí intervienen proveedores que actúan como encargados del tratamiento, con contrato firmado conforme al artículo 28 del RGPD, exclusivamente para prestar el servicio que se les encarga.",
        "Algunos de estos proveedores están ubicados fuera del Espacio Económico Europeo. En esos casos, la transferencia se ampara en las cláusulas contractuales tipo aprobadas por la Comisión Europea y en las garantías adicionales que estas exigen.",
      ],
    },
    {
      titulo: "7. Tus derechos",
      parrafos: [
        "Puedes ejercer en cualquier momento los derechos que te reconoce la normativa de protección de datos escribiendo a la dirección de contacto indicada, adjuntando copia de un documento que acredite tu identidad.",
      ],
      lista: [
        "Acceso: saber qué datos tuyos se están tratando.",
        "Rectificación: corregir los datos inexactos o incompletos.",
        "Supresión: solicitar que se eliminen cuando ya no sean necesarios.",
        "Oposición: oponerte al tratamiento por motivos relacionados con tu situación particular.",
        "Limitación: pedir que se suspenda el tratamiento mientras se verifica una reclamación.",
        "Portabilidad: recibir tus datos en formato estructurado y de uso común.",
        "Retirada del consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.",
      ],
    },
    {
      titulo: "8. Reclamación ante la autoridad de control",
      parrafos: [
        "Si consideras que el tratamiento de tus datos no se ajusta a la normativa, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD), C/ Jorge Juan 6, 28001 Madrid, a través de su sede electrónica en www.aepd.es. También puedes dirigirte antes al responsable para intentar resolver la cuestión.",
      ],
    },
    {
      titulo: "9. Medidas de seguridad",
      parrafos: [
        "Se aplican las medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo, entre ellas el cifrado de las comunicaciones mediante HTTPS, la limitación del acceso a los datos a las personas que necesitan tratarlos y la validación de los formularios también en servidor.",
        "Los datos del formulario de presupuesto se transmiten por correo electrónico al responsable y no se almacenan en ninguna base de datos de este sitio web.",
      ],
    },
    {
      titulo: "10. Menores de edad",
      parrafos: [
        "Los servicios ofrecidos a través de este sitio se dirigen exclusivamente a personas mayores de 18 años. No se recogen conscientemente datos de menores. Si detectas que un menor ha facilitado datos, comunícalo a la dirección de contacto para proceder a su supresión.",
      ],
    },
  ],
};

export const politicaCookies: { actualizado: string; secciones: SeccionLegal[] } = {
  actualizado: "TODO: fecha de la última revisión",
  secciones: [
    {
      titulo: "1. Qué es una cookie",
      parrafos: [
        "Una cookie es un pequeño archivo de texto que un sitio web guarda en tu navegador cuando lo visitas. Sirve para recordar información sobre tu visita, como tus preferencias, y puede utilizarse también con finalidades analíticas o publicitarias.",
        "Junto a las cookies existen otras tecnologías de almacenamiento en el dispositivo, como el almacenamiento local y el almacenamiento de sesión del navegador, sujetas a las mismas obligaciones de información y consentimiento cuando no son estrictamente necesarias. En esta política se informa también de su uso.",
      ],
    },
    {
      titulo: "2. Cookies que utiliza este sitio",
      parrafos: [
        "Este sitio se ha diseñado para funcionar con el mínimo almacenamiento posible en tu dispositivo. En el momento de la última revisión de esta política, no se instala ninguna cookie de marketing ni de publicidad comportamental.",
        "El detalle por categorías, con la finalidad y la duración de cada elemento, se muestra en el panel de configuración accesible desde el enlace del pie de página y desde el propio banner.",
      ],
    },
    {
      titulo: "3. Nota sobre la analítica utilizada",
      parrafos: [
        "La analítica de este sitio es Vercel Web Analytics, que funciona sin cookies y sin generar identificadores persistentes: no rastrea a las personas usuarias entre sitios ni entre sesiones, y los datos se tratan de forma agregada.",
        "Por ese motivo se considera un tratamiento que no requiere consentimiento previo de almacenamiento en el dispositivo, y se documenta aquí de forma expresa para que la decisión sea transparente y auditable.",
        "El sistema de consentimiento queda no obstante preparado con la categoría de analíticas y la de marketing, de modo que si en el futuro se incorpora una herramienta que sí instale cookies, como Google Analytics o el píxel de Meta, no se cargará ningún script hasta que lo autorices expresamente.",
      ],
    },
    {
      titulo: "4. Cómo gestionar tu consentimiento",
      parrafos: [
        "La primera vez que entras se muestra un banner con tres opciones del mismo peso: aceptar todas, rechazar todas o configurar por categorías. Rechazar es tan sencillo como aceptar, tal y como exige la Agencia Española de Protección de Datos.",
        "Tu decisión se guarda durante 12 meses y puedes cambiarla en cualquier momento desde el enlace de configuración de cookies del pie de página. Al modificarla, se elimina el almacenamiento que ya no esté autorizado.",
      ],
    },
    {
      titulo: "5. Cómo gestionar las cookies desde tu navegador",
      parrafos: [
        "Con independencia de este sistema, puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que bloquear las estrictamente necesarias puede afectar al funcionamiento del sitio.",
      ],
      lista: [
        "Google Chrome: Configuración, Privacidad y seguridad, Cookies y otros datos de sitios.",
        "Mozilla Firefox: Ajustes, Privacidad y seguridad, Cookies y datos del sitio.",
        "Safari: Preferencias, Privacidad, Gestionar datos de sitios web.",
        "Microsoft Edge: Configuración, Cookies y permisos del sitio.",
      ],
    },
    {
      titulo: "6. Actualizaciones de esta política",
      parrafos: [
        "Esta política puede actualizarse cuando cambien las tecnologías utilizadas o la normativa aplicable. Cualquier cambio relevante en las categorías o en las finalidades reactivará la solicitud de consentimiento.",
      ],
    },
  ],
};

export const avisoRevisionLegal =
  "Estos textos son una base redactada para este proyecto y deben ser revisados por un asesor antes de la publicación. No constituyen asesoramiento jurídico.";
