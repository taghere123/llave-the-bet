# 025. Estructura de Cobro Garantizado: préstamo a tasa cero o garantía con comisión

**Estado:** ABIERTA. Propuesta del 29 sept 2026 (`context/06-recomendaciones-final.md`). Responsable: por asignar; requiere Legal y Riesgos. Revisa las decisiones 016 y 018.

## Contexto
Según la 016 y la 018, Cobro Garantizado es un préstamo de consumo a tasa cero al inquilino, y la comisión que absorbe el propietario es el interés implícito. Si el inquilino repone cada renta en menos de ~24 días después de que Interbank paga, la comisión de 5% equivale a una TEA mayor al tope del BCRP (114.13% en soles, mayo-octubre 2026). Si paga antes del día 5, no hay préstamo.

## Opciones
1. Mantener el préstamo a tasa cero de la 016 y la 018.
2. Garantía con comisión: Interbank asegura el pago y el inquilino solo es deudor si Interbank paga por él.
3. Seguro de impago emitido por Interseguro, con Interbank como canal y cuenta de abono. Implica revisar la 003, que hoy excluye el impago del seguro.

## Criterio
Transparencia (TCEA), topes de tasa, tratamiento de capital y provisiones, y qué beneficio real recibe el inquilino.

## Propuesta (no vigente hasta cerrarse)
Que Legal y Riesgos evalúen la opción 2 antes del día 0 del MVP. Es el patrón regional: en QuintoAndar y Houm la garantía la respalda una aseguradora.

## Consecuencias si se aprueba
- La 018 debe revisarse: el inquilino deja de ser deudor cada mes.
- El beneficio «el alquiler construye historial» necesita otro mecanismo, porque ya no hay un préstamo mensual que reportar.
- Cambia el aviso de deudor del flujo del inquilino (`prototype/app/src/screens/tenant/Deudor.tsx`).
