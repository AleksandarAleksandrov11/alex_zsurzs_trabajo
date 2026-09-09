/**
 * Genera todo el paquete de iconos del sitio a partir del isotipo de marca.
 *
 * Salida:
 *   src/app/favicon.ico            16 · 32 · 48 px
 *   src/app/icon.svg               vectorial, cualquier tamaño
 *   src/app/apple-icon.png         180 × 180 (Apple Touch Icon)
 *   public/icons/icon-192.png      PWA
 *   public/icons/icon-512.png      PWA
 *   public/icons/maskable-512.png  PWA con zona segura
 *   public/icons/icon-monocromo.svg  Safari pinned tab
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const AZUL = "#2F4AA0";
const BLANCO = "#FFFFFF";

/* Z con el rayo calado, en el sistema de coordenadas del logotipo (120 × 96). */
const Z =
  "M8 8h72v14L40 70h40v14H8V70l40-48H8V8Zm50 22L42 50h8l-11 15 20-22h-9l8-11Z";

/**
 * A tamaños pequeños las dos líneas de fuga se emborronan, así que el icono
 * usa solo la Z. El manual permite el isotipo suelto y a una tinta.
 */
function svgIcono({ fondo, tinta, escala = 4.2, radio = 0 }) {
  const anchoZ = 72;
  const altoZ = 76;
  const tx = (512 - anchoZ * escala) / 2 - 8 * escala;
  const ty = (512 - altoZ * escala) / 2 - 8 * escala;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  ${fondo ? `<rect width="512" height="512" rx="${radio}" fill="${fondo}"/>` : ""}
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${escala})">
    <path fill="${tinta}" fill-rule="evenodd" clip-rule="evenodd" d="${Z}"/>
  </g>
</svg>`;
}

const iconoPrincipal = svgIcono({ fondo: AZUL, tinta: BLANCO, escala: 4.2 });
/* Maskable: Android recorta hasta un 20 %, así que la Z va más pequeña. */
const iconoMaskable = svgIcono({ fondo: AZUL, tinta: BLANCO, escala: 3.1 });
const iconoMonocromo = svgIcono({ fondo: null, tinta: "#000000", escala: 4.2 });

await mkdir("public/icons", { recursive: true });

async function png(svg, tamano, destino) {
  await sharp(Buffer.from(svg))
    .resize(tamano, tamano)
    .png({ compressionLevel: 9 })
    .toFile(destino);
  console.log(`✓ ${destino}`);
}

/* ---- ICO (contenedor con tres PNG dentro) ---- */
async function ico(svg, tamanos, destino) {
  const imagenes = await Promise.all(
    tamanos.map((t) =>
      sharp(Buffer.from(svg)).resize(t, t).png({ compressionLevel: 9 }).toBuffer(),
    ),
  );

  const cabecera = Buffer.alloc(6);
  cabecera.writeUInt16LE(0, 0); // reservado
  cabecera.writeUInt16LE(1, 2); // tipo: icono
  cabecera.writeUInt16LE(tamanos.length, 4);

  let desplazamiento = 6 + tamanos.length * 16;
  const entradas = tamanos.map((t, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(t >= 256 ? 0 : t, 0); // ancho
    e.writeUInt8(t >= 256 ? 0 : t, 1); // alto
    e.writeUInt8(0, 2); // paleta
    e.writeUInt8(0, 3); // reservado
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por píxel
    e.writeUInt32LE(imagenes[i].length, 8);
    e.writeUInt32LE(desplazamiento, 12);
    desplazamiento += imagenes[i].length;
    return e;
  });

  await writeFile(destino, Buffer.concat([cabecera, ...entradas, ...imagenes]));
  console.log(`✓ ${destino}  (${tamanos.join(" · ")} px)`);
}

await writeFile("src/app/icon.svg", iconoPrincipal);
console.log("✓ src/app/icon.svg");

await writeFile("public/icons/icon-monocromo.svg", iconoMonocromo);
console.log("✓ public/icons/icon-monocromo.svg");

await ico(iconoPrincipal, [16, 32, 48], "src/app/favicon.ico");
await png(iconoPrincipal, 180, "src/app/apple-icon.png");
await png(iconoPrincipal, 192, "public/icons/icon-192.png");
await png(iconoPrincipal, 512, "public/icons/icon-512.png");
await png(iconoMaskable, 512, "public/icons/maskable-512.png");
