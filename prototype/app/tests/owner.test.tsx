// Paridad del journey de la propietaria (U2, RNF-11) frente al prototipo legado.
import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { esperar, navegar, renderApp } from './render';

const h1 = () => screen.getByRole('heading', { level: 1 });

describe('journey de la propietaria', () => {
  it('recorre publicar → postulantes → RentScore → póliza → cobro → confirmación', async () => {
    renderApp('inicio');
    expect(h1().textContent).toContain('Alquila sabiendo a quién');
    expect(screen.getByText('Paso 1 de 9')).toBeTruthy();

    await navegar('publicar');
    fireEvent.submit(screen.getByTestId('publicar-form'));
    await esperar();
    expect(window.location.hash).toBe('#/inmueble');
    expect(h1().textContent).toBe('Ya tienes 2 postulantes');

    await navegar('postulantes');
    expect(screen.getByTestId('postulante-card-jorge').textContent).toContain('56');
    expect(screen.getByTestId('postulante-card-kevin').textContent).toContain('Score bajo');

    await navegar('resultado/jorge');
    expect(document.title).toBe('LLAVE · RentScore');
    expect(screen.getByText('La renta supera su capacidad de pago en S/200 al mes.')).toBeTruthy();
    fireEvent.click(screen.getByTestId('resultado-aceptar-button'));
    await esperar();
    expect(window.location.hash).toBe('#/poliza/jorge');
    expect(screen.getByText('S/63 al mes')).toBeTruthy();

    await navegar('cobro');
    const confirmar = screen.getByTestId('cobro-confirmar-button') as HTMLButtonElement;
    expect(confirmar.disabled).toBe(true);
    expect(confirmar.textContent).toBe('Elige una opción');
    fireEvent.click(within(screen.getByTestId('cobro-opcion-cobro')).getByRole('radio'));
    expect(confirmar.textContent).toBe('Activar Cobro Garantizado');
    fireEvent.click(confirmar);
    await esperar();
    expect(window.location.hash).toBe('#/confirmacion');
    expect(h1().textContent).toBe('Recibirás S/1,710 cada mes, pase lo que pase');
    expect(screen.getByText('S/90 al mes')).toBeTruthy();
  });

  it('con score bajo avisa el riesgo y no ofrece modalidades garantizadas', async () => {
    renderApp('resultado/kevin');
    expect(screen.getByText(/Riesgo alto de impago/)).toBeTruthy();
    fireEvent.click(screen.getByTestId('resultado-aceptar-button'));
    await esperar();
    expect(screen.getByText('S/90 al mes')).toBeTruthy(); // prima 5%
    await navegar('cobro');
    expect(screen.getAllByText('No disponible')).toHaveLength(2);
  });

  it('la autorización del postulante usa la cabecera de postulante', () => {
    renderApp('consentimiento/jorge');
    expect(screen.getByTestId('header-rol').textContent).toContain('Jorge Salazar');
    expect(screen.getByRole('checkbox')).toHaveProperty('checked', true);
  });

  it('una ruta con postulante inexistente vuelve al inicio', async () => {
    renderApp('postulante/nadie');
    await esperar();
    expect(h1().textContent).toContain('Alquila sabiendo a quién');
    expect(window.location.hash).toBe('#/inicio');
  });

  it('el foco queda en el título al cambiar de pantalla', async () => {
    renderApp('inicio');
    await navegar('postulantes');
    expect(document.activeElement).toBe(h1());
  });
});
