"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * A hairline reading-progress bar pinned under the header.
 * Decorative only — hidden from assistive tech, removed under reduced motion.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[var(--color-vermilion-500)] via-[var(--color-saffron-500)] to-[var(--color-gold-400)]"
    />
  );
}
