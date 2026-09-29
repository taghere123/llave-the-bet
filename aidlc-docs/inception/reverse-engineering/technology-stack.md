# Technology Stack — LLAVE Prototipo

## Programming Languages
- **JavaScript** — estilo ES5 / compatible con navegador, patrón IIFE. Sin transpilación. Uso: toda la lógica de la app (`app.js`, `rentscore.js`, `datos.js`).
- **HTML5** — `index.html` (shell) y los `preview.html` del design system.
- **CSS3** — `styles.css`, con custom properties (variables CSS) como sistema de tokens.

## Frameworks / Librerías
- Ninguno. Sin React/Vue/Angular, sin jQuery, sin bundler. SVG inline generado por código para íconos e ilustraciones.

## Infrastructure / Hosting
- **Vercel** — hosting estático vía `vercel.json` (publica solo `prototype/src` y `prototype/data`).
- **Google Fonts** — CDN de la tipografía Montserrat.
- **localStorage** — persistencia del estado de la demo (clave `llave-demo-v1`).

## Build Tools
- Ninguno. No hay `package.json`, bundler ni pipeline de build. Se ejecuta abriendo el HTML.

## Testing Tools
- Ninguno. `rentscore.js` exporta vía `module.exports` cuando existe, lo que lo deja **preparado** para pruebas en Node, pero no hay pruebas escritas.

## Notas de compatibilidad
- Diseño mobile-first; responsive a 720px (2-3 columnas) dentro de un contenedor de 896px.
- Soporte de temas claro/oscuro definido en los tokens del design system (aplicación en CSS por confirmar).
- La preferencia registrada para el próximo ciclo (intent Q3=B) es migrar a un stack con build (Vite/Next.js); hoy no está.
