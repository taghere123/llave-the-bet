import { Bancarizacion } from '../../components/Bancarizacion';
import { DemoPrecarga } from '../../components/DemoPrecarga';
import { href, ir } from '../../router';
import { useStore } from '../../store/StoreContext';

/** Panel para el jurado: indicador de bancarización y controles que conectan los dos journeys. */
export function PanelDemo() {
  const { reiniciar } = useStore();
  return (
    <>
      <div className="stack">
        <span className="eye">Panel de demo</span>
        <h1 className="h1">
          Un inquilino, <b>dos journeys</b>
        </h1>
        <p className="body-sm muted">
          Lucía postula desde el marketplace y aparece en la bandeja de Carmen. Esta vista no es
          parte del producto.
        </p>
      </div>
      <div className="g2">
        <Bancarizacion />
        <DemoPrecarga />
      </div>
      <div className="acciones fila">
        <a className="btn" href={href('postulantes')} data-testid="panel-ir-propietaria-link">
          Ver la bandeja de Carmen
        </a>
        <a className="btn sec" href={href('marketplace')} data-testid="panel-ir-inquilino-link">
          Ver el marketplace
        </a>
        <button
          className="btn sec"
          type="button"
          onClick={() => {
            reiniciar();
            ir('demo');
          }}
          data-testid="panel-reiniciar-button"
        >
          Reiniciar demo
        </button>
      </div>
    </>
  );
}
