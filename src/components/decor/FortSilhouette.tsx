import type { FortTypology } from "@/data/forts";
import { cn } from "@/lib/utils";

/**
 * Line-art silhouettes, one per site typology in the UNESCO nomination.
 *
 * We hold photographs of only one of the twelve forts. Rather than dress the
 * other eleven in stock imagery that misrepresents them, each fort is drawn
 * as architecture: a ridge line, a rampart, a bastion. The drawing describes
 * the *kind* of place truthfully and claims nothing more.
 *
 * All strokes use `currentColor`, so a silhouette takes the colour of
 * whatever zone it sits in.
 */

type Props = {
  typology: FortTypology;
  className?: string;
};

export function FortSilhouette({ typology, className }: Props) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMax meet"
    >
      {SHAPES[typology]}
    </svg>
  );
}

/* A crenellated wall: the repeating merlon profile every fort shares. */
function Crenellation({
  x,
  y,
  width,
  step = 16,
  height = 9,
}: {
  x: number;
  y: number;
  width: number;
  step?: number;
  height?: number;
}) {
  const parts: string[] = [`M ${x} ${y + height}`];
  let cursor = x;
  let up = true;
  while (cursor < x + width) {
    const next = Math.min(cursor + step / 2, x + width);
    parts.push(`L ${cursor} ${up ? y : y + height}`);
    parts.push(`L ${next} ${up ? y : y + height}`);
    cursor = next;
    up = !up;
  }
  parts.push(`L ${x + width} ${y + height}`);
  return <path d={parts.join(" ")} stroke="currentColor" strokeWidth={1.6} strokeLinejoin="miter" />;
}

/* A round bastion with its arrow-slits. */
function Bastion({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g stroke="currentColor" strokeWidth={1.6}>
      <path d={`M ${cx - r} ${cy + r * 1.5} L ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} L ${cx + r} ${cy + r * 1.5}`} />
      <line x1={cx} y1={cy + r * 0.35} x2={cx} y2={cy + r * 0.95} opacity={0.65} />
    </g>
  );
}

const SHAPES: Record<FortTypology, React.ReactNode> = {
  /* Tall peak, stepped ramparts climbing it, standard at the summit. */
  hill: (
    <g>
      <path
        d="M 0 240 L 96 150 L 150 176 L 206 86 L 262 150 L 318 128 L 400 240 Z"
        fill="currentColor"
        opacity={0.07}
      />
      <path
        d="M 0 240 L 96 150 L 150 176 L 206 86 L 262 150 L 318 128 L 400 240"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <Crenellation x={176} y={66} width={62} step={15} height={9} />
      <line x1={176} y1={75} x2={176} y2={104} stroke="currentColor" strokeWidth={1.6} />
      <line x1={238} y1={75} x2={238} y2={104} stroke="currentColor" strokeWidth={1.6} />
      <Bastion cx={150} cy={160} r={14} />
      <Bastion cx={272} cy={148} r={12} />
      {/* Standard */}
      <line x1={207} y1={66} x2={207} y2={30} stroke="currentColor" strokeWidth={1.6} />
      <path d="M 207 32 L 238 41 L 207 50 Z" fill="currentColor" opacity={0.75} />
      {/* The approach path */}
      <path
        d="M 46 240 C 92 206 104 186 150 176"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeDasharray="5 7"
        opacity={0.5}
      />
    </g>
  ),

  /* Peak wrapped in forest canopy. */
  "hill-forest": (
    <g>
      <path
        d="M 0 240 L 74 168 L 140 194 L 200 96 L 262 168 L 330 146 L 400 240 Z"
        fill="currentColor"
        opacity={0.07}
      />
      <path
        d="M 0 240 L 74 168 L 140 194 L 200 96 L 262 168 L 330 146 L 400 240"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <Crenellation x={172} y={78} width={56} step={14} height={8} />
      <line x1={172} y1={86} x2={172} y2={112} stroke="currentColor" strokeWidth={1.6} />
      <line x1={228} y1={86} x2={228} y2={112} stroke="currentColor" strokeWidth={1.6} />
      <Bastion cx={200} cy={118} r={13} />
      {/* Canopy — a tree line, not a texture */}
      <g stroke="currentColor" strokeWidth={1.4} opacity={0.72}>
        {[26, 58, 90, 122, 278, 310, 342, 374].map((x, i) => (
          <g key={x}>
            <line x1={x} y1={240} x2={x} y2={222 - (i % 3) * 5} />
            <path
              d={`M ${x - 13} ${224 - (i % 3) * 5} Q ${x} ${198 - (i % 3) * 6} ${x + 13} ${224 - (i % 3) * 5}`}
            />
          </g>
        ))}
      </g>
    </g>
  ),

  /* Broad flat summit carrying a long curtain wall. */
  "hill-plateau": (
    <g>
      <path
        d="M 0 240 L 58 162 L 118 118 L 300 118 L 352 164 L 400 240 Z"
        fill="currentColor"
        opacity={0.07}
      />
      <path
        d="M 0 240 L 58 162 L 118 118 L 300 118 L 352 164 L 400 240"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <Crenellation x={118} y={100} width={182} step={16} height={9} />
      <Bastion cx={118} cy={110} r={14} />
      <Bastion cx={209} cy={110} r={11} />
      <Bastion cx={300} cy={110} r={14} />
      {/* Granary ranges along the plateau */}
      <g stroke="currentColor" strokeWidth={1.3} opacity={0.6}>
        <rect x={150} y={128} width={44} height={20} />
        <rect x={214} y={128} width={44} height={20} />
        <line x1={150} y1={138} x2={194} y2={138} />
        <line x1={214} y1={138} x2={258} y2={138} />
      </g>
      <line x1={209} y1={100} x2={209} y2={62} stroke="currentColor" strokeWidth={1.6} />
      <path d="M 209 64 L 240 73 L 209 82 Z" fill="currentColor" opacity={0.75} />
    </g>
  ),

  /* Headland bastion above the surf. */
  coastal: (
    <g>
      <path d="M 0 198 L 128 198 L 150 150 L 282 150 L 304 198 L 400 198 L 400 240 L 0 240 Z" fill="currentColor" opacity={0.07} />
      <path
        d="M 0 198 L 128 198 L 150 150 L 282 150 L 304 198 L 400 198"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <Crenellation x={150} y={132} width={132} step={16} height={9} />
      <Bastion cx={150} cy={142} r={14} />
      <Bastion cx={282} cy={142} r={14} />
      {/* Inner line of wall — Vijaydurg's defining three rings */}
      <path d="M 178 150 L 178 132 M 254 150 L 254 132" stroke="currentColor" strokeWidth={1.3} opacity={0.6} />
      <rect x={198} y={160} width={36} height={38} stroke="currentColor" strokeWidth={1.4} opacity={0.7} />
      <path d="M 204 198 L 204 176 A 12 12 0 0 1 228 176 L 228 198" stroke="currentColor" strokeWidth={1.4} opacity={0.7} />
      {/* Sea */}
      <g stroke="currentColor" strokeWidth={1.2} opacity={0.45}>
        <path d="M -10 214 q 22 -8 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0" />
        <path d="M -10 230 q 22 -8 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0" />
      </g>
    </g>
  ),

  /* Island fort — curtain wall ringing a rock, sea on every side. */
  island: (
    <g>
      <path d="M 92 196 L 110 142 L 290 142 L 308 196 Z" fill="currentColor" opacity={0.07} />
      <path d="M 92 196 L 110 142 M 290 142 L 308 196" stroke="currentColor" strokeWidth={1.6} />
      <Crenellation x={110} y={124} width={180} step={15} height={9} />
      <Bastion cx={110} cy={134} r={15} />
      <Bastion cx={200} cy={134} r={12} />
      <Bastion cx={290} cy={134} r={15} />
      {/* Gateway, set off-axis the way island forts conceal their entrance */}
      <path d="M 158 196 L 158 168 A 14 14 0 0 1 186 168 L 186 196" stroke="currentColor" strokeWidth={1.5} opacity={0.75} />
      <line x1={200} y1={124} x2={200} y2={88} stroke="currentColor" strokeWidth={1.6} />
      <path d="M 200 90 L 231 99 L 200 108 Z" fill="currentColor" opacity={0.75} />
      {/* Rock */}
      <path d="M 70 208 Q 200 188 330 208 L 330 212 Q 200 194 70 212 Z" fill="currentColor" opacity={0.3} />
      {/* Sea on all sides */}
      <g stroke="currentColor" strokeWidth={1.2} opacity={0.45}>
        <path d="M -10 220 q 22 -8 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0" />
        <path d="M -10 234 q 22 -8 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0" />
      </g>
    </g>
  ),
};
