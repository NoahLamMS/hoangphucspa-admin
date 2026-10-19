export function siteUrl(path: string): string {
  const base = import.meta.env.VITE_SITE_URL ?? '';
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
