import { HERO } from "@/data/home";
import { t, type Locale } from "@/lib/i18n";
import { cn, eyebrowClass } from "@/lib/utils";

/**
 * The layered title lockup.
 *
 * Three planes, revealed in sequence:
 *   back   — the Latin wordmark as a hairline outline
 *   middle — "दुर्गोत्सव" at display scale
 *   front  — the year, set on a rule running out to the column edge
 *
 * Each line is unmasked by a travelling clip edge rather than faded, which is
 * what makes the entrance read as typeset rather than animated.
 *
 * Two deliberate decisions here:
 *
 *  - This is a server component with no JavaScript at all. The entrance is a
 *    CSS animation, so it starts when the browser first paints the hero
 *    rather than when React finishes hydrating. Driven by the motion library,
 *    the title stayed invisible for ~4.5s on a throttled connection.
 *
 *  - The Devanagari line carries a loose line-height and no clipping wrapper.
 *    दुर्गोत्सव sets its repha (र्) above the shirorekha, and a tight Latin-style
 *    line box in an `overflow-hidden` parent sheared it off, leaving the word
 *    reading as "दुगोत्सव".
 */
export function HeroTitle({ locale }: { locale: Locale }) {
  return (
    <div className="relative">
      {/* Eyebrow */}
      <p
        className={cn(
          eyebrowClass(t(HERO.eyebrow, locale)),
          "hero-anim-rise flex items-center gap-3 text-[var(--color-gold-300)] [animation-delay:0.15s]",
        )}
      >
        <span aria-hidden className="h-px w-8 bg-[var(--color-gold-400)] opacity-70" />
        {t(HERO.eyebrow, locale)}
      </p>

      {/* Ghosted Latin wordmark.
          Set much larger than the Devanagari and bled off the left edge, so it
          reads as a layer of typographic texture behind the title rather than
          a second word competing to be read. Masked so it fades out before it
          reaches the lede column. */}
      <span
        aria-hidden
        className="hero-anim-rise pointer-events-none absolute -top-10 -left-[7%] hidden font-[family-name:var(--font-display)] text-[clamp(7rem,19vw,17rem)] leading-none font-semibold tracking-[-0.05em] whitespace-nowrap text-transparent select-none [animation-delay:0.5s] lg:block"
        style={{
          WebkitTextStroke: "1px color-mix(in srgb, var(--color-gold-400) 30%, transparent)",
          opacity: 0.3,
          maskImage: "linear-gradient(100deg, #000 10%, rgba(0,0,0,0.35) 52%, transparent 78%)",
          WebkitMaskImage:
            "linear-gradient(100deg, #000 10%, rgba(0,0,0,0.35) 52%, transparent 78%)",
        }}
      >
        {HERO.titleEn}
      </span>

      {/* The title. */}
      <h1 id="hero-title" className="relative mt-5 sm:mt-7">
        <span className="sr-only">
          {t(HERO.eyebrow, locale)} — {HERO.titleMr} / {HERO.titleEn} {t(HERO.year, locale)}
        </span>

        <span aria-hidden className="block pb-[0.08em]">
          <span
            lang="mr"
            className="hero-anim-unmask block font-[family-name:var(--font-devanagari)] text-[clamp(3.25rem,12.5vw,11rem)] leading-[1.45] text-[var(--color-paper-50)] [animation-delay:0.3s]"
            style={{ textShadow: "0 2px 40px rgba(13,11,9,0.55)" }}
          >
            {HERO.titleMr}
          </span>
        </span>

        {/* Year, set on a rule that runs out to the edge of the column. */}
        <span aria-hidden className="mt-2 flex items-center gap-4 sm:mt-4 sm:gap-6">
          <span className="hero-anim-rise font-[family-name:var(--font-devanagari)] text-[clamp(1.75rem,4.4vw,3.5rem)] leading-none text-[var(--color-gold-300)] [animation-delay:0.78s]">
            {t(HERO.year, "mr")}
          </span>
          <span className="hero-anim-rule h-px flex-1 bg-gradient-to-r from-[var(--color-gold-400)] to-transparent [animation-delay:0.85s]" />
          <span
            className={cn(
              locale === "mr" ? "text-eyebrow-mr" : "text-eyebrow",
              "hero-anim-rise hidden shrink-0 text-[color-mix(in_srgb,var(--color-paper-200)_72%,transparent)] [animation-delay:0.95s] sm:block",
            )}
          >
            {locale === "mr" ? "१२ गडदुर्ग" : "Twelve forts"}
          </span>
        </span>
      </h1>
    </div>
  );
}
