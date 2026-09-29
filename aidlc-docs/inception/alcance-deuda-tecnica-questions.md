# Decisión de alcance — ¿Qué hacemos con la deuda técnica en este ciclo?

Contexto: el Reverse Engineering documentó la deuda técnica del prototipo (sin pruebas, sin build, render por strings, journey del inquilino ausente, datos/reglas 100% supuestos). La deuda técnica NO es una etapa del flujo AI-DLC; entra a un ciclo solo si tú la incluyes en el alcance. Responde para fijar el alcance de ESTE ciclo.

## Question 1
¿Qué quieres que sea este ciclo AI-DLC, respecto a la deuda técnica?

A) Solo documentar. No tocamos código en este ciclo. La deuda queda registrada como backlog y se decide en un ciclo futuro (coherente con tu intención inicial Q1=A).

B) Documentar + un ciclo dedicado a pagar deuda técnica del prototipo actual (por ejemplo, agregar pruebas al motor RentScore) manteniendo el stack vanilla.

C) Saltar directo a la migración de stack (Vite/Next.js, tu preferencia Q3=B) y tratar la deuda técnica dentro de esa migración, ya que buena parte desaparece al migrar.

D) Documentar + empezar a construir el journey del inquilino (HU-01..HU-12), y decidir la deuda técnica dentro de ese trabajo.

X) Otro (describe después de [Answer]:)

[Answer]: X — Desarrollar la deuda técnica en este ciclo, EXCEPTO el motor RentScore y todo lo que dependa de Legal/Riesgos/integraciones técnicas, que quedan como módulos simulados. Ver decisión 019.

## Question 2
Independientemente de lo anterior: ¿quieres que en el próximo ciclo que toque código se active la extensión de Testing (para exigir pruebas del motor de reglas RentScore, que es la deuda técnica de mayor valor)?

A) Sí, activar Testing cuando toquemos código.

B) No por ahora.

C) Lo decido más adelante, en Requirements Analysis.

X) Otro (describe después de [Answer]:)

[Answer]: A — Sí, activar Testing (implícito en la convención: la deuda técnica de pruebas sí se desarrolla).
```
