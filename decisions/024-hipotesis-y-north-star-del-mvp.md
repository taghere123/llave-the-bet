# 024. Hipótesis del MVP en dos partes y North Star

**Estado:** ABIERTA. Propuesta del 29 sept 2026 (`context/06-recomendaciones-final.md`). Responsable: por asignar. Revisa la decisión 004; se relaciona con la 011.

## Contexto
La 004 fija la hipótesis «el propietario paga por la garantía de cobro más de lo que paga hoy por publicar». La referencia es el corretaje de 1 mes de renta, una práctica de mercado y no una tarifa (`context/03-mercado-y-fuentes.md`). Cobro Garantizado al 3% ya no la supera (012).

## Opciones
1. Mantener la 004.
2. Hipótesis en dos partes medibles. Demanda: qué % de propietarios con inquilino elegible activa Cobro Garantizado a precio real. Riesgo: la pérdida observada cabe en el tope aprobado. North Star: renta garantizada activa, en S/ al mes.

## Criterio
Que la hipótesis se pueda medir en 90 días y que el jurado la entienda sin compararla con un dato de práctica.

## Propuesta (no vigente hasta cerrarse)
Opción 2, con umbrales iniciales para discutir con Growth y Riesgos: 10% o más de los propietarios contactados deja sus datos ante el precio real (3% y 5% al azar), 20 contratos al día 45 y take rate de 20% o más al día 90.

## Consecuencias si se aprueba
- `mvp/README.md` debe reflejar la nueva hipótesis.
- El caso base de la 011 se arma desde contratos garantizados.
- El riesgo no se valida en 90 días: con contratos tan jóvenes, incluso 10% de impago anual daría 1 o 2 casos. Se estima con un backtest del RentScore y se confirma con 12 meses de seguimiento.
