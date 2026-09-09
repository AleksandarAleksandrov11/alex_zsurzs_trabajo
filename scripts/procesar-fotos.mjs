/**
 * Optimiza las fotos originales de Alex y las deja en `public/images`.
 * Uso: node scripts/procesar-fotos.mjs <carpeta-origen>
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const origen = process.argv[2];
if (!origen) {
  console.error("Falta la carpeta de origen");
  process.exit(1);
}

const salida = "public/images";
await mkdir(salida, { recursive: true });

const fotos = [
  { entrada: "image00002.jpeg", nombre: "alex-cubierta-barcelona", ancho: 1600 },
  { entrada: "image00005.jpeg", nombre: "alex-espacio-confinado", ancho: 1600 },
  { entrada: "image00004.jpeg", nombre: "alex-retrato-obra", ancho: 1400 },
  { entrada: "image00003.jpeg", nombre: "alex-premio-sector-oficios", ancho: 1400 },
  { entrada: "image00001.jpeg", nombre: "alex-retrato-taller", ancho: 1400 },
];

const manifiesto = [];

for (const foto of fotos) {
  const src = path.join(origen, foto.entrada);
  const base = sharp(src).rotate();
  const meta = await base.metadata();

  const anchoFinal = Math.min(foto.ancho, meta.width ?? foto.ancho);
  const alto = Math.round(((meta.height ?? 1) / (meta.width ?? 1)) * anchoFinal);

  await base
    .clone()
    .resize({ width: anchoFinal, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(salida, `${foto.nombre}.jpg`));

  /* Placeholder blur en base64, para que no haya salto de layout ni flash */
  const blur = await base
    .clone()
    .resize({ width: 16 })
    .blur(1.2)
    .webp({ quality: 30 })
    .toBuffer();

  manifiesto.push({
    nombre: foto.nombre,
    src: `/images/${foto.nombre}.jpg`,
    ancho: anchoFinal,
    alto,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
  });

  console.log(`✓ ${foto.nombre}.jpg  ${anchoFinal}×${alto}`);
}

const ts = `/* GENERADO por scripts/procesar-fotos.mjs — no editar a mano. */

export type FotoOptimizada = {
  src: string;
  ancho: number;
  alto: number;
  blur: string;
};

export const fotos = ${JSON.stringify(
  Object.fromEntries(
    manifiesto.map((f) => [
      f.nombre,
      { src: f.src, ancho: f.ancho, alto: f.alto, blur: f.blur },
    ]),
  ),
  null,
  2,
)} satisfies Record<string, FotoOptimizada>;

export type NombreFoto = keyof typeof fotos;
`;

await writeFile("src/content/fotos.ts", ts);
console.log("✓ src/content/fotos.ts");
