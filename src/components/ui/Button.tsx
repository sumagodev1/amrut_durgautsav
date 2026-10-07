"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHasFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

type Variant = "solid" | "outline" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Show the trailing arrow that slides on hover. */
  withArrow?: boolean;
  /** Magnetic pull toward the cursor. Desktop only, off under reduced motion. */
  magnetic?: boolean;
};

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = BaseProps & {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

const VARIANTS: Record<Variant, string> = {
  // Sharp-cornered, weighty. No pill shapes, no drop shadows.
  solid:
    "bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--accent)] hover:text-[var(--color-ink-900)]",
  outline:
    "border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  ghost: "text-[var(--foreground)] hover:text-[var(--accent)]",
};

const BASE =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-[2px] " +
  "px-7 py-3.5 text-[0.9375rem] font-semibold tracking-wide " +
  "transition-colors duration-300 ease-[var(--ease-out-expo)] " +
  "min-h-11";

/**
 * The one button. Magnetic hover is a progressive enhancement: it is applied
 * only where there is a fine pointer and motion is welcome.
 */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "solid",
    className,
    withArrow = false,
    magnetic = false,
  } = props;

  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const magnetEnabled = magnetic && finePointer && !reduced;

  function handleMove(e: MouseEvent<HTMLElement>) {
    if (!magnetEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Pull up to ~22% of the button's own size toward the pointer.
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    setOffset({ x, y });
  }

  function handleLeave() {
    if (magnetEnabled) setOffset({ x: 0, y: 0 });
  }

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowUpRight
          aria-hidden
          className="relative z-10 size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  const style = magnetEnabled
    ? {
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 && offset.y === 0 ? "transform 0.5s var(--ease-out-expo)" : "transform 0.12s linear",
      }
    : undefined;

  const classes = cn(BASE, VARIANTS[variant], className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" as const }
      : {};

    return (
      <span
        ref={ref}
        className="inline-block"
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor="link"
      >
        <Link href={href} className={classes} {...externalProps}>
          {inner}
        </Link>
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className="inline-block"
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="link"
    >
      <button type={props.type ?? "button"} onClick={props.onClick} className={classes}>
        {inner}
      </button>
    </span>
  );
}
