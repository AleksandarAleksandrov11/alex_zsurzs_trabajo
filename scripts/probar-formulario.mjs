/**
 * Prueba funcional del formulario de presupuesto sobre el build real.
 * Comprueba: validación de cliente, navegación por pasos, foco, persistencia
 * en sessionStorage, honeypot y validación de servidor.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://127.0.0.1:3216";
const navegador = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium",
  args: ["--no-sandbox"],
});
const ctx = await navegador.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
let fallos = 0;
const ok = (c, m) => { console.log(`${c ? "✓" : "✗"} ${m}`); if (!c) fallos++; };

/* Se opera solo dentro del formulario: fuera hay enlaces con los mismos textos. */
const form = () => page.locator("form");
const elegir = (texto) => form().getByText(texto, { exact: true }).first().click();

await page.goto(`${BASE}/contacto`, { waitUntil: "networkidle" });

/* 1 · No deja avanzar sin elegir servicio */
await form().getByRole("button", { name: "Continuar" }).click();
await page.waitForTimeout(300);
ok(await form().getByText("Elige con qué necesitas ayuda.").isVisible(), "Bloquea el paso 1 sin servicio y muestra el error");

/* 2 · Avanza al elegir */
await elegir("Electricidad");
await form().getByRole("button", { name: "Continuar" }).click();
await page.waitForTimeout(400);
ok(await form().getByText("¿Para qué espacio?", { exact: true }).first().isVisible(), "Avanza al paso 2");

/* 3 · Foco en el encabezado del paso */
const focoEsH2 = await page.evaluate(() => document.activeElement?.tagName === "H2");
ok(focoEsH2, "Mueve el foco al encabezado del paso");

/* 4 · Los pasos inactivos quedan fuera del alcance del teclado */
const inertes = await page.evaluate(
  () => document.querySelectorAll("form [inert]").length,
);
ok(inertes >= 4, `Los ${inertes} pasos inactivos quedan inert`);

/* 5 · Ubicación obligatoria */
await elegir("Vivienda particular");
await form().getByRole("button", { name: "Continuar" }).click();
await page.waitForTimeout(300);
ok(await form().getByText("Escribe al menos la población.").isVisible(), "Exige ubicación");

await form().getByLabel("¿Dónde está?").fill("Barcelona, Gràcia");
await form().getByRole("button", { name: "Continuar" }).click();
await page.waitForTimeout(400);

/* 6 · Detalle mínimo de 20 caracteres */
await form().getByLabel("Cuéntame qué necesitas").fill("corto");
await form().getByRole("button", { name: "Continuar" }).click();
await page.waitForTimeout(300);
ok(await form().getByText("Cuéntame un poco más: mínimo 20 caracteres.").isVisible(), "Exige 20 caracteres en el detalle");

await page
  .getByLabel("Cuéntame qué necesitas")
  .fill("El diferencial salta desde hace dos semanas, sobre todo con el termo encendido.");
await elegir("Este mes");
await form().getByRole("button", { name: "Continuar" }).click();
await page.waitForTimeout(400);

/* 7 · Persistencia en sessionStorage */
const guardado = await page.evaluate(() => sessionStorage.getItem("zs_presupuesto"));
ok(Boolean(guardado && guardado.includes("Gràcia")), "Guarda el estado en sessionStorage");

/* 8 · Se recupera al recargar */
await page.reload({ waitUntil: "networkidle" });
const recuperado = await page.evaluate(() => {
  const d = JSON.parse(sessionStorage.getItem("zs_presupuesto") ?? "{}");
  return d.ubicacion;
});
ok(recuperado === "Barcelona, Gràcia", "Recupera los datos tras recargar");

/* 9 · Honeypot presente y fuera del alcance del teclado */
const honeypot = await page.evaluate(() => {
  const el = document.querySelector('input[name="empresa"]');
  return el ? { tab: el.getAttribute("tabindex"), auto: el.getAttribute("autocomplete") } : null;
});
ok(honeypot?.tab === "-1" && honeypot?.auto === "off", "Honeypot presente, tabindex -1 y sin autocompletado");

/* 10 · Recorrido completo y envío real contra la Server Action */
await elegir("Electricidad");
await form().getByRole("button", { name: "Continuar" }).click();
await page.waitForTimeout(300);
await elegir("Vivienda particular");
await form().getByLabel("¿Dónde está?").fill("Barcelona, Gràcia");
await form().getByRole("button", { name: "Continuar" }).click();
await page.waitForTimeout(300);
await page
  .getByLabel("Cuéntame qué necesitas")
  .fill("El diferencial salta desde hace dos semanas, sobre todo con el termo encendido.");
await elegir("Este mes");
await form().getByRole("button", { name: "Continuar" }).click();
await page.waitForTimeout(300);
await elegir("WhatsApp");
await form().getByRole("button", { name: "Continuar" }).click();
await page.waitForTimeout(300);

/* Sin aceptar la política no debe dejar enviar */
await form().getByLabel("Nombre").fill("Cliente de prueba");
await form().getByRole("button", { name: "Enviar solicitud" }).click();
await page.waitForTimeout(900);
const textoTrasEnvio = await page.locator("form").innerText();
ok(/política de privacidad|teléfono o un correo/i.test(textoTrasEnvio), "El servidor rechaza el envío sin RGPD ni contacto");

/* La Server Action descarta como bot cualquier envío hecho en menos de
   3,5 s desde que se abre el formulario. Se espera para atravesar esa
   comprobación y llegar de verdad al envío de correo. */
await page.waitForTimeout(4200);
await form().getByLabel("Teléfono o WhatsApp").fill("600123456");
await form().locator('input[type="checkbox"]').check();
await form().getByRole("button", { name: "Enviar solicitud" }).click();
await page.waitForTimeout(1600);
const resultado = await page.locator("main").innerText();
const detalle = await form().innerText().catch(() => "");
console.log("    → formulario:", detalle.slice(-420).replace(/\n+/g, " | "));
/* Tres desenlaces legítimos según cómo esté configurado el correo:
   confirmación, "falta configuración" o "no se ha podido enviar". */
ok(
  /Gracias\.|no puedo procesar el formulario|No he podido enviar la solicitud/i.test(resultado),
  "La Server Action responde y nunca da por bueno un envío fallido",
);
console.log(
  `    → respuesta: ${
    resultado.match(/Gracias\.|Ahora mismo no puedo[^.]*\.|No he podido enviar[^.]*\./)?.[0] ?? "?"
  }`,
);

await navegador.close();
console.log(fallos === 0 ? "\n✓ FORMULARIO CORRECTO\n" : `\n✗ ${fallos} incidencias\n`);
process.exit(fallos === 0 ? 0 : 1);
