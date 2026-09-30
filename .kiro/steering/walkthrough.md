# Walkthrough del prototipo (decisión 020)

`prototype/app/public/walkthrough/index.html` es la guía con capturas de ambos journeys (propietaria e inquilino) para personas ajenas al proyecto. Es parte de todo entregable.

Si un cambio toca el look and feel o la navegación del prototipo (pantallas, textos visibles, estilos, componentes, rutas o flujo), en el mismo cambio:

1. Desde `prototype/app`, corre `npm run walkthrough:capturas`.
2. Revisa y ajusta los textos de `public/walkthrough/index.html` (qué ves, qué haces, qué pasa después) y la fecha de "Última actualización".
3. Si agregaste una pantalla o ruta: suma su recorrido a `scripts/walkthrough-capturas.mjs`, un `<article class="paso" data-ruta="...">` a la guía y su fila en el mapa rápido.
4. Corre `npm run check` (incluye `walkthrough:verificar`). No presentes el trabajo como terminado si falla.
5. Si se reparte la versión sin internet, corre `npm run build:local`.

En el resumen final, lista los archivos del walkthrough que cambiaron, o explica por qué el cambio no lo afecta.
