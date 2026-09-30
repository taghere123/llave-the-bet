# 021. Elegibilidad de Cobro Garantizado y Renta Adelantada también por capacidad de pago

**Estado:** ABIERTA. Propuesta del 29 sept 2026 (`context/06-recomendaciones-final.md`). Responsable: por asignar; requiere Riesgos. Toca las decisiones 012 y 016.

## Contexto
Las decisiones 012 y 016 hacen elegibles a los inquilinos de score medio o alto. En el prototipo, Jorge (56, medio) recibe ambas ofertas aunque la renta, S/1,800, supera su capacidad de pago, S/1,600. Un jurado bancario lo leerá como política de riesgo laxa.

## Opciones
1. Mantener: solo banda media o alta.
2. Banda media o alta, y renta menor o igual a la capacidad de pago.
3. La opción 2, más contrato listo para desalojo notarial (Ley 30933) y garantía en custodia como primera pérdida.

## Criterio
Pérdida esperada por contrato, coherencia ante el jurado y que la regla se pueda explicar en una pantalla.

## Propuesta (no vigente hasta cerrarse)
Opción 3. En el prototipo, Jorge pasa a «No garantizable: la renta supera su capacidad en S/200».

## Consecuencias si se aprueba
- Cambia la regla de elegibilidad del prototipo, no el cálculo del RentScore (`src/domain/rentscore.ts` no se toca sin Riesgos).
- La capacidad de pago (30% del ingreso) sigue siendo un supuesto sin validar (`prototype/docs/supuestos.md`).
- La garantía en custodia es un elemento nuevo: hay que definir quién la custodia y cómo se devuelve.
- Reduce los contratos elegibles; el caso base de la 011 debe reflejarlo.
