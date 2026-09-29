// Derivaciones del estado. Puras: reciben el estado y el dataProvider.
import { fechaCorta } from '../domain/format';
import type { Declarado, Financiero, FuenteScore, Postulacion, Propiedad } from '../domain/types';
import type { DataProvider } from '../providers/types';
import { estaActiva } from './reducer';
import type { DemoState } from './state';

/** Postulante tal como lo ve la propietaria en su bandeja. */
export interface Aplicante {
  id: string;
  nombre: string;
  edad: number | null;
  ocupacion: string;
  declarado: Declarado | null;
  financiero: Financiero;
  esClienteInterbank: boolean;
  fuente: FuenteScore;
  origen: 'base' | 'marketplace';
  /** Postulación del marketplace aún no abierta por la propietaria (HU-11). */
  nuevo: boolean;
  scoreCompartido: boolean;
  fechaAutorizacion: string;
  postulacion: Postulacion | null;
}

/** Bandeja de la propietaria: Jorge y Kevin + postulaciones del marketplace a su inmueble (no retiradas). */
export function bandeja(state: DemoState, data: DataProvider): Aplicante[] {
  const base: Aplicante[] = data.postulantesBase().map((p) => ({
    id: p.id,
    nombre: p.nombre,
    edad: p.edad,
    ocupacion: p.ocupacion,
    declarado: p.declarado,
    financiero: p.financiero,
    esClienteInterbank: p.esClienteInterbank,
    fuente: 'interbank',
    origen: 'base',
    nuevo: false,
    scoreCompartido: true,
    fechaAutorizacion: data.fechaAutorizacionBase(),
    postulacion: null,
  }));

  const { inquilino, evaluacion } = state;
  if (!inquilino || !evaluacion) return base;

  const delMarketplace: Aplicante[] = state.postulaciones
    .filter(
      (p) =>
        p.propiedadId === state.inmueble.id && p.dni === inquilino.dni && p.estado !== 'retirada',
    )
    .map((p) => ({
      id: p.id,
      nombre: `${inquilino.nombre} ${inquilino.apellido}`,
      edad: typeof inquilino.extra?.edad === 'number' ? inquilino.extra.edad : null,
      ocupacion:
        typeof inquilino.extra?.ocupacion === 'string'
          ? inquilino.extra.ocupacion
          : 'Postuló desde el marketplace de LLAVE',
      declarado: null,
      financiero: evaluacion.financiero,
      esClienteInterbank: inquilino.esClienteInterbank,
      fuente: evaluacion.fuente,
      origen: 'marketplace',
      nuevo: p.estado === 'enviada',
      scoreCompartido: p.scoreCompartido,
      fechaAutorizacion: fechaCorta(p.fecha),
      postulacion: p,
    }));

  return [...base, ...delMarketplace];
}

export function aplicante(
  state: DemoState,
  data: DataProvider,
  id: string | undefined,
): Aplicante | undefined {
  return id ? bandeja(state, data).find((a) => a.id === id) : undefined;
}

/** Postulante aceptado; si no hay, el primero de la bandeja (mismo criterio que el prototipo legado). */
export function aplicanteAceptado(state: DemoState, data: DataProvider): Aplicante {
  const lista = bandeja(state, data);
  return lista.find((a) => a.id === state.aceptado) ?? (lista[0] as Aplicante);
}

/** Inventario del marketplace. La ficha de Carmen refleja lo que ella publicó. */
export function propiedadesMarketplace(state: DemoState, data: DataProvider): Propiedad[] {
  return data
    .listarPropiedades()
    .map((p) => (p.id === state.inmueble.id ? { ...p, ...state.inmueble } : p));
}

export function propiedad(
  state: DemoState,
  data: DataProvider,
  id: string | undefined,
): Propiedad | undefined {
  return id ? propiedadesMarketplace(state, data).find((p) => p.id === id) : undefined;
}

export function postulacionesDelInquilino(state: DemoState): Postulacion[] {
  const dni = state.inquilino?.dni;
  if (!dni) return [];
  return state.postulaciones.filter((p) => p.dni === dni);
}

export function postulacionActiva(state: DemoState, propiedadId: string): Postulacion | undefined {
  return postulacionesDelInquilino(state).find(
    (p) => p.propiedadId === propiedadId && (estaActiva(p) || p.estado === 'aceptada'),
  );
}

export interface MetricaBancarizacion {
  total: number;
  noClientes: number;
  pct: number;
}

/** % de postulantes y leads que no son clientes de Interbank (HU-12). Personas únicas por DNI. */
export function bancarizacion(state: DemoState, data: DataProvider): MetricaBancarizacion {
  const personas = new Map<string, boolean>();
  for (const p of data.postulantesBase()) personas.set(p.dni, p.esClienteInterbank);
  if (state.inquilino) personas.set(state.inquilino.dni, state.inquilino.esClienteInterbank);
  const total = personas.size;
  const noClientes = [...personas.values()].filter((cliente) => !cliente).length;
  return { total, noClientes, pct: total ? Math.round((noClientes / total) * 100) : 0 };
}
