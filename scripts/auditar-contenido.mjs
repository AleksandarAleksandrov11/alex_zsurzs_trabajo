/**
 * Comprueba los mínimos de contenido y la unicidad de los metadatos.
 * Uso: node --experimental-strip-types scripts/auditar-contenido.mjs
 */
import { servicios } from "../src/content/servicios.ts";
import { zonas } from "../src/content/zonas.ts";

const palabras = (t) => String(t).trim().split(/\s+/).filter(Boolean).length;
let fallos = 0;

console.log("\n=== SERVICIOS (mínimo 800 palabras) ===");
for (const s of servicios) {
  const total =
    palabras(s.entradilla) +
    s.cuerpo.reduce((a, p) => a + palabras(p), 0) +
    s.incluye.reduce((a, i) => a + palabras(i.titulo) + palabras(i.detalle), 0) +
    s.paraQuien.reduce((a, i) => a + palabras(i.titulo) + palabras(i.detalle), 0) +
    s.proceso.reduce((a, i) => a + palabras(i.titulo) + palabras(i.detalle), 0) +
    s.faq.reduce((a, f) => a + palabras(f.p) + palabras(f.r), 0);
  const ok = total >= 800;
  if (!ok) fallos++;
  console.log(`${ok ? "✓" : "✗"} ${s.slug.padEnd(22)} ${String(total).padStart(5)} palabras · FAQ ${s.faq.length}`);
}

console.log("\n=== ZONAS (mínimo 500 palabras) ===");
for (const z of zonas) {
  const total =
    palabras(z.entradilla) +
    z.cuerpo.reduce((a, p) => a + palabras(p), 0) +
    z.serviciosDemandados.reduce((a, i) => a + palabras(i.motivo), 0) +
    palabras(z.desplazamiento) +
    (z.barrios ?? []).reduce((a, b) => a + palabras(b.nombre) + palabras(b.detalle), 0) +
    z.faq.reduce((a, f) => a + palabras(f.p) + palabras(f.r), 0);
  const ok = total >= 500;
  if (!ok) fallos++;
  console.log(`${ok ? "✓" : "✗"} ${z.slug.padEnd(30)} ${String(total).padStart(5)} palabras`);
}

console.log("\n=== METADATOS ===");
const titles = [];
const descs = [];
for (const s of servicios) { titles.push([s.slug, s.titleSeo]); descs.push([s.slug, s.descriptionSeo]); }
for (const z of zonas) { titles.push([z.slug, z.titleSeo]); descs.push([z.slug, z.descriptionSeo]); }

for (const [slug, t] of titles) {
  if (t.length >= 60) { console.log(`✗ title largo (${t.length}) en ${slug}: ${t}`); fallos++; }
}
for (const [slug, d] of descs) {
  if (d.length >= 155) { console.log(`✗ description larga (${d.length}) en ${slug}: ${d}`); fallos++; }
}
const dupT = titles.map(([, t]) => t).filter((t, i, a) => a.indexOf(t) !== i);
const dupD = descs.map(([, d]) => d).filter((d, i, a) => a.indexOf(d) !== i);
if (dupT.length) { console.log("✗ titles duplicados:", dupT); fallos++; }
if (dupD.length) { console.log("✗ descriptions duplicadas:", dupD); fallos++; }
if (!dupT.length && !dupD.length) console.log("✓ Sin títulos ni descripciones duplicados");

console.log("\n=== ENLACES INTERNOS ===");
const slugsServicio = new Set(servicios.map((s) => s.slug));
const slugsZona = new Set(zonas.map((z) => z.slug));
for (const s of servicios) {
  for (const r of s.relacionados) {
    if (!slugsServicio.has(r)) { console.log(`✗ ${s.slug} enlaza a servicio inexistente: ${r}`); fallos++; }
  }
}
for (const z of zonas) {
  for (const d of z.serviciosDemandados) {
    if (!slugsServicio.has(d.slug)) { console.log(`✗ ${z.slug} enlaza a servicio inexistente: ${d.slug}`); fallos++; }
  }
}
if (slugsZona.size !== zonas.length) { console.log("✗ slugs de zona duplicados"); fallos++; }
console.log(`✓ ${servicios.length} servicios · ${zonas.length} zonas comprobadas`);

console.log(fallos === 0 ? "\n✓ AUDITORÍA DE CONTENIDO SUPERADA\n" : `\n✗ ${fallos} incidencias\n`);
process.exit(fallos === 0 ? 0 : 1);
