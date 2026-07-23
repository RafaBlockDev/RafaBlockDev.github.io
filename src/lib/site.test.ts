import { describe, it, expect } from 'vitest';
import {
  SITE,
  SOCIAL,
  NAV,
  RESEARCH_STATUS_LABELS,
  dateFormatter,
  type ResearchStatus
} from './site';

describe('SITE', () => {
  it('exposes the canonical https site URL without a trailing slash', () => {
    expect(SITE.url).toBe('https://rafablockdev.github.io');
    expect(SITE.url.endsWith('/')).toBe(false);
  });

  it('carries author and locale metadata', () => {
    expect(SITE.author).toBe('Rafael Fuentes Rangel');
    expect(SITE.locale).toBe('en_US');
  });
});

describe('SOCIAL', () => {
  it('links github and x and exposes a contact email', () => {
    expect(SOCIAL.github).toBe('https://github.com/RafaBlockDev');
    expect(SOCIAL.x).toContain('x.com');
    expect(SOCIAL.email).toContain('@');
  });

  it('intentionally omits linkedin', () => {
    expect('linkedin' in SOCIAL).toBe(false);
  });
});

describe('NAV', () => {
  it('starts at Home and links every top-level section', () => {
    expect(NAV[0]).toEqual({ href: '/', label: 'Home' });
    expect(NAV.map((n) => n.label)).toEqual([
      'Home',
      'Research',
      'Projects',
      'Notebook',
      'About'
    ]);
  });

  it('uses trailing-slash hrefs for non-root entries', () => {
    for (const item of NAV.filter((n) => n.href !== '/')) {
      expect(item.href.startsWith('/')).toBe(true);
      expect(item.href.endsWith('/')).toBe(true);
    }
  });
});

describe('RESEARCH_STATUS_LABELS', () => {
  it('provides a human label for every research status', () => {
    const statuses: ResearchStatus[] = [
      'published',
      'preprint',
      'technical-note',
      'expository-note',
      'work-in-progress',
      'notebook-entry'
    ];
    for (const status of statuses) {
      expect(RESEARCH_STATUS_LABELS[status]).toBeTruthy();
    }
    expect(RESEARCH_STATUS_LABELS.published).toBe('Published');
    expect(RESEARCH_STATUS_LABELS['work-in-progress']).toBe('Work in progress');
  });
});

describe('dateFormatter', () => {
  it('formats frontmatter dates in UTC to avoid off-by-one days', () => {
    // UTC midnight; a western timezone would otherwise render Jan 1.
    expect(dateFormatter.format(new Date('2024-01-02T00:00:00Z'))).toBe('Jan 2, 2024');
  });

  it('uses a short month, numeric day, and numeric year', () => {
    expect(dateFormatter.format(new Date('2023-12-25T00:00:00Z'))).toBe('Dec 25, 2023');
  });
});
