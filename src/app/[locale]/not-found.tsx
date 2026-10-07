"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UI } from "@/data/ui";
import { NAV } from "@/data/site";
import { t, isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/utils";
import { Display } from "@/components/ui/Typo";
import { FortSilhouette } from "@/components/decor/FortSilhouette";
import { Button } from "@/components/ui/Button";

/**
 * Not found, inside the locale shell.
 *
 * `not-found.tsx` cannot receive route params, so the locale is read from the
 * pathname instead — which is reliable here, because every route on this site
 * is locale-prefixed. That keeps the 404 in the language the visitor was
 * already reading.
 */
export default function NotFound() {
  const pathname = usePathname() ?? "";
  const segment = pathname.split("/").filter(Boolean)[0];
  const locale: Locale = isLocale(segment) ? segment : DEFAULT_LOCALE;

  return (
    <section className="zone-ink relative flex min-h-[82svh] flex-col items-center justify-center overflow-hidden px-[var(--spacing-gutter)] py-28 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[var(--color-maroon-600)] opacity-[0.18] blur-[140px]" />
        <div className="grain-overlay opacity-25" />
      </div>

      <div className="relative">
        <span aria-hidden className="mx-auto block h-28 w-44 text-[var(--primary)] opacity-50">
          <FortSilhouette typology="hill" />
        </span>

        <p
          aria-hidden
          className="mt-10 font-[family-name:var(--font-display)] text-[clamp(4rem,14vw,10rem)] leading-none font-semibold tracking-[-0.04em] text-[var(--accent)]"
        >
          404
        </p>

        <Display locale={locale} level="h2" as="h1" className="mt-6 text-[var(--foreground)]">
          {t(UI.notFoundTitle, locale)}
        </Display>

        <p lang={locale} className="text-lede mx-auto mt-5 max-w-lg text-[var(--muted)]">
          {t(UI.notFoundBody, locale)}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={localeHref(locale, "/")} withArrow magnetic>
            {t(UI.backHome, locale)}
          </Button>
          <Button href={localeHref(locale, "/forts")} variant="outline">
            {t(NAV[1].label, locale)}
          </Button>
        </div>

        <nav className="mt-14" aria-label={t(UI.menu, locale)}>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.9375rem] text-[var(--muted)]">
            {NAV.map((item) => (
              <li key={item.key}>
                <Link
                  href={localeHref(locale, item.href)}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {t(item.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
