import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { FORTS } from "@/data/forts";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap.
 *
 * Every page in every locale, with `alternates.languages` so search engines
 * understand the two locales are translations of one another rather than
 * duplicates.
 */

/** Locale-less paths, with the priority each carries. */
const ROUTES: ReadonlyArray<{ path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/mission", priority: 0.8, changeFrequency: "monthly" },
  { path: "/forts", priority: 0.9, changeFrequency: "monthly" },
  { path: "/participate", priority: 0.9, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.8, changeFrequency: "daily" },
  { path: "/album", priority: 0.7, changeFrequency: "daily" },
  { path: "/record", priority: 0.8, changeFrequency: "monthly" },
  { path: "/voices", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ...FORTS.map((fort) => ({
    path: `/forts/${fort.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(`/${locale}${route.path === "/" ? "" : route.path}`),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alt) => [
            alt,
            absoluteUrl(`/${alt}${route.path === "/" ? "" : route.path}`),
          ]),
        ),
      },
    })),
  );
}
