# Build Instructions

## Prerequisites
- **Build tool**: Vite 8.3.1 (vía npm scripts), TypeScript 6.0.3.
- **Runtime**: Node >= 20.19 (verificado con Node 26.8.2 y npm 11.19.1).
- **Variables de entorno**: ninguna. No hay secretos ni configuración por entorno.
- **Sistema**: cualquiera que corra Node. El build pesa menos de 1 MB.

## Build Steps

### 1. Instalar dependencias
```bash
cd prototype/app
npm ci
```

### 2. Build
```bash
npm run build   # tsc --noEmit → walkthrough:verificar → vite build → verificación del artefacto
```
El build falla si la guía no está al día con las rutas (antes de compilar) o si `dist/` no quedó con una copia idéntica de `public/walkthrough/` (después). Así Vercel no publica la app sin su guía (decisión 020).

### 3. Verificar el build
- **Salida esperada**: `✓ built in ...`, `Artefacto con walkthrough: 26 archivos en dist/walkthrough.` y en `dist/`: `index.html`, `assets/index-*.js` (~299 kB, ~90 kB gzip), `assets/index-*.css` (~16 kB) y `walkthrough/` (guía, CSS y 24 capturas, ~4 MB).
- **Sin scripts inline** en `dist/index.html`, así la CSP de `vercel.json` (`script-src 'self'`) no los bloquea.
- **Prueba local**: `npm run preview` y abrir http://localhost:4173/#/inicio.

### 4. Deploy local (sin Node)
```bash
npm run build:local   # vite build --mode local-deploy → local_deploy/app/
```
Genera un build con un script clásico (IIFE) y el CSS incluido en el JS, para que `local_deploy/app/index.html` funcione con doble clic desde `file://`. `local_deploy/servir.command` lo sirve en http://localhost:8080 (solo en 127.0.0.1) con Python 3. Se verificó cargándolo por `file://` en jsdom (inicio, marketplace con 9 propiedades y panel de demo, sin errores) y sirviéndolo por HTTP (200).

### 5. Deploy (Vercel)
`vercel.json` en la raíz ejecuta `npm ci --prefix prototype/app` y `npm run build --prefix prototype/app`, y publica `prototype/app/dist`, que incluye la guía en `/walkthrough/index.html`. `/walkthrough` (sin barra final) redirige ahí: sin ese redirect Vercel serviría la guía desde `/walkthrough` y sus rutas relativas (`walkthrough.css`, `capturas/`) apuntarían a la raíz. Root Directory: raíz del repo.

## Troubleshooting
- **`npm ci` falla por el lockfile**: `package.json` y `package-lock.json` deben coincidir. Si se cambió una versión, hay que correr `npm install` y versionar el lockfile.
- **Error de tipos en el build**: `npm run typecheck` muestra el detalle. TypeScript debe seguir en 6.0.x mientras typescript-eslint 8.71 no soporte TS 7.
- **Página en blanco en Vercel**: revisar la consola por bloqueos de CSP. Si se agrega un recurso externo, hay que sumarlo a la CSP de `vercel.json`.
- **"El walkthrough no está al día" o "El artefacto ... no incluye el walkthrough completo"**: la guía quedó atrás de la app. Desde `prototype/app`: `npm run walkthrough:capturas`, ajustar `public/walkthrough/index.html` y volver a correr el build.
