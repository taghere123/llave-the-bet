// Pruebas de caracterización del RentScore (RNF-03, decisión 019).
// 1) Diferencial: el port a TypeScript debe dar exactamente lo mismo que el motor legado
//    prototype/src/rentscore.js en una grilla de entradas que cubre todos los cortes.
// 2) Valores de referencia fijos para los postulantes de la demo, por si el archivo legado se retira.
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import * as ts from '../src/domain/rentscore';
import type { Banda, Financiero } from '../src/domain/types';

type Motor = typeof ts;
const require = createRequire(import.meta.url);
const legado = require('../../src/rentscore.js') as Motor;

const BANDAS: Banda[] = ['alto', 'medio', 'bajo'];

describe('RentScore: equivalencia con el motor legado', () => {
  it('calcular() coincide en toda la grilla de cortes', () => {
    // Cada lista tiene valores en el corte, justo a cada lado y entre cortes, para detectar
    // cualquier corrimiento de un umbral. La renta se genera desde la relación renta/ingreso.
    const ingresos = [1000, 4200, 6200, 9000];
    const ratios = [0.1, 0.24, 0.25, 0.26, 0.29, 0.3, 0.31, 0.34, 0.35, 0.36, 0.39, 0.4, 0.41, 0.6];
    const meses = [0, 5, 6, 7, 11, 12, 13, 23, 24, 25, 40];
    const deudas = [0, 0.14, 0.15, 0.16, 0.29, 0.3, 0.31, 0.39, 0.4, 0.41];
    const puntualidades = [0.7, 0.74, 0.75, 0.76, 0.84, 0.85, 0.86, 0.94, 0.95, 0.96, 1];
    const anios = [0, 0.5, 0.99, 1, 1.01, 2.99, 3, 3.01, 10];

    let casos = 0;
    const diferencias: string[] = [];
    for (const ingresoMensual of ingresos)
      for (const renta of ratios.map((r) => ingresoMensual * r))
        for (const mesesIngresoEstable of meses)
          for (const ratioDeuda of deudas)
            for (const pagosPuntuales of puntualidades)
              for (const aniosCliente of anios) {
                const f: Financiero = {
                  ingresoMensual,
                  mesesIngresoEstable,
                  ratioDeuda,
                  pagosPuntuales,
                  aniosCliente,
                };
                casos++;
                const a = JSON.stringify(ts.calcular(f, renta));
                const b = JSON.stringify(legado.calcular(f, renta));
                if (a !== b && diferencias.length < 5)
                  diferencias.push(`${JSON.stringify(f)} renta=${renta}`);
              }

    expect(casos).toBeGreaterThan(50_000);
    expect(diferencias).toEqual([]);
  });

  it('prima(), cobroGarantizado() y rentaAdelantada() coinciden para todas las bandas', () => {
    for (const renta of [300, 999, 1100, 1800, 2450, 5000])
      for (const banda of BANDAS) {
        expect(ts.prima(renta, banda)).toEqual(legado.prima(renta, banda));
        expect(ts.cobroGarantizado(renta, banda)).toEqual(legado.cobroGarantizado(renta, banda));
        expect(ts.rentaAdelantada(renta, banda)).toEqual(legado.rentaAdelantada(renta, banda));
      }
  });
});

describe('RentScore: valores de referencia de la demo (renta S/1,800)', () => {
  const casos: [string, Financiero, number, Banda, number][] = [
    [
      'Lucía',
      {
        ingresoMensual: 6200,
        mesesIngresoEstable: 30,
        ratioDeuda: 0.22,
        pagosPuntuales: 0.98,
        aniosCliente: 5,
      },
      87,
      'alto',
      1850,
    ],
    [
      'Jorge',
      {
        ingresoMensual: 5400,
        mesesIngresoEstable: 10,
        ratioDeuda: 0.3,
        pagosPuntuales: 0.88,
        aniosCliente: 2,
      },
      56,
      'medio',
      1600,
    ],
    [
      'Kevin',
      {
        ingresoMensual: 4200,
        mesesIngresoEstable: 8,
        ratioDeuda: 0.35,
        pagosPuntuales: 0.8,
        aniosCliente: 1.5,
      },
      26,
      'bajo',
      1250,
    ],
  ];

  it.each(casos)('%s', (_nombre, f, score, banda, cuotaSegura) => {
    const r = ts.calcular(f, 1800);
    expect(r.score).toBe(score);
    expect(r.banda).toBe(banda);
    expect(r.cuotaSegura).toBe(cuotaSegura);
    expect(r.factores.map((x) => x.max)).toEqual([30, 20, 20, 20, 10]);
  });

  it('condiciones comerciales coinciden con la tabla de docs/supuestos.md', () => {
    expect(ts.prima(1800, 'alto')).toEqual({ tasa: 0.02, monto: 36 });
    expect(ts.prima(1800, 'medio')).toEqual({ tasa: 0.035, monto: 63 });
    expect(ts.prima(1800, 'bajo')).toEqual({ tasa: 0.05, monto: 90 });
    expect(ts.cobroGarantizado(1800, 'alto')).toMatchObject({
      comision: 54,
      deposito: 1746,
      anual: 648,
    });
    expect(ts.cobroGarantizado(1800, 'medio')).toMatchObject({ comision: 90, anual: 1080 });
    expect(ts.cobroGarantizado(1800, 'bajo')).toEqual({ disponible: false });
    expect(ts.rentaAdelantada(1800, 'alto')).toMatchObject({
      total: 21600,
      comision: 3240,
      desembolso: 18360,
    });
    expect(ts.rentaAdelantada(1800, 'medio')).toMatchObject({ comision: 5400, desembolso: 16200 });
    expect(ts.rentaAdelantada(1800, 'bajo')).toEqual({ disponible: false });
  });
});
