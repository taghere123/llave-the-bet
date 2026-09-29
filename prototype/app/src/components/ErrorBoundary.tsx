import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  onReiniciar: () => void;
  children: ReactNode;
}

/** Manejador global: muestra un mensaje genérico, sin detalles internos, y permite reiniciar la demo. */
export class ErrorBoundary extends Component<Props, { error: boolean }> {
  state = { error: false };

  static getDerivedStateFromError() {
    return { error: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Prototipo sin backend: el detalle queda solo en la consola del navegador.
    console.error('Error no controlado en la demo', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main>
        <div className="narrow stack-lg center" role="alert">
          <h1 className="h1">Algo salió mal en la demo</h1>
          <p className="body-sm muted">Reinicia la demo para volver al estado inicial.</p>
          <button
            className="btn"
            type="button"
            data-testid="error-reiniciar-button"
            onClick={() => {
              this.props.onReiniciar();
              this.setState({ error: false });
              window.location.hash = '#/inicio';
            }}
          >
            Reiniciar demo
          </button>
        </div>
      </main>
    );
  }
}
