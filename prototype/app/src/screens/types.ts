import type { ComponentType } from 'react';
import type { Rol } from '../components/Layout';
import type { Providers } from '../providers/types';
import type { DemoState } from '../store/state';

export interface Contexto {
  state: DemoState;
  providers: Providers;
}

export interface PropsPantalla {
  id?: string;
}

export interface Pantalla {
  titulo: string;
  /** Posición en el journey; null = fuera del flujo (sin barra de progreso). */
  paso: number | null;
  total: number;
  rol: Rol;
  Componente: ComponentType<PropsPantalla>;
  /** Devuelve la ruta (p. ej. "inicio" o "postulante/jorge") a la que redirigir, o null si se puede mostrar. */
  guardia?: (ctx: Contexto, id: string | undefined) => string | null;
}

export const TOTAL_PROPIETARIA = 9;
export const TOTAL_INQUILINO = 7;
