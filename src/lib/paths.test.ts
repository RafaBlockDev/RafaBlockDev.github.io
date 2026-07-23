import { describe, it, expect, vi, afterEach } from 'vitest';
import { withBase } from './paths';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('withBase', () => {
  it('joins a leading-slash path onto the configured base', () => {
    vi.stubEnv('BASE_URL', '/repo/');
    expect(withBase('/about')).toBe('/repo/about');
  });

  it('adds a missing leading slash to the path', () => {
    vi.stubEnv('BASE_URL', '/repo/');
    expect(withBase('about')).toBe('/repo/about');
  });

  it('strips exactly one trailing slash from the base', () => {
    vi.stubEnv('BASE_URL', '/repo/');
    expect(withBase('/x')).toBe('/repo/x');
  });

  it('works with a root base ("/")', () => {
    vi.stubEnv('BASE_URL', '/');
    expect(withBase('/about')).toBe('/about');
    expect(withBase('about')).toBe('/about');
  });

  it('works with an empty base', () => {
    vi.stubEnv('BASE_URL', '');
    expect(withBase('/about')).toBe('/about');
  });
});
