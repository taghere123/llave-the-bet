import { Ico, type ColorIco, type NombreIcono } from '../../components/Icon';
import { IluHero } from '../../components/Illustrations';
import { Sup } from '../../components/ui';
import { useProviders } from '../../providers/ProvidersContext';
import { href } from '../../router';
import { useStore } from '../../store/StoreContext';

const PASOS: [NombreIcono, ColorIco, string][] = [
  ['casa', 'sky', 'Publica tu inmueble'],
  ['score', 'yel', 'Ve el RentScore de cada postulante'],
  ['escudo', 'grn', 'El inquilino asegura tu inmueble'],
  ['moneda', 'mag', 'Cobra garantizado o por adelantado'],
];

export function Inicio() {
  const { state } = useStore();
  const { data } = useProviders();
  const propietaria = data.propietaria();
  return (
    <>
      <section className="hero">
        <div className="hero-t">
          <span className="eye">Hola, {propietaria.nombre}</span>
          <h1 className="h1">
            Alquila sabiendo <b>a quién</b> y con la seguridad de <b>cobrar</b>
          </h1>
          <p>Evalúa a tus postulantes con datos de Interbank y recibe tu renta sin sorpresas.</p>
          {state.publicado ? (
            <a className="btn" href={href('inmueble')} data-testid="inicio-ver-inmueble-link">
              Ver mi inmueble
            </a>
          ) : (
            <a className="btn" href={href('publicar')} data-testid="inicio-publicar-link">
              Publicar inmueble
            </a>
          )}
        </div>
        <IluHero />
      </section>
      <section className="stack">
        <span className="eye">Cómo funciona</span>
        <div className="g4">
          {PASOS.map(([icono, color, texto], i) => (
            <div className="paso" key={texto}>
              <Ico nombre={icono} color={color} />
              <span className="caption">Paso {i + 1}</span>
              <b>{texto}</b>
            </div>
          ))}
        </div>
      </section>
      <div className="card flat persona">
        <span className="av av-0" aria-hidden="true">
          {propietaria.nombre[0]}
        </span>
        <span className="body-sm">
          <b>
            {propietaria.nombre}, {propietaria.edad}
          </b>{' '}
          · {state.inmueble.distrito}. Su último inquilino dejó de pagar cuatro meses.{' '}
          <Sup texto="Persona y escena ficticias, definidas para el prototipo" />
        </span>
      </div>
    </>
  );
}
