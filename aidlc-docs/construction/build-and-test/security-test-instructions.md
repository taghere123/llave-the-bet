# Security Test Instructions

La extensión Security Baseline está desactivada en este ciclo (prototipo estático, sin datos reales). Estos son los chequeos livianos que sí se aplicaron (RNF-09):

```bash
cd prototype/app
npm audit                       # resultado del 2026-09-29: 0 vulnerabilidades
grep -rn "dangerouslySetInnerHTML" src || echo "sin HTML crudo"
grep -c "<script>" dist/index.html   # 0: sin scripts inline
```

- **Escape de salida**: React escapa todo texto. No se usa `dangerouslySetInnerHTML`.
- **Entrada**: el lead form valida con allowlists (regex) y longitudes máximas. El estado cargado de `localStorage` se valida antes de usarlo.
- **Cabeceras** (`vercel.json`): CSP restrictiva, HSTS, nosniff, X-Frame-Options DENY, Referrer-Policy y X-Robots-Tag noindex. Después del deploy se verifican con `curl -I <url>`.
- **Dependencias**: versiones exactas y lockfile versionado.
- **Datos**: todo ficticio. Los DNI, emails y celulares de ejemplo no pertenecen a nadie (dominio example.com).

Sin autenticación: es una demo pública con `noindex`, sin datos reales ni acciones con efecto. Si pasa a MVP con datos reales, hay que activar la extensión de seguridad y agregar backend, autenticación y control de acceso.
