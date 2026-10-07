import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";

/**
 * Locale prefixing.
 *
 * Every page lives under /mr or /en. Anything arriving without a locale
 * prefix is sent to the default locale with its path intact, so:
 *
 *   /            → /mr
 *   /forts       → /mr/forts          (a real page — the link still works)
 *   /anything    → /mr/anything       (no such page — a branded 404)
 *
 * Doing this here rather than in the layout matters: the layout only ever
 * sees the first path segment, so it would silently drop the rest of a deep
 * link. It also keeps unknown paths from being swallowed by the [locale]
 * segment and rendering the framework's own bare 404.
 *
 * Renamed routes from the previous site are handled by the permanent
 * redirects in next.config.ts, which run before this.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  /**
   * Skip everything that is not a page: framework assets, the metadata
   * routes, and any request with a file extension (images, fonts, the
   * favicon). Those must be served as-is, not locale-prefixed.
   */
  matcher: [
    "/((?!_next/|api/|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|.*\\.[\\w]+$).*)",
  ],
};
