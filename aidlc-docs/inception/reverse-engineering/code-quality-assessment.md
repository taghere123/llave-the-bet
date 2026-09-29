# Code Quality Assessment — LLAVE Prototipo

## Test Coverage
- **Overall**: None (0 pruebas).
- **Unit Tests**: Ninguna. `rentscore.js` está preparado para pruebas en Node (`module.exports`), pero no existen.
- **Integration Tests**: Ninguna.

## Code Quality Indicators
- **Linting**: No configurado (sin ESLint/Prettier).
- **Code Style**: Consistente dentro de cada archivo (IIFE, comentarios en español que explican decisiones y supuestos con referencia a `decisions/`). Buen nivel de comentarios de intención.
- **Documentation**: Buena a nivel de negocio (`prototype/README.md`, `docs/supuestos.md`, `docs/historias-inquilino.md`) y de código (comentarios que citan decisiones y marcan supuestos).

## Fortalezas (Good Patterns)
- **Separación de responsabilidades limpia**: datos (`datos.js`), reglas (`rentscore.js`) y vista/estado (`app.js`) están bien separados. `rentscore.js` es una función pura sin efectos secundarios ni acoplamiento al DOM.
- **Escape de HTML consistente** (`esc`) al construir markup por concatenación — mitiga XSS en el prototipo.
- **Degradación elegante de `localStorage`**: si falla, la demo sigue funcionando.
- **Trazabilidad de negocio**: cada supuesto en pantalla lleva etiqueta y está listado en `docs/supuestos.md`, cada regla cita su decisión.
- **Accesibilidad básica cuidada**: `aria-hidden` en decorativos, `aria-live` en la barra de progreso, foco al H1 tras navegar, contraste documentado en los tokens.

## Deuda Técnica / Riesgos
- **Sin pruebas**: el motor de reglas (lo más crítico y con más supuestos) no tiene cobertura. Cualquier cambio en cortes o pesos no está protegido.
- **Sin build ni gestión de dependencias**: adecuado para un prototipo, pero la preferencia registrada (intent Q3=B) es migrar a Vite/Next.js; esa migración es trabajo pendiente.
- **Render por `innerHTML` con strings**: funcional para el prototipo pero frágil de mantener a escala; depende del disciplinado uso de `esc`.
- **Journey del inquilino ausente**: `historias-inquilino.md` (HU-01 a HU-12) describe marketplace, lead form, consentimiento en dos capas, ver el propio RentScore, postulaciones y aviso de deudor. **Nada de eso está en el código**; hoy solo existe el journey del propietario y una pantalla de consentimiento de solo lectura.
- **Datos y reglas 100% supuestos**: sin sustento actuarial ni validación de Riesgos/Legal/SBS (decisiones 010, 012, 016, 018). Es intencional en el prototipo, pero es un riesgo si se confunde con producto.

## Anti-patterns
- Lógica de presentación y de estado mezcladas en `app.js` (aceptable para el tamaño actual, ~555 líneas).
- Strings HTML largos embebidos en JS (mantenibilidad limitada).

## Conclusión
Prototipo bien estructurado y honesto con sus supuestos, apto para demo y alineación de equipo. Para evolucionar hacia MVP haría falta: pruebas del motor de reglas, definición real de datos/reglas con Riesgos, e implementación del journey del inquilino (y probablemente la migración de stack ya anticipada).
