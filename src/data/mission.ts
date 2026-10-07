import type { LocalizedList, LocalizedText } from "@/lib/i18n";

/**
 * "मोहिमेचे उद्दीष्ट" — the long-form mission essay, reproduced from the
 * /mission page of amrutdurgotsav.com and set as an editorial article.
 */

export const MISSION = {
  eyebrow: { mr: "मोहिमेचे उद्दीष्ट", en: "The Mission" } satisfies LocalizedText,
  heading: {
    mr: "आपली संस्कृती, आपली परंपरा, आपला दुर्गोत्सव",
    en: "Our culture, our tradition, our Durgotsav",
  } satisfies LocalizedText,

  /** Paragraphs before the list of fading customs. */
  opening: {
    mr: [
      "आपली संस्कृती ही पृथ्वीच्या पाठीवर ज्ञात असलेल्या सगळ्यात जुन्या संस्कृतींपैकी एक आहे. हिचे जतन व्हावे यासाठी अनेक महापुरुषांनी मोठे लढे उभारले. वर्षानुवर्षे परंपरागत चालत आलेल्या रुढींचे मनापासून पालन करत आपल्या राष्ट्राच्या सर्वसामान्य रयतेनेही आपापल्या परीने यामध्ये मोलाचे योगदान दिले.",
      "हल्ली आधुनिकतेच्या नावाखाली होणाऱ्या बदलांमुळे, अगदी विज्ञाननिष्ठ असलेल्या आपल्या संस्कृतीतील अनेक रुढी विरून जाण्याच्या मार्गावर आहेत. उदाहरणार्थ:",
    ],
    en: [
      "Ours is among the oldest known cultures on earth. Many great figures have fought hard battles to see it preserved. Year after year, by keeping faith with inherited custom, the ordinary people of this country have made their own valuable contribution to that preservation.",
      "Today, under changes made in the name of modernity, many customs of our culture — customs that are entirely sound in scientific terms — are on the verge of disappearing. For instance:",
    ],
  } satisfies LocalizedList,

  fadingCustoms: {
    mr: [
      "पाणी पितळेच्या भांड्यातून पिण्याची प्रथा",
      "घराबाहेरच हातपाय धुण्याची व्यवस्था",
      "कडुलिंबांच्या काडीने दात घासणे",
      "आरोग्यवर्धक तुळशी वृंदावन दारात असण्याची प्रथा",
    ],
    en: [
      "Drinking water from brass vessels",
      "Washing hands and feet before entering the house",
      "Cleaning the teeth with a neem twig",
      "Keeping a health-giving tulsi vrindavan at the door",
    ],
  } satisfies LocalizedList,

  /** Paragraphs after the list. */
  body: {
    mr: [
      "अनेक प्रथा काळाच्या ओघात अव्यवहार्य ठरत विलोप पावत चाललेल्या आहेत.",
      "आपण सगळ्यांनीच नुकताच कोरोनाच्या महामारीला मोठ्या धैर्याने तोंड दिले. संसर्गाच्या काळजीने त्या काळात अनेक गोष्टी कमी झाल्या आणि त्यातील एक महत्त्वाची आणि अभूतपूर्व अशी गोष्ट कमी झाली ती म्हणजे दिवाळीच्या उत्सवामध्येच आबालवृद्धांनी एकत्र येऊन शिवछत्रपतींच्या पराक्रमाचे साक्षीदार असलेल्या दुर्गांच्या प्रतिकृती उभारण्याची.",
      "तीन शतकांपूर्वीचा असा युगपुरुष – शिवछत्रपती – ज्याने आपल्या संख्येने कमी असलेल्या सैन्याला हाताशी घेऊन सह्याद्रीच्या डोंगराळ भागाचा एका कुशल सेनापतीप्रमाणे उपयोग केला आणि म्हणून त्यासाठी दुर्ग उभारले.",
      "या साऱ्याची आठवण म्हणून आणि त्या राजाला व त्याने बांधलेल्या स्थापत्यकृतींना मानवंदना म्हणून, कोणीही न सांगता महाराष्ट्रातील गावखेड्यांपासून ते मोठ्या शहरांतील गृहसंकुलांमध्ये दिवाळीत दुर्गांच्या प्रतिकृती बांधणे ही अतिशय अफलातून प्रथा रूढ झाली आहे — अशी परंपरा जगात दुसरीकडे कुठेही पाहायला मिळत नाही.",
      "प्रशासकीय पातळीवरून शिवछत्रपतींवरील प्रेम व आदर व्यक्त करण्यासाठी – महत्त्वाच्या रस्त्यांना त्यांचे नाव देणे, सार्वजनिक स्थानकांना त्यांचे नाव देणे, त्यांच्या उद्यानांत मूर्ती उभारणे – या साऱ्या गोष्टी होताना आपण पाहतो.",
      "पण अगदी जनसामान्यांमधून देखील तेच प्रेम, तोच आदर व्यक्त केला जातो तो या प्रथेमधून!",
    ],
    en: [
      "Many practices, found impractical with the passage of time, are quietly dying out.",
      "We have all recently faced the Covid pandemic with great courage. Fear of infection reduced a great many things in those years, and one of the most significant of them was the gathering of young and old at Diwali to raise replicas of the forts that witnessed the valour of Chhatrapati Shivaji Maharaj.",
      "Three centuries ago this remarkable figure — Shivchhatrapati — took an army small in number, used the hill country of the Sahyadri as only a skilled commander could, and raised forts for that very purpose.",
      "In memory of all this, and as a salute to that king and to the structures he built, a quite extraordinary practice took root without anyone instructing it — from the villages of Maharashtra to the housing societies of its largest cities, people build replicas of the forts at Diwali. Nowhere else in the world will you find such a tradition.",
      "At an administrative level we see love and respect for Shivchhatrapati expressed in many ways — naming major roads after him, naming public stations after him, raising statues in his gardens.",
      "But the very same love, the very same respect, is expressed by ordinary people themselves — through this practice.",
    ],
  } satisfies LocalizedList,

  closing: {
    mr: "मग यंदा आम्ही अमृतच्या वतीने याच अभूतपूर्व अशा प्रथेला प्रोत्साहन देण्यासाठी आयोजित करत आहोत दुर्गोत्सव २०२५. सदर लेखाद्वारे आम्ही आपल्या जास्तीत जास्त सहभागाची विनंती करतो.",
    en: "And so this year, on behalf of AMRUT, we are organising Durgotsav 2025 to encourage this extraordinary practice. Through this piece we request your fullest participation.",
  } satisfies LocalizedText,
} as const;
