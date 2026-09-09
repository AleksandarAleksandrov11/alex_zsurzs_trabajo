/**
 * Galería de proyectos.
 *
 * TODO (Alex): esta lista está VACÍA a propósito. No se inventan proyectos.
 * Para publicar uno, añade un objeto con datos reales y las imágenes en
 * `public/images/proyectos/`. El sistema de filtros, la retícula y el
 * lightbox ya funcionan: en cuanto haya un proyecto, se muestran solos.
 *
 * Formato de imagen recomendado: 1600 × 1200 px (4:3), AVIF o WebP.
 */

export type ImagenProyecto = {
  src: string;
  alt: string;
  ancho: number;
  alto: number;
};

export type Proyecto = {
  slug: string;
  titulo: string;
  /** slug de `servicios.ts` */
  servicio: string;
  /** slug de `zonas.ts` */
  zona: string;
  /** Año de ejecución. */
  anio: string;
  reto: string;
  solucion: string;
  imagenes: ImagenProyecto[];
  destacado: boolean;
};

export const proyectos: Proyecto[] = [];

export const proyectosDestacados = proyectos.filter((p) => p.destacado);

export function proyectosPorServicio(slug: string): Proyecto[] {
  return proyectos.filter((p) => p.servicio === slug);
}

export function proyectosPorZona(slug: string): Proyecto[] {
  return proyectos.filter((p) => p.zona === slug);
}

export const hayProyectos = proyectos.length > 0;
