# 002. RentScore y Seguro se ofrecen juntos

**Estado:** Tomada

## Contexto
Definir si evaluación y protección se sostienen por separado.

## Opciones
1. Solo RentScore.
2. Solo seguro.
3. Ambos juntos.

## Criterio
Sostenibilidad del pricing del seguro (selección adversa) y si el producto cambia el comportamiento real del propietario.

## Decisión
Ambos. Un seguro sin score sufre selección adversa: solo se inscriben los propietarios con inquilinos más riesgosos y la prima sube para todos. Un score sin seguro deja al propietario sin protección ante daños: un score alto reduce el riesgo pero no lo elimina.

## Consecuencias
Ninguno de los dos es vendible por separado. Hay que construir scoring bancario y suscripción de seguros a la vez. Define los niveles 0 y 1. El seguro es de hogar (daños al inmueble), no de impago; ver 003.
