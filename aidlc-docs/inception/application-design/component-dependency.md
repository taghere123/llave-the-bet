# Component Dependency — Application Design

## Diagrama de dependencias

```mermaid
flowchart TD
    subgraph UI["UI (React)"]
        OWN["Pantallas Propietario"]
        TEN["Pantallas Inquilino"]
        CONN["Conexión (DemoControls, BancarizationIndicator)"]
        DS["Componentes design system"]
    end

    subgraph SVC["Servicios / Estado"]
        STORE["demoStore"]
        ROUTER["router"]
        PERS["persistence (localStorage)"]
    end

    subgraph PROV["Providers simulados (frontera - decision 019)"]
        SCORE["scoreProvider"]
        PAY["paymentProvider"]
        LEGAL["legalTextProvider"]
        DATA["dataProvider"]
    end

    RS["RentScore (reglas actuales, sin cambios)"]
    FAKE["Datos ficticios (SUPUESTO)"]

    OWN --> STORE
    TEN --> STORE
    CONN --> STORE
    OWN --> DS
    TEN --> DS
    CONN --> DS
    UI --> ROUTER

    STORE --> PERS
    STORE --> SCORE
    STORE --> PAY
    STORE --> LEGAL
    STORE --> DATA

    SCORE --> RS
    PAY --> RS
    DATA --> FAKE
    LEGAL --> FAKE

    style PROV fill:#FFE0B2,stroke:#E65100,color:#000
    style RS fill:#ffcd00,stroke:#0f191e,color:#0f191e
```

Texto alternativo: Las pantallas (propietario, inquilino, conexión) y los componentes del design system consumen `demoStore` y el `router`. `demoStore` depende de `persistence` (localStorage) y de los cuatro providers simulados. `scoreProvider` y `paymentProvider` envuelven al motor `RentScore` actual (sin cambios). `dataProvider` y `legalTextProvider` sirven datos/textos ficticios. La UI nunca importa `RentScore` directamente: siempre pasa por un provider.

## Matriz de dependencias

| Componente | Depende de |
| --- | --- |
| Pantallas Propietario | demoStore, router, design system |
| Pantallas Inquilino | demoStore, router, design system |
| Conexión (demo/bancarización) | demoStore, router, design system |
| demoStore | persistence, scoreProvider, paymentProvider, legalTextProvider, dataProvider |
| scoreProvider | RentScore (actual) |
| paymentProvider | RentScore (actual) |
| dataProvider | datos ficticios |
| legalTextProvider | textos placeholder |
| persistence | Web Storage API (localStorage) |

## Reglas de acoplamiento
- **Regla de frontera (decisión 019)**: ningún componente de UI importa `RentScore`, datos ficticios ni lógica legal/pagos directamente; todo pasa por un provider. Esto permite sustituir cada provider por su versión real sin tocar la UI.
- **RentScore intacto**: `scoreProvider`/`paymentProvider` reutilizan las reglas actuales; se cubren con pruebas de caracterización (RNF-03).
- **Persistencia aislada**: solo `persistence` conoce `localStorage`.

## Data flow (postular → bandeja, US-I07 + US-C01)

```mermaid
sequenceDiagram
    participant T as Inquilino (UI)
    participant S as demoStore
    participant D as dataProvider
    participant SC as scoreProvider
    participant P as persistence

    T->>S: enviarPostulacion(propiedadId)
    S->>SC: calcular(financiero, renta)
    SC-->>S: ScoreResult
    S->>D: obtenerPropiedad(propiedadId)
    D-->>S: Propiedad
    S->>P: guardar(estado con nueva Postulacion 'enviada')
    S-->>T: Postulacion (enviada)
    Note over S: si es la propiedad de Carmen, aparece en su bandeja como "Nuevo" (US-C01)
```

Texto alternativo: al enviar una postulación, el store calcula el score vía `scoreProvider`, obtiene la propiedad vía `dataProvider`, persiste la nueva postulación en estado `enviada` y, si corresponde a la propiedad de Carmen, la agrega a su bandeja marcada "Nuevo".
