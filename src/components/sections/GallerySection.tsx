import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGalleryPhotos } from "@/lib/repositories";
import { UI } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/utils";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";

/**
 * A slice of the gallery on the homepage.
 *
 * Fetched on the server. When the platform has no photographs to show — or
 * cannot be reached — the whole band is omitted rather than rendering an
 * empty frame on the homepage; /gallery is where the empty state belongs.
 */
export async function GallerySection({ locale }: { locale: Locale }) {
  const { photos } = await getGalleryPhotos({ page: 1 });
  if (photos.length === 0) return null;

  return (
    <section
      id="gallery"
      className="zone-ink border-t border-[var(--border)] py-24 sm:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-xl">
            <Eyebrow>{locale === "mr" ? "गॅलरी" : "Gallery"}</Eyebrow>
            <Display locale={locale} level="h2" className="mt-6 text-[var(--foreground)]">
              <span id="gallery-heading">
                {locale === "mr"
                  ? "महाराष्ट्रभरातून आलेले दुर्ग"
                  : "Forts from across Maharashtra"}
              </span>
            </Display>
          </Reveal>

          <Reveal delay={0.08} className="shrink-0">
            <Link
              href={localeHref(locale, "/gallery")}
              data-cursor="link"
              className="group inline-flex items-center gap-2.5 border-b border-[var(--border)] pb-1.5 text-[0.9375rem] font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t(UI.viewAll, locale)}
              <span className="sr-only">
                {" "}
                — {locale === "mr" ? "गॅलरी" : "Gallery"}
              </span>
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12">
          <PhotoGrid photos={photos.slice(0, 8)} locale={locale} />
        </div>
      </div>
    </section>
  );
}
