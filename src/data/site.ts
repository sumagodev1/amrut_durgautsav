import type { LocalizedText } from "@/lib/i18n";

/**
 * Brand, contact and navigation.
 *
 * Every value here is taken from amrutdurgotsav.com. Nothing is invented.
 */

export const SITE = {
  /** Public origin — override via NEXT_PUBLIC_SITE_URL at deploy time. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://amrutdurgotsav.com",

  festival: {
    mr: "दुर्गोत्सव",
    en: "Durgotsav",
  } satisfies LocalizedText,

  year: {
    mr: "२०२५",
    en: "2025",
  } satisfies LocalizedText,

  /** The organising body: Maharashtra Research, Upliftment & Training Prabodhini. */
  organisation: {
    mr: "महाराष्ट्र संशोधन, उन्नती व प्रशिक्षण प्रबोधिनी",
    en: "Maharashtra Research, Upliftment and Training Prabodhini",
  } satisfies LocalizedText,

  organisationShort: {
    mr: "अमृत",
    en: "AMRUT",
  } satisfies LocalizedText,

  parentBrand: {
    mr: "अमृत महाराष्ट्र",
    en: "Amrut Maharashtra",
  } satisfies LocalizedText,

  tagline: {
    mr: "शिवरायांच्या गडदुर्गांना मानवंदना",
    en: "A salute to the forts of Chhatrapati Shivaji Maharaj",
  } satisfies LocalizedText,

  description: {
    mr: "शिवछत्रपतींच्या पराक्रमाचे साक्षीदार राहिलेल्या आपल्या १२ गडदुर्गांना UNESCO कडून वैश्विक ख्यातीच्या वास्तू म्हणून मान्यता मिळाली. दुर्गोत्सव २०२५ मध्ये सहभागी व्हा!",
    en: "The twelve forts that witnessed the valour of Chhatrapati Shivaji Maharaj have been recognised by UNESCO as monuments of global significance. Be part of Durgotsav 2025.",
  } satisfies LocalizedText,
} as const;

export const CONTACT = {
  email: "info@mahaamrut.org.in",
  /** The number the live site uses for its WhatsApp channel. */
  phone: "+919112226154",
  phoneDisplay: "+91 91122 26154",
  whatsappMessage: {
    mr: "नमस्कार! मला दुर्गोत्सव २०२५ बद्दल अधिक माहिती हवी आहे.",
    en: "Hello! I would like to know more about Durgotsav 2025.",
  } satisfies LocalizedText,
  address: {
    mr: "महाराष्ट्र संशोधन, उन्नती व प्रशिक्षण प्रबोधिनी (अमृत),\nमहाराज सयाजीराव गायकवाड उद्योग भवन,\nपाचवा मजला, औंध, पुणे – ४११०६७.",
    en: "Maharashtra Research, Upliftment and Training Prabodhini (AMRUT),\nMaharaj Sayajirao Gaikwad Udyog Bhavan,\nFifth Floor, Aundh, Pune – 411067.",
  } satisfies LocalizedText,
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(message)}`;
}

export type SocialLink = {
  /** Also selects the icon — see components/layout/SocialLinks.tsx. */
  key: "instagram" | "facebook" | "x" | "youtube";
  label: string;
  handle?: string;
  /**
   * Omit until an official URL is confirmed. Entries without an href are not
   * rendered at all — a dead or guessed link on a government-backed campaign
   * site is worse than a missing icon.
   */
  href?: string;
};

/**
 * Social accounts.
 *
 * Instagram is the one account the campaign actually publishes: it is the
 * link carried by amrutdurgotsav.com itself. The source site also shows
 * Facebook, X and YouTube icons, but all three point at `href="#"` there —
 * they are placeholders, not accounts.
 *
 * To switch one on, drop its official URL into `href` below. The icon, the
 * footer row, the mobile menu, the contact page and the `sameAs` property of
 * the Organization structured data all pick it up automatically.
 */
export const SOCIAL: readonly SocialLink[] = [
  {
    key: "instagram",
    label: "Instagram",
    handle: "@durgotsav2025",
    href: "https://www.instagram.com/durgotsav2025?igsh=czl0cWJseDlkeXF1",
  },
  { key: "facebook", label: "Facebook" },
  { key: "x", label: "X" },
  { key: "youtube", label: "YouTube" },
];

/** Only the accounts that have a real URL. */
export const ACTIVE_SOCIAL = SOCIAL.filter(
  (s): s is SocialLink & { href: string } => Boolean(s.href),
);

export type NavItem = {
  key: string;
  href: string;
  /** Full form — page titles, breadcrumbs, footer directory. */
  label: LocalizedText;
  /**
   * Terse form for the top bar, where six items share the row with the
   * lockup and the controls. Falls back to `label`.
   */
  short?: LocalizedText;
};

/**
 * Primary navigation. Mirrors the sections of the original site, regrouped so
 * the story reads: why → what → proof → join.
 */
export const NAV: readonly NavItem[] = [
  {
    key: "mission",
    href: "/mission",
    label: { mr: "मोहिमेचे उद्दीष्ट", en: "The Mission" },
    short: { mr: "उद्दीष्ट", en: "Mission" },
  },
  {
    key: "forts",
    href: "/forts",
    label: { mr: "बारा दुर्ग", en: "The Twelve Forts" },
    short: { mr: "बारा दुर्ग", en: "The Forts" },
  },
  {
    key: "participate",
    href: "/participate",
    label: { mr: "सहभाग", en: "Take Part" },
  },
  {
    key: "gallery",
    href: "/gallery",
    label: { mr: "गॅलरी", en: "Gallery" },
  },
  {
    key: "record",
    href: "/record",
    label: { mr: "विश्वविक्रम", en: "World Record" },
    short: { mr: "विश्वविक्रम", en: "Record" },
  },
  {
    key: "voices",
    href: "/voices",
    label: { mr: "मान्यवर", en: "Voices" },
  },
] as const;

/** Secondary links surfaced in the footer only. */
export const FOOTER_LINKS: readonly NavItem[] = [
  { key: "album", href: "/album", label: { mr: "अल्बम", en: "Photo Album" } },
  { key: "faq", href: "/faq", label: { mr: "प्रश्नोत्तरे", en: "FAQ" } },
  { key: "contact", href: "/contact", label: { mr: "संपर्क", en: "Contact" } },
  { key: "privacy", href: "/privacy", label: { mr: "गोपनीयता धोरण", en: "Privacy Policy" } },
  { key: "terms", href: "/terms", label: { mr: "अटी व शर्ती", en: "Terms & Conditions" } },
] as const;
