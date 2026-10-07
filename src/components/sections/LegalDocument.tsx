import type { LegalDocument as LegalDoc } from "@/data/legal";
import { CONTACT } from "@/data/site";
import { t, tList, type Locale } from "@/lib/i18n";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Display } from "@/components/ui/Typo";

/**
 * Renders a legal document.
 *
 * Privacy and terms share this one component — they have identical structure,
 * and keeping them in a single renderer means a change to the typography of
 * one is a change to both.
 */
export function LegalDocument({
  document,
  locale,
}: {
  document: LegalDoc;
  locale: Locale;
}) {
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t(document.updated, locale)}
        title={t(document.title, locale)}
        lede={t(document.intro, locale)}
        crumbs={[{ label: t(document.title, locale) }]}
      />

      <section className="zone-paper border-t border-[var(--border)] py-20 sm:py-28">
        <div className="container-prose">
          <Reveal>
            <ol className="space-y-12">
              {document.sections.map((section) => (
                <li key={section.key}>
                  <Display
                    locale={locale}
                    level="h3"
                    as="h2"
                    className="text-[var(--foreground)]"
                  >
                    {t(section.heading, locale)}
                  </Display>

                  {section.body && (
                    <p
                      lang={locale}
                      className="mt-4 text-[1.0625rem] leading-[1.9] text-[var(--muted)]"
                    >
                      {t(section.body, locale)}
                    </p>
                  )}

                  {section.bullets && (
                    <ul className="mt-4 space-y-2.5 border-l border-[var(--border)] pl-5">
                      {tList(section.bullets, locale).map((bullet) => (
                        <li
                          key={bullet}
                          lang={locale}
                          className="text-[1.0625rem] leading-[1.8] text-[var(--muted)]"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.key === "contact" && (
                    <p className="mt-4">
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="border-b border-[var(--border)] text-[var(--primary)] transition-colors hover:border-[var(--primary)]"
                      >
                        {CONTACT.email}
                      </a>
                    </p>
                  )}
                </li>
              ))}
            </ol>

            <p className="mt-16 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)]">
              {t(document.updated, locale)}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
