import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAlbumPhotos } from "@/lib/repositories";
import { RECORD } from "@/data/record";
import { FOOTER_LINKS } from "@/data/site";
import { formatNumber, isLocale, t, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/utils";
import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { Pagination } from "@/components/gallery/Pagination";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "mr";
  return pageMetadata({
    locale,
    path: "/album",
    title: t(FOOTER_LINKS[0].label, locale),
    description: RECORD.title,
  });
}

/**
 * The record album — the collection that carries the Guinness World Records
 * title. Its English title is shown verbatim, as the record is held under
 * that exact wording.
 */
export default async function AlbumPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const { page: rawPage } = await searchParams;
  const parsed = Number(rawPage);
  const page = Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;

  const { photos, total, totalPages } = await getAlbumPhotos(page);
  const label = t(FOOTER_LINKS[0].label, locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t(RECORD.eyebrow, locale)}
        title={label}
        lede={t(RECORD.body, locale)}
        crumbs={[{ label }]}
      >
        <Reveal delay={0.14} className="mt-12 border-t border-[var(--border)] pt-8">
          <p
            lang="en"
            className="font-[family-name:var(--font-display)] text-[clamp(1.125rem,0.95rem+1vw,1.75rem)] leading-tight font-semibold tracking-[-0.02em] text-[var(--accent)]"
          >
            {RECORD.title}
          </p>
          {total > 0 && (
            <p className="mt-2 text-sm text-[var(--muted)] tabular-nums">
              {locale === "mr" ? "एकूण छायाचित्रे" : "Total photos"}:{" "}
              {formatNumber(total, locale)}
            </p>
          )}
        </Reveal>
      </PageHero>

      <section className="zone-ink border-t border-[var(--border)] py-14 sm:py-20">
        <div className="container-page">
          <PhotoGrid photos={photos} locale={locale} />
          <Pagination
            locale={locale}
            basePath={localeHref(locale, "/album")}
            page={page}
            totalPages={totalPages}
          />
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
          { name: label, path: "/album" },
        ])}
      />
    </>
  );
}
