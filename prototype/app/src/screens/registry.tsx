// Tabla de pantallas: ruta → título, paso, rol de cabecera y guardia.
import { aplicante, postulacionesDelInquilino, propiedad } from '../store/selectors';
import { PanelDemo } from './demo/PanelDemo';
import { Cobro, Confirmacion } from './owner/Cobro';
import { Inicio } from './owner/Inicio';
import { Inmueble } from './owner/Inmueble';
import { Poliza } from './owner/Poliza';
import { Publicar } from './owner/Publicar';
import { AutorizacionPostulante, DetallePostulante, ListaPostulantes } from './owner/Postulantes';
import { Resultado } from './owner/Resultado';
import { Autorizar } from './tenant/Autorizar';
import { Deudor } from './tenant/Deudor';
import { FichaPropiedad, Marketplace } from './tenant/Marketplace';
import { MiScore } from './tenant/MiScore';
import { MisPostulaciones } from './tenant/MisPostulaciones';
import { Postular } from './tenant/Postular';
import { Registro } from './tenant/Registro';
import { TOTAL_INQUILINO, TOTAL_PROPIETARIA, type Contexto, type Pantalla } from './types';

/** Rutas con id de postulante: si no existe, vuelven al inicio (igual que el legado). */
const requiereAplicante = ({ state, providers }: Contexto, id?: string) =>
  aplicante(state, providers.data, id) ? null : 'inicio';

const propietaria = (p: Omit<Pantalla, 'rol' | 'total'>): Pantalla => ({
  ...p,
  rol: 'propietaria',
  total: TOTAL_PROPIETARIA,
});

const inquilino = (p: Omit<Pantalla, 'rol' | 'total'>): Pantalla => ({
  ...p,
  rol: 'inquilino',
  total: TOTAL_INQUILINO,
});

// Guardias del journey del inquilino (U3, business-logic-model.md).
const requiereInquilino = ({ state }: Contexto) => (state.inquilino ? null : 'registro');
const requiereEvaluacion = (ctx: Contexto) =>
  requiereInquilino(ctx) ?? (ctx.state.evaluacion ? null : 'autorizar');
const existePropiedad = ({ state, providers }: Contexto, id?: string) =>
  propiedad(state, providers.data, id) ? null : 'marketplace';

export const PANTALLAS: Record<string, Pantalla> = {
  // ---------- Inquilino ----------
  marketplace: inquilino({ titulo: 'Marketplace', paso: 1, Componente: Marketplace }),
  propiedad: inquilino({
    titulo: 'Propiedad',
    paso: 2,
    Componente: FichaPropiedad,
    guardia: existePropiedad,
  }),
  registro: inquilino({ titulo: 'Registro', paso: 3, Componente: Registro }),
  autorizar: inquilino({
    titulo: 'Autorización',
    paso: 4,
    Componente: Autorizar,
    guardia: requiereInquilino,
  }),
  'mi-score': inquilino({
    titulo: 'Mi RentScore',
    paso: 5,
    Componente: MiScore,
    guardia: requiereEvaluacion,
  }),
  postular: inquilino({
    titulo: 'Postular',
    paso: 6,
    Componente: Postular,
    guardia: (ctx, id) => existePropiedad(ctx, id) ?? requiereEvaluacion(ctx),
  }),
  'mis-postulaciones': inquilino({
    titulo: 'Mis postulaciones',
    paso: 7,
    Componente: MisPostulaciones,
    guardia: requiereInquilino,
  }),
  deudor: inquilino({
    titulo: 'Qué significa para ti',
    paso: null,
    Componente: Deudor,
    guardia: (ctx, id) => {
      const p = postulacionesDelInquilino(ctx.state).find((x) => x.id === id);
      return p?.estado === 'aceptada' && ctx.state.evaluacion ? null : 'mis-postulaciones';
    },
  }),

  // ---------- Propietaria ----------
  inicio: propietaria({ titulo: 'Inicio', paso: 1, Componente: Inicio }),
  publicar: propietaria({ titulo: 'Publicar', paso: 2, Componente: Publicar }),
  inmueble: propietaria({ titulo: 'Mi inmueble', paso: 3, Componente: Inmueble }),
  postulantes: propietaria({ titulo: 'Postulantes', paso: 4, Componente: ListaPostulantes }),
  postulante: propietaria({
    titulo: 'Postulante',
    paso: 5,
    Componente: DetallePostulante,
    guardia: requiereAplicante,
  }),
  // ---------- Demo (U4) ----------
  demo: propietaria({ titulo: 'Panel de demo', paso: null, Componente: PanelDemo }),

  consentimiento: {
    titulo: 'Autorización',
    paso: null,
    total: TOTAL_PROPIETARIA,
    rol: 'postulante',
    Componente: AutorizacionPostulante,
    guardia: requiereAplicante,
  },
  resultado: propietaria({
    titulo: 'RentScore',
    paso: 6,
    Componente: Resultado,
    // Si el inquilino revocó el acceso, la propietaria ya no ve su score (BR-OW-09).
    guardia: (ctx, id) => {
      const a = aplicante(ctx.state, ctx.providers.data, id);
      if (!a) return 'inicio';
      return a.scoreCompartido ? null : `postulante/${a.id}`;
    },
  }),
  poliza: propietaria({
    titulo: 'Seguro',
    paso: 7,
    Componente: Poliza,
    guardia: requiereAplicante,
  }),
  cobro: propietaria({ titulo: 'Cómo cobrar', paso: 8, Componente: Cobro }),
  confirmacion: propietaria({ titulo: 'Listo', paso: 9, Componente: Confirmacion }),
};
