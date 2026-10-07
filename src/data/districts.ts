import type { LocalizedText } from "@/lib/i18n";

/**
 * Districts used as the gallery filter, matching the filter list on the
 * source site exactly (including Ramtek, which the source site lists
 * alongside the districts).
 */

export type District = {
  /** The value sent to the gallery API — the Marathi name, as the API expects. */
  id: string;
  label: LocalizedText;
};

export const DISTRICTS: readonly District[] = [
  { id: "अहिल्यानगर", label: { mr: "अहिल्यानगर", en: "Ahilyanagar" } },
  { id: "अकोला", label: { mr: "अकोला", en: "Akola" } },
  { id: "अमरावती", label: { mr: "अमरावती", en: "Amravati" } },
  { id: "छत्रपती संभाजीनगर", label: { mr: "छत्रपती संभाजीनगर", en: "Chhatrapati Sambhajinagar" } },
  { id: "बीड", label: { mr: "बीड", en: "Beed" } },
  { id: "भंडारा", label: { mr: "भंडारा", en: "Bhandara" } },
  { id: "बुलढाणा", label: { mr: "बुलढाणा", en: "Buldhana" } },
  { id: "चंद्रपूर", label: { mr: "चंद्रपूर", en: "Chandrapur" } },
  { id: "धुळे", label: { mr: "धुळे", en: "Dhule" } },
  { id: "गडचिरोली", label: { mr: "गडचिरोली", en: "Gadchiroli" } },
  { id: "गोंदिया", label: { mr: "गोंदिया", en: "Gondia" } },
  { id: "जालना", label: { mr: "जालना", en: "Jalna" } },
  { id: "जळगाव", label: { mr: "जळगाव", en: "Jalgaon" } },
  { id: "कोल्हापूर", label: { mr: "कोल्हापूर", en: "Kolhapur" } },
  { id: "लातूर", label: { mr: "लातूर", en: "Latur" } },
  { id: "मुंबई शहर", label: { mr: "मुंबई शहर", en: "Mumbai City" } },
  { id: "मुंबई उपनगर", label: { mr: "मुंबई उपनगर", en: "Mumbai Suburban" } },
  { id: "नागपूर", label: { mr: "नागपूर", en: "Nagpur" } },
  { id: "नांदेड", label: { mr: "नांदेड", en: "Nanded" } },
  { id: "नंदुरबार", label: { mr: "नंदुरबार", en: "Nandurbar" } },
  { id: "नाशिक", label: { mr: "नाशिक", en: "Nashik" } },
  { id: "धाराशिव", label: { mr: "धाराशिव", en: "Dharashiv" } },
  { id: "पालघर", label: { mr: "पालघर", en: "Palghar" } },
  { id: "परभणी", label: { mr: "परभणी", en: "Parbhani" } },
  { id: "पुणे", label: { mr: "पुणे", en: "Pune" } },
  { id: "रायगड", label: { mr: "रायगड", en: "Raigad" } },
  { id: "रामटेक", label: { mr: "रामटेक", en: "Ramtek" } },
  { id: "रत्नागिरी", label: { mr: "रत्नागिरी", en: "Ratnagiri" } },
  { id: "सांगली", label: { mr: "सांगली", en: "Sangli" } },
  { id: "सातारा", label: { mr: "सातारा", en: "Satara" } },
  { id: "सिंधुदुर्ग", label: { mr: "सिंधुदुर्ग", en: "Sindhudurg" } },
  { id: "सोलापूर", label: { mr: "सोलापूर", en: "Solapur" } },
  { id: "ठाणे", label: { mr: "ठाणे", en: "Thane" } },
  { id: "वर्धा", label: { mr: "वर्धा", en: "Wardha" } },
  { id: "वाशिम", label: { mr: "वाशिम", en: "Washim" } },
  { id: "यवतमाळ", label: { mr: "यवतमाळ", en: "Yavatmal" } },
];

/** Sentinel for "no district filter". */
export const ALL_DISTRICTS = "सर्व";
