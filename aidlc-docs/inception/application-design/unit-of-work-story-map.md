# Units of Work — Mapa de historias

Todas las historias quedan asignadas a una unidad. U1 es habilitadora (sin historias de negocio, pero soporta a todas).

| Unidad | Historias | Requisitos | Notas |
| --- | --- | --- | --- |
| U1 — Base y tooling | (habilitadora) | RNF-01, RNF-03, RNF-04, RNF-05, RNF-06, RF-16, RF-18 (frontera) | Providers, store, persistence, tokens, caracterización RentScore |
| U2 — Propietario migrado | US-P01, US-P02, US-P03 | RF-01, RF-02, RF-16, RF-17, RF-18, RNF-11 | Paridad funcional |
| U3 — Journey del inquilino | US-I01, US-I02, US-I03, US-I04, US-I05, US-I06, US-I07, US-I08, US-I09, US-I10 | RF-04..RF-13, RF-16, RF-17 | Flujo nuevo completo |
| U4 — Conexión + bancarización | US-C01, US-C02 | RF-14, RF-15, RF-19 | Demo punta a punta |

## Cobertura
- **Historias de negocio**: 15 (US-P01..P03, US-I01..I10, US-C01..C02) → todas asignadas.
- **Requisitos funcionales**: RF-01..RF-19 cubiertos entre U1..U4.
- **Requisitos no funcionales**: RNF-01..RNF-11 principalmente en U1 (tooling/pruebas/tipado) y U2 (paridad), aplicables transversalmente a U3/U4.

## Validación de límites
- Cada historia pertenece a una sola unidad.
- U1 no contiene lógica de negocio de pantallas; solo fundación reutilizable.
- U4 no reimplementa journeys; solo los conecta y añade métrica/controles de demo.
