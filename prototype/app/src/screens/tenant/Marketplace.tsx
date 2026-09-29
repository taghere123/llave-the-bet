import { useState } from 'react';
import { PropertyCard } from '../../components/PropertyCard';
import { Badge, Sup } from '../../components/ui';
import { soles } from '../../domain/format';
import type { Propiedad } from '../../domain/types';
import { useProviders } from '../../providers/ProvidersContext';
import { href, ir } from '../../router';
import {
  postulacionActiva,
  postulacionesDelInquilino,
  propiedad,
  propiedadesMarketplace,
} from '../../store/selectors';
import { useStore } from '../../store/StoreContext';
import type { PropsPantalla } from '../types';

const RANGOS = {
  todas: { etiqueta: 'Todas', cumple: () => true },
  hasta1500: { etiqueta: 'Hasta S/1,500', cumple: (r: number) => r <= 1500 },
  '1500a2000': { etiqueta: 'S/1,500 a S/2,000', cumple: (r: number) => r > 1500 && r <= 2000 },
  mas2000: { etiqueta: 'Más de S/2,000', cumple: (r: number) => r > 2000 },
} as const;
type Rango = keyof typeof RANGOS;

function filtrar(lista: Propiedad[], distrito: string, rango: Rango): Propiedad[] {
  return lista.filter(
    (p) => (!distrito || p.distrito === distrito) && RANGOS[rango].cumple(p.renta),
  );
}

export function Marketplace() {
  const { state } = useStore();
  const { data } = useProviders();
  const [distrito, setDistrito] = useState('');
  const [rango, setRango] = useState<Rango>('todas');
  const todas = propiedadesMarketplace(state, data);
  const distritos = [...new Set(todas.map((p) => p.distrito))].sort((a, b) =>
    a.localeCompare(b, 'es'),
  );
  const lista = filtrar(todas, distrito, rango);
  const mias = postulacionesDelInquilino(state).length;

  return (
    <>
      <div className="stack">
        <span className="eye">Marketplace LLAVE</span>
        <h1 className="h1">
          Encuentra dónde <b>vivir</b> en Lima Moderna
        </h1>
        <p className="body-sm muted">
          Mira sin registrarte. Postula con tu RentScore: el propietario ve que eres confiable.
        </p>
        {state.inquilino && (
          <div className="row">
            <a className="lk" href={href('mis-postulaciones')}>
              Mis postulaciones ({mias}) <span className="chev" />
            </a>
            {state.evaluacion && (
              <a className="lk" href={href('mi-score')}>
                Mi RentScore <span className="chev" />
              </a>
            )}
          </div>
        )}
      </div>
      <form
        className="card flat filtros"
        role="search"
        aria-label="Filtrar propiedades"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="field">
          <label htmlFor="m-dist">Distrito</label>
          <select
            id="m-dist"
            value={distrito}
            onChange={(e) => setDistrito(e.target.value)}
            data-testid="marketplace-distrito-select"
          >
            <option value="">Todos</option>
            {distritos.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="m-renta">Renta mensual</label>
          <select
            id="m-renta"
            value={rango}
            onChange={(e) => setRango(e.target.value as Rango)}
            data-testid="marketplace-renta-select"
          >
            {(Object.keys(RANGOS) as Rango[]).map((k) => (
              <option key={k} value={k}>
                {RANGOS[k].etiqueta}
              </option>
            ))}
          </select>
        </div>
        <p className="caption" aria-live="polite" data-testid="marketplace-conteo">
          {lista.length} {lista.length === 1 ? 'propiedad' : 'propiedades'}
        </p>
        <div className="acc">
          <button
            className="lk"
            type="button"
            onClick={() => {
              setDistrito('');
              setRango('todas');
            }}
            data-testid="marketplace-limpiar-button"
          >
            Limpiar filtros
          </button>
        </div>
      </form>
      {lista.length === 0 ? (
        <div className="card flat vacio">
          <p className="body-sm">No hay propiedades con esos filtros.</p>
        </div>
      ) : (
        <div className="g3">
          {lista.map((p) => (
            <PropertyCard
              key={p.id}
              propiedad={p}
              variante={todas.indexOf(p)}
              href={href('propiedad', p.id)}
              testId={`marketplace-card-${p.id}`}
              badge={
                postulacionActiva(state, p.id) ? (
                  <Badge tono="info">Ya postulaste</Badge>
                ) : undefined
              }
            />
          ))}
        </div>
      )}
    </>
  );
}

export function FichaPropiedad({ id }: PropsPantalla) {
  const { state, dispatch } = useStore();
  const { data, payment } = useProviders();
  const p = propiedad(state, data, id);
  if (!p) return null;
  const variante = propiedadesMarketplace(state, data).findIndex((x) => x.id === p.id);
  const seguro = payment.rangoSeguro(p.renta);
  const activa = postulacionActiva(state, p.id);

  // Los datos se piden en el primer "Postular", nunca antes (BR-TN-03).
  function postular() {
    if (!p) return;
    if (!state.inquilino) {
      dispatch({ tipo: 'fijarPendiente', propiedadId: p.id });
      ir('registro');
    } else if (!state.evaluacion) {
      dispatch({ tipo: 'fijarPendiente', propiedadId: p.id });
      ir('autorizar');
    } else {
      ir('postular', p.id);
    }
  }

  return (
    <>
      <a className="lk" href={href('marketplace')}>
        Volver a las propiedades
      </a>
      <div className="g2">
        <PropertyCard propiedad={p} variante={variante} />
        <div className="stack">
          <span className="eye">
            {p.tipo} en {p.distrito}
          </span>
          <h1 className="h1">{p.direccion}</h1>
          <p className="body-sm">{p.descripcion}</p>
          <dl className="dl">
            <dt>Dirección aproximada</dt>
            <dd>
              {p.direccion}, {p.distrito}
            </dd>
            <dt>Dormitorios</dt>
            <dd>{p.dormitorios}</dd>
            <dt>Área</dt>
            <dd>{p.area} m²</dd>
            <dt>Renta</dt>
            <dd>{soles(p.renta)} al mes</dd>
          </dl>
          <section className="card flat">
            <span className="eye">Si te aceptan</span>
            <div className="kv">
              <span>
                Seguro de hogar que pagas{' '}
                <Sup texto="Decisión 010: 2-5% de la renta. Falta tarificar con Interseguro" />
              </span>
              <b data-testid="propiedad-seguro-rango">
                {soles(seguro.min)} a {soles(seguro.max)} al mes
              </b>
            </div>
            <p className="caption">Protege el inmueble de daños. No reemplaza la garantía.</p>
          </section>
          <p className="nota">Postula con tu RentScore. El propietario ve que eres confiable.</p>
          {activa && (
            <p className="caption">
              Ya postulaste a esta propiedad.{' '}
              <a className="lk" href={href('mis-postulaciones')}>
                Ver mis postulaciones
              </a>
            </p>
          )}
          <button
            className="btn"
            type="button"
            onClick={postular}
            data-testid="propiedad-postular-button"
          >
            Postular
          </button>
        </div>
      </div>
    </>
  );
}
