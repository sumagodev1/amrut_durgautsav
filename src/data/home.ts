import type { LocalizedText } from "@/lib/i18n";

/**
 * Homepage narrative content.
 *
 * Every Marathi string is the original copy from amrutdurgotsav.com.
 * The English strings are faithful translations of that copy — no facts
 * added, removed or embellished.
 */

export const HERO = {
  eyebrow: {
    mr: "अमृत महाराष्ट्र प्रस्तुत",
    en: "Presented by Amrut Maharashtra",
  } satisfies LocalizedText,

  titleMr: "दुर्गोत्सव",
  titleEn: "Durgotsav",
  year: { mr: "२०२५", en: "2025" } satisfies LocalizedText,

  lede: {
    mr: "शिवछत्रपतींच्या पराक्रमाचे साक्षीदार राहिलेल्या आपल्या १२ गडदुर्गांना UNESCO कडून वैश्विक ख्यातीचे वास्तू म्हणून मान्यता महाराष्ट्र सरकारच्या अथक प्रयत्नातून नुकतीच मिळाली.",
    en: "Through the sustained efforts of the Government of Maharashtra, the twelve forts that witnessed the valour of Chhatrapati Shivaji Maharaj have just been recognised by UNESCO as monuments of global significance.",
  } satisfies LocalizedText,

  callToArms: {
    mr: "आपल्या गौरवशाली इतिहासाला विश्वविक्रमी मानवंदना देण्याची वेळ आली आहे!",
    en: "The time has come to offer our glorious history a salute worthy of a world record.",
  } satisfies LocalizedText,
} as const;

/** The marquee strip under the hero — a cultural rhythm, not decoration. */
export const MARQUEE_PHRASES: readonly LocalizedText[] = [
  { mr: "चला दुर्ग बनवूयात", en: "Let’s build forts" },
  { mr: "युनेस्को जागतिक वारसा", en: "UNESCO World Heritage" },
  { mr: "१२ गडदुर्ग", en: "Twelve forts" },
  { mr: "शिवरायांना मानवंदना", en: "A salute to Shivaji Maharaj" },
  { mr: "विश्वविक्रमी लोकसहभाग", en: "A record-setting public movement" },
];

/**
 * The three pillars of the campaign — the "माहिती" / about block.
 */
export const PILLARS = [
  {
    key: "unesco",
    index: 1,
    title: { mr: "UNESCO मान्यता", en: "UNESCO Recognition" } satisfies LocalizedText,
    body: {
      mr: "महाराष्ट्र शासनाच्या अथक प्रयत्नातून शिवछत्रपतींच्या पराक्रमाचे साक्षीदार राहिलेल्या आपल्या बारा गडदुर्गांना युनेस्कोकडून वैश्विक ख्यातीच्या वास्तू म्हणून मान्यता मिळाली.",
      en: "Through the Government of Maharashtra’s sustained efforts, the twelve forts that witnessed the valour of Chhatrapati Shivaji Maharaj have been recognised by UNESCO as monuments of global significance.",
    } satisfies LocalizedText,
  },
  {
    key: "tradition",
    index: 2,
    title: { mr: "परंपरा संवर्धन", en: "Keeping a Tradition Alive" } satisfies LocalizedText,
    body: {
      mr: "आपल्या राज्यामध्ये अनेक ठिकाणी दिवाळीचा सण साजरा करत असतानाच गेली अनेक दशके दुर्गांच्या प्रतिकृती बनवायची परंपरा अबालवृद्धांनी एकत्र येऊन चालवलेली आहे.",
      en: "For many decades, across Maharashtra, young and old have come together at Diwali to build replicas of the forts — a tradition carried on alongside the festival itself.",
    } satisfies LocalizedText,
  },
  {
    key: "platform",
    index: 3,
    title: { mr: "व्यासपीठ निर्मिती", en: "Building the Platform" } satisfies LocalizedText,
    body: {
      mr: "या प्रथेच्या पुनरूत्थानासाठी एक व्यासपीठ मिळवून देत यामध्ये विश्वविक्रमी लोकसहभाग व्हावा म्हणून महाराष्ट्रातील सर्व नागरिकांना यंदाच्या दिवाळीच्या पर्वामध्ये या अभिनव अशा उत्सवामध्ये सहभागी होण्याचे आमंत्रण आम्ही इथे देत आहोत.",
      en: "To revive this practice we have built a platform for it — and we invite every citizen of Maharashtra to join this festival during Diwali, so that public participation itself becomes a world record.",
    } satisfies LocalizedText,
  },
] as const;

/** The "काय करायचे आहे?" block — what you are actually asked to do. */
export const WHAT_TO_DO = {
  heading: { mr: "काय करायचे आहे?", en: "What are we asking of you?" } satisfies LocalizedText,
  body: {
    mr: "दरवर्षीप्रमाणे याही वर्षी आपल्या अंगणात, गृह संकुलाच्या सार्वजनिक जागांमध्ये, लोकप्रतिनिधींनी आयोजित केलेल्या दुर्ग बनवण्याच्या स्पर्धांमध्ये — अगदी जमेल तिथे दुर्गांच्या प्रतिकृती बनवायच्या आहेत.",
    en: "Just as every year — in your own courtyard, in the shared spaces of your housing society, in the fort-building contests your local representatives organise — wherever you can, build a replica of a fort.",
  } satisfies LocalizedText,
} as const;

/** The four participation steps. */
export const STEPS = [
  {
    key: "gather",
    title: { mr: "एकत्र या", en: "Come together" } satisfies LocalizedText,
    body: {
      mr: "कुटुंबाने, मित्रांनी एकत्र येऊन UNESCO ने अधोरेखित केलेल्या १२ दुर्गांची हुबेहूब प्रतिकृती बनवायच्या आहेत.",
      en: "With family and friends, build a faithful replica of one of the twelve forts UNESCO has recognised.",
    } satisfies LocalizedText,
  },
  {
    key: "photograph",
    title: { mr: "फोटो काढा", en: "Take a photograph" } satisfies LocalizedText,
    body: {
      mr: "त्या प्रतिकृतीसोबत आपला स्वतःचा फोटो घ्या आणि आठवणी साठवून ठेवा.",
      en: "Photograph yourself with the fort you built, and keep the memory.",
    } satisfies LocalizedText,
  },
  {
    key: "upload",
    title: { mr: "अपलोड करा", en: "Upload it" } satisfies LocalizedText,
    body: {
      mr: "या उत्सवासाठी निर्मिलेल्या व्यासपीठावर आपला फोटो अपलोड करावा.",
      en: "Upload your photo to the platform built for this festival.",
    } satisfies LocalizedText,
  },
  {
    key: "certificate",
    title: { mr: "अभिनंदन पत्र मिळवा", en: "Receive your letter" } satisfies LocalizedText,
    body: {
      mr: "उत्सवामध्ये अशाप्रकारे आपला सहभाग नोंदवल्याबद्दल साऱ्या शिवभक्तांना मान्यवरांच्या स्वाक्षरीचे अभिनंदन पत्र मिळणार आहे.",
      en: "Everyone who takes part in this way receives a letter of congratulation, signed by the dignitaries of the campaign.",
    } satisfies LocalizedText,
  },
] as const;

/** The invitation block — "यंदा साजरा करूया दुर्गोत्सव!" */
export const INVITATION = {
  kicker: { mr: "यंदा साजरा करूया", en: "This year, let us celebrate" } satisfies LocalizedText,
  title: { mr: "दुर्गोत्सव!", en: "Durgotsav!" } satisfies LocalizedText,
  body: {
    mr: "आपल्या वैभवशाली इतिहासाचा असा उत्सव जगात क्वचितच दुसरीकडे साजरा होतो. चला, या परंपरेला नवी उंची देऊया!",
    en: "Few places on earth celebrate their own history quite like this. Let us carry this tradition to a new height.",
  } satisfies LocalizedText,
} as const;

/** Closing CTA used above the footer. */
export const FINAL_CTA = {
  title: { mr: "आपला सहभाग नोंदवावा", en: "Add your name to this" } satisfies LocalizedText,
  body: {
    mr: "आजच नोंदणी करा आणि या ऐतिहासिक उत्सवाचा भाग व्हा.",
    en: "Register today and become part of a historic celebration.",
  } satisfies LocalizedText,
  closing: {
    mr: "महाराष्ट्र संशोधन, उन्नती व प्रशिक्षण प्रबोधिनी “अमृत” द्वारे आयोजित या दुर्गोत्सवामध्ये मोठ्या संख्येने सहभाग घेऊया आणि आपल्या शिवरायांच्या गडदुर्गांना एक अभूतपूर्व आणि विश्वविक्रमी मानवंदना देऊया!",
    en: "Join this Durgotsav, organised by the Maharashtra Research, Upliftment and Training Prabodhini (AMRUT), in great numbers — and offer the forts of Shivaji Maharaj a salute without precedent.",
  } satisfies LocalizedText,
} as const;

/** The live progress band. Figures come from the API, never hard-coded. */
export const PROGRESS = {
  title: { mr: "आजपर्यंतची प्रगती", en: "Progress so far" } satisfies LocalizedText,
  body: {
    mr: "महाराष्ट्रातील किल्ल्यांचा गौरव जगभर पोहोचवण्याच्या मोहिमेत आपला सहभाग.",
    en: "Your part in carrying the glory of Maharashtra’s forts to the world.",
  } satisfies LocalizedText,
  participantsLabel: { mr: "सहभागी", en: "Participants" } satisfies LocalizedText,
  participantsCaption: {
    mr: "दुर्गोत्सव २०२५ मध्ये नोंदणी झाली",
    en: "registered for Durgotsav 2025",
  } satisfies LocalizedText,
} as const;
