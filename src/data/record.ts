import type { LocalizedText } from "@/lib/i18n";

/**
 * "विश्वविक्रम गौरव" — the Guinness World Records achievement, as announced on
 * amrutdurgotsav.com. The record title is reproduced exactly as the source
 * site states it.
 */

export const RECORD = {
  eyebrow: { mr: "विश्वविक्रम गौरव", en: "World Record" } satisfies LocalizedText,

  /** The record title, in the wording used by the source site. */
  title: "Largest Online Photo Album of Handmade Sculptures",

  heading: { mr: "अभिनंदन!", en: "Congratulations!" } satisfies LocalizedText,

  body: {
    mr: "आपण सर्वांनी मिळून दुर्गोत्सवाला “Guinness Book of World Records” मध्ये स्थान मिळवून दिले आहे! हा आपल्या सर्वांसाठी — प्रत्येक स्वयंसेवक, सहभागी आणि शुभेच्छुकासाठी — अभिमानाचा क्षण आहे. जगाच्या नकाशावर आपल्या दुर्गोत्सवाचा ठसा उमटवल्याबद्दल मनःपूर्वक हार्दिक अभिनंदन!",
    en: "Together we have earned Durgotsav a place in the Guinness Book of World Records. This is a moment of pride for every one of us — every volunteer, every participant, every well-wisher. Heartfelt congratulations on leaving the mark of our Durgotsav on the map of the world.",
  } satisfies LocalizedText,

  pullquote: {
    mr: "राष्ट्राच्या गौरवशाली इतिहासाला अवघ्या विश्वात अशा प्रकारची मानवंदना देणारी प्रथा इतर कुठेही नाही. मग हा उत्सव साजरा करूया!",
    en: "Nowhere else in the world is a nation’s glorious history saluted in quite this way. So let us celebrate this festival.",
  } satisfies LocalizedText,

  imageAlt: {
    mr: "विश्वविक्रमाच्या सोहळ्याचे छायाचित्र",
    en: "World record celebration",
  } satisfies LocalizedText,
} as const;
