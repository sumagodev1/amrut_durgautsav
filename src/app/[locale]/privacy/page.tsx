import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRIVACY } from "@/data/legal";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { LegalDocument } from "@/components/sections/LegalDocument";

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
    path: "/privacy",
    title: t(PRIVACY.title, locale),
    description: t(PRIVACY.intro, locale),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <LegalDocument document={PRIVACY} locale={locale} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
          { name: t(PRIVACY.title, locale), path: "/privacy" },
        ])}
      />
    </>
  );
}
