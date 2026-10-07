import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FORTS_META } from "@/data/forts";
import { UI } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/utils";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Reveal } from "@/components/ui/Reveal";
import { FortsIndex } from "./FortsIndex";

/** The twelve forts, on the homepage. */
export function FortsSection({ locale }: { locale: Locale }) {
  return (
    <section
      id="forts"
      className="zone-ink relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="forts-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-40 size-[32rem] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: "var(--color-maroon-600)" }}
      />

      <div className="container-page relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t(FORTS_META.eyebrow, locale)}</Eyebrow>
            <Display
              locale={locale}
              level="h1"
              as="h2"
              className="mt-6 text-[var(--foreground)]"
              // The count reads better in Devanagari in both locales,
              // but the heading itself follows the active language.
            >
              <span id="forts-heading">{t(FORTS_META.heading, locale)}</span>
            </Display>
            <p lang={locale} className="text-lede mt-6 text-[var(--muted)]">
              {t(FORTS_META.lede, locale)}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="shrink-0">
            <Link
              href={localeHref(locale, "/forts")}
              data-cursor="link"
              className="group inline-flex items-center gap-2.5 border-b border-[var(--border)] pb-1.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t(UI.viewAll, locale)}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-14">
          <FortsIndex locale={locale} />
        </Reveal>

        <Reveal delay={0.1}>
          <p
            lang={locale}
            className="mt-8 text-sm text-[var(--muted)]"
          >
            {t(FORTS_META.note, locale)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
