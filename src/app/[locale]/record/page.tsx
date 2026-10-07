import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Trophy } from "lucide-react";
import { RECORD } from "@/data/record";
import { NAV, FOOTER_LINKS } from "@/data/site";
import { UI } from "@/data/ui";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/utils";
import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Display } from "@/components/ui/Typo";
import { Button } from "@/components/ui/Button";
import { RuledFrame, WarliChain } from "@/components/decor/Ornament";

export function generateStaticParams() {
  return [{ locale: "mr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "mr";
  return pageMetadata({
    locale,
    path: "/record",
    title: t(RECORD.eyebrow, locale),
    description: t(RECORD.body, locale),
  });
}

/** The world record, given a page of its own. */
export default async function RecordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const label = t(NAV[4].label, locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t(RECORD.eyebrow, locale)}
        title={t(RECORD.heading, locale)}
        lede={t(RECORD.pullquote, locale)}
        crumbs={[{ label }]}
      />

      <section className="zone-maroon border-t border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="relative px-6 py-14 text-center sm:px-12 sm:py-20">
                <RuledFrame />
                <div className="relative">
                  <Trophy aria-hidden className="mx-auto size-9 text-[var(--accent)]" strokeWidth={1.25} />
                  <p className="text-eyebrow mt-7 text-[var(--muted)]">
                    Guinness Book of World Records
                  </p>
                  <p
                    lang="en"
                    className="mx-auto mt-5 font-[family-name:var(--font-display)] text-[clamp(1.75rem,1.2rem+2.6vw,3.5rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance text-[var(--foreground)]"
                  >
                    {RECORD.title}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-14">
              <Display locale={locale} level="h2" className="text-center text-[var(--accent)]">
                {t(RECORD.heading, locale)}
              </Display>
              <p
                lang={locale}
                className="text-lede mt-7 text-center text-[var(--foreground)]"
              >
                {t(RECORD.body, locale)}
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-14">
              <blockquote className="border-l-2 border-[var(--accent)] pl-6 sm:pl-8">
                <p
                  lang={locale}
                  className="font-[family-name:var(--font-devanagari)] text-[clamp(1.25rem,1.05rem+1vw,1.875rem)] leading-[1.6] text-[var(--foreground)]"
                >
                  {t(RECORD.pullquote, locale)}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.2} className="mt-14 flex flex-col items-center gap-10">
              <Button href={localeHref(locale, "/album")} withArrow magnetic>
                {t(UI.viewAll, locale)}
                <span className="sr-only"> — {t(FOOTER_LINKS[0].label, locale)}</span>
              </Button>
              <WarliChain count={7} className="w-full max-w-lg opacity-45" />
            </Reveal>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
          { name: label, path: "/record" },
        ])}
      />
    </>
  );
}
