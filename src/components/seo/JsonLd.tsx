import type { JsonLdObjeto } from "@/lib/schema";

type Props = { datos: JsonLdObjeto | JsonLdObjeto[] };

/**
 * Inserta JSON-LD. El contenido procede exclusivamente de `src/content/`,
 * nunca de entrada de usuario, y se serializa escapando `<` para evitar
 * cualquier cierre prematuro de la etiqueta script.
 */
export function JsonLd({ datos }: Props) {
  const lista = Array.isArray(datos) ? datos : [datos];

  return (
    <>
      {lista.map((objeto, i) => (
        <script
          key={i}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(objeto).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
