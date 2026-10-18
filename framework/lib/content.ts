import { siteConfig } from '@site/site.config';

const modules = import.meta.glob('/content/*/data/*.json', {
  eager: true,
}) as Record<string, { default: unknown }>;

export function loadData<T>(name: string): T {
  const key = `/content/${siteConfig.contentRoot}/data/${name}.json`;
  const mod = modules[key];
  if (!mod) {
    const found = Object.keys(modules).sort().join(', ') || '(none)';
    throw new Error(`Missing content file ${key}. Glob saw: ${found}`);
  }
  return mod.default as T;
}
