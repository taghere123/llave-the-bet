import { cobroGarantizado, prima, rentaAdelantada } from '../../domain/rentscore';
import type { PaymentProvider } from '../types';

// Decisión 010: el seguro cuesta entre 2% y 5% de la renta. Falta tarificar con Interseguro.
const TASA_SEGURO_MIN = 0.02;
const TASA_SEGURO_MAX = 0.05;

/** Simulado: cifras del equipo, sin sustento actuarial (decisiones 010, 012 y 016). */
export const paymentProviderSimulado: PaymentProvider = {
  prima,
  rangoSeguro: (renta) => ({
    min: Math.round(renta * TASA_SEGURO_MIN),
    max: Math.round(renta * TASA_SEGURO_MAX),
  }),
  cobroGarantizado,
  rentaAdelantada,
};
