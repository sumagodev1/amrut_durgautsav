import { cn } from "@/lib/utils";

/**
 * The decorative vocabulary.
 *
 * Every piece here is line art at low opacity, drawn in `currentColor`.
 * Nothing in this file is allowed to compete with content: these are accents
 * that reward a second look, not pattern fills.
 */

/** A rampart rule — a hairline that terminates in merlons. Used under headings. */
export function RampartRule({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 12"
      fill="none"
      aria-hidden="true"
      className={cn("h-3 w-60 text-[var(--accent)]", className)}
      preserveAspectRatio="none"
    >
      <path
        d="M0 11 H60 V5 H72 V11 H96 V2 H112 V11 H128 V2 H144 V11 H168 V5 H180 V11 H240"
        stroke="currentColor"
        strokeWidth={1.2}
        opacity={0.55}
      />
    </svg>
  );
}

/**
 * A kalash-and-arch motif — the gateway profile found above fort darwajas,
 * reduced to a single stroke. Used as a section divider.
 */
export function GatewayMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 64"
      fill="none"
      aria-hidden="true"
      className={cn("h-16 w-30 text-[var(--accent)]", className)}
    >
      <g stroke="currentColor" strokeWidth={1.3} opacity={0.6}>
        <path d="M20 64 V30 A40 40 0 0 1 100 30 V64" />
        <path d="M32 64 V32 A28 28 0 0 1 88 32 V64" opacity={0.55} />
        <line x1="60" y1="4" x2="60" y2="16" />
        <circle cx="60" cy="19" r={4} />
        <path d="M52 26 Q60 16 68 26" />
      </g>
    </svg>
  );
}

/**
 * Warli-inspired figures: the joined-hands chain that stands for community.
 * Drawn from the Warli convention of triangles, circles and lines — used once,
 * at the community moment of the page, rather than as wallpaper.
 */
export function WarliChain({
  count = 7,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const step = 56;
  const width = count * step;

  return (
    <svg
      viewBox={`0 0 ${width} 80`}
      fill="none"
      aria-hidden="true"
      className={cn("h-20 text-[var(--accent)]", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke="currentColor" strokeWidth={1.4} opacity={0.55}>
        {Array.from({ length: count }, (_, i) => {
          const x = i * step + step / 2;
          const lean = i % 2 === 0 ? -1 : 1;
          return (
            <g key={i}>
              <circle cx={x} cy={16} r={6} />
              {/* Two triangles, apex to apex — the Warli body */}
              <path d={`M ${x} 38 L ${x - 10} 24 L ${x + 10} 24 Z`} />
              <path d={`M ${x} 38 L ${x - 10} 54 L ${x + 10} 54 Z`} />
              {/* Legs */}
              <path d={`M ${x - 5} 54 L ${x - 11} 72 M ${x + 5} 54 L ${x + 11} 72`} />
              {/* Arms, joined to the neighbouring figures. The outermost
                  arms are omitted so the chain ends at a person rather
                  than trailing a line into empty space. */}
              {i > 0 && <path d={`M ${x - 9} 30 L ${x - step / 2} ${22 + lean * 3}`} />}
              {i < count - 1 && (
                <path d={`M ${x + 9} 30 L ${x + step / 2} ${22 - lean * 3}`} />
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/**
 * A concentric geometric rosette, as found carved on temple ceilings and the
 * campaign emblem. Used as a very low-opacity backdrop behind large numbers.
 */
export function Rosette({ className }: { className?: string }) {
  const petals = 16;
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={cn("size-48 text-[var(--accent)]", className)}
    >
      <g stroke="currentColor" strokeWidth={0.9} opacity={0.4}>
        <circle cx="100" cy="100" r="96" />
        <circle cx="100" cy="100" r="74" />
        <circle cx="100" cy="100" r="40" />
        <circle cx="100" cy="100" r="12" />
        {Array.from({ length: petals }, (_, i) => {
          const a = (i / petals) * Math.PI * 2;
          const x1 = 100 + Math.cos(a) * 40;
          const y1 = 100 + Math.sin(a) * 40;
          const x2 = 100 + Math.cos(a) * 74;
          const y2 = 100 + Math.sin(a) * 74;
          const mid = a + Math.PI / petals;
          const cx = 100 + Math.cos(mid) * 62;
          const cy = 100 + Math.sin(mid) * 62;
          return <path key={i} d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`} />;
        })}
      </g>
    </svg>
  );
}

/**
 * A fine ruled border in the manner of a printed Marathi title page —
 * double rule with turned-square corners.
 */
export function RuledFrame({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 border border-[var(--border)]",
        className,
      )}
    >
      <span className="absolute inset-[6px] border border-[var(--border)] opacity-50" />
      {(
        [
          "-top-[3px] -left-[3px]",
          "-top-[3px] -right-[3px]",
          "-bottom-[3px] -left-[3px]",
          "-bottom-[3px] -right-[3px]",
        ] as const
      ).map((pos) => (
        <span
          key={pos}
          className={cn(
            "absolute size-1.5 rotate-45 bg-[var(--accent)] opacity-70",
            pos,
          )}
        />
      ))}
    </div>
  );
}
