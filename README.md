# ZSolutions · web corporativa

Web de captación de clientes locales de **ZSolutions**, la marca de instalaciones
de **Alex Zsurzs** en Barcelona. Electricidad, fontanería, climatización,
aerotermia, trabajos verticales y lampistería.

No es un portfolio: es una máquina de captar solicitudes de presupuesto en
Barcelona, el área metropolitana y Cataluña.

**Stack:** Next.js 15 (App Router) · TypeScript estricto · Tailwind CSS v4 ·
Motion · Zod · Resend · Vercel Analytics + Speed Insights.

---

## 1. Arrancar el proyecto

```bash
pnpm install
cp .env.example .env.local     # y rellena las variables (ver §2)
pnpm dev                       # http://localhost:3000
```

Otros comandos:

```bash
pnpm build              # build de producción
pnpm start              # sirve el build
pnpm typecheck          # tsc --noEmit
pnpm lint               # ESLint
pnpm auditar            # typecheck + lint + auditoría de contenido
```

---

## 2. Variables de entorno

Se configuran en `.env.local` para desarrollo y en **Vercel → Project →
Settings → Environment Variables** para producción.

| Variable | Para qué sirve | Obligatoria |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Dominio público, p. ej. `https://zsolutions.es` | No: se autodetecta (ver §12) |
| `RESEND_API_KEY` | Clave de API de [Resend](https://resend.com/api-keys) | Sí, para que el formulario envíe |
| `EMAIL_REMITENTE` | Remitente verificado en Resend, p. ej. `ZSolutions <presupuestos@zsolutions.es>` | Sí |
| `EMAIL_DESTINATARIO` | Dirección de Alex que recibe las solicitudes | Sí |

**Sin estas tres variables el formulario no falla en silencio:** valida, avisa
al usuario con un mensaje claro y le ofrece WhatsApp y teléfono como
alternativa. Ese comportamiento está probado en `scripts/probar-formulario.mjs`.

Para que Resend acepte el envío hay que **verificar el dominio `zsolutions.es`**
en su panel (registros SPF y DKIM en el DNS). Con una clave inválida o un
dominio sin verificar, la web registra el error en el log del servidor y muestra
el aviso de reintento: nunca da por bueno un envío que no ha salido.

---

## 3. Cómo editar el contenido

**Regla del proyecto: ningún texto, URL ni dato de contacto está escrito a fuego
en un componente.** Todo vive en `src/content/`, en archivos TypeScript tipados.

| Archivo | Qué contiene |
|---|---|
| `site.ts` | Nombre, NAP, teléfono, WhatsApp, email, redes, navegación |
| `servicios.ts` | Los 6 servicios completos: textos, FAQ, proceso, palabras clave |
| `zonas.ts` | Las 21 zonas con su contenido propio |
| `proyectos.ts` | Galería de trabajos (**vacía a propósito**, ver §5) |
| `certificaciones.ts` | Las 19 acreditaciones agrupadas |
| `trayectoria.ts` | Bio y timeline 2012 → 2024 |
| `faq.ts` | Preguntas frecuentes de la home |
| `formacion.ts` | Página de formación |
| `legal.ts` | Datos fiscales y los tres textos legales |
| `fotos.ts` | **Generado**, no editar a mano (ver §6) |

Al cambiar cualquiera de ellos, la web se actualiza sola: rutas, sitemap,
schema, enlaces internos y menús salen de aquí.

### Añadir una zona

En `src/content/zonas.ts`, añade un objeto al array `zonas`. La página, la ruta
estática, el sitemap, el mapa de la home y los enlaces del pie aparecen solos.

**Aviso importante de SEO:** una zona nueva necesita **contenido diferenciado
real** (mínimo 500 palabras): parque edificado de ese municipio, servicios que
allí se piden de verdad, barrios que cubre y tiempo de desplazamiento. Si te
limitas a cambiar el nombre de la ciudad, Google lo trata como contenido
duplicado o *doorway page* y **penaliza el dominio entero**. Prefiere ocho
páginas buenas a veintidós vacías.

`pnpm auditar:contenido` comprueba automáticamente ese mínimo y avisa si una
zona se queda corta o si repites un `title` o una `description`.

### Añadir un proyecto

1. Deja las imágenes en `public/images/proyectos/`.
2. Añade un objeto al array `proyectos` de `src/content/proyectos.ts` con el
   servicio, la zona, el año, el reto y la solución.

La galería, los filtros, el visor con teclado y los bloques "trabajos reales"
de la página de servicio y de la de zona lo recogen automáticamente.

### Añadir un servicio

Añade un objeto a `servicios.ts` (mínimo 800 palabras de texto útil) y un icono
nuevo en `src/components/ui/ServiceIcon.tsx`.

---

## 4. Estructura

```
src/
  app/            rutas, sitemap.ts, robots.ts, manifest.ts, iconos, /api/og
  components/
    layout/       Header, Footer, MobileMenu, CookieBanner, WhatsAppFloat, PageTransition
    sections/     Hero, ServicesGrid, WhyUs, ZonesMap, Certifications, Timeline, FAQ, CTASection…
    forms/        QuoteWizard, FormField, ProgressBar
    ui/           Button, Card, Badge, SectionHeading, Reveal, AnimatedCounter, BrandLogo, ServiceIcon…
    seo/          JsonLd
  content/        todos los textos y datos
  lib/            motion, seo, schema, validation, mail, rate-limit, cookies, utils
  actions/        Server Action del formulario
scripts/          generación de imágenes e iconos y auditorías automáticas
```

---

## 5. Lo que hay pendiente de contenido

La galería de proyectos está **montada y vacía a propósito**. El sistema
funciona (filtros, retícula, visor accesible), pero no se publican trabajos
inventados. Lo mismo aplica a testimonios, número de clientes y años de
garantía: no hay ninguno porque no se inventan.

Los huecos de foto que faltan se muestran como una composición gráfica con la
cota de lo que hay que aportar, en lugar de con una imagen de banco.

---

## 6. Imágenes e iconos

Las fotos originales se optimizan con un script que además genera el
placeholder de desenfoque y el manifiesto tipado:

```bash
pnpm fotos ./ruta/a/las/fotos/originales
```

Genera `public/images/*.jpg` y reescribe `src/content/fotos.ts`. A partir de
ahí, `next/image` sirve AVIF y WebP con los tamaños correctos.

El paquete completo de iconos se genera a partir del isotipo:

```bash
pnpm iconos
```

Produce `favicon.ico` (16/32/48), `icon.svg`, `apple-icon.png` (180),
`icon-192.png`, `icon-512.png`, `maskable-512.png` y la versión monocroma.
El manifiesto PWA se genera en `src/app/manifest.ts`.

---

## 7. Marca

El sistema visual sigue el *Manual Básico de Identidad Visual Corporativa*.

- **Azul = acción · naranja = atención · blanco = información.** El naranja no
  pasa del 5 % de la superficie.
- El logotipo **nunca** en naranja: azul corporativo, blanco o negro.
- Righteous para titulares, Arial para el cuerpo. Righteous nunca en párrafos.
- Fotografía real de obra, desaturada, con capa de color corporativo entre el
  60 % y el 80 % cuando lleva texto encima.

> **Pendiente:** `BrandLogo` y `ServiceIcon` son una construcción fiel a lo que
> describe el manual, pero **no son los archivos originales**. Cuando Alex
> facilite los SVG oficiales del logotipo, el isotipo y los cuatro iconos
> identificativos, basta con sustituir el contenido de esos dos componentes: no
> hay que tocar ninguna página.

---

## 8. SEO

- `generateMetadata` en todas las páginas, con `title` y `description` únicos,
  canonical, Open Graph y Twitter Card.
- Imágenes OG generadas al vuelo con `next/og` en `/api/og`.
- JSON-LD: `LocalBusiness` (`Electrician` + `HVACBusiness` + `Plumber`),
  `Person`, `WebSite`, `Service`, `FAQPage` y `BreadcrumbList`.
- `sitemap.xml` y `robots.txt` dinámicos con las 47 rutas.
- URLs limpias en español, breadcrumbs visibles y enlazado interno denso.

### Antes de publicar

1. **Rellenar el NAP** en `src/content/site.ts` y los datos fiscales en
   `src/content/legal.ts`. El schema `LocalBusiness` omite a propósito los
   campos vacíos: es mejor un schema incompleto que uno con datos inventados
   que no coincidan con el Perfil de Empresa de Google.
2. **Google Search Console:** verificar el dominio y pegar el código en
   `metadata.verification.google` de `src/app/layout.tsx` (hay un `TODO` en su
   sitio). Después, enviar `https://zsolutions.es/sitemap.xml`.
3. **Perfil de Empresa de Google:** para un negocio local pesa tanto como la
   web. Crearlo o reclamarlo, con el NAP **exactamente igual** que aquí,
   categorías (electricista, fontanero, servicio de climatización), zona de
   servicio, horario y fotos reales de trabajos.
4. **`contacto.zsolutions.es`:** redirigir con un 301 a `https://zsolutions.es/contacto`
   para que los dos no compitan por la misma intención de búsqueda. Si prefieres
   mantenerlo vivo, ponle un `<link rel="canonical">` apuntando a la web nueva.
5. Validar el JSON-LD en la
   [prueba de resultados enriquecidos de Google](https://search.google.com/test/rich-results).

---

## 9. Legal y cookies

Las tres páginas legales están redactadas y enlazadas en el pie.

> **Estos textos son una base sólida redactada para este proyecto y deben ser
> revisados por un asesor antes de publicar. No son asesoramiento jurídico.**

El banner de cookies es propio, coherente con el diseño, y ofrece **aceptar,
rechazar y configurar con el mismo peso visual**, como exige la AEPD. El
consentimiento se guarda 12 meses en una cookie de primera parte y se puede
cambiar desde el pie de página en cualquier momento.

**Vercel Web Analytics funciona sin cookies**, así que se trata como esencial y
esa decisión está documentada en la política de cookies. El patrón para scripts
que sí requieren consentimiento previo (Google Analytics, píxel de Meta) queda
listo en `src/components/layout/ConsentGate.tsx`: nada se carga antes de que el
usuario lo autorice.

---

## 10. Auditorías automáticas

El proyecto trae sus propias comprobaciones. Con el build servido en local:

```bash
pnpm build && pnpm start                     # en una terminal
pnpm auditar:contenido                       # mínimos de palabras y metadatos únicos
pnpm auditar:web        http://localhost:3000  # consola, hidratación, responsive, a11y
pnpm auditar:teclado    http://localhost:3000  # foco, menú móvil, cookies, áreas táctiles
pnpm auditar:formulario http://localhost:3000  # validación, honeypot, Server Action
pnpm auditar:lighthouse http://localhost:3000 / /servicios/electricidad
```

`auditar:web` comprueba que no hay scroll horizontal en 360, 390, 430, 768,
1024, 1440 y 1920 px, que no hay errores de consola ni de hidratación, que cada
página tiene un solo `h1`, `alt` en todas las imágenes y JSON-LD válido.

Las auditorías con navegador usan Playwright y el Chromium del sistema. Si en tu
máquina está en otra ruta, exporta `CHROMIUM_PATH`.

---

## 11. Checklist de lanzamiento

- [ ] Datos fiscales y NAP rellenos (`site.ts` y `legal.ts`)
- [ ] Textos legales revisados por un asesor
- [ ] `RESEND_API_KEY`, `EMAIL_REMITENTE` y `EMAIL_DESTINATARIO` en Vercel
- [ ] Dominio verificado en Resend (SPF y DKIM)
- [ ] Prueba real de envío del formulario, con autorespuesta incluida
- [ ] Dominio `zsolutions.es` apuntando a Vercel, con `www` redirigido
- [ ] Redirección 301 de `contacto.zsolutions.es` a `/contacto`
- [ ] Google Search Console verificado y sitemap enviado
- [ ] Perfil de Empresa de Google creado u optimizado, con el mismo NAP
- [ ] SVG oficiales del logotipo y de los iconos sustituidos
- [ ] Fotos reales de los servicios que aún tienen hueco
- [ ] Primeros proyectos publicados en la galería
- [ ] `pnpm auditar` en verde

---

## 12. Despliegue en Vercel

El repositorio trae `vercel.json` con el framework, los comandos de instalación
y build y las redirecciones permanentes. `packageManager` fija la versión de
pnpm para que Vercel instale exactamente con el mismo lockfile que en local.

### Puesta en marcha, paso a paso

1. En [vercel.com/new](https://vercel.com/new), importar el repositorio
   `AleksandarAleksandrov11/alex_zsurzs_trabajo`.
2. **Root Directory: `./`** (la raíz del repositorio). Es el error más habitual:
   si apunta a una subcarpeta, Vercel no encuentra el proyecto y no despliega
   nada.
3. **Production Branch: `main`.** Vercel solo publica en el dominio principal lo
   que hay en la rama de producción; el resto de ramas genera
   previsualizaciones con su propia URL.
4. Framework: Next.js (se detecta solo gracias a `vercel.json`).
5. Añadir las variables de entorno de §2 y desplegar.

### El sitio se adapta al dominio donde esté servido

Las canonicals, el sitemap, el JSON-LD y las miniaturas Open Graph no están
fijadas a `zsolutions.es`: se resuelven en tiempo de compilación según el
entorno (`src/lib/seo.ts`).

- **Producción:** el dominio de producción del proyecto, o el valor de
  `NEXT_PUBLIC_SITE_URL` si lo defines.
- **Previsualizaciones:** la URL de esa previsualización, para que al compartir
  el enlace la miniatura y el título salgan bien.
- **Local:** `http://localhost:3000`.

Cuando el dominio definitivo esté apuntando, define
`NEXT_PUBLIC_SITE_URL=https://zsolutions.es` en producción y vuelve a desplegar.

### Dominios

- Añadir `zsolutions.es` y `www.zsolutions.es` en Vercel, con `www` redirigido
  al dominio sin www (o al revés, pero solo uno como principal).
- Redirigir `contacto.zsolutions.es` con un 301 a `https://zsolutions.es/contacto`.
  Esto se configura a nivel de dominio en Vercel, no en `vercel.json`.

### Detalles que ya están resueltos

- La tipografía de las imágenes Open Graph se lee del repositorio, no de Google
  Fonts: `/api/og` no depende de ninguna descarga externa en tiempo de ejecución.
  El archivo se incluye en el paquete mediante `outputFileTracingIncludes`.
- `.vercelignore` deja fuera del despliegue las herramientas de auditoría.
- Analytics y Speed Insights se activan solos en Vercel. En local devuelven 404
  y por eso las auditorías los ignoran.

### Si el despliegue no aparece

Por orden de probabilidad:

1. La rama desplegada no es la de producción. Comprobar **Settings → Git →
   Production Branch**.
2. El *Root Directory* no es la raíz del repositorio.
3. El build ha fallado. En **Deployments**, abrir el último y leer el log; el
   error concreto sale ahí.
4. El proyecto no está conectado a este repositorio en GitHub.

Para descartar que el problema sea del código, este build se reproduce en
limpio con:

```bash
git clone <repo> comprobacion && cd comprobacion
pnpm install --frozen-lockfile && pnpm build
```
