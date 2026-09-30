# U2 · NFR Requirements

Hereda NFR-U1-01..11 y el stack de `u1-base-tooling/nfr-requirements/tech-stack-decisions.md`. No agrega tecnología.

- **NFR-U1-11 aplicado a U2**: todo cambio visual o de navegación del journey de la propietaria actualiza las partes 1, 3 y 5 del walkthrough (pasos 1-3 y 12-18, variantes 22-24).

Requisito propio de U2:
- **NFR-U2-01 (paridad, RNF-11)**: mismos textos, rutas, pasos y clases CSS que el legado, salvo los cambios BR-OW-07..10. Se verifica con pruebas de pantalla (`tests/owner.test.tsx`) y con una revisión manual lado a lado (`prototype/src/index.html` frente a `prototype/app`).
