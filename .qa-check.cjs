const puppeteer=require("puppeteer-core");
(async()=>{
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--disable-gpu"]});
const p=await b.newPage();
await p.setViewport({width:390,height:844});
await p.goto("http://localhost:3847/mr",{waitUntil:"networkidle2"});
const r=await p.evaluate(()=>{
  const out=[];
  for(const el of document.querySelectorAll('header a, header button')){
    const cs=getComputedStyle(el);
    out.push({tag:el.tagName,txt:(el.textContent||"").trim().slice(0,20),display:cs.display,cls:el.className.toString().slice(0,80)});
  }
  return out;
});
console.log(JSON.stringify(r,null,1));
await b.close();
})();
