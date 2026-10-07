import type { LocalizedText } from "@/lib/i18n";

/**
 * Interface chrome — button labels, aria text, empty states.
 * Content lives in its own files; this is only the furniture around it.
 */
export const UI = {
  skipToContent: { mr: "मुख्य मजकुरावर जा", en: "Skip to content" },
  menuOpen: { mr: "मेनू उघडा", en: "Open menu" },
  menuClose: { mr: "मेनू बंद करा", en: "Close menu" },
  menu: { mr: "मेनू", en: "Menu" },
  home: { mr: "मुख्य पृष्ठ", en: "Home" },
  backHome: { mr: "मुख्य पृष्ठावर या", en: "Back to Durgotsav" },
  register: { mr: "आता नोंदणी करा", en: "Register now" },
  registerShort: { mr: "नोंदणी", en: "Register" },
  explore: { mr: "दुर्गोत्सव पहा", en: "Explore Durgotsav" },
  scroll: { mr: "खाली सरका", en: "Scroll" },
  readMore: { mr: "अधिक वाचा", en: "Read more" },
  viewAll: { mr: "सर्व पहा", en: "View all" },
  loading: { mr: "लोड होत आहे...", en: "Loading…" },
  noPhotos: { mr: "अजून फोटो उपलब्ध नाहीत", en: "No photos available yet" },
  selectDistrict: { mr: "जिल्हा निवडा", en: "Select a district" },
  allDistricts: { mr: "सर्व", en: "All" },
  previous: { mr: "मागे", en: "Previous" },
  next: { mr: "पुढे", en: "Next" },
  page: { mr: "पृष्ठ", en: "Page" },
  close: { mr: "बंद करा", en: "Close" },
  whatsapp: { mr: "WhatsApp वर आम्हाला संदेश पाठवा", en: "Message us on WhatsApp" },
  languageLabel: { mr: "भाषा", en: "Language" },
  copyright: { mr: "सर्व हक्क राखीव.", en: "All rights reserved." },
  quickLinks: { mr: "द्रुत लिंक्स", en: "Quick links" },
  contactHeading: { mr: "संपर्क", en: "Contact" },
  emailLabel: { mr: "ईमेल", en: "Email" },
  phoneLabel: { mr: "फोन", en: "Phone" },
  addressLabel: { mr: "पत्ता", en: "Address" },
  followLabel: { mr: "सोशल मीडिया", en: "Follow" },
  notFoundTitle: { mr: "पृष्ठ सापडले नाही", en: "Page not found" },
  notFoundBody: {
    mr: "आपण शोधत असलेले पृष्ठ येथे नाही. वाट चुकली असेल — चला, पुन्हा दुर्गोत्सवाकडे.",
    en: "This page isn’t here. Looks like you wandered off the celebration path — let’s head back.",
  },
  errorTitle: { mr: "काहीतरी अडचण आली", en: "Something went wrong" },
  errorBody: {
    mr: "हे पृष्ठ लोड करताना अडचण आली. कृपया पुन्हा प्रयत्न करा.",
    en: "We couldn’t load this page. Please try again.",
  },
  retry: { mr: "पुन्हा प्रयत्न करा", en: "Try again" },
  relatedForts: { mr: "इतर दुर्ग", en: "More forts" },
  district: { mr: "जिल्हा", en: "District" },
  unescoLabel: { mr: "युनेस्को जागतिक वारसा", en: "UNESCO World Heritage" },
} satisfies Record<string, LocalizedText>;

export type UIKey = keyof typeof UI;
