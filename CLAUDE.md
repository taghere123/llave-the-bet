# LLAVE - contexto para asistentes de IA

Proyecto de The Bet (Interbank / Interseguro). Repo privado del Equipo 22. Idioma de trabajo: español (Perú). Moneda: soles (S/) salvo que se indique lo contrario.

## Qué es

Plataforma para propietarios de 1-2 inmuebles en Lima Metropolitana. Niveles: 0 RentScore (score del inquilino con datos bancarios), 1 RentScore Seguro (póliza de Interseguro pagada por el inquilino, reemplaza el depósito), 2 Cobro Garantizado (Interbank paga la renta cada mes), 3 Renta Adelantada (desembolso anticipado, factoring). El nivel 3 no entra al MVP.

## Estado real

No hay producto, ni código, ni validación con usuarios. No describir nada como implementado o probado. Toda cifra de negocio es proyección preliminar.

## Decisiones vigentes (no revertir sin abrir una decisión en `decisions/`)

1. No construir marketplace propio. Se apalanca el portal de Interbank o una alianza.
2. RentScore y Seguro van juntos, por selección adversa.
3. El inquilino contrata y paga el seguro. El propietario es el beneficiario.
4. El MVP cabe en 90 días y prueba una sola hipótesis: el propietario paga por la garantía de cobro más de lo que paga hoy por publicar.
5. Box 3 es el lente de evaluación del programa.

## Decisiones abiertas (no resolver por tu cuenta, señalarlas)

- 010: precio del seguro, monto fijo S/15-100 con ahorro devuelto o % de la renta.
- 011: moneda y cifras de ingresos.
- 012: si Cobro Garantizado se prueba con comisión real dentro del MVP.

## Reglas para trabajar aquí

- Verificar cualquier dato de mercado contra `context/03-mercado-y-fuentes.md` antes de usarlo. No inventar competidores, cifras ni citas.
- Distinguir siempre hecho observado, estimación y proyección.
- El prototipo usa solo datos ficticios y ninguna API real. RentScore en el prototipo es una función de reglas sobre datos inventados.
- No incluir datos personales reales, correos, credenciales ni información interna confidencial en ningún archivo.
- Ante una contradicción entre documentos, señalarla y proponer opciones; no elegir en silencio.

## Hito inmediato

Taller AI-DLC, 29-30 sept 2026. Entregable: prototipo navegable del journey del propietario: publica inmueble, recibe postulante, solicita RentScore, ve el score, explora solución financiera o deja interés.

## Dónde mirar

`context/` para el contexto, `decisions/` para lo decidido, `prototype/README.md` y `mvp/README.md` para el alcance.
