import type { LocalizedList, LocalizedText } from "@/lib/i18n";

/**
 * Privacy policy and terms, reproduced from /privacy and /terms on
 * amrutdurgotsav.com. Legal text is never paraphrased.
 */

export type LegalSection = {
  key: string;
  heading: LocalizedText;
  body?: LocalizedText;
  bullets?: LocalizedList;
};

export type LegalDocument = {
  title: LocalizedText;
  intro: LocalizedText;
  sections: readonly LegalSection[];
  updated: LocalizedText;
};

export const PRIVACY: LegalDocument = {
  title: { mr: "गोपनीयता धोरण", en: "Privacy Policy" },
  intro: {
    mr: "हे गोपनीयता धोरण (“धोरण”) दुर्गोत्सव २०२५ या उपक्रमाशी संबंधित संकेतस्थळ व नोंदणी प्रक्रियेमध्ये गोळा होणाऱ्या वैयक्तिक माहितीच्या वापर, साठवण व संरक्षणाबद्दल माहिती देते.",
    en: "This privacy policy (“the Policy”) explains how personal information collected through the Durgotsav 2025 website and registration process is used, stored and protected.",
  },
  sections: [
    {
      key: "collect",
      heading: { mr: "१. आम्ही कोणती माहिती गोळा करतो", en: "1. What information we collect" },
      bullets: {
        mr: [
          "नाव, ईमेल, मोबाईल क्रमांक व शहर",
          "आपण स्वेच्छेने अपलोड केलेला फोटो / प्रतिमा",
          "तांत्रिक माहिती: IP पत्ता, ब्राउझर प्रकार, वापराची वेळ इ.",
        ],
        en: [
          "Name, email, mobile number and city",
          "Photographs or images you upload voluntarily",
          "Technical information: IP address, browser type, time of use and the like",
        ],
      },
    },
    {
      key: "use",
      heading: { mr: "२. माहितीचा उपयोग", en: "2. How the information is used" },
      body: {
        mr: "नोंदणी पडताळणी, संवाद साधणे, कार्यक्रमाशी संबंधित अद्यतने देणे व सांख्यिक विश्लेषण (aggregate insights) या उद्दिष्टांसाठी माहिती वापरली जाते.",
        en: "The information is used to verify registrations, to communicate with you, to send updates related to the programme, and for aggregate statistical insight.",
      },
    },
    {
      key: "sharing",
      heading: { mr: "३. माहितीची देवाणघेवाण", en: "3. Sharing of information" },
      body: {
        mr: "आपली वैयक्तिक माहिती आम्ही विकत नाही. आवश्यक तांत्रिक सेवा (होस्टिंग, ईमेल वितरण) पुरवणाऱ्या विश्वासार्ह भागीदारांशी मर्यादित स्वरूपात करार आधारित शेअर केली जाऊ शकते.",
        en: "We do not sell your personal information. It may be shared on a limited, contractual basis with trusted partners who provide necessary technical services such as hosting and email delivery.",
      },
    },
    {
      key: "security",
      heading: { mr: "४. डेटा सुरक्षाव्यवस्था", en: "4. Data security" },
      body: {
        mr: "प्रमाणित सुरक्षा पद्धती (HTTPS, access नियंत्रण) वापरून माहितीचे संरक्षण करण्याचा प्रयत्न केला जातो; तथापि इंटरनेटवरील संपूर्ण सुरक्षा हमी देता येत नाही.",
        en: "We endeavour to protect information using standard security practices such as HTTPS and access control; however, complete security on the internet cannot be guaranteed.",
      },
    },
    {
      key: "retention",
      heading: { mr: "५. जतन कालावधी", en: "5. Retention period" },
      body: {
        mr: "उपक्रमाच्या प्रशासनासाठी आवश्यक तेवढ्या काळापुरती वैयक्तिक माहिती जतन केली जाते किंवा कायदेशीर आवश्यकता पूर्ण करण्यासाठी ठेवली जाते.",
        en: "Personal information is retained only for as long as the administration of the initiative requires, or as needed to meet legal obligations.",
      },
    },
    {
      key: "rights",
      heading: { mr: "६. आपले अधिकार", en: "6. Your rights" },
      bullets: {
        mr: [
          "आपल्या माहितीचा प्रवेश मागवण्याचा अधिकार",
          "सुधारणा / विलोपन विनंती करण्याचा अधिकार (वाजवी मर्यादेत)",
          "संवाद प्राप्त न करण्याचा (opt-out) पर्याय",
        ],
        en: [
          "The right to request access to your information",
          "The right to request correction or deletion, within reasonable limits",
          "The option to opt out of receiving communications",
        ],
      },
    },
    {
      key: "contact",
      heading: { mr: "७. संपर्क", en: "7. Contact" },
      body: {
        mr: "गोपनीयता संदर्भात प्रश्न अथवा विनंत्यांसाठी आमच्याशी संपर्क साधा.",
        en: "For questions or requests regarding privacy, please get in touch with us.",
      },
    },
  ],
  updated: { mr: "शेवटचे अद्यतन: सप्टेंबर २०२५", en: "Last updated: September 2025" },
};

export const TERMS: LegalDocument = {
  title: { mr: "अटी व शर्ती", en: "Terms & Conditions" },
  intro: {
    mr: "या अटी व शर्ती (“अटी”) दुर्गोत्सव २०२५ उपक्रमाशी संबंधित संकेतस्थळ व नोंदणीचा वापर नियंत्रित करतात. संकेतस्थळ वापरताना आपण या अटी स्वीकारता.",
    en: "These terms and conditions (“the Terms”) govern use of the Durgotsav 2025 website and registration. By using the website you accept these Terms.",
  },
  sections: [
    {
      key: "eligibility",
      heading: { mr: "१. सहभागी पात्रता", en: "1. Eligibility to participate" },
      body: {
        mr: "उपक्रमामध्ये नोंदणी करणारी व्यक्ती सत्य माहिती देण्यास बांधील आहे. बनावट माहिती आढळल्यास नोंदणी रद्द केली जाऊ शकते.",
        en: "Anyone registering for the initiative is obliged to provide truthful information. Registration may be cancelled if false information is found.",
      },
    },
    {
      key: "use-limits",
      heading: { mr: "२. वापर मर्यादा", en: "2. Limits on use" },
      bullets: {
        mr: [
          "अनधिकृत किंवा हानीकारक कृती करणे वर्ज्य",
          "इतर सहभागींच्या माहितीचा अवैध वापर निषिद्ध",
          "सर्व कायदेशीर नियमनांचे पालन आवश्यक",
        ],
        en: [
          "Unauthorised or harmful activity is forbidden",
          "Unlawful use of other participants’ information is prohibited",
          "All applicable legal regulations must be complied with",
        ],
      },
    },
    {
      key: "ip",
      heading: { mr: "३. बौद्धिक संपदा", en: "3. Intellectual property" },
      body: {
        mr: "लोगो, डिझाईन, मजकूर व इतर साहित्य अधिकारास संरक्षित आहेत. अनधिकृत प्रतिकृती वा वितरण टाळा.",
        en: "Logos, designs, text and other material are protected by rights. Please refrain from unauthorised reproduction or distribution.",
      },
    },
    {
      key: "liability",
      heading: { mr: "४. उत्तरदायित्व मर्यादा", en: "4. Limitation of liability" },
      body: {
        mr: "उपक्रमाद्वारे दिलेल्या माहितीतील त्रुटी, सेवा व्यत्यय किंवा बाह्य दुव्यांवरील धोक्यांबाबत आयोजकांची मर्यादित जबाबदारी असेल. कृत्रिम प्रणालीचा वापर करण्यात आला असून, त्यामध्ये चुका होण्याची शक्यता आहे.",
        en: "The organisers’ liability is limited in respect of errors in the information provided, interruptions of service, or risks arising from external links. Automated systems have been used and errors are possible.",
      },
    },
    {
      key: "changes",
      heading: { mr: "५. बदल", en: "5. Changes" },
      body: {
        mr: "अटी वेळोवेळी अद्यतनित केल्या जाऊ शकतात. महत्वाचे बदल सूचित करण्याचा प्रयत्न केला जाईल.",
        en: "These Terms may be updated from time to time. We will endeavour to give notice of significant changes.",
      },
    },
    {
      key: "law",
      heading: { mr: "६. कायदा लागू", en: "6. Governing law" },
      body: {
        mr: "या अटी भारत प्रजासत्ताकातील लागू कायद्यांनुसार नियंत्रित असतील.",
        en: "These Terms are governed by the applicable laws of the Republic of India.",
      },
    },
    {
      key: "contact",
      heading: { mr: "७. संपर्क", en: "7. Contact" },
      body: {
        mr: "अटी संदर्भात चौकशीसाठी आमच्याशी संपर्क साधा.",
        en: "For enquiries regarding these Terms, please get in touch with us.",
      },
    },
  ],
  updated: { mr: "शेवटचे अद्यतन: सप्टेंबर २०२५", en: "Last updated: September 2025" },
};
