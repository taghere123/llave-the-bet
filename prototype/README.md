# Prototipo (taller AI-DLC, 29-30 sept 2026)

Objetivo: un prototipo navegable del journey del propietario que sirva para la demo. No es un producto. **Todos los datos son ficticios y no hay ninguna conexión a sistemas de Interbank o Interseguro.**

## Journey a cubrir

1. El propietario publica su inmueble (o entra vía portal existente, simulado).
2. Recibe un postulante.
3. Solicita el RentScore. El postulante autoriza el uso de sus datos (pantalla de consentimiento).
4. Ve el score (0-100), la cuota segura recomendada y la comparativa con el mercado.
5. Acepta al candidato y ve la póliza de RentScore Seguro.
6. Explora Cobro Garantizado y deja su interés. Renta Adelantada solo como pantalla informativa, nunca activable.

## Alcance técnico propuesto

- Front navegable (Vite o Next.js) con datos en JSON local.
- RentScore como función pura de reglas sobre datos inventados. Sin ML.
- Sin backend, sin base de datos, sin APIs. Si algo necesita persistir, `localStorage` o un archivo JSON.
- Pantallas mobile-first: el propietario limeño usa el celular.

## Fuera del prototipo

Integración bancaria real, emisión real de pólizas, marketplace propio, Renta Adelantada funcional, Housing Graph.

## Antes de escribir código (decidir el primer día del taller)

- Usuario principal y su escena.
- Qué versión de precio del seguro mostramos (decisión 010). En el prototipo debe ser un solo modelo, marcado como supuesto.
- Si Cobro Garantizado muestra comisión (decisión 012).
- Qué queremos que el jurado crea después de 3 minutos de demo.

## Estructura sugerida

```
prototype/
  README.md
  src/
  data/        JSON ficticio: inmuebles, postulantes, scores
  docs/        capturas y guion de la demo
```
