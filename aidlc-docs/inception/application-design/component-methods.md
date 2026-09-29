# Component Methods — Application Design

Firmas de alto nivel (TypeScript). Las reglas de negocio detalladas se definen en Functional Design (por unidad). Los tipos son indicativos y se afinan en Functional Design.

## Tipos de dominio (borrador)

```ts
type Banda = "alto" | "medio" | "bajo";

interface Financiero {
  ingresoMensual: number;
  mesesIngresoEstable: number;
  ratioDeuda: number;
  pagosPuntuales: number;
  aniosCliente: number;
}

interface Propiedad {
  id: string; tipo: string; direccion: string; distrito: string;
  dormitorios: number; area: number; renta: number;
}

// Esquema extensible (RF-06): permite sumar campos sin rehacer el flujo.
interface Inquilino {
  nombre: string; apellido: string; dni: string; email: string; celular: string;
  esClienteInterbank: boolean;
  extra?: Record<string, unknown>;
}

type EstadoPostulacion = "enviada" | "vista" | "aceptada" | "no_seleccionada" | "retirada";

interface Postulacion {
  id: string; propiedadId: string; inquilinoId: string;
  estado: EstadoPostulacion; fecha: string; scoreCompartido: boolean;
}

interface ScoreResult { score: number; banda: Banda; cuotaSegura: number; factores: Factor[]; }
interface Factor { clave: string; max: number; puntos: number; texto: string; }
```

## Providers simulados (interfaces)

### scoreProvider (envuelve RentScore, no reescribe reglas)
```ts
evaluar(f: Financiero, renta: number): ScoreResult
```

### paymentProvider
Dueño de las condiciones comerciales (corrección de U1 Functional Design: la prima se movió aquí desde `scoreProvider`).
```ts
prima(renta: number, banda: Banda): { tasa: number; monto: number }
rangoSeguro(renta: number): { min: number; max: number }
cobroGarantizado(renta: number, banda: Banda): { disponible: boolean; tasa?: number; comision?: number; deposito?: number; anual?: number }
rentaAdelantada(renta: number, banda: Banda): { disponible: boolean; tasa?: number; meses?: number; total?: number; comision?: number; desembolso?: number }
```

### legalTextProvider
```ts
consentimientoScore(): { titulo: string; cuerpo: string; supuesto: true }
avisoDeudor(): { titulo: string; cuerpo: string; supuesto: true }
```

### dataProvider
```ts
listarPropiedades(filtro?: { distrito?: string; rentaMin?: number; rentaMax?: number }): Propiedad[]
obtenerPropiedad(id: string): Propiedad | undefined
listarPostulantesBase(): { inquilino: Inquilino; financiero: Financiero }[]
referenciaMercado(propiedad: Propiedad): { min: number; max: number }
esClienteInterbank(dni: string): boolean   // regla simulada derivada del DNI ficticio
```

## Servicios/estado

### persistence
```ts
cargar(): DemoState
guardar(state: DemoState): void
reiniciar(): DemoState   // estado inicial
```

### demoStore (hook/store)
```ts
publicarInmueble(datos: Partial<Propiedad>): void          // US-P01
aceptarPostulante(postulacionId: string): void             // US-P02
elegirModalidad(m: "estandar" | "cobro" | "adelanto"): void// US-P03
registrarInquilino(datos: Inquilino): void                 // US-I03
darConsentimiento(capa: "general" | "compartir", propiedadId?: string): void // US-I05
enviarPostulacion(propiedadId: string): Postulacion        // US-I07
cambiarEstado(postulacionId: string, estado: EstadoPostulacion): void // US-I08 (demo)
retirarPostulacion(postulacionId: string): void            // US-I09
revocarAcceso(postulacionId: string): void                 // US-I09
precargarPostulacionLucia(): void                          // US-C01 (demo)
metricaBancarizacion(): { total: number; noClientes: number; pct: number } // US-C02
```

### router
```ts
irA(ruta: string): void
rutaActual(): { pantalla: string; params: Record<string,string> }
```

## Componentes de UI (props de alto nivel)
- Cada componente de pantalla recibe el `demoStore` y los `providers` por contexto (React Context) o props.
- Componentes del design system (Button, StatusBadge, PropertyCard, RentScoreCard, ConsentBlock, SolutionOption, SearchFilters) exponen props tipadas equivalentes a sus variantes actuales del `preview.html`.
