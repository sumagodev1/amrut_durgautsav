"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { formatNumber, type Locale } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Counts a real figure up when it enters the viewport.
 *
 * Only ever used with values that came from the platform. If there is no
 * figure, the caller renders its unavailable state — this component is never
 * given a stand-in number.
 */
export function Counter({
  value,
  locale,
  className,
  durationMs = 1600,
}: {
  value: number;
  locale: Locale;
  className?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setShown(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      // Ease-out quint: fast first, settling into the final digits.
      const eased = 1 - Math.pow(1 - progress, 5);
      setShown(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, durationMs, reduced]);

  return (
    <span
      ref={ref}
      className={className}
      // Announce the final figure, not every intermediate frame.
      aria-label={formatNumber(value, locale)}
    >
      <span aria-hidden>{formatNumber(shown, locale)}</span>
    </span>
  );
}
