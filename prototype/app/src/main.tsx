import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProvidersProvider } from './providers/ProvidersContext';
import { StoreProvider, useStore } from './store/StoreContext';
import './styles/base.css';
import './styles/app.css';

function Raiz() {
  const { reiniciar } = useStore();
  return (
    <ErrorBoundary onReiniciar={reiniciar}>
      <App />
    </ErrorBoundary>
  );
}

const contenedor = document.getElementById('root');
if (!contenedor) throw new Error('Falta el elemento #root en index.html');

createRoot(contenedor).render(
  <StrictMode>
    <ProvidersProvider>
      <StoreProvider>
        <Raiz />
      </StoreProvider>
    </ProvidersProvider>
  </StrictMode>,
);
