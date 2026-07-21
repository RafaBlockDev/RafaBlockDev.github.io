import JXG from 'jsxgraph';

// Kept in sync by hand with tailwind.config.mjs (paper / ink / accent).
export const COLORS = {
  ink: '#1a1a1a',
  accent: '#003366'
} as const;

// JSXGraph's TypeScript definitions ship as an ambient ("export =") global
// namespace, which is awkward to reference precisely from a module. Boards
// and the elements they create are typed loosely here on purpose: this file
// is thin, browser-only rendering glue, not domain logic.
export interface JSXBoard {
  create: (...args: any[]) => any;
  on: (event: string, handler: (...args: any[]) => void) => void;
  update: () => void;
  [key: string]: any;
}

interface BoardOptions {
  /** [left, top, right, bottom] in data units. */
  boundingbox: [number, number, number, number];
}

/**
 * Creates a board with the site's restrained, print-figure look: no grid,
 * no pan/zoom chrome, no JSXGraph copyright/navigation overlay. Resizing is
 * handled by JSXGraph's own throttled ResizeObserver (`resize`), which
 * redraws the existing board instead of recreating it.
 */
export function createBoard(containerId: string, { boundingbox }: BoardOptions): JSXBoard {
  // `zoom.enabled` is valid at runtime (see JSXGraph's options.js) but
  // missing from the community-maintained ZoomOptions type, hence the cast.
  return JXG.JSXGraph.initBoard(containerId, {
    boundingbox,
    axis: false,
    grid: false,
    keepaspectratio: false,
    showCopyright: false,
    showNavigation: false,
    pan: { enabled: false },
    zoom: { enabled: false, wheel: false } as JXG.ZoomOptions,
    resize: { enabled: true, throttle: 200 }
  }) as JSXBoard;
}

/** A single thin axis line through the origin, with no ticks or grid. */
export function addAxisLine(board: JSXBoard, direction: [number, number]): void {
  board.create('axis', [[0, 0], direction], {
    strokeColor: COLORS.ink,
    strokeOpacity: 0.45,
    strokeWidth: 1,
    highlight: false,
    ticks: { visible: false },
    withLabel: false
  });
}

interface LabelOptions {
  color?: string;
  fontSize?: number;
  anchorX?: 'left' | 'middle' | 'right';
}

/** A fixed, non-interactive text label (axis names, region names, etc.). */
export function label(board: JSXBoard, x: number, y: number, text: string, opts: LabelOptions = {}) {
  return board.create('text', [x, y, text], {
    fixed: true,
    highlight: false,
    color: opts.color ?? COLORS.ink,
    fontSize: opts.fontSize ?? 12,
    anchorX: opts.anchorX ?? 'left',
    cssStyle: 'font-family: "JetBrains Mono","Fira Code",ui-monospace,monospace;'
  });
}

/** A small fixed point marking a root on the x-axis, filled or hollow. */
export function rootPoint(board: JSXBoard, x: number, opts: { hollow?: boolean; size?: number } = {}) {
  const { hollow = false, size = 3 } = opts;
  return board.create('point', [x, 0], {
    name: '',
    size,
    strokeColor: COLORS.accent,
    strokeWidth: 2,
    fillColor: hollow ? '#faf9f6' : COLORS.accent,
    fixed: true,
    highlight: false,
    showInfobox: false
  });
}

/** Delta > 0 / = 0 / < 0 classification, shared by the static figures and
 *  the interactive discriminant plane. */
export function classifyDiscriminant(delta: number): string {
  if (Math.abs(delta) < 1e-9) return 'Multiple root';
  return delta > 0 ? 'Three distinct real roots' : 'One real root';
}

/** Newton's method for the unique real root of a strictly monotonic cubic. */
export function newtonRoot(f: (x: number) => number, fPrime: (x: number) => number, x0: number): number {
  let x = x0;
  for (let i = 0; i < 50; i++) {
    x = x - f(x) / fPrime(x);
  }
  return x;
}
