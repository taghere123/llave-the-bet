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
npm run build   # tsc --noEmit && vite build
```

### 3. Verificar el build
- **Salida esperada**: `✓ built in ...` y tres archivos en `dist/`: `index.html`, `assets/index-*.js` (~299 kB, ~90 kB gzip) y `assets/index-*.css` (~16 kB).
- **Sin scripts inline** en `dist/index.html`, así la CSP de `vercel.json` (`script-src 'self'`) no los bloquea.
- **Prueba local**: `npm run preview` y abrir http://localhost:4173/#/inicio.

### 4. Deploy (Vercel)
`vercel.json` en la raíz ejecuta `npm ci --prefix prototype/app` y `npm run build --prefix prototype/app`, y publica `prototype/app/dist`. Root Directory: raíz del repo.

## Troubleshooting
- **`npm ci` falla por el lockfile**: `package.json` y `package-lock.json` deben coincidir. Si se cambió una versión, hay que correr `npm install` y versionar el lockfile.
- **Error de tipos en el build**: `npm run typecheck` muestra el detalle. TypeScript debe seguir en 6.0.x mientras typescript-eslint 8.71 no soporte TS 7.
- **Página en blanco en Vercel**: revisar la consola por bloqueos de CSP. Si se agrega un recurso externo, hay que sumarlo a la CSP de `vercel.json`.
