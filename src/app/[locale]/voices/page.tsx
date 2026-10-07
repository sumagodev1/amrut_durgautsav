import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { VOICES, VOICES_META } from "@/data/voices";
import { NAV } from "@/data/site";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { RampartRule } from "@/components/decor/Ornament";

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
    path: "/voices",
    title: t(VOICES_META.heading, locale),
    description: t(VOICES[0].quote, locale).slice(0, 180),
  });
}

/**
 * The dignitaries' statements in full.
 *
 * Set as alternating editorial spreads — attribution in the rail, the
 * statement in a measured column — so each person's words get the room the
 * homepage could not give them.
 */
export default async function VoicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const label = t(NAV[5].label, locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t(VOICES_META.eyebrow, locale)}
        title={t(VOICES_META.heading, locale)}
        crumbs={[{ label }]}
      />

      <section className="zone-paper border-t border-[var(--border)]">
        {VOICES.map((voice, i) => (
          <div
            key={voice.key}
            className={i > 0 ? "border-t border-[var(--border)]" : undefined}
          >
            <div className="container-page py-16 sm:py-24">
              <Reveal>
                <figure className="grid gap-8 lg:grid-cols-12 lg:gap-14">
                  {/* Attribution rail */}
                  <figcaption className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
                    <div className="flex items-center gap-4">
                      {voice.portrait ? (
                        <Image
                          src={voice.portrait.src}
                          alt={t(voice.portrait.alt, locale)}
                          width={80}
                          height={80}
                          className="size-16 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="flex size-16 shrink-0 items-center justify-center rounded-full border border-[var(--border)] font-[family-name:var(--font-devanagari)] text-2xl text-[var(--accent)]"
                        >
                          {t(voice.name, "mr").replace(/^श्री\.\s*/, "").charAt(0)}
                        </span>
                      )}
                      <div>
                        <p lang={locale} className="text-xl text-[var(--foreground)]">
                          {t(voice.name, locale)}
                        </p>
                      </div>
                    </div>
                    <p lang={locale} className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                      {t(voice.designation, locale)}
                    </p>
                    <RampartRule className="mt-6 w-32" />
                  </figcaption>

                  {/* The statement */}
                  <blockquote className="lg:col-span-7 lg:col-start-6">
                    <p
                      lang={locale}
                      className="font-[family-name:var(--font-devanagari)] text-[clamp(1.0625rem,0.95rem+0.8vw,1.5rem)] leading-[1.75] text-[var(--foreground)]"
                    >
                      {t(voice.quote, locale)}
                    </p>
                  </blockquote>
                </figure>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
          { name: label, path: "/voices" },
        ])}
      />
    </>
  );
}
