"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { NAV, FOOTER_LINKS, CONTACT, SOCIAL, SITE } from "@/data/site";
import { UI } from "@/data/ui";
import { t, formatIndex, type Locale } from "@/lib/i18n";
import { localeHref, cn, eyebrowClass } from "@/lib/utils";
import { menuPanel, menuItem } from "@/lib/motion";
import { useScrollLock, usePrefersReducedMotion } from "@/lib/hooks";
import { WarliChain, RampartRule } from "@/components/decor/Ornament";
import { Button } from "@/components/ui/Button";

/**
 * Full-screen navigation for small viewports.
 *
 * Focus is moved into the panel on open and restored to the trigger on close;
 * Escape closes it; the page behind is scroll-locked and inert to the tab
 * order. Typography is deliberately large — this is a composition, not a
 * shrunken desktop menu.
 */
export function MobileMenu({
  open,
  onClose,
  locale,
  activeKey,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  activeKey?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      // Trap focus inside the panel while it is open.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t(UI.menu, locale)}
          className="zone-ink fixed inset-0 z-[80] flex flex-col overflow-y-auto lg:hidden"
          variants={reduced ? undefined : menuPanel}
          initial={reduced ? { opacity: 0 } : "hidden"}
          animate={reduced ? { opacity: 1 } : "visible"}
          exit={reduced ? { opacity: 0 } : "exit"}
        >
          {/* Decorative ground */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 size-[26rem] rounded-full bg-[var(--color-maroon-600)] opacity-20 blur-[120px]" />
            <div className="absolute bottom-0 left-0 size-[22rem] rounded-full bg-[var(--color-saffron-600)] opacity-15 blur-[120px]" />
            <WarliChain
              count={6}
              className="absolute right-0 -bottom-2 left-0 mx-auto w-full max-w-md opacity-25"
            />
          </div>

          <div className="relative flex items-center justify-between px-[var(--spacing-gutter)] py-5">
            <span className={cn(eyebrowClass(t(UI.menu, locale)), "text-[var(--muted)]")}>
              {t(UI.menu, locale)}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t(UI.menuClose, locale)}
              className="-mr-2 inline-flex size-11 items-center justify-center text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="relative flex-1 px-[var(--spacing-gutter)] pt-4 pb-10">
            <ul className="flex flex-col">
              {NAV.map((item, i) => {
                const active = item.key === activeKey;
                return (
                  <motion.li
                    key={item.key}
                    custom={i}
                    variants={reduced ? undefined : menuItem}
                    initial={reduced ? undefined : "hidden"}
                    animate={reduced ? undefined : "visible"}
                    exit={reduced ? undefined : "exit"}
                    className="border-b border-[var(--border)]"
                  >
                    <Link
                      href={localeHref(locale, item.href)}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-baseline gap-4 py-4"
                    >
                      <span className="text-eyebrow w-7 shrink-0 text-[var(--accent)] opacity-70 tabular-nums">
                        {formatIndex(i + 1, locale)}
                      </span>
                      <span
                        lang={locale}
                        className={
                          locale === "mr"
                            ? "font-[family-name:var(--font-devanagari)] text-[1.75rem] leading-tight transition-colors group-hover:text-[var(--accent)]"
                            : "font-[family-name:var(--font-display)] text-[1.75rem] leading-tight font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)]"
                        }
                        style={active ? { color: "var(--accent)" } : undefined}
                      >
                        {t(item.label, locale)}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              custom={NAV.length}
              variants={reduced ? undefined : menuItem}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : "visible"}
              exit={reduced ? undefined : "exit"}
              className="mt-9"
            >
              <Button href={localeHref(locale, "/participate")} withArrow className="w-full">
                {t(UI.register, locale)}
              </Button>

              <RampartRule className="mt-10 w-full" />

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-[var(--muted)]">
                {FOOTER_LINKS.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={localeHref(locale, item.href)}
                      onClick={onClose}
                      className="transition-colors hover:text-[var(--accent)]"
                    >
                      {t(item.label, locale)}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-7 space-y-1.5 text-sm">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                >
                  {CONTACT.email}
                </a>
                <a
                  href={`tel:${CONTACT.phone}`}
                  dir="ltr"
                  className="block text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                >
                  {CONTACT.phoneDisplay}
                </a>
                {SOCIAL.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {s.label} · {s.handle}
                  </a>
                ))}
              </div>

              <p className="mt-8 text-xs text-[var(--muted)]">{t(SITE.organisation, locale)}</p>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
