// RentScore: port literal a TypeScript de prototype/src/rentscore.js.
// Decisión 019: las reglas NO se modifican. Cualquier cambio aquí debe romper
// tests/rentscore.characterization.test.ts, que compara este módulo con el archivo legado.
// Todos los puntos, cortes y porcentajes son SUPUESTOS del prototipo (ver prototype/docs/supuestos.md).
import type { Banda, Factor, Financiero, ScoreResult } from './types';

type Corte = [(valor: number) => boolean, number];

function tramo(valor: number, cortes: Corte[]): number {
  for (const [predicado, puntos] of cortes) {
    if (predicado(valor)) return puntos;
  }
  return 0;
}

/** f: datos financieros del postulante; renta: renta mensual del inmueble. */
export function calcular(f: Financiero, renta: number): ScoreResult {
  const ratioRenta = renta / f.ingresoMensual;
  const factores: Factor[] = [
    {
      clave: 'renta',
      max: 30,
      puntos: tramo(ratioRenta, [
        [(r) => r <= 0.25, 30],
        [(r) => r <= 0.3, 24],
        [(r) => r <= 0.35, 16],
        [(r) => r <= 0.4, 8],
      ]),
      texto:
        ratioRenta <= 0.3
          ? 'La renta es una parte manejable de sus ingresos'
          : ratioRenta <= 0.4
            ? 'La renta pesa bastante en sus ingresos'
            : 'La renta supera lo recomendable para sus ingresos',
    },
    {
      clave: 'estabilidad',
      max: 20,
      puntos: tramo(f.mesesIngresoEstable, [
        [(m) => m >= 24, 20],
        [(m) => m >= 12, 14],
        [(m) => m >= 6, 8],
        [() => true, 3],
      ]),
      texto:
        f.mesesIngresoEstable >= 24
          ? 'Ingresos regulares por más de 2 años'
          : f.mesesIngresoEstable >= 12
            ? 'Ingresos regulares por más de 1 año'
            : 'Ingresos regulares por menos de 1 año',
    },
    {
      clave: 'deuda',
      max: 20,
      puntos: tramo(f.ratioDeuda, [
        [(d) => d <= 0.15, 20],
        [(d) => d <= 0.3, 13],
        [(d) => d <= 0.4, 6],
      ]),
      texto:
        f.ratioDeuda <= 0.3
          ? 'Nivel de deuda moderado'
          : 'Nivel de deuda alto frente a sus ingresos',
    },
    {
      clave: 'puntualidad',
      max: 20,
      puntos: tramo(f.pagosPuntuales, [
        [(p) => p >= 0.95, 20],
        [(p) => p >= 0.85, 13],
        [(p) => p >= 0.75, 6],
      ]),
      texto:
        f.pagosPuntuales >= 0.95
          ? 'Paga sus obligaciones a tiempo'
          : f.pagosPuntuales >= 0.85
            ? 'Algunos pagos con retraso en el último año'
            : 'Retrasos frecuentes en el último año',
    },
    {
      clave: 'antiguedad',
      max: 10,
      puntos: tramo(f.aniosCliente, [
        [(a) => a >= 3, 10],
        [(a) => a >= 1, 6],
        [() => true, 2],
      ]),
      texto:
        f.aniosCliente >= 3 ? 'Relación bancaria de varios años' : 'Relación bancaria reciente',
    },
  ];

  const score = factores.reduce((s, x) => s + x.puntos, 0);
  // Bandas provisionales del design system: 0-39, 40-69, 70-100.
  const banda: Banda = score >= 70 ? 'alto' : score >= 40 ? 'medio' : 'bajo';
  // Cuota segura: 30% del ingreso mensual, redondeado hacia abajo a S/50. Supuesto.
  const cuotaSegura = Math.floor((f.ingresoMensual * 0.3) / 50) * 50;

  return { score, banda, cuotaSegura, factores };
}

// Prima del seguro, modelo B de la decisión 010 (2-5% de la renta), escalonada por banda. Supuesto.
const TASA_PRIMA: Record<Banda, number> = { alto: 0.02, medio: 0.035, bajo: 0.05 };
// Niveles 2 y 3: préstamo de consumo de Interbank a tasa cero; la comisión es el interés implícito.
// Con score bajo no se ofrecen. Cifras del equipo, sin sustento actuarial (decisiones 012 y 016).
const COMISION_COBRO: Partial<Record<Banda, number>> = { alto: 0.03, medio: 0.05 };
const COMISION_ADELANTO: Partial<Record<Banda, number>> = { alto: 0.15, medio: 0.25 };
const MESES_ADELANTO = 12;

export interface Prima {
  tasa: number;
  monto: number;
}

export function prima(renta: number, banda: Banda): Prima {
  return { tasa: TASA_PRIMA[banda], monto: Math.round(renta * TASA_PRIMA[banda]) };
}

export type CobroGarantizado =
  | { disponible: false }
  | { disponible: true; tasa: number; comision: number; deposito: number; anual: number };

export function cobroGarantizado(renta: number, banda: Banda): CobroGarantizado {
  const tasa = COMISION_COBRO[banda];
  if (tasa === undefined) return { disponible: false };
  const comision = Math.round(renta * tasa);
  return { disponible: true, tasa, comision, deposito: renta - comision, anual: comision * 12 };
}

export type RentaAdelantada =
  | { disponible: false }
  | {
      disponible: true;
      tasa: number;
      meses: number;
      total: number;
      comision: number;
      desembolso: number;
    };

export function rentaAdelantada(renta: number, banda: Banda): RentaAdelantada {
  const tasa = COMISION_ADELANTO[banda];
  if (tasa === undefined) return { disponible: false };
  const total = renta * MESES_ADELANTO;
  const comision = Math.round(total * tasa);
  return {
    disponible: true,
    tasa,
    meses: MESES_ADELANTO,
    total,
    comision,
    desembolso: total - comision,
  };
}
