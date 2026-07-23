import { describe, it, expect } from 'vitest';
import {
  personJsonLd,
  websiteJsonLd,
  profilePageJsonLd,
  articleJsonLd,
  softwareJsonLd,
  breadcrumbJsonLd
} from './jsonld';
import { SITE, SOCIAL } from './site';

describe('personJsonLd', () => {
  it('describes the site owner as a Person with schema.org context', () => {
    const result = personJsonLd();
    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('Person');
    expect(result.name).toBe(SITE.name);
    expect(result.url).toBe(SITE.url);
    expect(result.jobTitle).toBe('Software Engineer');
  });

  it('prefixes the email with mailto: and links social profiles', () => {
    const result = personJsonLd();
    expect(result.email).toBe(`mailto:${SOCIAL.email}`);
    expect(result.sameAs).toEqual([SOCIAL.github, SOCIAL.x]);
  });
});

describe('websiteJsonLd', () => {
  it('describes a WebSite authored by the site owner', () => {
    const result = websiteJsonLd();
    expect(result['@type']).toBe('WebSite');
    expect(result.name).toBe(SITE.name);
    expect(result.url).toBe(SITE.url);
    expect(result.author).toEqual({ '@type': 'Person', name: SITE.name });
  });
});

describe('profilePageJsonLd', () => {
  it('wraps the person node as the main entity of a ProfilePage', () => {
    const result = profilePageJsonLd();
    expect(result['@type']).toBe('ProfilePage');
    expect(result.mainEntity).toEqual(personJsonLd());
  });
});

describe('articleJsonLd', () => {
  const base = {
    title: 'A Title',
    description: 'A description',
    url: 'https://example.com/post',
    datePublished: new Date('2024-01-02T00:00:00Z')
  };

  it('defaults the type to Article and the author to the site owner', () => {
    const result = articleJsonLd(base);
    expect(result['@type']).toBe('Article');
    expect(result.headline).toBe('A Title');
    expect(result.description).toBe('A description');
    expect(result.url).toBe('https://example.com/post');
    expect(result.datePublished).toBe('2024-01-02T00:00:00.000Z');
    expect(result.author).toEqual([{ '@type': 'Person', name: SITE.name }]);
  });

  it('honours a custom article type', () => {
    const result = articleJsonLd({ ...base, type: 'ScholarlyArticle' });
    expect(result['@type']).toBe('ScholarlyArticle');
  });

  it('omits dateModified when not provided', () => {
    const result = articleJsonLd(base);
    expect('dateModified' in result).toBe(false);
  });

  it('serialises dateModified to ISO when provided', () => {
    const result = articleJsonLd({
      ...base,
      dateModified: new Date('2024-03-04T05:06:07Z')
    });
    expect(result.dateModified).toBe('2024-03-04T05:06:07.000Z');
  });

  it('maps every author into a Person node', () => {
    const result = articleJsonLd({ ...base, authors: ['Ada', 'Grace'] });
    expect(result.author).toEqual([
      { '@type': 'Person', name: 'Ada' },
      { '@type': 'Person', name: 'Grace' }
    ]);
  });
});

describe('softwareJsonLd', () => {
  const base = {
    title: 'My Project',
    description: 'Does things',
    url: 'https://example.com/proj'
  };

  it('describes a SoftwareSourceCode node authored by the site owner', () => {
    const result = softwareJsonLd(base);
    expect(result['@type']).toBe('SoftwareSourceCode');
    expect(result.name).toBe('My Project');
    expect(result.description).toBe('Does things');
    expect(result.url).toBe('https://example.com/proj');
    expect(result.author).toEqual({ '@type': 'Person', name: SITE.name });
  });

  it('omits codeRepository when no repoUrl is given', () => {
    expect('codeRepository' in softwareJsonLd(base)).toBe(false);
  });

  it('includes codeRepository when a repoUrl is given', () => {
    const result = softwareJsonLd({ ...base, repoUrl: 'https://github.com/x/y' });
    expect(result.codeRepository).toBe('https://github.com/x/y');
  });
});

describe('breadcrumbJsonLd', () => {
  it('builds a 1-indexed BreadcrumbList', () => {
    const result = breadcrumbJsonLd([{ label: 'Home' }, { label: 'Research' }]);
    expect(result['@type']).toBe('BreadcrumbList');
    expect(result.itemListElement).toHaveLength(2);
    expect(result.itemListElement[0]).toMatchObject({ position: 1, name: 'Home' });
    expect(result.itemListElement[1]).toMatchObject({ position: 2, name: 'Research' });
  });

  it('resolves relative hrefs against the site URL', () => {
    const [crumb] = breadcrumbJsonLd([{ label: 'Research', href: '/research/' }])
      .itemListElement;
    expect(crumb.item).toBe(new URL('/research/', SITE.url).href);
  });

  it('omits item for crumbs without an href', () => {
    const [crumb] = breadcrumbJsonLd([{ label: 'Current page' }]).itemListElement;
    expect('item' in crumb).toBe(false);
  });

  it('returns an empty list for no crumbs', () => {
    expect(breadcrumbJsonLd([]).itemListElement).toEqual([]);
  });
});
