import { useProviders } from '../providers/ProvidersContext';
import { bancarizacion } from '../store/selectors';
import { useStore } from '../store/StoreContext';
import { Sup } from './ui';

/** Indicador de bancarización (HU-12): % de postulantes y leads que no son clientes de Interbank. */
export function Bancarizacion() {
  const { state } = useStore();
  const { data } = useProviders();
  const m = bancarizacion(state, data);
  return (
    <section className="card">
      <span className="eye">
        Postulantes nuevos para el banco{' '}
        <Sup texto="Métrica principal del flujo del inquilino, sobre datos ficticios. Sin línea base real" />
      </span>
      <span className="kpi" data-testid="bancarizacion-pct" aria-live="polite">
        {m.pct}%
      </span>
      <p className="body-sm" data-testid="bancarizacion-detalle">
        {m.noClientes} de {m.total} {m.total === 1 ? 'persona' : 'personas'} (postulantes y leads)
        no {m.noClientes === 1 ? 'es cliente' : 'son clientes'} de Interbank.
      </p>
    </section>
  );
}
