"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, CalendarDays } from "lucide-react";
import { REGISTRATION_NOTICE } from "@/data/timeline";
import { t, type Locale } from "@/lib/i18n";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn, eyebrowClass } from "@/lib/utils";

const STORAGE_KEY = "durgotsav:registration-notice-dismissed";

/**
 * The registration notice from the source site.
 *
 * The original is a modal that blocks the page on arrival. This is a bar that
 * settles in at the foot of the viewport after the hero has had its moment:
 * the same information, none of the interruption. Dismissal is remembered,
 * and it never traps focus or covers content.
 */
export function RegistrationNotice({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Storage blocked — show the notice; it is dismissible either way.
    }
    if (dismissed) return;

    const timer = window.setTimeout(() => setVisible(true), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* non-fatal */
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          className="fixed inset-x-3 bottom-3 z-[65] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <div className="relative flex gap-4 border border-[color-mix(in_srgb,var(--color-gold-500)_32%,transparent)] bg-[color-mix(in_srgb,var(--color-ink-800)_94%,transparent)] p-5 pr-12 backdrop-blur-xl">
            <CalendarDays
              aria-hidden
              className="mt-0.5 size-5 shrink-0 text-[var(--color-gold-400)]"
              strokeWidth={1.6}
            />
            <div>
              <p
                className={cn(
                  eyebrowClass(t(REGISTRATION_NOTICE.title, locale)),
                  "text-[var(--color-gold-300)]",
                )}
              >
                {t(REGISTRATION_NOTICE.title, locale)}
              </p>
              <p
                lang={locale}
                className="mt-2 text-[0.875rem] leading-[1.7] text-[var(--color-paper-100)]"
              >
                {t(REGISTRATION_NOTICE.body, locale)}
              </p>
            </div>

            <button
              type="button"
              onClick={dismiss}
              className="absolute top-2.5 right-2.5 inline-flex size-9 items-center justify-center text-[var(--color-paper-300)] transition-colors hover:text-[var(--color-gold-300)]"
              aria-label={t(REGISTRATION_NOTICE.dismiss, locale)}
            >
              <X className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
