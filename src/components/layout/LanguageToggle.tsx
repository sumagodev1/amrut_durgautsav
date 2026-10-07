"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABEL, isLocale, type Locale } from "@/lib/i18n";
import { UI } from "@/data/ui";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Switches locale while staying on the same page.
 *
 * Real links, not a client-side state flip — so each locale has its own URL,
 * is crawlable, and can be opened in a new tab.
 */
export function LanguageToggle({
  locale,
  className,
  size = "sm",
}: {
  locale: Locale;
  className?: string;
  size?: "sm" | "lg";
}) {
  const pathname = usePathname() ?? `/${locale}`;

  /** Swap the first path segment for the target locale. */
  function hrefFor(target: Locale): string {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && isLocale(segments[0])) {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    return `/${segments.join("/")}`;
  }

  return (
    <div
      className={cn("flex items-center", className)}
      role="group"
      aria-label={t(UI.languageLabel, locale)}
    >
      {LOCALES.map((option, i) => {
        const active = option === locale;
        return (
          <span key={option} className="flex items-center">
            {i > 0 && (
              <span aria-hidden className="mx-1.5 h-3 w-px bg-[var(--border)]" />
            )}
            <Link
              href={hrefFor(option)}
              hrefLang={option}
              aria-current={active ? "true" : undefined}
              data-cursor="link"
              className={cn(
                "rounded-[2px] px-1 transition-colors duration-300",
                size === "lg" ? "py-2 text-base" : "py-1 text-xs",
                option === "mr" && "font-[family-name:var(--font-devanagari)]",
                active
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]",
              )}
            >
              {LOCALE_LABEL[option]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
