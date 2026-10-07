"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { UI } from "@/data/ui";
import { t, DEFAULT_LOCALE } from "@/lib/i18n";
import { Display } from "@/components/ui/Typo";
import { GatewayMotif } from "@/components/decor/Ornament";

/**
 * Route-level error boundary.
 *
 * Keeps the brand, offers a retry, and never shows a stack trace to a
 * visitor. The digest is surfaced only in the console, where it is useful for
 * correlating with server logs.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = DEFAULT_LOCALE;

  useEffect(() => {
    console.error("Durgotsav route error:", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="zone-ink relative flex min-h-[70svh] flex-col items-center justify-center px-[var(--spacing-gutter)] py-28 text-center">
      <GatewayMotif className="opacity-35" />

      <Display locale={locale} level="h2" className="mt-8 text-[var(--foreground)]">
        {t(UI.errorTitle, locale)}
      </Display>

      <p lang={locale} className="text-lede mx-auto mt-5 max-w-lg text-[var(--muted)]">
        {t(UI.errorBody, locale)}
      </p>

      <button
        type="button"
        onClick={reset}
        className="group mt-9 inline-flex min-h-11 items-center gap-2.5 rounded-[2px] bg-[var(--primary)] px-7 py-3.5 text-[0.9375rem] font-semibold text-[var(--primary-contrast)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--color-ink-900)]"
      >
        <RotateCcw
          aria-hidden
          className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-180"
        />
        {t(UI.retry, locale)}
      </button>
    </section>
  );
}
