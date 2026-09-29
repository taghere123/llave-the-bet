// Tipos de dominio compartidos por todas las unidades. Todo dato del prototipo es ficticio.

export type Banda = 'alto' | 'medio' | 'bajo';

/** Contrato exacto que consume el RentScore (sin cambios respecto al prototipo legado). */
export interface Financiero {
  ingresoMensual: number;
  mesesIngresoEstable: number;
  ratioDeuda: number;
  pagosPuntuales: number;
  /** Años como cliente. Para no clientes, antigüedad en el sistema financiero (SUPUESTO). */
  aniosCliente: number;
}

export interface Factor {
  clave: string;
  max: number;
  puntos: number;
  texto: string;
}

export interface ScoreResult {
  score: number;
  banda: Banda;
  cuotaSegura: number;
  factores: Factor[];
}

export interface Propiedad {
  id: string;
  tipo: string;
  direccion: string;
  distrito: string;
  dormitorios: number;
  area: number;
  renta: number;
  descripcion: string;
}

export interface Declarado {
  ingreso: number;
  garantia: string;
  mascotas: string;
}

/** Postulante que ya está en la bandeja de la propietaria al iniciar la demo. */
export interface PostulanteBase {
  id: string;
  nombre: string;
  edad: number;
  ocupacion: string;
  dni: string;
  esClienteInterbank: boolean;
  declarado: Declarado;
  financiero: Financiero;
}

/** Lead del marketplace. `extra` deja el esquema abierto para pedir más datos después. */
export interface Inquilino {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  celular: string;
  esClienteInterbank: boolean;
  registradoEn: string;
  extra?: Record<string, unknown>;
}

export type FuenteScore = 'interbank' | 'central';

/** Datos financieros obtenidos al dar el consentimiento general. Se reutilizan en cada postulación. */
export interface Evaluacion {
  financiero: Financiero;
  fuente: FuenteScore;
  fecha: string;
}

export const ESTADOS_POSTULACION = [
  'enviada',
  'vista',
  'aceptada',
  'no_seleccionada',
  'retirada',
] as const;
export type EstadoPostulacion = (typeof ESTADOS_POSTULACION)[number];

export interface Postulacion {
  id: string;
  propiedadId: string;
  dni: string;
  fecha: string;
  estado: EstadoPostulacion;
  scoreCompartido: boolean;
  /** Modalidad de cobro que eligió el propietario al aceptar. Define si el inquilino es deudor (HU-10). */
  modalidad: Modalidad | null;
}

export const MODALIDADES = ['estandar', 'cobro', 'adelanto'] as const;
export type Modalidad = (typeof MODALIDADES)[number];

export interface Propietaria {
  nombre: string;
  edad: number;
  escena: string;
}
