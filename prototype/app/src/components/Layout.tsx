// Cabecera (NavHeader), barra de progreso y pie. Mismo marcado de clases que el prototipo legado.
import type { ReactNode } from 'react';
import { href } from '../router';

export type Rol = 'propietaria' | 'postulante' | 'inquilino';

function Logo() {
  return (
    <a className="lg" href={href('inicio')} aria-label="LLAVE, inicio">
      <svg className="lg-m" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M10 0H32V22A10 10 0 0 1 22 32H0V10A10 10 0 0 1 10 0Z" fill="#05be50" />
        <circle cx="12" cy="16" r="5" fill="none" stroke="#0f191e" strokeWidth="2.5" />
        <path
          d="M17 16h9M22 16v4M25 16v3"
          fill="none"
          stroke="#0f191e"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      LLAVE
    </a>
  );
}

export function Header({
  rol,
  etiqueta,
  nombre,
  avatar,
}: {
  rol: Rol;
  etiqueta: string;
  nombre: string;
  avatar: ReactNode;
}) {
  const oscuro = rol !== 'propietaria';
  return (
    <header className={`hd${oscuro ? ' postulante' : ''}`}>
      <div className="hd-in">
        <Logo />
        <div className="hd-der">
          <a
            className="lk hd-cambio"
            href={href(rol === 'inquilino' ? 'inicio' : 'marketplace')}
            data-testid="header-cambiar-rol-link"
          >
            {rol === 'inquilino' ? 'Ver como propietaria' : 'Ver como inquilino'}
          </a>
          <div className="hd-rol" data-testid="header-rol">
            <span>
              {etiqueta}
              <b>{nombre}</b>
            </span>
            {avatar}
          </div>
        </div>
      </div>
    </header>
  );
}

export function Progreso({
  titulo,
  paso,
  total,
}: {
  titulo: string;
  paso: number | null;
  total: number;
}) {
  return (
    <div className="prog" aria-live="polite">
      {paso !== null && (
        <div className="prog-bar" aria-hidden="true">
          <i style={{ width: `${(paso / total) * 100}%` }} />
        </div>
      )}
      <div className="prog-t">
        <b>{titulo}</b>
        {paso !== null && (
          <span>
            Paso {paso} de {total}
          </span>
        )}
      </div>
    </div>
  );
}

export function Pie({ onReiniciar }: { onReiniciar: () => void }) {
  return (
    <footer className="pie">
      <span>LLAVE · Prototipo del Equipo 22</span>
      <span className="pie-acc">
        <a className="lk" href={href('demo')} data-testid="footer-demo-link">
          Panel de demo
        </a>
        <button
          className="lk"
          type="button"
          onClick={onReiniciar}
          data-testid="footer-reiniciar-button"
        >
          Reiniciar demo
        </button>
      </span>
    </footer>
  );
}
