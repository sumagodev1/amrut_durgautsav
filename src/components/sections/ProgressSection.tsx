import { PROGRESS } from "@/data/home";
import { SITE } from "@/data/site";
import { getParticipationStats } from "@/lib/repositories";
import { t, type Locale } from "@/lib/i18n";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Rosette } from "@/components/decor/Ornament";
import { FORTS } from "@/data/forts";
import { formatNumber } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * "आजपर्यंतची प्रगती" — the live participation figure.
 *
 * A server component: the count is fetched on the server and revalidated,
 * so there is no client-side fetch, no spinner and no layout shift.
 *
 * If the platform cannot be reached the band still renders, carrying the
 * figures we know for certain (the twelve forts, the thirty-six districts)
 * and simply omitting the participant count. We never substitute a
 * placeholder number for a real one.
 */
export async function ProgressSection({ locale }: { locale: Locale }) {
  const { participants } = await getParticipationStats();

  return (
    <section
      className="zone-maroon relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="progress-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Rosette className="absolute -top-20 -right-16 size-[22rem] opacity-[0.07]" />
        <Rosette className="absolute -bottom-24 -left-20 size-[26rem] opacity-[0.05]" />
        <div className="grain-overlay opacity-30" />
      </div>

      <div className="container-page relative">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t(SITE.year, locale)}</Eyebrow>
          <Display locale={locale} level="h2" className="mt-5 text-[var(--foreground)]">
            <span id="progress-heading">{t(PROGRESS.title, locale)}</span>
          </Display>
          <p lang={locale} className="text-lede mt-5 text-[var(--muted)]">
            {t(PROGRESS.body, locale)}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-14">
          <dl className="grid gap-10 border-t border-[var(--border)] pt-10 sm:grid-cols-3 sm:gap-8">
            {participants !== null && (
              <Figure
                value={<Counter value={participants} locale={locale} />}
                label={t(PROGRESS.participantsLabel, locale)}
                caption={t(PROGRESS.participantsCaption, locale)}
                locale={locale}
              />
            )}

            <Figure
              value={formatNumber(FORTS.length, locale)}
              label={locale === "mr" ? "गडदुर्ग" : "Forts"}
              caption={
                locale === "mr"
                  ? "युनेस्को जागतिक वारसा यादीत"
                  : "on the UNESCO World Heritage List"
              }
              locale={locale}
            />

            <Figure
              value={formatNumber(36, locale)}
              label={locale === "mr" ? "जिल्हे" : "Districts"}
              caption={
                locale === "mr"
                  ? "महाराष्ट्रभर सहभागासाठी खुले"
                  : "across Maharashtra, open to take part"
              }
              locale={locale}
            />
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Figure({
  value,
  label,
  caption,
  locale,
}: {
  value: React.ReactNode;
  label: string;
  caption: string;
  locale: Locale;
}) {
  return (
    <div className="flex flex-col">
      {/* DOM order is dt → dd → dd, which is what a definition list requires.
          The figure is lifted above its label visually with flex order. */}
      <dt
        lang={locale}
        className={cn(
          "order-2 mt-3 text-lg text-[var(--foreground)]",
          locale === "mr" && "font-[family-name:var(--font-devanagari)]",
        )}
      >
        {label}
      </dt>
      <dd className="order-1 font-[family-name:var(--font-devanagari)] text-[clamp(3rem,2rem+5vw,6rem)] leading-[0.95] text-[var(--accent)] tabular-nums">
        {value}
      </dd>
      <dd lang={locale} className="order-3 mt-1.5 ml-0 max-w-xs text-sm text-[var(--muted)]">
        {caption}
      </dd>
    </div>
  );
}
