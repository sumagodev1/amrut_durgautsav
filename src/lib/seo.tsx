import type { Metadata } from "next";
import { SITE, CONTACT, ACTIVE_SOCIAL } from "@/data/site";
import { LOCALES, t, type Locale } from "@/lib/i18n";

/**
 * Metadata and structured data.
 *
 * Every page builds its metadata through `pageMetadata`, so canonicals,
 * hreflang alternates and Open Graph stay consistent and nothing is forgotten
 * on a page-by-page basis.
 */

const OG_LOCALE: Record<Locale, string> = {
  mr: "mr_IN",
  en: "en_IN",
};

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}

/** hreflang alternates for a path that exists in every locale. */
function alternateLanguages(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const locale of LOCALES) {
    out[locale] = absoluteUrl(`/${locale}${path === "/" ? "" : path}`);
  }
  // x-default points at the primary language of the campaign.
  out["x-default"] = absoluteUrl(`/mr${path === "/" ? "" : path}`);
  return out;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  type = "website",
  noIndex = false,
}: {
  locale: Locale;
  /** Locale-less path, e.g. "/forts/raigad". */
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(`/${locale}${path === "/" ? "" : path}`);
  const ogImage = image ?? "/media/chala-durg-banvuyat.jpg";
  const siteName = `${t(SITE.festival, locale)} ${t(SITE.year, locale)} | ${t(SITE.parentBrand, locale)}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternateLanguages(path),
    },
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      siteName,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [
        {
          url: absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

/* -------------------------------------------------------------------------
 * JSON-LD
 * ---------------------------------------------------------------------- */

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: t(SITE.organisation, locale),
    alternateName: t(SITE.organisationShort, locale),
    url: SITE.url,
    logo: absoluteUrl("/media/amrut-logo.png"),
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Maharaj Sayajirao Gaikwad Udyog Bhavan, Fifth Floor, Aundh",
      addressLocality: "Pune",
      postalCode: "411067",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: ACTIVE_SOCIAL.map((s) => s.href),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: SITE.url,
    name: `${t(SITE.festival, locale)} ${t(SITE.year, locale)}`,
    description: t(SITE.description, locale),
    inLanguage: LOCALES.map((l) => (l === "mr" ? "mr-IN" : "en-IN")),
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

/**
 * The festival itself, as an Event.
 *
 * Only the dates the source site actually publishes are used. The closing
 * occasion (Shivpratap Din) is named without a calendar date there, so it is
 * not asserted here either.
 */
export function festivalEventSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": absoluteUrl("/#durgotsav-2025"),
    name: `${t(SITE.festival, locale)} ${t(SITE.year, locale)}`,
    description: t(SITE.description, locale),
    startDate: "2025-10-18",
    endDate: "2025-11-10",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    image: [absoluteUrl("/media/chala-durg-banvuyat.jpg")],
    location: [
      {
        "@type": "Place",
        name: "Maharashtra, India",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      },
      {
        "@type": "VirtualLocation",
        url: SITE.url,
      },
    ],
    organizer: { "@id": absoluteUrl("/#organization") },
    isAccessibleForFree: true,
    inLanguage: locale === "mr" ? "mr-IN" : "en-IN",
  };
}

export function breadcrumbSchema(
  locale: Locale,
  trail: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(`/${locale}${crumb.path === "/" ? "" : crumb.path}`),
    })),
  };
}

export function faqSchema(items: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is built from our own typed content, never from user
      // input. Angle brackets are escaped so the payload cannot close the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
