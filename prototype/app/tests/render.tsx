import { act, render } from '@testing-library/react';
import { App } from '../src/App';
import { ProvidersProvider } from '../src/providers/ProvidersContext';
import { guardar } from '../src/store/persistence';
import type { DemoState } from '../src/store/state';
import { StoreProvider } from '../src/store/StoreContext';

/** Monta la app completa en la ruta indicada, opcionalmente con un estado guardado previo. */
export function renderApp(ruta = 'inicio', estado?: DemoState) {
  if (estado) guardar(estado);
  window.location.hash = '#/' + ruta;
  return render(
    <ProvidersProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ProvidersProvider>,
  );
}

/** Cambia la ruta y espera a que jsdom dispare hashchange. */
export async function navegar(ruta: string) {
  await act(async () => {
    window.location.hash = '#/' + ruta;
    await new Promise((r) => setTimeout(r, 0));
  });
}

/** Espera a que se procesen hashchange y efectos pendientes (tras un click en un enlace o un ir()). */
export async function esperar() {
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
}
