/* Accessibility + semantics audit. Not part of the app. */
const puppeteer = require("puppeteer-core");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.QA_BASE || "http://localhost:3847";
const PAGES = (process.env.QA_PAGES || "/mr,/en,/mr/forts,/mr/forts/raigad,/mr/mission,/mr/gallery,/mr/participate,/mr/faq,/mr/contact,/mr/record,/mr/voices,/mr/privacy,/mr/album").split(",");

function luminance([r, g, b]) {
  const f = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const issues = [];

  for (const path of PAGES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle2", timeout: 45000 });
    await page.evaluate(() => {
      try {
        sessionStorage.setItem("durgotsav:intro-shown", "1");
        localStorage.setItem("durgotsav:registration-notice-dismissed", "1");
      } catch {}
    });
    await page.reload({ waitUntil: "networkidle2", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 500));

    const report = await page.evaluate(() => {
      const out = {
        h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim().slice(0, 60)),
        headingOrder: [],
        imgNoAlt: [],
        linksNoName: [],
        btnNoName: [],
        landmarks: {
          main: document.querySelectorAll("main").length,
          header: document.querySelectorAll("header").length,
          footer: document.querySelectorAll("footer").length,
          nav: document.querySelectorAll("nav").length,
        },
        htmlLang: document.documentElement.lang,
        title: document.title,
        metaDesc: document.querySelector('meta[name="description"]')?.content ?? null,
        canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
        ogImage: document.querySelector('meta[property="og:image"]')?.content ?? null,
        hreflang: [...document.querySelectorAll("link[rel=alternate][hreflang]")].map(
          (l) => l.hreflang,
        ),
        jsonLdTypes: [...document.querySelectorAll('script[type="application/ld+json"]')]
          .flatMap((s) => {
            try {
              const d = JSON.parse(s.textContent);
              return (Array.isArray(d) ? d : [d]).map((x) => x["@type"]);
            } catch {
              return ["PARSE_ERROR"];
            }
          }),
        smallTapTargets: [],
        colorSamples: [],
      };

      // Heading order
      let prev = 0;
      for (const h of document.querySelectorAll("h1,h2,h3,h4,h5,h6")) {
        const lvl = Number(h.tagName[1]);
        if (prev && lvl > prev + 1) {
          out.headingOrder.push(`${h.tagName} after H${prev}: "${h.textContent.trim().slice(0, 40)}"`);
        }
        prev = lvl;
      }

      for (const img of document.querySelectorAll("img")) {
        if (img.getAttribute("alt") === null) out.imgNoAlt.push(img.currentSrc || img.src);
      }

      const name = (el) =>
        (el.getAttribute("aria-label") || el.textContent || "").trim() ||
        (el.querySelector("img")?.alt ?? "") ||
        (el.querySelector(".sr-only")?.textContent ?? "");

      for (const a of document.querySelectorAll("a[href]")) {
        if (!name(a)) out.linksNoName.push(a.getAttribute("href"));
      }
      for (const b of document.querySelectorAll("button")) {
        if (!name(b)) out.btnNoName.push(b.className.toString().slice(0, 50));
      }

      // Interactive targets smaller than 24x24 (WCAG 2.2 AA minimum).
      for (const el of document.querySelectorAll("a[href], button, [role=radio]")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        // sr-only links are 1x1 until focused — that is by design.
        if (r.width <= 2 && r.height <= 2) continue;
        if (r.width < 24 || r.height < 24) {
          out.smallTapTargets.push(
            `${el.tagName}:${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 24)} ${Math.round(r.width)}x${Math.round(r.height)}`,
          );
        }
      }

      // Sample computed colours of text against their painted background.
      const parse = (s) => {
        if (!s || /transparent/.test(s)) return null;
        const nums = (s.match(/-?\d*\.?\d+/g) || []).slice(0, 3).map(Number);
        if (nums.length < 3) return null;
        // color(srgb r g b) yields 0..1 floats; rgb() yields 0..255.
        return /^color\(/.test(s) ? nums.map((n) => Math.round(n * 255)) : nums;
      };
      const bgOf = (el) => {
        let n = el;
        while (n && n !== document.documentElement) {
          const c = getComputedStyle(n).backgroundColor;
          if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) {
            const v = parse(c);
            if (v) return v;
          }
          n = n.parentElement;
        }
        return [13, 11, 9];
      };
      const seen = new Set();
      for (const el of document.querySelectorAll("p, li, dd, dt, span, a, h1, h2, h3, figcaption")) {
        const txt = (el.textContent || "").trim();
        if (!txt || el.children.length > 0) continue;
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) < 0.5) continue;
        // Decorative text is exempt — it carries no information.
        if (el.closest("[aria-hidden='true']") || el.getAttribute("aria-hidden") === "true") continue;
        const col = parse(cs.color);
        if (!col) continue;
        const key = `${cs.color}|${cs.fontSize}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.colorSamples.push({
          color: col,
          bg: bgOf(el),
          size: parseFloat(cs.fontSize),
          weight: cs.fontWeight,
          sample: txt.slice(0, 30),
        });
      }

      return out;
    });

    // Flag problems
    if (report.h1.length !== 1) issues.push(`${path}: ${report.h1.length} <h1> (${JSON.stringify(report.h1)})`);
    if (report.headingOrder.length) issues.push(`${path}: heading skips — ${report.headingOrder.join("; ")}`);
    if (report.imgNoAlt.length) issues.push(`${path}: img without alt — ${report.imgNoAlt.join(", ")}`);
    if (report.linksNoName.length) issues.push(`${path}: link without name — ${report.linksNoName.join(", ")}`);
    if (report.btnNoName.length) issues.push(`${path}: button without name — ${report.btnNoName.join(", ")}`);
    if (report.landmarks.main !== 1) issues.push(`${path}: ${report.landmarks.main} <main>`);
    if (!report.metaDesc) issues.push(`${path}: no meta description`);
    if (!report.canonical) issues.push(`${path}: no canonical`);
    if (!report.ogImage) issues.push(`${path}: no og:image`);
    if (report.hreflang.length < 3) issues.push(`${path}: hreflang = ${JSON.stringify(report.hreflang)}`);
    if (report.jsonLdTypes.includes("PARSE_ERROR")) issues.push(`${path}: invalid JSON-LD`);
    if (report.smallTapTargets.length)
      issues.push(`${path}: small targets — ${[...new Set(report.smallTapTargets)].join(" | ")}`);

    for (const s of report.colorSamples) {
      const ratio = contrast(s.color, s.bg);
      const large = s.size >= 24 || (s.size >= 18.66 && Number(s.weight) >= 700);
      const min = large ? 3 : 4.5;
      if (ratio < min) {
        issues.push(
          `${path}: CONTRAST ${ratio.toFixed(2)}:1 (need ${min}) size=${s.size} rgb(${s.color}) on rgb(${s.bg}) — "${s.sample}"`,
        );
      }
    }

    console.log(
      `${path.padEnd(22)} h1=${report.h1.length} json-ld=[${report.jsonLdTypes.join(",")}] title="${report.title.slice(0, 45)}"`,
    );
    await page.close();
  }

  await browser.close();
  console.log("\n=== A11Y / SEO ISSUES (" + issues.length + ") ===");
  for (const i of issues) console.log("•", i);
})();
