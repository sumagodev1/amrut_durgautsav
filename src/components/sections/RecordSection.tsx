import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import { RECORD } from "@/data/record";
import { UI } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/utils";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Reveal } from "@/components/ui/Reveal";
import { RuledFrame, WarliChain } from "@/components/decor/Ornament";

/**
 * The world-record moment.
 *
 * Given its own band and its own treatment — the record title set in Latin
 * caps inside a ruled frame, the Marathi announcement beneath it. This is the
 * campaign's proudest fact and the layout treats it as the climax rather than
 * as another card in a row.
 */
export function RecordSection({ locale }: { locale: Locale }) {
  return (
    <section
      id="record"
      className="zone-ink relative overflow-hidden border-t border-[var(--border)] py-24 sm:py-32"
      aria-labelledby="record-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[var(--color-gold-600)] opacity-[0.10] blur-[140px]" />
        <div className="grain-overlay opacity-25" />
      </div>

      <div className="container-page relative">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <Eyebrow className="justify-center">{t(RECORD.eyebrow, locale)}</Eyebrow>
          </Reveal>

          {/* The record title, framed. */}
          <Reveal delay={0.08} className="relative mt-10">
            <div className="relative px-6 py-12 text-center sm:px-12 sm:py-16">
              <RuledFrame />
              <div className="relative">
                <Trophy
                  aria-hidden
                  className="mx-auto size-8 text-[var(--accent)]"
                  strokeWidth={1.3}
                />
                <p
                  lang="en"
                  className="mx-auto mt-7 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.5rem,1.1rem+2.2vw,3rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-balance text-[var(--foreground)]"
                >
                  {RECORD.title}
                </p>
                <p className="text-eyebrow mt-6 text-[var(--muted)]">
                  Guinness Book of World Records
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="mt-14 text-center">
            <Display locale={locale} level="h2" className="text-[var(--accent)]">
              <span id="record-heading">{t(RECORD.heading, locale)}</span>
            </Display>
            <p
              lang={locale}
              className="text-lede mx-auto mt-6 max-w-2xl text-[var(--muted)]"
            >
              {t(RECORD.body, locale)}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-14">
            <blockquote className="relative mx-auto max-w-2xl border-l-2 border-[var(--accent)] pl-6 sm:pl-8">
              <p
                lang={locale}
                className="font-[family-name:var(--font-devanagari)] text-[clamp(1.125rem,1rem+0.9vw,1.625rem)] leading-[1.6] text-[var(--foreground)]"
              >
                {t(RECORD.pullquote, locale)}
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.24} className="mt-12 flex flex-col items-center">
            <Link
              href={localeHref(locale, "/record")}
              data-cursor="link"
              className="group inline-flex items-center gap-2.5 border-b border-[var(--border)] pb-1.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t(UI.readMore, locale)}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
              />
            </Link>
            <WarliChain count={5} className="mt-14 w-full max-w-sm opacity-40" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
