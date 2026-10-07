import { UI } from "@/data/ui";
import { t, DEFAULT_LOCALE } from "@/lib/i18n";

/**
 * Loading state for the photo routes.
 *
 * Scoped deliberately to the two routes that are genuinely rendered per
 * request. A loading boundary at the locale level would be worse than
 * useless: every other page is prerendered, so its only effect would be to
 * place a skeleton at the top of the document that paints before the real
 * markup — already present further down — has finished arriving.
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
