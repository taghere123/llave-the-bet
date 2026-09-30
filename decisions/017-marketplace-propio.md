# 017. Marketplace propio de LLAVE, con flujo de inquilino

**Estado:** Tomada el 29 sept 2026. Responsable: equipo. Reemplaza a la decisión 001.

## Contexto
La decisión 001 (no construir marketplace propio) nació del feedback externo: "morir por querer hacer demasiado desde el inicio", con el marketplace como ejemplo del mayor riesgo de ejecución. La 013 quedó abierta para elegir entre portal de Interbank o alianza.

Al desarrollar el flujo del inquilino aparece un problema: sin una superficie propia donde el inquilino busque, se registre, autorice su RentScore y postule, LLAVE depende por completo del roadmap y de las prioridades de un portal que no controla. El diferenciador de LLAVE (evaluar al inquilino, garantizar el pago y asegurar el inmueble) necesita capturar al inquilino en el momento de la postulación, que es cuando se da la autorización de la decisión 015 y cuando el inquilino se vuelve un lead de bancarización.

## Opciones
1. Mantener 001: sin marketplace propio, integración liviana con un portal externo o de Interbank.
2. Construir marketplace propio de LLAVE. El inquilino busca y postula dentro de LLAVE; el diferenciador (RentScore, pago garantizado, seguro) es nativo.
3. Híbrido: mock del portal aliado con LLAVE como capa "Postula con RentScore".

## Criterio
Control del momento de adquisición del inquilino y del dato, frente al riesgo de ejecución en el piloto que motivó la 001.

## Decisión
Opción 2. LLAVE tiene marketplace propio con flujo de inquilino completo: buscar, ver ficha, registrarse (lead form), autorizar el RentScore y postular. **Entra al piloto de 30 días (decisión 026), no solo al prototipo.**

## Consecuencias
- La decisión 001 queda **reemplazada por esta**. No se revierte en silencio: se documenta aquí.
- Cambia el alcance del MVP (004). El marketplace propio entra a la tabla "Entra" de `mvp/README.md`. Se asume el riesgo de ejecución que la 001 quería evitar; el equipo lo acepta a cambio de controlar la adquisición del inquilino y el dato.
- Se pierde el argumento de "no construir marketplace" frente al jurado. A cambio, la demo muestra el círculo completo: el inquilino postula y aparece en la bandeja del propietario.
- La 013 (portal propio o alianza) deja de ser bloqueante para el flujo del inquilino, pero sigue abierta como canal adicional de inventario y tráfico.
- Riesgo de factibilidad en el piloto de 30 días a vigilar: construir y operar un marketplace es mucho más que el mock de la 013. El equipo debe dimensionar inventario inicial, carga de avisos y tráfico en `mvp/README.md`.
- El prototipo del taller ya incluye el flujo del inquilino sobre este supuesto.
