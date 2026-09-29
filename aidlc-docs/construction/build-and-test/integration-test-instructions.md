# Integration Test Instructions

Las pruebas de integración montan la app completa (providers + store + router + pantallas) en jsdom con Testing Library. No hay servicios que levantar.

```bash
cd prototype/app
npx vitest run tests/owner.test.tsx tests/tenant.test.tsx tests/connection.test.tsx
```

## Escenarios

| # | Unidades | Escenario | Resultado esperado |
| --- | --- | --- | --- |
| 1 | U1 → U2 | Journey de Carmen con Jorge | Score 56 medio, aviso de S/200, prima S/63, Cobro Garantizado S/1,710 |
| 2 | U1 → U2 | Kevin con banda baja | Aviso de riesgo, prima S/90, 2 modalidades "No disponible" |
| 3 | U1 → U3 | Lucía de visitante a postulante | 9 propiedades, filtros, rango S/36-90, validación, código, capa 1 con centrales, score 87, capa 2 con Carmen |
| 4 | U3 | Reutilización (HU-04) | Postular a otra propiedad sin repetir datos ni consentimiento |
| 5 | U3 → U2 | Revocar y retirar | Carmen deja de ver el score (redirección) y Lucía sale de la bandeja |
| 6 | U3 → U2 → U3 | Conexión completa | "Nuevo" → "Vista por el propietario" → aceptada con Cobro Garantizado S/1,746 → aviso de deudor |
| 7 | U2 → U3 | Carmen acepta a Jorge | Lucía ve "No seleccionada" |
| 8 | U4 | Panel de demo | Bancarización de 0% a 33%; precarga idempotente; reinicio |

## Revisión manual pendiente (Q3=A de Units Generation)
Abrir lado a lado `prototype/src/index.html` (legado) y `npm run preview` (app), en móvil (375 px) y en escritorio (≥720 px), y comparar las 10 pantallas de la propietaria. Diferencias esperadas: BR-OW-07..10 en `u2-propietario/functional-design/business-rules.md`.
