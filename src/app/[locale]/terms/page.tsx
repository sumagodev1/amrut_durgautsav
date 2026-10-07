import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TERMS } from "@/data/legal";
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
    path: "/terms",
    title: t(TERMS.title, locale),
    description: t(TERMS.intro, locale),
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <LegalDocument document={TERMS} locale={locale} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
          { name: t(TERMS.title, locale), path: "/terms" },
        ])}
      />
    </>
  );
}
