import { Users, Camera, Upload, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { STEPS } from "@/data/home";
import { UI } from "@/data/ui";
import { formatIndex, t, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/utils";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GatewayMotif } from "@/components/decor/Ornament";

const ICONS: Record<string, LucideIcon> = {
  gather: Users,
  photograph: Camera,
  upload: Upload,
  certificate: Award,
};

/**
 * The four steps of taking part.
 *
 * Laid out as a route rather than four cards: a single rule runs through all
 * four markers horizontally on desktop and vertically on mobile, so the
 * sequence is legible at a glance in both.
 */
export function ParticipateSection({ locale }: { locale: Locale }) {
  return (
    <section
      id="participate"
      className="zone-ink relative overflow-hidden border-t border-[var(--border)] py-24 sm:py-32"
      aria-labelledby="participate-heading"
    >
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">
            {locale === "mr" ? "सहभाग" : "Take part"}
          </Eyebrow>
          <Display
            locale={locale}
            level="h1"
            as="h2"
            className="mt-6 text-[var(--foreground)]"
          >
            <span id="participate-heading">
              {locale === "mr" ? "चार पावलांत सहभागी व्हा" : "Four steps to take part"}
            </span>
          </Display>
        </Reveal>

        <Reveal stagger={0.1} className="relative mt-16 sm:mt-20">
          {/* The connecting route. */}
          <span
            aria-hidden
            className="absolute top-7 bottom-7 left-7 w-px bg-gradient-to-b from-transparent via-[var(--border)] to-transparent md:top-7 md:right-7 md:bottom-auto md:left-7 md:h-px md:w-auto md:bg-gradient-to-r"
          />

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-7">
            {STEPS.map((step, i) => {
              const Icon = ICONS[step.key] ?? Users;
              return (
                <RevealItem as="li" key={step.key} className="group relative">
                  <div className="flex gap-5 md:block">
                    {/* Marker. The width is pinned to the circle so the step
                        numeral anchors to the circle itself — not to a
                        full-width column once the layout stacks. */}
                    <div className="relative size-14 shrink-0">
                      <span className="relative z-10 flex size-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--accent)] transition-colors duration-500 group-hover:border-[var(--accent)] group-hover:text-[var(--primary)]">
                        <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                      </span>
                      <span
                        aria-hidden
                        className="absolute -top-1 -right-1 z-10 flex size-6 items-center justify-center rounded-full bg-[var(--primary)] text-[0.625rem] font-semibold text-[var(--primary-contrast)] tabular-nums"
                      >
                        {formatIndex(i + 1, locale)}
                      </span>
                    </div>

                    <div className="md:mt-7">
                      <Display
                        locale={locale}
                        level="h3"
                        as="h3"
                        className="text-[var(--foreground)]"
                      >
                        {t(step.title, locale)}
                      </Display>
                      <p
                        lang={locale}
                        className="mt-3 text-[0.9375rem] leading-[1.8] text-[var(--muted)]"
                      >
                        {t(step.body, locale)}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </ol>
        </Reveal>

        <Reveal delay={0.15} className="mt-16 flex flex-col items-center">
          <GatewayMotif className="opacity-40" />
          <div className="mt-6">
            <Button href={localeHref(locale, "/participate")} withArrow magnetic>
              {t(UI.register, locale)}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
