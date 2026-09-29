# Components — Application Design (LLAVE migrado)

Stack decidido: **Vite + React + TypeScript**, estilos con **CSS + variables (tokens) / CSS Modules**, routing del framework + estado en hooks/store ligero con **persistencia en `localStorage` encapsulada**, **una sola app con dos roles** (propietario e inquilino), y **cuatro módulos simulados** tras interfaz.

El detalle de reglas de negocio se define en Functional Design (por unidad). Aquí: componentes, responsabilidades e interfaces de alto nivel.

## Capas

1. **UI (componentes React)** — pantallas por rol + componentes reutilizables (design system).
2. **Servicios/estado** — router, store de la demo, persistencia.
3. **Providers simulados** — fronteras hacia RentScore, Legal, pagos e datos (decisión 019).

## Componentes de UI compartidos (design system → React)
Portados desde `prototype/design-system/components/`:
- **Button** — acciones primarias/secundarias/enlace.
- **NavHeader** — cabecera con logo y rol (propietario/inquilino).
- **StatusBadge** — banda de score / estados (`ok`, `warn`, `danger`, neutral, info).
- **PropertyCard** — tarjeta de propiedad (marketplace y "mi inmueble").
- **RentScoreCard** — gauge de score, banda, factores.
- **ConsentBlock** — panel de consentimiento (una o dos capas).
- **SolutionOption** — opción de cobro (estándar/garantizado/adelanto).
- **SearchFilters** — filtros del marketplace (distrito, rango de renta).
- **CtaBanner** — banners de llamado a la acción.
- **Cover / ilustraciones** — SVG con paleta de tokens.
- **ProgressBar** — barra de paso del journey.

## Componentes de pantalla — Rol Propietario (preservar paridad, US-P01..P03)
- **OwnerHome** — inicio/hero + "cómo funciona".
- **PublishProperty** — formulario de publicación.
- **MyProperty** — inmueble publicado + acceso a postulantes.
- **ApplicantList** — lista de postulantes con banda/score.
- **ApplicantDetail** — declarado vs. RentScore.
- **ConsentView** — autorización del postulante (solo lectura).
- **RentScoreResult** — score detallado, factores, mercado, aceptar.
- **PolicyScreen** — póliza de seguro (prima por banda).
- **CollectionChoice** — elegir modalidad de cobro.
- **Confirmation** — resumen final.

## Componentes de pantalla — Rol Inquilino (nuevo, US-I01..I10)
- **Marketplace** — grilla de propiedades + filtros (US-I01).
- **PropertyDetail** — ficha con rango de seguro y CTA postular (US-I02).
- **LeadForm** — registro al primer postular + código simulado (US-I03).
- **TenantConsent** — consentimiento en dos capas (US-I05).
- **MyRentScore** — score propio, banda, cuota segura, consejos (US-I06).
- **ApplicationFlow** — envío de postulación (US-I07).
- **MyApplications** — lista y estados de postulaciones (US-I08).
- **WithdrawRevoke** — retiro/revocación (US-I09).
- **DebtorNotice** — aviso de deudor bajo pago garantizado (US-I10).

## Componentes de conexión (US-C01, US-C02)
- **DemoControls** — controles de demo (precargar postulación, avanzar estados, reiniciar).
- **BancarizationIndicator** — % de postulantes no clientes de Interbank.

## Providers simulados (interfaces; decisión 019)
- **scoreProvider** — envuelve `RentScore` actual sin alterar sus reglas.
- **legalTextProvider** — textos legales placeholder (consentimiento, préstamo) marcados SUPUESTO.
- **paymentProvider** — cálculo/simulación de póliza, Cobro Garantizado y Renta Adelantada.
- **dataProvider** — propiedades (8-10), postulantes, inquilino; hoy datos ficticios (`datos.js`), mañana fuente real.

## Servicios/estado
- **router** — navegación entre pantallas y roles.
- **demoStore** — estado de la demo (inmueble, publicado, aceptado, modalidad, inquilino, postulaciones).
- **persistence** — encapsula `localStorage` (carga/guardado/reinicio) con esquema versionado y extensible.
