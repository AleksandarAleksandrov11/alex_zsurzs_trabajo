import { chromium } from "playwright";
const [ , , url, salida, w = "1440", h = "900", scroll = "0" ] = process.argv;
const navegador = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium",
  args: ["--no-sandbox"],
});
const ctx = await navegador.newContext({ viewport: { width: +w, height: +h } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
if (+scroll) { await page.evaluate((y) => window.scrollTo(0, y), +scroll); }
await page.waitForTimeout(1600);
await page.screenshot({ path: salida });
console.log("✓", salida);
await navegador.close();
