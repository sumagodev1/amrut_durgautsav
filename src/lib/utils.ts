/** Join class names, dropping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const DEVANAGARI = /[ऀ-ॿ]/;

/** True when a string contains Devanagari. */
export function isDevanagari(value: unknown): boolean {
  return typeof value === "string" && DEVANAGARI.test(value);
}

/**
 * Picks the right small-label treatment for the script a string is actually
 * written in, rather than for the locale the page happens to be in — a
 * Marathi label shown inside the English site still needs Devanagari metrics.
 */
export function eyebrowClass(content: unknown): string {
  return isDevanagari(content) ? "text-eyebrow-mr" : "text-eyebrow";
}

/** Build a locale-prefixed href. Accepts "/" and "/forts/raigad" alike. */
export function localeHref(locale: string, href: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const clean = href === "/" ? "" : href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${clean}`;
}
