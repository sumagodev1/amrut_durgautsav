import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { NAV, FOOTER_LINKS, CONTACT, SITE } from "@/data/site";
import { UI } from "@/data/ui";
import { FINAL_CTA } from "@/data/home";
import { t, type Locale } from "@/lib/i18n";
import { localeHref, cn, eyebrowClass } from "@/lib/utils";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { RampartRule, WarliChain } from "@/components/decor/Ornament";
import { LanguageToggle } from "./LanguageToggle";
import { BrandLockup } from "./BrandLockup";
import { SocialLinks } from "./SocialLinks";

/**
 * The closing composition: a final call, the full navigation, the organising
 * body's details, and the two institutional marks.
 */
export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="zone-ink relative overflow-hidden border-t border-[var(--border)]">
      {/* Warm light rising from the base, as from a row of diyas. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[var(--color-maroon-600)] opacity-[0.22] blur-[140px]" />
        <div className="absolute -bottom-32 left-1/4 size-[26rem] rounded-full bg-[var(--color-saffron-600)] opacity-[0.14] blur-[120px]" />
        <div className="grain-overlay opacity-25" />
      </div>

      <div className="relative">
        {/* --- Final call ------------------------------------------------ */}
        <div className="container-page border-b border-[var(--border)] py-20 sm:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{t(SITE.tagline, locale)}</Eyebrow>
            <Display locale={locale} level="h1" className="mt-6 text-[var(--foreground)]">
              {t(FINAL_CTA.title, locale)}
            </Display>
            <p
              lang={locale}
              className="text-lede mx-auto mt-6 max-w-xl text-[var(--muted)]"
            >
              {t(FINAL_CTA.body, locale)}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href={localeHref(locale, "/participate")} withArrow magnetic>
                {t(UI.register, locale)}
              </Button>
              <Button href={localeHref(locale, "/forts")} variant="outline">
                {t(UI.explore, locale)}
              </Button>
            </div>
            <WarliChain count={7} className="mx-auto mt-14 w-full max-w-lg opacity-45" />
          </Reveal>
        </div>

        {/* --- Directory -------------------------------------------------- */}
        <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <BrandLockup locale={locale} size="footer" />

            <p lang={locale} className="mt-6 max-w-sm text-sm leading-[1.85] text-[var(--muted)]">
              {t(FINAL_CTA.closing, locale)}
            </p>

            <h2 className={cn(eyebrowClass(t(UI.followLabel, locale)), "mt-8 text-[var(--accent)]")}>
              {t(UI.followLabel, locale)}
            </h2>
            <SocialLinks className="mt-4" />

            <RampartRule className="mt-8 w-48" />
          </div>

          {/* Navigation */}
          <nav className="lg:col-span-3" aria-label={t(UI.quickLinks, locale)}>
            <h2 className={cn(eyebrowClass(t(UI.quickLinks, locale)), "text-[var(--accent)]")}>
              {t(UI.quickLinks, locale)}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {[...NAV, ...FOOTER_LINKS].map((item) => (
                <li key={item.key}>
                  <Link
                    href={localeHref(locale, item.href)}
                    data-cursor="link"
                    className="group inline-flex min-h-6 items-center py-0.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    <span
                      aria-hidden
                      className="mr-0 h-px w-0 bg-[var(--accent)] transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:mr-2 group-hover:w-4"
                    />
                    {t(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-5">
            <h2
              className={cn(eyebrowClass(t(UI.contactHeading, locale)), "text-[var(--accent)]")}
            >
              {t(UI.contactHeading, locale)}
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-[var(--accent)] opacity-70" />
                <span>
                  <span className="sr-only">{t(UI.emailLabel, locale)}: </span>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex min-h-6 items-center text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                  >
                    {CONTACT.email}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-[var(--accent)] opacity-70" />
                <span>
                  <span className="sr-only">{t(UI.phoneLabel, locale)}: </span>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    dir="ltr"
                    className="inline-flex min-h-6 items-center text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-[var(--accent)] opacity-70" />
                <address lang={locale} className="whitespace-pre-line not-italic text-[var(--muted)]">
                  <span className="sr-only">{t(UI.addressLabel, locale)}: </span>
                  {t(CONTACT.address, locale)}
                </address>
              </li>
            </ul>

            {/* Sister initiative.
                The AMRUT mark that used to sit beside this one is gone: the
                brand lockup above now carries the अमृत wordmark, and that
                asset has a white background baked in, so on this dark footer
                it read as a bare white rectangle. */}
            <div className="mt-10">
              <Image
                src="/media/amrut-vidya-logo.png"
                alt="Amrut Vidya"
                width={180}
                height={60}
                className="h-11 w-auto opacity-85"
              />
            </div>
          </div>
        </div>

        {/* --- Baseline ---------------------------------------------------- */}
        <div className="container-page flex flex-col gap-4 border-t border-[var(--border)] py-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t(SITE.parentBrand, locale)}. {t(UI.copyright, locale)}
          </p>
          <div className="flex items-center gap-5">
            <LanguageToggle locale={locale} />
            <Link
              href={localeHref(locale, "/privacy")}
              className="inline-flex min-h-6 items-center transition-colors hover:text-[var(--accent)]"
            >
              {t(FOOTER_LINKS[3].label, locale)}
            </Link>
            <Link
              href={localeHref(locale, "/terms")}
              className="inline-flex min-h-6 items-center transition-colors hover:text-[var(--accent)]"
            >
              {t(FOOTER_LINKS[4].label, locale)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
