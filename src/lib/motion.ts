import type { Variants } from "motion/react";

/**
 * The motion vocabulary.
 *
 * Three ideas, used everywhere, so the whole site moves with one grammar:
 *   rise   — content arrives from below as it enters the viewport
 *   unmask — images and headings are revealed by a travelling clip edge
 *   stagger— groups arrive in sequence, never all at once
 *
 * Durations are deliberately short. Cinematic means considered, not slow.
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUINT = [0.83, 0, 0.17, 1] as const;

export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const riseSmall: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

/** A heading revealed by a clip edge travelling upward. */
export const unmaskUp: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", y: "12%" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    y: "0%",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

/** An image revealed by a clip edge travelling right, with a slow counter-scale. */
export const unmaskRight: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: EASE_IN_OUT_QUINT },
  },
};

export const imageSettle: Variants = {
  hidden: { scale: 1.16 },
  visible: { scale: 1, transition: { duration: 1.3, ease: EASE_IN_OUT_QUINT } },
};

export function staggerChildren(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** Full-screen menu panel. */
export const menuPanel: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.65, ease: EASE_IN_OUT_QUINT },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.45, ease: EASE_IN_OUT_QUINT },
  },
};

export const menuItem: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.18 + i * 0.055 },
  }),
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};
