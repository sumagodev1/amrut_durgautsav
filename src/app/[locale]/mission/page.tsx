import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, tList, type Locale } from "@/lib/i18n";
import { MISSION } from "@/data/mission";
import { NAV } from "@/data/site";
import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { GatewayMotif } from "@/components/decor/Ornament";

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
    path: "/mission",
    title: t(MISSION.eyebrow, locale),
    description: tList(MISSION.opening, locale)[0] ?? "",
    type: "article",
  });
}

/**
 * The mission essay, set as a long-form article.
 *
 * A single measured column of around 68 characters, a drop-cap opening, and
 * one photograph placed where the argument turns from loss to revival.
 */
export default async function MissionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const opening = tList(MISSION.opening, locale);
  const customs = tList(MISSION.fadingCustoms, locale);
  const body = tList(MISSION.body, locale);

  const navLabel = t(NAV[0].label, locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t(MISSION.eyebrow, locale)}
        title={t(MISSION.heading, locale)}
        lede={opening[0]}
        crumbs={[{ label: navLabel }]}
      />

      <article className="zone-paper py-20 sm:py-28">
        <div className="container-prose">
          {/* Opening, with a drop cap on the first paragraph. */}
          <Reveal>
            <p
              lang={locale}
              className="text-lede text-[var(--foreground)] [&:first-letter]:float-left [&:first-letter]:mt-1.5 [&:first-letter]:mr-3 [&:first-letter]:font-[family-name:var(--font-devanagari)] [&:first-letter]:text-[3.5rem] [&:first-letter]:leading-[0.8] [&:first-letter]:text-[var(--primary)]"
            >
              {opening[0]}
            </p>
          </Reveal>

          {opening.slice(1).map((para, i) => (
            <Reveal key={i} delay={0.04}>
              <p lang={locale} className="mt-7 text-[1.0625rem] leading-[1.9] text-[var(--muted)]">
                {para}
              </p>
            </Reveal>
          ))}

          {/* The fading customs — set apart as a list, not buried in prose. */}
          <Reveal delay={0.06}>
            <ul className="mt-9 space-y-3 border-l-2 border-[var(--accent)] py-1 pl-6">
              {customs.map((custom) => (
                <li
                  key={custom}
                  lang={locale}
                  className="text-[1.0625rem] leading-[1.75] text-[var(--foreground)]"
                >
                  {custom}
                </li>
              ))}
            </ul>
          </Reveal>

          {body.slice(0, 2).map((para, i) => (
            <Reveal key={i}>
              <p lang={locale} className="mt-7 text-[1.0625rem] leading-[1.9] text-[var(--muted)]">
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        {/* The turn in the argument, marked by the photograph. */}
        <div className="container-page my-16 sm:my-20">
          <Reveal>
            <figure className="mx-auto max-w-4xl">
              <ImageReveal
                src="/media/chala-durg-banvuyat.jpg"
                alt={
                  locale === "mr"
                    ? "दोन मुले मातीच्या दुर्गाची प्रतिकृती बनवत आहेत"
                    : "Two children building a clay fort replica"
                }
                sizes="(max-width: 1024px) 100vw, 56rem"
                className="aspect-[16/9] w-full"
                quality={78}
              />
              <figcaption
                lang={locale}
                className="mt-4 text-sm text-[var(--muted)]"
              >
                {locale === "mr"
                  ? "दिवाळीत दुर्गांच्या प्रतिकृती बांधण्याची प्रथा — महाराष्ट्राच्या गावखेड्यांपासून शहरांतील गृहसंकुलांपर्यंत."
                  : "The practice of building fort replicas at Diwali — from the villages of Maharashtra to the housing societies of its cities."}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="container-prose">
          {body.slice(2).map((para, i) => (
            <Reveal key={i}>
              <p lang={locale} className="mt-7 text-[1.0625rem] leading-[1.9] text-[var(--muted)]">
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.08}>
            <div className="mt-14 flex flex-col items-center text-center">
              <GatewayMotif className="opacity-40" />
              <p
                lang={locale}
                className="mt-6 font-[family-name:var(--font-devanagari)] text-[clamp(1.25rem,1.05rem+1vw,1.75rem)] leading-[1.6] text-[var(--foreground)]"
              >
                {t(MISSION.closing, locale)}
              </p>
            </div>
          </Reveal>
        </div>
      </article>

      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
          { name: navLabel, path: "/mission" },
        ])}
      />
    </>
  );
}
