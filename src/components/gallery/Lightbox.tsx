"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/lib/repositories";
import { UI } from "@/data/ui";
import { t, formatNumber, type Locale } from "@/lib/i18n";
import { useScrollLock, usePrefersReducedMotion } from "@/lib/hooks";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn, eyebrowClass } from "@/lib/utils";

/**
 * Full-screen photo viewer.
 *
 * Keyboard: ← → to move, Escape to close, Tab trapped inside.
 * Touch: horizontal swipe to move.
 * The trigger regains focus on close.
 */
export function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
  locale,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
  locale: Locale;
}) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reduced = usePrefersReducedMotion();

  useScrollLock(open);

  const go = useCallback(
    (delta: number) => {
      if (index === null || photos.length === 0) return;
      onNavigate((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return go(1);
      if (e.key === "ArrowLeft") return go(-1);
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose, go]);

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption ?? t(UI.viewAll, locale)}
          tabIndex={-1}
          className="fixed inset-0 z-[96] flex flex-col bg-[color-mix(in_srgb,var(--color-ink-900)_96%,transparent)] backdrop-blur-sm outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={(e) => {
            const start = touchStart.current;
            if (!start) return;
            const touch = e.changedTouches[0];
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            // Only treat it as a swipe when it is clearly horizontal.
            if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              go(dx < 0 ? 1 : -1);
            }
            touchStart.current = null;
          }}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-4 px-[var(--spacing-gutter)] py-4">
            <p className="text-eyebrow text-[var(--color-paper-300)] tabular-nums">
              {formatNumber(index + 1, locale)}
              <span aria-hidden className="mx-2 opacity-50">
                /
              </span>
              {formatNumber(photos.length, locale)}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label={t(UI.close, locale)}
              className="inline-flex size-11 items-center justify-center text-[var(--color-paper-100)] transition-colors hover:text-[var(--color-gold-300)]"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-[var(--spacing-gutter)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.id}
                className="relative h-full w-full"
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
              >
                <Image
                  src={photo.url}
                  alt={photo.caption ?? ""}
                  fill
                  sizes="100vw"
                  quality={88}
                  className="object-contain"
                  unoptimized={!isOptimizable(photo.url)}
                />
              </motion.div>
            </AnimatePresence>

            {photos.length > 1 && (
              <>
                <NavButton side="left" onClick={() => go(-1)} label={t(UI.previous, locale)} />
                <NavButton side="right" onClick={() => go(1)} label={t(UI.next, locale)} />
              </>
            )}
          </div>

          {(photo.caption || photo.district) && (
            <div className="shrink-0 px-[var(--spacing-gutter)] pb-6 text-center">
              {photo.caption && (
                <p className="text-sm text-[var(--color-paper-100)]">{photo.caption}</p>
              )}
              {photo.district && (
                <p
                  className={cn(
                    eyebrowClass(photo.district),
                    "mt-1.5 text-[var(--color-paper-400)]",
                  )}
                >
                  {photo.district}
                </p>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 ${side === "left" ? "left-1 sm:left-3" : "right-1 sm:right-3"} inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-gold-500)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-ink-900)_55%,transparent)] text-[var(--color-paper-100)] backdrop-blur-sm transition-colors hover:border-[var(--color-gold-400)] hover:text-[var(--color-gold-300)]`}
    >
      <Icon className="size-5" strokeWidth={1.6} />
    </button>
  );
}

/**
 * Remote hosts must be allow-listed in next.config to be optimised. Anything
 * served from an unexpected host is passed through untouched rather than
 * throwing at render time.
 */
function isOptimizable(url: string): boolean {
  if (url.startsWith("/")) return true;
  try {
    const host = new URL(url).hostname;
    return host === "admin.durgotsav.com" || host === "durgotsav.imperative.co.in";
  } catch {
    return false;
  }
}
