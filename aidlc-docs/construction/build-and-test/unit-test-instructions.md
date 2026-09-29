# Unit Test Execution

```bash
cd prototype/app
npm test          # vitest run
npm run check     # typecheck + lint + formato + pruebas (lo mismo que debe pasar antes de un PR)
```

## Resultado esperado
64 pruebas en 8 archivos, 0 fallas, ~1.5 s.

| Archivo | Pruebas | Qué cubre |
| --- | --- | --- |
| `rentscore.characterization.test.ts` | 6 | Diferencial port vs. `prototype/src/rentscore.js` (609,840 combinaciones alrededor de cada corte) y valores fijos de Lucía (87), Jorge (56), Kevin (26), primas y comisiones |
| `reducer.test.ts` | 13 | Publicar, aceptar, modalidad, transiciones de estado, retiro, revocación, simulación, precarga idempotente, reinicio |
| `persistence.test.ts` | 5 | Round-trip, JSON corrupto, estado legado v1 o manipulado, storage no disponible |
| `providers.test.ts` | 11 | Inventario, regla cliente/no cliente, fuente de la evaluación, perfil derivado, rango del seguro, textos legales SUPUESTO, bandeja, bancarización |
| `leadForm.test.ts` | 13 | Validación y normalización del lead form, código de 6 dígitos |

## Si una prueba del RentScore falla
Alguien cambió una regla del motor. Por la decisión 019, las reglas no se modifican en este ciclo. Hay que revertir el cambio o abrir una decisión con Riesgos antes de actualizar los valores de referencia.

## Cobertura
No se configuró un reporte de cobertura (evita una dependencia extra). La lógica de dominio, estado y validación tiene pruebas directas; las pantallas se cubren con las pruebas de integración.
