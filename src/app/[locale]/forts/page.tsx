import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { FORTS, FORTS_META, TYPOLOGY_LABEL } from "@/data/forts";
import { formatIndex, isLocale, t, type Locale } from "@/lib/i18n";
import { localeHref, cn, eyebrowClass } from "@/lib/utils";
import { pageMetadata, JsonLd, breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Display } from "@/components/ui/Typo";
import { FortSilhouette } from "@/components/decor/FortSilhouette";

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
    path: "/forts",
    title: t(FORTS_META.heading, locale),
    description: t(FORTS_META.lede, locale),
  });
}

/**
 * The twelve forts, as a full index.
 *
 * Each fort gets a tall card carrying its drawing (or its photograph, where
 * we hold one), its typology and its one-line summary. The cards sit on a
 * hairline grid rather than floating with shadows.
 */
export default async function FortsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t(FORTS_META.eyebrow, locale)}
        title={t(FORTS_META.heading, locale)}
        lede={t(FORTS_META.lede, locale)}
        crumbs={[{ label: t(FORTS_META.heading, locale) }]}
      />

      <section className="zone-paper py-20 sm:py-28">
        <div className="container-page">
          <Reveal stagger={0.07}>
            <ul className="grid gap-px bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
              {FORTS.map((fort) => (
                <RevealItem as="li" key={fort.slug} className="bg-[var(--background)]">
                  <Link
                    href={localeHref(locale, `/forts/${fort.slug}`)}
                    data-cursor="view"
                    className="group flex h-full flex-col"
                  >
                    {/* Drawing or photograph */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-raised)]">
                      {fort.image ? (
                        <Image
                          src={fort.image.src}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-[1000ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-end p-6 text-[var(--primary)] opacity-70 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:opacity-100">
                          <FortSilhouette typology={fort.typology} />
                        </span>
                      )}

                      <span className="text-eyebrow absolute top-4 left-5 text-[var(--accent)] tabular-nums">
                        {formatIndex(fort.index, locale)}
                      </span>
                      <span
                        className={cn(
                          eyebrowClass(t(TYPOLOGY_LABEL[fort.typology], locale)),
                          "absolute top-4 right-5 text-[var(--muted)]",
                        )}
                      >
                        {t(TYPOLOGY_LABEL[fort.typology], locale)}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <Display
                          locale={locale}
                          level="h3"
                          as="h2"
                          className="text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]"
                        >
                          {t(fort.name, locale)}
                        </Display>
                        <ArrowUpRight
                          aria-hidden
                          className="mt-1 size-5 shrink-0 text-[var(--muted)] transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--primary)]"
                        />
                      </div>

                      <p className="mt-1.5 text-[0.9375rem] text-[var(--muted)]">
                        {t(fort.district, locale)}, {t(fort.state, locale)}
                      </p>

                      <p
                        lang={locale}
                        className="mt-4 flex-1 text-base leading-[1.8] text-[var(--muted)]"
                      >
                        {t(fort.summary, locale)}
                      </p>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <p lang={locale} className="mt-10 max-w-2xl text-[0.9375rem] text-[var(--muted)]">
              {t(FORTS_META.note, locale)}
            </p>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
            { name: t(FORTS_META.heading, locale), path: "/forts" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: t(FORTS_META.heading, locale),
            numberOfItems: FORTS.length,
            itemListElement: FORTS.map((fort) => ({
              "@type": "ListItem",
              position: fort.index,
              name: t(fort.name, locale),
              url: absoluteUrl(`/${locale}/forts/${fort.slug}`),
            })),
          },
        ]}
      />
    </>
  );
}
