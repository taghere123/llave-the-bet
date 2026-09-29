import type { Evaluacion, Inquilino, Postulacion } from '../src/domain/types';
import { providersSimulados } from '../src/providers/ProvidersContext';
import { estadoInicial, type DemoState } from '../src/store/state';

export const data = providersSimulados.data;
export const FECHA = '2026-09-29T15:00:00.000Z';

export function inicial(): DemoState {
  return estadoInicial(data);
}

export function lucia(): Inquilino {
  const l = data.inquilinoDemo();
  return { ...l, esClienteInterbank: data.esClienteInterbank(l.dni), registradoEn: FECHA };
}

export function evaluacionLucia(): Evaluacion {
  return data.consultarFinanciero(data.inquilinoDemo().dni, FECHA);
}

export function postulacion(id: string, propiedadId: string, dni: string): Postulacion {
  return {
    id,
    propiedadId,
    dni,
    fecha: FECHA,
    estado: 'enviada',
    scoreCompartido: true,
    modalidad: null,
  };
}

/** Estado con Lucía registrada, con consentimiento y una postulación al inmueble de Carmen. */
export function conLuciaPostulando(): DemoState {
  const s = inicial();
  return {
    ...s,
    inquilino: lucia(),
    evaluacion: evaluacionLucia(),
    postulaciones: [postulacion('p-1', s.inmueble.id, lucia().dni)],
  };
}
