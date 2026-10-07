"use server";

import { isLocale, t, type Locale } from "@/lib/i18n";
import { REGISTRATION } from "@/data/registration";
import {
  validateRegistration,
  submitRegistration,
  registrationWhatsappUrl,
  EMPTY_VALUES,
  type RegistrationState,
} from "@/lib/registration";

/**
 * Handles a registration submission.
 *
 * Written as a Server Action taking FormData, which means the form works with
 * JavaScript disabled: the browser posts it, this runs, and the page comes
 * back with either errors or the next step.
 *
 * Three outcomes:
 *   success  — a registration endpoint is configured and accepted the entry
 *   handoff  — no endpoint configured, so hand the details to WhatsApp
 *   error    — validation failed, or the endpoint rejected it
 *
 * There is deliberately no fourth outcome where the form reports success
 * without the data having gone anywhere.
 */
export async function registerAction(
  _prev: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const rawLocale = String(formData.get("locale") ?? "");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "mr";

  // Honeypot: a field positioned off-screen that people never see and simple
  // bots fill in. Accept the submission silently so the bot learns nothing.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success", values: EMPTY_VALUES };
  }

  const raw: Record<string, string> = {};
  for (const key of ["name", "mobile", "email", "district", "fort", "consent"]) {
    raw[key] = String(formData.get(key) ?? "");
  }

  const result = validateRegistration(raw, locale);
  if (!result.ok) {
    return { status: "error", errors: result.errors, values: result.values };
  }

  const { delivered } = await submitRegistration(result.values);

  if (delivered) {
    return { status: "success", values: EMPTY_VALUES };
  }

  // No endpoint, or it refused. Either way the details are not lost — they go
  // to the organisers over the channel the campaign already publishes.
  return {
    status: "handoff",
    values: result.values,
    whatsappUrl: registrationWhatsappUrl(result.values, locale),
    message: t(REGISTRATION.handoff.body, locale),
  };
}
