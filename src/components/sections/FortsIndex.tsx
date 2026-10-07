"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { FORTS, TYPOLOGY_LABEL, type Fort } from "@/data/forts";
import { formatIndex, t, type Locale } from "@/lib/i18n";
import { cn, localeHref, eyebrowClass } from "@/lib/utils";
import { FortSilhouette } from "@/components/decor/FortSilhouette";
import { useHasFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * The twelve forts, as an index you read down rather than a grid of cards.
 *
 * On a desktop pointer, hovering a line raises a preview panel that tracks
 * the cursor — the fort's drawing, its typology and its district. On touch
 * the preview is omitted entirely and each row carries its own inline
 * silhouette, so nothing is hidden behind an interaction that cannot happen.
 */
export function FortsIndex({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<Fort | null>(null);
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 36, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 320, damping: 36, mass: 0.6 });

  const previewEnabled = finePointer && !reduced;

  function handleMove(e: React.MouseEvent) {
    if (!previewEnabled || !listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <div className="relative" onMouseMove={handleMove}>
      <ol ref={listRef} className="relative border-t border-[var(--border)]">
        {FORTS.map((fort) => {
          const isActive = active?.slug === fort.slug;
          return (
            <li key={fort.slug} className="border-b border-[var(--border)]">
              <Link
                href={localeHref(locale, `/forts/${fort.slug}`)}
                data-cursor="view"
                onMouseEnter={() => setActive(fort)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(fort)}
                onBlur={() => setActive(null)}
                className={cn(
                  "group relative flex items-center gap-4 py-5 transition-colors duration-500 sm:gap-7 sm:py-6",
                  previewEnabled && active && !isActive && "opacity-45",
                )}
              >
                {/* A warm wash that sweeps in from the left on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-[var(--spacing-gutter)] -right-[var(--spacing-gutter)] origin-left scale-x-0 bg-[color-mix(in_srgb,var(--primary)_7%,transparent)] transition-transform duration-600 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />

                <span className="text-eyebrow relative w-7 shrink-0 text-[var(--accent)] tabular-nums">
                  {formatIndex(fort.index, locale)}
                </span>

                {/* Row thumbnail. Present at every size — on touch it is the
                    only preview there is, and on desktop it anchors the row
                    before the larger cursor-tracked panel appears. */}
                <span
                  aria-hidden
                  className="relative h-12 w-20 shrink-0 overflow-hidden bg-[var(--surface-raised)] sm:h-14 sm:w-24"
                >
                  {fort.image ? (
                    <Image
                      src={fort.image.src}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover opacity-70 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.08] group-hover:opacity-100"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-end p-1 text-[var(--primary)] opacity-60">
                      <FortSilhouette typology={fort.typology} />
                    </span>
                  )}
                </span>

                <span className="relative min-w-0 flex-1">
                  <span
                    lang={locale}
                    className={cn(
                      "block truncate text-[clamp(1.25rem,1rem+1.4vw,2.25rem)] leading-tight transition-colors duration-400",
                      locale === "mr"
                        ? "font-[family-name:var(--font-devanagari)]"
                        : "font-[family-name:var(--font-display)] font-semibold tracking-tight",
                      "text-[var(--foreground)] group-hover:text-[var(--primary)]",
                    )}
                  >
                    {t(fort.name, locale)}
                  </span>
                  {/* Below the name on narrow screens; promoted into its own
                      columns on wide ones, so the row reads as an index
                      rather than a line of type with dead space after it. */}
                  <span className="mt-1 block truncate text-xs text-[var(--muted)] sm:text-sm md:hidden">
                    {t(fort.district, locale)}
                    <span aria-hidden className="mx-2 opacity-40">
                      ·
                    </span>
                    {t(TYPOLOGY_LABEL[fort.typology], locale)}
                  </span>
                </span>

                <span className="relative hidden w-40 shrink-0 truncate text-right text-sm text-[var(--muted)] md:block lg:w-52">
                  {t(fort.district, locale)}
                </span>
                <span
                  className={cn(
                    eyebrowClass(t(TYPOLOGY_LABEL[fort.typology], locale)),
                    "relative hidden w-36 shrink-0 truncate text-right text-[var(--muted)] opacity-80 transition-colors duration-400 group-hover:text-[var(--accent)] group-hover:opacity-100 lg:block",
                  )}
                >
                  {t(TYPOLOGY_LABEL[fort.typology], locale)}
                </span>

                <ArrowUpRight
                  aria-hidden
                  className="relative size-5 shrink-0 text-[var(--muted)] transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--primary)]"
                />
              </Link>
            </li>
          );
        })}
      </ol>

      {/* --- Cursor-tracked preview (desktop only) --------------------- */}
      {previewEnabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-20 hidden lg:block"
          style={{ x: springX, y: springY }}
        >
          <AnimatePresence>
            {active && (
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.18 } }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="relative -translate-x-1/2 -translate-y-[112%]"
              >
                <div className="w-64 overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
                  <div className="relative aspect-[4/3] bg-[var(--surface-raised)]">
                    {active.image ? (
                      <Image
                        src={active.image.src}
                        alt=""
                        fill
                        sizes="256px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-end p-3 text-[var(--primary)]">
                        <FortSilhouette typology={active.typology} />
                      </span>
                    )}
                  </div>
                  <div className="border-t border-[var(--border)] px-4 py-3">
                    <p
                      className={cn(
                        eyebrowClass(t(TYPOLOGY_LABEL[active.typology], locale)),
                        "text-[var(--accent)]",
                      )}
                    >
                      {t(TYPOLOGY_LABEL[active.typology], locale)}
                    </p>
                    <p className="mt-1.5 text-sm text-[var(--muted)]">
                      {t(active.district, locale)}, {t(active.state, locale)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
