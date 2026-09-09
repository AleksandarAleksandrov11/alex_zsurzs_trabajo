/**
 * Navegación por teclado, menú móvil, banner de cookies y acordeón de FAQ.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://127.0.0.1:3219";
const navegador = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium",
  args: ["--no-sandbox"],
});
let fallos = 0;
const ok = (c, m) => { console.log(`${c ? "✓" : "✗"} ${m}`); if (!c) fallos++; };

/* --- Escritorio --- */
{
  const ctx = await navegador.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  await page.keyboard.press("Tab");
  const primero = await page.evaluate(() => document.activeElement?.textContent?.trim());
  ok(primero === "Saltar al contenido principal", "El primer tabulador es el enlace de salto");

  const visibleAlEnfocar = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
  ok(visibleAlEnfocar, "El enlace de salto se hace visible al enfocarlo");

  /* Banner de cookies: rechazar y comprobar que persiste */
  await page.getByRole("button", { name: "Rechazar todas" }).click();
  await page.waitForTimeout(400);
  const cookie = await page.evaluate(() => document.cookie);
  ok(/zs_consent/.test(cookie) && /%22analiticas%22%3Afalse/.test(cookie),
     "Rechazar todas guarda el consentimiento con analíticas desactivadas");

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const bannerVisible = await page.getByRole("button", { name: "Aceptar todas" }).isVisible().catch(() => false);
  ok(!bannerVisible, "El banner no vuelve a aparecer tras decidir");

  /* Reabrir desde el pie */
  await page.getByRole("button", { name: "Configuración de cookies" }).click();
  await page.waitForTimeout(500);
  ok(await page.getByRole("button", { name: "Aceptar todas" }).isVisible(),
     "El enlace del pie reabre las preferencias");

  /* Acordeón de FAQ con teclado */
  await page.goto(`${BASE}/servicios/electricidad`, { waitUntil: "networkidle" });
  const detalles = page.locator("details.faq-item");
  const total = await detalles.count();
  ok(total >= 5, `La FAQ del servicio tiene ${total} preguntas`);
  const segundo = detalles.nth(1);
  await segundo.locator("summary").focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  ok(await segundo.evaluate((el) => el.hasAttribute("open")), "La FAQ se abre con el teclado");

  await ctx.close();
}

/* --- Móvil --- */
{
  const ctx = await navegador.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Aceptar todas" }).click();
  await page.waitForTimeout(300);

  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page.waitForTimeout(600);
  const dialogo = page.getByRole("dialog", { name: "Menú de navegación" });
  ok(await dialogo.isVisible(), "El menú móvil se abre a pantalla completa");

  const bloqueado = await page.evaluate(() => document.body.style.overflow === "hidden");
  ok(bloqueado, "Bloquea el scroll del fondo mientras el menú está abierto");

  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  ok(!(await dialogo.isVisible().catch(() => false)), "Escape cierra el menú móvil");

  const focoTrasCerrar = await page.evaluate(
    () => document.activeElement?.getAttribute("aria-label"),
  );
  ok(focoTrasCerrar === "Abrir menú", "Devuelve el foco al botón que lo abrió");

  /* Áreas táctiles */
  /* El enlace de salto mide 1×1 mientras está oculto: es correcto y por eso
     se excluye, igual que cualquier elemento marcado como `sr-only`. */
  const pequenos = await page.evaluate(() => {
    const objetivos = [...document.querySelectorAll("a[href], button")];
    return objetivos.filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 3 || r.height < 3) return false;
      if (el.className.toString().includes("sr-only")) return false;
      return r.height < 40 || r.width < 24;
    }).length;
  });
  ok(pequenos === 0, `Todas las áreas táctiles visibles llegan al mínimo (${pequenos} por debajo)`);

  await ctx.close();
}

await navegador.close();
console.log(fallos === 0 ? "\n✓ TECLADO Y ACCESIBILIDAD CORRECTOS\n" : `\n✗ ${fallos} incidencias\n`);
process.exit(fallos === 0 ? 0 : 1);
