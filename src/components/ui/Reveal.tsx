"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { rise, riseSmall, fade, unmaskUp, staggerChildren, VIEWPORT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

const PRESETS: Record<string, Variants> = {
  rise,
  riseSmall,
  fade,
  unmaskUp,
};

type RevealProps = {
  children: ReactNode;
  /** Which motion to use. Defaults to the standard rise. */
  preset?: keyof typeof PRESETS;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Stagger direct children instead of animating this element itself. */
  stagger?: number;
};

/**
 * The single scroll-reveal primitive. Everything on the site that animates
 * into view goes through this, so timing stays consistent and reduced-motion
 * is handled in exactly one place.
 */
export function Reveal({
  children,
  preset = "rise",
  as = "div",
  className,
  delay = 0,
  stagger,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants = stagger ? staggerChildren(stagger, delay) : PRESETS[preset];

  return (
    <MotionTag
      data-reveal
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={stagger ? undefined : { delay }}
    >
      {children}
    </MotionTag>
  );
}

/** A child of a `stagger` Reveal. */
export function RevealItem({
  children,
  className,
  preset = "rise",
  as = "div",
}: Omit<RevealProps, "stagger" | "delay">) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag data-reveal className={className} variants={PRESETS[preset]}>
      {children}
    </MotionTag>
  );
}
