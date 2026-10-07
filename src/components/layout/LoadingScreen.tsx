"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SITE } from "@/data/site";
import { t, type Locale } from "@/lib/i18n";
import { EASE_IN_OUT_QUINT, EASE_OUT_EXPO } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn, eyebrowClass } from "@/lib/utils";

const SESSION_KEY = "durgotsav:intro-shown";

/**
 * First-visit intro.
 *
 * Shown once per browsing session, dismissed as soon as the window reports
 * `load` (with a hard ceiling of 2s so a slow third-party asset can never
 * hold the page hostage). Skipped for repeat navigations and under reduced
 * motion.
 *
 * The progress bar tracks a real signal — document readiness — rather than
 * animating a fake percentage.
 */
export function LoadingScreen({ locale }: { locale: Locale }) {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) return;

    let alreadyShown = true;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode or blocked storage: treat as shown and skip the intro
      // rather than replaying it on every navigation.
    }
    if (alreadyShown) return;

    setVisible(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* non-fatal */
    }

    const finish = () => setReady(true);
    if (document.readyState === "complete") {
      // Give the mark a beat to be seen rather than flashing.
      window.setTimeout(finish, 650);
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const ceiling = window.setTimeout(finish, 2000);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(ceiling);
    };
  }, [reduced]);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setVisible(false), 520);
    return () => window.clearTimeout(timer);
  }, [ready]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-ink-900)]"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.7, ease: EASE_IN_OUT_QUINT },
          }}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={ready ? { y: -14, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            >
              <Image
                src="/media/durgotsav-logo.png"
                alt=""
                width={96}
                height={96}
                priority
                className="size-20 sm:size-24"
              />
            </motion.div>

            <motion.p
              className="mt-7 font-[family-name:var(--font-devanagari)] text-2xl tracking-wide text-[var(--color-paper-50)] sm:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.14 }}
            >
              {t(SITE.festival, "mr")}{" "}
              <span className="text-[var(--color-gold-400)]">{t(SITE.year, "mr")}</span>
            </motion.p>

            <motion.p
              className={cn(eyebrowClass(t(SITE.parentBrand, locale)), "mt-3 text-[var(--muted)]")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t(SITE.parentBrand, locale)}
            </motion.p>

            {/* Progress — driven by document readiness, not a timer. */}
            <div className="mt-9 h-px w-40 overflow-hidden bg-[var(--border)] sm:w-56">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-vermilion-500)] to-[var(--color-gold-400)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: ready ? 1 : 0.7 }}
                style={{ originX: 0 }}
                transition={{ duration: ready ? 0.3 : 1.4, ease: EASE_OUT_EXPO }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
