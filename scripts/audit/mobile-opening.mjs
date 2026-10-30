// First-load motion, early interaction and broad project positioning. No inquiries are sent.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4323';
const out=path.resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'output/mobile-opening/checks');
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const checks=[];const pass=name=>{checks.push(name);console.log('PASS '+name);};
async function context(options={}) {
 const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'no-preference',...options});
 await ctx.route('**/*',route=>{
  const url=new URL(route.request().url());const sameOrigin=url.origin===new URL(base).origin;
  if(sameOrigin && url.pathname==='/api/contact')return route.abort('blockedbyclient');
  const trusted=sameOrigin && process.env.VERCEL_OIDC_TOKEN && new URL(base).hostname.endsWith('.vercel.app');
  return route.continue(trusted?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{});
 });
 return ctx;
}
async function usable(page) {
 assert.ok(await page.locator('body > header').evaluate(el=>getComputedStyle(el).visibility==='visible'&&+getComputedStyle(el).opacity===1));
 assert.ok(await page.locator('[data-hero-copy]').evaluate(el=>getComputedStyle(el).visibility==='visible'&&+getComputedStyle(el).opacity===1));
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
}
async function cleanPreviews(page) {
 assert.equal(await page.locator('[data-work-preview] button').count(),0,'Project previews have no floating playback buttons');
 assert.equal(await page.locator('[data-work-preview]').evaluateAll(previews=>previews.some(el=>/\b\d{2}\s*\/\s*\d{2}\b/.test(el.textContent))),false,'Project previews have no frame counters');
 assert.equal(await page.getByRole('button',{name:/^(?:Play|Pause) the wall of work$/}).count(),0,'The hero has no floating playback button');
}
async function permanentName(page) {
 const name=page.getByRole('heading',{level:1,name:'Kareem Hassanein',exact:true});
 assert.equal(await page.locator('h1').count(),1);
 assert.equal(await name.evaluate(el=>el.textContent.replace(/\s+/g,'')),'KareemHassanein');
 assert.ok(await name.evaluate(el=>[...el.children].every(word=>getComputedStyle(word).visibility==='visible' && +getComputedStyle(word).opacity===1)));
 assert.equal(await page.locator('[data-wall-intro], [data-intro-title], section:has([data-hero-name]) canvas').count(),0);
}
async function mobileMotion(page,enabled) {
 await page.getByRole('button',{name:'Open menu'}).click();
 const menu=page.getByRole('navigation',{name:'Menu',exact:true});
 const control=menu.getByRole('switch',{name:'Motion',exact:true});
 assert.equal(await control.getAttribute('aria-disabled'),null);
 if(await control.getAttribute('aria-checked')!==String(enabled))await control.click();
 assert.equal(await control.getAttribute('aria-checked'),String(enabled));
 await page.getByRole('button',{name:'Close menu'}).click();
 await page.waitForFunction(enabled=>document.documentElement.dataset.motion===(enabled?'on':'off'),enabled);
}
try {
 for(const width of [320,390,430]) {
  const ctx=await context({viewport:{width,height:844}});const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});await usable(page);
  await page.touchscreen.tap(10,300);
  assert.ok(await page.locator('[data-hero-name]').evaluate(el=>el.getAnimations({subtree:true}).every(a=>a.playbackRate===1)),'Touch must not accelerate the name entrance');
  await page.waitForFunction(()=>!document.querySelector('[data-hero-opening]'));
  assert.equal(await page.locator('[data-sink]').evaluate(el=>getComputedStyle(el).clipPath),'none');
  await usable(page);
  await permanentName(page);
  assert.match(await page.locator('[data-hero-copy] > p').innerText(),/Websites, booking, search and ads/);
  assert.doesNotMatch(await page.locator('[data-hero-copy] > p').innerText(),/independent practices/);
  await page.screenshot({path:path.join(out,`home-${width}.png`)});
  assert.equal(await page.locator('#selected-work a[href="/work/techniques-combat"]').count(),1);
  await cleanPreviews(page);await mobileMotion(page,false);
  await page.waitForTimeout(100);const before=await page.locator('[data-plane]').getAttribute('style');await page.waitForTimeout(200);
  assert.equal(await page.locator('[data-plane]').getAttribute('style'),before);
  assert.equal(await page.evaluate(()=>localStorage.getItem('kh-motion')),'off');
  assert.deepEqual(errors,[]);pass(`${width}: usable first frame, touch speed, permanent name, broad descriptor and global Motion stops the wall`);await ctx.close();
 }
 {
  const ctx=await context();let release;const held=new Promise(resolve=>release=resolve);
  await ctx.route('**/*.js',async route=>{await held;await route.fallback();});
  const page=await ctx.newPage();await page.goto(base+'/',{waitUntil:'commit'});
  await page.locator('[data-sink]').waitFor({state:'attached'});
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('[data-sink]')).position==='absolute');
  await usable(page);assert.equal(await page.locator('[data-ready]').count(),0);
  assert.ok(await page.locator('[data-hero-name]').evaluate(el=>el.getAnimations({subtree:true}).length>0),'Name entrance starts before app JavaScript');
  await page.screenshot({path:path.join(out,'before-hydration.png')});
  await page.waitForTimeout(1800);await usable(page);
  await permanentName(page);
  release();await page.waitForFunction(()=>document.querySelector('[data-ready]')&&!document.querySelector('[data-hero-opening]'));
  await usable(page);pass('Delayed JavaScript: first-paint entrance finishes itself and hydration does not replay it');await ctx.close();
 }
 {
  const ctx=await context();await ctx.addInitScript(()=>localStorage.setItem('kh-motion','off'));
  let release;const held=new Promise(resolve=>release=resolve);
  await ctx.route('**/*.js',async route=>{await held;await route.fallback();});
  const page=await ctx.newPage();await page.goto(base+'/',{waitUntil:'commit'});
  await page.locator('[data-sink]').waitFor({state:'attached'});
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('[data-sink]')).position==='absolute');
  assert.equal(await page.locator('html').getAttribute('data-motion'),'off');
  assert.equal(await page.locator('[data-ready]').count(),0,'This assertion runs before app hydration');
  await usable(page);
  await permanentName(page);
  assert.equal(await page.locator('[data-sink]').evaluate(el=>getComputedStyle(el).clipPath),'none');
  assert.equal(await page.locator('[data-sink]').evaluate(el=>el.getAnimations().length),0);
  await page.screenshot({path:path.join(out,'saved-off-first-paint.png')});
  release();await page.waitForFunction(()=>document.querySelector('[data-ready]')&&!document.querySelector('[data-hero-opening]'));
  assert.equal(await page.locator('footer').getByRole('switch',{name:'Motion',exact:true}).getAttribute('aria-checked'),'false');
  await usable(page);pass('Saved Motion off: first paint is complete and still before hydration');await ctx.close();
 }
 {
  const ctx=await context({reducedMotion:'reduce'});await ctx.addInitScript(()=>localStorage.setItem('kh-motion','on'));
  const page=await ctx.newPage();await page.goto(base+'/',{waitUntil:'domcontentloaded'});await usable(page);
  await page.waitForFunction(()=>document.documentElement.dataset.motion==='off'&&!document.querySelector('[data-hero-opening]'));
  await page.getByRole('button',{name:'Open menu'}).click();
  const control=page.getByRole('navigation',{name:'Menu',exact:true}).getByRole('switch',{name:'Motion',exact:true});
  assert.equal(await control.getAttribute('aria-checked'),'false');assert.equal(await control.getAttribute('aria-disabled'),'true');
  await control.focus();await control.press('Space');
  assert.equal(await page.locator('html').getAttribute('data-motion'),'off');
  assert.equal(await control.getAttribute('aria-checked'),'false','Keyboard activation cannot override OS reduced motion');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForFunction(()=>document.documentElement.dataset.motion==='on');
  assert.equal(await control.getAttribute('aria-checked'),'true');assert.equal(await control.getAttribute('aria-disabled'),null);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.documentElement.dataset.motion==='off');
  assert.equal(await control.getAttribute('aria-checked'),'false');
  pass('OS reduced motion overrides saved On and responds to device preference changes');await ctx.close();
 }
 {
  const ctx=await context();const page=await ctx.newPage();await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.getByRole('button',{name:'Open menu'}).click();
  const menu=page.getByRole('navigation',{name:'Menu',exact:true});await menu.getByRole('link',{name:'Pricing',exact:true}).click();
  await page.waitForURL(base+'/pricing');await page.waitForFunction(()=>!document.documentElement.hasAttribute('data-route-changing'));
  await page.locator('header a[href="/"]').first().click();await page.waitForURL(base+'/');
  await page.waitForFunction(()=>!document.documentElement.hasAttribute('data-route-changing'));
  await usable(page);assert.equal(await page.locator('[data-hero-opening]').count(),0);await permanentName(page);
  pass('Menu works during arrival; returning home has no second intro');await ctx.close();
 }
 for(const change of ['rotate','scroll','reduce']) {
  const ctx=await context();const page=await ctx.newPage();await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.waitForSelector('[data-ready]');
  if(change==='rotate')await page.setViewportSize({width:844,height:390});
  if(change==='scroll')await page.evaluate(()=>scrollTo(0,150));
  if(change==='reduce')await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>!document.querySelector('[data-hero-opening]'));
  assert.equal(await page.locator('[data-sink]').evaluate(el=>getComputedStyle(el).clipPath),'none');
  await usable(page);await permanentName(page);pass(`Name settles cleanly on ${change}`);await ctx.close();
 }
 for(const mode of ['no-js','reduce']) {
  const ctx=await context(mode==='no-js'?{javaScriptEnabled:false}:{reducedMotion:'reduce'});const page=await ctx.newPage();await page.goto(base+'/',{waitUntil:'domcontentloaded'});await usable(page);
  assert.equal(await page.locator('[data-hero-name]').evaluate(el=>el.getAnimations({subtree:true}).length),0);
  await permanentName(page);
  await usable(page);pass(`${mode}: immediate navigation and content, no lasting overlay`);await ctx.close();
 }
 {
  const ctx=await context({viewport:{width:1440,height:900},isMobile:false,hasTouch:false});const page=await ctx.newPage();await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>!document.querySelector('[data-hero-opening]'));await usable(page);await permanentName(page);await page.screenshot({path:path.join(out,'home-1440.png')});
  pass('1440: desktop signature entrance still completes');await ctx.close();
 }
 for(const width of [390,1440]) {
  const ctx=await context({viewport:{width,height:900},isMobile:width===390,hasTouch:width===390});const page=await ctx.newPage();
  await page.goto(base+'/',{waitUntil:'networkidle'});
  await page.waitForFunction(()=>!document.querySelector('[data-hero-opening]'));await cleanPreviews(page);
  const preview=page.locator('[data-work-preview="PhysioMax"]');await preview.scrollIntoViewIfNeeded();
  await preview.locator('[data-current] img').evaluate(img=>img.decode());
  assert.match(await preview.locator('[data-current] img').getAttribute('src'),/home-hero--desktop/);
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('[data-work-preview="PhysioMax"]').closest('[data-row]').querySelector('[data-rise]')).transform==='none');
  await page.screenshot({path:path.join(out,`physiomax-${width}.png`)});
  if(width===390) {
   for(const [frame,src] of [['1','treat--desktop'],['2','service--desktop'],['0','home-hero--desktop']]) {
    await page.waitForFunction(frame=>document.querySelector('[data-work-preview="PhysioMax"]')?.getAttribute('data-frame')===frame,frame);
    assert.match(await preview.locator('[data-current] img').getAttribute('src'),new RegExp(src));
    assert.equal(await preview.locator('img[src*="care--desktop"]').count(),0);
   }
   pass('PhysioMax: stronger first still and all three rotation frames exclude the rejected room image');
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const route of ['/about','/book','/ai','/notes']) {
   await page.goto(base+route,{waitUntil:'networkidle'});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   assert.equal(await page.locator('h1').count(),1);
   if(route==='/book')assert.ok(await page.getByRole('textbox',{name:'Company or project Optional'}).isVisible());
   if(route==='/about')await page.screenshot({path:path.join(out,`about-${width}.png`)});
  }
  pass(`${width}: broader About, Book, AI and Notes copy fits without overflow`);await ctx.close();
 }
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,checks},null,2));
} finally {await browser.close();}
