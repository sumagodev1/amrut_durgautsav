import type { LocalizedText } from "@/lib/i18n";

/**
 * "नियोजन" — the festival calendar.
 *
 * Dates are exactly those published on amrutdurgotsav.com. `iso` is derived
 * from those dates for machine-readable markup (schema.org Event, <time>).
 * The Shivpratap Din entry deliberately carries no ISO date: the source site
 * names the occasion rather than a calendar date, and we do not invent one.
 */

export type TimelineEntry = {
  key: string;
  /** ISO date, where the source site states one. */
  iso?: string;
  date: LocalizedText;
  title: LocalizedText;
  body?: LocalizedText;
};

export const TIMELINE: readonly TimelineEntry[] = [
  {
    key: "registrations-open",
    iso: "2025-10-13",
    date: { mr: "१३ ऑक्टोबर", en: "13 October" },
    title: { mr: "नोंदणी सुरू", en: "Registrations open" },
    body: {
      mr: "या उत्सवासाठी बनवलेले व्यासपीठ नोंदणींसाठी १३ ऑक्टोबरपासून खुले करण्यात येणार आहे.",
      en: "The platform built for this festival opens for registrations on 13 October.",
    },
  },
  {
    key: "festival-begins",
    iso: "2025-10-18",
    date: { mr: "१८ ऑक्टोबर", en: "18 October" },
    title: { mr: "उत्सवाचा श्रीगणेशा", en: "The festival begins" },
  },
  {
    key: "last-day",
    iso: "2025-11-10",
    date: { mr: "१० नोव्हेंबर", en: "10 November" },
    title: { mr: "सहभागासाठी शेवटचा दिवस", en: "Final day to take part" },
  },
  {
    key: "shivpratap-din",
    date: {
      mr: "शिवप्रताप दिवस",
      en: "Shivpratap Din",
    },
    title: {
      mr: "शिवप्रताप दिवस (अफझल वध दिवस)",
      en: "Shivpratap Din (Afzal Khan Vadh Din)",
    },
    body: {
      mr: "अभिनंदन पत्र तसेच विश्वविक्रम प्रस्थापित करण्याच्या प्रयत्नांचा अधिकृत दिनांक. विश्वविक्रम प्रस्थापित झाल्यास महाराष्ट्रातील रयतेच्या वतीने विश्वविक्रम नोंदविणाऱ्या संस्थेच्या प्रतिनिधींकडून प्रमाणपत्र स्वीकृतीचा सोहळा.",
      en: "The official date for the letters of congratulation and for the world-record attempt. Should the record be established, the certificate will be received from the representatives of the record-keeping body on behalf of the people of Maharashtra.",
    },
  },
];

export const TIMELINE_META = {
  eyebrow: { mr: "नियोजन", en: "The plan" } satisfies LocalizedText,
  heading: {
    mr: "महत्त्वाच्या तारखा व उत्सवातील मुख्य टप्पे",
    en: "Key dates and milestones of the festival",
  } satisfies LocalizedText,
} as const;

/** Registration-notice banner, as published on the source site. */
export const REGISTRATION_NOTICE = {
  title: { mr: "नोंदणी सूचना", en: "Registration notice" } satisfies LocalizedText,
  body: {
    mr: "या उत्सवासाठी बनवलेले व्यासपीठ नोंदणींसाठी १३ ऑक्टोबर पासून खुले करण्यात येणार आहे.",
    en: "The platform built for this festival opens for registrations from 13 October.",
  } satisfies LocalizedText,
  dismiss: { mr: "ठीक आहे", en: "Got it" } satisfies LocalizedText,
} as const;
