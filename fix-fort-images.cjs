const fs = require("fs");

/**
 * Attach the fort photographs to the fort data.
 * Alt text describes what is actually in each frame.
 */
const IMAGES = {
  salher: {
    src: "/fort/salher.jpg",
    mr: "साल्हेर किल्ल्याचा सह्याद्रीतील सर्वोच्च माथा",
    en: "The summit of Salher, the highest fort in the Sahyadri range",
  },
  shivneri: {
    src: "/fort/shivneri.jpg",
    mr: "शिवनेरी किल्ल्याचा दगडी कमानीचा दरवाजा आणि पायऱ्या",
    en: "A stone arched gateway and steps at Shivneri Fort",
  },
  lohagad: {
    src: "/fort/lohgadh.jpg",
    mr: "लोहगड किल्ल्याची तटबंदी आणि डोंगरउतार",
    en: "The ramparts of Lohagad Fort along the hillside",
  },
  khanderi: {
    src: "/fort/khanderi.jpg",
    mr: "अरबी समुद्रातील खांदेरी बेटावरील किल्ला",
    en: "The island fort of Khanderi in the Arabian Sea",
  },
  raigad: {
    src: "/fort/raigadh.jpg",
    mr: "रायगड किल्ला — स्वराज्याची राजधानी",
    en: "Raigad Fort, capital of the Maratha state",
  },
  rajgad: {
    src: "/fort/rajgad-fort.png",
    mr: "पावसाळ्यातील राजगड किल्ल्याची संजीवनी माची आणि सह्याद्रीच्या हिरव्या डोंगररांगा",
    en: "The Sanjeevani Machi ridge of Rajgad Fort running into the green Sahyadri hills in the monsoon",
  },
  pratapgad: {
    src: "/fort/pratapgadh.jpg",
    mr: "दाट जंगलाने वेढलेला प्रतापगड किल्ला",
    en: "Pratapgad Fort, ringed by dense forest",
  },
  suvarnadurg: {
    src: "/fort/suvarnadurg.jpg",
    mr: "हर्णैजवळील सुवर्णदुर्ग हा बेटावरील जलदुर्ग",
    en: "Suvarnadurg, the island sea fort off Harnai",
  },
  panhala: {
    src: "/fort/panhala.jpg",
    mr: "पन्हाळा किल्ल्यावरील वास्तू आणि विस्तीर्ण पठार",
    en: "Structures on the broad plateau of Panhala Fort",
  },
  vijaydurg: {
    src: "/fort/vijaydurg.jpg",
    mr: "विजयदुर्ग किल्ल्याची तिहेरी तटबंदी आणि बुरुज",
    en: "The triple ramparts and bastions of Vijaydurg Fort",
  },
  sindhudurg: {
    src: "/fort/sindhudurg.jpg",
    mr: "मालवणजवळील खडकाळ बेटावरील सिंधुदुर्ग किल्ल्याची वळणदार तटबंदी",
    en: "The curved sea-facing ramparts of Sindhudurg Fort on its rocky islet off Malvan",
  },
  gingee: {
    src: "/fort/jinji.jpg",
    mr: "तामिळनाडूतील जिंजी किल्ला तीन टेकड्यांवर पसरलेला",
    en: "Gingee Fort in Tamil Nadu, spread across three hills",
  },
};

const path = "src/data/forts.ts";
let s = fs.readFileSync(path, "utf8");

// Drop the existing Rajgad image block; every fort gets one below.
s = s.replace(
  /\n    image: \{\n      src: "\/media\/rajgad-fort\.png",[\s\S]*?\n    \},\n(  \},)/,
  "\n$1",
);

let added = 0;
for (const [slug, img] of Object.entries(IMAGES)) {
  // Find this fort's object and insert the image before its closing brace,
  // anchored on the `coords` line which every entry ends with.
  const re = new RegExp(
    `(slug: "${slug}",[\\s\\S]*?coords: \\{ lat: [-\\d.]+, lng: [-\\d.]+ \\},)\\n`,
  );
  if (!re.test(s)) {
    console.log("MISS", slug);
    continue;
  }
  s = s.replace(
    re,
    `$1
    image: {
      src: "${img.src}",
      alt: {
        mr: "${img.mr}",
        en: "${img.en}",
      },
    },
`,
  );
  added++;
}

// The data comment no longer matches reality: we now hold a photograph of
// every fort.
s = s.replace(
  ` * \`image\` is populated only where we hold a real photograph. Forts without
 * one are rendered with the typographic + silhouette treatment rather than a
 * stand-in photo, so nothing on the page misrepresents a place.`,
  ` * Every fort carries its own photograph. The \`image\` field stays optional
 * so the silhouette fallback remains available if a photo is ever withdrawn —
 * we would rather show a drawing of the site type than a stand-in photo of
 * somewhere else.`,
);

fs.writeFileSync(path, s);
console.log(`images attached: ${added}/12`);
