const fs = require("fs");
const files = fs.readdirSync(".").filter((f) => f.startsWith("chunk_"));
for (const f of files) {
  const s = fs.readFileSync(f, "utf8");
  const re = /(["'`])((?:\\.|(?!\1)[^\\])*)\1/g;
  let m;
  const out = new Set();
  while ((m = re.exec(s))) {
    const v = m[2];
    if (/[ऀ-ॿ]/.test(v) || (/^[A-Z][A-Za-z0-9 ,.'!?:;()&/–—-]{5,160}$/.test(v) && /\s/.test(v)))
      out.add(v);
  }
  console.log("\n########## " + f + " ##########");
  console.log([...out].join("\n"));
  const urls = new Set();
  const ure = /https?:\/\/[^"'`\s\\)]+|\/api\/[^"'`\s\\)]+/g;
  while ((m = ure.exec(s))) urls.add(m[0]);
  console.log("-- urls: " + [...urls].join(" | "));
}

// FAQ / mission: dump bundle context around keywords
const b = fs.readFileSync("ref_bundle.js", "utf8");
for (const kw of ["faq", "FAQ", "प्रश्न"]) {
  let i = -1;
  let n = 0;
  while ((i = b.indexOf(kw, i + 1)) !== -1 && n < 4) {
    console.log("\n>>>>> context for " + kw + " @" + i + "\n" + b.slice(Math.max(0, i - 300), i + 1200));
    n++;
  }
}
