import type { LocalizedText } from "@/lib/i18n";

/**
 * The twelve forts inscribed by UNESCO as the "Maratha Military Landscapes of
 * India" (47th session of the World Heritage Committee, 11 July 2025).
 *
 * The source site refers to these twelve forts throughout but does not list
 * them. The list, the site typology and the district attributions below are
 * taken from the inscription itself — they are not invented, and each
 * description is limited to long-established, documented history.
 *
 * Every fort carries its own photograph. The `image` field stays optional
 * so the silhouette fallback remains available if a photo is ever withdrawn —
 * we would rather show a drawing of the site type than a stand-in photo of
 * somewhere else.
 */

export type FortTypology =
  | "hill"
  | "hill-forest"
  | "hill-plateau"
  | "coastal"
  | "island";

export type Fort = {
  slug: string;
  /** Order follows the UNESCO nomination dossier. */
  index: number;
  name: LocalizedText;
  district: LocalizedText;
  state: LocalizedText;
  typology: FortTypology;
  /** One line, used on cards and in the index. */
  summary: LocalizedText;
  /** Two or three sentences, used on the detail page. */
  description: LocalizedText;
  /** Documented, dateable facts. Rendered as a definition list. */
  facts: readonly { label: LocalizedText; value: LocalizedText }[];
  /** Decimal degrees, used for the schema.org Place and the locator. */
  coords: { lat: number; lng: number };
  image?: { src: string; alt: LocalizedText; credit?: string };
};

export const TYPOLOGY_LABEL: Record<FortTypology, LocalizedText> = {
  hill: { mr: "गिरिदुर्ग", en: "Hill fort" },
  "hill-forest": { mr: "गिरी-वनदुर्ग", en: "Hill-forest fort" },
  "hill-plateau": { mr: "गिरी-पठार दुर्ग", en: "Hill-plateau fort" },
  coastal: { mr: "सागरी दुर्ग", en: "Coastal fort" },
  island: { mr: "जलदुर्ग", en: "Island fort" },
};

const MAHARASHTRA: LocalizedText = { mr: "महाराष्ट्र", en: "Maharashtra" };
const TAMIL_NADU: LocalizedText = { mr: "तामिळनाडू", en: "Tamil Nadu" };

export const FORTS: readonly Fort[] = [
  {
    slug: "salher",
    index: 1,
    name: { mr: "साल्हेर", en: "Salher" },
    district: { mr: "नाशिक", en: "Nashik" },
    state: MAHARASHTRA,
    typology: "hill",
    summary: {
      mr: "सह्याद्रीतील सर्वोच्च किल्ला आणि १६७२ च्या निर्णायक लढाईचे ठिकाण.",
      en: "The highest fort in the Sahyadri, and the site of the decisive battle of 1672.",
    },
    description: {
      mr: "साल्हेर हा सह्याद्री पर्वतरांगेतील सर्वांत उंच किल्ला आहे. १६७२ साली येथे झालेली साल्हेरची लढाई ही मराठ्यांनी मुघल सैन्याविरुद्ध मोकळ्या मैदानात जिंकलेली पहिली मोठी लढाई मानली जाते. बागलाण प्रांतातील व्यापारी मार्गांवर या किल्ल्याचे नियंत्रण होते.",
      en: "Salher is the highest fort in the Sahyadri range. The Battle of Salher, fought here in 1672, is regarded as the first major pitched battle the Marathas won against Mughal forces in open field. The fort commanded the trade routes through the Baglan region.",
    },
    facts: [
      {
        label: { mr: "उंची", en: "Elevation" },
        value: { mr: "सुमारे १,५६७ मीटर", en: "approx. 1,567 m" },
      },
      {
        label: { mr: "निर्णायक घटना", en: "Decisive event" },
        value: { mr: "साल्हेरची लढाई, १६७२", en: "Battle of Salher, 1672" },
      },
    ],
    coords: { lat: 20.7369, lng: 73.9411 },
    image: {
      src: "/fort/salher.jpg",
      alt: {
        mr: "साल्हेर किल्ल्याचा सह्याद्रीतील सर्वोच्च माथा",
        en: "The summit of Salher, the highest fort in the Sahyadri range",
      },
    },
  },
  {
    slug: "shivneri",
    index: 2,
    name: { mr: "शिवनेरी", en: "Shivneri" },
    district: { mr: "पुणे", en: "Pune" },
    state: MAHARASHTRA,
    typology: "hill",
    summary: {
      mr: "छत्रपती शिवाजी महाराजांचे जन्मस्थान.",
      en: "The birthplace of Chhatrapati Shivaji Maharaj.",
    },
    description: {
      mr: "जुन्नरजवळील शिवनेरी किल्ल्यावर १६३० साली छत्रपती शिवाजी महाराजांचा जन्म झाला. किल्ल्यावरील शिवाई देवीच्या मंदिरावरून त्यांचे नाव ठेवले गेले अशी परंपरा सांगते. सात दरवाजांची साखळी आणि खडकात कोरलेली पाण्याची टाकी ही या किल्ल्याची वैशिष्ट्ये आहेत.",
      en: "Shivneri, near Junnar, is where Chhatrapati Shivaji Maharaj was born in 1630. Tradition holds that he was named after Shivai Devi, whose temple stands on the fort. Its defining features are a sequence of seven gateways and rock-cut water cisterns.",
    },
    facts: [
      {
        label: { mr: "जन्मवर्ष", en: "Birth year" },
        value: { mr: "१६३०", en: "1630" },
      },
      {
        label: { mr: "प्रवेशद्वारे", en: "Gateways" },
        value: { mr: "सात", en: "Seven" },
      },
    ],
    coords: { lat: 19.1972, lng: 73.8578 },
    image: {
      src: "/fort/shivneri.jpg",
      alt: {
        mr: "शिवनेरी किल्ल्याचा दगडी कमानीचा दरवाजा आणि पायऱ्या",
        en: "A stone arched gateway and steps at Shivneri Fort",
      },
    },
  },
  {
    slug: "lohagad",
    index: 3,
    name: { mr: "लोहगड", en: "Lohagad" },
    district: { mr: "पुणे", en: "Pune" },
    state: MAHARASHTRA,
    typology: "hill",
    summary: {
      mr: "विंचूकाट्याच्या अरुंद सोंडेसाठी ओळखला जाणारा बळकट गिरिदुर्ग.",
      en: "A formidable hill fort, known for the narrow spur called Vinchu Kata.",
    },
    description: {
      mr: "लोणावळ्याजवळील लोहगड हा चार भक्कम दरवाजांच्या साखळीने संरक्षित केलेला किल्ला आहे. उत्तरेकडे पसरलेली अरुंद डोंगरसोंड विंचवाच्या नांगीसारखी दिसते म्हणून तिला ‘विंचूकाटा’ म्हणतात. भोर घाटातील प्राचीन व्यापारी मार्गावर या किल्ल्याचे नियंत्रण होते.",
      en: "Lohagad, near Lonavala, is defended by a sequence of four substantial gateways. A narrow ridge running north from the fort resembles a scorpion’s tail, which gives it the name Vinchu Kata. The fort commanded the ancient trade route through the Bhor Ghat.",
    },
    facts: [
      {
        label: { mr: "दरवाजे", en: "Gateways" },
        value: { mr: "चार", en: "Four" },
      },
      {
        label: { mr: "वैशिष्ट्य", en: "Feature" },
        value: { mr: "विंचूकाटा सोंड", en: "The Vinchu Kata spur" },
      },
    ],
    coords: { lat: 18.7089, lng: 73.4756 },
    image: {
      src: "/fort/lohgadh.jpg",
      alt: {
        mr: "लोहगड किल्ल्याची तटबंदी आणि डोंगरउतार",
        en: "The ramparts of Lohagad Fort along the hillside",
      },
    },
  },
  {
    slug: "khanderi",
    index: 4,
    name: { mr: "खांदेरी", en: "Khanderi" },
    district: { mr: "रायगड", en: "Raigad" },
    state: MAHARASHTRA,
    typology: "island",
    summary: {
      mr: "अलिबागजवळ १६७९ मध्ये उभारलेला बेटावरील जलदुर्ग.",
      en: "An island fort raised off Alibaug in 1679.",
    },
    description: {
      mr: "मुंबईच्या दक्षिणेकडील सागरी मार्गावर नियंत्रण ठेवण्यासाठी १६७९ साली खांदेरी बेटावर किल्ला बांधण्यात आला. बांधकामाच्या काळातच इंग्रज आणि सिद्दी यांच्याकडून त्याला विरोध झाला. मराठा आरमाराच्या रचनेतील हा एक महत्त्वाचा टप्पा मानला जातो.",
      en: "Khanderi was fortified in 1679 to control the sea lanes south of Bombay. Its construction was contested by both the English and the Siddis while the works were still under way. It marks an important stage in the design of the Maratha navy’s coastal defences.",
    },
    facts: [
      {
        label: { mr: "बांधणी", en: "Fortified" },
        value: { mr: "१६७९", en: "1679" },
      },
      {
        label: { mr: "प्रकार", en: "Setting" },
        value: { mr: "अरबी समुद्रातील बेट", en: "Island in the Arabian Sea" },
      },
    ],
    coords: { lat: 18.7117, lng: 72.8161 },
    image: {
      src: "/fort/khanderi.jpg",
      alt: {
        mr: "अरबी समुद्रातील खांदेरी बेटावरील किल्ला",
        en: "The island fort of Khanderi in the Arabian Sea",
      },
    },
  },
  {
    slug: "raigad",
    index: 5,
    name: { mr: "रायगड", en: "Raigad" },
    district: { mr: "रायगड", en: "Raigad" },
    state: MAHARASHTRA,
    typology: "hill",
    summary: {
      mr: "स्वराज्याची राजधानी आणि १६७४ च्या राज्याभिषेकाचे स्थान.",
      en: "The capital of the Maratha state and the site of the 1674 coronation.",
    },
    description: {
      mr: "१६७४ साली याच किल्ल्यावर छत्रपती शिवाजी महाराजांचा राज्याभिषेक झाला आणि रायगड स्वराज्याची राजधानी बनली. महादरवाजा, होळीचा माळ, बाजारपेठ आणि राजसभा ही येथील प्रमुख स्थळे आहेत. महाराजांची समाधीही याच किल्ल्यावर आहे.",
      en: "Chhatrapati Shivaji Maharaj was crowned here in 1674, and Raigad became the capital of the Maratha state. The Maha Darwaja, the Holicha Maal, the market street and the royal court are among its principal structures. His samadhi also stands on this fort.",
    },
    facts: [
      {
        label: { mr: "राज्याभिषेक", en: "Coronation" },
        value: { mr: "१६७४", en: "1674" },
      },
      {
        label: { mr: "भूमिका", en: "Role" },
        value: { mr: "स्वराज्याची राजधानी", en: "Capital of the Maratha state" },
      },
    ],
    coords: { lat: 18.2341, lng: 73.4406 },
    image: {
      src: "/fort/raigadh.jpg",
      alt: {
        mr: "रायगड किल्ल्याचे दगडी प्रवेशद्वार आणि घुमटाकार छत्र्या",
        en: "The stone gateway and domed chhatris of Raigad Fort",
      },
    },
  },
  {
    slug: "rajgad",
    index: 6,
    name: { mr: "राजगड", en: "Rajgad" },
    district: { mr: "पुणे", en: "Pune" },
    state: MAHARASHTRA,
    typology: "hill",
    summary: {
      mr: "रायगडाआधी सुमारे पंचवीस वर्षे स्वराज्याची राजधानी.",
      en: "Capital of the Maratha state for some twenty-five years before Raigad.",
    },
    description: {
      mr: "राजगड हा रायगडापूर्वी जवळपास पंचवीस वर्षे स्वराज्याची राजधानी होता. बालेकिल्ला आणि पद्मावती, सुवेळा व संजीवनी या तीन माच्या अशी याची विस्तीर्ण रचना आहे. संजीवनी माचीची दुहेरी तटबंदी ही मराठा स्थापत्यशास्त्रातील उल्लेखनीय रचना मानली जाते.",
      en: "Rajgad served as the capital of the Maratha state for roughly twenty-five years before Raigad. Its vast plan comprises the Balekilla citadel and three machis — Padmavati, Suvela and Sanjeevani. The double-walled rampart of Sanjeevani Machi is considered a remarkable work of Maratha military architecture.",
    },
    facts: [
      {
        label: { mr: "माच्या", en: "Machis" },
        value: { mr: "पद्मावती, सुवेळा, संजीवनी", en: "Padmavati, Suvela, Sanjeevani" },
      },
      {
        label: { mr: "भूमिका", en: "Role" },
        value: { mr: "पहिली राजधानी", en: "The first capital" },
      },
    ],
    coords: { lat: 18.2464, lng: 73.6819 },
    image: {
      src: "/fort/rajgad-fort.png",
      alt: {
        mr: "पावसाळ्यातील राजगड किल्ल्याची संजीवनी माची आणि सह्याद्रीच्या हिरव्या डोंगररांगा",
        en: "The Sanjeevani Machi ridge of Rajgad Fort running into the green Sahyadri hills in the monsoon",
      },
    },
  },
  {
    slug: "pratapgad",
    index: 7,
    name: { mr: "प्रतापगड", en: "Pratapgad" },
    district: { mr: "सातारा", en: "Satara" },
    state: MAHARASHTRA,
    typology: "hill-forest",
    summary: {
      mr: "१६५९ च्या अफझलखान भेटीचे ठिकाण.",
      en: "The site of the 1659 encounter with Afzal Khan.",
    },
    description: {
      mr: "१६५९ साली प्रतापगडाच्या पायथ्याशी छत्रपती शिवाजी महाराज आणि अफझलखान यांची भेट झाली आणि तिचे पर्यवसान अफझलखानाच्या वधात झाले. दाट जंगलाने वेढलेला हा किल्ला वरच्या आणि खालच्या अशा दोन भागांत विभागलेला आहे. किल्ल्यावर भवानी मातेचे मंदिर आहे.",
      en: "In 1659 Chhatrapati Shivaji Maharaj met Afzal Khan at the foot of Pratapgad, an encounter that ended in Afzal Khan’s death. Surrounded by dense forest, the fort is built on two levels, upper and lower. A temple of Bhavani Mata stands within it.",
    },
    facts: [
      {
        label: { mr: "घटना", en: "Event" },
        value: { mr: "अफझलखान भेट, १६५९", en: "The Afzal Khan encounter, 1659" },
      },
      {
        label: { mr: "रचना", en: "Plan" },
        value: { mr: "वरचा व खालचा किल्ला", en: "Upper and lower fort" },
      },
    ],
    coords: { lat: 17.9361, lng: 73.5797 },
    image: {
      src: "/fort/pratapgadh.jpg",
      alt: {
        mr: "दाट जंगलाने वेढलेला प्रतापगड किल्ला",
        en: "Pratapgad Fort, ringed by dense forest",
      },
    },
  },
  {
    slug: "suvarnadurg",
    index: 8,
    name: { mr: "सुवर्णदुर्ग", en: "Suvarnadurg" },
    district: { mr: "रत्नागिरी", en: "Ratnagiri" },
    state: MAHARASHTRA,
    typology: "island",
    summary: {
      mr: "हर्णैजवळील बेटावरील किल्ला व मराठा आरमाराचा तळ.",
      en: "An island fort off Harnai and a base of the Maratha navy.",
    },
    description: {
      mr: "हर्णै बंदराजवळील सुवर्णदुर्ग हा बेटावरील किल्ला मराठा आरमाराचा एक महत्त्वाचा तळ होता. किनाऱ्यावरील कनकदुर्ग, फत्तेदुर्ग आणि गोवा किल्ला यांच्यासह याची संरक्षणव्यवस्था रचली गेली होती. येथे जहाजबांधणीही चालत असे.",
      en: "Suvarnadurg, an island fort near Harnai harbour, was an important base of the Maratha navy. Its defences were planned together with the shore forts of Kanakdurg, Fattedurg and Goa Fort. Shipbuilding was also carried out here.",
    },
    facts: [
      {
        label: { mr: "भूमिका", en: "Role" },
        value: { mr: "आरमारी तळ व जहाजबांधणी", en: "Naval base and shipyard" },
      },
      {
        label: { mr: "सोबतचे किल्ले", en: "Paired forts" },
        value: { mr: "कनकदुर्ग, फत्तेदुर्ग, गोवा किल्ला", en: "Kanakdurg, Fattedurg, Goa Fort" },
      },
    ],
    coords: { lat: 17.8161, lng: 73.0894 },
    image: {
      src: "/fort/suvarnadurg.jpg",
      alt: {
        mr: "हर्णैजवळील सुवर्णदुर्ग हा बेटावरील जलदुर्ग",
        en: "Suvarnadurg, the island sea fort off Harnai",
      },
    },
  },
  {
    slug: "panhala",
    index: 9,
    name: { mr: "पन्हाळा", en: "Panhala" },
    district: { mr: "कोल्हापूर", en: "Kolhapur" },
    state: MAHARASHTRA,
    typology: "hill-plateau",
    summary: {
      mr: "दख्खनेतील सर्वांत विस्तीर्ण किल्ला; पावनखिंडीच्या पराक्रमाची सुरुवात येथून.",
      en: "The largest fort in the Deccan; the escape that led to Pawankhind began here.",
    },
    description: {
      mr: "पन्हाळा हा दख्खनेतील सर्वांत विस्तीर्ण किल्ला मानला जातो. १६६० साली सिद्दी जौहरने घातलेल्या वेढ्यातून छत्रपती शिवाजी महाराज विशाळगडाकडे निसटले; या वाटचालीतच पावनखिंडीची लढाई झाली. अंबरखाना ही धान्यकोठारांची रचना आणि अंधारबाव ही विहीर येथील उल्लेखनीय वास्तू आहेत.",
      en: "Panhala is regarded as the largest fort in the Deccan. In 1660 Chhatrapati Shivaji Maharaj slipped out of Siddi Johar’s siege and made for Vishalgad; it was on that march that the battle of Pawankhind was fought. The Ambarkhana granaries and the Andhar Bav stepwell are among its notable structures.",
    },
    facts: [
      {
        label: { mr: "वेढा", en: "Siege" },
        value: { mr: "सिद्दी जौहर, १६६०", en: "Siddi Johar, 1660" },
      },
      {
        label: { mr: "वास्तू", en: "Structures" },
        value: { mr: "अंबरखाना, अंधारबाव", en: "Ambarkhana, Andhar Bav" },
      },
    ],
    coords: { lat: 16.8117, lng: 74.1106 },
    image: {
      src: "/fort/panhala.jpg",
      alt: {
        mr: "पन्हाळा किल्ल्यावरील वास्तू आणि विस्तीर्ण पठार",
        en: "Structures on the broad plateau of Panhala Fort",
      },
    },
  },
  {
    slug: "vijaydurg",
    index: 10,
    name: { mr: "विजयदुर्ग", en: "Vijaydurg" },
    district: { mr: "सिंधुदुर्ग", en: "Sindhudurg" },
    state: MAHARASHTRA,
    typology: "coastal",
    summary: {
      mr: "कोकण किनाऱ्यावरील सर्वांत जुन्या किल्ल्यांपैकी एक, तिहेरी तटबंदीचा.",
      en: "One of the oldest forts on the Konkan coast, ringed by three lines of wall.",
    },
    description: {
      mr: "वाघोटन खाडीच्या मुखावरील विजयदुर्ग हा कोकण किनाऱ्यावरील सर्वांत जुन्या किल्ल्यांपैकी एक आहे. तिहेरी तटबंदी आणि अनेक बुरुज ही याची वैशिष्ट्ये आहेत. मराठा आरमाराचा हा एक प्रमुख तळ होता.",
      en: "Vijaydurg, at the mouth of the Vaghotan creek, is one of the oldest forts on the Konkan coast. It is defended by three successive lines of wall and a large number of bastions. It served as a principal base of the Maratha navy.",
    },
    facts: [
      {
        label: { mr: "तटबंदी", en: "Ramparts" },
        value: { mr: "तिहेरी", en: "Three concentric lines" },
      },
      {
        label: { mr: "स्थान", en: "Setting" },
        value: { mr: "वाघोटन खाडीचे मुख", en: "Mouth of the Vaghotan creek" },
      },
    ],
    coords: { lat: 16.5606, lng: 73.3328 },
    image: {
      src: "/fort/vijaydurg.jpg",
      alt: {
        mr: "विजयदुर्ग किल्ल्याची तिहेरी तटबंदी आणि बुरुज",
        en: "The triple ramparts and bastions of Vijaydurg Fort",
      },
    },
  },
  {
    slug: "sindhudurg",
    index: 11,
    name: { mr: "सिंधुदुर्ग", en: "Sindhudurg" },
    district: { mr: "सिंधुदुर्ग", en: "Sindhudurg" },
    state: MAHARASHTRA,
    typology: "island",
    summary: {
      mr: "मालवणजवळ खडकाळ बेटावर उभारलेला प्रसिद्ध जलदुर्ग.",
      en: "The celebrated sea fort raised on a rocky islet off Malvan.",
    },
    description: {
      mr: "मालवणच्या किनाऱ्याजवळील खडकाळ बेटावर १६६४ पासून सिंधुदुर्गाचे बांधकाम सुरू झाले. समुद्राच्या माऱ्याला तोंड देणारी वळणदार तटबंदी हे याचे वैशिष्ट्य आहे. किल्ल्यात छत्रपती शिवाजी महाराजांचे मंदिर आहे.",
      en: "Construction of Sindhudurg began in 1664 on a rocky islet off the Malvan coast. Its curved ramparts, shaped to take the force of the sea, are its defining feature. A temple dedicated to Chhatrapati Shivaji Maharaj stands within the fort.",
    },
    facts: [
      {
        label: { mr: "बांधकाम सुरू", en: "Construction began" },
        value: { mr: "१६६४", en: "1664" },
      },
      {
        label: { mr: "स्थान", en: "Setting" },
        value: { mr: "मालवणजवळील खडकाळ बेट", en: "Rocky islet off Malvan" },
      },
    ],
    coords: { lat: 16.0419, lng: 73.4569 },
    image: {
      src: "/fort/sindhudurg.jpg",
      alt: {
        mr: "मालवणजवळील खडकाळ बेटावरील सिंधुदुर्ग किल्ल्याची वळणदार तटबंदी",
        en: "The curved sea-facing ramparts of Sindhudurg Fort on its rocky islet off Malvan",
      },
    },
  },
  {
    slug: "gingee",
    index: 12,
    name: { mr: "जिंजी", en: "Gingee" },
    district: { mr: "विल्लुपुरम", en: "Villupuram" },
    state: TAMIL_NADU,
    typology: "hill",
    summary: {
      mr: "महाराष्ट्राबाहेरचा एकमेव किल्ला — तीन टेकड्यांवर पसरलेला.",
      en: "The one fort outside Maharashtra — spread across three hills.",
    },
    description: {
      mr: "तामिळनाडूतील जिंजी हा या बारा किल्ल्यांपैकी महाराष्ट्राबाहेरचा एकमेव किल्ला आहे. राजगिरी, कृष्णगिरी आणि चंद्रायनदुर्ग अशा तीन टेकड्यांवर तो पसरलेला असून त्या एकाच तटबंदीने जोडलेल्या आहेत. दक्षिणेतील मराठा सत्तेचे हे एक महत्त्वाचे केंद्र होते.",
      en: "Gingee, in Tamil Nadu, is the only one of the twelve forts outside Maharashtra. It spreads across three hills — Rajagiri, Krishnagiri and Chandrayandurg — linked by a single line of fortification. It was an important centre of Maratha power in the south.",
    },
    facts: [
      {
        label: { mr: "टेकड्या", en: "Hills" },
        value: { mr: "राजगिरी, कृष्णगिरी, चंद्रायनदुर्ग", en: "Rajagiri, Krishnagiri, Chandrayandurg" },
      },
      {
        label: { mr: "राज्य", en: "State" },
        value: { mr: "तामिळनाडू", en: "Tamil Nadu" },
      },
    ],
    coords: { lat: 12.2533, lng: 79.3975 },
    image: {
      src: "/fort/jinji.jpg",
      alt: {
        mr: "तामिळनाडूतील जिंजी किल्ला तीन टेकड्यांवर पसरलेला",
        en: "Gingee Fort in Tamil Nadu, spread across three hills",
      },
    },
  },
];

export function getFort(slug: string): Fort | undefined {
  return FORTS.find((f) => f.slug === slug);
}

/** Neighbouring forts in the dossier order, wrapping around. */
export function getRelatedForts(slug: string, count = 3): Fort[] {
  const i = FORTS.findIndex((f) => f.slug === slug);
  if (i === -1) return FORTS.slice(0, count) as Fort[];
  const out: Fort[] = [];
  for (let n = 1; out.length < count && n < FORTS.length; n++) {
    out.push(FORTS[(i + n) % FORTS.length]);
  }
  return out;
}

export const FORTS_META = {
  eyebrow: { mr: "युनेस्को जागतिक वारसा", en: "UNESCO World Heritage" } satisfies LocalizedText,
  heading: { mr: "बारा दुर्ग", en: "The Twelve Forts" } satisfies LocalizedText,
  lede: {
    mr: "‘मराठा मिलिटरी लँडस्केप्स ऑफ इंडिया’ या नावाने ११ जुलै २०२५ रोजी युनेस्कोच्या जागतिक वारसा यादीत या बारा किल्ल्यांचा समावेश झाला. यांपैकी अकरा महाराष्ट्रात आणि एक तामिळनाडूमध्ये आहे.",
    en: "On 11 July 2025 these twelve forts were inscribed on the UNESCO World Heritage List as the “Maratha Military Landscapes of India”. Eleven stand in Maharashtra and one in Tamil Nadu.",
  } satisfies LocalizedText,
  note: {
    mr: "दुर्गोत्सवात याच बारा दुर्गांच्या प्रतिकृती बनवायच्या आहेत.",
    en: "These are the twelve forts whose replicas are built during Durgotsav.",
  } satisfies LocalizedText,
} as const;
