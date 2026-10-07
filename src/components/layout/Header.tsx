"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { NAV } from "@/data/site";
import { UI } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { cn, localeHref } from "@/lib/utils";
import { BrandLockup } from "./BrandLockup";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/Button";

/**
 * Sticky navigation.
 *
 * Transparent over the hero, then settling into a blurred glass bar once the
 * page has moved. The active-section indicator is a shared layout line that
 * slides between items rather than appearing and disappearing.
 */
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  const activeKey = NAV.find((item) =>
    pathname.startsWith(localeHref(locale, item.href)),
  )?.key;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[75] transition-[background-color,backdrop-filter,border-color] duration-500 ease-[var(--ease-out-expo)]",
          scrolled
            ? "border-b border-[color-mix(in_srgb,var(--color-gold-500)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-ink-900)_82%,transparent)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-6 lg:h-20">
          <BrandLockup locale={locale} />

          <nav aria-label={t(UI.menu, locale)} className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => {
                const href = localeHref(locale, item.href);
                const active = item.key === activeKey;
                return (
                  <li key={item.key}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      data-cursor="link"
                      className={cn(
                        "group relative inline-flex items-center px-3 py-2 text-[0.9375rem] font-semibold tracking-wide transition-colors duration-300",
                        locale === "mr" && "font-[family-name:var(--font-devanagari)] text-[0.9375rem]",
                        active
                          ? "text-[var(--accent)]"
                          : "text-[color-mix(in_srgb,var(--color-paper-50)_78%,transparent)] hover:text-[var(--color-paper-50)]",
                      )}
                    >
                      {t(item.short ?? item.label, locale)}
                      {/* Underline that grows from the centre on hover, and
                          stays put when the item is the current page. */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3 bottom-1 h-px origin-center bg-[var(--color-gold-400)] transition-transform duration-400 ease-[var(--ease-out-expo)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageToggle locale={locale} className="hidden sm:flex" />

            {/* Visibility lives on a wrapper, never on the Button's own
                className: the Button sets its own `display`, and Tailwind
                emits that utility after `hidden`, so a `hidden` passed in
                here would silently lose. */}
            <span className="hidden xl:block">
              <Button
                href={localeHref(locale, "/participate#register")}
                className="px-5 py-2.5 text-[0.9375rem]"
                magnetic
              >
                {t(UI.registerShort, locale)}
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t(UI.menuOpen, locale)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-2 inline-flex size-11 items-center justify-center text-[var(--color-paper-50)] transition-colors hover:text-[var(--color-gold-300)] xl:hidden"
            >
              <Menu className="size-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
        activeKey={activeKey}
      />
    </>
  );
}
