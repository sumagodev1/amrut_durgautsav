import { TIMELINE, TIMELINE_META } from "@/data/timeline";
import { formatIndex, t, type Locale } from "@/lib/i18n";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { RampartRule } from "@/components/decor/Ornament";

/**
 * "नियोजन" — the festival calendar.
 *
 * A two-column editorial timeline: dates set large in the left rail, the
 * milestone and its detail in the right. Entries that carry a real calendar
 * date are marked up with <time datetime>; the one occasion the source site
 * names without a date simply has none, rather than being given an invented
 * one.
 */
export function TimelineSection({ locale }: { locale: Locale }) {
  return (
    <section
      id="plan"
      className="zone-paper relative border-t border-[var(--border)] py-24 sm:py-32"
      aria-labelledby="plan-heading"
    >
      <div className="container-page">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-32">
              <Eyebrow>{t(TIMELINE_META.eyebrow, locale)}</Eyebrow>
              <Display
                locale={locale}
                level="h2"
                className="mt-6 text-[var(--foreground)]"
              >
                <span id="plan-heading">{t(TIMELINE_META.heading, locale)}</span>
              </Display>
              <RampartRule className="mt-8 w-40" />
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal stagger={0.1}>
              <ol className="border-t border-[var(--border)]">
                {TIMELINE.map((entry, i) => (
                  <RevealItem as="li" key={entry.key} className="border-b border-[var(--border)]">
                    <article className="group grid gap-3 py-8 sm:grid-cols-[13rem_1fr] sm:gap-8 sm:py-10">
                      <div className="flex items-baseline gap-3 sm:block">
                        <span className="text-eyebrow text-[var(--accent)] tabular-nums sm:block">
                          {formatIndex(i + 1, locale)}
                        </span>
                        {entry.iso ? (
                          <time
                            dateTime={entry.iso}
                            lang={locale}
                            className="font-[family-name:var(--font-devanagari)] text-[clamp(1.125rem,0.95rem+0.8vw,1.625rem)] leading-tight text-[var(--primary)] sm:mt-2 sm:block"
                          >
                            {t(entry.date, locale)}
                          </time>
                        ) : (
                          <span
                            lang={locale}
                            className="font-[family-name:var(--font-devanagari)] text-[clamp(1.125rem,0.95rem+0.8vw,1.625rem)] leading-tight text-[var(--primary)] sm:mt-2 sm:block"
                          >
                            {t(entry.date, locale)}
                          </span>
                        )}
                      </div>

                      <div>
                        <Display
                          locale={locale}
                          level="h3"
                          as="h3"
                          className="text-[var(--foreground)]"
                        >
                          {t(entry.title, locale)}
                        </Display>
                        {entry.body && (
                          <p
                            lang={locale}
                            className="mt-3 max-w-2xl text-base leading-[1.85] text-[var(--muted)]"
                          >
                            {t(entry.body, locale)}
                          </p>
                        )}
                      </div>
                    </article>
                  </RevealItem>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
