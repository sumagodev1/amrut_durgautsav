import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  FORTS,
  FORTS_META,
  TYPOLOGY_LABEL,
  getFort,
  getRelatedForts,
} from "@/data/forts";
import { UI } from "@/data/ui";
import { LOCALES, formatIndex, isLocale, t, type Locale } from "@/lib/i18n";
import { localeHref, cn, eyebrowClass } from "@/lib/utils";
import { pageMetadata, JsonLd, breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { FortSilhouette } from "@/components/decor/FortSilhouette";
import { Button } from "@/components/ui/Button";

/** Every fort in every locale is generated at build time. */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) => FORTS.map((fort) => ({ locale, slug: fort.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "mr";
  const fort = getFort(slug);

  if (!fort) {
    return pageMetadata({
      locale,
      path: `/forts/${slug}`,
      title: t(UI.notFoundTitle, locale),
      description: t(UI.notFoundBody, locale),
      noIndex: true,
    });
  }

  return pageMetadata({
    locale,
    path: `/forts/${fort.slug}`,
    title: `${t(fort.name, locale)} — ${t(TYPOLOGY_LABEL[fort.typology], locale)}`,
    description: t(fort.summary, locale),
    image: fort.image?.src,
    type: "article",
  });
}

/**
 * A single fort.
 *
 * Structure: masthead → the drawing or photograph → the account →
 * a sticky rail of documented facts → the other forts.
 *
 * The facts rail is deliberately narrow in what it claims: typology, district,
 * coordinates and the dated events the record supports. Nothing is padded out
 * to make the page look fuller.
 */
export default async function FortPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const fort = getFort(slug);
  if (!fort) notFound();

  const related = getRelatedForts(fort.slug, 3);
  const fortsLabel = t(FORTS_META.heading, locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={`${formatIndex(fort.index, locale)} · ${t(TYPOLOGY_LABEL[fort.typology], locale)}`}
        title={t(fort.name, locale)}
        lede={t(fort.summary, locale)}
        crumbs={[
          { label: fortsLabel, href: localeHref(locale, "/forts") },
          { label: t(fort.name, locale) },
        ]}
      />

      {/* --- The image band ------------------------------------------- */}
      <section className="zone-ink border-t border-[var(--border)] pb-20 sm:pb-28">
        <div className="container-page">
          {fort.image ? (
            <ImageReveal
              src={fort.image.src}
              alt={t(fort.image.alt, locale)}
              sizes="(max-width: 1536px) 100vw, 96rem"
              className="aspect-[16/9] w-full lg:aspect-[21/9]"
              priority
              quality={82}
            />
          ) : (
            <div className="relative flex aspect-[16/9] w-full items-end justify-center overflow-hidden border border-[var(--border)] bg-[var(--surface)] lg:aspect-[21/9]">
              <div aria-hidden className="grain-overlay opacity-20" />
              <span className="h-full w-full max-w-3xl p-8 text-[var(--primary)] opacity-80 sm:p-12">
                <FortSilhouette typology={fort.typology} />
              </span>
            </div>
          )}

          {!fort.image && (
            <p lang={locale} className="mt-4 max-w-2xl text-sm text-[var(--muted)]">
              {locale === "mr"
                ? "या किल्ल्याचे छायाचित्र उपलब्ध नसल्याने येथे त्याच्या प्रकारानुसार रेखाचित्र दिले आहे."
                : "We do not hold a photograph of this fort, so it is represented here by a drawing of its site type."}
            </p>
          )}
        </div>
      </section>

      {/* --- The account + facts rail ---------------------------------- */}
      <section className="zone-paper py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
            {/* Account */}
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>{locale === "mr" ? "या दुर्गाविषयी" : "About this fort"}</Eyebrow>
                <p
                  lang={locale}
                  className="text-lede mt-7 text-[var(--foreground)]"
                >
                  {t(fort.description, locale)}
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-12">
                <div className="border-t border-[var(--border)] pt-8">
                  <Display locale={locale} level="h3" as="h2" className="text-[var(--foreground)]">
                    {locale === "mr" ? "दुर्गोत्सवात सहभागी व्हा" : "Take part in Durgotsav"}
                  </Display>
                  <p
                    lang={locale}
                    className="mt-3 max-w-xl text-base leading-[1.85] text-[var(--muted)]"
                  >
                    {locale === "mr"
                      ? "या बारा दुर्गांपैकी कोणत्याही एकाची प्रतिकृती बनवा, फोटो काढा आणि व्यासपीठावर अपलोड करा."
                      : "Build a replica of any one of these twelve forts, photograph it, and upload it to the platform."}
                  </p>
                  <div className="mt-6">
                    <Button href={localeHref(locale, "/participate#register")} withArrow magnetic>
                      {t(UI.register, locale)}
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Facts */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.06} className="lg:sticky lg:top-32">
                <div className="border-t border-[var(--foreground)] pt-6">
                  <h2
                    className={cn(
                      locale === "mr" ? "text-eyebrow-mr" : "text-eyebrow",
                      "text-[var(--accent)]",
                    )}
                  >
                    {locale === "mr" ? "नोंदी" : "On record"}
                  </h2>

                  <dl className="mt-6 space-y-5">
                    <Fact
                      label={t(UI.district, locale)}
                      value={`${t(fort.district, locale)}, ${t(fort.state, locale)}`}
                      locale={locale}
                    />
                    <Fact
                      label={locale === "mr" ? "दुर्गप्रकार" : "Site typology"}
                      value={t(TYPOLOGY_LABEL[fort.typology], locale)}
                      locale={locale}
                    />
                    {fort.facts.map((fact) => (
                      <Fact
                        key={t(fact.label, "en")}
                        label={t(fact.label, locale)}
                        value={t(fact.value, locale)}
                        locale={locale}
                      />
                    ))}
                    <Fact
                      label={t(UI.unescoLabel, locale)}
                      value={
                        locale === "mr"
                          ? "मराठा मिलिटरी लँडस्केप्स ऑफ इंडिया, ११ जुलै २०२५"
                          : "Maratha Military Landscapes of India, 11 July 2025"
                      }
                      locale={locale}
                    />
                  </dl>

                  <a
                    href={`https://www.openstreetmap.org/?mlat=${fort.coords.lat}&mlon=${fort.coords.lng}#map=13/${fort.coords.lat}/${fort.coords.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="group mt-8 inline-flex items-center gap-2 border-b border-[var(--border)] pb-1 text-[0.9375rem] text-[var(--muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    <MapPin aria-hidden className="size-4" strokeWidth={1.6} />
                    <span className="tabular-nums" dir="ltr">
                      {fort.coords.lat.toFixed(4)}° N, {fort.coords.lng.toFixed(4)}° E
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* --- Related forts --------------------------------------------- */}
      <section className="zone-ink border-t border-[var(--border)] py-20 sm:py-24">
        <div className="container-page">
          <Reveal>
            <Eyebrow>{t(UI.relatedForts, locale)}</Eyebrow>
          </Reveal>

          <Reveal stagger={0.08} className="mt-10">
            <ul className="grid gap-px bg-[var(--border)] sm:grid-cols-3">
              {related.map((other) => (
                <RevealItem as="li" key={other.slug} className="bg-[var(--background)]">
                  <Link
                    href={localeHref(locale, `/forts/${other.slug}`)}
                    data-cursor="view"
                    className="group flex h-full flex-col p-6 sm:p-7"
                  >
                    {/* The drawing spans the card rather than sitting in a
                        corner of it — at a third of a wide viewport, a small
                        mark leaves the card looking unfinished. */}
                    <span
                      aria-hidden
                      className="block aspect-[16/7] w-full text-[var(--primary)] opacity-55 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] group-hover:opacity-100"
                    >
                      <FortSilhouette typology={other.typology} />
                    </span>
                    <span className="mt-6 flex items-start justify-between gap-3">
                      <Display
                        locale={locale}
                        level="h3"
                        as="h3"
                        className="text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]"
                      >
                        {t(other.name, locale)}
                      </Display>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-1 size-4 shrink-0 text-[var(--muted)] transition-all duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]"
                      />
                    </span>
                    <span className="mt-1.5 text-[0.9375rem] text-[var(--muted)]">
                      {t(other.district, locale)}
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
            { name: fortsLabel, path: "/forts" },
            { name: t(fort.name, locale), path: `/forts/${fort.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "LandmarksOrHistoricalBuildings",
            name: t(fort.name, locale),
            description: t(fort.description, locale),
            url: absoluteUrl(`/${locale}/forts/${fort.slug}`),
            address: {
              "@type": "PostalAddress",
              addressLocality: t(fort.district, "en"),
              addressRegion: t(fort.state, "en"),
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: fort.coords.lat,
              longitude: fort.coords.lng,
            },
            ...(fort.image
              ? {
                  image: {
                    "@type": "ImageObject",
                    url: absoluteUrl(fort.image.src),
                    caption: t(fort.image.alt, locale),
                  },
                }
              : {}),
          },
        ]}
      />
    </>
  );
}

function Fact({
  label,
  value,
  locale,
}: {
  label: string;
  value: string;
  locale: Locale;
}) {
  return (
    <div className="border-b border-[var(--border)] pb-5">
      <dt className={cn(eyebrowClass(label), "text-[var(--muted)]")}>{label}</dt>
      <dd lang={locale} className="mt-2 text-base leading-relaxed text-[var(--foreground)]">
        {value}
      </dd>
    </div>
  );
}
