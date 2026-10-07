"use client";

import Link from "next/link";
import { useActionState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { registerAction } from "@/app/[locale]/participate/actions";
import { REGISTRATION } from "@/data/registration";
import { DISTRICTS } from "@/data/districts";
import { FORTS } from "@/data/forts";
import { UI } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { EMPTY_VALUES, type RegistrationState } from "@/lib/registration";
import { cn, localeHref } from "@/lib/utils";
import { Field, TextInput, SelectInput, CheckboxInput } from "./Field";
import { RuledFrame } from "@/components/decor/Ornament";

/**
 * The registration form.
 *
 * Progressive enhancement by construction: it is a plain `<form action={…}>`
 * bound to a Server Action, so it submits and validates with JavaScript
 * disabled. `useActionState` only adds the pending state and keeps what was
 * typed when validation sends the form back.
 */
export function RegistrationForm({ locale }: { locale: Locale }) {
  const initial: RegistrationState = { status: "idle", values: EMPTY_VALUES };
  const [state, formAction, pending] = useActionState(registerAction, initial);

  const f = REGISTRATION.fields;
  const values = state.values ?? EMPTY_VALUES;
  const errors = state.errors ?? {};
  const hasErrors = Object.keys(errors).length > 0;

  if (state.status === "success") {
    return (
      <Outcome
        tone="success"
        icon={<CheckCircle2 aria-hidden className="size-7" strokeWidth={1.4} />}
        title={t(REGISTRATION.success.title, locale)}
        body={t(REGISTRATION.success.body, locale)}
        locale={locale}
      />
    );
  }

  if (state.status === "handoff" && state.whatsappUrl) {
    return (
      <Outcome
        tone="handoff"
        icon={<Send aria-hidden className="size-7" strokeWidth={1.4} />}
        title={t(REGISTRATION.handoff.title, locale)}
        body={t(REGISTRATION.handoff.body, locale)}
        locale={locale}
      >
        <a
          href={state.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="inline-flex min-h-11 items-center gap-2.5 rounded-[2px] bg-[var(--primary)] px-7 py-3.5 text-[0.9375rem] font-semibold text-[var(--primary-contrast)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--color-ink-900)]"
        >
          <MessageCircle aria-hidden className="size-4" strokeWidth={1.75} />
          {t(REGISTRATION.handoff.cta, locale)}
        </a>
        <a
          href="#register"
          onClick={() => window.location.reload()}
          className="text-[0.9375rem] text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:underline"
        >
          {t(REGISTRATION.handoff.again, locale)}
        </a>
      </Outcome>
    );
  }

  return (
    <form action={formAction} noValidate className="relative p-7 sm:p-10">
      <RuledFrame />

      <div className="relative">
        <input type="hidden" name="locale" value={locale} />

        {/* Honeypot — off-screen, never announced, never tabbed to. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {/* A single summary so the problem is announced once, at the top. */}
        {hasErrors && (
          <p
            role="alert"
            className="mb-7 border-l-2 border-[var(--danger)] py-1 pl-4 text-[0.9375rem] text-[var(--danger)]"
          >
            {t(REGISTRATION.errors.generic, locale).split(".")[0]}.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id="reg-name"
            label={t(f.name.label, locale)}
            error={errors.name}
            className="sm:col-span-2"
          >
            <TextInput
              id="reg-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              defaultValue={values.name}
              placeholder={t(f.name.placeholder, locale)}
              error={errors.name}
            />
          </Field>

          <Field
            id="reg-mobile"
            label={t(f.mobile.label, locale)}
            hint={t(f.mobile.hint, locale)}
            error={errors.mobile}
          >
            <TextInput
              id="reg-mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              required
              dir="ltr"
              defaultValue={values.mobile}
              placeholder={t(f.mobile.placeholder, locale)}
              error={errors.mobile}
              hint={t(f.mobile.hint, locale)}
            />
          </Field>

          <Field
            id="reg-email"
            label={t(f.email.label, locale)}
            optional={t(f.email.optional, locale)}
            error={errors.email}
          >
            <TextInput
              id="reg-email"
              name="email"
              type="email"
              autoComplete="email"
              dir="ltr"
              defaultValue={values.email}
              placeholder={t(f.email.placeholder, locale)}
              error={errors.email}
            />
          </Field>

          <Field id="reg-district" label={t(f.district.label, locale)} error={errors.district}>
            <SelectInput
              id="reg-district"
              name="district"
              required
              defaultValue={values.district}
              error={errors.district}
            >
              <option value="">{t(f.district.placeholder, locale)}</option>
              {DISTRICTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {t(d.label, locale)}
                </option>
              ))}
            </SelectInput>
          </Field>

          <Field
            id="reg-fort"
            label={t(f.fort.label, locale)}
            optional={t(f.fort.optional, locale)}
            error={errors.fort}
          >
            <SelectInput
              id="reg-fort"
              name="fort"
              defaultValue={values.fort}
              error={errors.fort}
            >
              <option value="">{t(f.fort.placeholder, locale)}</option>
              {FORTS.map((fort) => (
                <option key={fort.slug} value={fort.slug}>
                  {t(fort.name, locale)}
                </option>
              ))}
              <option value="undecided">{t(f.fort.undecided, locale)}</option>
            </SelectInput>
          </Field>
        </div>

        <div className="mt-8">
          <CheckboxInput id="reg-consent" name="consent" required error={errors.consent}>
            {t(f.consent.label, locale)}{" "}
            <Link
              href={localeHref(locale, "/privacy")}
              className="text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {t(f.consent.policyLink, locale)}
            </Link>
          </CheckboxInput>
        </div>

        <button
          type="submit"
          disabled={pending}
          data-cursor="link"
          className={cn(
            "mt-9 inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-[2px]",
            "bg-[var(--primary)] px-7 py-3.5 text-[0.9375rem] font-semibold text-[var(--primary-contrast)]",
            "transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--color-ink-900)]",
            "disabled:cursor-wait disabled:opacity-70 sm:w-auto",
          )}
        >
          {pending ? t(REGISTRATION.submitting, locale) : t(REGISTRATION.submit, locale)}
        </button>
      </div>
    </form>
  );
}

function Outcome({
  tone,
  icon,
  title,
  body,
  locale,
  children,
}: {
  tone: "success" | "handoff";
  icon: React.ReactNode;
  title: string;
  body: string;
  locale: Locale;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative p-9 text-center sm:p-12" role="status" aria-live="polite">
      <RuledFrame />
      <div className="relative flex flex-col items-center">
        <span
          className={cn(
            "flex size-14 items-center justify-center rounded-full border",
            tone === "success"
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-[var(--primary)] text-[var(--primary)]",
          )}
        >
          {icon}
        </span>

        <p
          lang={locale}
          className="mt-6 font-[family-name:var(--font-devanagari)] text-[clamp(1.25rem,1.05rem+1vw,1.75rem)] text-[var(--foreground)]"
        >
          {title}
        </p>
        <p lang={locale} className="mt-3 max-w-md text-base leading-[1.8] text-[var(--muted)]">
          {body}
        </p>

        {children && (
          <div className="mt-8 flex flex-col items-center gap-4">{children}</div>
        )}

        {!children && (
          <Link
            href={localeHref(locale, "/")}
            className="mt-8 text-[0.9375rem] text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:underline"
          >
            {t(UI.backHome, locale)}
          </Link>
        )}
      </div>
    </div>
  );
}
