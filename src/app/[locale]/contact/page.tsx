import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";
import { CONTACT, SOCIAL, SITE, FOOTER_LINKS, whatsappUrl } from "@/data/site";
import { UI } from "@/data/ui";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { RuledFrame } from "@/components/decor/Ornament";
import { cn, eyebrowClass } from "@/lib/utils";

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
    path: "/contact",
    title: t(UI.contactHeading, locale),
    description: `${t(SITE.organisation, locale)} — ${CONTACT.email}`,
  });
}

/**
 * Contact.
 *
 * Direct channels only. The source site offers email, phone/WhatsApp, a
 * postal address and Instagram — so that is what this page offers. There is
 * no contact form here, because there is no endpoint behind one.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const label = t(FOOTER_LINKS[2].label, locale);

  const channels = [
    {
      key: "email",
      icon: Mail,
      label: t(UI.emailLabel, locale),
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      key: "phone",
      icon: Phone,
      label: t(UI.phoneLabel, locale),
      value: CONTACT.phoneDisplay,
      href: `tel:${CONTACT.phone}`,
      ltr: true,
    },
    ...SOCIAL.map((s) => ({
      key: s.key,
      icon: Instagram,
      label: s.label,
      value: s.handle,
      href: s.href,
      external: true,
    })),
  ];

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t(SITE.organisationShort, locale)}
        title={t(UI.contactHeading, locale)}
        lede={t(SITE.organisation, locale)}
        crumbs={[{ label }]}
      />

      <section className="zone-paper border-t border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Channels */}
            <div className="lg:col-span-7">
              <Reveal stagger={0.08}>
                <ul className="border-t border-[var(--border)]">
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <RevealItem as="li" key={channel.key} className="border-b border-[var(--border)]">
                        <a
                          href={channel.href}
                          data-cursor="link"
                          {...("external" in channel && channel.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="group flex items-center gap-5 py-7"
                        >
                          <Icon
                            aria-hidden
                            className="size-5 shrink-0 text-[var(--accent)]"
                            strokeWidth={1.6}
                          />
                          <span className="min-w-0 flex-1">
                            <span
                              className={cn(
                                eyebrowClass(channel.label),
                                "block text-[var(--muted)]",
                              )}
                            >
                              {channel.label}
                            </span>
                            <span
                              dir={"ltr" in channel && channel.ltr ? "ltr" : undefined}
                              className="mt-1.5 block truncate text-[1.0625rem] text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)] sm:text-xl"
                            >
                              {channel.value}
                            </span>
                          </span>
                        </a>
                      </RevealItem>
                    );
                  })}
                </ul>
              </Reveal>

              <Reveal delay={0.12} className="mt-10">
                <Button
                  href={whatsappUrl(t(CONTACT.whatsappMessage, locale))}
                  external
                  withArrow
                  magnetic
                >
                  <MessageCircle aria-hidden className="mr-1 size-4" strokeWidth={1.75} />
                  {t(UI.whatsapp, locale)}
                </Button>
              </Reveal>
            </div>

            {/* Address */}
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.1}>
                <div className="relative p-7 sm:p-9">
                  <RuledFrame />
                  <div className="relative">
                    <MapPin
                      aria-hidden
                      className="size-5 text-[var(--accent)]"
                      strokeWidth={1.6}
                    />
                    <h2
                      className={cn(
                        eyebrowClass(t(UI.addressLabel, locale)),
                        "mt-5 text-[var(--muted)]",
                      )}
                    >
                      {t(UI.addressLabel, locale)}
                    </h2>
                    <address
                      lang={locale}
                      className="mt-4 whitespace-pre-line text-[1.0625rem] leading-[1.9] not-italic text-[var(--foreground)]"
                    >
                      {t(CONTACT.address, locale)}
                    </address>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: locale === "mr" ? "मुख्य पृष्ठ" : "Home", path: "/" },
          { name: label, path: "/contact" },
        ])}
      />
    </>
  );
}
