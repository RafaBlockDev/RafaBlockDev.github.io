import { describe, it, expect, vi, beforeEach } from 'vitest';

const initBoard = vi.fn((..._args: unknown[]) => ({ id: 'board' }));
vi.mock('jsxgraph', () => ({
  default: { JSXGraph: { initBoard: (...args: unknown[]) => initBoard(...args) } }
}));

import {
  classifyDiscriminant,
  newtonRoot,
  COLORS,
  createBoard,
  addAxisLine,
  label,
  rootPoint,
  type JSXBoard
} from './jsxgraph-utils';

/** A fake board that records every create() call for assertions. */
function fakeBoard() {
  const create = vi.fn((...args: unknown[]) => ({ type: args[0] }));
  return { board: { create } as unknown as JSXBoard, create };
}

describe('COLORS', () => {
  it('exposes the ink and accent palette', () => {
    expect(COLORS.ink).toBe('#1a1a1a');
    expect(COLORS.accent).toBe('#003366');
  });
});

describe('classifyDiscriminant', () => {
  it('classifies a strictly positive discriminant as three distinct real roots', () => {
    expect(classifyDiscriminant(1)).toBe('Three distinct real roots');
    expect(classifyDiscriminant(1e-3)).toBe('Three distinct real roots');
  });

  it('classifies a strictly negative discriminant as one real root', () => {
    expect(classifyDiscriminant(-1)).toBe('One real root');
    expect(classifyDiscriminant(-1e-3)).toBe('One real root');
  });

  it('treats near-zero values within tolerance as a multiple root', () => {
    expect(classifyDiscriminant(0)).toBe('Multiple root');
    expect(classifyDiscriminant(1e-10)).toBe('Multiple root');
    expect(classifyDiscriminant(-1e-10)).toBe('Multiple root');
  });

  it('uses a 1e-9 tolerance boundary', () => {
    // just inside the tolerance -> multiple root
    expect(classifyDiscriminant(9e-10)).toBe('Multiple root');
    // just outside the tolerance -> classified by sign
    expect(classifyDiscriminant(2e-9)).toBe('Three distinct real roots');
    expect(classifyDiscriminant(-2e-9)).toBe('One real root');
  });
});

describe('newtonRoot', () => {
  it('converges to the real root of a monotonic cubic', () => {
    // f(x) = x^3 + x - 1, single real root ~= 0.6823278
    const f = (x: number) => x ** 3 + x - 1;
    const fPrime = (x: number) => 3 * x ** 2 + 1;
    expect(newtonRoot(f, fPrime, 1)).toBeCloseTo(0.6823278, 6);
  });

  it('finds a root regardless of a reasonable starting guess', () => {
    const f = (x: number) => x ** 3 + x - 1;
    const fPrime = (x: number) => 3 * x ** 2 + 1;
    expect(newtonRoot(f, fPrime, -5)).toBeCloseTo(0.6823278, 6);
    expect(newtonRoot(f, fPrime, 10)).toBeCloseTo(0.6823278, 6);
  });

  it('solves a linear function exactly', () => {
    // 2x - 8 = 0 -> x = 4
    expect(newtonRoot((x) => 2 * x - 8, () => 2, 0)).toBeCloseTo(4, 9);
  });
});

describe('createBoard', () => {
  beforeEach(() => initBoard.mockClear());

  it('initialises a chrome-free, non-interactive board', () => {
    const board = createBoard('box', { boundingbox: [-2, 2, 2, -2] });
    expect(initBoard).toHaveBeenCalledTimes(1);
    const [containerId, opts] = initBoard.mock.calls[0] as unknown as [string, any];
    expect(containerId).toBe('box');
    expect(opts.boundingbox).toEqual([-2, 2, 2, -2]);
    expect(opts.axis).toBe(false);
    expect(opts.grid).toBe(false);
    expect(opts.showCopyright).toBe(false);
    expect(opts.showNavigation).toBe(false);
    expect(opts.pan).toEqual({ enabled: false });
    expect(opts.zoom).toMatchObject({ enabled: false, wheel: false });
    expect(board).toEqual({ id: 'board' });
  });
});

describe('addAxisLine', () => {
  it('creates a faint, tick-free axis in the given direction', () => {
    const { board, create } = fakeBoard();
    addAxisLine(board, [1, 0]);
    const [kind, points, opts] = create.mock.calls[0] as [string, unknown, any];
    expect(kind).toBe('axis');
    expect(points).toEqual([[0, 0], [1, 0]]);
    expect(opts.strokeColor).toBe(COLORS.ink);
    expect(opts.withLabel).toBe(false);
    expect(opts.ticks).toEqual({ visible: false });
  });
});

describe('label', () => {
  it('creates a fixed text element with sensible defaults', () => {
    const { board, create } = fakeBoard();
    label(board, 1, 2, 'x');
    const [kind, coords, opts] = create.mock.calls[0] as [string, unknown, any];
    expect(kind).toBe('text');
    expect(coords).toEqual([1, 2, 'x']);
    expect(opts.fixed).toBe(true);
    expect(opts.color).toBe(COLORS.ink);
    expect(opts.fontSize).toBe(12);
    expect(opts.anchorX).toBe('left');
  });

  it('applies caller-supplied overrides', () => {
    const { board, create } = fakeBoard();
    label(board, 0, 0, 'y', { color: '#fff', fontSize: 20, anchorX: 'right' });
    const opts = create.mock.calls[0][2] as any;
    expect(opts.color).toBe('#fff');
    expect(opts.fontSize).toBe(20);
    expect(opts.anchorX).toBe('right');
  });
});

describe('rootPoint', () => {
  it('defaults to a filled accent point on the x-axis', () => {
    const { board, create } = fakeBoard();
    rootPoint(board, 3);
    const [kind, coords, opts] = create.mock.calls[0] as [string, unknown, any];
    expect(kind).toBe('point');
    expect(coords).toEqual([3, 0]);
    expect(opts.fillColor).toBe(COLORS.accent);
    expect(opts.size).toBe(3);
    expect(opts.fixed).toBe(true);
  });

  it('renders a hollow point with a paper fill when requested', () => {
    const { board, create } = fakeBoard();
    rootPoint(board, -1, { hollow: true, size: 5 });
    const opts = create.mock.calls[0][2] as any;
    expect(opts.fillColor).toBe('#faf9f6');
    expect(opts.size).toBe(5);
  });
});
