/**
 * Regenera `src/app/api/og/righteous.ts` a partir del archivo .ttf.
 * Uso: node scripts/generar-fuente-og.mjs [ruta-al-ttf]
 */
import { readFile, writeFile } from "node:fs/promises";

const ORIGEN = process.argv[2] ?? "src/app/api/og/Righteous-Regular.ttf";
const DESTINO = "src/app/api/og/righteous.ts";

const datos = await readFile(ORIGEN);
const base64 = datos.toString("base64");
const lineas = base64.match(/.{1,100}/g) ?? [];
const cuerpo =
  lineas
    .slice(0, -1)
    .map((l) => `  "${l}" +`)
    .join("\n") + `\n  "${lineas.at(-1)}";`;

await writeFile(
  DESTINO,
  `/**
 * Righteous incrustada en base64.
 *
 * GENERADO por \`scripts/generar-fuente-og.mjs\`. No editar a mano.
 *
 * Va incrustada y no como archivo suelto por un motivo concreto: leer la
 * tipografía del disco obligaba a declararla en \`outputFileTracingIncludes\`,
 * y ahí es donde Vercel fallaba al ensamblar la función a partir de las
 * trazas, después de un build que terminaba bien. Incrustada no hay ni
 * sistema de archivos ni trazas de por medio: la fuente es parte del módulo.
 *
 * Righteous se distribuye bajo licencia SIL Open Font License 1.1.
 */
export const RIGHTEOUS_BASE64 =
${cuerpo}
`,
);

console.log(`✓ ${DESTINO} (${Math.round(base64.length / 1024)} KB en base64)`);
