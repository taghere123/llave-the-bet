# U1 · NFR Requirements

Aplican a todo el proyecto; U2..U4 los heredan.

| ID | Requisito | Criterio verificable |
| --- | --- | --- |
| NFR-U1-01 | Build estático | `npm run build` genera `prototype/app/dist/` sin errores; Vercel publica esa carpeta |
| NFR-U1-02 | Tipado estricto | `tsc --noEmit` con `strict: true` pasa sin errores |
| NFR-U1-03 | Lint y formato | `npm run lint` y `npm run format:check` pasan |
| NFR-U1-04 | Pruebas | `npm test` pasa; el RentScore tiene prueba diferencial contra el motor legado y valores de referencia fijos |
| NFR-U1-05 | Cadena de suministro | Versiones exactas en package.json + package-lock.json versionado; `npm audit` documentado en Build and Test |
| NFR-U1-06 | Seguridad de front | Sin `dangerouslySetInnerHTML`; React escapa por defecto. Cabeceras vía `vercel.json`: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy y la X-Robots-Tag existente |
| NFR-U1-07 | Accesibilidad | Foco al H1 al navegar, `aria-live` en el progreso, labels en todos los campos, errores asociados con `aria-describedby`, contraste según tokens |
| NFR-U1-08 | Responsive | Breakpoint de 720px y contenedor de 896px, como en el legado |
| NFR-U1-09 | Robustez del estado | Storage no disponible o estado corrupto: la demo arranca del estado inicial sin romperse |
| NFR-U1-10 | Automatización | Elementos interactivos con `data-testid` estables (`{componente}-{rol}`) |
| NFR-U1-11 | Walkthrough al día (RNF-12, decisión 020) | Todo cambio de look and feel o de navegación corre `npm run walkthrough:capturas` y ajusta los textos de `public/walkthrough/index.html`. `npm run walkthrough:verificar` (dentro de `npm run check`) pasa. Agregado el 2026-09-29 |

Rendimiento, escalabilidad y disponibilidad: N/A por ser un sitio estático en el CDN de Vercel. Las extensiones Security y Resiliency están desactivadas en este ciclo.
