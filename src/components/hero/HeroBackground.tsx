"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Embers } from "@/components/decor/Embers";

/**
 * The hero ground: a photograph of Rajgad under monsoon cloud, pushed back
 * behind warm darkness so the typography can hold the foreground.
 *
 * The image drifts at roughly a quarter of scroll speed. That is enough to
 * give depth and little enough to avoid the queasy, over-parallaxed feel.
 */
export function HeroBackground({ alt }: { alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y, scale }}
      >
        <Image
          src="/fort/rajgad-fort.png"
          alt={alt}
          fill
          priority
          fetchPriority="high"
          quality={82}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Warm grade over the cool photograph — brings it into the palette. */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(180deg, rgba(78,20,19,0.55) 0%, rgba(13,11,9,0.35) 45%, rgba(13,11,9,0.95) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 38%, rgba(227,144,58,0.45) 0%, transparent 70%)",
        }}
      />

      <div aria-hidden className="vignette" />
      <div aria-hidden className="grain-overlay opacity-35" />

      <Embers className="absolute inset-0 overflow-hidden" />

      {/* Darkens as the hero leaves, so the next band arrives cleanly. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[var(--color-ink-900)]"
        style={reduced ? { opacity: 0 } : { opacity: dim }}
      />
    </div>
  );
}
