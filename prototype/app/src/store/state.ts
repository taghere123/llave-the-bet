import type { Evaluacion, Inquilino, Modalidad, Postulacion, Propiedad } from '../domain/types';
import type { DataProvider } from '../providers/types';

export const VERSION_ESTADO = 2;
export const CLAVE_STORAGE = 'llave-demo-v2';

export interface DemoState {
  version: typeof VERSION_ESTADO;
  // Journey de la propietaria
  inmueble: Propiedad;
  publicado: boolean;
  /** Id del postulante aceptado: id base (jorge, kevin) o id de una postulación del marketplace. */
  aceptado: string | null;
  modalidad: Modalidad | null;
  registrado: string | null;
  // Journey del inquilino
  inquilino: Inquilino | null;
  evaluacion: Evaluacion | null;
  postulaciones: Postulacion[];
  /** Propiedad a la que el inquilino quería postular antes de registrarse. */
  pendiente: string | null;
}

export function estadoInicial(data: DataProvider): DemoState {
  return {
    version: VERSION_ESTADO,
    inmueble: data.inmuebleInicial(),
    publicado: false,
    aceptado: null,
    modalidad: null,
    registrado: null,
    inquilino: null,
    evaluacion: null,
    postulaciones: [],
    pendiente: null,
  };
}
