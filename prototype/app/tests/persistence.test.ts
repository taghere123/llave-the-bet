import { afterEach, describe, expect, it, vi } from 'vitest';
import { cargar, esEstadoValido, guardar } from '../src/store/persistence';
import { CLAVE_STORAGE } from '../src/store/state';
import { conLuciaPostulando, inicial } from './helpers';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('persistence', () => {
  it('sin datos guardados usa el estado inicial', () => {
    expect(cargar(inicial)).toEqual(inicial());
  });

  it('guarda y recupera el estado', () => {
    const s = conLuciaPostulando();
    guardar(s);
    expect(cargar(inicial)).toEqual(s);
  });

  it('descarta JSON corrupto', () => {
    window.localStorage.setItem(CLAVE_STORAGE, '{no es json');
    expect(cargar(inicial)).toEqual(inicial());
  });

  it('descarta estados de otra versión o con forma inválida', () => {
    // Forma del prototipo legado (llave-demo-v1): sin version ni postulaciones.
    const legado = {
      inmueble: inicial().inmueble,
      publicado: true,
      aceptado: 'lucia',
      modalidad: 'cobro',
    };
    expect(esEstadoValido(legado)).toBe(false);
    const estadoRaro = {
      ...conLuciaPostulando(),
      postulaciones: [{ id: 'x', estado: 'hackeado' }],
    };
    window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(estadoRaro));
    expect(cargar(inicial)).toEqual(inicial());
  });

  it('si localStorage falla, la demo sigue en memoria', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('bloqueado');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('cuota');
    });
    expect(cargar(inicial)).toEqual(inicial());
    expect(() => guardar(inicial())).not.toThrow();
  });
});
