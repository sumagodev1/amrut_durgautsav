import Image from "next/image";
import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { SITE } from "@/data/site";
import { localeHref, eyebrowClass, cn } from "@/lib/utils";

/**
 * The brand lockup: the campaign emblem beside a two-line wordmark.
 * The emblem is a real asset from the campaign and is never recoloured.
 */
export function Logo({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return (
    <Link
      href={localeHref(locale, "/")}
      className="group inline-flex items-center gap-3"
      data-cursor="link"
    >
      <Image
        src="/media/durgotsav-logo.png"
        alt=""
        width={48}
        height={48}
        priority
        className="size-10 shrink-0 sm:size-11"
      />
      <span className="flex flex-col leading-none">
        <span className="font-[family-name:var(--font-devanagari)] text-[1.0625rem] tracking-tight text-[var(--foreground)] sm:text-lg">
          {t(SITE.festival, "mr")}
          <span className="ml-1 text-[var(--accent)]">{t(SITE.year, "mr")}</span>
        </span>
        {!compact && (
          <span
            className={cn(
              eyebrowClass(t(SITE.parentBrand, locale)),
              "mt-1 text-[0.5625rem] text-[var(--muted)]",
            )}
          >
            {t(SITE.parentBrand, locale)}
          </span>
        )}
      </span>
      <span className="sr-only">
        {t(SITE.festival, locale)} {t(SITE.year, locale)} — {t(SITE.parentBrand, locale)}
      </span>
    </Link>
  );
}
