import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The scroll-reveal primitive.
 *
 * Server components, with no JavaScript. The animation is a CSS scroll-driven
 * animation declared once in globals.css; this just marks the element.
 *
 * The important property is that revealed is the *default* state. Where the
 * browser supports `animation-timeline: view()` the content animates in as it
 * enters the viewport; everywhere else — and under reduced motion, and if
 * scripting is off entirely — it is simply visible. Nothing here can leave
 * content stranded at opacity 0.
 */

type Preset = "rise" | "unmask" | "fade";

export function Reveal({
  children,
  preset = "rise",
  as: Tag = "div",
  className,
  /** Stagger direct children instead of animating this element itself. */
  stagger,
}: {
  children: ReactNode;
  preset?: Preset;
  as?: ElementType;
  className?: string;
  /**
   * Present for call-site compatibility. Staggering is expressed as a scroll
   * range per child in CSS, so the value itself is not used.
   */
  stagger?: number;
  /** Accepted and ignored: delays have no meaning on a scroll timeline. */
  delay?: number;
}) {
  if (stagger !== undefined) {
    return (
      <Tag data-reveal-group="" className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag data-reveal={preset === "rise" ? "" : preset} className={className}>
      {children}
    </Tag>
  );
}

/** A direct child of a `stagger` Reveal. */
export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  preset?: Preset;
  as?: ElementType;
}) {
  return <Tag className={cn(className)}>{children}</Tag>;
}
