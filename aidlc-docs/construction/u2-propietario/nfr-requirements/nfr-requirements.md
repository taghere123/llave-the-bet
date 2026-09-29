# U2 · NFR Requirements

Hereda NFR-U1-01..10 y el stack de `u1-base-tooling/nfr-requirements/tech-stack-decisions.md`. No agrega tecnología.

Requisito propio de U2:
- **NFR-U2-01 (paridad, RNF-11)**: mismos textos, rutas, pasos y clases CSS que el legado, salvo los cambios BR-OW-07..10. Se verifica con pruebas de pantalla (`tests/owner.test.tsx`) y con una revisión manual lado a lado (`prototype/src/index.html` frente a `prototype/app`).
