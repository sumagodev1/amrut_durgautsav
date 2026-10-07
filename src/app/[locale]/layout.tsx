import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Mukta, Tiro_Devanagari_Marathi } from "next/font/google";
import "../globals.css";

import { LOCALES, HTML_LANG, isLocale, t, type Locale } from "@/lib/i18n";
import { SITE } from "@/data/site";
import { UI } from "@/data/ui";
import { LocaleProvider } from "@/components/LocaleProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import dynamic from "next/dynamic";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { JsonLd, organizationSchema, websiteSchema, absoluteUrl } from "@/lib/seo";

/**
 * Chrome that is not needed for the first paint is split out of the entry
 * bundle. None of these render anything on arrival: the cursor is desktop
 * only, the progress bar tracks scroll, the WhatsApp link appears past the
 * hero, and smooth scrolling has nothing to smooth until the user scrolls.
 */
const SmoothScroll = dynamic(() =>
  import("@/components/layout/SmoothScroll").then((m) => m.SmoothScroll),
);
const Cursor = dynamic(() => import("@/components/ui/Cursor").then((m) => m.Cursor));
const WhatsAppFloat = dynamic(() =>
  import("@/components/layout/WhatsAppFloat").then((m) => m.WhatsAppFloat),
);

/* --------------------------------------------------------------------------
 * Fonts
 *
 * Three families, each earning its place:
 *   Tiro Devanagari Marathi — a Marathi-specific display face with proper
 *     Marathi letterforms (the distinct ल and श that Hindi-first faces get
 *     wrong). Carries every Devanagari headline.
 *   Fraunces — the Latin editorial display face.
 *   Mukta — body copy, and the only family that covers both scripts, so
 *     running text never changes texture mid-paragraph.
 *
 * All self-hosted by next/font with `display: swap`, so there is no render-
 * blocking request to a font CDN and no layout shift from a late swap.
 * ----------------------------------------------------------------------- */

const tiro = Tiro_Devanagari_Marathi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
  variable: "--font-tiro",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  // Optical size only — SOFT and WONK are stylistic axes the design never
  // varies, and every axis adds weight to the variable font file.
  axes: ["opsz"],
});

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  // Two weights only. A Devanagari subset is ~65 KiB per weight per script,
  // so every extra weight is a quarter of a megabyte on first load.
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-mukta",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0d0b09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Never block pinch-zoom: it is the primary accommodation for low vision.
  maximumScale: 5,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "mr";

  const title = `${t(SITE.festival, locale)} ${t(SITE.year, locale)}`;
  const siteName = `${title} | ${t(SITE.parentBrand, locale)}`;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${title} — ${t(SITE.tagline, locale)}`,
      template: `%s | ${title}`,
    },
    description: t(SITE.description, locale),
    applicationName: siteName,
    authors: [{ name: t(SITE.organisation, locale) }],
    creator: t(SITE.organisation, locale),
    publisher: t(SITE.organisation, locale),
    keywords:
      locale === "mr"
        ? ["दुर्गोत्सव", "महाराष्ट्र", "शिवाजी महाराज", "UNESCO", "गड", "किल्ले", "अमृत", "सांस्कृतिक वारसा"]
        : [
            "Durgotsav",
            "Maharashtra",
            "Shivaji Maharaj",
            "UNESCO",
            "forts",
            "Maratha Military Landscapes",
            "AMRUT",
            "cultural heritage",
          ],
    icons: {
      // Dedicated small icons: the full logo is a 98 KiB asset and the
      // browser fetches a favicon raw, unoptimised, on every first load.
      icon: [{ url: "/icon.png", type: "image/png", sizes: "96x96" }],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: {
        mr: absoluteUrl("/mr"),
        en: absoluteUrl("/en"),
        "x-default": absoluteUrl("/mr"),
      },
    },
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${tiro.variable} ${fraunces.variable} ${mukta.variable}`}
      suppressHydrationWarning
    >
      <body className="zone-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:rounded-[2px] focus:bg-[var(--color-gold-400)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[var(--color-ink-900)]"
        >
          {t(UI.skipToContent, locale)}
        </a>

        <LocaleProvider locale={locale}>
          <SmoothScroll />
          <ScrollProgress />
          <Cursor />

          <Header locale={locale} />

          <main id="main" tabIndex={-1} className="outline-none">
            <PageTransition>{children}</PageTransition>
          </main>

          <Footer locale={locale} />
          <WhatsAppFloat locale={locale} />
        </LocaleProvider>

        <JsonLd data={[organizationSchema(locale), websiteSchema(locale)]} />
      </body>
    </html>
  );
}
