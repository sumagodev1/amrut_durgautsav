/* Capture individual sections at 1:1 for close inspection. */
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.QA_BASE || "http://localhost:3847";
const OUT = ".shots";

const PATH = process.env.QA_PATH || "/mr";
const WIDTH = Number(process.env.QA_W || 1440);
const HEIGHT = Number(process.env.QA_H || 900);
const PREFIX = process.env.QA_PREFIX || "sec";
const SELECTORS = (process.env.QA_SEL || "#intro,#about,#forts,#participate,#plan,#record").split(",");

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--font-render-hinting=none"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  await page.goto(`${BASE}${PATH}`, { waitUntil: "networkidle2", timeout: 45000 });
  await page.evaluate(() => {
    try {
      sessionStorage.setItem("durgotsav:intro-shown", "1");
      localStorage.setItem("durgotsav:registration-notice-dismissed", "1");
    } catch {}
  });
  await page.reload({ waitUntil: "networkidle2", timeout: 45000 });

  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
  });
  await new Promise((r) => setTimeout(r, 800));

  // The hero, in the viewport.
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: `${OUT}/${PREFIX}-hero.png` });
  console.log("captured hero");

  for (const sel of SELECTORS) {
    const el = await page.$(sel);
    if (!el) {
      console.log("missing", sel);
      continue;
    }
    const name = sel.replace(/[^a-z0-9]/gi, "") || "sec";
    await el.screenshot({ path: `${OUT}/${PREFIX}-${name}.png` });
    console.log("captured", sel);
  }

  await browser.close();
})();
