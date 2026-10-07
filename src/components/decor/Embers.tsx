"use client";

import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Diya embers drifting upward behind the hero.
 *
 * Deliberately cheap: a fixed set of spans driven by one CSS keyframe, with
 * deterministic positions so server and client markup agree. No canvas, no
 * rAF loop, no main-thread cost. Removed entirely under reduced motion.
 */

const COUNT = 18;

export function Embers({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  const embers = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        // A small deterministic hash keeps positions stable across renders.
        const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
        return {
          left: `${r(1) * 100}%`,
          bottom: `${r(2) * 45}%`,
          size: 1.5 + r(3) * 2.5,
          duration: 9 + r(4) * 11,
          delay: r(5) * 14,
          drift: `${(r(6) - 0.5) * 60}px`,
          peak: 0.25 + r(7) * 0.5,
        };
      }),
    [],
  );

  if (reduced) return null;

  return (
    <div aria-hidden className={className}>
      {embers.map((e, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[var(--color-gold-300)]"
          style={{
            left: e.left,
            bottom: e.bottom,
            width: e.size,
            height: e.size,
            opacity: 0,
            boxShadow: "0 0 6px 1px rgba(226, 200, 140, 0.45)",
            animation: `ember-drift ${e.duration}s ${e.delay}s ease-out infinite`,
            ["--ember-x" as string]: e.drift,
            ["--ember-peak" as string]: String(e.peak),
          }}
        />
      ))}
    </div>
  );
}
