# Gamble With Your Friends Wiki

Fan wiki for [Gamble With Your Friends](https://store.steampowered.com/app/3892270/Gamble_With_Your_Friends/) (Steam AppID 3892270), built for **gamblewithfriends.wiki**.

English only. Static Astro site. Not affiliated with TEAM GWYF or TENSTACK, and not a real-money casino.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on port **4327** (`http://127.0.0.1:4327`).

```bash
npm run build    # writes dist/
npm run preview  # serves dist/ on port 4327
```

`npm run build` must finish clean before you deploy. It also writes `dist/sitemap.xml` (a copy of the generated urlset) and `dist/robots.txt` already points at `https://gamblewithfriends.wiki/sitemap.xml`.

## Deploy on Vercel

This repo is a static Astro build. No adapter, no server, no database.

1. Import the git repository into Vercel.
2. Framework preset: **Astro**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Do not set a root directory unless you moved the project.
6. After the first successful deployment, add the domain `gamblewithfriends.wiki` in the Vercel project (Settings → Domains). Vercel will show the exact DNS records it wants.

Leave analytics and ads off until the domain is actually serving. `sites/gamblewithfriends/site.config.ts` has an empty `analytics.gaId`. `sites/gamblewithfriends/ads.config.ts` ships `ADSTERRA_*` placeholders and `enabled: false`, so no ad script is injected.

This game is a casino crawler. The monetization path in the plan is **Adsterra**, not AdSense. When you create your own zones, replace one placeholder id, set `enabled: true`, and check `/online-fix` so the slot is a labeled advertisement and never looks like a download. Give a brand-new domain a day or two before the first live zone.

## DNS

Do this at your registrar (the domain was registered at Spaceship). Point the domain at Vercel using the records Vercel shows after you add it. They are usually:

- `A` record on `@` → `76.76.21.21`
- `CNAME` on `www` → `cname.vercel-dns.com`

Use the values in the Vercel dashboard if they differ. Do not change nameservers unless you intend to host DNS at Vercel. After the records propagate, Vercel issues the certificate. Then submit `https://gamblewithfriends.wiki/sitemap.xml` in Google Search Console.

Ranked titles, descriptions, and H1s should stay put once they start ranking. They live in `site.config.ts` (`homeTitle`) and in each page’s MDX frontmatter (`title`, `h1`).

## How the three layers work

Swap a game without rewriting the layout.

| Layer | Path | What you change |
|---|---|---|
| Framework | `framework/` | Rarely. Layout, nav chrome, Quick Answer, tables, ad slot, version stamp, SEO helpers. |
| Site config | `sites/<game>/` | Name, domain, Steam id, nav, disclaimer, GA id, Adsterra slots. |
| Content | `content/<root>/` | MDX pages, JSON tables, and a reserved `i18n/` folder. |

`sites/active` is a symlink to the site you are publishing. Right now it points at `sites/gamblewithfriends`. Astro’s `@site` alias follows that symlink, and `src/content.config.ts` reads `contentRoot` from the active config.

### Spin up another game

1. Copy `sites/gamblewithfriends` to `sites/<new-game>`.
2. Copy `content/gwyf` to `content/<new-root>`.
3. Edit `sites/<new-game>/site.config.ts`: `siteName`, `domain`, `url`, `gameTitle`, `steamAppId`, `steamUrl`, `discordUrl`, `contentRoot` (the new folder name), `homeTitle`, nav, disclaimer.
4. Replace `ads.config.ts` with fresh `ADSTERRA_*` placeholders. Do not reuse another site’s zone ids.
5. Point the symlink at the new site:

   ```bash
   ln -sfn <new-game> sites/active
   ```

6. Set `site:` in `astro.config.mjs` to the new origin so canonicals and the sitemap match the domain.
7. Rewrite `content/<new-root>/pages/*.mdx` and `content/<new-root>/data/*.json`. Keep the JSON shapes the browsers already understand (`achievements`, `items`, `games`, `floors`, `endings`, `combos`, `faq`, `phone-booth`, `meta`).
8. `npm run build`, then attach the new domain in Vercel.

English copy for this game lives in the MDX and JSON. `content/gwyf/i18n/` is reserved; nothing reads it yet.

Pages are the homepage plus thirteen guides:

`/beginner-guide` `/achievements` `/endings` `/online-fix` `/items` `/games` `/quota-strategy` `/save-scum` `/floors` `/platforms` `/accessories` `/item-combos` `/faq`

## Content rules

- Steam store text, the Steam achievement API, the developer FAQ, and named patch notes can be stated as fact.
- Community routes (Phone Booth wording, Esc timing, item tooltips, floor days, shop reset) stay in the UI with an **Unverified** badge or an explicit Unverified sentence.
- Do not invent patch numbers, drop rates, peak player counts, or a “still glitched” achievement list. The newest named update cited here is **V1.0.30** (24 Jul 2026). The live depot build id was not confirmed.
- If two guides disagree, say so. The accessories page keeps both shop-reset stories and tells the reader neither was re-tested.

## Ads and privacy

`framework/components/AdSlot.astro` renders nothing while a slot id starts with `ADSTERRA_` or `enabled` is false. There is no accounts system. Achievement checkboxes use `localStorage` only, keyed by the Steam AppID.
