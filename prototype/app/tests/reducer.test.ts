import { describe, expect, it } from 'vitest';
import { puedeTransicionar, reducer } from '../src/store/reducer';
import { conLuciaPostulando, evaluacionLucia, FECHA, inicial, lucia, postulacion } from './helpers';

describe('reducer: journey de la propietaria', () => {
  it('publicar marca el inmueble y aplica la renta mínima de S/300', () => {
    const s = reducer(inicial(), {
      tipo: 'publicar',
      datos: {
        tipo: 'Casa',
        direccion: 'X 1',
        distrito: 'Lince',
        dormitorios: 3,
        area: 90,
        renta: 100,
      },
    });
    expect(s.publicado).toBe(true);
    expect(s.inmueble).toMatchObject({
      tipo: 'Casa',
      distrito: 'Lince',
      renta: 300,
      id: 'surquillo-01',
    });
  });

  it('aceptar a un postulante base deja no seleccionadas las postulaciones abiertas', () => {
    const s = reducer(conLuciaPostulando(), { tipo: 'aceptar', aplicanteId: 'jorge' });
    expect(s.aceptado).toBe('jorge');
    expect(s.postulaciones[0]?.estado).toBe('no_seleccionada');
  });

  it('aceptar a Lucía y elegir modalidad guarda la modalidad en su postulación', () => {
    let s = reducer(conLuciaPostulando(), { tipo: 'aceptar', aplicanteId: 'p-1' });
    s = reducer(s, { tipo: 'elegirModalidad', modalidad: 'cobro', fecha: FECHA });
    expect(s.postulaciones[0]).toMatchObject({ estado: 'aceptada', modalidad: 'cobro' });
    expect(s).toMatchObject({ modalidad: 'cobro', registrado: FECHA });
  });

  it('cambiar de opinión y aceptar a otro deja no seleccionada la aceptación anterior', () => {
    let s = reducer(conLuciaPostulando(), { tipo: 'aceptar', aplicanteId: 'p-1' });
    s = reducer(s, { tipo: 'aceptar', aplicanteId: 'kevin' });
    expect(s.postulaciones[0]).toMatchObject({ estado: 'no_seleccionada', modalidad: null });
  });
});

describe('reducer: journey del inquilino', () => {
  it('no se puede postular sin registro ni consentimiento', () => {
    const s0 = inicial();
    const p = postulacion('p-1', 'lince-01', '45872913');
    expect(reducer(s0, { tipo: 'enviarPostulacion', postulacion: p })).toBe(s0);
    const s1 = reducer(s0, { tipo: 'registrarInquilino', inquilino: lucia() });
    expect(reducer(s1, { tipo: 'enviarPostulacion', postulacion: p }).postulaciones).toHaveLength(
      0,
    );
    const s2 = reducer(s1, { tipo: 'darConsentimiento', evaluacion: evaluacionLucia() });
    expect(reducer(s2, { tipo: 'enviarPostulacion', postulacion: p }).postulaciones).toHaveLength(
      1,
    );
  });

  it('enviar una postulación limpia la propiedad pendiente', () => {
    let s = reducer(inicial(), { tipo: 'registrarInquilino', inquilino: lucia() });
    s = reducer(s, { tipo: 'fijarPendiente', propiedadId: 'lince-01' });
    s = reducer(s, { tipo: 'darConsentimiento', evaluacion: evaluacionLucia() });
    s = reducer(s, {
      tipo: 'enviarPostulacion',
      postulacion: postulacion('p-9', 'lince-01', lucia().dni),
    });
    expect(s.pendiente).toBeNull();
  });

  it('solo permite transiciones válidas de estado', () => {
    expect(puedeTransicionar('enviada', 'vista')).toBe(true);
    expect(puedeTransicionar('vista', 'retirada')).toBe(true);
    expect(puedeTransicionar('aceptada', 'retirada')).toBe(false);
    expect(puedeTransicionar('retirada', 'enviada')).toBe(false);

    let s = reducer(conLuciaPostulando(), {
      tipo: 'cambiarEstado',
      postulacionId: 'p-1',
      estado: 'retirada',
    });
    expect(s.postulaciones[0]?.estado).toBe('retirada');
    const s2 = reducer(s, { tipo: 'cambiarEstado', postulacionId: 'p-1', estado: 'vista' });
    expect(s2).toBe(s);
    s = reducer(s, { tipo: 'revocarAcceso', postulacionId: 'p-1' });
    expect(s.postulaciones[0]?.scoreCompartido).toBe(true); // una retirada ya no se toca
  });

  it('revocar el acceso deja de compartir el score', () => {
    const s = reducer(conLuciaPostulando(), { tipo: 'revocarAcceso', postulacionId: 'p-1' });
    expect(s.postulaciones[0]?.scoreCompartido).toBe(false);
  });

  it('simular aceptación en el inmueble de Carmen la acepta con modalidad', () => {
    const s = reducer(conLuciaPostulando(), {
      tipo: 'simularAceptacion',
      postulacionId: 'p-1',
      modalidad: 'adelanto',
      fecha: FECHA,
    });
    expect(s).toMatchObject({ aceptado: 'p-1', modalidad: 'adelanto' });
    expect(s.postulaciones[0]).toMatchObject({ estado: 'aceptada', modalidad: 'adelanto' });
  });

  it('simular aceptación en otra propiedad no toca la bandeja de Carmen', () => {
    const base = conLuciaPostulando();
    const s0 = { ...base, postulaciones: [postulacion('p-2', 'lince-01', lucia().dni)] };
    const s = reducer(s0, {
      tipo: 'simularAceptacion',
      postulacionId: 'p-2',
      modalidad: 'cobro',
      fecha: FECHA,
    });
    expect(s.aceptado).toBeNull();
    expect(s.postulaciones[0]).toMatchObject({ estado: 'aceptada', modalidad: 'cobro' });
  });
});

describe('reducer: controles de demo', () => {
  it('precargar a Lucía es idempotente', () => {
    const s0 = inicial();
    const accion = {
      tipo: 'precargarDemo' as const,
      inquilino: lucia(),
      evaluacion: evaluacionLucia(),
      postulacion: postulacion('p-1', s0.inmueble.id, lucia().dni),
    };
    const s1 = reducer(s0, accion);
    const s2 = reducer(s1, {
      ...accion,
      postulacion: postulacion('p-2', s0.inmueble.id, lucia().dni),
    });
    expect(s1.postulaciones).toHaveLength(1);
    expect(s2.postulaciones).toHaveLength(1);
  });

  it('no precarga a Lucía si ya hay otro inquilino registrado', () => {
    const otro = { ...lucia(), dni: '12345678' };
    const s0 = reducer(inicial(), { tipo: 'registrarInquilino', inquilino: otro });
    const s1 = reducer(s0, {
      tipo: 'precargarDemo',
      inquilino: lucia(),
      evaluacion: evaluacionLucia(),
      postulacion: postulacion('p-1', s0.inmueble.id, lucia().dni),
    });
    expect(s1).toBe(s0);
  });

  it('reiniciar vuelve al estado indicado', () => {
    const s = reducer(conLuciaPostulando(), { tipo: 'reiniciar', estado: inicial() });
    expect(s).toEqual(inicial());
  });
});
