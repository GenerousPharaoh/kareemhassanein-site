// Verify the full-name window opens into the same wall, without a dark flash. No inquiries sent.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4326';
const out=path.resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'output/name-window/sequence');
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});const checks=[];
try {
 const sizes=process.argv.includes('--extended')?[[320,844,3],[2560,1440,2]]:[[390,844,1],[1440,900,1]];
 for(const [width,height,deviceScaleFactor] of sizes) {
  const ctx=await browser.newContext({viewport:{width,height},isMobile:width<761,hasTouch:width<761,deviceScaleFactor});
  await ctx.route('**/*',route=>{
   const url=new URL(route.request().url());
   if(url.pathname==='/api/contact')return route.abort();
   return route.continue(process.env.VERCEL_OIDC_TOKEN&&new URL(base).hostname.endsWith('.vercel.app')&&url.origin===new URL(base).origin?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{});
  });
  await ctx.addInitScript(()=>{
   window.__sequence=[];window.__shifts=[];
   new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__shifts.push(e.value);})).observe({type:'layout-shift',buffered:true});
   new MutationObserver(records=>records.forEach(({target})=>{
    const phase=target.getAttribute('data-opening-phase');
    const tiles=[...target.querySelectorAll('[data-wall-tile]')];
    if(phase==='name')window.__originalTiles=tiles;
    window.__sequence.push({phase,time:performance.now(),same:window.__originalTiles?.every((tile,i)=>tile===tiles[i]),count:tiles.length});
   })).observe(document,{subtree:true,attributes:true,attributeFilter:['data-opening-phase']});
  });
  const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.waitForSelector('[data-opening-phase="name"]');
  assert.deepEqual(await page.locator('[data-window-letters] text').allTextContents(),['Kareem','Hassanein']);
  assert.equal(await page.locator('[data-mark-cell]').count(),0);
  assert.ok(await page.locator('[data-track="hero-book"]').isVisible());
  const words=await page.locator('[data-name-window]').evaluate(svg=>{
   // The first-paint SVG is hidden after its glyphs are captured. Measure without making it visible.
   svg.style.display='block';svg.style.visibility='hidden';
   const boxes=[...svg.querySelectorAll('text')].map(el=>{const b=el.getBBox();return {left:b.x,right:b.x+b.width,width:b.width};});
   svg.style.removeProperty('display');svg.style.removeProperty('visibility');return boxes;
  });
  assert.ok(words.every(word=>word.width>0&&word.left>=0&&word.right<=width),'Full name fits before zoom');
  await page.screenshot({path:path.join(out,`name-${width}.png`),scale:'css'});
  await page.waitForSelector('[data-opening-phase="zoom"]');
  await page.waitForTimeout(350);await page.screenshot({path:path.join(out,`zoom-${width}.png`),scale:'css'});
  await page.waitForSelector('[data-opening-phase="land"]');
  const coverage=await page.locator('[data-window-canvas]').evaluate(canvas=>{
   const ctx=canvas.getContext('2d');const pixels=[];
   for(const x of [.1,.5,.9])for(const y of [.2,.45,.65])pixels.push(ctx.getImageData(Math.floor(canvas.width*x),Math.floor(canvas.height*y),1,1).data[3]);
   return {pixels,visible:getComputedStyle(canvas).display!=='none',svgDisplay:getComputedStyle(document.querySelector('[data-name-window]')).display};
  });
  assert.ok(coverage.visible&&coverage.svgDisplay==='none','Only the animated mask is visible during the zoom');
  assert.ok(coverage.pixels.every(alpha=>alpha<8),`Zoom clears the full viewport without dark mask pixels: ${coverage.pixels}`);
  await page.screenshot({path:path.join(out,`through-${width}.png`),scale:'css'});
  await page.waitForFunction(()=>!document.querySelector('[data-hero-opening]'));
  await page.screenshot({path:path.join(out,`wall-${width}.png`),scale:'css'});
  const data=await page.evaluate(()=>({sequence:window.__sequence,cls:window.__shifts.reduce((sum,n)=>sum+n,0),nameOpacity:getComputedStyle(document.querySelector('h1')).opacity,apertureDisplay:getComputedStyle(document.querySelector('[data-name-window]')).display}));
  assert.deepEqual(data.sequence.map(e=>e.phase),['name','zoom','land','ready']);
  assert.ok(data.sequence.every(e=>e.same&&e.count===data.sequence[0].count),'The same screen wall persists through the entire opening');
  assert.equal(data.nameOpacity,'1');assert.equal(data.apertureDisplay,'none');
  assert.ok(data.cls<.02,`Opening layout remains stable: ${data.cls}`);
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,`sequence-${width}.json`),JSON.stringify(data,null,2));
  checks.push(`${width}: full-name window, continuous zoom without a dark flash, same wall and complete final hero`);console.log('PASS '+checks.at(-1));await ctx.close();
 }
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,checks},null,2));
} finally {await browser.close();}
