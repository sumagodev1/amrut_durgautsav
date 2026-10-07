const fs = require("fs");
const s = fs.readFileSync("ref_bundle.js", "utf8");
const re = /(["'`])((?:\\.|(?!\1)[^\\])*)\1/g;
let m;
const out = new Set();
while ((m = re.exec(s))) {
  const v = m[2];
  if (/[ऀ-ॿ]/.test(v) && v.length > 1) out.add(v);
}
fs.writeFileSync("ref_marathi.txt", [...out].join("\n"), "utf8");
console.log("devanagari literals:", out.size);

// also pull image/asset paths
const paths = new Set();
const pre = /["'`]([^"'`\s]*\.(?:png|jpe?g|webp|svg|mp4|avif|pdf))["'`]/gi;
while ((m = pre.exec(s))) paths.add(m[1]);
fs.writeFileSync("ref_assets.txt", [...paths].join("\n"), "utf8");
console.log("asset paths:", paths.size);

// pull URLs
const urls = new Set();
const ure = /https?:\/\/[^"'`\s\\)]+/g;
while ((m = ure.exec(s))) urls.add(m[0]);
fs.writeFileSync("ref_urls.txt", [...urls].join("\n"), "utf8");
console.log("urls:", urls.size);
