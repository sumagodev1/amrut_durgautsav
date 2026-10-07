import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FAQ, FAQ_META } from "@/data/faq";
import { CONTACT, FOOTER_LINKS } from "@/data/site";
import { formatIndex, isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata, JsonLd, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Display } from "@/components/ui/Typo";

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
    path: "/faq",
    title: t(FAQ_META.heading, locale),
    description: t(FAQ[0].answer, locale),
  });
}

/**
 * Questions and answers.
 *
 * Plain, numbered and always open — four short answers do not need an
 * accordion, and hiding them behind a click would only add a step.
 */
export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const label = t(FOOTER_LINKS[1].label, locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t(FAQ_META.eyebrow, locale)}
        title={t(FAQ_META.heading, locale)}
        crumbs={[{ label }]}
      />

      <section className="zone-paper border-t border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <Reveal stagger={0.1}>
            <dl className="mx-auto max-w-4xl border-t border-[var(--border)]">
              {FAQ.map((item, i) => (
                <RevealItem key={item.key} className="border-b border-[var(--border)]">
                  <div className="grid gap-3 py-9 sm:grid-cols-[auto_1fr] sm:gap-8 sm:py-11">
                    <span className="text-eyebrow text-[var(--accent)] tabular-nums sm:pt-2">
                      {formatIndex(i + 1, locale)}
                    </span>
                    <div>
                      <dt>
                        <Display
                          locale={locale}
                          level="h3"
                          as="h2"
                          className="text-[var(--foreground)]"
                        >
                          {t(item.question, locale)}
                        </Display>
                      </dt>
                      <dd
                        lang={locale}
                        className="mt-3.5 max-w-2xl text-lg leading-[1.85] text-[var(--muted)]"
                      >
                        {t(item.answer, locale)}
                      </dd>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl">
            <p lang={locale} className="text-[var(--muted)]">
              {t(FAQ_META.contactPrompt, locale)}{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="border-b border-[var(--border)] text-[var(--primary)] transition-colors hover:border-[var(--primary)]"
              >
                {CONTACT.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
            { name: label, path: "/faq" },
          ]),
          faqSchema(
            FAQ.map((item) => ({
              question: t(item.question, locale),
              answer: t(item.answer, locale),
            })),
          ),
        ]}
      />
    </>
  );
}
