import { cn } from "@/lib/utils";

/**
 * The cultural marquee strip.
 *
 * Pure CSS animation on a duplicated track — no JS, no scroll listener, and
 * it pauses under `prefers-reduced-motion` via the global rule. The duplicate
 * copy is hidden from assistive tech so the phrases are announced once.
 */
export function Marquee({
  items,
  className,
  durationSeconds = 36,
  reverse = false,
}: {
  items: readonly string[];
  className?: string;
  durationSeconds?: number;
  reverse?: boolean;
}) {
  if (items.length === 0) return null;

  /**
   * The loop translates the pair of tracks by exactly -50%, so it only reads
   * as continuous if a single track is already wider than the viewport. With
   * a handful of short phrases it is not — the track runs out and a blank gap
   * sweeps across before the loop restarts.
   *
   * Repeating the phrases until each track holds at least this many keeps the
   * strip filled on a 2560px display without measuring anything at runtime,
   * which matters because this is a server component.
   */
  const MIN_ITEMS_PER_TRACK = 18;
  const repeats = Math.max(2, Math.ceil(MIN_ITEMS_PER_TRACK / items.length));
  const filled = Array.from({ length: repeats }, () => items).flat();

  const track = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {filled.map((item, i) => (
        <li
          key={`${item}-${i}`}
          className="flex items-center whitespace-nowrap"
          /* Only the first pass through the phrases is announced; the repeats
             exist purely to fill the track. */
          aria-hidden={!ariaHidden && i >= items.length ? true : undefined}
        >
          <span className="px-6 text-base tracking-wide sm:px-9 sm:text-[1.0625rem]">
            {item}
          </span>
          <Diamond />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "relative flex overflow-hidden border-y border-[var(--border)] py-4",
        className,
      )}
    >
      <div
        className="flex min-w-max"
        style={{
          animation: `marquee-x ${durationSeconds}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track(false)}
        {track(true)}
      </div>

      {/* Soften the two ends so phrases fade rather than clip. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-28"
      />
    </div>
  );
}

/** A small turned square — a quiet nod to the lozenge borders on fort gates. */
function Diamond() {
  return (
    <span
      aria-hidden
      className="size-1.5 rotate-45 bg-[var(--accent)] opacity-60"
    />
  );
}
