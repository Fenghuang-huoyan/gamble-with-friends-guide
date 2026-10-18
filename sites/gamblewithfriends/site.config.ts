export const siteConfig = {
  siteName: 'Gamble With Your Friends Wiki',
  domain: 'gamblewithfriends.wiki',
  url: 'https://gamblewithfriends.wiki',
  gameTitle: 'Gamble With Your Friends',
  steamAppId: 3892270,
  steamUrl: 'https://store.steampowered.com/app/3892270/Gamble_With_Your_Friends/',
  discordUrl: 'https://discord.gg/8GZwxBqhxN',
  supportEmail: 'support@tenstack.se',
  developer: 'TEAM GWYF',
  publisher: 'TENSTACK',
  tagline: 'Shared bank, five-minute quotas, and straight answers for the spots a run actually dies.',
  locale: 'en',
  contentRoot: 'gwyf',
  homeTitle: 'Gamble With Your Friends Wiki — Shared Bank, Quota & Co-op Guide',
  homeDescription:
    'Fan wiki for Gamble With Your Friends (Steam AppID 3892270). Phone Booth achievement checklist, three endings on one save, and the item rules that make a ticket spend actually do something.',
  analytics: {
    gaId: '',
  },
  art: {
    hero: '/images/official/steam/library-hero.jpg',
    heroAlt:
      'Official Steam library art for Gamble With Your Friends: four players around a casino table under the game logo',
    ogImage: '/images/official/steam/library-hero.jpg',
  },
  ads: {
    network: 'adsterra' as const,
  },
  disclaimer:
    'Fan-made guide. Not affiliated with TEAM GWYF or TENSTACK. Gamble With Your Friends is a paid Steam game about a fictional debt. It is not real-money gambling.',
  nav: [
    { href: '/beginner-guide', label: 'Guide' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/endings', label: 'Endings' },
    { href: '/items', label: 'Items' },
    { href: '/games', label: 'Games' },
    { href: '/online-fix', label: 'Online Fix' },
  ],
  moreNav: [
    { href: '/quota-strategy', label: 'Quota & Shared Bank' },
    { href: '/save-scum', label: 'Save Scum & Seeds' },
    { href: '/floors', label: 'Floors' },
    { href: '/item-combos', label: 'Item Combos' },
    { href: '/accessories', label: 'Accessories' },
    { href: '/platforms', label: 'Platforms' },
    { href: '/faq', label: 'FAQ' },
  ],
  version: {
    label: 'V1.0.30',
    detail: 'Newest named Steam news post checked for this site. Live depot build id: Unverified.',
  },
} as const;

export type NavItem = { href: string; label: string };
