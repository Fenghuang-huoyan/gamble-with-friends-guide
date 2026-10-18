import { siteConfig } from '@site/site.config';

export function canonicalUrl(pathname: string): string {
  const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  return new URL(path, siteConfig.url).toString();
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.url,
    description: siteConfig.homeDescription,
    inLanguage: 'en',
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  pathname: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: canonicalUrl(opts.pathname),
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.siteName,
      url: siteConfig.url,
    },
    about: {
      '@type': 'VideoGame',
      name: siteConfig.gameTitle,
      sameAs: siteConfig.steamUrl,
    },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
