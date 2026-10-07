const fs = require("fs");
const s = fs.readFileSync("ref_bundle.js", "utf8");

function show(label, re, pick = 0) {
  const out = new Set();
  let m;
  const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
  while ((m = r.exec(s))) out.add(m[pick]);
  console.log("\n===== " + label + " (" + out.size + ") =====");
  console.log([...out].join("\n"));
}

show("ROUTE PATHS", /path:\s*["'`]([^"'`]*)["'`]/, 1);
show("TO= LINKS", /\bto:\s*["'`]([^"'`]*)["'`]/, 1);
show("EMAILS", /[\w.+-]+@[\w-]+\.[\w.]+/);
show("PHONES", /(?:\+91[\s-]?)?\b\d{10}\b/);
show("HREFS", /href:\s*["'`]([^"'`]*)["'`]/, 1);
show("CHUNKS", /["'`]([^"'`]*assets\/[^"'`]*\.js)["'`]/, 1);

// English-ish longer literals (likely labels/alt)
const re = /(["'`])((?:\\.|(?!\1)[^\\])*)\1/g;
let m;
const en = new Set();
while ((m = re.exec(s))) {
  const v = m[2];
  if (
    /^[A-Z][A-Za-z0-9 ,.'"!?:;()&/–—-]{6,160}$/.test(v) &&
    /\s/.test(v) &&
    !/function|return|undefined|React|Error|Invalid|Cannot|Expected|Minified|Warning|Each child|props|element/i.test(v)
  )
    en.add(v);
}
console.log("\n===== ENGLISH LITERALS (" + en.size + ") =====");
console.log([...en].join("\n"));
