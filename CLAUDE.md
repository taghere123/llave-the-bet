# LLAVE - contexto para asistentes de IA

Proyecto de The Bet (Interbank / Interseguro). Repo privado del Equipo 22. Idioma de trabajo: español (Perú). Moneda: soles (S/) salvo que se indique lo contrario.

## Qué es

Plataforma para propietarios de 1-2 inmuebles en Lima Metropolitana. Niveles: 0 RentScore (score del inquilino con datos bancarios), 1 RentScore Seguro (seguro de hogar de Interseguro pagado por el inquilino, protege el inmueble de daños; no reemplaza el depósito ni cubre impago), 2 Cobro Garantizado (Interbank paga la renta cada mes y asume el impago), 3 Renta Adelantada (la renta de un contrato de 1 año en un solo desembolso). Niveles 2 y 3: solo con inquilinos de score medio o alto; son un préstamo de consumo de Interbank a tasa cero donde la comisión es el interés implícito. Los cuatro niveles entran al MVP.

## Estado real

No hay producto, ni código, ni validación con usuarios. No describir nada como implementado o probado. Toda cifra de negocio es proyección preliminar.

## Decisiones vigentes (no revertir sin abrir una decisión en `decisions/`)

1. No construir marketplace propio. Se apalanca el portal de Interbank o una alianza.
2. RentScore y Seguro van juntos, por selección adversa.
3. El inquilino contrata y paga el seguro de hogar (2-5% de la renta, decisión 010). El propietario es el beneficiario. No reemplaza el depósito ni cubre impago.
4. El MVP cabe en 90 días y prueba una sola hipótesis: el propietario paga por la garantía de cobro (Cobro Garantizado o Renta Adelantada) más de lo que paga hoy por publicar.
5. Box 3 es el lente de evaluación del programa.
6. Cobro Garantizado se prueba con comisión real en el MVP (decisión 012): 3% de cada renta con score alto, 5% con score medio, no disponible con score bajo. Interbank asume el impago.
7. El inquilino autoriza que el propietario vea su RentScore al postular (decisión 015). El propietario no lo solicita.
8. Renta Adelantada entra al MVP (decisión 016): solo contratos de 1 año; comisión de 15% de la renta del año con score alto, 25% con medio, no disponible con score bajo. Cifras de 012 y 016 del equipo, sin sustento actuarial.

## Decisiones abiertas (no resolver por tu cuenta, señalarlas)

- 011: moneda y cifras de ingresos.
- 013: portal propio de Interbank o alianza.
- 014: número de equipo y composición del jurado.

Pendientes de las decisiones tomadas: tarificar el seguro con Interseguro (010), aprobación de Riesgos y revisión de Legal y SBS de los niveles 2 y 3 como crédito de consumo, incluida la transparencia de la tasa implícita (012 y 016), texto legal de la autorización (015).

## Reglas para trabajar aquí

- Verificar cualquier dato de mercado contra `context/03-mercado-y-fuentes.md` antes de usarlo. No inventar competidores, cifras ni citas.
- Distinguir siempre hecho observado, estimación y proyección.
- El prototipo usa solo datos ficticios y ninguna API real. RentScore en el prototipo es una función de reglas sobre datos inventados.
- No incluir datos personales reales, correos, credenciales ni información interna confidencial en ningún archivo.
- Ante una contradicción entre documentos, señalarla y proponer opciones; no elegir en silencio.

## Hito inmediato

Taller AI-DLC, 29-30 sept 2026. Entregable: prototipo navegable del journey del propietario: publica inmueble, recibe postulante, ve el score (el inquilino ya autorizó al postular), explora solución financiera o deja interés.

## Dónde mirar

`context/` para el contexto, `decisions/` para lo decidido, `prototype/README.md` y `mvp/README.md` para el alcance.
