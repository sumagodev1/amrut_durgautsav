import type { LocalizedText } from "@/lib/i18n";

/**
 * Registration form copy.
 *
 * The fields mirror exactly what the campaign's own privacy policy says it
 * collects — "नाव, ईमेल, मोबाईल क्रमांक व शहर" — so the form never asks for
 * anything the published policy does not already cover.
 */

export const REGISTRATION = {
  eyebrow: { mr: "नोंदणी", en: "Registration" } satisfies LocalizedText,
  heading: {
    mr: "आपला सहभाग नोंदवा",
    en: "Register your participation",
  } satisfies LocalizedText,
  lede: {
    mr: "खालील माहिती भरा. नोंदणी मोफत आहे.",
    en: "Fill in the details below. Registration is free.",
  } satisfies LocalizedText,

  fields: {
    name: {
      label: { mr: "पूर्ण नाव", en: "Full name" } satisfies LocalizedText,
      placeholder: { mr: "उदा. सौरभ पाटील", en: "e.g. Saurabh Patil" } satisfies LocalizedText,
    },
    mobile: {
      label: { mr: "मोबाईल क्रमांक", en: "Mobile number" } satisfies LocalizedText,
      placeholder: { mr: "१० अंकी क्रमांक", en: "10-digit number" } satisfies LocalizedText,
      hint: {
        mr: "याच क्रमांकावर आम्ही संपर्क साधू.",
        en: "We will contact you on this number.",
      } satisfies LocalizedText,
    },
    email: {
      label: { mr: "ईमेल", en: "Email" } satisfies LocalizedText,
      optional: { mr: "ऐच्छिक", en: "optional" } satisfies LocalizedText,
      placeholder: { mr: "name@example.com", en: "name@example.com" } satisfies LocalizedText,
    },
    district: {
      label: { mr: "जिल्हा", en: "District" } satisfies LocalizedText,
      placeholder: { mr: "जिल्हा निवडा", en: "Select a district" } satisfies LocalizedText,
    },
    fort: {
      label: { mr: "कोणत्या दुर्गाची प्रतिकृती बनवणार?", en: "Which fort will you build?" } satisfies LocalizedText,
      optional: { mr: "ऐच्छिक", en: "optional" } satisfies LocalizedText,
      placeholder: { mr: "दुर्ग निवडा", en: "Select a fort" } satisfies LocalizedText,
      undecided: { mr: "अद्याप ठरवले नाही", en: "Not decided yet" } satisfies LocalizedText,
    },
    consent: {
      label: {
        mr: "मी दिलेली माहिती खरी आहे आणि गोपनीयता धोरणास माझी संमती आहे.",
        en: "The details I have given are true, and I consent to the privacy policy.",
      } satisfies LocalizedText,
      policyLink: { mr: "गोपनीयता धोरण", en: "Privacy policy" } satisfies LocalizedText,
    },
  },

  submit: { mr: "नोंदणी करा", en: "Register" } satisfies LocalizedText,
  submitting: { mr: "पाठवत आहे…", en: "Sending…" } satisfies LocalizedText,

  /** Shown when the submission reached a configured endpoint. */
  success: {
    title: { mr: "नोंदणी झाली!", en: "You’re registered." } satisfies LocalizedText,
    body: {
      mr: "आपला सहभाग नोंदवला गेला आहे. पुढील माहितीसाठी आम्ही आपल्याशी संपर्क साधू.",
      en: "Your participation has been recorded. We will be in touch with what happens next.",
    } satisfies LocalizedText,
  },

  /**
   * Shown when no registration endpoint is configured. The details are handed
   * to WhatsApp — the channel the campaign already publishes — so the form is
   * genuinely useful rather than quietly discarding what was typed.
   */
  handoff: {
    title: { mr: "शेवटची एक पायरी", en: "One last step" } satisfies LocalizedText,
    body: {
      mr: "आपली माहिती तयार आहे. खालील बटणावर क्लिक करून ती WhatsApp वर पाठवा — तिथेच आपली नोंदणी पूर्ण होईल.",
      en: "Your details are ready. Send them over WhatsApp with the button below — that completes your registration.",
    } satisfies LocalizedText,
    cta: { mr: "WhatsApp वर पाठवा", en: "Send on WhatsApp" } satisfies LocalizedText,
    again: { mr: "दुसरी नोंदणी करा", en: "Register someone else" } satisfies LocalizedText,
  },

  errors: {
    name: { mr: "कृपया आपले पूर्ण नाव लिहा.", en: "Please enter your full name." } satisfies LocalizedText,
    mobile: {
      mr: "कृपया वैध १० अंकी मोबाईल क्रमांक लिहा.",
      en: "Please enter a valid 10-digit mobile number.",
    } satisfies LocalizedText,
    email: { mr: "कृपया वैध ईमेल लिहा.", en: "Please enter a valid email address." } satisfies LocalizedText,
    district: { mr: "कृपया जिल्हा निवडा.", en: "Please select a district." } satisfies LocalizedText,
    fort: { mr: "कृपया यादीतील दुर्ग निवडा.", en: "Please choose a fort from the list." } satisfies LocalizedText,
    consent: { mr: "पुढे जाण्यासाठी संमती आवश्यक आहे.", en: "Please give your consent to continue." } satisfies LocalizedText,
    generic: {
      mr: "नोंदणी पाठवता आली नाही. कृपया पुन्हा प्रयत्न करा किंवा WhatsApp वर संपर्क साधा.",
      en: "We couldn’t send your registration. Please try again, or reach us on WhatsApp.",
    } satisfies LocalizedText,
  },

  /** Label for the WhatsApp message body built from the form. */
  messageIntro: {
    mr: "दुर्गोत्सव २०२५ — नोंदणी",
    en: "Durgotsav 2025 — registration",
  } satisfies LocalizedText,
} as const;
