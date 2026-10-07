import type { LocalizedText } from "@/lib/i18n";

/** Frequently asked questions, reproduced from the /faq page of the source site. */

export type FaqItem = {
  key: string;
  question: LocalizedText;
  answer: LocalizedText;
};

export const FAQ: readonly FaqItem[] = [
  {
    key: "what-is-durgotsav",
    question: { mr: "दुर्गोत्सव काय आहे?", en: "What is Durgotsav?" },
    answer: {
      mr: "हा उपक्रम महाराष्ट्रातील गडदुर्गांच्या परंपरेला जनसामान्यांमधून मानवंदना देण्यासाठी आहे.",
      en: "It is an initiative through which the people of Maharashtra offer a salute to the tradition of its forts.",
    },
  },
  {
    key: "registration-fee",
    question: { mr: "नोंदणी शुल्क आहे का?", en: "Is there a registration fee?" },
    answer: {
      mr: "सध्या मूलभूत सहभाग नोंदणी विनामूल्य आहे; काही प्रशिक्षण / विशेष उपक्रमांसाठी वेगळी माहिती दिली जाईल.",
      en: "Basic participation is free to register at present; separate information will be given for certain training or special activities.",
    },
  },
  {
    key: "why-upload",
    question: { mr: "मी फोटो कशासाठी अपलोड करतो?", en: "Why am I uploading a photo?" },
    answer: {
      mr: "आपण बनविलेल्या / सजविलेल्या दुर्गाच्या प्रतिकृतीचा पुरावा व प्रदर्शनासाठी.",
      en: "As a record of the fort replica you built or decorated, and so that it can be displayed.",
    },
  },
  {
    key: "data-safety",
    question: { mr: "माझा डेटा सुरक्षित आहे का?", en: "Is my data safe?" },
    answer: {
      mr: "होय, आमचे गोपनीयता धोरण लागू आहे व आवश्यक सुरक्षा उपाय केले जातात.",
      en: "Yes — our privacy policy applies and the necessary security measures are taken.",
    },
  },
];

export const FAQ_META = {
  eyebrow: { mr: "प्रश्नोत्तरे", en: "Questions" } satisfies LocalizedText,
  heading: { mr: "वारंवार विचारले जाणारे प्रश्न", en: "Frequently asked questions" } satisfies LocalizedText,
  contactPrompt: { mr: "अधिक प्रश्न? आम्हाला लिहा:", en: "More questions? Write to us:" } satisfies LocalizedText,
} as const;
