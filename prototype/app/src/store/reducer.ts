// Reducer puro de la demo. Ids y fechas llegan en el payload (BR-ST-04), así es determinístico en pruebas.
import type {
  EstadoPostulacion,
  Evaluacion,
  Inquilino,
  Modalidad,
  Postulacion,
  Propiedad,
} from '../domain/types';
import type { DemoState } from './state';

export type Accion =
  | { tipo: 'publicar'; datos: Omit<Propiedad, 'id' | 'descripcion'> }
  | { tipo: 'aceptar'; aplicanteId: string }
  | { tipo: 'elegirModalidad'; modalidad: Modalidad; fecha: string }
  | { tipo: 'registrarInquilino'; inquilino: Inquilino }
  | { tipo: 'fijarPendiente'; propiedadId: string | null }
  | { tipo: 'darConsentimiento'; evaluacion: Evaluacion }
  | { tipo: 'enviarPostulacion'; postulacion: Postulacion }
  | { tipo: 'cambiarEstado'; postulacionId: string; estado: EstadoPostulacion }
  | { tipo: 'revocarAcceso'; postulacionId: string }
  | { tipo: 'simularAceptacion'; postulacionId: string; modalidad: Modalidad; fecha: string }
  | {
      tipo: 'precargarDemo';
      inquilino: Inquilino;
      evaluacion: Evaluacion;
      postulacion: Postulacion;
    }
  | { tipo: 'reiniciar'; estado: DemoState };

/** Renta mínima que acepta el formulario de publicación (igual que el prototipo legado). */
export const RENTA_MINIMA = 300;

const TRANSICIONES: Record<EstadoPostulacion, EstadoPostulacion[]> = {
  enviada: ['vista', 'aceptada', 'no_seleccionada', 'retirada'],
  vista: ['aceptada', 'no_seleccionada', 'retirada'],
  aceptada: [],
  no_seleccionada: [],
  retirada: [],
};

export function puedeTransicionar(desde: EstadoPostulacion, hacia: EstadoPostulacion): boolean {
  return TRANSICIONES[desde].includes(hacia);
}

export function estaActiva(p: Postulacion): boolean {
  return p.estado === 'enviada' || p.estado === 'vista';
}

function actualizar(
  postulaciones: Postulacion[],
  id: string,
  cambio: (p: Postulacion) => Postulacion,
): Postulacion[] {
  return postulaciones.map((p) => (p.id === id ? cambio(p) : p));
}

/** Aceptar a un postulante del inmueble de la propietaria: el resto de postulaciones abiertas queda no seleccionado. */
function aceptar(state: DemoState, aplicanteId: string): DemoState {
  const postulaciones = state.postulaciones.map((p): Postulacion => {
    if (p.propiedadId !== state.inmueble.id) return p;
    if (p.id === aplicanteId && estaActiva(p)) return { ...p, estado: 'aceptada' };
    if (p.id !== aplicanteId && (estaActiva(p) || p.estado === 'aceptada')) {
      return { ...p, estado: 'no_seleccionada', modalidad: null };
    }
    return p;
  });
  return { ...state, aceptado: aplicanteId, postulaciones };
}

function elegirModalidad(state: DemoState, modalidad: Modalidad, fecha: string): DemoState {
  return {
    ...state,
    modalidad,
    registrado: fecha,
    postulaciones: state.aceptado
      ? actualizar(state.postulaciones, state.aceptado, (p) => ({ ...p, modalidad }))
      : state.postulaciones,
  };
}

export function reducer(state: DemoState, accion: Accion): DemoState {
  switch (accion.tipo) {
    case 'publicar':
      return {
        ...state,
        publicado: true,
        inmueble: {
          ...state.inmueble,
          ...accion.datos,
          renta: Math.max(RENTA_MINIMA, accion.datos.renta),
        },
      };

    case 'aceptar':
      return aceptar(state, accion.aplicanteId);

    case 'elegirModalidad':
      return elegirModalidad(state, accion.modalidad, accion.fecha);

    case 'registrarInquilino':
      return state.inquilino ? state : { ...state, inquilino: accion.inquilino };

    case 'fijarPendiente':
      return { ...state, pendiente: accion.propiedadId };

    case 'darConsentimiento':
      return state.inquilino ? { ...state, evaluacion: accion.evaluacion } : state;

    case 'enviarPostulacion':
      if (!state.inquilino || !state.evaluacion) return state;
      return {
        ...state,
        pendiente: null,
        postulaciones: [...state.postulaciones, accion.postulacion],
      };

    case 'cambiarEstado': {
      const p = state.postulaciones.find((x) => x.id === accion.postulacionId);
      if (!p || !puedeTransicionar(p.estado, accion.estado)) return state;
      if (accion.estado === 'aceptada' && p.propiedadId === state.inmueble.id) {
        return aceptar(state, p.id);
      }
      return {
        ...state,
        postulaciones: actualizar(state.postulaciones, p.id, (x) => ({
          ...x,
          estado: accion.estado,
        })),
      };
    }

    case 'revocarAcceso':
      return {
        ...state,
        postulaciones: actualizar(state.postulaciones, accion.postulacionId, (x) =>
          x.estado === 'retirada' ? x : { ...x, scoreCompartido: false },
        ),
      };

    case 'simularAceptacion': {
      const p = state.postulaciones.find((x) => x.id === accion.postulacionId);
      if (!p || !estaActiva(p)) return state;
      if (p.propiedadId === state.inmueble.id) {
        return elegirModalidad(aceptar(state, p.id), accion.modalidad, accion.fecha);
      }
      return {
        ...state,
        postulaciones: actualizar(state.postulaciones, p.id, (x) => ({
          ...x,
          estado: 'aceptada',
          modalidad: accion.modalidad,
        })),
      };
    }

    case 'precargarDemo': {
      if (state.inquilino && state.inquilino.dni !== accion.inquilino.dni) return state;
      const yaPostulo = state.postulaciones.some(
        (p) =>
          p.propiedadId === accion.postulacion.propiedadId &&
          p.dni === accion.inquilino.dni &&
          (estaActiva(p) || p.estado === 'aceptada'),
      );
      return {
        ...state,
        inquilino: state.inquilino ?? accion.inquilino,
        evaluacion: state.evaluacion ?? accion.evaluacion,
        postulaciones: yaPostulo
          ? state.postulaciones
          : [...state.postulaciones, accion.postulacion],
      };
    }

    case 'reiniciar':
      return accion.estado;
  }
}
