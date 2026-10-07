import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { UI } from "@/data/ui";
import { localeHref, cn } from "@/lib/utils";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Reveal } from "@/components/ui/Reveal";
import { RampartRule } from "@/components/decor/Ornament";

export type Crumb = { label: string; href?: string };

/**
 * The masthead every inner page opens with.
 *
 * Deliberately not a second hero image: a tall band of type, a rule, and the
 * breadcrumb. It keeps inner pages fast (no large image on the critical path)
 * and keeps the one cinematic photograph special to the homepage.
 */
export function PageHero({
  locale,
  eyebrow,
  title,
  lede,
  crumbs = [],
  children,
  className,
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  lede?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "zone-ink relative overflow-hidden pt-[calc(72px+4rem)] pb-16 sm:pb-20 lg:pt-[calc(80px+6rem)]",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[var(--color-maroon-600)] opacity-[0.16] blur-[140px]" />
        <div className="grain-overlay opacity-25" />
      </div>

      <div className="container-page relative">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--muted)]">
            <li>
              <Link
                href={localeHref(locale, "/")}
                className="inline-flex min-h-6 items-center transition-colors hover:text-[var(--accent)]"
              >
                {t(UI.home, locale)}
              </Link>
            </li>
            {crumbs.map((crumb, i) => (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                <ChevronRight aria-hidden className="size-3 opacity-50" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="inline-flex min-h-6 items-center transition-colors hover:text-[var(--accent)]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-[var(--foreground)]">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {eyebrow && (
              <Reveal>
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>
            )}
            <Reveal preset="unmask" delay={0.05}>
              <Display locale={locale} level="h1" as="h1" className="mt-6 text-[var(--foreground)]">
                {title}
              </Display>
            </Reveal>
            <Reveal delay={0.12}>
              <RampartRule className="mt-8 w-40" />
            </Reveal>
          </div>

          {lede && (
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
              <Reveal delay={0.1}>
                <p
                  lang={locale}
                  className="text-lede border-l border-[var(--border)] pl-5 text-[var(--muted)] sm:pl-7"
                >
                  {lede}
                </p>
              </Reveal>
            </div>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
