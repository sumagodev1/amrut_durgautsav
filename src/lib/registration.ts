import { DISTRICTS } from "@/data/districts";
import { FORTS } from "@/data/forts";
import { REGISTRATION } from "@/data/registration";
import { CONTACT, whatsappUrl } from "@/data/site";
import { t, type Locale } from "@/lib/i18n";

/**
 * Registration: validation and submission.
 *
 * Validation runs on the server. The browser's own `required` / `type`
 * attributes are a convenience for the person filling the form; they are not
 * a check, because nothing stops a request arriving without them.
 */

export type RegistrationField = "name" | "mobile" | "email" | "district" | "fort" | "consent";

export type RegistrationValues = {
  name: string;
  mobile: string;
  email: string;
  district: string;
  fort: string;
};

export type RegistrationState = {
  status: "idle" | "error" | "success" | "handoff";
  /** Per-field messages, already localised. */
  errors?: Partial<Record<RegistrationField, string>>;
  /** Echoed back so the form refills itself when validation fails. */
  values?: RegistrationValues;
  /** Prefilled WhatsApp link, when there is no endpoint to post to. */
  whatsappUrl?: string;
  message?: string;
};

export const EMPTY_VALUES: RegistrationValues = {
  name: "",
  mobile: "",
  email: "",
  district: "",
  fort: "",
};

/**
 * Indian mobile numbers are ten digits beginning 6–9. People type them with
 * spaces, dashes and a +91 prefix, so normalise before judging.
 */
export function normaliseMobile(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function isValidMobile(raw: string): boolean {
  return /^[6-9]\d{9}$/.test(normaliseMobile(raw));
}

function isValidEmail(raw: string): boolean {
  // Deliberately permissive: the only email that truly validates is one that
  // receives a message. This rejects obvious typos, nothing more.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw);
}

/** Validate raw form input. Returns either clean values or localised errors. */
export function validateRegistration(
  raw: Record<string, string>,
  locale: Locale,
): { ok: true; values: RegistrationValues } | { ok: false; errors: Partial<Record<RegistrationField, string>>; values: RegistrationValues } {
  const values: RegistrationValues = {
    name: (raw.name ?? "").trim().replace(/\s+/g, " ").slice(0, 80),
    mobile: (raw.mobile ?? "").trim().slice(0, 20),
    email: (raw.email ?? "").trim().slice(0, 120),
    district: (raw.district ?? "").trim(),
    fort: (raw.fort ?? "").trim(),
  };

  const errors: Partial<Record<RegistrationField, string>> = {};
  const e = REGISTRATION.errors;

  if (values.name.length < 2) errors.name = t(e.name, locale);
  if (!isValidMobile(values.mobile)) errors.mobile = t(e.mobile, locale);
  if (values.email && !isValidEmail(values.email)) errors.email = t(e.email, locale);
  if (!DISTRICTS.some((d) => d.id === values.district)) errors.district = t(e.district, locale);
  if (values.fort && values.fort !== "undecided" && !FORTS.some((f) => f.slug === values.fort)) {
    errors.fort = t(e.fort, locale);
  }
  if (raw.consent !== "on") errors.consent = t(e.consent, locale);

  if (Object.keys(errors).length > 0) return { ok: false, errors, values };
  return { ok: true, values };
}

/** A readable summary of the registration, used for the WhatsApp handoff. */
export function buildRegistrationMessage(values: RegistrationValues, locale: Locale): string {
  const district = DISTRICTS.find((d) => d.id === values.district);
  const fort = FORTS.find((f) => f.slug === values.fort);

  const labelOf = (key: "name" | "mobile" | "email" | "district" | "fort") =>
    t(REGISTRATION.fields[key].label, locale);

  const lines = [
    `*${t(REGISTRATION.messageIntro, locale)}*`,
    "",
    `${labelOf("name")}: ${values.name}`,
    `${labelOf("mobile")}: ${normaliseMobile(values.mobile)}`,
  ];

  if (values.email) lines.push(`${labelOf("email")}: ${values.email}`);
  if (district) lines.push(`${labelOf("district")}: ${t(district.label, locale)}`);
  if (fort) lines.push(`${labelOf("fort")}: ${t(fort.name, locale)}`);
  else if (values.fort === "undecided") {
    lines.push(`${labelOf("fort")}: ${t(REGISTRATION.fields.fort.undecided, locale)}`);
  }

  return lines.join("\n");
}

export function registrationWhatsappUrl(values: RegistrationValues, locale: Locale): string {
  return whatsappUrl(buildRegistrationMessage(values, locale));
}

/**
 * Forward a validated registration to the campaign platform.
 *
 * `REGISTRATION_ENDPOINT` is a server-only variable, so the URL and any token
 * never reach the browser. When it is not configured the caller falls back to
 * the WhatsApp handoff rather than pretending the submission was stored.
 */
export async function submitRegistration(
  values: RegistrationValues,
): Promise<{ delivered: boolean }> {
  const endpoint = process.env.REGISTRATION_ENDPOINT;
  if (!endpoint) return { delivered: false };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.REGISTRATION_TOKEN
          ? { Authorization: `Bearer ${process.env.REGISTRATION_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        name: values.name,
        mobile: normaliseMobile(values.mobile),
        email: values.email || null,
        district: values.district,
        fort: values.fort || null,
        source: "amrutdurgotsav.com",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
    return { delivered: res.ok };
  } catch {
    return { delivered: false };
  }
}

export const SUPPORT_CONTACT = CONTACT;
