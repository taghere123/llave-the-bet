# 019 - Alcance de deuda técnica y módulos simulados en el ciclo AI-DLC

- **Estado**: Tomada
- **Fecha**: 2026-09-29
- **Responsable**: Diego Moscoso (con el equipo)
- **Contexto**: Ciclo AI-DLC sobre el prototipo LLAVE (brownfield).

## Decisión

En este ciclo AI-DLC **sí se desarrolla la deuda técnica** documentada en el Reverse Engineering
(`aidlc-docs/inception/reverse-engineering/code-quality-assessment.md`): pruebas, saneamiento de
build/estructura y calidad de código.

**Excepciones que se simulan (mock/stub), no se desarrollan de verdad:**

1. **Motor RentScore**: se mantiene como está (reglas ficticias, sin ML, sin sustento actuarial). No
   se rehace ni se conecta a fuentes reales. Puede envolverse tras una interfaz simulada, pero su
   lógica interna queda tal cual.
2. **Todo lo que dependa de otras áreas**: Legal (textos legales de consentimiento y préstamo),
   Riesgos (validación actuarial de primas/comisiones), e integraciones técnicas reales
   (Interbank, Interseguro, centrales de riesgo, SBS, emisión de pólizas, desembolsos). Se
   representan como **módulos simulados** con datos ficticios y etiqueta SUPUESTO.

## Convención operativa

- Cualquier módulo que caiga en las excepciones se implementa detrás de una **frontera clara**
  (interfaz/función simulada) para que a futuro pueda reemplazarse por la integración real sin
  reescribir el resto.
- Los valores simulados siguen etiquetados como SUPUESTO en pantalla y listados en
  `prototype/docs/supuestos.md`.
- La deuda técnica que sí se desarrolla se prioriza por valor y por lo que sobrevive a la evolución
  del producto (p. ej., cobertura de pruebas de reglas de negocio).

## Consecuencias

- El ciclo tocará código (ya no es "solo documentar"): esto actualiza la intención inicial (Q1) del
  arranque del flujo.
- Se activará la extensión de Testing cuando corresponda, para exigir pruebas del código que sí se
  desarrolla.
- Referencias: decisiones 010, 012, 015, 016, 018 (áreas que quedan simuladas).
