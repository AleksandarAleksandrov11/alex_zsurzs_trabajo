/* GENERADO por scripts/procesar-fotos.mjs — no editar a mano. */

export type FotoOptimizada = {
  src: string;
  ancho: number;
  alto: number;
  blur: string;
};

export const fotos = {
  "alex-cubierta-barcelona": {
    "src": "/images/alex-cubierta-barcelona.jpg",
    "ancho": 1068,
    "alto": 1600,
    "blur": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAABQAgCdASoQABgABABoJZQDImEPAFTqGSex6AAA/vHJSIv9pUI3tenVrbPiSuFAOLyxbjdZmjeQCG7h/gvPOYNAAAA="
  },
  "alex-espacio-confinado": {
    "src": "/images/alex-espacio-confinado.jpg",
    "ancho": 892,
    "alto": 1587,
    "blur": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAABQAwCdASoQAB0ALtGIxGIkLCwsDADQS2AAAvCIe7m2To3kgAD51o+u3wXaIGhLPGhQCTdIv+fFYt10eRpiIRNrC8qL6viG9Xvlm07YI9cPCgAA"
  },
  "alex-retrato-obra": {
    "src": "/images/alex-retrato-obra.jpg",
    "ancho": 900,
    "alto": 1600,
    "blur": "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACQAwCdASoQAB0APxFysFAsJqSisAgBgCIJZQCdABhAkqTPvkAAAP653a3xOWsY8DRXT3d9XxGcwftXwAyt70GTiGfKjZB1AAA="
  },
  "alex-premio-sector-oficios": {
    "src": "/images/alex-premio-sector-oficios.jpg",
    "ancho": 1200,
    "alto": 1600,
    "blur": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAwCdASoQABUAPxF2slEsJySisAgBgCIJZACdMoAB650Es73I7XFAAK223cr2Ohv9RIXBVot42kdymPtCiOnVQbqXdJ1+HSoC7mhElIfhjfNDD1jGbPIA"
  },
  "alex-retrato-taller": {
    "src": "/images/alex-retrato-taller.jpg",
    "ancho": 900,
    "alto": 1600,
    "blur": "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAABwBACdASoQAB0APxF2sVAsJ6SisAgBgCIJYwC7MoADSx4hPNMUjKLjwkrUwAD+6/MawtVUEKz3jjeGHeBqNxu3lOTIZBTy0spnnX1/Cnh7pfpJ3G7WPjWDG6OtqhN+VIn5awMLgFhAAA=="
  }
} satisfies Record<string, FotoOptimizada>;

export type NombreFoto = keyof typeof fotos;
