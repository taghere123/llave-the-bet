import { useEffect } from 'react';
import { Header, Pie, Progreso } from './components/Layout';
import { Avatar, indiceAvatar } from './components/ui';
import { iniciales } from './domain/format';
import { useProviders } from './providers/ProvidersContext';
import { parsear, useRuta, type Ruta } from './router';
import { PANTALLAS } from './screens/registry';
import type { Contexto, Pantalla } from './screens/types';
import { aplicante } from './store/selectors';
import { useStore } from './store/StoreContext';

const RUTA_INICIAL = 'inicio';

interface Resolucion {
  pantalla: Pantalla;
  ruta: Ruta;
  /** Ruta a la que se redirigió, si la pedida no existe o no aplica. */
  redirigida: string | null;
}

/** Resuelve la pantalla a mostrar. Rutas inexistentes o que no aplican redirigen (máximo 3 saltos). */
export function resolver(ruta: Ruta, ctx: Contexto): Resolucion {
  let actual: Ruta = ruta.nombre ? ruta : { nombre: RUTA_INICIAL };
  let redirigida: string | null = null;
  for (let salto = 0; salto < 3; salto++) {
    const pantalla = PANTALLAS[actual.nombre];
    const destino = pantalla ? (pantalla.guardia?.(ctx, actual.id) ?? null) : RUTA_INICIAL;
    if (pantalla && destino === null) return { pantalla, ruta: actual, redirigida };
    redirigida = destino ?? RUTA_INICIAL;
    actual = parsear('#/' + redirigida);
  }
  return {
    pantalla: PANTALLAS[RUTA_INICIAL] as Pantalla,
    ruta: { nombre: RUTA_INICIAL },
    redirigida: RUTA_INICIAL,
  };
}

function Cabecera({ pantalla, id }: { pantalla: Pantalla; id?: string }) {
  const { state } = useStore();
  const { data } = useProviders();
  if (pantalla.rol === 'postulante') {
    const a = aplicante(state, data, id);
    if (a) {
      return (
        <Header
          rol="postulante"
          etiqueta="Postulante"
          nombre={a.nombre}
          avatar={<Avatar nombre={a.nombre} indice={indiceAvatar(a.id)} clase="hd-av" />}
        />
      );
    }
  }
  if (pantalla.rol === 'inquilino') {
    const i = state.inquilino;
    const nombre = i ? `${i.nombre} ${i.apellido}` : 'Visitante';
    return (
      <Header
        rol="inquilino"
        etiqueta="Inquilino"
        nombre={nombre}
        avatar={
          <span className="hd-av" aria-hidden="true">
            {i ? iniciales(nombre) : '?'}
          </span>
        }
      />
    );
  }
  const propietaria = data.propietaria();
  return (
    <Header
      rol="propietaria"
      etiqueta="Propietaria"
      nombre={propietaria.nombre}
      avatar={
        <span className="hd-av" aria-hidden="true">
          {propietaria.nombre[0]}
        </span>
      }
    />
  );
}

export function App() {
  const ruta = useRuta();
  const { state, reiniciar } = useStore();
  const providers = useProviders();
  const { pantalla, ruta: efectiva, redirigida } = resolver(ruta, { state, providers });
  const { Componente } = pantalla;
  const clave = `${efectiva.nombre}/${efectiva.id ?? ''}`;

  useEffect(() => {
    if (redirigida) window.location.replace('#/' + redirigida);
  }, [redirigida]);

  // Al cambiar de pantalla: título, scroll arriba y foco en el H1 (accesibilidad, igual que el legado).
  useEffect(() => {
    document.title = 'LLAVE · ' + pantalla.titulo;
    window.scrollTo(0, 0);
    const h1 = document.querySelector<HTMLElement>('main h1');
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
    }
  }, [clave, pantalla.titulo]);

  return (
    <>
      <Cabecera pantalla={pantalla} id={efectiva.id} />
      <Progreso titulo={pantalla.titulo} paso={pantalla.paso} total={pantalla.total} />
      <main>
        <div className="stack-lg" key={clave}>
          <Componente id={efectiva.id} />
        </div>
      </main>
      <Pie
        onReiniciar={() => {
          reiniciar();
          window.location.hash = '#/' + RUTA_INICIAL;
        }}
      />
    </>
  );
}
