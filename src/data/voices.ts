import type { LocalizedText } from "@/lib/i18n";

/**
 * "दुर्गोत्सव - आमचे अनुभव" — statements from the dignitaries behind the
 * campaign, reproduced from amrutdurgotsav.com.
 *
 * Listed in order of office: Minister, then Secretary, then Managing
 * Director. The homepage features the first entry and links to the rest, so
 * this order decides whose words lead that section.
 */

export type Voice = {
  key: string;
  name: LocalizedText;
  designation: LocalizedText;
  quote: LocalizedText;
  portrait?: { src: string; alt: LocalizedText };
};

export const VOICES: readonly Voice[] = [
  {
    key: "atul-save",
    name: { mr: "श्री. अतुल मोरेश्वर सावे", en: "Shri Atul Moreshwar Save" },
    designation: {
      mr: "मंत्री — इतर मागास बहुजन कल्याण, ग्रामीण विकास, अपारंपारिक ऊर्जा, दिव्यांग कल्याण",
      en: "Minister — Other Backward Bahujan Welfare, Rural Development, Non-Conventional Energy, Divyang Welfare",
    },
    quote: {
      mr: "अमृत या महाराष्ट्र शासनाच्या स्वायत्त संस्थेने अतिशय अभिनव अशा लोकोत्सवाला सुरुवात केलेली आहे. डिजिटल आणि फिजिकल या दोन्ही गोष्टींचा मिलाफ घडवून आणणाऱ्या दुर्गोत्सवात साऱ्यांनी सहभाग घ्यावा आणि शिवछत्रपतींच्या नावाने एक अभूतपूर्व असा विश्वविक्रम प्रस्थापित करण्यासाठी हातभार लावावा असे मी साऱ्यांना आवाहन करतो.",
      en: "AMRUT, an autonomous body of the Government of Maharashtra, has begun a people’s festival of a wholly original kind. I appeal to everyone to take part in Durgotsav — which brings the digital and the physical together — and to help set an unprecedented world record in the name of Shivchhatrapati.",
    },
    portrait: {
      src: "/media/atul-save.jpeg",
      alt: {
        mr: "श्री. अतुल मोरेश्वर सावे यांचे छायाचित्र",
        en: "Portrait of Shri Atul Moreshwar Save",
      },
    },
  },
  {
    key: "appasaheb-dhulaj",
    name: { mr: "श्री. अप्पासाहेब धुळाज", en: "Shri Appasaheb Dhulaj" },
    designation: {
      mr: "भा.प्र.से., सचिव, इतर मागास बहुजन कल्याण विभाग, महाराष्ट्र शासन",
      en: "IAS, Secretary, Other Backward Bahujan Welfare Department, Government of Maharashtra",
    },
    quote: {
      mr: "घराघरात दुर्ग बांधण्याच्या प्रथेला अमृत या महाराष्ट्र शासनाच्या स्वायत्त संस्थेच्या पुढाकारातून एका लोकोत्सवात परिवर्तित करण्याचे आम्ही आयोजित आहे. माननीय मुख्यमंत्री महोदयांच्या स्वाक्षरीचे अभिनंदन पत्र तसेच विश्वविक्रमात हातभार लावण्याचे समाधान हे दोन्ही सहभाग घेणाऱ्या साऱ्यांना मिळणार आहे. मी आवाहन करतो महाराष्ट्राच्या सगळ्या जनतेला की त्यांनी मोठ्या उत्साहाने दुर्गोत्सवात आपला सहभाग नोंदवावा.",
      en: "Through the initiative of AMRUT, an autonomous body of the Government of Maharashtra, we have set out to turn the household practice of building forts into a people’s festival. Everyone who takes part will receive both a letter of congratulation bearing the Hon’ble Chief Minister’s signature and the satisfaction of having contributed to a world record. I appeal to all the people of Maharashtra to register their participation in Durgotsav with great enthusiasm.",
    },
    portrait: {
      src: "/media/appasaheb-dhulaj.jpeg",
      alt: {
        mr: "श्री. अप्पासाहेब धुळाज यांचे छायाचित्र",
        en: "Portrait of Shri Appasaheb Dhulaj",
      },
    },
  },
  {
    key: "vijay-joshi",
    name: { mr: "श्री. विजय जोशी", en: "Shri Vijay Joshi" },
    designation: {
      mr: "व्यवस्थापकीय संचालक, अमृत",
      en: "Managing Director, AMRUT",
    },
    quote: {
      mr: "अमृत म्हणजे महाराष्ट्र संशोधन उन्नती व प्रशिक्षण प्रबोधिनी. महाराष्ट्र शासनाने आम्हाला दिलेल्या अनेक जबाबदाऱ्यांमधील एक महत्त्वाची जबाबदारी म्हणजे महाराष्ट्रभर पसरलेल्या अमृतच्या प्रतिनिधींमार्फत समाजातील घटकांचा अभ्यास करत राष्ट्रीयत्व आणि बंधुभाव सुरक्षित राहील अशा अभिनव संकल्पनांची अंमलबजावणी करणे. आपापसातील विषमता दूर करून ज्या एका नावाने उभा महाराष्ट्र एकत्र होतो ते नाव म्हणजे शिवछत्रपती. त्यांच्या गडदुर्गांना महाराष्ट्र शासनाच्या अथक प्रयत्नातून नुकतेच युनेस्कोच्या जागतिक वारसाच्या वास्तू अशी मान्यता प्राप्त झाली. सबंध महाराष्ट्रासाठी ही अतिशय अभिमानाची अशी बाब आहे. मग याच दुर्गांना मानवंदना देण्यासाठी संपूर्ण महाराष्ट्र एकत्र व्हावा या भावनेने योजलेला एक लोकोत्सव म्हणजेच दुर्गोत्सव. शिवरायांवर प्रेम असलेल्या साऱ्यांनीच या मोहिमेचा भाग बनत या गडदुर्गांच्या प्रतिकृती बनवाव्यात आणि या मोहिमेत सक्रिय सहभाग नोंदवत एक विश्वविक्रम प्रस्थापित करण्यासाठी एकत्र यावं असं मी अमृतच्या वतीने आवाहन करतो.",
      en: "AMRUT is the Maharashtra Research, Upliftment and Training Prabodhini. Among the many responsibilities entrusted to us by the Government of Maharashtra, one of the most important is to study the different sections of society through AMRUT’s representatives across the state, and to implement original ideas that keep our sense of nationhood and fraternity intact. Setting aside the differences between us, the one name under which the whole of Maharashtra comes together is Shivchhatrapati. Through the Government of Maharashtra’s sustained efforts, his forts have just been recognised by UNESCO as World Heritage monuments. For all of Maharashtra this is a matter of great pride. Durgotsav, then, is a people’s festival conceived so that the whole of Maharashtra may come together to salute those very forts. On behalf of AMRUT I appeal to everyone who loves Shivaji Maharaj to become part of this campaign, to build replicas of these forts, and to come together to set a world record.",
    },
    portrait: {
      src: "/media/vijay-joshi.png",
      alt: {
        mr: "श्री. विजय जोशी यांचे छायाचित्र",
        en: "Portrait of Shri Vijay Joshi",
      },
    },
  },
];

export const VOICES_META = {
  eyebrow: { mr: "दुर्गोत्सव — आमचे अनुभव", en: "Durgotsav — in their words" } satisfies LocalizedText,
  heading: {
    mr: "शिवरायांच्या गडदुर्गांना मानवंदना",
    en: "A salute to the forts of Shivaji Maharaj",
  } satisfies LocalizedText,
} as const;
