import {
  CODIGO_DEMO,
  FECHA_AUTORIZACION_BASE,
  FINANCIERO_LUCIA,
  INMUEBLE_CARMEN,
  LUCIA,
  POSTULANTES_BASE,
  PROPIEDADES,
  PROPIETARIA,
  REFERENCIA_MERCADO,
} from '../../data/fixtures';
import type { Financiero } from '../../domain/types';
import type { DataProvider } from '../types';

function digitos(dni: string): number[] {
  return Array.from({ length: 8 }, (_, i) => Number(dni[i]) || 0);
}

const redondear2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Perfil financiero determinístico derivado del DNI ficticio. Permite que cualquier DNI escrito
 * en la demo obtenga un score estable. SUPUESTO: no hay integración real con centrales de riesgo.
 */
export function financieroDerivado(dni: string): Financiero {
  const [d0 = 0, d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0] = digitos(dni);
  return {
    ingresoMensual: 2500 + ((d0 * 10 + d1) % 50) * 100,
    mesesIngresoEstable: 3 + ((d2 * 10 + d3) % 40),
    ratioDeuda: redondear2(0.05 + (d4 % 8) * 0.05),
    pagosPuntuales: redondear2(0.76 + (d5 % 8) * 0.03),
    aniosCliente: d6 % 6,
  };
}

function esCliente(dni: string): boolean {
  const base = POSTULANTES_BASE.find((p) => p.dni === dni);
  if (base) return base.esClienteInterbank;
  if (dni === LUCIA.dni) return false;
  // SUPUESTO: DNI terminado en dígito par = cliente de Interbank.
  return Number(dni.at(-1)) % 2 === 0;
}

export const dataProviderSimulado: DataProvider = {
  propietaria: () => PROPIETARIA,
  inmuebleInicial: () => ({ ...INMUEBLE_CARMEN }),
  listarPropiedades: () => PROPIEDADES.map((p) => ({ ...p })),
  postulantesBase: () => POSTULANTES_BASE,
  referenciaMercado: () => REFERENCIA_MERCADO,
  fechaAutorizacionBase: () => FECHA_AUTORIZACION_BASE,
  esClienteInterbank: esCliente,
  consultarFinanciero: (dni, fecha) => {
    const cliente = esCliente(dni);
    const base = POSTULANTES_BASE.find((p) => p.dni === dni);
    const financiero =
      base?.financiero ?? (dni === LUCIA.dni ? FINANCIERO_LUCIA : financieroDerivado(dni));
    return { financiero: { ...financiero }, fuente: cliente ? 'interbank' : 'central', fecha };
  },
  inquilinoDemo: () => ({ ...LUCIA, extra: { ...LUCIA.extra } }),
  codigoVerificacionDemo: () => CODIGO_DEMO,
};
