// Hash router mínimo. Conserva las URLs #/... del prototipo legado y funciona en hosting
// estático sin rewrites. Formato: #/nombre o #/nombre/id.
import { useSyncExternalStore } from 'react';

export interface Ruta {
  nombre: string;
  id?: string;
}

export function parsear(hash: string): Ruta {
  const [nombre = '', id] = hash.replace(/^#\/?/, '').split('/');
  return id ? { nombre: decodeURIComponent(nombre), id: decodeURIComponent(id) } : { nombre };
}

function suscribir(cb: () => void) {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
}

const leerHash = () => window.location.hash;

export function useRuta(): Ruta {
  const hash = useSyncExternalStore(suscribir, leerHash, () => '');
  return parsear(hash);
}

export function href(nombre: string, id?: string): string {
  return '#/' + encodeURIComponent(nombre) + (id ? '/' + encodeURIComponent(id) : '');
}

export function ir(nombre: string, id?: string): void {
  window.location.hash = href(nombre, id);
}
