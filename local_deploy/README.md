# LLAVE · Deploy local

Versión compilada del prototipo para correrla sin Node, sin instalar nada y sin internet. Todos los datos son ficticios.

## Opción 1: doble clic
Abre `app/index.html` en Chrome, Safari, Edge o Firefox.

## Opción 2: servidor local (macOS)
Doble clic en `servir.command`. Levanta la app en http://localhost:8080 con Python 3, que ya viene en macOS, y abre el navegador. Para detenerlo, cierra la ventana de Terminal o presiona `Ctrl+C`.

Si macOS bloquea el script la primera vez: clic derecho en `servir.command` → Abrir → Abrir.

## Notas
- **Guía de la demo**: `app/walkthrough/index.html` explica cada pantalla con capturas. También se abre desde el pie de la app.
- **Progreso**: se guarda en el `localStorage` del navegador. Doble clic y servidor guardan por separado (son orígenes distintos). "Reiniciar demo", al pie, vuelve al inicio.
- **Sin internet**: todo funciona; solo la tipografía Montserrat cambia a Arial.
- **Actualizar esta carpeta** después de cambiar el código:
  ```bash
  cd prototype/app
  npm run build:local
  ```
  El comando reemplaza `local_deploy/app/`. Este README y `servir.command` no se tocan.
- **Diferencia con Vercel**: este build usa un script clásico en lugar de módulos ES, porque los navegadores bloquean los módulos abiertos desde `file://`. El comportamiento es el mismo.
