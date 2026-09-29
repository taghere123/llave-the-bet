# U1 · Business Logic Model

## Módulos
- `domain/rentscore.ts`: port literal del motor legado. Funciones puras: `calcular`, `prima`, `cobroGarantizado`, `rentaAdelantada`.
- `providers/`: interfaces (`types.ts`) e implementaciones simuladas que delegan en el motor y en `data/fixtures.ts`.
  - `scoreProvider.evaluar(financiero, renta)` → `ScoreResult`
  - `paymentProvider.prima / rangoSeguro / cobroGarantizado / rentaAdelantada`
  - `legalTextProvider.consentimientoScore / compartirConPropietario / avisoDeudor / politicaDatos`
  - `dataProvider.propietaria / inmuebleInicial / listarPropiedades / postulantesBase / referenciaMercado / consultarFinanciero / esClienteInterbank`
- `store/`: `state.ts` (tipos y estado inicial), `reducer.ts` (acciones puras), `persistence.ts` (carga validada y guardado), `StoreContext.tsx` (hook `useStore`).

## Flujo
1. Al arrancar, `persistence.cargar()` lee `llave-demo-v2` y valida la forma; si falla, usa `estadoInicial()`.
2. La UI despacha acciones; el reducer calcula el nuevo estado; un efecto lo guarda.
3. Toda lógica sensible (score, precios, textos legales, datos) pasa por un provider.

## Corrección de diseño
`prima` pasa de `scoreProvider` a `paymentProvider` (Question 2 del plan). Actualizado en `inception/application-design/component-methods.md`.
