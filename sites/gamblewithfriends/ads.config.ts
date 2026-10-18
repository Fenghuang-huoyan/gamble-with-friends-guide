/**
 * Adsterra. This game is a casino crawler, so the plan is
 * Adsterra rather than AdSense.
 *
 * A slot still named ADSTERRA_* is not rendered. That avoids empty
 * invoke.js requests until that placement has its own zone.
 *
 * Live Native Banner (do not copy this key onto a second slot — guide
 * pages must not stamp the same zone twice):
 * - Website gamblewithfriends.wiki, Adsterra site id 6132961
 * - Placement NativeBanner_1, placement id 31802453
 * - Zone key is the GET CODE path segment, not the placement id
 *
 * `invokeBase` is the host from that GET CODE. Classic banners often
 * use a different host; set `invokeBase` on a slot to override.
 * Native Banner containers are `container-${zone}`.
 */
export type AdSlotConfig = {
  id: string;
  format: string;
  /** Overrides the site-wide invoke host for this placement. */
  invokeBase?: string;
  /** Overrides the site-wide container id prefix. */
  containerPrefix?: string;
};

const slots = {
  homeHero: { id: 'ADSTERRA_HOME_HERO', format: '728x90' },
  afterQuickAnswer: {
    id: '47e3b0879b9f6a57efe5742736ca9e2b',
    format: 'native-banner',
  },
  midArticle: { id: 'ADSTERRA_MID_ARTICLE', format: 'in-article' },
  sidebar: { id: 'ADSTERRA_SIDEBAR', format: '300x250' },
  footer: { id: 'ADSTERRA_FOOTER', format: 'banner' },
} as const satisfies Record<string, AdSlotConfig>;

export const adsConfig = {
  network: 'adsterra' as const,
  enabled: true,
  invokeBase: 'https://pl31902952.profitableratecpmnetwork.com',
  containerPrefix: 'container-',
  slots,
};

export type AdSlotName = keyof typeof slots;

export function resolveAdPlacement(name: AdSlotName) {
  const slot: AdSlotConfig = slots[name];
  const invokeBase = (slot.invokeBase ?? adsConfig.invokeBase).replace(/\/$/, '');
  const containerPrefix = slot.containerPrefix ?? adsConfig.containerPrefix;
  return {
    id: slot.id,
    format: slot.format,
    invokeBase,
    containerId: `${containerPrefix}${slot.id}`,
    scriptSrc: `${invokeBase}/${slot.id}/invoke.js`,
    active: adsConfig.enabled && !slot.id.startsWith('ADSTERRA_'),
  };
}
