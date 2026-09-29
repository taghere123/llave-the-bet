import { PropertyCard } from '../../components/PropertyCard';
import { Badge } from '../../components/ui';
import { useProviders } from '../../providers/ProvidersContext';
import { href } from '../../router';
import { bandeja } from '../../store/selectors';
import { useStore } from '../../store/StoreContext';

export function Inmueble() {
  const { state } = useStore();
  const { data } = useProviders();
  const n = bandeja(state, data).length;
  return (
    <div className="g2">
      <div className="stack">
        <Badge tono="ok">Publicado</Badge>
        <h1 className="h1">
          Ya tienes <b>{n} postulantes</b>
        </h1>
        <p className="body-sm muted">Todos autorizaron que veas su RentScore al postular.</p>
        <div className="acciones">
          <a className="btn" href={href('postulantes')} data-testid="inmueble-ver-postulantes-link">
            Ver postulantes
          </a>
        </div>
      </div>
      <PropertyCard propiedad={state.inmueble} badge={<Badge tono="warn">Con postulantes</Badge>} />
    </div>
  );
}
