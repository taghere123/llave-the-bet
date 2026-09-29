// Journey del inquilino (U3): US-I01..US-I10.
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { cargar } from '../src/store/persistence';
import { conLuciaPostulando, inicial } from './helpers';
import { esperar, navegar, renderApp } from './render';

const h1 = () => screen.getByRole('heading', { level: 1 });
const estadoGuardado = () => cargar(inicial);

describe('journey del inquilino', () => {
  it('Lucía navega sin registro, se registra al postular, autoriza, ve su score y postula', async () => {
    renderApp('marketplace');
    expect(screen.getByTestId('header-rol').textContent).toContain('Visitante');
    expect(screen.getAllByTestId(/^marketplace-card-/)).toHaveLength(9);

    fireEvent.change(screen.getByTestId('marketplace-distrito-select'), {
      target: { value: 'Surquillo' },
    });
    expect(screen.getAllByTestId(/^marketplace-card-/)).toHaveLength(1);
    expect(screen.getByTestId('marketplace-conteo').textContent).toBe('1 propiedad');

    await navegar('propiedad/surquillo-01');
    expect(screen.getByTestId('propiedad-seguro-rango').textContent).toBe('S/36 a S/90 al mes');
    fireEvent.click(screen.getByTestId('propiedad-postular-button'));
    await esperar();
    expect(window.location.hash).toBe('#/registro');

    // Validación: sin datos marca todos los errores y enfoca el primero.
    fireEvent.submit(screen.getByTestId('registro-form'));
    expect(document.activeElement).toBe(screen.getByTestId('registro-nombre-input'));
    expect(screen.getByTestId('registro-dni-input').getAttribute('aria-invalid')).toBe('true');

    const escribir = (campo: string, valor: string) =>
      fireEvent.change(screen.getByTestId(`registro-${campo}-input`), { target: { value: valor } });
    escribir('nombre', 'Lucía');
    escribir('apellido', 'Paredes');
    escribir('dni', '45872913');
    escribir('celular', '987654321');
    escribir('email', 'lucia.paredes@example.com');
    fireEvent.submit(screen.getByTestId('registro-form'));
    await esperar();

    fireEvent.change(screen.getByTestId('registro-codigo-input'), { target: { value: '12' } });
    fireEvent.click(screen.getByTestId('registro-verificar-button'));
    expect(screen.getByText('El código tiene 6 dígitos.')).toBeTruthy();
    fireEvent.change(screen.getByTestId('registro-codigo-input'), { target: { value: '123456' } });
    fireEvent.click(screen.getByTestId('registro-verificar-button'));
    await esperar();
    expect(window.location.hash).toBe('#/autorizar');
    expect(screen.getByTestId('header-rol').textContent).toContain('Lucía Paredes');

    // Primera capa del consentimiento: casilla sin marcar y botón deshabilitado.
    const autorizar = screen.getByTestId('autorizar-submit-button') as HTMLButtonElement;
    expect((screen.getByTestId('autorizar-checkbox') as HTMLInputElement).checked).toBe(false);
    expect(autorizar.disabled).toBe(true);
    expect(screen.getByText(/consultando centrales de riesgo/)).toBeTruthy();
    fireEvent.click(screen.getByTestId('autorizar-checkbox'));
    fireEvent.click(autorizar);
    await esperar();

    expect(window.location.hash).toBe('#/mi-score');
    expect(h1().textContent).toBe('Tu RentScore es 87');
    expect(screen.getByText('Centrales de riesgo')).toBeTruthy();
    const consejos = screen.getByTestId('mi-score-consejos').querySelectorAll('li');
    expect(consejos.length).toBeGreaterThanOrEqual(2);
    expect(consejos.length).toBeLessThanOrEqual(3);

    await navegar('postular/surquillo-01');
    const enviar = screen.getByTestId('postular-submit-button') as HTMLButtonElement;
    expect(enviar.disabled).toBe(true);
    expect(screen.getByText('Autorizo compartir mi RentScore con Carmen.')).toBeTruthy();
    fireEvent.click(screen.getByTestId('postular-compartir-checkbox'));
    fireEvent.click(enviar);
    await esperar();

    expect(window.location.hash).toBe('#/mis-postulaciones');
    expect(screen.getByTestId('postulacion-surquillo-01').textContent).toContain('Enviada');
    const s = estadoGuardado();
    expect(s.inquilino).toMatchObject({ dni: '45872913', esClienteInterbank: false });
    expect(s.evaluacion?.fuente).toBe('central');
    expect(s.pendiente).toBeNull();
  });

  it('un inquilino ya registrado postula sin repetir datos ni consentimiento general', async () => {
    renderApp('propiedad/lince-01', conLuciaPostulando());
    fireEvent.click(screen.getByTestId('propiedad-postular-button'));
    await esperar();
    expect(window.location.hash).toBe('#/postular/lince-01');
  });

  it('una renta mayor a la cuota segura avisa pero no bloquea', () => {
    renderApp('postular/miraflores-01', conLuciaPostulando());
    expect(screen.getByText(/supera tu cuota segura en S\/550 al mes/)).toBeTruthy();
    fireEvent.click(screen.getByTestId('postular-compartir-checkbox'));
    expect((screen.getByTestId('postular-submit-button') as HTMLButtonElement).disabled).toBe(
      false,
    );
  });

  it('revocar el acceso oculta el score a la propietaria y retirar la saca de la bandeja', async () => {
    renderApp('mis-postulaciones', conLuciaPostulando());
    fireEvent.click(screen.getByTestId('postulacion-revocar-button'));
    expect(screen.getByTestId('postulacion-surquillo-01').textContent).toContain(
      'Score no compartido',
    );

    await navegar('resultado/p-1');
    await esperar();
    expect(window.location.hash).toBe('#/postulante/p-1');
    expect(screen.getByTestId('postulante-score-revocado')).toBeTruthy();

    await navegar('mis-postulaciones');
    fireEvent.click(screen.getByTestId('postulacion-retirar-button'));
    expect(screen.getByTestId('postulacion-surquillo-01').textContent).toContain('Retirada');
    await navegar('postulantes');
    expect(screen.queryByTestId('postulante-card-marketplace')).toBeNull();
  });

  it('aceptada con Cobro Garantizado explica que el inquilino es el deudor', async () => {
    renderApp('mis-postulaciones', conLuciaPostulando());
    fireEvent.click(screen.getByTestId('demo-simular-aceptada-button'));
    expect(screen.getByTestId('postulacion-surquillo-01').textContent).toContain('Aceptada');
    fireEvent.click(screen.getByTestId('postulacion-deudor-link'));
    await esperar();
    expect(h1().textContent).toBe('Figurarás como deudor de un préstamo de consumo');
    expect(screen.getByTestId('deudor-detalle').textContent).toContain('S/1,746 cada mes');
    expect(screen.getByText(/centrales de riesgo a tu nombre/)).toBeTruthy();
  });

  it('las guardias llevan al paso que falta', async () => {
    renderApp('mi-score');
    await esperar();
    expect(window.location.hash).toBe('#/registro');
    await navegar('propiedad/no-existe');
    await esperar();
    expect(window.location.hash).toBe('#/marketplace');
  });
});
