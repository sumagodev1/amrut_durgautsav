"use client";

import { motion } from "motion/react";
import { HERO } from "@/data/home";
import { t, type Locale } from "@/lib/i18n";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn, eyebrowClass } from "@/lib/utils";

/**
 * The layered title lockup.
 *
 * Three planes, revealed in sequence:
 *   back   — the Latin wordmark as a hairline outline
 *   middle — "दुर्गोत्सव" at display scale
 *   front  — the year, set as a tall slab against the word
 *
 * Each line is unmasked by a clip edge rather than faded, which is what makes
 * the entrance read as typeset rather than animated.
 */
export function HeroTitle({ locale }: { locale: Locale }) {
  const reduced = usePrefersReducedMotion();

  const line = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { clipPath: "inset(110% 0% -10% 0%)", y: "18%" },
          animate: { clipPath: "inset(-10% 0% -10% 0%)", y: "0%" },
          transition: { duration: 1.05, ease: EASE_OUT_EXPO, delay },
        };

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay },
        };

  return (
    <div className="relative">
      {/* Eyebrow */}
      <motion.p
        data-reveal
        {...fade(0.15)}
        className={cn(
          eyebrowClass(t(HERO.eyebrow, locale)),
          "flex items-center gap-3 text-[var(--color-gold-300)]",
        )}
      >
        <span aria-hidden className="h-px w-8 bg-[var(--color-gold-400)] opacity-70" />
        {t(HERO.eyebrow, locale)}
      </motion.p>

      {/* Ghosted Latin wordmark.
          Set much larger than the Devanagari and bled off the left edge, so
          it reads as a layer of typographic texture behind the title rather
          than a second word competing to be read. Masked to fade out before
          it reaches the lede column. */}
      <motion.span
        aria-hidden
        data-reveal
        {...fade(0.5)}
        className="pointer-events-none absolute -top-10 -left-[7%] hidden font-[family-name:var(--font-display)] text-[clamp(7rem,19vw,17rem)] leading-none font-semibold tracking-[-0.05em] whitespace-nowrap text-transparent select-none lg:block"
        style={{
          WebkitTextStroke: "1px color-mix(in srgb, var(--color-gold-400) 30%, transparent)",
          opacity: 0.3,
          maskImage: "linear-gradient(100deg, #000 10%, rgba(0,0,0,0.35) 52%, transparent 78%)",
          WebkitMaskImage:
            "linear-gradient(100deg, #000 10%, rgba(0,0,0,0.35) 52%, transparent 78%)",
        }}
      >
        {HERO.titleEn}
      </motion.span>

      {/* The title. */}
      <h1 id="hero-title" className="relative mt-5 sm:mt-7">
        <span className="sr-only">
          {t(HERO.eyebrow, locale)} — {HERO.titleMr} / {HERO.titleEn} {t(HERO.year, locale)}
        </span>

        {/* No `overflow-hidden` here, and a generous line-height.
            Devanagari sets marks well above the shirorekha — in दुर्गोत्सव the
            repha (र्) rides on top of गो — and a tight line box with a
            clipping wrapper simply cut it off, leaving the word reading as
            "दुगोत्सव". The entrance animation masks itself with clip-path,
            so the wrapper never needed to clip in the first place. */}
        <span aria-hidden className="block pb-[0.08em]">
          <motion.span
            data-reveal
            {...line(0.3)}
            lang="mr"
            className="block font-[family-name:var(--font-devanagari)] text-[clamp(3.25rem,12.5vw,11rem)] leading-[1.3] text-[var(--color-paper-50)]"
            style={{
              textShadow: "0 2px 40px rgba(13,11,9,0.55)",
            }}
          >
            {HERO.titleMr}
          </motion.span>
        </span>

        {/* Year, set on a rule that runs out to the edge of the column. */}
        <span aria-hidden className="mt-2 flex items-center gap-4 sm:mt-4 sm:gap-6">
          <motion.span
            data-reveal
            {...fade(0.78)}
            className="font-[family-name:var(--font-devanagari)] text-[clamp(1.75rem,4.4vw,3.5rem)] leading-none text-[var(--color-gold-300)]"
          >
            {t(HERO.year, "mr")}
          </motion.span>
          <motion.span
            data-reveal
            initial={reduced ? undefined : { scaleX: 0 }}
            animate={reduced ? undefined : { scaleX: 1 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.85 }}
            className="h-px flex-1 origin-left bg-gradient-to-r from-[var(--color-gold-400)] to-transparent"
          />
          <motion.span
            data-reveal
            {...fade(0.95)}
            className={cn(
              locale === "mr" ? "text-eyebrow-mr" : "text-eyebrow",
              "hidden shrink-0 text-[color-mix(in_srgb,var(--color-paper-200)_72%,transparent)] sm:block",
            )}
          >
            {locale === "mr" ? "१२ गडदुर्ग" : "Twelve forts"}
          </motion.span>
        </span>
      </h1>
    </div>
  );
}
