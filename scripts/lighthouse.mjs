/**
 * Lighthouse móvil sobre el build de producción.
 * Uso: node scripts/lighthouse.mjs http://127.0.0.1:3213 /ruta /otra
 */
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const BASE = process.argv[2] ?? "http://127.0.0.1:3213";
const RUTAS = process.argv.slice(3);
if (RUTAS.length === 0) RUTAS.push("/");

const chrome = await launch({
  chromePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium",
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
});

const resultados = [];

for (const ruta of RUTAS) {
  const salida = await lighthouse(BASE + ruta, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    formFactor: "mobile",
    screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2.625, disabled: false },
    throttlingMethod: "simulate",
    /* Los scripts de Vercel Analytics y Speed Insights solo existen en Vercel:
       en local devuelven 404 y ensucian "Buenas prácticas" sin que eso refleje
       lo que verá un usuario real. Se bloquean para medir lo que importa. */
    blockedUrlPatterns: ["*/_vercel/*"],
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });

  const c = salida.lhr.categories;
  const a = salida.lhr.audits;
  const fila = {
    ruta,
    rendimiento: Math.round(c.performance.score * 100),
    accesibilidad: Math.round(c.accessibility.score * 100),
    practicas: Math.round(c["best-practices"].score * 100),
    seo: Math.round(c.seo.score * 100),
    LCP: a["largest-contentful-paint"].displayValue,
    CLS: a["cumulative-layout-shift"].displayValue,
    TBT: a["total-blocking-time"].displayValue,
  };
  resultados.push(fila);

  console.log(`\n=== ${ruta} ===`);
  console.log(`Rendimiento ${fila.rendimiento} · Accesibilidad ${fila.accesibilidad} · Buenas prácticas ${fila.practicas} · SEO ${fila.seo}`);
  console.log(`LCP ${fila.LCP} · CLS ${fila.CLS} · TBT ${fila.TBT}`);

  for (const cat of ["performance", "accessibility", "best-practices", "seo"]) {
    const fallos = c[cat].auditRefs
      .map((r) => a[r.id])
      .filter((x) => x && x.score !== null && x.score < 0.9 && x.scoreDisplayMode !== "informative")
      .map((x) => `    · [${cat}] ${x.title}${x.displayValue ? ` (${x.displayValue})` : ""}`);
    if (fallos.length) console.log(fallos.join("\n"));
  }
}

await chrome.kill();

console.log("\n=== RESUMEN ===");
console.table(resultados);
