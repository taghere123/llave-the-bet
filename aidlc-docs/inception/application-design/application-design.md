# Application Design (consolidado) — LLAVE migrado

Documento que consolida components.md, component-methods.md, services.md y component-dependency.md.

## Decisiones de arquitectura (aprobadas)
- **Framework**: Vite + React + TypeScript (Q1=A).
- **Estilos**: CSS con variables (tokens del design system) + CSS Modules (Q2=A).
- **Routing/estado**: router del framework + estado en hooks/store ligero + `localStorage` encapsulado en `persistence` (Q3=A).
- **Módulos simulados**: cuatro interfaces — `scoreProvider`, `paymentProvider`, `legalTextProvider`, `dataProvider` (Q4=A, decisión 019).
- **Organización**: una sola app con dos roles (propietario e inquilino) que comparten componentes y providers (Q5=A).

## Arquitectura en tres capas
1. **UI (React)**: componentes del design system + pantallas por rol + componentes de conexión.
2. **Servicios/estado**: `demoStore`, `router`, `persistence`.
3. **Providers simulados**: frontera única hacia RentScore, pagos, legal y datos. La UI nunca accede directo a esas piezas.

## Componentes (resumen)
- **Design system → React**: Button, NavHeader, StatusBadge, PropertyCard, RentScoreCard, ConsentBlock, SolutionOption, SearchFilters, CtaBanner, Cover/ilustraciones, ProgressBar.
- **Propietario**: OwnerHome, PublishProperty, MyProperty, ApplicantList, ApplicantDetail, ConsentView, RentScoreResult, PolicyScreen, CollectionChoice, Confirmation.
- **Inquilino**: Marketplace, PropertyDetail, LeadForm, TenantConsent, MyRentScore, ApplicationFlow, MyApplications, WithdrawRevoke, DebtorNotice.
- **Conexión**: DemoControls, BancarizationIndicator.

## Interfaces clave (ver component-methods.md)
- `scoreProvider.calcular/prima`, `paymentProvider.cobroGarantizado/rentaAdelantada`, `legalTextProvider.*`, `dataProvider.*`.
- `demoStore` con acciones por historia (publicar, aceptar, elegir modalidad, registrar inquilino, consentir, postular, cambiar estado, retirar/revocar, precargar demo, métrica de bancarización).

## Dependencias y reglas (ver component-dependency.md)
- Regla de frontera (decisión 019): toda lógica sensible pasa por un provider; `RentScore` no se importa en la UI y no se reescribe (se caracteriza con pruebas).
- Persistencia aislada en `persistence`.

## Trazabilidad a historias/requisitos
- Propietario: US-P01..P03 (RF-01, RF-02, RF-16..RF-18).
- Inquilino: US-I01..I10 (RF-04..RF-13, RF-16, RF-17).
- Conexión: US-C01, US-C02 (RF-14, RF-15, RF-19).

## Notas para Construction
- La descomposición en unidades (U1 base/tooling, U2 propietario migrado, U3 inquilino, U4 conexión) se formaliza en **Units Generation**.
- La selección fina de librerías (framework de test, linter) se fija en **NFR Requirements**.
- Las reglas de negocio detalladas (validaciones del lead form, disponibilidad de modalidades, dos capas de consentimiento, cálculo de bancarización) se detallan en **Functional Design** por unidad.
