// Scroll-driven process, call invitations, keyboard routing and static fallbacks.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4323';
const out=path.resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'output/polish/checks');
fs.mkdirSync(out,{recursive:true});
const checks=[];
const pass=name=>{checks.push(name);console.log(`PASS ${name}`);};
const browser=await chromium.launch({channel:'chrome',headless:true});
async function context(options={}) {
  const ctx=await browser.newContext(options);
  if(process.env.VERCEL_OIDC_TOKEN && new URL(base).hostname.endsWith('.vercel.app')) await ctx.route('**/*',route=>route.continue(new URL(route.request().url()).origin===new URL(base).origin?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{}));
  return ctx;
}
try {
  for(const [width,height] of [[320,568],[390,844],[768,1024],[844,390],[1440,900]]) {
    const ctx=await context({viewport:{width,height},isMobile:width<900,hasTouch:width<900,reducedMotion:'reduce'});
    const page=await ctx.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/about',{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const drawing=page.locator('[data-process-drawing]');
    const nav=page.getByRole('navigation',{name:'How I work'});
    await drawing.scrollIntoViewIfNeeded();
    for(const [i,name] of ['Assess','Plan','Build','Run'].entries()) {
      await nav.getByRole('link',{name,exact:true}).click();
      await page.waitForFunction(i=>document.querySelector('[data-process-drawing]').dataset.active===String(i),i);
      assert.equal(await nav.getByRole('link',{name,exact:true}).getAttribute('aria-current'),'step');
      const box=await page.locator(`#process-${i+1}`).boundingBox();
      assert.ok(box.y>=0 && box.y<height-120,`Readable step ${name}: ${JSON.stringify(box)}`);
      if(height>600 && width<900) assert.ok(box.y>=(await drawing.boundingBox()).y+(await drawing.boundingBox()).height-1,'Sticky drawing cannot cover the active heading');
    }
    // Real upward scrolling must reverse the diagram, not leave it on the last stage.
    await page.locator('#process-1').evaluate(el=>scrollTo(0,scrollY+el.getBoundingClientRect().top-300));
    await page.waitForFunction(()=>document.querySelector('[data-process-drawing]').dataset.active==='0');
    if(width===390||width===1440) await page.screenshot({path:path.join(out,`process-${width}.png`)});
    const invitation=page.locator('[data-invitation]');
    await invitation.scrollIntoViewIfNeeded();
    assert.equal(await page.locator('[data-minute-arc]').evaluate(el=>getComputedStyle(el).strokeDashoffset),'0px');
    const call=invitation.getByRole('link',{name:'Book a 20-minute call',exact:true});
    assert.ok(await call.isVisible());
    const box=await call.boundingBox();
    assert.ok(box.width>=44 && box.height>=44 && box.x>=0 && box.x+box.width<=width);
    if(width===390||width===1440) await invitation.screenshot({path:path.join(out,`invitation-${width}.png`)});
    await page.keyboard.press('Tab');
    await call.focus();
    assert.notEqual(await call.evaluate(el=>getComputedStyle(el).outlineStyle),'none');
    await page.keyboard.press('Enter');
    await page.waitForURL(base+'/book');
    assert.deepEqual(errors,[]);
    pass(`${width}x${height}: process anchors, reverse scroll, readable sticky layout and keyboard booking`);
    await ctx.close();
  }
  for(const width of [390,1440]) {
    const ctx=await context({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390});
    const page=await ctx.newPage();
    await page.goto(base+'/about',{waitUntil:'networkidle'});
    const invitation=page.locator('[data-invitation]');
    const arc=page.locator('[data-minute-arc]');
    const offset=()=>arc.evaluate(el=>parseFloat(getComputedStyle(el).strokeDashoffset));
    assert.ok(await offset()>99);
    await invitation.evaluate(el=>scrollTo(0,scrollY+el.getBoundingClientRect().top-innerHeight*.6));
    await page.waitForTimeout(250);
    const partial=await offset();
    assert.ok(partial>0 && partial<100,`Scroll-linked arc: ${partial}`);
    await page.waitForTimeout(400);
    assert.equal(await offset(),partial,'No autonomous countdown or animation');
    await invitation.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    assert.ok(await offset()<partial);
    const call=invitation.getByRole('link',{name:'Book a 20-minute call',exact:true});
    const before=await call.boundingBox();
    await call.hover();
    await page.waitForTimeout(150);
    assert.deepEqual(await call.boundingBox(),before,'Hover must not move the call surface');
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForTimeout(200);
    assert.equal(await offset(),0);
    pass(`${width}: scroll-linked clock, stationary hover surface and live reduced-motion preference`);
    await ctx.close();
  }
  for(const width of [390,1440]) {
    const ctx=await context({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await ctx.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    for(const route of ['/about','/ai','/notes','/privacy','/pricing','/clinics','/firms','/work','/work/tax-relief-counsel','/work/endorphins','/work/physiomax','/work/kinetikare','/work/techniques-combat','/work/travel-journal','/work/wedding']) {
      await page.goto(base+route,{waitUntil:'networkidle'});
      assert.equal(await page.locator('h1').count(),1,route);
      const invitation=page.locator('[data-invitation]');
      assert.equal(await invitation.count(),1,route);
      await invitation.scrollIntoViewIfNeeded();
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route);
      assert.equal(await invitation.locator('a[href="/book"]').count(),1,route);
      assert.equal(await invitation.locator('a[href="/book/check"]').count(),route==='/privacy'?0:1,route);
      if(route!=='/privacy') assert.match(await invitation.locator('a[href="/book/check"]').innerText(),/\$1,500/);
    }
    assert.deepEqual(errors,[]);
    pass(`${width}: all 15 closing sections, correct links/prices, one heading and no overflow`);
    await ctx.close();
  }
  const ctx=await context({viewport:{width:390,height:844},javaScriptEnabled:false});
  const page=await ctx.newPage();
  await page.goto(base+'/about',{waitUntil:'networkidle'});
  assert.equal(await page.locator('[data-process-step]').count(),4);
  for(const step of await page.locator('[data-process-step]').all()) assert.ok((await step.innerText()).length>80);
  await page.locator('[data-invitation]').scrollIntoViewIfNeeded();
  assert.equal(await page.locator('[data-minute-arc]').evaluate(el=>getComputedStyle(el).strokeDashoffset),'0px');
  await page.locator('[data-invitation] a[href="/book"]').click();
  await page.waitForURL(base+'/book');
  pass('No JavaScript: complete process text, finished clock and native booking link');
  await ctx.close();
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,checks},null,2));
} finally { await browser.close(); }
