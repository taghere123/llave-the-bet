import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import { useProviders } from '../providers/ProvidersContext';
import { cargar, guardar } from './persistence';
import { reducer, type Accion } from './reducer';
import { estadoInicial, type DemoState } from './state';

interface StoreValue {
  state: DemoState;
  dispatch: Dispatch<Accion>;
  reiniciar: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const { data } = useProviders();
  const [state, dispatch] = useReducer(reducer, undefined, () => cargar(() => estadoInicial(data)));

  useEffect(() => {
    guardar(state);
  }, [state]);

  const value = useMemo<StoreValue>(
    () => ({
      state,
      dispatch,
      reiniciar: () => dispatch({ tipo: 'reiniciar', estado: estadoInicial(data) }),
    }),
    [state, data],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore debe usarse dentro de <StoreProvider>');
  return value;
}

/** Id único para postulaciones. */
export function nuevoId(prefijo: string): string {
  const aleatorio =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefijo}-${aleatorio}`;
}
