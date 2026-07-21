import { SITE, SOCIAL } from './site';

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: SITE.url,
    email: `mailto:${SOCIAL.email}`,
    jobTitle: 'Software Engineer',
    sameAs: [SOCIAL.github, SOCIAL.x]
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    author: { '@type': 'Person', name: SITE.name }
  };
}

export function profilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: personJsonLd()
  };
}

export function articleJsonLd(opts: {
  type?: 'Article' | 'TechArticle' | 'BlogPosting' | 'ScholarlyArticle';
  title: string;
  description: string;
  url: string;
  datePublished: Date;
  dateModified?: Date;
  authors?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type ?? 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished.toISOString(),
    ...(opts.dateModified && { dateModified: opts.dateModified.toISOString() }),
    author: (opts.authors ?? [SITE.name]).map((name) => ({ '@type': 'Person', name }))
  };
}

export function softwareJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  repoUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: opts.title,
    description: opts.description,
    url: opts.url,
    ...(opts.repoUrl && { codeRepository: opts.repoUrl }),
    author: { '@type': 'Person', name: SITE.name }
  };
}

export function breadcrumbJsonLd(crumbs: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href && { item: new URL(crumb.href, SITE.url).href })
    }))
  };
}
