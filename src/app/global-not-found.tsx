import type { Metadata } from "next";
import { Fraunces, Mukta, Tiro_Devanagari_Marathi } from "next/font/google";
import "./globals.css";

import { SITE, NAV } from "@/data/site";
import { UI } from "@/data/ui";
import { t, DEFAULT_LOCALE, HTML_LANG } from "@/lib/i18n";
import { FortSilhouette } from "@/components/decor/FortSilhouette";

/**
 * Top-level 404 — served for any URL that resolves to no route at all.
 *
 * It renders its own complete document, because it sits outside the locale
 * layout and has no <html> around it. Deliberately self-contained: no smooth
 * scrolling, no motion, no data fetching, no client JavaScript. This is the
 * page that has to work when nothing else did.
 *
 * (`notFound()` called from a real page is caught by [locale]/not-found.tsx
 * instead, which keeps the full header and footer.)
 */

const tiro = Tiro_Devanagari_Marathi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
  variable: "--font-tiro",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-mukta",
});

export const metadata: Metadata = {
  title: `404 — ${t(UI.notFoundTitle, DEFAULT_LOCALE)}`,
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  const locale = DEFAULT_LOCALE;

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${tiro.variable} ${fraunces.variable} ${mukta.variable}`}
    >
      <body className="zone-ink antialiased">
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/4 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[var(--color-maroon-600)] opacity-[0.18] blur-[140px]" />
            <div className="grain-overlay opacity-25" />
          </div>

          <div className="relative">
            <a
              href={`/${locale}`}
              className="font-[family-name:var(--font-devanagari)] text-xl text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
              lang="mr"
            >
              {t(SITE.festival, "mr")}{" "}
              <span className="text-[var(--accent)]">{t(SITE.year, "mr")}</span>
            </a>

            <span
              aria-hidden
              className="mx-auto mt-12 block h-28 w-44 text-[var(--primary)] opacity-50"
            >
              <FortSilhouette typology="hill" />
            </span>

            <p
              aria-hidden
              className="mt-10 font-[family-name:var(--font-display)] text-[clamp(4rem,14vw,10rem)] leading-none font-semibold tracking-[-0.04em] text-[var(--accent)]"
            >
              404
            </p>

            <h1
              lang={locale}
              className="text-h2-mr mt-6 text-[var(--foreground)]"
            >
              {t(UI.notFoundTitle, locale)}
            </h1>

            <p lang={locale} className="text-lede mx-auto mt-5 max-w-lg text-[var(--muted)]">
              {t(UI.notFoundBody, locale)}
            </p>

            <a
              href={`/${locale}`}
              className="mt-10 inline-flex min-h-11 items-center rounded-[2px] bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-[var(--primary-contrast)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--color-ink-900)]"
            >
              {t(UI.backHome, locale)}
            </a>

            <nav className="mt-14" aria-label={t(UI.menu, locale)}>
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
                {NAV.map((item) => (
                  <li key={item.key}>
                    <a
                      href={`/${locale}${item.href}`}
                      className="transition-colors hover:text-[var(--accent)]"
                    >
                      {t(item.label, locale)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
