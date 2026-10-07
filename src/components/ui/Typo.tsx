import type { ElementType, ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { cn, isDevanagari } from "@/lib/utils";

/**
 * Typography bridge between the two scripts.
 *
 * Devanagari and Latin need different display faces and different metrics to
 * sit at the same optical weight. Rather than scattering that decision across
 * components, every headline on the site goes through here.
 */

type Level = "display" | "h1" | "h2" | "h3";

const LATIN: Record<Level, string> = {
  display: "text-display font-[family-name:var(--font-display)]",
  h1: "text-h1 font-[family-name:var(--font-display)]",
  h2: "text-h2 font-[family-name:var(--font-display)]",
  h3: "text-h3 font-[family-name:var(--font-sans)] font-semibold",
};

const DEVANAGARI: Record<Level, string> = {
  display: "text-display-mr",
  h1: "text-h1-mr",
  h2: "text-h2-mr",
  h3: "text-h3 font-[family-name:var(--font-devanagari)] font-normal leading-snug",
};

export function Display({
  children,
  locale,
  level = "h2",
  as,
  className,
  /** Force a script, e.g. a Marathi lockup shown inside the English site. */
  script,
}: {
  children: ReactNode;
  locale: Locale;
  level?: Level;
  as?: ElementType;
  className?: string;
  script?: "mr" | "en";
}) {
  const resolved = script ?? locale;
  const isDevanagari = resolved === "mr";
  const Tag = (as ?? (level === "display" ? "h1" : level === "h3" ? "h3" : "h2")) as ElementType;

  return (
    <Tag
      lang={isDevanagari ? "mr" : "en"}
      className={cn(isDevanagari ? DEVANAGARI[level] : LATIN[level], className)}
    >
      {children}
    </Tag>
  );
}

/**
 * The small label above a section heading.
 *
 * It inspects the text it is given and sets it for the script it is written
 * in — so a Marathi eyebrow never inherits Latin letter-spacing.
 */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const devanagari = containsDevanagari(children);

  return (
    <Tag
      className={cn(
        devanagari ? "text-eyebrow-mr" : "text-eyebrow",
        "flex items-center gap-3 text-[var(--accent)]",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 shrink-0 bg-[var(--accent)] opacity-60" />
      {children}
    </Tag>
  );
}

/** Walks a React children tree looking for Devanagari in any string leaf. */
function containsDevanagari(node: ReactNode): boolean {
  if (typeof node === "string") return isDevanagari(node);
  if (typeof node === "number") return false;
  if (Array.isArray(node)) return node.some(containsDevanagari);
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return containsDevanagari(props?.children);
  }
  return false;
}

/** Body copy that adapts leading to the script it carries. */
export function Prose({
  children,
  locale,
  className,
  size = "base",
}: {
  children: ReactNode;
  locale: Locale;
  className?: string;
  size?: "base" | "lede";
}) {
  return (
    <div
      lang={locale}
      className={cn(
        size === "lede" ? "text-lede" : "text-[0.9375rem] leading-[1.8] sm:text-base",
        locale === "mr" && "leading-[1.9]",
        "text-[var(--muted)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
