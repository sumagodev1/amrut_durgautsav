import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGalleryPhotos } from "@/lib/repositories";
import { DISTRICTS, ALL_DISTRICTS } from "@/data/districts";
import { UI } from "@/data/ui";
import { NAV } from "@/data/site";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { localeHref, cn, eyebrowClass } from "@/lib/utils";
import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { DistrictFilter } from "@/components/gallery/DistrictFilter";
import { Pagination } from "@/components/gallery/Pagination";

type SearchParams = Promise<{ district?: string; page?: string }>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "mr";
  return pageMetadata({
    locale,
    path: "/gallery",
    title: t(NAV[3].label, locale),
    description:
      locale === "mr"
        ? "दुर्गोत्सव २०२५ मध्ये महाराष्ट्रभरातून आलेल्या दुर्ग प्रतिकृतींची छायाचित्रे — जिल्ह्यानुसार पहा."
        : "Photographs of fort replicas sent in from across Maharashtra for Durgotsav 2025, browsable by district.",
  });
}

/**
 * The gallery.
 *
 * District filtering and paging both live in the URL, so every view is
 * shareable and server-rendered. When the platform is unreachable the page
 * still renders its chrome and shows an honest empty state rather than an
 * error.
 */
export default async function GalleryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const { district: rawDistrict, page: rawPage } = await searchParams;

  // Only accept a district we actually publish — never pass arbitrary input
  // straight through to the upstream service.
  const district =
    rawDistrict && DISTRICTS.some((d) => d.id === rawDistrict) ? rawDistrict : undefined;
  const selected = district ?? ALL_DISTRICTS;

  const parsedPage = Number(rawPage);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;

  const { photos, totalPages } = await getGalleryPhotos({ district, page });

  const districtLabel = district
    ? t(DISTRICTS.find((d) => d.id === district)!.label, locale)
    : null;

  const label = t(NAV[3].label, locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={label}
        title={
          districtLabel
            ? districtLabel
            : locale === "mr"
              ? "महाराष्ट्रभरातून आलेले दुर्ग"
              : "Forts from across Maharashtra"
        }
        lede={
          locale === "mr"
            ? "सहभागींनी बनवलेल्या दुर्ग प्रतिकृतींची छायाचित्रे. जिल्हा निवडून पहा."
            : "Photographs of the fort replicas built by participants. Choose a district to narrow the view."
        }
        crumbs={[
          ...(districtLabel
            ? [{ label, href: localeHref(locale, "/gallery") }, { label: districtLabel }]
            : [{ label }]),
        ]}
      />

      <section className="zone-ink border-t border-[var(--border)] py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <h2
              className={cn(eyebrowClass(t(UI.selectDistrict, locale)), "text-[var(--accent)]")}
            >
              {t(UI.selectDistrict, locale)}
            </h2>
            <div className="mt-5">
              <DistrictFilter locale={locale} selected={selected} />
            </div>
          </Reveal>

          <div className="mt-12">
            <PhotoGrid
              photos={photos}
              locale={locale}
              emptyMessage={
                districtLabel
                  ? locale === "mr"
                    ? `${districtLabel} साठी फोटो उपलब्ध नाहीत`
                    : `No photos available for ${districtLabel}`
                  : undefined
              }
            />
          </div>

          <Pagination
            locale={locale}
            basePath={localeHref(locale, "/gallery")}
            page={page}
            totalPages={totalPages}
            params={{ district }}
          />
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
          { name: label, path: "/gallery" },
        ])}
      />
    </>
  );
}
