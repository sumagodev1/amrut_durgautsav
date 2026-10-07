import Image from "next/image";
import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { SITE } from "@/data/site";
import { cn, localeHref } from "@/lib/utils";

/**
 * The institutional brand lockup.
 *
 * Four marks in sequence, as the campaign itself presents them:
 *
 *   State Emblem of India │ अमृत │ ◉ Durgotsav emblem │ दुर्गोत्सव २०२५
 *
 * The first two establish that this is a Government of Maharashtra initiative;
 * the last two are the festival itself. Both artwork files are white line art
 * on transparency, which is why they are only ever placed on a dark ground.
 *
 * Narrow viewports drop the two institutional marks and keep the festival
 * lockup — at phone widths all four would shrink the emblem past the point of
 * being readable, and the attribution is repeated in the footer regardless.
 *
 * The whole thing is one link with one accessible name; every image inside is
 * decorative.
 */
export function BrandLockup({
  locale,
  size = "header",
  className,
}: {
  locale: Locale;
  size?: "header" | "footer";
  className?: string;
}) {
  const header = size === "header";

  return (
    <Link
      href={localeHref(locale, "/")}
      className={cn("group inline-flex items-center", header ? "gap-3 sm:gap-4" : "gap-4 sm:gap-5", className)}
      data-cursor="link"
    >
      {/* State Emblem of India */}
      <Image
        src="/media/gov-emblem.png"
        alt=""
        width={128}
        height={128}
        priority={header}
        className={cn(
          "hidden w-auto shrink-0 opacity-90 md:block",
          header ? "h-10" : "h-13",
        )}
      />

      {/* अमृत — the organising body's wordmark */}
      <Image
        src="/media/amrut-wordmark.png"
        alt=""
        width={450}
        height={310}
        priority={header}
        className={cn(
          "hidden w-auto shrink-0 opacity-95 md:block",
          header ? "h-10" : "h-13",
        )}
      />

      {/* Hairline between the institutional marks and the festival mark. */}
      <span
        aria-hidden
        className={cn(
          "hidden w-px shrink-0 bg-[var(--border)] md:block",
          header ? "h-8" : "h-10",
        )}
      />

      {/* The festival emblem and wordmark */}
      <Image
        src="/media/durgotsav-logo.png"
        alt=""
        width={96}
        height={96}
        priority={header}
        className={cn("shrink-0", header ? "size-10 sm:size-11" : "size-12")}
      />

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-[family-name:var(--font-devanagari)] tracking-tight text-[var(--foreground)]",
            header ? "text-[1.0625rem] sm:text-lg" : "text-xl",
          )}
        >
          {t(SITE.festival, "mr")}
          <span className="ml-1 text-[var(--accent)]">{t(SITE.year, "mr")}</span>
        </span>
        <span
          className={cn(
            "mt-1 font-[family-name:var(--font-devanagari)] text-[var(--muted)]",
            header ? "text-[0.625rem]" : "text-[0.6875rem]",
          )}
        >
          {t(SITE.parentBrand, locale)}
        </span>
      </span>

      <span className="sr-only">
        {t(SITE.organisation, locale)} — {t(SITE.festival, locale)} {t(SITE.year, locale)}
      </span>
    </Link>
  );
}
