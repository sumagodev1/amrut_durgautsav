import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { SITE } from "@/data/site";
import { pageMetadata, JsonLd, festivalEventSchema } from "@/lib/seo";

import { Hero } from "@/components/hero/Hero";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { IntroSection } from "@/components/sections/IntroSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { FortsSection } from "@/components/sections/FortsSection";
import { ParticipateSection } from "@/components/sections/ParticipateSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ProgressSection } from "@/components/sections/ProgressSection";
import { RecordSection } from "@/components/sections/RecordSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { VoicesSection } from "@/components/sections/VoicesSection";
import { RegistrationNotice } from "@/components/sections/RegistrationNotice";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "mr";

  return pageMetadata({
    locale,
    path: "/",
    title: `${t(SITE.festival, locale)} ${t(SITE.year, locale)} — ${t(SITE.tagline, locale)}`,
    description: t(SITE.description, locale),
  });
}

/**
 * The homepage, as a single scroll narrative:
 *
 *   hero → why it matters → the twelve forts → what to do →
 *   when → how far we've come → the record → the photographs → the voices
 *
 * Bands alternate between the dark cinematic zone and the warm paper zone so
 * the eye is never asked to read long copy on a dark ground, and the forts
 * and the record each get the darkness they deserve.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <RegistrationNotice locale={locale} />

      <Hero locale={locale} />
      <MarqueeStrip locale={locale} />

      <IntroSection locale={locale} />
      <PillarsSection locale={locale} />

      <FortsSection locale={locale} />
      <ParticipateSection locale={locale} />

      <TimelineSection locale={locale} />
      <ProgressSection locale={locale} />

      <RecordSection locale={locale} />
      <GallerySection locale={locale} />

      <VoicesSection locale={locale} />

      <JsonLd data={festivalEventSchema(locale)} />
    </>
  );
}
