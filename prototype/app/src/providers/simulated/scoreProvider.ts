import { calcular } from '../../domain/rentscore';
import type { ScoreProvider } from '../types';

/** Simulado: delega en el RentScore del prototipo, sin cambiar sus reglas (decisión 019). */
export const scoreProviderSimulado: ScoreProvider = {
  evaluar: (financiero, renta) => calcular(financiero, renta),
};
