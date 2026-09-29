# U3 · Resumen de código

## Creado
- `src/components/ConsentBlock.tsx`: casilla controlada, sin marcar por defecto, con el texto del `legalTextProvider`.
- `src/screens/tenant/`: `Marketplace.tsx` (marketplace con filtros y ficha), `Registro.tsx` (lead form y código), `Autorizar.tsx` (capa 1), `MiScore.tsx`, `consejos.ts`, `Postular.tsx` (capa 2), `MisPostulaciones.tsx` (estados, retiro, revocación y controles de demo), `Deudor.tsx`.
- `tests/tenant.test.tsx`.

## Modificado
- `src/screens/registry.tsx`: 8 rutas del inquilino con sus guardias (registro, autorizar, existencia de la propiedad, postulación aceptada).

## Cobertura de historias
US-I01..US-I10 implementadas según BR-TN-01..17. Las 4 preguntas abiertas del borrador se resolvieron en `plans/u3-inquilino-functional-design-plan.md`.

## Verificación al cierre de U3
- `tsc --noEmit` y `eslint .` sin errores.
- 59 pruebas en verde. Cubren el flujo completo de Lucía: filtros, rango del seguro S/36-90, validación con foco en el primer error, código, capa 1 con texto de centrales de riesgo, score 87, consejos y capa 2 con Carmen. También cubren la reutilización de datos (HU-04), el aviso de renta mayor a la cuota sin bloqueo, la revocación (la propietaria es redirigida) y el retiro (sale de la bandeja), el aviso de deudor con S/1,746 y las guardias.
