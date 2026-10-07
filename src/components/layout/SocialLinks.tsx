import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ACTIVE_SOCIAL, type SocialLink } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The row of social icon buttons.
 *
 * Driven entirely by `ACTIVE_SOCIAL`, so only accounts with a confirmed URL
 * appear — adding one is a data change in `src/data/site.ts` and nothing else.
 * Each button is a 44px square so it clears the touch-target minimum, and
 * carries a visible-to-screen-readers name since the icon itself is decorative.
 */

export const SOCIAL_ICONS: Record<SocialLink["key"], LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  // lucide ships no dedicated X mark; the bird is its closest equivalent and
  // the accessible name below says "X" regardless.
  x: Twitter,
  youtube: Youtube,
};

export function SocialLinks({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "compact";
}) {
  if (ACTIVE_SOCIAL.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {ACTIVE_SOCIAL.map((social) => {
        const Icon = SOCIAL_ICONS[social.key];
        return (
          <li key={social.key}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className={cn(
                "group inline-flex items-center justify-center rounded-[2px]",
                "border border-[var(--border)] text-[var(--muted)]",
                "transition-colors duration-300 ease-[var(--ease-out-expo)]",
                "hover:border-[var(--accent)] hover:text-[var(--accent)]",
                size === "compact" ? "size-10" : "size-11",
              )}
            >
              <Icon aria-hidden className="size-[18px]" strokeWidth={1.6} />
              <span className="sr-only">
                {social.label}
                {social.handle ? ` — ${social.handle}` : ""}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
