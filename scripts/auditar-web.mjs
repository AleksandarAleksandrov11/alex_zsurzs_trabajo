/**
 * Auditoría de responsive, consola y accesibilidad básica sobre el build real.
 * Uso: node scripts/auditar-web.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://127.0.0.1:3210";

const RUTAS = [
  "/",
  "/servicios",
  "/servicios/electricidad",
  "/servicios/trabajos-verticales",
  "/zonas",
  "/zonas/barcelona",
  "/zonas/manresa",
  "/proyectos",
  "/sobre-alex",
  "/formacion",
  "/contacto",
  "/aviso-legal",
  "/politica-de-privacidad",
  "/politica-de-cookies",
  "/ruta-que-no-existe",
];

const ANCHOS = [360, 390, 430, 768, 1024, 1440, 1920];

/* En este entorno Chromium viene preinstalado: se apunta directamente al
   binario en lugar de descargar otro. */
const EJECUTABLE = process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium";
const navegador = await chromium.launch({
  executablePath: EJECUTABLE,
  args: ["--no-sandbox"],
});
let fallos = 0;

/* ---- 1 · Consola e hidratación ---- */
console.log("=== CONSOLA / HIDRATACIÓN ===");
for (const ruta of RUTAS) {
  const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const mensajes = [];
  page.on("console", (m) => {
    const texto = m.text();
    if (/_vercel|Failed to load resource/.test(texto)) return;
    if (m.type() === "error" || m.type() === "warning") mensajes.push(`${m.type()}: ${texto}`);
  });
  page.on("pageerror", (e) => mensajes.push(`pageerror: ${e.message}`));
  /* Los scripts de Vercel Analytics y Speed Insights solo existen en Vercel:
     en local devuelven 404 y ese ruido no cuenta como incidencia. */
  const IGNORADOS = [/\/_vercel\//];
  page.on("response", (r) => {
    const esperado404 = ruta === "/ruta-que-no-existe" && r.url().endsWith(ruta);
    if (r.status() >= 400 && !esperado404 && !IGNORADOS.some((re) => re.test(r.url()))) {
      mensajes.push(`http ${r.status()}: ${r.url()}`);
    }
  });

  const resp = await page.goto(BASE + ruta, { waitUntil: "networkidle" });
  const estado = resp?.status() ?? 0;
  const esperado = ruta === "/ruta-que-no-existe" ? 404 : 200;

  if (estado !== esperado) { console.log(`✗ ${ruta} → ${estado} (esperado ${esperado})`); fallos++; }
  if (mensajes.length) {
    console.log(`✗ ${ruta}`);
    mensajes.forEach((m) => console.log(`    ${m.slice(0, 220)}`));
    fallos += mensajes.length;
  } else {
    console.log(`✓ ${ruta}  (${estado})`);
  }
  await ctx.close();
}

/* ---- 2 · Scroll horizontal ---- */
console.log("\n=== SCROLL HORIZONTAL ===");
for (const ancho of ANCHOS) {
  const ctx = await navegador.newContext({ viewport: { width: ancho, height: 900 } });
  const page = await ctx.newPage();
  const problemas = [];

  for (const ruta of RUTAS) {
    await page.goto(BASE + ruta, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(220);
    const desborde = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (desborde > 1) {
      const culpables = await page.evaluate(() => {
        const limite = document.documentElement.clientWidth;
        return [...document.querySelectorAll("*")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.right > limite + 1 && r.width > 0 && getComputedStyle(el).position !== "fixed";
          })
          .slice(0, 4)
          .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
      });
      problemas.push(`${ruta} (+${desborde}px) → ${culpables.join(" | ")}`);
    }
  }

  if (problemas.length) {
    console.log(`✗ ${ancho}px`);
    problemas.forEach((p) => console.log(`    ${p}`));
    fallos += problemas.length;
  } else {
    console.log(`✓ ${ancho}px  sin desbordes`);
  }
  await ctx.close();
}

/* ---- 3 · Accesibilidad estructural ---- */
console.log("\n=== ESTRUCTURA Y ACCESIBILIDAD ===");
{
  const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  for (const ruta of RUTAS) {
    await page.goto(BASE + ruta, { waitUntil: "domcontentloaded" });
    const info = await page.evaluate(() => {
      const h1 = [...document.querySelectorAll("h1")].map((h) => h.textContent?.trim() ?? "");
      const imgsSinAlt = [...document.querySelectorAll("img")].filter(
        (i) => i.getAttribute("alt") === null,
      ).length;
      const enlacesVacios = [...document.querySelectorAll("a")].filter(
        (a) => !a.textContent?.trim() && !a.getAttribute("aria-label") && !a.querySelector("[aria-label]"),
      ).length;
      const botonesSinNombre = [...document.querySelectorAll("button")].filter(
        (b) => !b.textContent?.trim() && !b.getAttribute("aria-label"),
      ).length;
      const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(
        (s) => {
          try { return JSON.parse(s.textContent ?? "{}")["@type"]; } catch { return "JSON INVÁLIDO"; }
        },
      );
      const title = document.title;
      const desc = document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
      const og = document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "";
      const lang = document.documentElement.lang;
      return { h1, imgsSinAlt, enlacesVacios, botonesSinNombre, jsonld, title, desc, canonical, og, lang };
    });

    const errs = [];
    if (info.h1.length !== 1) errs.push(`${info.h1.length} h1`);
    if (info.imgsSinAlt) errs.push(`${info.imgsSinAlt} img sin alt`);
    if (info.enlacesVacios) errs.push(`${info.enlacesVacios} enlaces sin nombre`);
    if (info.botonesSinNombre) errs.push(`${info.botonesSinNombre} botones sin nombre`);
    if (info.jsonld.includes("JSON INVÁLIDO")) errs.push("JSON-LD inválido");
    if (!info.title) errs.push("sin title");
    if (!info.desc) errs.push("sin description");
    if (info.lang !== "es") errs.push(`lang="${info.lang}"`);
    if (ruta !== "/ruta-que-no-existe") {
      if (!info.canonical) errs.push("sin canonical");
      if (!info.og) errs.push("sin og:image");
    }

    if (errs.length) { console.log(`✗ ${ruta} → ${errs.join(" · ")}`); fallos += errs.length; }
    else console.log(`✓ ${ruta}  · title ${info.title.length} car. · desc ${info.desc.length} car. · JSON-LD [${info.jsonld.join(", ")}]`);
  }
  await ctx.close();
}

/* ---- 4 · Redirecciones permanentes ---- */
console.log("\n=== REDIRECCIONES ===");
{
  const esperadas = [
    ["/presupuesto", "/contacto"],
    ["/sobre-mi", "/sobre-alex"],
    ["/servicios/lampista", "/servicios/lampisteria"],
    ["/servicios/aire-acondicionado", "/servicios/climatizacion"],
    ["/servicios/trabajos-en-altura", "/servicios/trabajos-verticales"],
    ["/zonas/hospitalet", "/zonas/hospitalet-de-llobregat"],
  ];

  for (const [origen, destino] of esperadas) {
    const res = await fetch(BASE + origen, { redirect: "manual" });
    const destinoReal = res.headers.get("location") ?? "";
    const ok = res.status === 308 && destinoReal.endsWith(destino);
    if (!ok) {
      console.log(`✗ ${origen} → ${res.status} ${destinoReal}`);
      fallos++;
    } else {
      console.log(`✓ ${origen} → ${destino} (308)`);
    }
  }
}

await navegador.close();
console.log(fallos === 0 ? "\n✓ AUDITORÍA WEB SUPERADA\n" : `\n✗ ${fallos} incidencias\n`);
process.exit(fallos === 0 ? 0 : 1);
