import { PILLARS } from "@/data/home";
import { formatIndex, t, type Locale } from "@/lib/i18n";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Rosette } from "@/components/decor/Ornament";
import { cn } from "@/lib/utils";

/**
 * The three pillars of the campaign — why it exists, stated plainly.
 *
 * Set as a numbered editorial list with a hairline between entries rather
 * than three boxed cards. The oversized numerals carry the rhythm; a rosette
 * sits behind each one at very low opacity.
 */
export function PillarsSection({ locale }: { locale: Locale }) {
  return (
    <section id="about" className="zone-paper relative border-t border-[var(--border)] py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{locale === "mr" ? "माहिती" : "The background"}</Eyebrow>
              <Display
                locale={locale}
                level="h2"
                className="mt-6 text-[var(--foreground)]"
              >
                {locale === "mr" ? "हे का घडते आहे" : "Why this is happening"}
              </Display>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal stagger={0.12}>
              <ol className="border-t border-[var(--border)]">
                {PILLARS.map((pillar) => (
                  <RevealItem as="li" key={pillar.key} className="border-b border-[var(--border)]">
                    <article className="group relative grid gap-4 py-9 sm:grid-cols-[auto_1fr] sm:gap-10 sm:py-11">
                      {/* Numeral with its rosette ghost */}
                      <div className="relative flex items-start">
                        {/* Kept faint and tight to the numeral: an ornament
                            you notice on second look, not a watermark the
                            body copy has to read through. */}
                        <Rosette className="pointer-events-none absolute -top-5 -left-5 size-[6.5rem] opacity-[0.055] transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:rotate-45" />
                        <span
                          className={cn(
                            "relative text-[clamp(2.5rem,5vw,4rem)] leading-none text-[var(--primary)] tabular-nums",
                            locale === "mr"
                              ? "font-[family-name:var(--font-devanagari)]"
                              : "font-[family-name:var(--font-display)] font-semibold",
                          )}
                        >
                          {formatIndex(pillar.index, locale)}
                        </span>
                      </div>

                      <div className="sm:pt-1.5">
                        <Display
                          locale={locale}
                          level="h3"
                          as="h3"
                          className="text-[var(--foreground)]"
                        >
                          {t(pillar.title, locale)}
                        </Display>
                        <p
                          lang={locale}
                          className="mt-3.5 max-w-2xl text-[0.9375rem] leading-[1.85] text-[var(--muted)] sm:text-base"
                        >
                          {t(pillar.body, locale)}
                        </p>
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
