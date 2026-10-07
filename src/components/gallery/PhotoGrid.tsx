"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import type { Photo } from "@/lib/repositories";
import { UI } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { cn, eyebrowClass } from "@/lib/utils";
import { Lightbox } from "./Lightbox";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { GatewayMotif } from "@/components/decor/Ornament";

/**
 * The editorial photo grid.
 *
 * Not a uniform three-column grid: tiles follow a repeating twelve-step
 * rhythm of spans and aspect ratios, so the page reads as a laid-out spread
 * while every image still lands on a consistent, predictable crop. The
 * rhythm is positional, which keeps server and client markup identical.
 */

/** [column span, aspect ratio] per position in the rhythm. */
const RHYTHM: ReadonlyArray<readonly [string, string]> = [
  ["lg:col-span-7", "4 / 3"],
  ["lg:col-span-5", "3 / 4"],
  ["lg:col-span-4", "1 / 1"],
  ["lg:col-span-4", "3 / 4"],
  ["lg:col-span-4", "1 / 1"],
  ["lg:col-span-5", "3 / 4"],
  ["lg:col-span-7", "4 / 3"],
  ["lg:col-span-6", "1 / 1"],
  ["lg:col-span-6", "4 / 3"],
  ["lg:col-span-4", "1 / 1"],
  ["lg:col-span-8", "16 / 9"],
  ["lg:col-span-12", "21 / 9"],
];

export function PhotoGrid({
  photos,
  locale,
  emptyMessage,
}: {
  photos: Photo[];
  locale: Locale;
  emptyMessage?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-[var(--border)] px-6 py-24 text-center">
        <GatewayMotif className="opacity-30" />
        <p lang={locale} className="mt-5 text-[var(--muted)]">
          {emptyMessage ?? t(UI.noPhotos, locale)}
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
        {photos.map((photo, i) => {
          const [span, ratio] = RHYTHM[i % RHYTHM.length];
          return (
            <motion.li
              key={photo.id}
              className={cn("col-span-1", span)}
              data-reveal
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{
                duration: 0.6,
                ease: EASE_OUT_EXPO,
                // Stagger within a row, not across the whole page.
                delay: (i % 3) * 0.07,
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                data-cursor="view"
                className="group relative block w-full overflow-hidden bg-[var(--surface-raised)]"
                style={{ aspectRatio: ratio }}
                aria-label={photo.caption ?? `${t(UI.viewAll, locale)} ${i + 1}`}
              >
                <Image
                  src={photo.url}
                  alt={photo.caption ?? ""}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 40vw"
                  loading={i < 4 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  unoptimized={!isOptimizable(photo.url)}
                />
                {/* A warm scrim that lifts on hover, carrying the district. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(13,11,9,0.78)] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                {photo.district && (
                  <span
                    aria-hidden
                    className={cn(
                      eyebrowClass(photo.district),
                      "pointer-events-none absolute bottom-0 left-0 translate-y-2 p-4 text-[var(--color-paper-100)] opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100",
                    )}
                  >
                    {photo.district}
                  </span>
                )}
              </button>
            </motion.li>
          );
        })}
      </ul>

      <Lightbox
        photos={photos}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
        locale={locale}
      />
    </>
  );
}

function isOptimizable(url: string): boolean {
  if (url.startsWith("/")) return true;
  try {
    const host = new URL(url).hostname;
    return host === "admin.durgotsav.com" || host === "durgotsav.imperative.co.in";
  } catch {
    return false;
  }
}
