# U2 · Business Logic Model

- Las pantallas leen el estado con `useStore()` y los providers con `useProviders()`. No importan el motor ni los fixtures.
- La bandeja sale de `selectors.bandeja(state, data)` y devuelve `Aplicante[]`, que unifica a los postulantes base y a los del marketplace.
- El score de cada aplicante sale de `score.evaluar(aplicante.financiero, state.inmueble.renta)`. La prima y las modalidades salen de `payment.*`.
- Acciones: `publicar`, `aceptar`, `elegirModalidad` y `cambiarEstado(vista)` al abrir el detalle.
- `App.tsx` resuelve la pantalla con la tabla `screens/registry.tsx` (título, paso, rol de cabecera, validación del id y ruta de fallback).
