export const SITE = {
  url: 'https://rafablockdev.github.io',
  name: 'Rafael Fuentes Rangel',
  shortName: 'rafael fuentes',
  title: 'Rafael Fuentes Rangel · Software Engineer, ML/AI',
  description:
    'Personal website of Rafael Fuentes Rangel, a software engineer working in ML/AI. Research notes, engineering projects, and a working notebook.',
  author: 'Rafael Fuentes Rangel',
  locale: 'en_US'
} as const;

export const SOCIAL = {
  github: 'https://github.com/RafaBlockDev',
  x: 'https://x.com/Rafael41603219',
  email: 'rafafuentesrangel@gmail.com'
  // linkedin: intentionally absent until a real profile URL is provided
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/research/', label: 'Research' },
  { href: '/projects/', label: 'Projects' },
  { href: '/notebook/', label: 'Notebook' },
  { href: '/about/', label: 'About' }
] as const;

export type ResearchStatus =
  | 'published'
  | 'preprint'
  | 'technical-note'
  | 'expository-note'
  | 'work-in-progress'
  | 'notebook-entry';

export const RESEARCH_STATUS_LABELS: Record<ResearchStatus, string> = {
  published: 'Published',
  preprint: 'Preprint',
  'technical-note': 'Technical note',
  'expository-note': 'Expository note',
  'work-in-progress': 'Work in progress',
  'notebook-entry': 'Notebook entry'
};

// timeZone UTC: frontmatter dates parse as UTC midnight, so local-time
// formatting would render them one day early in western time zones.
export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC'
});
