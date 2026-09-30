# 011. Moneda y cifras de ingresos

**Estado:** Tomada el 30 sept 2026 (la registra Diego Moscoso). Antes: ABIERTA. Responsable: William Salinas. Pendiente: los cuatro ajustes del modelo listados al final.

## Problema
- El texto generado por la herramienta de IA usa dólares (US$18M de ingresos año 1) y el resto del proyecto opera en soles.
- La corrección posterior (S/1.5-3M año 1, S/15-25M año 3) no se propagó a todos los documentos.
- El Big Idea dice S/8-12 millones anuales con 15,000 pólizas; el handoff proyecta S/1.5-3M en año 1. Son horizontes distintos pero no está explicado.

## Decisión (30 sept 2026)
1. Todo en soles.
2. El caso base es el modelo financiero a 5 años del equipo: «La Llave: Modelo Financiero.xlsx» y la lámina «La Llave: Escenarios Financieros.pptx», en la carpeta de Drive «CARPETA - DECK FINAL». Reemplaza las cifras de la herramienta de IA (US$18M; S/8-12M con 15,000 pólizas) y la proyección del handoff (S/1.5-3M el año 1).
3. Mercado: 700 mil hogares arrendatarios en Lima Metropolitana hoy, +3.5% anual (`context/03-mercado-y-fuentes.md`).
4. Alcance: el modelo cuenta solo los contratos con Cobro Garantizado o Renta Adelantada, también para las primas del seguro de hogar. Es intencional.
5. El Big Idea (Google Doc y `context/01`) y la lámina usan estas cifras.

La nota anterior de esta decisión («no añadir cifras de ingresos de Cobro Garantizado o Renta Adelantada sin sustento actuarial») queda reemplazada: el equipo presenta la proyección, marcada como proyección con supuestos propios, sin validación actuarial ni de Riesgos.

## Resultado del modelo (proyección, año 5)

Los dos escenarios comparten precio, riesgo y costos; solo cambia la penetración de hogares al año 5.

| Concepto | Conservador | Base |
| --- | --- | --- |
| Penetración de hogares, año 5 | 5% | 10% |
| Contratos con Cobro Garantizado o Renta Adelantada (promedio del año) | 5.9 mil | 13.3 mil |
| Saldo medio colocado | S/33.4M | S/75.0M |
| Ingresos brutos (financieros + primas) | S/13.1M | S/29.4M |
| Margen bruto | S/7.3M | S/16.4M |
| BAI | S/3.4M | S/8.9M |
| BDI | S/2.4M | S/6.3M |
| ROA total / solo crédito | 10.2% / 5.3% | 11.9% / 6.2% |
| BAI acumulado en 5 años | S/4.3M | S/19.1M |
| Primer año con BAI positivo | Año 3 | Año 2 |

Supuestos comunes: renta promedio S/2,310 (+3.5% anual), 60% elegible, 20% toma Cobro Garantizado y 10% Renta Adelantada, tasas de 48% (Cobro Garantizado) y 17.5% (Renta Adelantada) sobre el saldo, costo de fondos 4%, prima de 3% de la renta con siniestralidad de 40%, gasto de riesgo de 6.5% del saldo, ventas 8% de los ingresos, generales 15% de la prima y 3% del saldo, y costo fijo de S/1M al año.

## Pendientes conocidos del modelo
Detectados en la revisión de coherencia del 30 sept 2026. El equipo decidió dejarlos pendientes; al corregirlos cambian las cifras de arriba.

1. **Gasto de riesgo.** Es 6.5% del saldo medio (promedio simple de 5% y 8%). La nota del propio modelo lo describe como contratos × probabilidad de impago × (meses sin pago − meses de garantía) × renta. En Cobro Garantizado el saldo es de 15 días de renta, pero ante un impago Interbank sigue pagando varios meses.
2. **Tasas.** El modelo usa 48% y 17.5%; las tasas implícitas del pricing de las decisiones 012 y 016 son 91.2% y 37.8%.
3. **Renta Adelantada con score medio.** El modelo usa 20%; la decisión 016 y el prototipo, 25%.
4. **Chequeo contra el tope del BCRP.** Compara tasas simples con una TEA. Con el pricing de la 012 y 15 días financiados, Cobro Garantizado al 5% equivale a una TEA de ~248% (al 3%, ~110%), frente al tope de 114.13%. Ver la decisión 025.
