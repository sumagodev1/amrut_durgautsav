import { UI } from "@/data/ui";
import { t, DEFAULT_LOCALE } from "@/lib/i18n";

/**
 * Route-level loading state.
 *
 * Deliberately minimal — a thin indeterminate rule rather than a skeleton of
 * the page. Pages here are mostly static, so this shows only when a data
 * fetch is genuinely in flight, and a flash of fake layout would be worse
 * than a quiet line.
 */
export default function Loading() {
  return (
    <div className="zone-ink flex min-h-[60svh] flex-col items-center justify-center gap-6">
      <div
        className="h-px w-40 overflow-hidden bg-[var(--border)] sm:w-56"
        role="status"
        aria-live="polite"
        aria-label={t(UI.loading, DEFAULT_LOCALE)}
      >
        <div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-[var(--color-gold-400)] to-transparent"
          style={{ animation: "shimmer-sweep 1.3s var(--ease-in-out-quint) infinite" }}
        />
      </div>
      <p className="text-eyebrow text-[var(--muted)]">{t(UI.loading, DEFAULT_LOCALE)}</p>
    </div>
  );
}
