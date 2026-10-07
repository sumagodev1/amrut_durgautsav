"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useHasFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Lenis smooth scrolling.
 *
 * Deliberately light-touch: `lerp` is high enough that the page still feels
 * directly connected to the wheel. We do not hijack anchor jumps, do not
 * intercept keyboard scrolling, and do not run at all when the user has asked
 * for reduced motion — in that case the browser's own scrolling is used,
 * untouched.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();
  const finePointer = useHasFinePointer();

  useEffect(() => {
    // Touch devices keep native scrolling: their momentum is better than
    // anything we would synthesise, it stays off the main thread, and a
    // permanent requestAnimationFrame loop is a real cost on a phone.
    if (reduced || !finePointer) return;

    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      // Touch devices keep their native momentum — it is better than anything
      // we would synthesise, and it keeps scrolling off the main thread.
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors must still work, and must land in the right place.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.('a[href*="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -88 });
      history.pushState(null, "", url.hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced, finePointer]);

  return null;
}
