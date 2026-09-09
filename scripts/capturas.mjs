import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://127.0.0.1:3210";
const DESTINO = process.argv[3] ?? "/tmp/capturas";
await mkdir(DESTINO, { recursive: true });

const navegador = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium",
  args: ["--no-sandbox"],
});

const objetivos = [
  { ruta: "/", nombre: "home-desktop", w: 1440, h: 900, full: true },
  { ruta: "/", nombre: "home-movil", w: 390, h: 844, full: true },
  { ruta: "/servicios/electricidad", nombre: "servicio-desktop", w: 1440, h: 900, full: false },
  { ruta: "/servicios/trabajos-verticales", nombre: "verticales-desktop", w: 1440, h: 900, full: false },
  { ruta: "/zonas/barcelona", nombre: "zona-desktop", w: 1440, h: 900, full: false },
  { ruta: "/sobre-alex", nombre: "sobre-desktop", w: 1440, h: 900, full: false },
  { ruta: "/contacto", nombre: "contacto-desktop", w: 1440, h: 1100, full: false },
  { ruta: "/contacto", nombre: "contacto-movil", w: 390, h: 844, full: false },
  { ruta: "/proyectos", nombre: "proyectos-desktop", w: 1440, h: 900, full: false },
  { ruta: "/politica-de-cookies", nombre: "cookies-desktop", w: 1440, h: 900, full: false },
];

for (const o of objetivos) {
  const ctx = await navegador.newContext({
    viewport: { width: o.w, height: o.h },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + o.ruta, { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${DESTINO}/${o.nombre}.png`, fullPage: o.full });
  console.log(`✓ ${o.nombre}.png`);
  await ctx.close();
}

/* Imagen Open Graph */
const ctx = await navegador.newContext({ viewport: { width: 1200, height: 630 } });
const page = await ctx.newPage();
const resp = await page.goto(
  `${BASE}/api/og?t=${encodeURIComponent("Instalaciones certificadas en Barcelona")}&s=${encodeURIComponent("Electricidad, fontanería, climatización y trabajos verticales.")}`,
  { waitUntil: "networkidle" },
);
console.log("OG:", resp?.status(), resp?.headers()["content-type"]);
await page.screenshot({ path: `${DESTINO}/og.png` });
await ctx.close();

await navegador.close();
