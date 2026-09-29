// Integración entre journeys (U4): US-C01 y US-C02.
import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { conLuciaPostulando } from './helpers';
import { esperar, navegar, renderApp } from './render';

const h1 = () => screen.getByRole('heading', { level: 1 });

describe('conexión de journeys', () => {
  it('la postulación de Lucía llega a Carmen, que la ve, la acepta con Cobro Garantizado y Lucía queda como deudora', async () => {
    renderApp('postulantes', conLuciaPostulando());
    const tarjeta = screen.getByTestId('postulante-card-marketplace');
    expect(tarjeta.textContent).toContain('Lucía');
    expect(tarjeta.textContent).toContain('Nuevo');
    expect(tarjeta.textContent).toContain('87');

    await navegar('postulante/p-1');
    expect(screen.getByText(/Con centrales de riesgo/)).toBeTruthy();
    await navegar('mis-postulaciones');
    expect(screen.getByTestId('postulacion-surquillo-01').textContent).toContain(
      'Vista por el propietario',
    );
    await navegar('postulantes');
    expect(screen.getByTestId('postulante-card-marketplace').textContent).not.toContain('Nuevo');

    await navegar('resultado/p-1');
    fireEvent.click(screen.getByTestId('resultado-aceptar-button'));
    await esperar();
    expect(screen.getByText('S/36 al mes')).toBeTruthy(); // prima 2% con score alto
    await navegar('cobro');
    fireEvent.click(within(screen.getByTestId('cobro-opcion-cobro')).getByRole('radio'));
    fireEvent.click(screen.getByTestId('cobro-confirmar-button'));
    await esperar();
    expect(h1().textContent).toBe('Recibirás S/1,746 cada mes, pase lo que pase');

    await navegar('mis-postulaciones');
    expect(screen.getByTestId('postulacion-surquillo-01').textContent).toContain('Aceptada');
    fireEvent.click(screen.getByTestId('postulacion-deudor-link'));
    await esperar();
    expect(screen.getByTestId('deudor-detalle').textContent).toContain(
      'Interbank le paga a Carmen',
    );
  });

  it('si Carmen acepta a otro postulante, Lucía ve su postulación como no seleccionada', async () => {
    renderApp('resultado/jorge', conLuciaPostulando());
    fireEvent.click(screen.getByTestId('resultado-aceptar-button'));
    await esperar();
    await navegar('mis-postulaciones');
    expect(screen.getByTestId('postulacion-surquillo-01').textContent).toContain('No seleccionada');
  });

  it('el panel de demo precarga a Lucía y el indicador de bancarización se mueve en vivo', async () => {
    renderApp('demo');
    expect(screen.getByTestId('bancarizacion-pct').textContent).toBe('0%');
    fireEvent.click(screen.getByTestId('demo-precargar-lucia-button'));
    expect(screen.getByTestId('bancarizacion-pct').textContent).toBe('33%');
    expect(screen.getByTestId('bancarizacion-detalle').textContent).toContain('1 de 3');
    expect((screen.getByTestId('demo-precargar-lucia-button') as HTMLButtonElement).disabled).toBe(
      true,
    );
    expect(screen.getByTestId('demo-precarga-estado').textContent).toContain(
      'ya está en la bandeja',
    );

    await navegar('postulantes');
    expect(screen.getAllByTestId(/^postulante-card-/)).toHaveLength(3);
  });

  it('la precarga desde la bandeja permite que el journey de Carmen funcione solo', () => {
    renderApp('postulantes');
    expect(screen.getAllByTestId(/^postulante-card-/)).toHaveLength(2);
    fireEvent.click(screen.getByTestId('demo-precargar-lucia-button'));
    expect(screen.getAllByTestId(/^postulante-card-/)).toHaveLength(3);
  });

  it('reiniciar la demo vuelve todo al estado inicial', async () => {
    renderApp('demo', conLuciaPostulando());
    expect(screen.getByTestId('bancarizacion-pct').textContent).toBe('33%');
    fireEvent.click(screen.getByTestId('footer-reiniciar-button'));
    await navegar('demo');
    expect(screen.getByTestId('bancarizacion-pct').textContent).toBe('0%');
  });
});
