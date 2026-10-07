/**
 * A hairline reading-progress bar pinned under the header.
 *
 * A CSS scroll-driven animation: no JavaScript, no scroll listener, and it
 * runs on the compositor rather than the main thread. Decorative, so it is
 * hidden from assistive technology, and the reduced-motion and @supports
 * guards in globals.css leave it simply absent where it cannot run.
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden
      className="scroll-progress fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[var(--color-vermilion-500)] via-[var(--color-saffron-500)] to-[var(--color-gold-400)]"
    />
  );
}
