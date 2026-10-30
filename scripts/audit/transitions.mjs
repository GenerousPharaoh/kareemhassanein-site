// Capture intermediate transition frames and exercise interruptions without sending enquiries.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(arg=>arg.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4323';
const out=path.resolve(process.argv.find(arg=>arg.startsWith('--out='))?.slice(6)||'output/transition-refinement/checks');
fs.mkdirSync(out,{recursive:true});
const checks=[];const pass=name=>{checks.push(name);console.log('PASS '+name);};
const browser=await chromium.launch({channel:'chrome',headless:true});
async function context(options={}) {
 const ctx=await browser.newContext(options);
 if(process.env.VERCEL_OIDC_TOKEN&&new URL(base).hostname.endsWith('.vercel.app'))await ctx.route('**/*',route=>route.continue(new URL(route.request().url()).origin===new URL(base).origin?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{}));
 await ctx.route('**/api/contact',route=>route.abort());
 await ctx.addInitScript(()=>{
  const start=document.startViewTransition?.bind(document);if(!start)return;
  window.__motionCount=0;
  document.startViewTransition=options=>{
   const id=++window.__motionCount;const view=start(options);
   view.ready.then(()=>{
    const animations=document.getAnimations().filter(a=>/^(page-|surface-|work-|.*work-filter-marker|-ua-view-transition)/.test(a.animationName||''));
    const icon=document.querySelector('[aria-label="Open menu"] > span:last-child > span:first-child');
    window.__motion={id,types:[...view.types],fromMenu:document.documentElement.hasAttribute('data-route-from-menu'),menuIcon:icon?getComputedStyle(icon).rotate:null,sharedWindow:!!document.querySelector('[data-browser-frame][data-shared-case]'),animations:animations.map(a=>({name:a.animationName,duration:a.effect.getTiming().duration,frames:a.effect.getKeyframes()}))};
    if(window.__holdMotion){window.__held=animations;for(const a of animations){a.pause();a.currentTime=0;}}
   }).catch(error=>{window.__motionFailure={id,message:error.message};});
   return view;
  };
 });
 return ctx;
}
const settle=page=>page.waitForFunction(()=>!document.documentElement.hasAttribute('data-route-changing')&&!document.querySelector('[data-transitioning]'));
async function capture(page,label,action) {
 const prior=await page.evaluate(()=>{window.__holdMotion=true;return window.__motionCount;});
 await action();
 await page.waitForFunction(prior=>window.__motion?.id>prior,prior);
 const motion=await page.evaluate(()=>window.__motion);
 for(const progress of [.12,.5,.86]) {
  await page.evaluate(progress=>{
   const total=Math.max(...window.__held.map(a=>Number(a.effect.getTiming().duration)+Number(a.effect.getTiming().delay)));
   for(const a of window.__held)a.currentTime=Math.min(total*progress,Number(a.effect.getTiming().duration)+Number(a.effect.getTiming().delay));
  },progress);
  await page.screenshot({path:path.join(out,`${label}-${Math.round(progress*100)}.png`)});
 }
 await page.evaluate(()=>{window.__holdMotion=false;for(const a of window.__held)a.finish();window.__held=[];});
 await settle(page);
 return motion;
}
try {
 for(const width of [390,1440]) {
  const ctx=await context({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390});
  const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/work',{waitUntil:'networkidle'});
  let motion;
  if(width===390) {
   await page.getByRole('button',{name:'Open menu',exact:true}).click();
   await page.waitForTimeout(100);
   const sheet=page.locator('#site-menu');
   const opening=await sheet.evaluate(el=>getComputedStyle(el).opacity);
   assert.ok(Number(opening)>0&&Number(opening)<.7,'Menu surface gradually appears instead of popping in');
   await page.screenshot({path:path.join(out,'menu-early.png')});
   await page.waitForTimeout(500);
   motion=await capture(page,`menu-page-${width}`,()=>sheet.getByRole('link',{name:'About',exact:true}).click());
   assert.ok(motion.fromMenu,'The outgoing menu belongs to the page dissolve');
   assert.ok(motion.menuIcon==='none'||motion.menuIcon==='0deg','The incoming menu icon is settled before its snapshot');
  } else {
   motion=await capture(page,`page-${width}`,()=>page.locator('header').getByRole('link',{name:'About',exact:true}).click());
  }
  const arrival=motion.animations.find(a=>a.name==='page-reveal');
  assert.ok(arrival?.duration>=520);
  assert.ok(arrival.frames.every(frame=>!frame.clipPath),'Page transitions have no hard clipping edge');
  assert.ok(!await page.evaluate(()=>document.documentElement.hasAttribute('data-route-from-menu')));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  pass(`${width}: continuous page dissolve and clean menu handoff`);

  await page.goto(base+'/work',{waitUntil:'networkidle'});
  const card=page.locator('[data-case-card]').first();const media=card.locator('[data-case-preview]');
  await media.scrollIntoViewIfNeeded();await page.waitForTimeout(1100);
  motion=await capture(page,`case-${width}`,async()=>{const b=await media.boundingBox();await page.mouse.click(b.x+b.width*.4,Math.min(b.y+b.height*.45,700));});
  assert.ok(motion.sharedWindow,'The same browser window is carried into the case header');
  assert.ok(motion.animations.some(a=>a.name==='surface-leave'&&a.duration>=600),'The source image persists during the handoff');
  assert.equal(await page.locator('[data-shared-case]').count(),0);
  await page.goBack();await page.waitForURL(base+'/work');await settle(page);
  pass(`${width}: matching case image, intermediate frames and back navigation`);

  await page.goto(base+'/work',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Law firms',exact:true}).click();await settle(page);
  for(const y of [800,1100]) {
   await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(150);
   const style=await card.evaluate(el=>({transform:getComputedStyle(el).transform,shade:parseFloat(getComputedStyle(el).getPropertyValue('--shade'))||0,stack:el.parentElement.parentElement.hasAttribute('data-stacking')}));
   assert.equal(style.stack,false,'A single filtered card does not stack against a hidden successor');
   assert.equal(style.shade,0);assert.ok(style.transform==='none'||style.transform==='matrix(1, 0, 0, 1, 0, 0)');
  }
  await page.evaluate(()=>scrollTo(0,0));
  await page.getByRole('button',{name:'All cases',exact:true}).click();await settle(page);
  await page.evaluate(()=>{
   const row=document.querySelector('[data-work-filter]');
   for(const label of ['Clinics','Law firms','Other projects'])[...row.querySelectorAll('button')].find(button=>button.textContent===label).click();
  });
  await page.waitForFunction(()=>document.querySelector('[data-filter]')?.getAttribute('data-filter')==='beyond');await settle(page);
  assert.equal(await page.locator('[style*="view-transition-name"]').count(),0);
  await page.getByRole('button',{name:'Clinics',exact:true}).click();
  await page.emulateMedia({reducedMotion:'reduce'});await settle(page);
  assert.equal(await page.getByRole('button',{name:'Clinics',exact:true}).getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('[style*="view-transition-name"]').count(),0);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.getByRole('button',{name:'All cases',exact:true}).click();await settle(page);
  const beforeRoute=await page.evaluate(()=>history.state.__khWorkFilter);
  await page.evaluate(()=>{
   document.querySelector('[data-work-filter] button:nth-child(2)').click();
   document.querySelector('a[href="/pricing"]').click();
  });
  await page.waitForURL(base+'/pricing');await settle(page);
  assert.ok(await page.evaluate(()=>history.state.__khWorkFilter!== 'firms'),'A discarded filter cannot write into the next page history entry');
  assert.equal(beforeRoute,'all');
  assert.deepEqual(errors,[]);
  pass(`${width}: filtered card stability, rapid choices, Motion-off and navigation interruption`);
  await ctx.close();
 }

 const slow=await context({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 let release;const held=new Promise(resolve=>release=resolve);
 await slow.route('**/ai?*',async route=>{if(route.request().headers()['rsc']==='1')await held;await route.fallback();});
 const page=await slow.newPage();await page.goto(base+'/work',{waitUntil:'networkidle'});
 await page.evaluate(()=>{
  window.__arrivals=[];const animate=Element.prototype.animate;
  Element.prototype.animate=function(frames,options){if(this.id==='main')window.__arrivals.push({frames,options});return animate.call(this,frames,options);};
  const link=document.createElement('a');link.href='/ai';link.textContent='AI';document.body.append(link);link.click();link.remove();
 });
 await page.waitForTimeout(1050);release();
 await page.waitForURL(base+'/ai');await settle(page);
 assert.ok(await page.evaluate(()=>window.__arrivals.some(a=>a.options.duration===480)),'A late route gets a soft arrival after the frozen snapshot is released');
 await page.waitForTimeout(550);await page.screenshot({path:path.join(out,'delayed-route.png')});
 pass('Delayed navigation releases its snapshot and fades in the arriving page');await slow.close();
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,checks},null,2));
}finally{await browser.close();}
