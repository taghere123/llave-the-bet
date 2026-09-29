// Ilustraciones SVG con los colores del design system (sin fotos ni archivos de imagen).
// Mismas composiciones que el prototipo legado.
import { TRAZOS, type NombreIcono } from './Icon';

type Token =
  | 'white'
  | 'ink'
  | 'azul-900'
  | 'azul-600'
  | 'sky-400'
  | 'sky-300'
  | 'green-500'
  | 'green-700'
  | 'yellow-400'
  | 'magenta-500';

const v = (t: Token) => `var(--${t})`;

/** Tesela con la forma firma: dos esquinas opuestas redondeadas. */
function Tesela({
  x,
  y,
  w,
  h,
  r,
  color,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  color: Token;
}) {
  const d =
    `M${x + r} ${y}H${x + w}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}` +
    `H${x}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
  return <path style={{ fill: v(color) }} d={d} />;
}

function Trazo({
  nombre,
  x,
  y,
  escala,
  color,
  ancho,
}: {
  nombre: NombreIcono;
  x: number;
  y: number;
  escala: number;
  color: Token;
  ancho: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${escala})`}
      fill="none"
      style={{ stroke: v(color) }}
      strokeWidth={ancho}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {TRAZOS[nombre]}
    </g>
  );
}

export function IluHero() {
  return (
    <svg className="hero-ilu" viewBox="0 0 232 192" aria-hidden="true">
      <Tesela x={0} y={0} w={112} h={92} r={28} color="azul-600" />
      <Trazo nombre="casa" x={32} y={22} escala={2} color="white" ancho={1.6} />
      <Tesela x={120} y={0} w={112} h={92} r={28} color="green-500" />
      <Trazo nombre="llave" x={152} y={22} escala={2} color="ink" ancho={1.6} />
      <Tesela x={0} y={100} w={112} h={92} r={28} color="yellow-400" />
      <Trazo nombre="score" x={32} y={122} escala={2} color="ink" ancho={1.6} />
      <Tesela x={120} y={100} w={112} h={92} r={28} color="sky-300" />
      <Trazo nombre="escudo" x={152} y={122} escala={2} color="ink" ancho={1.6} />
    </svg>
  );
}

// Paletas para variar las ilustraciones del marketplace sin salir de los tokens.
const PALETAS: { cielo: Token; torre: Token; frente: Token; sol: Token }[] = [
  { cielo: 'sky-300', torre: 'azul-900', frente: 'azul-600', sol: 'yellow-400' },
  { cielo: 'yellow-400', torre: 'azul-900', frente: 'green-700', sol: 'white' },
  { cielo: 'sky-400', torre: 'azul-600', frente: 'azul-900', sol: 'yellow-400' },
  { cielo: 'green-500', torre: 'azul-900', frente: 'azul-600', sol: 'yellow-400' },
];

export function IluEdificio({ variante = 0 }: { variante?: number }) {
  const p = PALETAS[Math.abs(variante) % PALETAS.length] ?? PALETAS[0]!;
  const ventanas = [];
  for (let f = 0; f < 4; f++)
    for (let c = 0; c < 3; c++)
      ventanas.push(
        <rect
          key={`v${f}-${c}`}
          x={84 + c * 30}
          y={84 + f * 24}
          width={18}
          height={14}
          style={{ fill: v('white') }}
          opacity={0.85}
        />,
      );
  const pisos = [];
  for (let g = 0; g < 6; g++)
    pisos.push(
      <rect
        key={`p${g}`}
        x={166}
        y={56 + g * 22}
        width={58}
        height={10}
        style={{ fill: v('sky-400') }}
      />,
    );
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width={320} height={200} style={{ fill: v(p.cielo) }} />
      <circle cx={268} cy={48} r={22} style={{ fill: v(p.sol) }} />
      <rect x={150} y={40} width={90} height={160} style={{ fill: v(p.torre) }} />
      <rect x={70} y={68} width={110} height={132} style={{ fill: v(p.frente) }} />
      {ventanas}
      {pisos}
      <rect x={113} y={176} width={24} height={24} style={{ fill: v('yellow-400') }} />
      <rect x={34} y={150} width={6} height={40} style={{ fill: v('ink') }} />
      <circle cx={37} cy={146} r={24} style={{ fill: v('green-500') }} />
      <rect x={276} y={160} width={6} height={30} style={{ fill: v('ink') }} />
      <circle cx={279} cy={156} r={18} style={{ fill: v('green-700') }} />
      <rect y={188} width={320} height={12} style={{ fill: v('green-700') }} />
    </svg>
  );
}

export function IluPoliza() {
  return (
    <svg className="ilu" viewBox="0 0 200 160" aria-hidden="true">
      <Tesela x={10} y={30} w={120} h={120} r={28} color="sky-300" />
      <Tesela x={140} y={6} w={56} h={48} r={16} color="yellow-400" />
      <Tesela x={146} y={108} w={50} h={44} r={16} color="green-500" />
      <path
        transform="translate(40 14) scale(5)"
        style={{ fill: v('azul-600') }}
        d="M12 2l9 3.5v6.5c0 5.5-3.8 9-9 10-5.2-1-9-4.5-9-10V5.5z"
      />
      <Trazo nombre="casa" x={76} y={52} escala={2} color="white" ancho={1.8} />
    </svg>
  );
}

export function IluCelular() {
  return (
    <svg className="ilu-sm" viewBox="0 0 120 120" aria-hidden="true">
      <Tesela x={4} y={24} w={104} h={90} r={24} color="sky-300" />
      <rect x={38} y={6} width={44} height={86} rx={8} style={{ fill: v('azul-900') }} />
      <rect x={42} y={16} width={36} height={64} rx={3} style={{ fill: v('white') }} />
      <g
        transform="translate(48 30)"
        fill="none"
        style={{ stroke: v('azul-600') }}
        strokeWidth={2}
        strokeLinecap="round"
      >
        <rect x={5} y={11} width={14} height={10} rx={2} />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </g>
      <circle cx={88} cy={88} r={15} style={{ fill: v('green-500') }} />
      <Trazo nombre="check" x={79} y={79} escala={0.75} color="ink" ancho={3} />
    </svg>
  );
}

export function IluListo() {
  return (
    <svg className="ilu" viewBox="0 0 200 160" aria-hidden="true">
      <Tesela x={8} y={12} w={56} h={46} r={16} color="sky-300" />
      <Tesela x={150} y={6} w={44} h={38} r={14} color="yellow-400" />
      <Tesela x={160} y={116} w={34} h={32} r={12} color="magenta-500" />
      <Tesela x={6} y={110} w={42} h={38} r={14} color="azul-600" />
      <circle cx={100} cy={82} r={50} style={{ fill: v('green-500') }} />
      <Trazo nombre="check" x={70} y={52} escala={2.5} color="ink" ancho={2} />
    </svg>
  );
}
