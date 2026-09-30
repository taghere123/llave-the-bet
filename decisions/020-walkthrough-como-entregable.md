# 020 - El walkthrough del prototipo es parte de todo entregable

- **Estado**: Tomada
- **Fecha**: 2026-09-29
- **Responsable**: Diego Moscoso (con el equipo)

## Contexto

El prototipo tiene dos journeys conectados (propietaria e inquilino) y personas ajenas al proyecto
(jurado, mentores, áreas de Interbank e Interseguro) necesitan recorrerlo sin que alguien del
equipo se lo explique. Las capturas sueltas de `prototype/docs/capturas/` son del prototipo legado y
quedaron desactualizadas con la migración.

## Opciones

1. Documento suelto (PDF o slides) que se actualiza a mano cuando alguien se acuerda.
2. Guía HTML publicada junto con la app, con capturas generadas por script y una verificación
   automática que falla si la guía se queda atrás.

## Criterio

Que la guía no se desactualice en silencio y que actualizarla cueste poco.

## Decisión

Opción 2. La guía vive en `prototype/app/public/walkthrough/` y se publica con la app (`/walkthrough/`
en Vercel y `local_deploy/app/walkthrough/`). Se abre desde el pie de la app ("Guía de la demo").

**Regla**: todo cambio de look and feel o de navegación del prototipo (pantallas, textos visibles,
estilos, componentes, rutas, flujo) actualiza el walkthrough en el mismo cambio:

1. `npm run walkthrough:capturas` (desde `prototype/app`) regenera las capturas.
2. Se ajustan los textos de `public/walkthrough/index.html` si cambió lo que se ve o lo que hace el
   usuario, y la fecha de "Última actualización".
3. `npm run check` pasa. Incluye `walkthrough:verificar`, que falla si una ruta de la app no está
   documentada, si falta o sobra una captura, o si un enlace interno no tiene destino.

Un entregable con cambios visuales y la guía sin actualizar no se considera terminado.

## Consecuencias

- `playwright-core` entra como dependencia de desarrollo (versión exacta). El script usa un
  Chromium instalado (Chrome, Chromium, Edge o Brave) o el que indique `LLAVE_NAVEGADOR`.
- Las capturas (~4 MB) se versionan y se publican. Son deterministas: reloj fijo, viewport móvil y
  datos ficticios.
- La regla queda en `CLAUDE.md`, los README, los requisitos (RNF-12), los NFR de cada unidad, las
  reglas AI-DLC de Code Generation y Build and Test y el steering de Kiro.
- La verificación automática cubre rutas y archivos, no el contenido de las capturas ni la
  exactitud de los textos: eso sigue siendo revisión humana.
