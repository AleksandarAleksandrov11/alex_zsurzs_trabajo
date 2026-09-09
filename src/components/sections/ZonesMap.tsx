import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { zonas, zonasPorComarca } from "@/content/zonas";

/**
 * Mapa esquemático de Cataluña.
 *
 * Es una silueta simplificada a propósito, coherente con el lenguaje de
 * plano de obra del manual: retícula, cotas y puntos de posición. No
 * pretende ser cartografía exacta y por eso el contenido navegable real es
 * la lista de enlaces de al lado, que es además lo que lee un lector de
 * pantalla y lo que rastrea Google.
 */

const SILUETA =
  "M62 44 L118 30 L182 24 L250 20 L318 26 L352 32 L340 82 L332 124 L306 186 L268 226 L232 250 L214 266 L192 292 L164 318 L140 344 L118 378 L96 402 L72 386 L52 352 L40 302 L54 232 L36 152 Z";

type Punto = { slug: string; x: number; y: number; etiqueta: boolean };

const puntos: Punto[] = [
  { slug: "girona", x: 305, y: 118, etiqueta: true },
  { slug: "manresa", x: 168, y: 196, etiqueta: true },
  { slug: "terrassa", x: 196, y: 228, etiqueta: false },
  { slug: "sabadell", x: 208, y: 232, etiqueta: false },
  { slug: "granollers", x: 236, y: 226, etiqueta: false },
  { slug: "mollet-del-valles", x: 224, y: 236, etiqueta: false },
  { slug: "cerdanyola-del-valles", x: 214, y: 240, etiqueta: false },
  { slug: "sant-cugat-del-valles", x: 209, y: 244, etiqueta: true },
  { slug: "mataro", x: 256, y: 236, etiqueta: true },
  { slug: "santa-coloma-de-gramenet", x: 228, y: 247, etiqueta: false },
  { slug: "badalona", x: 234, y: 250, etiqueta: false },
  { slug: "sant-adria-de-besos", x: 228, y: 253, etiqueta: false },
  { slug: "barcelona", x: 222, y: 258, etiqueta: true },
  { slug: "esplugues-de-llobregat", x: 214, y: 257, etiqueta: false },
  { slug: "hospitalet-de-llobregat", x: 215, y: 262, etiqueta: false },
  { slug: "cornella-de-llobregat", x: 210, y: 264, etiqueta: false },
  { slug: "sant-boi-de-llobregat", x: 205, y: 268, etiqueta: false },
  { slug: "el-prat-de-llobregat", x: 209, y: 270, etiqueta: false },
  { slug: "castelldefels", x: 198, y: 277, etiqueta: false },
  { slug: "sitges", x: 186, y: 289, etiqueta: false },
  { slug: "vilanova-i-la-geltru", x: 172, y: 298, etiqueta: true },
];

export function ZonesMap({ numero = "03" }: { numero?: string }) {
  const porComarca = zonasPorComarca();

  return (
    <section className="py-section" aria-labelledby="titulo-zonas">
      <div className="container-brand">
        <SectionHeading
          numero={numero}
          eyebrow="Dónde trabajo"
          titulo={<span id="titulo-zonas">Barcelona, área metropolitana y Cataluña</span>}
          descripcion={`${zonas.length} zonas con página propia, cada una con lo que realmente se pide allí. Si tu municipio no está en la lista, pregúntame igualmente: lo que no hago es cobrarte un desplazamiento que no te aporta nada.`}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal className="relative">
            <div className="relative rounded-[2px] border border-white/10 bg-surface/40 p-4 sm:p-6">
              <div className="grid-plano absolute inset-0 opacity-60" aria-hidden="true" />
              <svg
                viewBox="0 0 400 440"
                className="relative w-full"
                role="img"
                aria-label="Mapa esquemático de Cataluña con las zonas de actuación señaladas"
              >
                <path
                  d={SILUETA}
                  fill="rgba(47,74,160,.16)"
                  stroke="rgba(47,74,160,.75)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {/* Radio de trabajo habitual alrededor de Barcelona */}
                <circle
                  cx="222"
                  cy="258"
                  r="46"
                  fill="none"
                  stroke="rgba(255,122,26,.28)"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                />
                <circle
                  cx="222"
                  cy="258"
                  r="88"
                  fill="none"
                  stroke="rgba(255,255,255,.1)"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                />

                {puntos.map((punto) => {
                  const zona = zonas.find((z) => z.slug === punto.slug);
                  if (!zona) return null;
                  const base = punto.slug === "barcelona";
                  return (
                    <g key={punto.slug}>
                      <circle
                        cx={punto.x}
                        cy={punto.y}
                        r={base ? 5 : 2.6}
                        fill={base ? "#FF7A1A" : "#fff"}
                        opacity={base ? 1 : 0.85}
                      />
                      {punto.etiqueta ? (
                        <text
                          x={punto.x + 9}
                          y={punto.y + 4}
                          fill="#E6E6E6"
                          fontSize="11"
                          fontFamily="Arial, Helvetica, sans-serif"
                        >
                          {zona.ciudad}
                        </text>
                      ) : null}
                    </g>
                  );
                })}
              </svg>

              <p className="relative mt-2 text-2xs uppercase tracking-[0.14em] text-fg-muted/45">
                Esquema orientativo · no es cartografía a escala
              </p>
            </div>
          </Reveal>

          <RevealGroup className="flex flex-col gap-9">
            {porComarca.map((grupo) => (
              <RevealItem key={grupo.comarca}>
                <h3 className="text-eyebrow mb-4 flex items-center gap-3 text-fg-muted/50">
                  {grupo.comarca}
                  <span className="cota flex-1" aria-hidden="true" />
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {grupo.zonas.map((zona) => (
                    <li key={zona.slug}>
                      <Link
                        href={`/zonas/${zona.slug}`}
                        className="inline-flex min-h-11 items-center rounded-[2px] border border-white/12 px-3.5 text-sm text-fg-muted transition-colors hover:border-brand-blue hover:text-fg"
                      >
                        {zona.ciudad}
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
