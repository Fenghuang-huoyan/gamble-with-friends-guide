/**
 * Adsterra placeholders. This game is a casino crawler, so the plan is
 * Adsterra rather than AdSense.
 *
 * Leave every id as an ADSTERRA_* token until you create your own zones.
 * AdSlot renders nothing while `enabled` is false or an id still starts
 * with ADSTERRA_. That avoids empty invoke.js errors and keeps another
 * site's keys out of the repo.
 *
 * When you are ready (give a new domain a day or two before the first
 * zone goes live):
 * 1. Replace one id with your zone id.
 * 2. Set enabled to true.
 * 3. Confirm the slot is a labeled advertisement, never a fake download.
 *    The online-fix page is the one to re-check.
 */
export const adsConfig = {
  network: 'adsterra' as const,
  enabled: false,
  slots: {
    homeHero: { id: 'ADSTERRA_HOME_HERO', format: '728x90' },
    afterQuickAnswer: { id: 'ADSTERRA_AFTER_ANSWER', format: 'in-article' },
    midArticle: { id: 'ADSTERRA_MID_ARTICLE', format: 'in-article' },
    sidebar: { id: 'ADSTERRA_SIDEBAR', format: '300x250' },
    footer: { id: 'ADSTERRA_FOOTER', format: 'banner' },
  },
} as const;

export type AdSlotName = keyof typeof adsConfig.slots;
