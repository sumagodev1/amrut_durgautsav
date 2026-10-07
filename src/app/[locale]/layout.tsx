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
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import dynamic from "next/dynamic";
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
const ScrollProgress = dynamic(() =>
  import("@/components/ui/ScrollProgress").then((m) => m.ScrollProgress),
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
  axes: ["SOFT", "WONK", "opsz"],
});

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
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
      icon: [{ url: "/media/durgotsav-logo.png", type: "image/png" }],
      apple: [{ url: "/media/durgotsav-logo.png" }],
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
      <head>
        {/* Scroll reveals ship with inline `opacity: 0` and are brought in by
            script. Without JavaScript that content would simply be invisible,
            so force every reveal to its final state. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}",
            }}
          />
        </noscript>
      </head>
      <body className="zone-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:rounded-[2px] focus:bg-[var(--color-gold-400)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[var(--color-ink-900)]"
        >
          {t(UI.skipToContent, locale)}
        </a>

        <LocaleProvider locale={locale}>
          <SmoothScroll />
          <LoadingScreen locale={locale} />
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
