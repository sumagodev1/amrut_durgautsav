"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { CONTACT, whatsappUrl } from "@/data/site";
import { UI } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * The WhatsApp contact affordance carried over from the source site.
 *
 * It is a link, not a popup: nothing covers the page, nothing interrupts.
 * It appears only once the hero has been scrolled past, so it never competes
 * with the opening composition.
 */
export function WhatsAppFloat({ locale }: { locale: Locale }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const label = t(UI.whatsapp, locale);

  return (
    <a
      href={whatsappUrl(t(CONTACT.whatsappMessage, locale))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-cursor="link"
      className={cn(
        "fixed right-4 bottom-4 z-[60] inline-flex items-center gap-2.5 rounded-[2px]",
        "border border-[color-mix(in_srgb,var(--color-gold-500)_35%,transparent)]",
        "bg-[color-mix(in_srgb,var(--color-ink-800)_92%,transparent)] px-4 py-3 backdrop-blur-md",
        "text-sm font-semibold text-[var(--color-paper-50)] shadow-[0_2px_18px_rgba(0,0,0,0.35)]",
        "transition-all duration-500 ease-[var(--ease-out-expo)]",
        "hover:border-[var(--color-gold-400)] hover:text-[var(--color-gold-300)]",
        "sm:right-6 sm:bottom-6",
        shown
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <MessageCircle aria-hidden className="size-[18px]" strokeWidth={1.75} />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
