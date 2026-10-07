import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VOICES, VOICES_META } from "@/data/voices";
import { UI } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/utils";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * The dignitaries' statements.
 *
 * On the homepage the quotes are clamped to a few lines and the full text
 * lives on /voices — these are long, considered statements and cramming them
 * into a card would serve neither the reader nor the speaker.
 */
export function VoicesSection({ locale }: { locale: Locale }) {
  const [lead, ...rest] = VOICES;

  return (
    <section
      id="voices"
      className="zone-paper relative border-t border-[var(--border)] py-24 sm:py-32"
      aria-labelledby="voices-heading"
    >
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t(VOICES_META.eyebrow, locale)}</Eyebrow>
          <Display locale={locale} level="h2" className="mt-6 text-[var(--foreground)]">
            <span id="voices-heading">{t(VOICES_META.heading, locale)}</span>
          </Display>
        </Reveal>

        {/* Lead statement */}
        <Reveal delay={0.1} className="mt-14">
          <figure className="grid gap-8 border-t border-[var(--border)] pt-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <blockquote>
                <p
                  lang={locale}
                  className="line-clamp-6 font-[family-name:var(--font-devanagari)] text-[clamp(1.125rem,1rem+0.85vw,1.625rem)] leading-[1.65] text-[var(--foreground)]"
                >
                  {t(lead.quote, locale)}
                </p>
              </blockquote>
            </div>
            <figcaption className="lg:col-span-4 lg:col-start-9">
              <p
                lang={locale}
                className="text-lg text-[var(--foreground)]"
              >
                {t(lead.name, locale)}
              </p>
              <p lang={locale} className="mt-1.5 text-sm text-[var(--muted)]">
                {t(lead.designation, locale)}
              </p>
              <Link
                href={localeHref(locale, "/voices")}
                data-cursor="link"
                className="group mt-6 inline-flex items-center gap-2 border-b border-[var(--border)] pb-1 text-sm font-medium transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                {t(UI.readMore, locale)}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                />
              </Link>
            </figcaption>
          </figure>
        </Reveal>

        {/* The remaining statements */}
        <Reveal stagger={0.12} className="mt-4">
          <ul className="grid gap-px bg-[var(--border)] sm:grid-cols-2">
            {rest.map((voice) => (
              <RevealItem as="li" key={voice.key} className="bg-[var(--background)]">
                <figure className="flex h-full flex-col p-7 sm:p-9">
                  <blockquote className="flex-1">
                    <p
                      lang={locale}
                      className="line-clamp-5 font-[family-name:var(--font-devanagari)] text-[1.0625rem] leading-[1.75] text-[var(--foreground)]"
                    >
                      {t(voice.quote, locale)}
                    </p>
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-4 border-t border-[var(--border)] pt-6">
                    {voice.portrait ? (
                      <Image
                        src={voice.portrait.src}
                        alt=""
                        width={56}
                        height={56}
                        className="size-12 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[var(--border)] font-[family-name:var(--font-devanagari)] text-lg text-[var(--accent)]"
                      >
                        {t(voice.name, "mr").replace(/^श्री\.\s*/, "").charAt(0)}
                      </span>
                    )}
                    <span className="min-w-0">
                      <span lang={locale} className="block text-[0.9375rem] text-[var(--foreground)]">
                        {t(voice.name, locale)}
                      </span>
                      <span lang={locale} className="mt-0.5 block text-xs leading-snug text-[var(--muted)]">
                        {t(voice.designation, locale)}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
