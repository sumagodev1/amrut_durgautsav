/**
 * Locale primitives.
 *
 * Marathi is the primary language of Durgotsav — the source material, the
 * audience and the brand are Marathi-first. English is a full parallel
 * locale, not an afterthought.
 *
 * Every piece of content in `src/data` is typed as `LocalizedText`, so adding
 * a third locale is a data change, never a component change.
 */

export const LOCALES = ["mr", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "mr";

export type LocalizedText = Record<Locale, string>;

/** A localized list, e.g. bullet points that differ in length per language. */
export type LocalizedList = Record<Locale, readonly string[]>;

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Resolve a localized value, falling back to the default locale. */
export function t(text: LocalizedText | undefined, locale: Locale): string {
  if (!text) return "";
  return text[locale] ?? text[DEFAULT_LOCALE] ?? "";
}

export function tList(list: LocalizedList | undefined, locale: Locale): readonly string[] {
  if (!list) return [];
  return list[locale] ?? list[DEFAULT_LOCALE] ?? [];
}

/**
 * The `lang` attribute for a given locale. Marathi content must be tagged
 * `mr` so screen readers switch to a Devanagari voice and browsers apply the
 * right line-breaking rules.
 */
export const HTML_LANG: Record<Locale, string> = {
  mr: "mr-IN",
  en: "en-IN",
};

export const LOCALE_LABEL: Record<Locale, string> = {
  mr: "मराठी",
  en: "English",
};

/**
 * Marathi uses Devanagari digits in display contexts (२०२५, १२).
 * Numbers that come from data (counters, dates) are formatted through here so
 * the two locales never diverge by accident.
 */
const DEVANAGARI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function formatNumber(value: number, locale: Locale): string {
  const grouped = new Intl.NumberFormat("en-IN").format(value);
  if (locale !== "mr") return grouped;
  return grouped.replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

/** Pad-free ordinal-ish label used by the numbered timeline/steps. */
export function formatIndex(index: number, locale: Locale): string {
  const padded = String(index).padStart(2, "0");
  if (locale !== "mr") return padded;
  return padded.replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}
