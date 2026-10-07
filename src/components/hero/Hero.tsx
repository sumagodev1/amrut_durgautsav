import { ChevronDown } from "lucide-react";
import { HERO } from "@/data/home";
import { UI } from "@/data/ui";
import { SITE } from "@/data/site";
import { t, type Locale } from "@/lib/i18n";
import { localeHref, cn, eyebrowClass } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import { HeroTitle } from "./HeroTitle";

/**
 * The opening composition.
 *
 * Marathi carries the title at full scale; the Latin wordmark sits behind it
 * as a ghosted outline, so both scripts are present without either being
 * demoted to a subtitle. Everything else is pushed to the edges — a rail of
 * metadata left, the scroll cue centred, the UNESCO note right.
 */
export function Hero({ locale }: { locale: Locale }) {
  return (
    <section
      className="zone-ink relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
      aria-labelledby="hero-title"
    >
      <HeroBackground
        alt={
          locale === "mr"
            ? "पावसाळ्यातील राजगड किल्ल्याची संजीवनी माची आणि सह्याद्रीच्या डोंगररांगा"
            : "The Sanjeevani Machi ridge of Rajgad Fort running into the Sahyadri hills in the monsoon"
        }
      />

      {/* Spacer for the fixed header. */}
      <div aria-hidden className="h-[72px] shrink-0 lg:h-20" />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center py-10">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* --- Title block ------------------------------------------- */}
          <div className="lg:col-span-8 xl:col-span-7">
            <HeroTitle locale={locale} />
          </div>

          {/* --- Lede rail ---------------------------------------------- */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="max-w-md border-l border-[color-mix(in_srgb,var(--color-gold-500)_32%,transparent)] pl-5 sm:pl-7">
              <p
                lang={locale}
                className="text-[0.9375rem] leading-[1.85] text-[color-mix(in_srgb,var(--color-paper-100)_88%,transparent)] sm:text-base"
              >
                {t(HERO.lede, locale)}
              </p>
              <p
                lang={locale}
                className="mt-5 font-[family-name:var(--font-devanagari)] text-lg leading-relaxed text-[var(--color-gold-300)] sm:text-xl"
              >
                {t(HERO.callToArms, locale)}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={localeHref(locale, "/participate")} withArrow magnetic>
                  {t(UI.register, locale)}
                </Button>
                <Button href={localeHref(locale, "/forts")} variant="outline">
                  {t(UI.explore, locale)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Baseline rail -------------------------------------------- */}
      <div className="relative z-10 border-t border-[color-mix(in_srgb,var(--color-gold-500)_20%,transparent)]">
        <div className="container-page flex items-center justify-between gap-6 py-4">
          <p
            className={cn(
              eyebrowClass(t(UI.unescoLabel, locale)),
              "hidden text-[color-mix(in_srgb,var(--color-paper-200)_70%,transparent)] sm:block",
            )}
          >
            {t(UI.unescoLabel, locale)}
            <span aria-hidden className="mx-2.5 opacity-50">
              /
            </span>
            {locale === "mr" ? "११ जुलै २०२५" : "11 July 2025"}
          </p>

          <a
            href="#intro"
            className="group inline-flex items-center gap-2.5 text-[color-mix(in_srgb,var(--color-paper-100)_80%,transparent)] transition-colors hover:text-[var(--color-gold-300)]"
          >
            <span className={eyebrowClass(t(UI.scroll, locale))}>
              {t(UI.scroll, locale)}
            </span>
            <span className="relative inline-flex size-9 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-gold-500)_40%,transparent)]">
              <ChevronDown
                aria-hidden
                className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5"
              />
            </span>
          </a>

          <p
            className={cn(
              eyebrowClass(t(SITE.organisationShort, locale)),
              "hidden text-[color-mix(in_srgb,var(--color-paper-200)_70%,transparent)] lg:block",
            )}
          >
            {t(SITE.organisationShort, locale)}
          </p>
        </div>
      </div>
    </section>
  );
}
