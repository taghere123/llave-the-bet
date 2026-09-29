import { CheckItem } from '../../components/Icon';
import { IluPoliza } from '../../components/Illustrations';
import { Badge, Sup } from '../../components/ui';
import { pct, primerNombre, soles } from '../../domain/format';
import { useProviders } from '../../providers/ProvidersContext';
import { href } from '../../router';
import { aplicante } from '../../store/selectors';
import { useStore } from '../../store/StoreContext';
import type { PropsPantalla } from '../types';

export function Poliza({ id }: PropsPantalla) {
  const { state } = useStore();
  const { data, score, payment } = useProviders();
  const a = aplicante(state, data, id);
  if (!a) return null;
  const renta = state.inmueble.renta;
  const pr = payment.prima(renta, score.evaluar(a.financiero, renta).banda);
  return (
    <div className="g2">
      <div className="stack">
        <IluPoliza />
        <Badge tono="info">Emisión simulada</Badge>
        <h1 className="h1">
          Tu inmueble queda protegido con <b>RentScore Seguro</b>
        </h1>
        <p className="body-sm muted">
          Seguro de hogar de Interseguro. Lo contrata y paga {primerNombre(a.nombre)}.
        </p>
      </div>
      <section className="card">
        <span className="eye">Tu póliza</span>
        <div className="kv">
          <span>Beneficiaria</span>
          <b>{data.propietaria().nombre} (tú)</b>
        </div>
        <div className="kv">
          <span>Paga</span>
          <b>{a.nombre}</b>
        </div>
        <div className="kv">
          <span>
            Prima ({pct(pr.tasa)} de la renta){' '}
            <Sup texto="Decisión 010: 2-5% de la renta. Escalonado por banda: supuesto del prototipo" />
          </span>
          <b>{soles(pr.monto)} al mes</b>
        </div>
        <div className="kv">
          <span>Costo para ti</span>
          <b>S/0</b>
        </div>
        <ul className="il sep">
          <CheckItem ok>Daños al inmueble</CheckItem>
          <CheckItem ok>Responsabilidad civil del inquilino</CheckItem>
          <CheckItem ok>
            Siniestro pagado en 15 días hábiles{' '}
            <Sup texto="Diseño del Big Idea, no validado con Interseguro" />
          </CheckItem>
          <CheckItem ok={false}>No cubre impago ni reemplaza la garantía</CheckItem>
        </ul>
        <a className="btn" href={href('cobro')} data-testid="poliza-elegir-cobro-link">
          Elegir cómo cobrar
        </a>
      </section>
    </div>
  );
}
