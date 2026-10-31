// Verify the same screens form the initials and land in the wall. No inquiries are sent.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4324';
const out=path.resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'output/work-monogram/sequence');
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});const checks=[];
try {
 for(const width of [390,1440]) {
  const ctx=await browser.newContext({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390});
  await ctx.route('**/*',route=>{
   const url=new URL(route.request().url());
   if(url.pathname==='/api/contact')return route.abort();
   return route.continue(process.env.VERCEL_OIDC_TOKEN&&new URL(base).hostname.endsWith('.vercel.app')&&url.origin===new URL(base).origin?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{});
  });
  await ctx.addInitScript(()=>{
   window.__sequence=[];window.__shifts=[];
   new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__shifts.push(e.value);})).observe({type:'layout-shift',buffered:true});
   const observer=new MutationObserver(records=>records.forEach(({target,attributeName})=>{
    if(attributeName!=='data-opening-phase')return;
    const phase=target.getAttribute(attributeName);
    const tiles=[...target.querySelectorAll('[data-mark-cell]')];
    if(phase==='mark')window.__originalTiles=tiles;
    window.__sequence.push({phase,time:performance.now(),same:window.__originalTiles?.every((tile,i)=>tile===tiles[i]),boxes:tiles.map(tile=>({slot:tile.dataset.markCell,rect:tile.getBoundingClientRect().toJSON(),src:tile.querySelector('img').src})),nameOpacity:getComputedStyle(target.querySelector('h1')).opacity});
   }));
   observer.observe(document,{subtree:true,attributes:true,attributeFilter:['data-opening-phase']});
  });
  const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('[data-opening-phase="mark"]'));
  await page.screenshot({path:path.join(out,`mark-${width}.png`)});
  await page.waitForFunction(()=>document.querySelector('[data-opening-phase="unfold"]'));
  await page.waitForTimeout(650);await page.screenshot({path:path.join(out,`unfold-${width}.png`)});
  await page.waitForFunction(()=>!document.querySelector('[data-hero-opening]'));
  await page.screenshot({path:path.join(out,`wall-${width}.png`)});
  const data=await page.evaluate(()=>({sequence:window.__sequence,cls:window.__shifts.reduce((sum,n)=>sum+n,0),hidden:[...document.querySelectorAll('[data-wall-tile]')].filter(tile=>getComputedStyle(tile).opacity==='0').length}));
  assert.deepEqual(data.sequence.map(e=>e.phase),['assemble','mark','unfold','ready']);
  const mark=data.sequence[1];const ready=data.sequence[3];
  assert.equal(mark.boxes.length,22);assert.equal(ready.same,true,'The actual screen tiles persist through the whole scene');
  assert.equal(ready.nameOpacity,'1');assert.equal(data.hidden,0,'No screen remains hidden after the arrival');
  for(const tile of mark.boxes)assert.ok(tile.rect.left>=-1&&tile.rect.right<=width+1,'Initials fit the viewport');
  assert.ok(ready.boxes.filter((tile,i)=>tile.rect.width>mark.boxes[i].rect.width*2).length>=18,'Screens grow into the wall instead of fading into unrelated images');
  assert.ok(data.cls<.02,`Opening layout remains stable: ${data.cls}`);
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,`sequence-${width}.json`),JSON.stringify(data,null,2));
  checks.push(`${width}: same 22 screens assemble, form KH, unfold into wall, and leave no hidden elements`);console.log('PASS '+checks.at(-1));await ctx.close();
 }
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,checks},null,2));
} finally {await browser.close();}
