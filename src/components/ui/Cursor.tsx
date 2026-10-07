"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useHasFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { useLocale } from "@/components/LocaleProvider";
import { t, type LocalizedText } from "@/lib/i18n";

/**
 * A small custom cursor for desktop.
 *
 * Elements declare their own intent with `data-cursor="view" | "link" |
 * "explore"`, so the cursor never has to know about the page it is on.
 *
 * It is mounted only when there is a fine pointer and motion is welcome, and
 * it never replaces the native cursor — the OS cursor stays visible, so a
 * user who loses the custom one is not stranded.
 */

const LABELS: Record<string, LocalizedText> = {
  view: { mr: "पहा", en: "View" },
  explore: { mr: "शोधा", en: "Explore" },
};

export function Cursor() {
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const locale = useLocale();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.35 });

  const [mode, setMode] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const enabled = finePointer && !reduced;

  useEffect(() => {
    if (!enabled) return;

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as Element | null;
      const host = target?.closest?.("[data-cursor]");
      setMode(host?.getAttribute("data-cursor") ?? null);
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const label = mode && LABELS[mode] ? t(LABELS[mode], locale) : null;
  const isLink = mode === "link";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden lg:block"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-[var(--color-gold-400)] text-xs font-semibold tracking-[0.18em] text-[var(--color-gold-300)] uppercase backdrop-blur-[2px]"
        animate={{
          width: label ? 76 : isLink ? 34 : 14,
          height: label ? 76 : isLink ? 34 : 14,
          x: label ? -38 : isLink ? -17 : -7,
          y: label ? -38 : isLink ? -17 : -7,
          opacity: visible ? 1 : 0,
          backgroundColor: label ? "rgba(13,11,9,0.55)" : "rgba(207,174,99,0.14)",
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
