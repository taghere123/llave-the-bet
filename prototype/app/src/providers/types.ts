// Fronteras de simulación (decisión 019). La UI solo conoce estas interfaces.
// Cada implementación simulada puede reemplazarse por la integración real sin tocar pantallas.
import type {
  Banda,
  Evaluacion,
  Financiero,
  PostulanteBase,
  Propiedad,
  Propietaria,
  ScoreResult,
} from '../domain/types';
import type { CobroGarantizado, Prima, RentaAdelantada } from '../domain/rentscore';

/** Evalúa a un postulante. Hoy: reglas ficticias. Futuro: servicio de Riesgos. */
export interface ScoreProvider {
  evaluar(financiero: Financiero, renta: number): ScoreResult;
}

/** Condiciones comerciales. Hoy: cifras del equipo. Futuro: Interseguro e Interbank. */
export interface PaymentProvider {
  prima(renta: number, banda: Banda): Prima;
  rangoSeguro(renta: number): { min: number; max: number };
  cobroGarantizado(renta: number, banda: Banda): CobroGarantizado;
  rentaAdelantada(renta: number, banda: Banda): RentaAdelantada;
}

export interface TextoLegal {
  titulo: string;
  cuerpo: string;
  /** Siempre true mientras Legal no entregue el texto definitivo. */
  supuesto: true;
}

/** Textos legales. Hoy: placeholders. Futuro: contenidos aprobados por Legal. */
export interface LegalTextProvider {
  consentimientoScore(esCliente: boolean): TextoLegal;
  compartirConPropietario(nombrePropietario: string): TextoLegal;
  avisoDeudor(): TextoLegal;
  politicaDatos(): TextoLegal;
}

/** Datos de negocio. Hoy: datos ficticios. Futuro: marketplace, core bancario y centrales. */
export interface DataProvider {
  propietaria(): Propietaria;
  inmuebleInicial(): Propiedad;
  listarPropiedades(): Propiedad[];
  postulantesBase(): PostulanteBase[];
  referenciaMercado(): { min: number; max: number };
  fechaAutorizacionBase(): string;
  esClienteInterbank(dni: string): boolean;
  /** Consulta financiera con autorización: Interbank si es cliente, central de riesgo si no. */
  consultarFinanciero(dni: string, fecha: string): Evaluacion;
  inquilinoDemo(): {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    celular: string;
    extra: Record<string, unknown>;
  };
  codigoVerificacionDemo(): string;
}

export interface Providers {
  score: ScoreProvider;
  payment: PaymentProvider;
  legal: LegalTextProvider;
  data: DataProvider;
}
