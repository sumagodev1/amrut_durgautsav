const puppeteer=require("puppeteer-core");
(async()=>{
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--disable-gpu","--hide-scrollbars","--font-render-hinting=none"]});
const p=await b.newPage();
await p.setViewport({width:1440,height:900,deviceScaleFactor:2});
await p.goto(process.env.QA_URL||"http://localhost:3847/mr",{waitUntil:"networkidle2"});
await p.evaluate(()=>{try{sessionStorage.setItem("durgotsav:intro-shown","1");localStorage.setItem("durgotsav:registration-notice-dismissed","1")}catch{}});
await p.reload({waitUntil:"networkidle2"});
await new Promise(r=>setTimeout(r,2500));
const sel=process.env.QA_SEL||"#hero-title";
const el=await p.$(sel);
if(el){ await el.screenshot({path:process.env.QA_OUT||".shots/crop-title.png"}); console.log("cropped",sel); }
else console.log("missing",sel);
// report the computed font actually used
const info=await p.evaluate((s)=>{const e=document.querySelector(s);const n=e?.querySelector("span[lang=mr]")||e;const cs=getComputedStyle(n);return{font:cs.fontFamily,size:cs.fontSize,weight:cs.fontWeight,text:n.textContent};},sel);
console.log(JSON.stringify(info));
await b.close();
})();
