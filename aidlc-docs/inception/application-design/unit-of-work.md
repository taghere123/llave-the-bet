# Units of Work — Definiciones

Monolito de front (una app Vite + React + TypeScript). Las unidades son **módulos lógicos** que se desarrollan y aprueban en secuencia (checkpoint por unidad, Q4=A). Orden: U1 → U2 → U3 → U4 (Q2=A). Paridad del propietario por revisión manual pantalla a pantalla (Q3=A).

## Estrategia de organización de código (greenfield del nuevo proyecto)
El nuevo proyecto vive en una carpeta con build (p. ej. `prototype/app/` o reemplazando `prototype/src`; se decide en Code Generation). Estructura sugerida:

```
<app>/
  src/
    components/      # design system portado (Button, PropertyCard, ...)
    screens/
      owner/         # pantallas del propietario
      tenant/        # pantallas del inquilino
    providers/       # scoreProvider, paymentProvider, legalTextProvider, dataProvider
    store/           # demoStore, persistence
    domain/          # score (RentScore actual, envuelto), tipos
    styles/          # tokens + CSS Modules
    router.tsx
    main.tsx
  tests/             # caracterización del RentScore + flujo
```

---

## U1 — Base y tooling (fundación)
- **Responsabilidad**: dejar el proyecto listo para construir: Vite+React+TS, linter/formateo, estructura de carpetas, tokens portados desde `tokens.json`, `persistence` (localStorage encapsulado, esquema versionado), y los 4 providers simulados. `scoreProvider` y `paymentProvider` **envuelven el RentScore actual sin cambiar reglas**; se añaden **pruebas de caracterización** que fijan su comportamiento.
- **Entrega**: app que compila, arranca vacía/placeholder, con providers y store operativos y suite de pruebas del motor en verde.
- **Historias**: habilitadora (no entrega pantallas de negocio). Cubre RNF-01, RNF-03, RNF-04, RNF-06, RF-16, RF-18 (frontera).
- **No incluye**: pantallas de negocio.

## U2 — Journey del propietario (migrado)
- **Responsabilidad**: reimplementar en React las 10 pantallas del propietario con **paridad funcional** frente al prototipo actual.
- **Entrega**: journey del propietario completo sobre el nuevo stack.
- **Historias**: US-P01, US-P02, US-P03 (RF-01, RF-02, RF-16..RF-18).
- **Verificación**: revisión manual pantalla a pantalla contra el prototipo original (Q3=A) + RNF-11 (paridad).

## U3 — Journey del inquilino
- **Responsabilidad**: implementar el flujo nuevo del inquilino: marketplace, ficha, lead form, consentimiento en dos capas, ver RentScore propio, postular, seguimiento, retiro/revocación, aviso de deudor.
- **Entrega**: journey del inquilino funcional con datos ficticios.
- **Historias**: US-I01..US-I10 (RF-04..RF-13, RF-16, RF-17).

## U4 — Conexión + bancarización
- **Responsabilidad**: conectar los dos journeys (la postulación del inquilino aparece en la bandeja del propietario), indicador de bancarización y controles de demo.
- **Entrega**: demo de punta a punta.
- **Historias**: US-C01, US-C02 (RF-14, RF-15, RF-19).
