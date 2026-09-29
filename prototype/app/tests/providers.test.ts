import { describe, expect, it } from 'vitest';
import { providersSimulados } from '../src/providers/ProvidersContext';
import { financieroDerivado } from '../src/providers/simulated/dataProvider';
import { reducer } from '../src/store/reducer';
import { bancarizacion, bandeja, propiedadesMarketplace } from '../src/store/selectors';
import { conLuciaPostulando, FECHA, inicial } from './helpers';

const { data, payment, legal, score } = providersSimulados;

describe('dataProvider simulado', () => {
  it('tiene 8 a 10 propiedades en Lima Moderna, incluida la de Carmen', () => {
    const props = data.listarPropiedades();
    expect(props.length).toBeGreaterThanOrEqual(8);
    expect(props.length).toBeLessThanOrEqual(10);
    expect(props.some((p) => p.id === data.inmuebleInicial().id)).toBe(true);
    expect(new Set(props.map((p) => p.id)).size).toBe(props.length);
  });

  it('Lucía no es clienta; Jorge y Kevin sí; el resto se deriva del último dígito del DNI', () => {
    expect(data.esClienteInterbank('45872913')).toBe(false);
    expect(data.esClienteInterbank('41236598')).toBe(true);
    expect(data.esClienteInterbank('72014536')).toBe(true);
    expect(data.esClienteInterbank('10000002')).toBe(true);
    expect(data.esClienteInterbank('10000003')).toBe(false);
  });

  it('la consulta financiera usa central de riesgo para no clientes', () => {
    expect(data.consultarFinanciero('45872913', FECHA).fuente).toBe('central');
    expect(data.consultarFinanciero('41236598', FECHA).fuente).toBe('interbank');
  });

  it('el perfil derivado del DNI es determinístico y está en rango', () => {
    for (const dni of ['00000000', '99999999', '12345678', '87654321', '40506070']) {
      const f = financieroDerivado(dni);
      expect(financieroDerivado(dni)).toEqual(f);
      expect(f.ingresoMensual).toBeGreaterThanOrEqual(2500);
      expect(f.ingresoMensual).toBeLessThanOrEqual(7400);
      expect(f.ratioDeuda).toBeGreaterThanOrEqual(0.05);
      expect(f.ratioDeuda).toBeLessThanOrEqual(0.4);
      expect(f.pagosPuntuales).toBeGreaterThanOrEqual(0.76);
      expect(f.pagosPuntuales).toBeLessThanOrEqual(0.97);
      expect(() => score.evaluar(f, 1800)).not.toThrow();
    }
  });
});

describe('paymentProvider y legalTextProvider simulados', () => {
  it('rango del seguro es 2-5% de la renta (decisión 010)', () => {
    expect(payment.rangoSeguro(1800)).toEqual({ min: 36, max: 90 });
  });

  it('todos los textos legales están marcados como supuesto', () => {
    const textos = [
      legal.consentimientoScore(true),
      legal.consentimientoScore(false),
      legal.compartirConPropietario('Carmen'),
      legal.avisoDeudor(),
      legal.politicaDatos(),
    ];
    expect(textos.every((t) => t.supuesto)).toBe(true);
    expect(legal.consentimientoScore(false).cuerpo).toContain('centrales de riesgo');
  });
});

describe('selectores', () => {
  it('la bandeja arranca con Jorge y Kevin', () => {
    expect(bandeja(inicial(), data).map((a) => a.id)).toEqual(['jorge', 'kevin']);
  });

  it('Lucía aparece como tercera postulante marcada como nueva', () => {
    const lista = bandeja(conLuciaPostulando(), data);
    expect(lista).toHaveLength(3);
    expect(lista[2]).toMatchObject({ origen: 'marketplace', nuevo: true, fuente: 'central' });
  });

  it('una postulación retirada desaparece de la bandeja', () => {
    const s = reducer(conLuciaPostulando(), {
      tipo: 'cambiarEstado',
      postulacionId: 'p-1',
      estado: 'retirada',
    });
    expect(bandeja(s, data)).toHaveLength(2);
  });

  it('el indicador de bancarización se mueve con Lucía', () => {
    expect(bancarizacion(inicial(), data)).toEqual({ total: 2, noClientes: 0, pct: 0 });
    expect(bancarizacion(conLuciaPostulando(), data)).toEqual({ total: 3, noClientes: 1, pct: 33 });
  });

  it('el marketplace refleja lo que publicó Carmen', () => {
    const s = reducer(inicial(), {
      tipo: 'publicar',
      datos: {
        tipo: 'Departamento',
        direccion: 'Nueva 1',
        distrito: 'Surquillo',
        dormitorios: 2,
        area: 70,
        renta: 1750,
      },
    });
    const carmen = propiedadesMarketplace(s, data).find((p) => p.id === s.inmueble.id);
    expect(carmen).toMatchObject({ direccion: 'Nueva 1', renta: 1750 });
  });
});
