import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

// Build local (npm run build:local, modo "local-deploy"): genera local_deploy/app/ en la raíz del repo para abrir
// index.html con doble clic. Los navegadores bloquean los módulos ES en file://, así que este
// build usa un único script clásico (IIFE) con defer en vez de <script type="module">.
const SALIDA_LOCAL = fileURLToPath(new URL('../../local_deploy/app', import.meta.url));

function scriptClasico(): Plugin {
  return {
    name: 'llave-script-clasico',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (html) =>
        html
          .replace(/<script type="module" crossorigin/g, '<script defer')
          .replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet"'),
    },
  };
}

export default defineConfig(({ mode }) => {
  // Vite reserva el nombre de modo "local" (choca con los archivos .env.local).
  const local = mode === 'local-deploy';
  return {
    // Rutas relativas: el build funciona en la raíz de Vercel, en una subcarpeta o en file://.
    base: './',
    plugins: [react(), ...(local ? [scriptClasico()] : [])],
    build: local
      ? {
          outDir: SALIDA_LOCAL,
          emptyOutDir: true,
          modulePreload: false,
          rolldownOptions: { output: { format: 'iife', inlineDynamicImports: true } },
        }
      : undefined,
    test: {
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      include: ['tests/**/*.test.{ts,tsx}'],
    },
  };
});
