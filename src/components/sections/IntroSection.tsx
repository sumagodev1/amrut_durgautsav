import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INVITATION, WHAT_TO_DO } from "@/data/home";
import { MISSION } from "@/data/mission";
import { SITE } from "@/data/site";
import { localeHref } from "@/lib/utils";
import { t, type Locale } from "@/lib/i18n";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { RampartRule, RuledFrame } from "@/components/decor/Ornament";

/**
 * The introduction.
 *
 * An asymmetric editorial spread rather than the usual image-left/text-right:
 * the heading sits in a narrow column, the photograph breaks out past it, and
 * a framed caption overlaps the join. The warm paper band is the first
 * deliberate contrast against the dark hero.
 */
export function IntroSection({ locale }: { locale: Locale }) {
  return (
    <section id="intro" className="zone-paper relative overflow-hidden py-24 sm:py-32">
      {/* A very faint rosette ghost, only visible as the eye settles. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-32 size-[34rem] rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, var(--color-vermilion-500) 0%, transparent 65%)",
        }}
      />

      <div className="container-page">
        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
          {/* --- Heading column ------------------------------------------ */}
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <Eyebrow>{t(SITE.organisationShort, locale)} · {t(SITE.year, locale)}</Eyebrow>
            </Reveal>

            <Reveal preset="unmask" delay={0.05}>
              <p
                lang={locale}
                className="mt-7 text-[clamp(1.125rem,0.9rem+1vw,1.5rem)] leading-snug text-[var(--muted)]"
              >
                {t(INVITATION.kicker, locale)}
              </p>
            </Reveal>

            <Reveal preset="unmask" delay={0.1}>
              <Display
                locale={locale}
                level="h1"
                as="h2"
                className="mt-1 text-[var(--foreground)]"
              >
                {t(INVITATION.title, locale)}
              </Display>
            </Reveal>

            <Reveal delay={0.18}>
              <RampartRule className="mt-8 w-44" />
              <p
                lang={locale}
                className="text-lede mt-8 max-w-md text-[var(--muted)]"
              >
                {t(INVITATION.body, locale)}
              </p>

              <Link
                href={localeHref(locale, "/mission")}
                data-cursor="link"
                className="group mt-9 inline-flex items-center gap-2.5 border-b border-[var(--border)] pb-1.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                {t(MISSION.eyebrow, locale)}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          {/* --- Image, breaking the grid -------------------------------- */}
          <div className="relative lg:col-span-7">
            <ImageReveal
              src="/media/chala-durg-banvuyat.jpg"
              alt={
                locale === "mr"
                  ? "दोन मुले मातीच्या दुर्गाची प्रतिकृती बनवत आहेत — ‘चला दुर्ग बनवूयात!’ असे पोस्टरवर लिहिले आहे"
                  : "Two children building a clay fort replica, under a poster reading ‘Chala Durg Banvuyat!’ — Let’s build forts"
              }
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="aspect-[3/2] w-full lg:aspect-[16/11]"
              quality={80}
            />

            {/* Framed caption overlapping the image edge. */}
            <Reveal delay={0.25} className="relative z-10 -mt-12 ml-auto w-[min(26rem,88%)] lg:-mt-20 lg:mr-10">
              <div className="relative bg-[var(--surface)] p-7 sm:p-9">
                <RuledFrame />
                <div className="relative">
                  <Display
                    locale={locale}
                    level="h3"
                    as="h3"
                    className="text-[var(--foreground)]"
                  >
                    {t(WHAT_TO_DO.heading, locale)}
                  </Display>
                  <p
                    lang={locale}
                    className="mt-4 text-[0.9375rem] leading-[1.85] text-[var(--muted)]"
                  >
                    {t(WHAT_TO_DO.body, locale)}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
