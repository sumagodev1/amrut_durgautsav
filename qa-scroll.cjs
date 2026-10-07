/* Viewport screenshots at specific scroll offsets. */
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.QA_BASE || "http://localhost:3847";
const OUT = ".shots";
const PATH = process.env.QA_PATH || "/mr";
const W = Number(process.env.QA_W || 1440);
const H = Number(process.env.QA_H || 900);
const PREFIX = process.env.QA_PREFIX || "scroll";
// Scroll targets: either "#selector" or a pixel number.
const STOPS = (process.env.QA_STOPS || "#intro,#forts,#plan").split(",");

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--font-render-hinting=none"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await page.goto(`${BASE}${PATH}`, { waitUntil: "networkidle2", timeout: 45000 });
  await page.evaluate(() => {
    try {
      sessionStorage.setItem("durgotsav:intro-shown", "1");
      localStorage.setItem("durgotsav:registration-notice-dismissed", "1");
    } catch {}
  });
  await page.reload({ waitUntil: "networkidle2", timeout: 45000 });

  for (const stop of STOPS) {
    await page.evaluate(async (s) => {
      const y = s.startsWith("#")
        ? (document.querySelector(s)?.getBoundingClientRect().top ?? 0) + window.scrollY + 220
        : Number(s);
      // Jump, then nudge, so scroll listeners definitely fire.
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 300));
      window.scrollBy(0, 2);
      await new Promise((r) => setTimeout(r, 900));
    }, stop);
    const name = stop.replace(/[^a-z0-9]/gi, "") || "top";
    await page.screenshot({ path: `${OUT}/${PREFIX}-${name}.png` });
    console.log("captured at", stop);
  }

  await browser.close();
})();
