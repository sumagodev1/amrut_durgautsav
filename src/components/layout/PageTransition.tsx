"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { EASE_IN_OUT_QUINT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { SITE } from "@/data/site";
import { t } from "@/lib/i18n";

/**
 * Between-page curtain.
 *
 * A short wipe carrying the campaign emblem — long enough to read as
 * intentional, short enough that it never stands between a visitor and the
 * page they asked for. Roughly 600ms end to end.
 *
 * Two deliberate restraints:
 *  - it does not run on the first load, where the loading screen already has
 *    the stage;
 *  - it does not run at all under `prefers-reduced-motion`.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const isFirstRender = useRef(true);
  const [curtainKey, setCurtainKey] = useState<string | null>(null);
  /**
   * The enter animation must not run on the first load.
   *
   * Starting the page content at opacity 0 means nothing is painted until
   * React has downloaded, parsed and hydrated — which pushed Largest
   * Contentful Paint out to seven seconds. On first load the content is
   * therefore rendered plainly, exactly as the server sent it; the fade is
   * reserved for client-side navigations, where the markup is already there.
   */
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setHasNavigated(true);
    if (reduced) return;
    setCurtainKey(pathname);
    const timer = window.setTimeout(() => setCurtainKey(null), 700);
    return () => window.clearTimeout(timer);
  }, [pathname, reduced]);

  return (
    <>
      <AnimatePresence>
        {curtainKey && (
          <motion.div
            key={curtainKey}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-[var(--color-ink-900)]"
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{
              clipPath: "inset(0% 0% 100% 0%)",
              transition: { duration: 0.55, ease: EASE_IN_OUT_QUINT },
            }}
          >
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <Image
                src="/media/durgotsav-logo.png"
                alt=""
                width={64}
                height={64}
                className="size-14"
              />
              <span className="font-[family-name:var(--font-devanagari)] text-xl tracking-wide text-[var(--color-paper-50)]">
                {t(SITE.festival, "mr")}{" "}
                <span className="text-[var(--color-gold-400)]">{t(SITE.year, "mr")}</span>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The incoming page fades up under the departing curtain. */}
      <motion.div
        key={pathname}
        initial={hasNavigated && !reduced ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE_IN_OUT_QUINT, delay: reduced ? 0 : 0.12 }}
      >
        {children}
      </motion.div>
    </>
  );
}
