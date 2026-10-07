import { MARQUEE_PHRASES } from "@/data/home";
import { t, type Locale } from "@/lib/i18n";
import { Marquee } from "@/components/ui/Marquee";

/**
 * Two counter-running strips of campaign phrases: the Marathi line always,
 * and beneath it the same phrases in the reader's other language. It gives
 * the page a pulse between the hero and the editorial sections, and it
 * reinforces that this is a bilingual site without a banner saying so.
 */
export function MarqueeStrip({ locale }: { locale: Locale }) {
  const marathi = MARQUEE_PHRASES.map((p) => t(p, "mr"));
  const other = MARQUEE_PHRASES.map((p) => t(p, locale === "mr" ? "en" : "mr"));

  return (
    <div className="zone-ink relative overflow-hidden">
      <div className="font-[family-name:var(--font-devanagari)] text-[var(--foreground)]">
        <Marquee items={marathi} durationSeconds={42} />
      </div>
      <div className="text-[var(--muted)]">
        <Marquee items={other} durationSeconds={52} reverse />
      </div>
    </div>
  );
}
