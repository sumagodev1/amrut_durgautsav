import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UI } from "@/data/ui";
import { formatNumber, t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Page links for the gallery and album.
 *
 * Real anchors with real hrefs, so pages are crawlable and can be opened in a
 * new tab — not buttons that mutate hidden state.
 */
export function Pagination({
  locale,
  basePath,
  page,
  totalPages,
  params = {},
}: {
  locale: Locale;
  basePath: string;
  page: number;
  totalPages: number;
  params?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  function hrefFor(target: number): string {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value) search.set(key, value);
    }
    if (target > 1) search.set("page", String(target));
    const query = search.toString();
    return query ? `${basePath}?${query}` : basePath;
  }

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const linkClass =
    "inline-flex min-h-11 items-center gap-2 rounded-[2px] border border-[var(--border)] px-4 py-2.5 text-[0.9375rem] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]";
  const disabledClass =
    "inline-flex min-h-11 items-center gap-2 rounded-[2px] border border-[var(--border)] px-4 py-2.5 text-[0.9375rem] opacity-40";

  return (
    <nav
      aria-label={t(UI.page, locale)}
      className="mt-12 flex items-center justify-between gap-4"
    >
      {hasPrev ? (
        <Link href={hrefFor(page - 1)} rel="prev" className={linkClass} data-cursor="link">
          <ChevronLeft aria-hidden className="size-4" />
          {t(UI.previous, locale)}
        </Link>
      ) : (
        <span className={cn(disabledClass, "cursor-default")} aria-disabled="true">
          <ChevronLeft aria-hidden className="size-4" />
          {t(UI.previous, locale)}
        </span>
      )}

      <p className="text-[0.9375rem] text-[var(--muted)] tabular-nums">
        {t(UI.page, locale)} {formatNumber(page, locale)}
        <span aria-hidden className="mx-1.5 opacity-50">
          /
        </span>
        {formatNumber(totalPages, locale)}
      </p>

      {hasNext ? (
        <Link href={hrefFor(page + 1)} rel="next" className={linkClass} data-cursor="link">
          {t(UI.next, locale)}
          <ChevronRight aria-hidden className="size-4" />
        </Link>
      ) : (
        <span className={cn(disabledClass, "cursor-default")} aria-disabled="true">
          {t(UI.next, locale)}
          <ChevronRight aria-hidden className="size-4" />
        </span>
      )}
    </nav>
  );
}
