# U2 · Resumen de código

## Creado
- Shell: `src/main.tsx`, `src/App.tsx` (resolución de rutas con guardias, cabecera por rol, título y foco), `src/screens/types.ts`, `src/screens/registry.tsx`.
- Pantallas en `src/screens/owner/`: `Inicio.tsx`, `Publicar.tsx`, `Inmueble.tsx`, `Postulantes.tsx` (lista, detalle y autorización), `Resultado.tsx`, `Poliza.tsx`, `Cobro.tsx` (cobro y confirmación).
- Pruebas: `tests/render.tsx` (helpers) y `tests/owner.test.tsx`.

## Modificado
- `src/components/ui.tsx`: `indiceAvatar` conserva los colores de avatar del legado; `Avatar` acepta la clase `hd-av`.
- `src/styles/app.css`: `.badge.centro`.
- `tests/setup.ts`: stub de `window.scrollTo`.

## Paridad
Las rutas, los pasos (x de 9), los textos, las cifras y las clases CSS son los del legado. Diferencias intencionales (BR-OW-07..10):
- La bandeja arranca con 2 postulantes (Jorge y Kevin). Lucía llega desde el marketplace.
- "Ya tienes N postulantes" muestra la cantidad real.
- Existen los badges "Nuevo" y "Score no compartido".
- Aceptar a un postulante deja no seleccionadas las demás postulaciones.

## Verificación al cierre de U2
- `tsc --noEmit` y `eslint .` sin errores. `vite build` genera `dist/` (270 kB JS, 83 kB gzip).
- 53 pruebas en verde: el journey completo con Jorge (56, medio; prima S/63; Cobro Garantizado S/1,710), Kevin con banda baja (modalidades no disponibles), cabecera de postulante, ruta inválida y foco en el H1.
- Pendiente de hacer a mano (Q3=A de Units): revisión visual lado a lado frente a `prototype/src/index.html`.
