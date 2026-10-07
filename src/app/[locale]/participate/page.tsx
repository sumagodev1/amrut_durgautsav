import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Users, Camera, Upload, Award, Mail, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { STEPS, WHAT_TO_DO, FINAL_CTA } from "@/data/home";
import { TIMELINE, REGISTRATION_NOTICE } from "@/data/timeline";
import { CONTACT, whatsappUrl, NAV } from "@/data/site";
import { UI } from "@/data/ui";
import { formatIndex, isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Display, Eyebrow } from "@/components/ui/Typo";
import { Button } from "@/components/ui/Button";
import { RuledFrame, GatewayMotif } from "@/components/decor/Ornament";
import { cn, eyebrowClass } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  gather: Users,
  photograph: Camera,
  upload: Upload,
  certificate: Award,
};

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
    path: "/participate",
    title: t(NAV[2].label, locale),
    description: t(WHAT_TO_DO.body, locale),
  });
}

/**
 * How to take part.
 *
 * The four steps at full size, the dates, and the ways to reach the
 * organisers. There is no registration form here and no link to one: the
 * source site states only that the platform opens on 13 October, so that is
 * what this page says. A fabricated form or URL would be worse than none.
 */
export default async function ParticipatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const label = t(NAV[2].label, locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={label}
        title={locale === "mr" ? "चार पावलांत सहभागी व्हा" : "Four steps to take part"}
        lede={t(WHAT_TO_DO.body, locale)}
        crumbs={[{ label }]}
      />

      {/* --- The steps --------------------------------------------------- */}
      <section className="zone-paper border-t border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <Reveal stagger={0.1}>
            <ol className="grid gap-px bg-[var(--border)] sm:grid-cols-2">
              {STEPS.map((step, i) => {
                const Icon = ICONS[step.key] ?? Users;
                return (
                  <RevealItem as="li" key={step.key} className="bg-[var(--background)]">
                    <article className="group flex h-full gap-5 p-7 sm:p-9">
                      <span className="relative shrink-0">
                        <span className="flex size-12 items-center justify-center rounded-full border border-[var(--border)] text-[var(--primary)] transition-colors duration-500 group-hover:border-[var(--primary)]">
                          <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                        </span>
                        <span
                          aria-hidden
                          className="text-eyebrow absolute -top-1 -left-1 text-[var(--accent)] tabular-nums"
                        >
                          {formatIndex(i + 1, locale)}
                        </span>
                      </span>
                      <div>
                        <Display
                          locale={locale}
                          level="h3"
                          as="h2"
                          className="text-[var(--foreground)]"
                        >
                          {t(step.title, locale)}
                        </Display>
                        <p
                          lang={locale}
                          className="mt-3 text-[0.9375rem] leading-[1.85] text-[var(--muted)]"
                        >
                          {t(step.body, locale)}
                        </p>
                      </div>
                    </article>
                  </RevealItem>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* --- Dates + how to reach us ------------------------------------ */}
      <section className="zone-ink border-t border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Dates */}
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow>{locale === "mr" ? "महत्त्वाच्या तारखा" : "Key dates"}</Eyebrow>
              </Reveal>
              <Reveal stagger={0.08} className="mt-8">
                <ol className="border-t border-[var(--border)]">
                  {TIMELINE.map((entry) => (
                    <RevealItem
                      as="li"
                      key={entry.key}
                      className="flex flex-col gap-1 border-b border-[var(--border)] py-5 sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <span
                        lang={locale}
                        className="w-44 shrink-0 font-[family-name:var(--font-devanagari)] text-lg text-[var(--accent)]"
                      >
                        {t(entry.date, locale)}
                      </span>
                      <span lang={locale} className="text-[0.9375rem] text-[var(--foreground)]">
                        {t(entry.title, locale)}
                      </span>
                    </RevealItem>
                  ))}
                </ol>
              </Reveal>
            </div>

            {/* Registration status + contact */}
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={0.08}>
                <div className="relative p-7 sm:p-9">
                  <RuledFrame />
                  <div className="relative">
                    <p
                      className={cn(
                        eyebrowClass(t(REGISTRATION_NOTICE.title, locale)),
                        "text-[var(--accent)]",
                      )}
                    >
                      {t(REGISTRATION_NOTICE.title, locale)}
                    </p>
                    <p
                      lang={locale}
                      className="mt-4 text-[1.0625rem] leading-[1.85] text-[var(--foreground)]"
                    >
                      {t(REGISTRATION_NOTICE.body, locale)}
                    </p>

                    <div className="mt-8 space-y-3">
                      <Button
                        href={whatsappUrl(t(CONTACT.whatsappMessage, locale))}
                        external
                        className="w-full"
                        withArrow
                      >
                        <MessageCircle aria-hidden className="mr-1 size-4" strokeWidth={1.75} />
                        {t(UI.whatsapp, locale)}
                      </Button>
                      <Button
                        href={`mailto:${CONTACT.email}`}
                        variant="outline"
                        className="w-full"
                      >
                        <Mail aria-hidden className="mr-1 size-4" strokeWidth={1.75} />
                        {CONTACT.email}
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.12} className="mt-20 flex flex-col items-center text-center">
            <GatewayMotif className="opacity-40" />
            <p
              lang={locale}
              className="mt-6 max-w-3xl font-[family-name:var(--font-devanagari)] text-[clamp(1.125rem,1rem+0.9vw,1.625rem)] leading-[1.65] text-[var(--foreground)]"
            >
              {t(FINAL_CTA.closing, locale)}
            </p>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
          { name: label, path: "/participate" },
        ])}
      />
    </>
  );
}
