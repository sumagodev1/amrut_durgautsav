/* Visual QA harness. Not part of the app — run with `node qa-shots.cjs`. */
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.QA_BASE || "http://localhost:3847";
const OUT = ".shots";

const VIEWPORTS = {
  "1440": { width: 1440, height: 900 },
  "1920": { width: 1920, height: 1080 },
  "1024": { width: 1024, height: 768 },
  "768": { width: 768, height: 1024 },
  "390": { width: 390, height: 844, isMobile: true, hasTouch: true },
  "320": { width: 320, height: 640, isMobile: true, hasTouch: true },
};

const TARGETS = process.env.QA_TARGETS
  ? JSON.parse(process.env.QA_TARGETS)
  : [
      { name: "home", path: "/mr", vps: ["1440", "390"], full: true },
      { name: "forts", path: "/mr/forts", vps: ["1440"], full: true },
      { name: "fort-raigad", path: "/mr/forts/raigad", vps: ["1440"], full: true },
      { name: "mission", path: "/mr/mission", vps: ["1440"], full: true },
      { name: "participate", path: "/mr/participate", vps: ["1440"], full: true },
      { name: "record", path: "/mr/record", vps: ["1440"], full: true },
      { name: "voices", path: "/mr/voices", vps: ["1440"], full: true },
      { name: "gallery", path: "/mr/gallery", vps: ["1440"], full: true },
      { name: "faq", path: "/mr/faq", vps: ["1440"], full: true },
      { name: "contact", path: "/mr/contact", vps: ["1440"], full: true },
      { name: "home-en", path: "/en", vps: ["1440"], full: true },
      { name: "notfound", path: "/mr/nope", vps: ["1440"], full: false },
    ];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--font-render-hinting=none"],
  });

  const problems = [];

  for (const target of TARGETS) {
    for (const vp of target.vps) {
      const page = await browser.newPage();
      await page.setViewport({ deviceScaleFactor: 1, ...VIEWPORTS[vp] });

      page.on("console", (m) => {
        if (m.type() === "error") problems.push(`[console] ${target.name}@${vp}: ${m.text()}`);
      });
      page.on("pageerror", (e) => problems.push(`[pageerror] ${target.name}@${vp}: ${e.message}`));
      page.on("requestfailed", (r) => {
        const u = r.url();
        // The live photo platform is unreachable from here; that is expected
        // and the UI is built to degrade. Don't report it as a defect.
        if (/durgotsav\.(com|imperative)/.test(u)) return;
        problems.push(`[404] ${target.name}@${vp}: ${u} — ${r.failure()?.errorText}`);
      });

      await page.goto(`${BASE}${target.path}`, { waitUntil: "networkidle2", timeout: 45000 });

      // Dismiss the once-per-session intro, then settle.
      await page.evaluate(() => {
        try {
          sessionStorage.setItem("durgotsav:intro-shown", "1");
          localStorage.setItem("durgotsav:registration-notice-dismissed", "1");
        } catch {}
      });
      await page.reload({ waitUntil: "networkidle2", timeout: 45000 });

      if (target.full) {
        // Walk the page so every scroll-reveal fires before capture.
        await page.evaluate(async () => {
          const step = window.innerHeight * 0.7;
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 160));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 400));
        });
      }
      await new Promise((r) => setTimeout(r, 900));

      // Flag any horizontal overflow — the single most common responsive bug.
      const overflow = await page.evaluate(() => {
        const docW = document.documentElement.clientWidth;
        if (document.documentElement.scrollWidth <= docW + 1) return null;
        const offenders = [];
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.right > docW + 1 || r.left < -1)) {
            offenders.push(
              `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 70)} right=${Math.round(r.right)} left=${Math.round(r.left)}`,
            );
          }
          if (offenders.length > 4) break;
        }
        return { scrollWidth: document.documentElement.scrollWidth, docW, offenders };
      });
      if (overflow) {
        problems.push(
          `[overflow] ${target.name}@${vp}: scrollWidth=${overflow.scrollWidth} vs ${overflow.docW}\n    ${overflow.offenders.join("\n    ")}`,
        );
      }

      await page.screenshot({
        path: `${OUT}/${target.name}-${vp}.png`,
        fullPage: !!target.full,
      });
      await page.close();
      console.log(`captured ${target.name}@${vp}`);
    }
  }

  await browser.close();

  console.log("\n=== PROBLEMS (" + problems.length + ") ===");
  for (const p of [...new Set(problems)]) console.log(p);
})();
